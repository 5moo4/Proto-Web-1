(() => {
'use strict';
const canvas=document.createElement('canvas');canvas.className='gravity-screen';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
const ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const rand=(a,b)=>a+Math.random()*(b-a),clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
let frame=0,start=0,last=0,w=0,h=0,cx=0,cy=0,particles=[],streams=[],direction=1;
function stone(){
const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');
const v=Array.from({length:7},(_,i)=>{const a=i/7*Math.PI*2,r=rand(19,29);return [32+Math.cos(a)*r,32+Math.sin(a)*r];});
g.beginPath();v.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.save();g.clip();
const shade=g.createLinearGradient(8,2,48,58);shade.addColorStop(0,'#b6ada0');shade.addColorStop(.35,'#595660');shade.addColorStop(1,'#0a0b12');g.fillStyle=shade;g.fillRect(0,0,64,64);
for(let i=0;i<7;i++){g.beginPath();g.moveTo(29,27);g.lineTo(...v[i]);g.lineTo(...v[(i+1)%7]);g.closePath();g.fillStyle=i<3?'rgba(221,213,202,.12)':'rgba(0,0,0,.22)';g.fill();}
for(let i=0;i<170;i++){g.fillStyle=Math.random()<.5?'rgba(221,212,205,.17)':'rgba(0,0,0,.24)';g.fillRect(rand(5,59),rand(5,59),rand(.3,1.8),rand(.3,1.5));}g.restore();return c;
}
const rocks=Array.from({length:7},stone);
function stop(){cancelAnimationFrame(frame);frame=0;canvas.classList.remove('is-active');if(ctx){ctx.clearRect(0,0,w,h);ctx.globalAlpha=1;}}
function play(){
stop();if(!ctx||document.hidden)return;w=innerWidth;h=innerHeight;cx=w*.5;cy=h*.46;
const dpr=Math.min(devicePixelRatio||1,1.6);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
direction=Math.random()<.5?-1:1;
particles=Array.from({length:w<600?130:230},(_,i)=>({birth:rand(.05,4.8),life:rand(3.4,5.2),angle:rand(0,6.283),radius:rand(.6,1.05)*Math.hypot(w,h)*.62,turn:rand(1.2,2.6)*direction,tilt:rand(.42,.85),size:i%7===0?rand(5,15):rand(.45,1.6),spin:rand(-2,2),rock:i%7===0?rocks[Math.floor(i/7)%rocks.length]:null,phase:rand(0,6.283)}));
streams=Array.from({length:11},(_,i)=>({birth:.3+i*.17+rand(0,.5),radius:Math.min(w*.47,h*.46)*rand(.72,1.08),tilt:rand(.31,.43),angle:rand(0,6.283),phase:rand(0,6.283),speed:rand(.15,.3),weight:rand(.3,.85)}));
start=performance.now();last=0;canvas.classList.add('is-active');frame=requestAnimationFrame(draw);
}
function point(p,t){
const u=clamp((t-p.birth)/p.life),r=p.radius*(1-Math.pow(u,1.65)),a=p.angle+p.turn*(u+u*u*2.7);
return {x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r*p.tilt+(1-u)*Math.sin(p.phase)*h*.09,u};
}
function draw(now){
const elapsed=(now-start)/1000;if(elapsed>=(reduced.matches?2:10)||document.hidden){stop();return;}
frame=requestAnimationFrame(draw);if(now-last<25)return;last=now;ctx.clearRect(0,0,w,h);
const t=reduced.matches?3.6:elapsed,fade=reduced.matches?Math.sin(elapsed/2*Math.PI)*.4:1-smooth((t-7.4)/2.6);
// Arcs appear along their paths; no full-ring scaling entrance.
ctx.save();ctx.translate(cx,cy);ctx.rotate(-.16*direction);
for(const s of streams){
const age=t-s.birth;if(age<=0)continue;const length=Math.min(5.5,age*.92),head=s.angle+age*s.speed*direction;
for(let j=0;j<64;j++){
const f=j/64,a=head-direction*length*f,b=a-direction*length/64,r=s.radius+Math.sin(a*5+s.phase+t*.4)*2.3;
const opacity=smooth(age/.8)*Math.sin(f*Math.PI)*(.4+.6*Math.pow(Math.sin(a*3+s.phase),2))*fade;
ctx.beginPath();ctx.ellipse(0,0,r,r*s.tilt,0,Math.min(a,b),Math.max(a,b));
ctx.strokeStyle='rgba(124,103,174,'+(opacity*.1)+')';ctx.lineWidth=7;ctx.stroke();
ctx.strokeStyle='rgba(210,203,229,'+(opacity*.48)+')';ctx.lineWidth=s.weight;ctx.stroke();
}}
ctx.restore();
if(!reduced.matches)for(const p of particles){
const age=t-p.birth;if(age<0||age>=p.life)continue;const q=point(p,t),old=point(p,Math.max(p.birth,t-.028));
ctx.globalAlpha=smooth(age/.55)*(1-smooth((q.u-.84)/.16))*fade;
if(p.rock){ctx.save();ctx.translate(q.x,q.y);ctx.rotate(p.phase+age*p.spin);ctx.drawImage(p.rock,-p.size/2,-p.size/2,p.size,p.size);ctx.restore();}
else{ctx.strokeStyle='#b6a9cd';ctx.lineWidth=p.size;ctx.beginPath();ctx.moveTo(old.x,old.y);ctx.lineTo(q.x,q.y);ctx.stroke();ctx.fillStyle='#ded9e5';ctx.beginPath();ctx.arc(q.x,q.y,p.size*.45,0,6.283);ctx.fill();}
}ctx.globalAlpha=1;
}
document.addEventListener('armory:gravity',play);document.addEventListener('armory:clear-effect',stop);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('resize',stop);reduced.addEventListener('change',stop);
})();
