// Heuristic Chinese one-hand number gestures, using normalized hand landmarks.
(function(root){
function numberGesture(p){
 if(!p||p.length<21)return null;
 const d=(a,b)=>Math.hypot(p[a].x-p[b].x,p[a].y-p[b].y),palm=Math.max(.025,d(0,9));
 const ratio=[8,12,16,20].map((tip,i)=>d(tip,0)/Math.max(.01,d([5,9,13,17][i],0)));
 const up=ratio.map(x=>x>1.34),down=ratio.map(x=>x<1.25);
 // Measure the thumb relative to the index-to-little-knuckle axis. Distance
 // from the middle knuckle alone makes a moderately extended thumb look folded.
 const ax=p[5].x-p[17].x,ay=p[5].y-p[17].y,axis=Math.max(.01,Math.hypot(ax,ay));
 const thumbBeyondIndex=((p[4].x-p[5].x)*ax+(p[4].y-p[5].y)*ay)/axis/palm;
 const thumbOut=thumbBeyondIndex>.18&&d(4,5)>palm*.25;
 const thumbFolded=thumbBeyondIndex<-.05&&d(4,9)<palm*1.25;
 // Seven: thumb, index and middle fingertips touch, ring and little fingers folded.
 if(d(4,8)<palm*.48&&d(4,12)<palm*.48&&d(8,0)>d(5,0)*1.12&&d(12,0)>d(9,0)*1.12&&down[2]&&down[3])return 7;
 if(thumbOut&&down[0]&&down[1]&&down[2]&&up[3])return 6;
 if(thumbOut&&up[0]&&down[1]&&down[2]&&down[3])return 8;
 // Nine: the index forms a hook while the other fingers and thumb are tucked.
 if(thumbFolded&&down[0]&&down[1]&&down[2]&&down[3]&&d(8,6)<palm*.7&&d(6,0)>d(5,0)*1.1)return 9;
 if(thumbFolded&&up[0]&&up[1]&&down[2]&&down[3])return 2;
 if(thumbFolded&&up[0]&&up[1]&&up[2]&&down[3])return 3;
 if(thumbFolded&&up.every(Boolean))return 4;
 if(thumbOut&&up.every(Boolean))return 5;
 // Only a clearly folded thumb plus extended index is "1"; ambiguous poses
 // and a raised little finger must not fall through to the greeting.
 if(thumbFolded&&up[0]&&down[1]&&down[2]&&down[3])return 1;
 return null;
}
root.numberGesture=numberGesture;if(typeof module!=='undefined')module.exports={numberGesture};
})(typeof window!=='undefined'?window:globalThis);
