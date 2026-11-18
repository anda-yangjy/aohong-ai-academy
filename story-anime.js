// Original SVG classroom fiction. Interactions are scripted demonstrations, not live model calls.
const dreamNodes=[
  {
    "tag": "2005 / 网吧搜索",
    "title": "2005 · 跑去网吧找答案",
    "line": "“老板，开一台机！我去百度、贴吧和论坛看看。”",
    "button": "拨号上网，开始找 ↗",
    "done": "再搜一遍",
    "caption": "搜到了相似题，贴吧有人给思路，论坛里还有不同解法。小达得自己筛、自己写。",
    "lesson": "这时工具帮人找到线索，谁说得对、答案怎么写，还是得自己判断。",
    "work": "现场问：“谁还记得当年在论坛发帖，然后不停刷新等回复？”"
  },
  {
    "tag": "2016 / 手机助手",
    "title": "2016 · 手机上喊一句就能查",
    "line": "“Siri，帮我查一下这道题里的知识点。”",
    "button": "唤醒 Siri 🎙",
    "done": "再喊一声",
    "caption": "Siri 帮忙搜索，手机浏览器能直接查网页，扫码能打开资料，群聊还可以问同学。小达看完资料再动笔。",
    "lesson": "Siri 随 iPhone 4S 在 2011 年亮相。到故事里的 2016 年，语音、移动搜索、扫码和群聊让查资料随手可做。",
    "work": "现场问：“手机省了哪些步骤？最后谁来判断、谁来答题？”"
  },
  {
    "tag": "2024 / AI 聊天",
    "title": "2024 · 聊天框递来了一份草稿",
    "line": "“用三步解释这道题，再给我一份答题草稿。”",
    "button": "发送给聊天 AI ↗",
    "done": "再生成一次",
    "caption": "聊天框给出了解题思路。小达还要把草稿抄到答卷上，自己检查步骤和依据。",
    "lesson": "这幕演示常见的聊天流程（Chatflow）：提问、追问、拿到草稿。检索和工具能力随产品而异。",
    "work": "现场问：“AI 说写好了，你手上有一份可以交付的文件了吗？”"
  },
  {
    "tag": "2026 / Agent 执行",
    "title": "2026 · 一句“帮我答卷”，Agent 开始行动",
    "line": "“帮我答卷。”",
    "button": "帮我答卷 ▶",
    "done": "重演执行",
    "caption": "小达核对了生成的答卷。现在手里有一份看得见、能检查的交付物。",
    "lesson": "Agent 可以在授权范围内拆解题目、查资料、调用工具并生成文件。你负责设定目标和验收。",
    "work": "接到课程：“把答卷换成 Excel、报告或周报，同样可以从一句委托走到一份成果。那么，AI 到底是什么？”",
    "review": "核对并确认答卷 ✓"
  }
];
const dreamStates=[0,0,0,0];let dreamTimer;
let dreamProgress=0;
let dreamPaused=matchMedia('(prefers-reduced-motion: reduce)').matches;
const svgText=(x,y,s,cls='')=>`<text x="${x}" y="${y}" class="${cls}">${s}</text>`;
function dreamStudent(x=110,y=203,scale=1){return `<g transform="translate(${x} ${y}) scale(${scale})"><g class="dream-student"><ellipse cx="0" cy="91" rx="52" ry="10" fill="#030f2040"/><path d="M-24 29Q0 14 24 29L32 70H-32Z" fill="#a8e8df" stroke="#17384a" stroke-width="3"/><path d="M-14 68L-19 90M14 68L20 90" stroke="#263850" stroke-width="13" stroke-linecap="round"/><path d="M-31 89h20M12 89h20" stroke="#f5eee1" stroke-width="9" stroke-linecap="round"/><path d="M-24 34L-43 51M24 34L44 20" stroke="#ffcfab" stroke-width="12" stroke-linecap="round"/><path d="M42 20l14-14" stroke="#f0d769" stroke-width="6" stroke-linecap="round"/><circle cy="-3" r="35" fill="#ffd7b8" stroke="#223149" stroke-width="3"/><path d="M-35-3Q-42-48 3-43Q43-44 36-2L22-23Q0-6-13-26Z" fill="#23314b"/><path d="M-26-34Q-13-53 4-43" fill="none" stroke="#617391" stroke-width="5" stroke-linecap="round"/><g class="dream-eyes"><circle cx="-12" cy="-2" r="3.4" fill="#17283e"/><circle cx="13" cy="-2" r="3.4" fill="#17283e"/></g><path d="M-8 12Q1 19 10 10" fill="none" stroke="#9e5947" stroke-width="3" stroke-linecap="round"/><ellipse cx="-23" cy="9" rx="7" ry="4" fill="#f7aa9c"/><ellipse cx="24" cy="9" rx="7" ry="4" fill="#f7aa9c"/></g></g>`}
function dreamRobot(x,y,scale=1){return `<g transform="translate(${x} ${y}) scale(${scale})"><g class="dream-float"><ellipse cy="75" rx="42" ry="7" fill="#081a3030"/><rect x="-27" y="16" width="54" height="43" rx="18" fill="#d0f894" stroke="#375746" stroke-width="3"/><path d="M-27 30L-43 18M27 30L43 18" stroke="#d0f894" stroke-width="12" stroke-linecap="round"/><path d="M0-36v-12" stroke="#b5f9e4" stroke-width="4"/><circle cy="-50" r="6" fill="#d4f998"/><rect x="-43" y="-32" width="86" height="57" rx="21" fill="#e5fff3" stroke="#5fb9ab" stroke-width="3"/><rect x="-30" y="-20" width="60" height="32" rx="12" fill="#1c4757"/><g class="dream-eyes" fill="#bcf9cf"><rect x="-19" y="-10" width="9" height="12" rx="4"/><rect x="10" y="-10" width="9" height="12" rx="4"/></g><path d="M-5 5Q0 9 5 5" fill="none" stroke="#bcf9cf" stroke-width="2"/><circle cy="38" r="9" fill="#63968c"/><path d="M-3 35l4 4 7-7" fill="none" stroke="#edffd8" stroke-width="2"/></g></g>`}
function dreamPage(x,y,text,rotation=0,cls=''){return `<g transform="translate(${x} ${y}) rotate(${rotation})"><g class="${cls}"><rect width="110" height="67" rx="10" fill="#fff4df" stroke="#e4cc9e" stroke-width="2"/><path d="M17 20h55M17 33h76M17 46h43" stroke="#c2a77e" stroke-width="3" stroke-linecap="round"/>${svgText(17,60,text,'dream-paper-label')}</g></g>`}
function dreamSVG(i,state){
 const defs=`<defs><linearGradient id="dreamSky" x2="100%" y2="100%"><stop stop-color="${['#152938','#14234f','#252548','#0b3049'][i]}"/><stop offset="1" stop-color="${['#3d4535','#245260','#224958','#0d5149'][i]}"/></linearGradient><radialGradient id="dreamHalo"><stop stop-color="#d1f890" stop-opacity=".27"/><stop offset="1" stop-color="#97e9df" stop-opacity="0"/></radialGradient><pattern id="dreamGrid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#d4fff0" stroke-opacity=".035"/></pattern></defs>`;
 const base=`${defs}<rect width="760" height="340" rx="20" fill="url(#dreamSky)"/><rect width="760" height="340" rx="20" fill="url(#dreamGrid)"/><ellipse cx="475" cy="170" rx="270" ry="165" fill="url(#dreamHalo)"/><path d="M26 306Q370 292 734 306" stroke="#8abfb6" stroke-width="2" opacity=".3"/><g class="dream-stars" fill="#caf8b2"><path d="M685 25l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z"/><path d="M218 252l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/><circle cx="36" cy="164" r="2"/><circle cx="708" cy="261" r="3"/></g>`;
 let scene='';
 if(i===0)scene=`${dreamStudent(100,208)}<g class="dream-bubble"><rect x="35" y="36" width="216" height="63" rx="17" fill="#f7f1e2"/><path d="M101 98l-10 20 31-20" fill="#f7f1e2"/>${svgText(53,62,'老板，开一台机！','dream-bubble-label')}${svgText(53,83,'网吧 · 计时开始','dream-paper-label')}</g><g transform="translate(287 112)"><rect x="0" y="0" width="220" height="151" rx="18" fill="#b3cec3" stroke="#7ea397" stroke-width="3"/><rect x="14" y="14" width="192" height="113" rx="8" fill="#123442"/><rect x="27" y="30" width="166" height="25" rx="12" fill="#e9f5df"/>${svgText(39,47,'百度：这题怎么解？','dream-search-label')}<circle cx="174" cy="42" r="6" fill="none" stroke="#497e6a" stroke-width="2"/><path d="M178 47l5 5" stroke="#497e6a" stroke-width="2"/><path d="M36 74h143M36 89h115M36 104h134" stroke="#6aa794" stroke-width="5" stroke-linecap="round"/><path class="dream-scan" d="M26 62h167" stroke="#ccf79b" stroke-width="2"/><path d="M90 151v18h43v-18" fill="#a0baae"/><rect x="63" y="168" width="98" height="9" rx="4" fill="#d5e3d3"/></g><g class="dream-initial">${dreamPage(550,141,'正在拨号…',-8)}${dreamPage(570,225,'等待连接',7)}</g><g class="dream-result">${dreamPage(530,86,'百度搜索',-8,'dream-bob-a')}${dreamPage(576,174,'贴吧回帖',6,'dream-bob-b')}${dreamPage(489,243,'论坛讨论',-5,'dream-bob-a')}</g>`;
 if(i===1)scene=`${dreamStudent(112,207)}<rect x="32" y="35" width="255" height="65" rx="17" fill="#fff0dc"/>${svgText(51,62,'“Siri，查个知识点！”','dream-bubble-label')}${svgText(51,83,'打开手机，开口就能查','dream-paper-label')}<g transform="translate(395 190)"><g class="dream-wave" fill="none" stroke="#93e8cc" stroke-width="2"><circle r="50"/><circle r="73"/><circle r="98"/></g><rect x="-42" y="-64" width="84" height="139" rx="34" fill="#d8ece0" stroke="#7fbba5" stroke-width="3"/><rect x="-34" y="-53" width="68" height="110" rx="29" fill="#295c61"/><circle cy="-5" r="18" fill="#c3f28a"/><path d="M-6-12v12a6 6 0 0012 0v-12a6 6 0 00-12 0M-11 0q0 17 22 0M0 11v8M-6 19H6" fill="none" stroke="#254a44" stroke-width="2.5" stroke-linecap="round"/></g><g class="dream-initial"><rect x="550" y="124" width="149" height="104" rx="18" fill="#ecf7da"/>${svgText(572,163,'正在听……','dream-bubble-label')}<path d="M574 187h7m5-7v14m8-23v33m8-42v50m8-39v28m8-22v15m8-10h6" stroke="#6ea68c" stroke-width="4" stroke-linecap="round"/></g><g class="dream-result"><g class="dream-bob-a"><rect x="535" y="80" width="173" height="84" rx="16" fill="#fff0cf"/>${svgText(553,112,'语音搜索 · 浏览器','dream-bubble-label')}${svgText(553,140,'一句话打开资料','dream-paper-label')}</g><g class="dream-bob-b"><rect x="528" y="193" width="180" height="84" rx="16" fill="#dff3ed"/>${svgText(546,224,'扫码 · 群聊','dream-bubble-label')}${svgText(546,251,'扫码查资料，群里问同学','dream-paper-label')}</g></g>`;
 if(i===2)scene=`${dreamStudent(99,207)}${dreamRobot(650,197,.9)}<rect x="36" y="37" width="231" height="61" rx="17" fill="#fff0dc"/>${svgText(53,62,'AI，给我一份草稿吧！','dream-bubble-label')}${svgText(53,83,'聊天框里问，答题纸上写。','dream-paper-label')}<g transform="translate(279 71)"><rect width="272" height="223" rx="17" fill="#fff8e8" stroke="#d6d2b0" stroke-width="2"/><path d="M20 40h229" stroke="#b9cebe" stroke-width="2"/>${svgText(22,29,'AI 聊天 · 答题草稿','dream-paper-heading')}<rect x="50" y="53" width="200" height="43" rx="12" fill="#d5e0fa"/>${svgText(65,80,'用三步讲讲怎么解','dream-paper-heading')}<g class="dream-initial">${svgText(28,153,'等待发送…','dream-paper-heading')}<path d="M32 170h183" stroke="#dbc57f" stroke-width="2"/>${svgText(24,201,'草稿将显示在对话里','dream-paper-label')}</g><g class="dream-result"><g class="dream-line-in">${svgText(25,130,'① 读题并找出已知条件','dream-paper-heading')}</g><g class="dream-line-in dream-delay-2">${svgText(25,158,'② 写出推导步骤','dream-paper-heading')}</g><g class="dream-line-in dream-delay-3">${svgText(25,187,'③ 检查，再抄到答卷','dream-paper-heading')}</g></g></g><g class="dream-result"><path d="M223 206l49-27" stroke="#b2f18d" stroke-width="4" stroke-linecap="round"/><circle cx="238" cy="184" r="13" fill="none" stroke="#b2f18d" stroke-width="3"/><path d="M227 194l-13 17" stroke="#b2f18d" stroke-width="5" stroke-linecap="round"/></g>`;
 if(i===3)scene=`${dreamStudent(89,208,.85)}<g transform="translate(681 186)"><circle r="60" class="dream-orbit" fill="none" stroke="#aaffd9" stroke-width="2" stroke-dasharray="25 9"/><circle r="72" class="dream-orbit dream-reverse" fill="none" stroke="#8fdfff" stroke-dasharray="5 12"/></g>${dreamRobot(681,195,.74)}<rect x="31" y="30" width="312" height="59" rx="16" fill="#fff0dc"/>${svgText(49,55,'帮我答卷。','dream-bubble-label')}${svgText(49,76,'一句目标指令 · Agent 已就位','dream-paper-label')}<path class="dream-flow-line" d="M186 183H591" stroke="#a9efb8" stroke-width="3" stroke-dasharray="7 9"/>${['读题','查资料','核对','出卷'].map((s,j)=>`<g transform="translate(${190+j*105} 142)"><g class="dream-station station-${j}"><rect width="86" height="86" rx="18" fill="${j===3?'#4c7252':'#23514f'}" stroke="#80b5a0" stroke-width="2"/><circle cx="43" cy="31" r="25" class="dream-station-halo"/><circle cx="43" cy="31" r="14" fill="#d0f3a0"/>${svgText(38,37,String(j+1),'dream-step-number')}${svgText(26,66,s,'dream-flow-label')}</g></g>`).join('')}<g class="dream-initial">${svgText(233,268,'等待指令 · 请点击「帮我答卷」','dream-stage-label')}</g><g class="dream-review"><g class="dream-delivery"><g transform="translate(438 30)"><rect width="126" height="88" rx="10" fill="#efffe9"/><path d="M15 40h95M15 53h89M15 66h67" stroke="#7d9e8b" stroke-width="3" stroke-linecap="round"/>${svgText(15,25,'小达的答卷','dream-bubble-label')}</g><rect x="227" y="245" width="347" height="44" rx="12" fill="#efd9a7"/>${svgText(247,273,'答卷.html 已生成 · 等待你复核','dream-bubble-label')}</g></g><g class="dream-approved"><rect x="227" y="245" width="347" height="44" rx="12" fill="#d3f59a"/>${svgText(247,273,'你已核对 · 答卷交付完成 ✓','dream-bubble-label')}</g>`;
 return `<svg viewBox="0 0 760 340" role="img" aria-label="${dreamNodes[i].title}的动漫示意" xmlns="http://www.w3.org/2000/svg">${base}${scene}</svg>`;
}
const storyDialogNode=document.getElementById('storyDialog');storyDialogNode.classList.add('dream-dialog');storyDialogNode.classList.toggle('dream-paused',dreamPaused);
drawStory=function(){
 const n=dreamNodes[year],state=dreamStates[year];
 const working=year===3&&state===1&&dreamProgress<4;
 document.getElementById('storyYears').innerHTML=story.map((s,i)=>`<button data-year="${i}" class="${i===year?'active':''}" aria-pressed="${i===year}"><b>${s[0]}</b><span>${['自己找','开口找','聊出草稿','一句委托'][i]}</span></button>`).join('');
 document.getElementById('storyContent').innerHTML=`<article class="dream-scene"><div class="dream-scene-head"><div><span class="eyebrow">${n.tag}</span><h3>${n.title}</h3></div><button id="dreamPause" aria-pressed="${dreamPaused}">${dreamPaused?'▶ 播放动画':'Ⅱ 暂停动画'}</button></div><div class="dream-canvas dream-era-${year} ${working?'dream-running':''} ${state?'has-result':''} ${year===3&&state===1?'is-review':''} ${year===3&&state===2?'is-approved':''}">${dreamSVG(year,state)}</div><div class="dream-speech"><b>考生小达</b><p>${n.line}</p></div><div class="dream-interact"><button class="primary" id="dreamAction" aria-disabled="${working}">${working?'执行进度…':year===3&&state===1?n.review:state?n.done:n.button}</button><span id="dreamResult" role="status" aria-live="polite">${state?(working?'正在'+['读题并拆解步骤','查询允许使用的资料','调用工具核对答案','生成可检查的答卷'][dreamProgress]+'…':year===3&&state===1?'答卷已生成。请小达检查内容，再确认交付。':n.caption):'点击试试看，让这一幕动起来。'}</span></div><div class="dream-takeaway"><span>这一幕，你学到了什么？</span><p>${n.lesson}</p></div><details class="dream-teacher"><summary>讲师接一句 · 回到工作场景</summary><p>${n.work}</p></details></article>`;
 document.getElementById('storyPrev').disabled=year===0;document.getElementById('storyNext').textContent=year===3?'回到课堂，认识 AI ↗':'穿越到下个年代 →';
 document.getElementById('dreamPause').onclick=()=>{dreamPaused=!dreamPaused;storyDialogNode.classList.toggle('dream-paused',dreamPaused);if(dreamPaused&&working){dreamProgress=4;drawStory();document.getElementById('dreamPause').focus();return;}const b=document.getElementById('dreamPause');b.setAttribute('aria-pressed',String(dreamPaused));b.textContent=dreamPaused?'▶ 播放动画':'Ⅱ 暂停动画'};
 const action=document.getElementById('dreamAction');
 action.onclick=()=>{
  if(working)return;
  if(year===3&&state===0)dreamProgress=dreamPaused?4:0;
  dreamStates[year]=year===3?(state+1)%3:state?0:1;
  drawStory();
  document.getElementById('dreamAction').focus();
 };
 clearTimeout(dreamTimer);
 if(working){
  document.querySelectorAll('.dream-station').forEach((tile,i)=>{
   tile.classList.toggle('dream-step-active',i===dreamProgress);
   tile.classList.toggle('dream-step-complete',i<dreamProgress);
  });
  dreamTimer=setTimeout(()=>{
   if(!storyDialogNode.open)return;
   const focused=document.activeElement?.id;
   dreamProgress++;
   drawStory();
   if(focused==='dreamAction'||focused==='dreamPause')document.getElementById(focused)?.focus({preventScroll:true});
  },720);
 }

};
document.getElementById('storyOpen').onclick=()=>{year=0;dreamStates.fill(0);dreamProgress=0;drawStory();storyDialogNode.showModal();storyDialogNode.scrollTop=0};
document.getElementById('storyYears').onclick=e=>{const b=e.target.closest('[data-year]');if(b){year=Number(b.dataset.year);if(dreamPaused&&year===3&&dreamStates[3]===1)dreamProgress=4;drawStory();document.querySelector('#storyYears [aria-pressed="true"]').focus({preventScroll:true})}};
document.getElementById('storyNext').onclick=()=>{if(year===3){storyDialogNode.close();location.hash='learn'}else{year++;drawStory()}};
storyDialogNode.addEventListener('close',()=>clearTimeout(dreamTimer));
drawStory();
