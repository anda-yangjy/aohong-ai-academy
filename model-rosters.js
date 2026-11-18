(() => {
  const deepseekRows = [
    ['DeepSeek-V4.1-Flash-1017', '代码与视觉理解', '从报错截图提取线索，并给出需人工确认的排查项。', 'https://api-docs.deepseek.com/zh-cn/news/news261017/'],
    ['DeepSeek-V4-Pro-0813', '复杂推理', '比较两种报表口径，列出各自假设和适用条件。', 'https://api-docs.deepseek.com/zh-cn/updates/'],
    ['DeepSeek-V4-Flash', '轻量工具协作 · 历史型号', '适合讲解 V4 系列如何把文本模型用于批量整理。原 API 名称现由新版提供服务。', 'https://api-docs.deepseek.com/zh-cn/'],
    ['DeepSeek-V3.2', '推理与工具调用 · 历史型号', '从多份模拟工单中提取共同问题，再生成分类表。', 'https://huggingface.co/deepseek-ai/DeepSeek-V3.2'],
    ['DeepSeek-R1', '开放权重推理 · 历史型号', '分步骤演算一题 Excel 环比，最后用原表数据复核。', 'https://deepseek.com/en/news/deepseek-r1/'],
  ];
  const openAiGpt62 = 'https://openai.com/index/introducing-gpt-6-2-astra-sol/';
  const museWonder = 'https://about.fb.com/news/2026/10/introducing-muse-wonder-models/';
  const rosters = {
    deepseek: {
      label: 'DeepSeek 代表模型 TOP 5',
      note: '从 V4.1 讲到 R1，覆盖视觉、推理、工具调用和开放权重。历史型号的 API 状态以官方更新日志为准。',
      rows: deepseekRows,
    },
    qwen: {
      label: '通义千问代表模型 TOP 5',
      note: '从旗舰推理到轻量图文，再到音视频处理。适合用同一个办公任务讲清不同规格的取舍。',
      source: 'https://www.alibabacloud.com/help/en/model-studio/newly-released-models',
      rows: [
        ['Qwen4-Max', '旗舰推理与编程', '拆解跨部门需求，先写清规则和验收条件。'],
        ['Qwen3.8-Max', '复杂图文任务', '阅读带表格截图的经营简报，提取异常并标注出处。'],
        ['Qwen3.7-Plus', '通用办公', '合并部门周报，按进展、风险和待办输出。'],
        ['Qwen3.8-Flash', '快速图文处理', '批量归类练习工单，输出统一字段。'],
        ['Qwen3.8-Omni-Flash', '音视频输入', '从获授权的演示视频整理内容摘要。'],
      ],
    },
    doubao: {
      label: '豆包 Seed 代表模型 TOP 5',
      note: '型号来自火山方舟。课堂上可以用 Pro、Lite、Turbo、Mini 讲解复杂度、响应和部署成本的取舍。',
      source: 'https://console.volcengine.com/ark/region%3Acn-beijing/docs/model-list',
      rows: [
        ['Doubao‑Seed‑2.1‑Pro', '复杂图文推理', '综合月报和销售图，说明异常可能出现在哪些环节。'],
        ['Doubao‑Seed‑2.1‑Lite', '长资料整理', '把多份模拟培训材料整理成可检索的问答。'],
        ['Doubao‑Seed‑2.1‑Turbo', '图文与界面任务', '读懂表单示意图，整理操作步骤和所需字段。'],
        ['Doubao‑Seed‑2.0‑Lite（0428）', '批量信息抽取', '从一组练习记录中提取事项、时间和状态。'],
        ['Doubao‑Seed‑2.0‑Mini（0428）', '轻量分类与摘要', '把常见问题按主题归类，再写一句话摘要。'],
      ],
    },
    workbuddy: {
      label: 'WorkBuddy 可选模型 TOP 5',
      note: '腾讯云和 DeepSeek 文档公开列出的接入示例。具体可选项和配置方式以个人版或企业版客户端为准。',
      source: 'https://cloud.tencent.com/document/product/1831/134445',
      rows: [
        ['混元 Hy3', '中文推理', '把跨部门会议材料整理成有依赖关系的任务清单。'],
        ['DeepSeek-V4.1-Flash', '代码与视觉理解', '根据表格样例和样式截图生成网页驾驶舱初稿。', 'https://deepseek.com/en/news/deepseek-v4-1-flash/'],
        ['GLM-5.2', '通用任务', '套用指定模板制作周报，保留需要补充的字段。'],
        ['Kimi-K2.7-Code', '代码生成', '在练习工作区增加 Excel 导入功能并检验异常数据。'],
        ['MiniMax-M3', '多模态与代码', '结合截图和文字要求，制作可预览的统计页面。'],
      ],
    },
    harness: {
      label: 'DeepSeek Harness 与模型 TOP 5',
      note: 'Harness 是 DeepSeek 的 Agent 框架。官方文档当前说明模型服务由 V4.1-Flash-1017 提供。下列是 DeepSeek 系列代表作，展示版本演进。',
      link: ['查看 Harness 官方说明', 'https://api-docs.deepseek.com/guides/harness'],
      rows: deepseekRows,
    },
    coze: {
      label: '扣子可选模型 TOP 5',
      note: '前四款来自扣子 Agent 模型设置，第五款来自扣子编程的发布记录。实际选择以功能入口、版本和账号为准。',
      source: 'https://docs.coze.cn/model-settings',
      rows: [
        ['DeepSeek-V4-Pro', '复杂任务分析', '为知识库问答设计多步分类规则。'],
        ['GLM-5.3', '工具协作', '为模拟报修助手设计信息收集和分流流程。'],
        ['Doubao‑Seed‑2.1‑Pro', '图文理解', '把一份展板截图拆成可复用的文案字段。'],
        ['Kimi K3', '资料整理', '整理一组公开培训资料，并列出参考出处。'],
        ['MiniMax M2.5', '扣子编程 · 历史记录', '演示从页面需求到原型的任务拆解。', 'https://docs.coze.cn/guides_model_release_note'],
      ],
    },
    kimi: {
      label: 'Kimi 代表模型 TOP 5',
      note: '来自月之暗面发布记录。包括旗舰、编程专向和前代代表作，课堂可按任务挑选对比。',
      rows: [
        ['Kimi K3.1 Pro', '复杂编程与 Agent', '根据多份输入材料整理需求、生成代码并检查交付物。', 'https://www.kimi.com/news/kimi-k3-1-pro'],
        ['Kimi K3', '长资料与任务协作', '从多篇公开资料中分主题提取观点和出处。', 'https://www.kimi.com/help/others/model-mode-selection'],
        ['Kimi K2.7 Code', '编程专向', '给已有网页增加省份筛选，并验证空结果和重置。', 'https://huggingface.co/moonshotai/Kimi-K2.7-Code'],
        ['Kimi K2.6', '图文与工作任务', '对照报表截图和文字版口径，找出差异。', 'https://huggingface.co/moonshotai/Kimi-K2.6'],
        ['Kimi K2.5', '视觉语言 · 前代', '读训练用的设备标签图片，整理可复核的字段。', 'https://huggingface.co/moonshotai/Kimi-K2.5'],
      ],
    },
    minimax: {
      label: 'MiniMax 代表模型 TOP 5',
      note: '聚焦 M 系列语言模型。从 M3.1 Flash 向前对照几代在编码、工具调用和办公任务上的定位。',
      rows: [
        ['MiniMax M3.1 Flash', '快速 Agent 与工具任务', '分批整理练习资料，输出统一模板并汇总。', 'https://www.minimax.io/blog/minimax-m31f'],
        ['MiniMax M3', '原生多模态与复杂编程', '参考截图和需求文档生成网页，再检查布局。', 'https://www.minimax.io/models/text/m3'],
        ['MiniMax M2.7', '编程与任务迭代 · 前代', '逐步为驾驶舱增加排序、筛选和导出。', 'https://huggingface.co/MiniMaxAI/MiniMax-M2.7'],
        ['MiniMax M2.5', '工具调用与办公 · 前代', '把重复的报告整理拆成多步可验收任务。', 'https://huggingface.co/MiniMaxAI/MiniMax-M2.5'],
        ['MiniMax M2.1', '多语言编程 · 前代', '把短脚本移植到另一种语言，用同一组样本核对。', 'https://huggingface.co/MiniMaxAI/MiniMax-M2.1'],
      ],
    },
    gemini: {
      label: 'Gemini 代表模型 TOP 5',
      note: 'Google 的 Gemini 系列覆盖深度推理、快速执行和实时语音。可用同一份模拟资料比较不同型号擅长的任务。',
      source: 'https://ai.google.dev/gemini-api/docs/models',
      rows: [
        ['Gemini 4 Carbon', '复杂推理与长程任务', '交给它一份模拟项目档案，请它找出多个方案的取舍和待验证假设。'],
        ['Gemini 4 Argon', '多步编程与知识工作', '从几份部门周报提取风险、负责人和待办事项。'],
        ['Gemini 4 Hydrogen', '快速执行与工具协作', '批量整理练习表里的任务状态，按规定格式生成清单。'],
        ['Gemini 3.8 Flash', '快速推理与代码生成', '为培训报名页写一段表单校验，再用三组样本检查。'],
        ['Gemini 3.8 Live', '实时语音交互', '做一轮模拟现场答疑，根据追问补充示例。', 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/'],
      ],
    },
    codex: {
      label: 'Codex 可选模型 TOP 5',
      note: 'Codex 是 OpenAI 的编程 Agent。这里列出官方文档提到的 GPT 型号，实际可选项与账号和工作区设置有关。',
      source: 'https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex',
      rows: [
        ['GPT‑6.2 Astra', '复杂编程与多文件交付', '把模拟销售 Excel 变成带筛选、图表和检查步骤的网页驾驶舱。', openAiGpt62],
        ['GPT‑6.2 Sol', '日常代码与办公交付', '在已有培训网页增加搜索框，并用虚构数据验证空结果。', openAiGpt62],
        ['GPT‑6.1 Sol', 'Agent 编程', '给内部练习工具加上导入预览，检查列名缺失时的提示。'],
        ['GPT‑6.1 Terra', '快速执行与计算机操作', '整理练习目录中的同格式文件，生成文件清单和处理说明。', 'https://openai.com/index/introducing-gpt-6-1-terra/'],
        ['GPT‑6 Luna', '高频轻量任务', '统一页面标签、文案与文件命名，逐项核对修改结果。'],
      ],
    },
    claude: {
      label: 'Claude 代表模型 TOP 5',
      note: 'Anthropic 的 Fable、Opus、Sonnet 和 Haiku 面向不同复杂度的任务。适合拿同一份材料，比较总结和审阅效果。',
      rows: [
        ['Claude Fable 5.2', '复杂分析与技术任务', '审阅一份模拟项目方案，列出互相冲突的约束和验证步骤。', 'https://www.anthropic.com/claude-fable-and-mythos-5-2'],
        ['Claude Opus 5.5', '长文理解与代码协作', '对照两版培训手册，列出修改点、原文位置和影响。', 'https://www.anthropic.com/claude-opus-5-5'],
        ['Claude Sonnet 5.5', '日常知识工作与代码', '根据评审意见改写一页说明稿，同时保留关键数字。', 'https://www.anthropic.com/claude-sonnet-5-5'],
        ['Claude Haiku 5.5', '快速分类与摘要', '给一批模拟咨询记录打标签，抽查分类是否一致。', 'https://www.anthropic.com/claude-haiku-5-5'],
        ['Claude Fable 5.1', '复杂任务 · 前代代表', '用同一份模拟项目简报，与新一代模型对照拆解步骤。', 'https://www.anthropic.com/claude/fable'],
      ],
    },
    grok: {
      label: 'Grok 代表模型 TOP 5',
      note: '覆盖 Grok 的语言推理、工具调用，以及 Grok 品牌下的图像和语音模型。涉及带来源的结论时，可在课堂当场核对原文。',
      rows: [
        ['Grok 4.7', '旗舰推理与工具调用', '汇总指定的公开材料，按出处列出共识和还待核对的问题。', 'https://x.ai/news/grok-4-7'],
        ['Grok 4.6', '编程与多步任务', '读取模拟销售表的字段说明，设计分析步骤与错误提示。', 'https://x.ai/news/grok-4-6'],
        ['Grok 4.1 Fast', '工具调用 · 前代代表', '用虚构工单演示如何先查资料、再产出带来源的摘要。', 'https://x.ai/news/grok-4-1-fast'],
        ['Grok Imagine Image 2.0', '图像生成', '给一份内部培训设计两版概念配图，再由讲师选择。', 'https://docs.x.ai/developers/models'],
        ['Grok Voice 3.0', '实时语音对话', '模拟语音接待，从对话中收集问题类别和后续行动。', 'https://docs.x.ai/developers/release-notes'],
      ],
    },
    muse: {
      label: 'Meta Muse 代表模型 TOP 5',
      note: 'Meta 的 Wonder 系列面向复杂任务，Spark 系列覆盖编程、工具协作和多模态。各型号可用入口以 Meta 公告为准。',
      rows: [
        ['Muse Wonder Full', '复杂推理与长程任务', '评估跨部门任务计划，逐条找出遗漏的依赖关系。', museWonder],
        ['Muse Wonder', '编程与 Agent 协作', '按明确需求制作网页，并记录改动和检查结果。', museWonder],
        ['Muse Spark 1.3', '工具协作与代码', '把模拟任务表转为分组看板，检查任务是否遗漏。', 'https://research.meta.ai/blog/introducing-muse-spark-1-3'],
        ['Muse Spark Open', '开放权重与编程', '用相同的练习指令对照开放权重与其他型号的交付结果。', 'https://ai.meta.com/llama/'],
        ['Muse Spark 1.2', '多模态理解 · 前代代表', '把虚构的统计图和问题一起交给模型，再回表核对趋势。', 'https://research.meta.ai/blog/multimodal-intelligence-of-muse-spark-1-2'],
      ],
    },
  };

  const container = document.querySelector('#chinaAi');
  const dialog = document.createElement('dialog');
  dialog.className = 'model-roster';
  dialog.setAttribute('aria-labelledby', 'rosterTitle');
  dialog.innerHTML = `
    <div class="dialog-top"><span>国内外 AI 地图</span><form method="dialog"><button type="submit" aria-label="关闭代表模型">✕</button></form></div>
    <div class="roster-content"></div>`;
  container.append(dialog);
  const content = dialog.querySelector('.roster-content');

  container.addEventListener('click', event => {
    const button = event.target.closest('[data-roster]');
    if (!button) return;
    const roster = rosters[button.dataset.roster];
    content.innerHTML = `
      <h3 id="rosterTitle">${roster.label}</h3>
      <p class="roster-caption">2026.11.18 核对 · 按旗舰、典型用途与产品代表性编排</p>
      <p>${roster.note}</p>
      ${roster.link ? `<a href="${roster.link[1]}" target="_blank" rel="noopener noreferrer">${roster.link[0]} ↗</a>` : ''}
      <ol class="roster-list">
        ${roster.rows.map(([name, specialty, example, source], index) => `
          <li><span class="roster-number" aria-hidden="true">0${index + 1}</span><div>
            <h4>${name}</h4><b>${specialty}</b><p>${example}</p>
          </div><a href="${source ?? roster.source}" target="_blank" rel="noopener noreferrer" aria-label="${name} 的资料">资料 ↗</a></li>`).join('')}
      </ol>`;
    dialog.showModal();
  });
})();
