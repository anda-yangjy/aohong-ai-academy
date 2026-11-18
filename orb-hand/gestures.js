// Stateless hand measurements plus a small temporal state machine.
(function(root){
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function features(p){
 const palm=Math.max(.035,distance(p[0],p[9]));
 const curled=[8,12,16,20].map((tip,i)=>distance(p[tip],p[0]) < distance(p[[5,9,13,17][i]],p[0])*1.18);
 const pinch=distance(p[4],p[8])/palm;
 return {p,palm,pinch,curled,fist:curled.filter(Boolean).length>=4,heart:pinch<.42 && curled.slice(1).filter(Boolean).length>=2 && distance(p[8],p[0])>palm*.8,open:curled.filter(Boolean).length===0};
}
function cross(a,b){
 if(!a.open||!b.open)return false;
 const pa=a.p,pb=b.p, da={x:pa[9].x-pa[0].x,y:pa[9].y-pa[0].y},db={x:pb[9].x-pb[0].x,y:pb[9].y-pb[0].y};
 const left=pa[0].x<pb[0].x?{d:da,p:pa}:{d:db,p:pb},right=pa[0].x<pb[0].x?{d:db,p:pb}:{d:da,p:pa};
 const span=Math.max(a.palm,b.palm);
 return left.d.x>span*.12 && right.d.x< -span*.12 && Math.abs(left.d.y)>span*.25 && Math.abs(right.d.y)>span*.25 && distance(pa[9],pb[9])<span*2.7 && distance(pa[0],pb[0])<span*4;
}
class GestureDetector{
 constructor(){this.reset()}
 reset(){this.fistStart=null;this.fistOrigin=null;this.lastAction=-Infinity;this.candidate=null;this.candidateSince=0;this.latched=null;this.lastFist=null}
 update(points,now){
  if(!points.length){
   const f=this.lastFist, origin=this.fistOrigin;
   const nearEdge=f&&(f.x<.18||f.x>.82||f.y<.18||f.y>.82);
   const traveled=f&&origin&&Math.hypot(f.x-origin.x,f.y-origin.y)>.05;
   const thrown=this.fistStart!==null&&nearEdge&&traveled&&now-f.time<450&&now-this.fistStart>=180&&now-this.lastAction>1000;
   this.fistStart=null;this.lastFist=null;this.candidate=null;this.latched=null;
   if(thrown){this.lastAction=now;return 'throw'}return null
  }
  const f=points.map(features);let candidate=cross(f[0],f[1]||{})?'cross':(f.some(h=>h.heart)?'heart':null);
  if(candidate){this.fistStart=null;if(candidate!==this.candidate){this.candidate=candidate;this.candidateSince=now}if(now-this.candidateSince>=350&&this.latched!==candidate&&now-this.lastAction>1000){this.latched=candidate;this.lastAction=now;return candidate}return null}
  this.candidate=null;this.latched=null;
  const h=f[0];if(h.fist){this.lastFist={x:h.p[0].x,y:h.p[0].y,time:now};if(this.fistStart===null){this.fistStart=now;this.fistOrigin={x:h.p[0].x,y:h.p[0].y,palm:h.palm}}else if(now-this.fistStart>=180 && now-this.fistStart<1800 && now-this.lastAction>1000){const move=Math.hypot(h.p[0].x-this.fistOrigin.x,h.p[0].y-this.fistOrigin.y);const forward=h.palm/this.fistOrigin.palm;if(move>0.14||forward>1.38){this.lastAction=now;this.fistStart=null;return 'throw'}}}else this.fistStart=null;
  return null
 }
}
root.GestureDetector=GestureDetector;if(typeof module!=='undefined')module.exports={GestureDetector,features,cross};
})(typeof window!=='undefined'?window:globalThis);
