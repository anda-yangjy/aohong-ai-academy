const practiceCases=[{num:'01',tool:'豆包 + WorkBuddy',title:'跨部门任务驾驶舱：从散乱信息到可视化管理',time:'约 25 分钟',outcome:'一份分析交接单 + 可筛选的单文件任务驾驶舱',protocol:'workbuddy://',source:'https://cloud.tencent.cn/document/product/1831/134389',sourceName:'腾讯云 · WorkBuddy 创建与查看任务',hook:'如果领导临时问“哪些任务有风险、谁需要协调”，你能否在几分钟内给出一张清晰的图？今天我们让豆包做分析搭档，再让 WorkBuddy 把方案做成可交互的工具。',sample:'虚构的 8 条跨部门培训筹备任务，含未完成、逾期、缺失负责人等情形。课程统一以 2026-11-15 为统计日；仅供练习。',doubao:`你是严谨的跨部门任务分析助手。请仅根据下面的虚构练习数据，帮助我设计一个任务跟进驾驶舱，统计日固定为 2026-11-15。
请分四部分输出：1. 总任务、已完成、未完成、逾期数量，并写出计算规则；逾期定义为状态不是“已完成”且截止日期早于统计日。2. 逐条列出逾期事项和缺失负责人事项，给出原始 ID。3. 给出适合非技术人员阅读的页面结构、筛选项和图表建议；建议与事实分开。4. 输出一份交给 WorkBuddy 的简洁交接单，包含字段、规则、交互、验收标准。不得编造事实或修改数据。

虚构数据（ID|部门|任务|负责人|截止日期|状态）
T01|质量|审核培训资料|林晓|2026-11-10|已完成
T02|生产|确认设备演示|周宁|2026-11-12|进行中
T03|营销|准备展示案例|王晨|2026-11-18|进行中
T04|信息|测试投影与网络|李明|2026-11-14|未开始
T05|职能|确认培训场地|陈静|2026-11-08|已完成
T06|质量|收集培训问题|待确认|2026-11-20|未开始
T07|生产|提交参训名单|赵宇|2026-11-15|已完成
T08|营销|确认讲师排期|孙悦|2026-11-13|进行中`,prompt:`请在当前独立的培训练习工作区，制作一个自包含的中文单文件 HTML“跨部门任务驾驶舱”。以下全部是虚构数据，统计日固定为 2026-11-15。
要求：顶部展示总任务、已完成、未完成、逾期四项指标；逾期=状态不是“已完成”且截止日期早于统计日。展示部门分布图或进度图、可搜索和按部门/状态筛选的任务表、逾期醒目标识、负责人缺失提示。统计卡片的规则和日期必须明确显示。页面设计现代、清晰，适配电脑与手机，不依赖外网、不上传数据、不发送消息、不覆盖已有文件。请先展示计划，待我确认再创建；完成后说明文件路径、打开方式及测试步骤。

原始虚构数据（ID|部门|任务|负责人|截止日期|状态）
T01|质量|审核培训资料|林晓|2026-11-10|已完成
T02|生产|确认设备演示|周宁|2026-11-12|进行中
T03|营销|准备展示案例|王晨|2026-11-18|进行中
T04|信息|测试投影与网络|李明|2026-11-14|未开始
T05|职能|确认培训场地|陈静|2026-11-08|已完成
T06|质量|收集培训问题|待确认|2026-11-20|未开始
T07|生产|提交参训名单|赵宇|2026-11-15|已完成
T08|营销|确认讲师排期|孙悦|2026-11-13|进行中

我会在下方另行粘贴经人工核对的豆包交接单。请优先以原始数据和上述规则为准；如果交接单与原始数据冲突，指出冲突并询问我，不自行修改事实。

【在此粘贴已核对的豆包交接单】`,steps:[['引发共鸣 · 2 分钟','提问：“如果现在要汇报跨部门任务进展，你需要向多少人问数据？”请学员猜猜：这 8 条模拟任务中有多少条逾期？'],['豆包分析 · 5 分钟','打开豆包，复制并发送“第一棒”指令。请学员观察它是否写清统计口径、列出风险事项，并生成一份交接单。'],['人工校对 · 4 分钟','对照原始数据逐项核验：总数 8、已完成 3、未完成 5、逾期 3（T02、T04、T08）；T06 负责人待确认。截止日当天的 T07 已完成，不算逾期。发现错误就要求豆包改正。'],['WorkBuddy 制作 · 7 分钟','打开 WorkBuddy，新建任务并选择独立练习目录。复制“第二棒”指令，把经过核对的豆包交接单粘贴到末尾后发送；审阅计划，确认后创建。'],['验收与互动 · 5 分钟','打开成品，核对 8 / 3 / 5 / 3；筛选“生产”应有 T02、T07；搜索 T06 可见负责人待确认；确认页面能在离线状态打开。两人互查，指出一个可能的错误。'],['举一反三 · 2 分钟','请学员说出本部门可跟进的一类事项，并提出一个改进需求，例如增加优先级字段；实际业务数据须按公司规定审批和脱敏。']] },{"num": "02", "tool": "DeepSeek Harness", "title": "Excel 费用分析师：多表清洗、预算对比与异常追踪", "time": "约 35–40 分钟", "outcome": "可追溯的分析结果.xlsx：清洗明细、问题日志、预算对比与两张图表", "protocol": "dsh://", "source": "https://www.deepseek.com/harness/", "sourceName": "DeepSeek Harness 官方 · 表格分析与办公", "hook": "一份费用表，重复项、部门别名和“待补”金额混在一起，直接求和会发生什么？大家亲手带 AI 做一次查错、清洗、核账，再把数字变成能解释的报告。", "sample": "下载下方虚构练习包：34 行费用明细、14 行10月预算、部门映射和处理规则。数据涉及质量、生产、营销、信息、职能 5 个部门，覆盖 2026 年9—10月，人民币元。", "prompt": "我准备完成“多部门费用清洗与预算分析”的 Excel 练习。工作区内有 deepseek-excel-lab.xlsx（本培训原创虚构数据），请先仅读取，不修改文件。\n1. 确认本机当前 Harness 能读取和生成真正的 .xlsx；列出可用技能及依赖，如不具备就明确说明，不声称已完成，也不要擅自安装插件。\n2. 读取“练习说明、费用明细、10月预算、部门映射”四张工作表，核对表头、日期与金额类型、审批状态、单据ID重复或冲突、部门缺失，以及预算键是否唯一。\n3. 按练习说明列出清洗规则、疑点和处理计划，注明源工作表、Excel行号及单据ID。不要推测缺失值，不将金额缺失当零，不自动选择冲突记录。\n4. 说明最终将如何校验两个月的费用、预算差异与图表。等我确认，再做后续清洗。\n仅处理这个练习目录，不覆盖源文件，不向外部业务系统发送资料。", "steps": [["提出挑战 · 3 分钟", "讲师提问：如果 AI 说“费用汇总已完成”，你要看哪些证据？请两位学员先找可能让总额出错的问题。"], ["领取练习 · 4 分钟", "点击下方下载 .xlsx，保存到独立练习目录，保留原件；打开看看四张表。启动公司允许使用的 Harness 版本，选中该目录和可用模型。"], ["第一轮：先检查 · 5 分钟", "复制“查错与计划”指令，在新会话中引用练习文件并发送。查看实际读取了哪些表、识别出哪些问题；能力不足先停下来向讲师求助。"], ["第二轮：按规则清洗 · 8 分钟", "在同一会话发送第二轮指令。确认去重与冲突隔离策略；让 AI 输出新的清洗结果，源行号和修改日志必须能查回原文。"], ["第三轮：分析与汇报 · 10 分钟", "发送第三轮指令，按年月＋部门＋费用类别匹配预算，计算费用、差异与环比，生成两张图表。读懂“预算缺失”和“预算为零”的不同含义。"], ["两人互查 · 5 分钟", "展开讲师验收卡，比对记录数与金额，再抽查 R026 重复、R027 冲突、信息部门办公预算缺失。用源表和计算验证，不能只看聊天里说完成。"], ["迁移与复盘 · 3 分钟", "在输出副本中修改一条已审批记录的金额，检查依赖它的汇总及图表是否更新。每组说出本部门一个可迁移场景，例如工单、库存或培训统计，并说明需要重定哪些规则。"]]}];
if(window.storeCase)practiceCases[1]=window.storeCase;
const practiceRoot=document.getElementById('practiceLabs');
practiceRoot.innerHTML=practiceCases.map((c,i)=>`<article class="practice-card"><div class="practice-card-head"><div><span class="practice-badge">LAB ${c.num} / ${c.tool}</span><h3>${c.title}</h3><p>${c.hook}</p></div><div class="practice-meta"><div class="lab-emblem ${i===0?'emblem-duo':'emblem-orbit'}" role="img" aria-label="${i===0?'双智能协作标识':'智能探索标识'}"><span class="emblem-ring ring-one"></span><span class="emblem-ring ring-two"></span><span class="emblem-core">${i===0?'<i></i><i></i>':'✦'}</span><span class="emblem-spark spark-one">✦</span><span class="emblem-spark spark-two">·</span></div><strong>交付成果</strong><span>${c.outcome}</span></div></div><div class="practice-body"><div class="practice-steps">${c.steps.map((x,j)=>`<div class="practice-step"><b>${String(j+1).padStart(2,'0')}</b><div><h4>${x[0]}</h4><p>${x[1]}</p></div></div>`).join('')}</div><div class="practice-side"><div class="practice-side-label">READY TO TRY / 现场操作</div><h4>材料已经准备好了</h4><p>${c.sample.replace(/\n/g,'<br>')}</p>${i===0?`<div class="handoff-label">第一棒 · 豆包分析</div><button class="practice-copy doubao-copy" data-practice="0">复制豆包分析指令 ⧉</button><a class="practice-external" href="https://www.doubao.com/" target="_blank" rel="noopener noreferrer">打开豆包 ↗</a><details><summary>查看豆包完整指令与练习数据</summary><pre class="doubao-prompt"></pre></details><div class="handoff-label">第二棒 · WorkBuddy 制作</div>`:''}<button class="primary practice-launch" data-practice="${i}">复制${i===0?'WorkBuddy 制作':'任务'}指令并打开 ${i===0?'WorkBuddy':c.tool} ↗</button><button class="practice-copy" data-practice="${i}">只复制任务 ⧉</button><p class="practice-status" role="status">需已安装应用并注册对应协议；浏览器可能请求确认。复制后请到应用内粘贴、发送并确认执行。</p><details><summary>查看完整任务指令</summary><pre></pre></details><a href="${c.source}" target="_blank" rel="noopener noreferrer">${c.sourceName} ↗</a></div></div></article>`).join('');
practiceRoot.querySelectorAll('.practice-card').forEach((card,i)=>{const ps=card.querySelectorAll('pre');if(i===0){ps[0].textContent=practiceCases[i].doubao;ps[1].textContent=practiceCases[i].prompt;}else ps[0].textContent=practiceCases[i].prompt;});
async function copyPractice(button,launch){const c=practiceCases[Number(button.dataset.practice)],status=button.parentElement.querySelector('.practice-status');try{await navigator.clipboard.writeText(button.classList.contains('doubao-copy')?c.doubao:c.prompt);status.textContent=launch?'任务已复制。正在尝试打开应用；请粘贴、发送并确认。若未打开，请手动启动。':'任务已复制，请切换到应用粘贴并发送。';if(launch)window.location.href=c.protocol;}catch(e){status.textContent='自动复制未成功，请展开完整任务指令，手动全选复制；再手动打开应用。';}}
practiceRoot.querySelectorAll('.practice-launch').forEach(b=>b.addEventListener('click',()=>copyPractice(b,true)));practiceRoot.querySelectorAll('.practice-copy').forEach(b=>b.addEventListener('click',()=>copyPractice(b,false)));
