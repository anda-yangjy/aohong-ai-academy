(() => {
  const prompts = [
    window.storeCase.prompt,
    `按照刚才确认的计划，继续处理 store-sales-lab.xlsx 中唯一的“杂乱数据”表。保留原 Excel，先完成清洗和核对。

1. 完全相同的单据 ID 记录保留第一次；同 ID 业务字段冲突的记录整组隔离；成本缺失整行隔离，不填零；取消记录排除；退货的负数计入销售额和成本。
2. 保留原 Excel 行号及原始字段，计算毛利＝销售额－成本。列出异常 ID、原始行号、原因和处理方式。
3. 按月、区域、省份、城市门店和商品类别汇总销售额、成本及毛利，计算毛利率。给出原始、重复、冲突、缺失、取消及清洗后的行数，确保可以相加对账。
4. 月销售目标在同一“月份＋门店 ID”的商品行中重复出现，先核对一致后每组只取一次。目标缺失和零目标分别标记，不计算达成率。全部月份的目标按有效月份＋门店组合去重后汇总，缺失或零目标不可当作完整目标。
5. 库存只在 2026 年 6 月行中给出，是 6 月 30 日的快照。按“门店 ID＋商品 ID＋快照日期”去重后统计，库存小于预警阈值为练习预警，不随月份累计。
请展示清洗及汇总结果，等待我确认后再制作网页。处理不了的数据明确标记，不要猜测。`,
    `现在请把已核对的单表数据制作成一份可交付的中文网页驾驶舱，并保留原 Excel。

1. 在当前练习目录创建“门店经营驾驶舱.html”，将清洗后数据内嵌，双击即可离线打开。不要连接外部接口或依赖网络资源。
2. 顶部提供月份、区域、省份、城市门店、商品类别筛选，区域变化时省份与门店选项同步更新。展示销售额、毛利、毛利率和清洗后记录数，筛选后同步变化。
3. 制作多种清晰、精美的分析图：月度销售与毛利趋势、城市门店排名、商品类别对比、门店销售额与毛利率、各省销售分布。图表必须来自清洗后的数据，标明单位与口径。
4. 加入门店目标达成热力图和 2026-06-30 库存预警清单。目标按月份＋门店去重，分类筛选时避免把单一类别销售额与全店目标比较；库存按门店＋商品＋快照日期去重，不跟随月份累计。缺失或零目标显示原因，不算达成率。
5. 展示异常处理和统计说明，用当前筛选结果生成不超过三条可核对的观察，不猜测原因。界面适合大屏，支持电脑及手机。
6. 实际打开网页，检查四个核心指标、至少三个筛选项、图表和离线加载。抽查 6 月销售额、毛利与销售最高的城市门店，报告文件路径和检查结果；无法执行的检查如实说明。`
  ];

  const card = document.querySelectorAll('#practiceLabs .practice-card')[1];
  const box = document.createElement('div');
  box.className = 'excel-workshop';
  box.innerHTML = `
    <div class="excel-kit">
      <div class="excel-kit-mark" aria-hidden="true">X<span>▦</span></div>
      <div><span class="eyebrow">WORKBUDDY / STORE ANALYTICS LAB</span><h3>让一张 Excel 变成经营驾驶舱。</h3><p>1 张数据表 · 243 条虚构记录 · 10 个城市门店 · 10 个省份 · 6 个月</p></div>
      <a class="primary" href="downloads/store-sales-lab.xlsx?v=single-sheet-1" download>下载 Excel 原始数据 ↓</a>
    </div>
    <div class="excel-flow"><span>① 看懂原始表</span><i>→</i><span>② 清洗对账</span><i>→</i><span>③ 生成网页</span><i>→</i><span>④ 验收与展示</span></div>
    <div class="excel-console">
      <div class="excel-phase-tabs" role="group" aria-label="选择实操轮次"><button data-phase="0">01 / 数据体检</button><button data-phase="1">02 / 清洗对账</button><button data-phase="2">03 / 生成驾驶舱</button></div>
      <div class="excel-phase-body"><div><span class="eyebrow">在同一个 WorkBuddy 会话中依次发送</span><h4 id="storePhaseTitle"></h4><p id="storePhaseGuide" class="note"></p><div class="actions"><button class="primary" id="storeCopyLaunch">复制指令并打开 WorkBuddy ↗</button><button id="storeCopy">只复制本轮指令 ⧉</button></div><p id="storeCopyStatus" class="note" role="status">先下载 Excel 并选择练习目录，粘贴后自行发送。</p></div><details><summary>展开完整指令</summary><pre id="storePrompt"></pre></details></div>
    </div>
    <details class="excel-checks"><summary>讲师验收卡 · 先做，再展开</summary><div class="excel-control-grid"><div><small>原始记录</small><b>243 行</b></div><div><small>清洗后</small><b>238 行</b></div><div><small>累计销售额</small><b>1,511,943 元</b></div><div><small>累计毛利</small><b>492,664 元</b></div></div><p>243 ＝ 238 清洗后 ＋ 1 完全重复 ＋ 2 冲突隔离 ＋ 1 成本缺失 ＋ 1 取消。退货负数保留。每行是门店、月份、商品类别的销售汇总，不是单笔订单。</p><ul><li>T0005 完全重复保留首次；TX001 金额冲突两行隔离；T0018 成本缺失隔离；T0031 取消排除。</li><li>6 月销售额 256,930 元、毛利 84,054 元；六个月销售额最高是 S07 武汉店，163,806 元。</li><li>月目标重复在商品行中，须按月份＋门店去重；6 月 S09 目标缺失、S10 目标为零。库存只对应 6 月 30 日快照，按门店＋商品去重。</li></ul><p class="note">这些数字来自虚构练习数据，供学员核验自己的成果。</p></details>
    <div class="excel-prereq"><b>课前示范网页</b><p>这是基于同一份虚构数据预先制作的网页，可在课堂展示目标效果。每个省份只有一家门店，省份比较仅用于教学。示范数据内嵌在网页中。</p><div class="actions"><a class="primary" href="store-dashboard.html?v=city" target="_blank" rel="noopener">打开网页驾驶舱 ↗</a><a href="store-dashboard.html?v=city" download="门店经营驾驶舱.html">下载离线网页 ↓</a></div><p>学员生成自己的网页后，可对照示范页面检查筛选、指标与图表。</p></div>`;
  card.appendChild(box);

  let phase = 0;
  const titles = ['01 / 数据体检', '02 / 清洗对账', '03 / 生成驾驶舱'];
  const guides = ['先请 AI 看懂一张表，找出哪些数据需要处理。', '确认问题如何处理，让每个数字都能对回原表。', '把核对过的数据变成可筛选、可视化的网页。'];
  function show(index) {
    phase = index;
    box.querySelectorAll('[data-phase]').forEach((button, i) => {
      button.classList.toggle('active', i === index);
      button.setAttribute('aria-pressed', String(i === index));
    });
    box.querySelector('#storePhaseTitle').textContent = titles[index];
    box.querySelector('#storePhaseGuide').textContent = guides[index];
    box.querySelector('#storePrompt').textContent = prompts[index];
  }
  box.addEventListener('click', event => {
    const button = event.target.closest('[data-phase]');
    if (button) show(Number(button.dataset.phase));
  });
  async function copy(open) {
    const status = box.querySelector('#storeCopyStatus');
    try {
      await navigator.clipboard.writeText(prompts[phase]);
      status.textContent = '指令已复制，请切换 WorkBuddy 粘贴并发送。' + (open ? '若未打开，请手动启动。' : '');
      if (open) location.href = 'anda-launch://open/workbuddy';
    } catch {
      status.textContent = '复制失败，请展开完整指令后手动复制。';
    }
  }
  box.querySelector('#storeCopy').onclick = () => copy(false);
  box.querySelector('#storeCopyLaunch').onclick = () => copy(true);
  show(0);
})();
