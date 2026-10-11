(() => {
'use strict';
const canvas=document.createElement('canvas');canvas.className='resonance-screen';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
if(!ctx)return;
const rand=(a,b)=>a+Math.random()*(b-a),clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
let frame=0,start=0,last=0,w=0,h=0,cx=0,cy=0,waves=[],dust=[],phase=0;
function stop(){cancelAnimationFrame(frame);frame=0;canvas.classList.remove('is-active');ctx.clearRect(0,0,w,h);ctx.globalAlpha=1;}
function play(){
 stop();if(document.hidden)return;
 w=innerWidth;h=innerHeight;
 const card=document.querySelector('.weapon-card[aria-pressed="true"]');
 // Place the source on the selected sword, using a stable viewport fallback.
 const bounds=card?.getBoundingClientRect();
 cx=bounds?bounds.x+bounds.width*.5:w*.5;cy=bounds?bounds.y+bounds.height*.38:h*.43;
 const dpr=Math.min(devicePixelRatio||1,1.6);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
 phase=rand(0,6.28);let birth=.18;
 const speed=Math.hypot(w,h)*.30;
 waves=Array.from({length:7},(_,i)=>{birth+=i?rand(.53,.95):0;return {birth,speed:speed*rand(.85,1.1),width:rand(6,13),phase:rand(0,6.28),strength:rand(.65,1),ecc:rand(.82,.94)};});
 dust=Array.from({length:w<600?190:360},()=>({x:rand(0,w),y:rand(0,h),size:rand(.35,1.25),phase:rand(0,6.28),depth:rand(.4,1)}));
 start=performance.now();last=0;canvas.classList.add('is-active');frame=requestAnimationFrame(draw);
}
function draw(now){
 const elapsed=(now-start)/1000;
 if(elapsed>=(reduce.matches?2:10)||document.hidden){stop();return;}
 frame=requestAnimationFrame(draw);if(now-last<25)return;last=now;ctx.clearRect(0,0,w,h);
 const t=reduce.matches?2.6:elapsed,fade=reduce.matches?Math.sin(elapsed*Math.PI/2)*.35:1-smooth((t-7.5)/2.5);
 for(const wave of waves){
  const age=t-wave.birth;if(age<=0)continue;
  const radius=age*wave.speed;
  const falloff=Math.exp(-age*.57)*smooth(age/.35)*wave.strength*fade;
  if(falloff<.008)continue;
  // Each angular section condenses independently; the front is rebuilt at its travel distance.
  for(let i=0;i<160;i++){
   const a=i/160*Math.PI*2,b=(i+1.15)/160*Math.PI*2;
   const ripple=Math.sin(a*7+wave.phase)*2.4+Math.sin(a*19+phase)*.85;
   const formation=smooth((age-(.08+.13*(1+Math.sin(a*5+wave.phase))))/.32);
   const scatter=.28+.72*Math.pow(Math.sin(a*3+wave.phase+age*.15),2);
   const alpha=falloff*formation*scatter;
   if(alpha<.004)continue;
   const r=radius+ripple;
   if(r<1)continue;
   const path=offset=>{ctx.beginPath();ctx.ellipse(cx,cy,Math.max(1,r+offset),Math.max(1,(r+offset)*wave.ecc),-.08,a,b);};
   // Broad transparent haze, a dark compression trough, and a narrow silver-gold crest.
   path(0);ctx.strokeStyle='rgba(179,167,140,'+(alpha*.055)+')';ctx.lineWidth=wave.width*2.8;ctx.stroke();
   path(-3);ctx.strokeStyle='rgba(12,10,8,'+(alpha*.27)+')';ctx.lineWidth=wave.width*.8;ctx.stroke();
   path(1);ctx.strokeStyle='rgba(240,225,191,'+(alpha*.52)+')';ctx.lineWidth=.9;ctx.stroke();
   path(5);ctx.strokeStyle='rgba(199,198,202,'+(alpha*.12)+')';ctx.lineWidth=2.2;ctx.stroke();
  }
 }
 if(!reduce.matches)for(const p of dust){
  const dx=p.x-cx,dy=p.y-cy,angle=Math.atan2(dy,dx);let shift=0,light=0;
  for(const wave of waves){
   const age=t-wave.birth;if(age<=0)continue;
   const distance=Math.hypot(dx,dy/wave.ecc),delta=distance-age*wave.speed;
   const envelope=Math.exp(-Math.pow(delta/27,2))*Math.exp(-age*.35);
   shift+=Math.sin(delta*.075)*envelope*14*p.depth;light+=envelope;
  }
  const x=p.x+Math.cos(angle)*shift,y=p.y+Math.sin(angle)*shift;
  ctx.globalAlpha=fade*smooth(t/.8)*Math.min(.8,.065+light*.55);
  ctx.fillStyle='#e4d9bf';ctx.beginPath();ctx.ellipse(x,y,p.size*(1+light*.7),p.size,angle,0,6.283);ctx.fill();
 }
 ctx.globalAlpha=1;
}
document.addEventListener('armory:resonance',play);document.addEventListener('armory:clear-effect',stop);
window.addEventListener('resize',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});reduce.addEventListener('change',stop);
})();
