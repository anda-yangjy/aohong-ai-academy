(() => {
  const lab = document.querySelector('#robotAssembly');
  const terms = [
    {
      name: '大模型', part: '大脑', color: '#d6ff89', dx: 0, dy: -70,
      explanation: '大模型是用大规模数据训练、通常具有较多参数的机器学习模型。自回归语言模型根据上下文逐步预测后续 Token，生成文本。',
    },
    {
      name: '提示词 Prompt', part: '指令天线', color: '#7bf1f1', dx: 85, dy: -60,
      explanation: '提示词是推理时提供给模型的指令与材料，可包含任务目标、约束条件、参考资料和输出格式，用于引导模型生成结果。',
    },
    {
      name: '上下文 / Token', part: '工作台', color: '#aab4ff', dx: 75, dy: 72,
      explanation: '上下文是模型在当前推理中可参考的信息，容量受上下文窗口限制。\n\nToken 是分词器切分文本后形成的处理单位。上下文窗口通常用 Token 数量衡量。',
    },
    {
      name: 'RAG 知识检索', part: '资料臂', color: '#85f3b1', dx: -88, dy: -22,
      explanation: 'RAG 即检索增强生成（Retrieval-Augmented Generation）。系统先从指定数据源检索相关内容，再把检索结果放入上下文，供模型生成回答时参考。',
    },
    {
      name: '幻觉', part: '核查灯', color: '#ffb373', dx: 92, dy: 15,
      explanation: '幻觉是指模型生成与事实、来源资料不一致，或缺乏可靠依据的内容。输出仍可能语法流畅、语气肯定。',
    },
    {
      name: '多模态', part: '眼睛和耳朵', color: '#f6aaff', dx: -76, dy: 45,
      explanation: '多模态是模型或系统处理多种信息形式的能力，包括文本、图像、音频和视频。可接收的输入及可生成的输出取决于模型支持的模态。',
    }
  ];
  const robotParts = [
    `<path d="M158 119v-11a62 52 0 0 1 124 0v11" fill="url(#assemblyBrain)" stroke="currentColor" stroke-width="2.5"/>
      <path d="M180 107q-3-18 13-23 4-13 19-8 8-11 19 0 16-2 20 11 14 4 12 20M220 76v34m-27-26 10 10-4 12m52-19-13 8 4 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="180" cy="107" r="3" fill="currentColor"/><circle cx="262" cy="107" r="3" fill="currentColor"/>`,
    `<path d="M275 117l30-37V56" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <circle cx="305" cy="47" r="9" fill="currentColor"/><circle cx="305" cy="47" r="16" class="robot-signal" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M312 28q15 5 18 19M317 19q22 8 25 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    `<rect x="157" y="197" width="126" height="91" rx="27" fill="url(#assemblySuit)" stroke="currentColor" stroke-width="2"/>
      <rect x="175" y="214" width="90" height="49" rx="11" fill="#101a2f" stroke="currentColor"/>
      <path d="M187 227h11m6 0h18m5 0h17m-57 9h23m6 0h13m5 0h17m-64 10h15m7 0h17m6 0h13" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M177 284v12h-14a10 10 0 0 0-10 10v4h49v-26m61 0v12h14a10 10 0 0 1 10 10v4h-49v-26" fill="#424775" stroke="currentColor" stroke-width="2"/>`,
    `<path d="M160 223l-26-4-18 18-11-5" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="134" cy="219" r="6" fill="#143238"/>
      <path d="M64 204q17-3 26 6 10-9 27-6v33q-17-3-27 6-9-9-26-6z" fill="#225a4b" stroke="currentColor" stroke-width="2"/>
      <path d="M90 211v29m-19-26 12 3m-12 5 12 3m14-8 12-3m-12 11 12-3" fill="none" stroke="currentColor" stroke-width="2"/>`,
    `<g class="robot-alert"><path d="M281 223l24-5 13 10" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
      <path d="M331 207l22 13v24l-22 14-22-14v-24z" fill="#653d29" stroke="currentColor" stroke-width="2"/>
      <path d="M331 219v12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="331" cy="239" r="2.5" fill="currentColor"/></g>`,
    `<rect x="155" y="117" width="130" height="76" rx="27" fill="url(#assemblyFace)" stroke="currentColor" stroke-width="2"/>
      <rect x="168" y="130" width="104" height="48" rx="18" fill="#151e33"/>
      <g class="robot-eyes"><rect x="183" y="141" width="18" height="17" rx="7" fill="currentColor"/><rect x="239" y="141" width="18" height="17" rx="7" fill="currentColor"/></g>
      <path d="M211 160q9 10 18 0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="144" y="138" width="12" height="32" rx="6" fill="#5b436f" stroke="currentColor"/><rect x="284" y="138" width="12" height="32" rx="6" fill="#5b436f" stroke="currentColor"/>`
  ];

  const stage = lab.querySelector('.assembly-stage');
  lab.querySelector('.assembly-robot').innerHTML = `
    <defs>
      <linearGradient id="assemblyBrain" x2="100%" y2="100%"><stop stop-color="#47644b"/><stop offset="1" stop-color="#172b35"/></linearGradient>
      <linearGradient id="assemblySuit" x2="100%" y2="100%"><stop stop-color="#565d94"/><stop offset="1" stop-color="#22243c"/></linearGradient>
      <linearGradient id="assemblyFace" x2="0%" y2="100%"><stop stop-color="#855b8f"/><stop offset="1" stop-color="#354460"/></linearGradient>
    </defs>
    <circle class="robot-orbit" cx="220" cy="174" r="143"/>
    <circle class="robot-orbit inner" cx="220" cy="174" r="119"/>
    <ellipse class="robot-floor" cx="220" cy="313" rx="107" ry="11"/>
    <g class="robot-outline" fill="none"><path d="M157 118v-10a63 52 0 0 1 126 0v10m-8-7 30-32V52m-22 171 24-5 21 15m-168-10-26-4-18 18-27-10m88 58v14h-16l-8 11h49v-24m61 0v14h16l8 11h-49v-24"/><rect x="155" y="117" width="130" height="76" rx="27"/><rect x="157" y="197" width="126" height="91" rx="27"/></g>
    <g class="robot-body">${[2,3,4,1,0,5].map(index => {
      const term = terms[index];
      return `<g class="robot-piece" data-piece="${index}" style="--piece-color:${term.color};--enter-x:${term.dx}px;--enter-y:${term.dy}px">${robotParts[index]}</g>`;
    }).join('')}</g>`;

  const controls = lab.querySelector('.assembly-terms');
  controls.innerHTML = terms.map((term, index) => `<button type="button" class="assembly-term" data-term="${index}" aria-pressed="false">
    <span class="assembly-dot" style="--piece-color:${term.color}" aria-hidden="true"></span>
    <span><b>${term.name}</b><small>${term.part}</small></span>
    <span class="assembly-check" aria-hidden="true">＋</span>
  </button>`).join('');

  const buttons = [...controls.querySelectorAll('button')];
  const pieces = terms.map((_, index) => stage.querySelector(`[data-piece="${index}"]`));
  const progress = lab.querySelector('progress');
  const progressText = lab.querySelector('.assembly-count');
  const title = lab.querySelector('.assembly-explanation h4');
  const description = lab.querySelector('.assembly-description');
  const initialTitle = title.textContent;
  const initialDescription = description.textContent;
  const next = lab.querySelector('.assembly-next');
  const pause = lab.querySelector('.assembly-pause');
  const assembled = new Set();

  function updateProgress() {
    const complete = assembled.size === terms.length;
    progress.value = assembled.size;
    progressText.textContent = complete ? '组装完成，机器人已启动！' : `已装配 ${assembled.size} / ${terms.length}`;
    stage.classList.toggle('is-complete', complete);
    next.setAttribute('aria-disabled', String(complete));
    next.textContent = complete ? '全部部件已装好' : assembled.size ? '讲下一个 →' : '从大模型开始 →';
  }

  function reveal(index) {
    const term = terms[index];
    assembled.add(index);
    pieces[index].classList.add('is-fitted');
    buttons.forEach((button, position) => {
      button.setAttribute('aria-pressed', String(position === index));
      button.classList.toggle('is-fitted', assembled.has(position));
      button.querySelector('.assembly-check').textContent = assembled.has(position) ? '✓' : '＋';
    });
    title.textContent = `${term.name} · ${term.part}`;
    description.textContent = term.explanation;
    updateProgress();
  }

  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-term]');
    if (button) reveal(Number(button.dataset.term));
  });
  next.addEventListener('click', () => {
    const index = terms.findIndex((_, position) => !assembled.has(position));
    if (index !== -1) reveal(index);
  });
  pause.addEventListener('click', () => {
    const paused = stage.classList.toggle('is-paused');
    pause.setAttribute('aria-pressed', String(paused));
    pause.textContent = paused ? '播放动画' : '暂停动画';
  });
  lab.querySelector('.assembly-reset').addEventListener('click', () => {
    assembled.clear();
    pieces.forEach(piece => piece.classList.remove('is-fitted'));
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', 'false');
      button.classList.remove('is-fitted');
      button.querySelector('.assembly-check').textContent = '＋';
    });
    title.textContent = initialTitle;
    description.textContent = initialDescription;
    updateProgress();
  });
})();
