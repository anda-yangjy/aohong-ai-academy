const historyMilestones = [
  {
    year: '1956', label: '达特茅斯研讨会', title: '当「机器能不能思考」成了研究课题',
    story: '1956 年夏天，研究者聚到达特茅斯学院，讨论能否把学习、推理等能力描述得足够清楚，让机器模拟。研讨会的提案把「人工智能」写进了标题。',
    example: '问大家：如果让机器帮你把邮件分类，你怎么把「紧急」解释给机器听？当年的研究者就在追问，怎样把人会做的事说清楚。',
    image: '1956', alt: '达特茅斯学院展示的人工智能夏季研究项目提案', caption: '达特茅斯学院 · 1955 年提案，研讨会于 1956 年举行',
    source: 'https://home.dartmouth.edu/about/artificial-intelligence-ai-coined-dartmouth',
    sourceName: '达特茅斯学院',
  },
  {
    year: '1997', label: '深蓝下国际象棋', title: '世界棋王遇到了专门为下棋造的电脑',
    story: 'IBM 的深蓝在六局重赛中以 3½ 比 2½ 击败世界棋王卡斯帕罗夫。它会快速推演大量棋路，再用针对国际象棋设计的规则评估局面。',
    example: '请大家想象点外卖：人常凭经验缩小范围，深蓝像是先把大量选择算过一遍。这样的本领很强，但专门用在棋盘上。',
    image: '1997', alt: 'IBM 深蓝历史档案的配图', caption: 'IBM · 深蓝历史档案',
    source: 'https://www.ibm.com/history/deep-blue', sourceName: 'IBM 历史档案',
  },
  {
    year: '2012', label: 'AlexNet 识图', title: '机器开始从大量图片里自己学特征',
    story: 'AlexNet 在 ImageNet 图像识别比赛取得突破。论文报告，前五候选类别的错误率为 15.3%，第二名为 26.2%。这个结果让更多人看到，深层神经网络可以从大量带标签图片中学到用于识别的特征。',
    example: '想象把标注为「杯子」和「水瓶」的照片交给模型学习。它看过不同角度和背景后，再试着判断一张新照片。',
    chart: true, caption: '同场 ImageNet 比赛 · Top‑5 错误率，越低越好',
    source: 'https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html',
    sourceName: 'NeurIPS 原论文',
  },
  {
    year: '2016', label: 'AlphaGo 下围棋', title: 'AlphaGo 下出职业棋手意料之外的一步',
    story: 'AlphaGo 在首尔以 4∶1 击败李世石。第二局第 37 手落在少见的位置，成了这场比赛广为人知的一步。AlphaGo 将神经网络和搜索结合，为复杂局面选棋。',
    example: '可以问学员：AI 提了一个大家从没试过的方案，你会怎么验证它？把它当成候选做小范围对照试验，往往比凭感觉接受或否定更有用。',
    image: '2016', alt: 'Google DeepMind AlphaGo 项目页面配图', caption: 'Google DeepMind · AlphaGo 项目资料',
    source: 'https://deepmind.google/research/alphago/', sourceName: 'Google DeepMind',
  },
  {
    year: '2017', label: 'Transformer', title: '模型可以学会一句话里哪些词关系最紧',
    story: '《Attention Is All You Need》提出 Transformer。它用注意力机制把序列中相关的位置联系起来，这后来成了许多大语言模型的重要基础。',
    example: '投屏读一句：「小李把质检报告发给小王，因为她负责复核。」请大家指出判断「她」是谁时，会回看哪些词。模型也会在词与词之间建立联系。',
    flow: ['质检报告', '她', '负责复核'], style: 'attention', caption: '注意力机制教学示意 · 在上下文里建立联系',
    source: 'https://arxiv.org/abs/1706.03762', sourceName: 'arXiv 论文',
  },
  {
    year: '2022', label: 'ChatGPT 发布', title: '用聊天的方式，就能让 AI 帮你改稿',
    story: '2022 年 11 月 30 日，OpenAI 公开发布 ChatGPT 的研究预览。用户可以用自然语言提问，再通过追问调整上一轮给出的内容。',
    example: '先让 AI 写一份培训通知，再追问「压到 80 字，补上地点，语气轻松一点」。让学员感受怎么用一轮追问改善初稿。',
    conversation: ['帮我写一份培训通知。', '初稿已整理，接下来还可以调整时间、语气和长度。', '改成 80 字，补上地点。'],
    caption: '课堂对话示例',
    source: 'https://openai.com/index/chatgpt/', sourceName: 'OpenAI 发布公告',
  },
  {
    year: '2023', label: 'GPT‑4 亮相', title: '图片也能成为你提问的一部分',
    story: 'OpenAI 发布 GPT‑4 时介绍，它可以接收图像和文字输入，并输出文字。图像输入的可用范围随当时的产品和测试阶段而不同。',
    example: '把虚构销售折线图和问题一起交给模型：「哪一段变化最明显？」然后让学员回到源表，核对月份和具体数字。',
    flow: ['图表截图', '我的问题', '文字解读'], style: 'vision', caption: '图像 + 文字输入 → 文字输出 · 教学示意',
    source: 'https://openai.com/index/gpt-4-research/', sourceName: 'OpenAI GPT‑4 介绍',
  },
  {
    year: '2024', label: 'GPT‑4o 多模态', title: '从打字提问，走到看着同一张图交谈',
    story: 'OpenAI 发布 GPT‑4o，将文本、图像和音频纳入同一个模型。同期，国内的 Qwen2.5 和 DeepSeek‑V3 也发布了开放模型。',
    example: '投屏打开一张费用图表，请学员设计两个问题：一个问「花了多少」，另一个问「哪项费用最值得复核」。先看 AI 能不能读懂，再查原表。',
    flow: ['文字', '图像', '声音'], style: 'omni', caption: 'GPT‑4o 多模态能力 · 教学示意',
    source: 'https://openai.com/index/hello-gpt-4o/', sourceName: 'OpenAI GPT‑4o 介绍',
  },
  {
    year: '2025', label: 'DeepSeek‑R1 推理', title: '复杂题先拆开，再一步一步核对',
    story: 'DeepSeek 在 1 月发布开放权重的 R1 和 R1‑Zero，并提供多种体量的蒸馏模型。推理模型让分步骤解决数学、代码等复杂任务成为更多人可以试用的能力。',
    example: '给 AI 一份虚构的门店销售表，请它先说明「环比」的计算口径，再列出异常门店。最后选一行，用 Excel 公式手算复核。',
    flow: ['确认口径', '计算环比', '抽样复核'], style: 'reason', caption: '门店销量分析 · 推理任务的课堂拆解',
    source: 'https://deepseek.com/en/news/deepseek-r1/', sourceName: 'DeepSeek 发布公告',
  },
  {
    year: '2026', label: '办公 Agent', title: '交付的不只是一段话，还可以是一份文件',
    story: '以腾讯 WorkBuddy 为例，办公 Agent 可以在授权工作区中使用工具，处理资料并组织交付。工作方式从问一个问题，变成给任务、审步骤、验结果。',
    example: '接到一张杂乱的 Excel，先让 Agent 列清洗计划，再分步生成月度图表和网页驾驶舱。最后抽查原表和首页指标。后面的「项目实操」正好演这条路径。',
    flow: ['原始 Excel', '清洗和分析', '网页驾驶舱'], style: 'agent', caption: 'Excel → 网页驾驶舱 · 培训实操路径',
    source: 'https://cloud.tencent.cn/document/product/1831/137516', sourceName: '腾讯云 WorkBuddy 文档',
  },
];

const historySection = document.getElementById('aiHistory');
historySection.innerHTML = `
  <div class="history-shell">
    <div class="history-head">
      <div>
        <span class="eyebrow">TIME TRAVEL / AI 发展史</span>
        <h3>从「机器能思考吗」，<br>到办公桌边的 AI 搭档。</h3>
        <p>点年份看事件、配图和课堂例子。手动选中后可停留讲解。</p>
      </div>
      <button type="button" id="historyPause"></button>
    </div>
    <div class="history-track" id="historyTrack" role="group" aria-label="选择 AI 发展年份">
      ${historyMilestones.map((item, index) => `<button type="button" data-era="${index}" aria-label="${item.year} ${item.label}"><i aria-hidden="true"></i>${item.year}</button>`).join('')}
    </div>
    <div class="history-display" id="historyDisplay"></div>
  </div>`;

const historyDisplay = historySection.querySelector('#historyDisplay');
const historyTrack = historySection.querySelector('#historyTrack');
const historyPause = historySection.querySelector('#historyPause');
const historyButtons = historyTrack.querySelectorAll('button');
let historyEra = 0;
let historyPaused = matchMedia('(prefers-reduced-motion: reduce)').matches;
let historyVisible = !('IntersectionObserver' in window);
let historyTimer;

const historySymbols = {
  report: 'M5 3h10l4 4v14H5z M14 3v5h5 M8 12h8m-8 4h8',
  person: 'M16 8a4 4 0 1 0-8 0 4 4 0 1 0 8 0Z M4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2',
  check: 'M5 5h14v14H5z M8 12l3 3 5-6',
  chart: 'M4 4v16h16 M7 15l4-5 4 3 5-7',
  question: 'M3 5h18v12H9l-4 4v-4H3z M10 9a2 2 0 1 1 3 1.7l-1 1.3m0 2v.1',
  text: 'M4 6h16 M4 10h13 M4 14h16 M4 18h10',
  image: 'M3 4h18v16H3z M3 17l5-5 4 4 4-6 5 7 M8 8h.1',
  audio: 'M3 11v2m4-6v10m5-14v18m5-14v10m4-6v2',
  table: 'M3 4h18v16H3z M3 9h18M3 14h18M9 4v16m6-16v16',
  filter: 'M3 4h18l-7 8v6l-4 2v-8z',
  dashboard: 'M3 4h18v16H3z M3 8h18m-14 8v-3m4 3v-5m4 5v-2m3 2v-5',
};
const historyFlowSymbols = {
  attention: ['report', 'person', 'check'],
  vision: ['chart', 'question', 'text'],
  omni: ['text', 'image', 'audio'],
  reason: ['report', 'chart', 'check'],
  agent: ['table', 'filter', 'dashboard'],
};

function historyArt(item) {
  if (item.image) {
    return `<img src="assets/ai-history/${item.image}.webp" alt="${item.alt}">`;
  }
  if (item.chart) {
    return `<div class="history-chart">
      <div><span>AlexNet</span><i style="--bar:51%"></i><strong>15.3%</strong></div>
      <div><span>第二名</span><i style="--bar:87.3%"></i><strong>26.2%</strong></div>
    </div>`;
  }
  if (item.conversation) {
    return `<div class="history-chat">${item.conversation.map(line => `<span>${line}</span>`).join('')}</div>`;
  }
  return `<div class="history-flow history-flow-${item.style}">${item.flow.map((line, index) => {
    const symbol = historyFlowSymbols[item.style][index];
    return `<span><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"><path d="${historySymbols[symbol]}"/></svg>${line}</span>`;
  }).join('')}</div>`;
}

function showHistoryEra(index) {
  historyEra = index;
  const item = historyMilestones[index];
  historyDisplay.innerHTML = `
    <figure class="history-figure">
      <div class="history-art">${historyArt(item)}</div>
      <figcaption>${item.caption}</figcaption>
    </figure>
    <div class="history-story">
      <span class="history-year">${item.year}</span>
      <h4>${item.title}</h4>
      <p>${item.story}</p>
      <div class="history-example"><b>课堂怎么讲</b><p>${item.example}</p></div>
      <a href="${item.source}" target="_blank" rel="noopener noreferrer">${item.sourceName} ↗</a>
    </div>`;
  historyButtons.forEach((button, position) => {
    button.classList.toggle('active', position === index);
    button.setAttribute('aria-pressed', String(position === index));
  });
}

function scheduleHistory() {
  clearInterval(historyTimer);
  historyPause.textContent = historyPaused ? '▶ 继续轮播' : 'Ⅱ 暂停轮播';
  historyPause.setAttribute('aria-pressed', String(historyPaused));
  if (!historyPaused && historyVisible) {
    historyTimer = setInterval(() => {
      if (!document.hidden) showHistoryEra((historyEra + 1) % historyMilestones.length);
    }, 12500);
  }
}

historyPause.addEventListener('click', () => {
  historyPaused = !historyPaused;
  scheduleHistory();
});
historyTrack.addEventListener('click', event => {
  const button = event.target.closest('[data-era]');
  if (!button) return;
  historyPaused = true;
  showHistoryEra(Number(button.dataset.era));
  scheduleHistory();
});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    historyVisible = entry.isIntersecting;
    scheduleHistory();
  }, { threshold: 0.2 }).observe(historySection);
}
showHistoryEra(0);
scheduleHistory();
