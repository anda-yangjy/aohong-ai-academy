(() => {
  const liveOrigin = 'https://livebench.ai';
  const datasetsRows = 'https://datasets-server.huggingface.co/rows';
  const openAiRelease = 'https://openai.com/index/introducing-gpt-6-2-astra-sol/';
  const benchInfo = {
    live: {
      title: 'LiveBench 2.0',
      url: liveOrigin + '/',
      method: '公开任务评分 · 7 项能力加权 · 满分 100',
      columns: ['名次', '模型 / 推理档位', '团队 / 地区', '综合分', '长程 Agent', '编程', '数据分析', '课堂方向'],
      explain: '成绩来自 LiveBench 2.0 官方题组与权重，按加权原始分排序。表格保留源站公开得分，显示到一位小数，相同显示分数仍可能有细微差距。不同配置的结果、成本和耗时可能不同。',
    },
    arena: {
      title: 'Arena Text · Overall',
      url: 'https://arena.ai/leaderboard/chat/text?scoring=raw',
      method: '公开投票 · 文本对话偏好 · 完整前 50 名',
      columns: ['源榜名次', '模型 / 推理档位', '团队 / 地区', '分数与区间', '票数', '上下文', '价格 $ / 百万 token', '许可', '课堂方向'],
      explain: 'Arena 衡量人对文本回答的偏好。票数、名次与分数区间来自其公开数据；价格为输入 / 输出美元价，公开快照缺少价格或上下文时用「—」显示。',
    },
  };
  const suiteLabels = {
    'Long Agentic': '长程 Agent', Reasoning: '推理', Coding: '编程',
    Browser: '浏览器操作', 'Data Analysis': '数据分析', Research: '研究', Design: '设计',
  };
  const teamNames = {
    google: 'Google', openai: 'OpenAI', anthropic: 'Anthropic', meta: 'Meta', xai: 'xAI',
    xiaomi: 'Xiaomi', alibaba: 'Alibaba', moonshot: 'Moonshot AI', 'moonshot ai': 'Moonshot AI',
    zai: 'Z.ai', 'z.ai': 'Z.ai', deepseek: 'DeepSeek', baidu: 'Baidu', tencent: 'Tencent',
    minimax: 'MiniMax', mistral: 'Mistral', 'mistral ai': 'Mistral', nvidia: 'NVIDIA', bytedance: 'ByteDance',
    stepfun: 'StepFun', 'step fun': 'StepFun', amazon: 'Amazon',
  };
  const domestic = new Set(['Xiaomi', 'Alibaba', 'Moonshot AI', 'Z.ai', 'DeepSeek', 'Baidu', 'Tencent', 'MiniMax', 'StepFun', 'ByteDance']);
  const foreign = new Set(['Google', 'OpenAI', 'Anthropic', 'Meta', 'xAI', 'Mistral', 'NVIDIA', 'Amazon', 'Thinking Machines', 'SpaceXAI', 'Abacus.AI']);
  const cacheKey = 'aohong-rank-snapshot-v2';
  const tabs = document.querySelector('.rank-bench-tabs');
  const filters = $('#rankTabs');
  const search = $('#rankSearch');
  const refreshButton = $('#refreshRanks');
  const body = $('#rankBody');
  const cards = $('#rankGptCards');
  let active = 'live';
  let filter = 'all';
  let pending = null;
  const statusText = {};

  function normalized(value) {
    return String(value).toLowerCase().replace(/[‑–—]/g, '-');
  }

  function isGpt6(name) {
    return /gpt[- ]?6(?:\b|[.])/i.test(normalized(name));
  }

  function formatDay(value) {
    return value.replace(/^(\d{4})-?(\d{2})-?(\d{2})$/, '$1.$2.$3');
  }

  function buildDay(revision) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(new Date(Number(revision) * 1000));
  }

  function teamName(team) {
    return teamNames[normalized(team)] || team || '未列出';
  }

  function region(team) {
    if (domestic.has(team)) return '国内';
    return foreign.has(team) ? '海外' : '未分类';
  }

  function numeric(value) {
    return value === '' || value == null || !Number.isFinite(Number(value)) ? null : Number(value);
  }

  function numberText(value, digits = 1) {
    return Number.isFinite(value) ? value.toFixed(digits) : '—';
  }

  function liveRows(snapshot) {
    const [columns, ...lines] = snapshot.csv.trim().split(/\r?\n/).map(line => line.split(','));
    const { _overall_weights: weights = {}, ...groups } = snapshot.categories;
    if (columns[0] !== 'model' || Object.keys(suiteLabels).some(key => !Array.isArray(groups[key]) || !groups[key].length || groups[key].some(k => !columns.includes(k)))) {
      throw new Error('题组数据结构已变更');
    }
    const rows = lines.map(line => {
      if (line.length !== columns.length || !/^[a-z\d_.+-]+$/i.test(line[0])) throw new Error('评测数据格式异常');
      const [id] = line;
      const data = Object.fromEntries(columns.map((column, index) => [column, numeric(line[index])]));
      const meta = snapshot.metadata[id] || {};
      const stats = Object.fromEntries(Object.entries(groups).map(([key, metrics]) => {
        const scores = metrics.map(metric => data[metric]).filter(Number.isFinite);
        return [key, scores.length ? scores.reduce((sum, v) => sum + v, 0) / scores.length : null];
      }));
      let total = 0;
      let count = 0;
      for (const [key, score] of Object.entries(stats)) {
        if (!Number.isFinite(score)) continue;
        const weight = Number.isFinite(weights[key]) && weights[key] > 0 ? weights[key] : 1;
        total += score * weight;
        count += weight;
      }
      return { id, name: meta.displayName || id, team: teamName(meta.organization), effort: meta.effort, stats, score: count ? total / count : null };
    }).filter(row => row.score !== null).sort((a, b) => b.score - a.score);
    if (rows.length < 10 || new Set(rows.map(row => row.id)).size !== rows.length) throw new Error('评测榜单不完整');
    return rows.map((row, index) => ({ ...row, rank: index + 1 }));
  }

  function arenaRows(snapshot) {
    return snapshot.rows.map(row => ({
      rank: row.rank, id: String(row.rank), name: row.model_name, team: teamName(row.organization),
      score: row.rating, lower: row.rating_lower, upper: row.rating_upper, votes: row.vote_count,
      context: row.context || '—', price: row.price || '—', license: row.license || '—', spread: row.spread || '—',
    }));
  }

  function newer(candidate, previous, bench) {
    return bench === 'live'
      ? candidate.release > previous.release || (candidate.release === previous.release && Number(candidate.revision) > Number(previous.revision))
      : candidate.date > previous.date;
  }

  const boards = { ...rankSnapshots };
  const parseRows = { live: liveRows, arena: arenaRows };
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || '{}');
    for (const bench of Object.keys(boards)) {
      if (!cached[bench] || !newer(cached[bench], boards[bench], bench)) continue;
      if (parseRows[bench](cached[bench]).length >= (bench === 'arena' ? 50 : 10)) boards[bench] = cached[bench];
    }
  } catch { /* A hosted snapshot is available even without browser storage. */ }
  const rated = { live: liveRows(boards.live), arena: arenaRows(boards.arena) };

  function guideFor(row) {
    const key = row.team === 'Moonshot AI' ? 'Moonshot' : row.team;
    if (/gpt-6\.2/i.test(row.name)) {
      return {
        label: /astra/i.test(row.name) ? '复杂推理 / 编程' : '办公分析 / 日常交付',
        why: /astra/i.test(row.name) ? '可安排多步、有明确检查标准的任务，例如复杂需求拆解和多文件交付。' : '可用于报告起草、常规数据分析和结构化整理。',
        task: '让模型按指定模板处理虚构经营数据，再抽查结果和公式。',
        source: openAiRelease,
      };
    }
    return modelGuide[key] || {
      label: '通用任务对比', why: '用同一批练习样本，比较结果可读性与可验证性。',
      task: '请模型整理摘要、原始依据和待确认项。',
    };
  }

  function displayName(row) {
    return `<strong>${esc(row.name)}</strong>${row.effort ? `<small class="rank-sub">${esc(row.effort.toUpperCase())} 推理档</small>` : ''}`;
  }

  function arenaScore(row) {
    return `${numberText(row.score, 0)} <small class="rank-sub">${numberText(row.lower, 0)}–${numberText(row.upper, 0)}</small>`;
  }

  function rowMarkup(row) {
    const lead = `<td><b class="ranking-num">#${row.rank}</b></td><td>${displayName(row)}</td><td>${esc(row.team)}<small class="rank-sub">${region(row.team)}</small></td>`;
    const metrics = active === 'live'
      ? `<td class="rank-total">${numberText(row.score)}</td><td>${numberText(row.stats['Long Agentic'])}</td><td>${numberText(row.stats.Coding)}</td><td>${numberText(row.stats['Data Analysis'])}</td>`
      : `<td>${arenaScore(row)}</td><td>${row.votes?.toLocaleString('zh-CN') ?? '—'}</td><td>${esc(row.context)}</td><td>${esc(row.price)}</td><td>${esc(row.license)}</td>`;
    return `<tr class="${/gpt-6\.2/i.test(row.name) ? 'rank-featured' : ''}">${lead}${metrics}<td><button type="button" class="model-detail" data-source-model="${esc(row.id)}">${esc(guideFor(row).label)} ↗</button></td></tr>`;
  }

  function drawTable() {
    const searchTerm = normalized(search.value.trim());
    const allRows = rated[active];
    const candidates = filter === 'gpt6' ? allRows.filter(row => isGpt6(row.name)) : allRows.slice(0, 50);
    const rows = candidates.filter(row => {
      const location = region(row.team);
      return (filter === 'all' || filter === 'gpt6' || filter === location) &&
        normalized(`${row.name} ${row.team} ${location}`).includes(searchTerm);
    });
    body.innerHTML = rows.length ? rows.map(rowMarkup).join('') : `<tr><td colspan="${benchInfo[active].columns.length}">当前榜单没有匹配记录，请尝试其他关键词或切换榜单。</td></tr>`;
    $('#rankCount').textContent = filter === 'gpt6'
      ? `GPT‑6 家族 · ${rows.length} 条 · 保留源榜名次`
      : `显示 ${rows.length} / ${Math.min(50, allRows.length)} 条 · 筛选保留源榜名次`;
  }

  function drawStatus() {
    refreshButton.disabled = pending !== null;
    refreshButton.textContent = pending === active ? '正在检查…' : '↻ 更新排行榜';
    $('#rankStatus').textContent = statusText[active] || '已载入可离线查看的核对快照';
  }

  function drawBoard() {
    const info = benchInfo[active];
    const snapshot = boards[active];
    $('#ranking').dataset.benchmark = active;
    tabs.querySelectorAll('button').forEach(button => {
      button.classList.toggle('active', button.dataset.bench === active);
      button.setAttribute('aria-pressed', String(button.dataset.bench === active));
    });
    $('#rankDateLabel').textContent = active === 'live' ? 'LiveBench 数据版本（北京时间）' : 'Arena 源榜发布日期';
    $('#rankDate').textContent = formatDay(active === 'live' ? buildDay(snapshot.revision) : snapshot.date);
    $('#rankMethod').textContent = active === 'live' ? `${info.method} · 题组 ${formatDay(snapshot.release)}` : info.method;
    $('#rankOfficial').href = info.url;
    $('#rankExplain').textContent = info.explain;
    $('#ranking thead tr').innerHTML = info.columns.map(name => `<th scope="col">${name}</th>`).join('');
    $('#rankGptNote').textContent = active === 'live'
      ? '同一套实战题比较。两款模型以 LiveBench 的 Max 推理配置参评，点卡片可看分项。'
      : '此处显示 Arena 文本总榜的实际收录情况。可切回实战能力榜查看两款模型的任务得分。';
    cards.innerHTML = ['Astra', 'Sol'].map(model => {
      const row = rated[active].find(r => normalized(r.name).startsWith('gpt-6.2 ' + model.toLowerCase()));
      return row
        ? `<button type="button" class="rank-gpt-card" data-source-model="${esc(row.id)}"><span>${esc(row.name)}</span><b>#${row.rank}</b><small>${numberText(row.score, active === 'live' ? 1 : 0)} 分 · 查看详情 ↗</small></button>`
        : `<div class="rank-gpt-card"><span>GPT‑6.2 ${model}</span><b class="rank-unlisted">未收录</b><small>当前公开快照</small></div>`;
    }).join('');
    drawStatus();
    drawTable();
  }

  function showRankDetail(event) {
    const button = event.target.closest('[data-source-model]');
    if (!button) return;
    const row = rated[active].find(r => r.id === button.dataset.sourceModel);
    if (!row) return;
    const guide = guideFor(row);
    const info = benchInfo[active];
    const stats = active === 'live'
      ? Object.entries(suiteLabels).map(([key, label]) => [label, numberText(row.stats[key])])
      : [['分数区间', `${numberText(row.lower, 0)}–${numberText(row.upper, 0)}`], ['名次区间', row.spread], ['票数', row.votes?.toLocaleString('zh-CN') ?? '—'], ['上下文', row.context], ['每百万 token 输入 / 输出价格', row.price], ['源榜许可', row.license]];
    $('#modelContent').innerHTML = `
      <div class="eyebrow">${esc(row.team)} / ${info.title}</div><h2>${esc(row.name)}</h2>
      <div class="model-score"><b>#${row.rank}</b><span>${numberText(row.score, active === 'live' ? 1 : 0)} 分${row.effort ? ` · ${esc(row.effort.toUpperCase())} 推理档` : ''}</span></div>
      <div class="rank-detail-grid">${stats.map(([label, value]) => `<span>${label}<b>${esc(value)}</b></span>`).join('')}</div>
      <h3>${esc(guide.label)}</h3><p>${esc(guide.why)}</p>
      <div class="boundary"><b>课堂任务建议</b><p>${esc(guide.task)}</p></div>
      <div class="actions"><a class="primary" href="${info.url}" target="_blank" rel="noopener noreferrer">查看原始榜单 ↗</a>${guide.source ? `<a href="${guide.source}" target="_blank" rel="noopener noreferrer">模型官方资料 ↗</a>` : ''}</div>`;
    $('#modelDialog').showModal();
  }

  async function readSource(url, signal, json = false) {
    const response = await fetch(url, { signal, cache: 'no-store', credentials: 'omit' });
    if (!response.ok) throw new Error(`源站 HTTP ${response.status}`);
    return json ? response.json() : response.text();
  }

  async function getLiveSnapshot(signal) {
    const html = await readSource(liveOrigin + '/', signal);
    const script = html.match(/<script\b[^>]*\bsrc="([^"]*\/static\/js\/main\.[\w-]+\.js)"/i)?.[1];
    if (!script) throw new Error('暂时无法识别官方数据入口');
    const bundleUrl = new URL(script, liveOrigin + '/');
    if (bundleUrl.origin !== liveOrigin) throw new Error('官方数据入口已迁移');
    const bundle = await readSource(bundleUrl, signal);
    const releaseArray = bundle.match(/\[\s*"20\d{6}"(?:\s*,\s*"20\d{6}")+\s*\]/)?.[0];
    const revision = bundle.match(/\?v=(\d{10})\b/)?.[1];
    if (!releaseArray || !revision) throw new Error('暂时无法识别官方数据版本');
    const [release] = JSON.parse(releaseArray).sort().reverse();
    const endpoint = `${liveOrigin}/data/${release}/`;
    const [csv, categories] = await Promise.all([
      readSource(`${endpoint}table.csv?v=${revision}`, signal),
      readSource(`${endpoint}categories.json?v=${revision}`, signal, true),
    ]);
    const lookup = new Map();
    for (const match of bundle.matchAll(/(?:^|[,{])(?:"([\w.+-]+)"|([\w.+-]+)):\{([^{}]*displayName:"[^"{}]+"[^{}]*)\}/g)) {
      lookup.set(match[1] || match[2], Object.fromEntries(Array.from(match[3].matchAll(/(displayName|organization|effort):"([^"{}]+)"/g), ([, key, value]) => [key, value])));
    }
    const ids = csv.trim().split(/\r?\n/).slice(1).map(line => line.split(',')[0]);
    const metadata = Object.fromEntries(ids.map(id => [id, lookup.get(id) || boards.live.metadata[id] || {}]));
    return { release, revision, csv, categories, metadata };
  }

  async function getArenaSnapshot(signal) {
    const size = 100;
    async function page(offset) {
      const url = new URL(datasetsRows);
      url.search = new URLSearchParams({ dataset: 'lmarena-ai/leaderboard-dataset', config: 'text', split: 'latest', length: String(size), offset: String(offset) });
      const data = await readSource(url, signal, true);
      if (!Array.isArray(data.rows) || !Number.isFinite(data.num_rows_total)) throw new Error('官方数据格式异常');
      return { rows: data.rows.map(entry => entry.row), total: data.num_rows_total };
    }
    const first = await page(0);
    const rows = [...first.rows];
    for (let offset = size; offset < first.total && rows.every(row => row.category === 'overall'); offset += size * 3) {
      const offsets = [offset, offset + size, offset + size * 2].filter(value => value < first.total);
      const pages = await Promise.all(offsets.map(page));
      for (const next of pages) rows.push(...next.rows);
    }
    const overall = rows.filter(row => row.category === 'overall').sort((a, b) => a.rank - b.rank);
    const date = overall[0]?.leaderboard_publish_date;
    if (!/^\d{4}-\d\d-\d\d$/.test(date || '') || overall.length < 50 || overall.some((row, index) =>
      row.rank !== index + 1 || row.leaderboard_publish_date !== date || !row.model_name || !Number.isFinite(row.rating)
    )) throw new Error('最新总榜未完整发布');
    const previous = date === boards.arena.date ? new Map(boards.arena.rows.map(row => [row.model_name, row])) : new Map();
    return { date, rows: overall.filter(row => row.rank <= 50 || isGpt6(row.model_name)).map(row => ({ ...previous.get(row.model_name), ...row })) };
  }

  async function refresh() {
    if (pending) return;
    const bench = active;
    pending = bench;
    statusText[bench] = `正在检查 ${benchInfo[bench].title} 官方数据…`;
    drawStatus();
    try {
      const signal = AbortSignal.timeout(14000);
      const snapshot = await (bench === 'live' ? getLiveSnapshot(signal) : getArenaSnapshot(signal));
      const next = parseRows[bench](snapshot);
      const previous = boards[bench];
      const availableDate = bench === 'live' ? formatDay(buildDay(snapshot.revision)) : formatDay(snapshot.date);
      const changed = newer(snapshot, previous, bench);
      const sourceIsOlder = newer(previous, snapshot, bench);
      if (!sourceIsOlder) {
        rated[bench] = next;
        boards[bench] = snapshot;
        try { localStorage.setItem(cacheKey, JSON.stringify(boards)); } catch { /* Display works without browser storage. */ }
      }
      statusText[bench] = sourceIsOlder
        ? `源站暂返回较早版本（${availableDate}），已保留较新数据`
        : changed ? `已更新至 ${availableDate} 官方数据` : `已检查源站 · 当前数据为 ${availableDate}`;
    } catch (error) {
      const reason = error.name === 'TimeoutError' ? '连接超时' : error.message === 'Failed to fetch' ? '无法连接源站' : error.message;
      statusText[bench] = `暂未更新（${reason}）· 继续显示已核对的快照`;
    } finally {
      pending = null;
      drawBoard();
    }
  }

  tabs.addEventListener('click', event => {
    const button = event.target.closest('[data-bench]');
    if (!button || button.dataset.bench === active) return;
    active = button.dataset.bench;
    drawBoard();
  });
  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filter = button.dataset.filter;
    for (const item of filters.querySelectorAll('button')) {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    }
    drawTable();
  });
  search.addEventListener('input', drawTable);
  body.addEventListener('click', showRankDetail);
  cards.addEventListener('click', showRankDetail);
  refreshButton.addEventListener('click', refresh);
  drawBoard();
})();
