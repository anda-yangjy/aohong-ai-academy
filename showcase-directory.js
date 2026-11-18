// Each card opens its verified, existing local Codex chat.
const showcaseProjects=[
 {n:'01',icon:'◉',tag:'AI 资讯 / CODEX 聊天',name:'灵感雷达站',sub:'【咨询】自动收集',desc:'从 AI 资讯收集到项目迭代，回看完整的想法与实现过程。',app:'ai-radar',id:'01a1cd60-6b52-7ed1-881d-ec36ce386944'},
 {n:'02',icon:'▥',tag:'数据分析 / CODEX 聊天',name:'用量透视镜',sub:'制作 Codex 项目 Token 统计工具',desc:'从需求到工具交付，回看 Token 统计工具的制作过程。',app:'token-stats',id:'01a1e497-6780-7a13-81b1-90f95604e955'},
 {n:'03',icon:'▷',tag:'实用工具 / CODEX 聊天',name:'影像收集站',sub:'【软件端】下载抖音视频',desc:'回看视频下载助手的需求、制作与验证过程。',app:'video-downloader',id:'01a1ce43-912b-7670-9ffa-6a38cb9b8de1'},
 {n:'04',icon:'⌘',tag:'网页重现 / CODEX 聊天',name:'网页解构实验室',sub:'【逆向】例子',desc:'回看参考网页分析与重建过程，以及对应演示成果。',id:'01a1cda9-ef69-76e1-a749-5a0653fd18fb'},
 {n:'05',icon:'✦',tag:'视频创作 / CODEX 聊天',name:'光影实验室',sub:'评估视频制作参考价值',desc:'回看培训视频的构思、制作与配音探索。',id:'01a1e340-18cb-7331-9607-416342fbf241'}
];
const showcaseCards=document.getElementById('showcaseCards');
showcaseCards.innerHTML=showcaseProjects.map(p=>`<a class="showcase-card" href="${p.app?`anda-launch://project/${p.app}`:`codex://threads/${p.id}`}" aria-label="${p.app?'同时打开聊天和程序':'打开聊天'}：${p.sub}"><div class="showcase-card-top"><span class="showcase-icon">${p.icon}</span><span class="showcase-number">${p.n} / 05</span></div><span class="showcase-tag">${p.tag}</span><h3>${p.name}</h3><div class="showcase-sub">${p.sub}</div><p>${p.desc}</p><span class="showcase-link">${p.app?'同时打开聊天和程序':'打开对应聊天'} <span>↗</span></span></a>`).join('');
showcaseCards.insertAdjacentHTML('beforeend',`<button class="showcase-card pelican-entry" id="pelicanOpen" type="button"><div class="showcase-card-top"><span class="showcase-icon">✿</span><span class="showcase-number">06 / 06</span></div><span class="showcase-tag">现场互动 / AI 创作挑战</span><h3>鹈鹕骑行挑战</h3><div class="showcase-sub">同一提示词，多位 AI 来应战</div><p>让大家一起生成动画，把作品放在同一页面比较。</p><span class="showcase-link">开启挑战 <span>↗</span></span></button>`);
showcaseCards.insertAdjacentHTML('beforeend',`<a class="showcase-card" href="anda-launch://project/pdf-renamer" aria-label="同时打开聊天和程序：【PDF】批量改名"><div class="showcase-card-top"><span class="showcase-icon">▤</span><span class="showcase-number">07 / 07</span></div><span class="showcase-tag">效率工具 / CODEX 聊天 + EXE</span><h3>凭证整理大师</h3><div class="showcase-sub">【PDF】批量改名</div><p>读取凭证编号和固定资产卡片，辅助批量整理 PDF 文件名称。</p><span class="showcase-link">同时打开聊天和程序 <span>↗</span></span></a>`);
showcaseCards.querySelectorAll('.showcase-number').forEach((n,i)=>n.textContent=String(i+1).padStart(2,'0')+' / 07');
const openCaseBeforeDirectory=openCase;
openCase=function(id){if(id==='support'){document.getElementById('showcaseDialog').showModal();}else openCaseBeforeDirectory(id);};
document.getElementById('openOldToolbox').onclick=()=>{document.getElementById('showcaseDialog').close();document.getElementById('toolboxDialog').showModal();drawTools();};
