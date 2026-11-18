// Five genuinely different point-cloud forms, continuously interpolated in 3D.
(()=>{
const stage=document.querySelector('.orb-stage'),canvas=document.querySelector('#neuralCanvas'),ctx=canvas.getContext('2d');
const forms=[['sphere','神经光球','NEURAL SPHERE'],['torus','量子光环','QUANTUM TORUS'],['helix','生命螺旋','LIFE HELIX'],['matrix','数据晶格','DATA MATRIX'],['wave','智能波场','SIGNAL FIELD']];
const count=240,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let index=0,automatic=!reduce,start=performance.now(),last=start,visible=true;
function shape(mode,i){const u=i/(count-1),gold=i*2.399963;
if(mode===0){const y=1-2*u,r=Math.sqrt(Math.max(0,1-y*y));return [Math.cos(gold)*r,y,Math.sin(gold)*r];}
if(mode===1){const a=(i%40)/40*Math.PI*2,b=Math.floor(i/40)/6*Math.PI*2;return [(1+.28*Math.cos(b))*Math.cos(a),.28*Math.sin(b),(1+.28*Math.cos(b))*Math.sin(a)];}
if(mode===2){const strand=i%2,v=Math.floor(i/2)/(count/2-1),a=v*Math.PI*6+strand*Math.PI;return [.63*Math.cos(a),(v-.5)*2.15,.63*Math.sin(a)];}
if(mode===3){const side=Math.floor(i/40),q=i%40,x=(q%8)/7*1.8-.9,y=Math.floor(q/8)/4*1.8-.9;return side===0?[x,y,.9]:side===1?[x,y,-.9]:side===2?[.9,x,y]:side===3?[-.9,x,y]:side===4?[x,.9,y]:[x,-.9,y];}
const x=(i%20)/19*2.5-1.25,z=Math.floor(i/20)/11*2-1;return [x,Math.sin(x*3+z*2)*.45,z];}
let source=Array.from({length:count},(_,i)=>shape(0,i)),target=source.map(p=>p.slice()),current=source.map(p=>p.slice());
function updateUI(){stage.dataset.form=forms[index][0];document.querySelector('#morphName').textContent=forms[index][1];document.querySelector('#morphEnglish').textContent=forms[index][2];document.querySelectorAll('[data-shape]').forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-pressed',String(i===index));});}
function setForm(next){source=current.map(p=>p.slice());index=(next+forms.length)%forms.length;target=Array.from({length:count},(_,i)=>shape(index,i));start=performance.now();last=start;updateUI();if(reduce)render(start+1800);}
stage.addEventListener('click',e=>{if(!e.target.closest('.morph-console'))setForm(index+1);});stage.addEventListener('keydown',e=>{if(e.target===stage&&(e.key==='Enter'||e.key===' ')){e.preventDefault();setForm(index+1);}});
document.querySelector('#morphNext').onclick=e=>{e.stopPropagation();setForm(index+1)};document.querySelector('#morphAuto').onclick=e=>{e.stopPropagation();automatic=!automatic;last=performance.now();e.target.textContent=automatic?'Ⅱ 暂停轮播':'▷ 自动轮播';e.target.setAttribute('aria-pressed',String(automatic));};document.querySelectorAll('[data-shape]').forEach((b,i)=>b.onclick=e=>{e.stopPropagation();setForm(i);});
new IntersectionObserver(es=>{visible=es[0].isIntersecting;last=performance.now();}).observe(stage);
function render(now){if(automatic&&visible&&!document.hidden&&now-last>7000)setForm(index+1);if(ctx&&visible&&!document.hidden){const r=canvas.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height),dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);let f=Math.min(1,(now-start)/1700);f=f*f*(3-2*f);const a=reduce?.35:now*.00018,tilt=index===2?.08:.32,scale=Math.min(w*.32,h*.33);const projected=[];
for(let i=0;i<count;i++){const p=source[i].map((v,k)=>v+(target[i][k]-v)*f);current[i]=p;let [x,y,z]=p;if(index===4)y+=Math.sin(x*4+now*.0012+z*2)*.11;const xx=x*Math.cos(a)+z*Math.sin(a),zz=-x*Math.sin(a)+z*Math.cos(a),yy=y*Math.cos(tilt)-zz*Math.sin(tilt),depth=y*Math.sin(tilt)+zz*Math.cos(tilt),perspective=3.7/(3.7-depth);projected.push({x:w/2+xx*scale*perspective,y:h*.47+yy*scale*perspective,z:depth});}
ctx.lineWidth=.65;for(let i=0;i<count;i++){const p=projected[i];for(let j=i+1;j<Math.min(i+7,count);j++){const q=projected[j],dist=Math.hypot(p.x-q.x,p.y-q.y);if(dist<scale*.48){ctx.strokeStyle=`rgba(${index===3?'157,170,255':'86,229,209'},${Math.max(.015,(1-dist/(scale*.48))*.3)})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}}
projected.sort((a,b)=>a.z-b.z).forEach((p,i)=>{const alpha=.3+(p.z+1.5)/3*.65,size=1+Math.max(0,p.z)*1.1;ctx.shadowBlur=i%9===0?12:3;ctx.shadowColor=index===3?'#8fafff':'#a5ffcb';ctx.fillStyle=i%6===0?`rgba(213,255,155,${alpha})`:`rgba(104,233,225,${alpha})`;ctx.beginPath();ctx.arc(p.x,p.y,size,0,Math.PI*2);ctx.fill();});ctx.shadowBlur=0;}
if(!reduce)requestAnimationFrame(render);}
updateUI();render(performance.now());
})();
