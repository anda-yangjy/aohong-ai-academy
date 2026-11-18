const pelicanPrompt=`请创建一个可以直接在浏览器打开的单文件 HTML 动画，主题是「一只鹈鹕骑自行车」。

【画面要求】
1. 使用 SVG 绘制一只能够辨认的鹈鹕：长嘴、喉囊、眼睛、身体、翅膀和双腿；鹈鹕要坐在自行车上，而不是站在车旁。
2. 自行车需包含车架、车把、车座、两个车轮、脚踏和链轮，并让人物与车的比例、位置自然。
3. 设计协调的背景、地面和有趣的小细节，画面完整、有美感，在大屏幕与手机上都能看清。

【动画要求】
1. 车轮持续旋转，脚踏与双腿体现骑行节奏；鹈鹕和自行车之间的相对位置保持稳定。
2. 通过背景或地面运动体现前进感，可以加入轻微身体起伏和翅膀动作，循环自然，不闪烁。
3. 尊重系统减少动态效果的设置，并提供暂停 / 继续按钮。

【交付要求】
1. 输出完整的单文件 HTML，包含所需的 SVG、CSS 和 JavaScript；不要引用外部图片、字体、库或网络接口。
2. 文件保存为 pelican-bike.html，双击即可离线打开；不要依赖构建工具，也不要读取或修改其他文件。
3. 检查浏览器运行是否报错、动画是否运行、暂停按钮是否有效。做不到的检查请如实说明，不要假装已经测试。
4. 最后简短说明如何打开文件，以及你实际使用的模型名称和版本；如果无法确认版本，请写“未确认”。`;
document.getElementById('pelicanPrompt').textContent=pelicanPrompt;
const pelicanLab=document.getElementById('pelicanLab');
document.getElementById('pelicanOpen').onclick=()=>{pelicanLab.hidden=false;pelicanLab.scrollIntoView({behavior:'smooth',block:'start'});};
document.getElementById('pelicanClose').onclick=()=>{pelicanLab.hidden=true;document.getElementById('pelicanOpen').focus();};
document.getElementById('pelicanCopy').onclick=async()=>{const status=document.getElementById('pelicanCopyStatus');try{await navigator.clipboard.writeText(pelicanPrompt);status.textContent='已复制完整提示词。请选择一个工具，粘贴并发送。';}catch{status.textContent='复制未成功，请手动选中上方提示词复制。';}};
const pelicanNames=['豆包工作','Kimi','DeepSeek Harness','WorkBuddy'];
const pelicanCompare=document.getElementById('pelicanCompare');
pelicanCompare.innerHTML=pelicanNames.map((name,i)=>`<article class="pelican-result"><div class="pelican-result-head"><b>${name}</b><span>0${i+1}</span></div><label>实际模型 / 版本<input type="text" maxlength="100" placeholder="由讲师按实际界面填写" data-model="${i}"></label><label class="pelican-file">选择生成的 HTML<input type="file" accept=".html,.htm,text/html" data-file="${i}"></label><p class="pelican-file-status" data-status="${i}" role="status">尚未导入作品</p><iframe title="${name} 的鹈鹕动画预览" sandbox="allow-scripts" referrerpolicy="no-referrer" data-frame="${i}"></iframe><p class="note">在隔离环境预览；不允许外网、表单和访问父页面。</p></article>`).join('');
const pelicanCsp="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:; connect-src 'none'; frame-src 'none'; form-action 'none'; base-uri 'none'";
pelicanCompare.addEventListener('change',async e=>{if(!e.target.matches('[data-file]'))return;const index=e.target.dataset.file,file=e.target.files[0],status=pelicanCompare.querySelector(`[data-status="${index}"]`),frame=pelicanCompare.querySelector(`[data-frame="${index}"]`);if(!file)return;if(!/\.html?$/i.test(file.name)||file.size>5*1024*1024){status.textContent='请选择 5 MB 以内的 HTML 文件。';frame.srcdoc='';return;}try{const source=await file.text();frame.srcdoc=`<!doctype html><meta http-equiv="Content-Security-Policy" content="${pelicanCsp}">`+source;status.textContent='已载入：'+file.name;}catch{status.textContent='文件读取失败，请重新选择。';frame.srcdoc='';}});
