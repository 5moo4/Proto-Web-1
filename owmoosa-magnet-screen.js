(() => {
'use strict';
const canvas=document.createElement('canvas');canvas.className='magnet-screen';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
if(!ctx)return;
const rand=(a,b)=>a+Math.random()*(b-a),clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x);};
let frame=0,start=0,last=0,w=0,h=0,grains=[],polarity=1;
function metal(){
 const c=document.createElement('canvas');c.width=80;c.height=40;const g=c.getContext('2d');
 g.beginPath();g.moveTo(5,rand(7,14));g.lineTo(62,4);g.lineTo(75,15);g.lineTo(64,32);g.lineTo(13,35);g.closePath();g.save();g.clip();
 const steel=g.createLinearGradient(0,0,8,40);steel.addColorStop(0,'#d9d8ce');steel.addColorStop(.22,'#50545b');steel.addColorStop(.46,'#1b2029');steel.addColorStop(.55,'#b6b8b4');steel.addColorStop(.63,'#606673');steel.addColorStop(1,'#11151c');
 g.fillStyle=steel;g.fillRect(0,0,80,40);
 for(let i=0;i<95;i++){g.strokeStyle=i%3?'rgba(6,10,16,.24)':'rgba(238,231,213,.25)';g.lineWidth=rand(.2,.7);g.beginPath();const x=rand(0,70),y=rand(0,40);g.moveTo(x,y);g.lineTo(x+rand(3,18),y-rand(0,2));g.stroke();}
 g.restore();g.strokeStyle='rgba(227,221,200,.7)';g.lineWidth=.7;g.beginPath();g.moveTo(5,10);g.lineTo(62,4);g.lineTo(75,15);g.stroke();return c;
}
const chips=Array.from({length:9},metal);
function curve(p,u){
 const v=1-u,x=w*.5+p.side*3*v*u*p.reach;
 const y=h*(v*v*v*.22+3*v*v*u*.22+3*v*u*u*.73+u*u*u*.73);
 const dx=p.side*3*(1-2*u)*p.reach,dy=h*3*u*v*1.02;
 return {x,y,a:Math.atan2(dy,dx)};
}
function stop(){cancelAnimationFrame(frame);frame=0;canvas.classList.remove('is-active');ctx.clearRect(0,0,w,h);ctx.globalAlpha=1;}
function play(){
 stop();if(document.hidden)return;w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,1.6);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);
 polarity=Math.random()<.5?1:-1;grains=[];
 const count=w<600?660:1150;
 for(let i=0;i<count;i++){
  const band=Math.floor(rand(0,13)),side=i%2?1:-1,u=rand(.025,.975);
  const reach=Math.min(w*.70,h*.8)*(.25+band*.066);
  const p={side,reach,u,birth:rand(.1,1.8)+u*2.6,settle:rand(1.1,2.6),phase:rand(0,6.28),noise:rand(-2,2),size:i%23===0?rand(8,19):rand(.9,3.2),chip:i%23===0?chips[Math.floor(i/23)%chips.length]:null};
  const target=curve(p,u);p.ox=target.x+side*rand(35,180);p.oy=target.y+rand(-100,100);p.angle=rand(0,6.28);grains.push(p);
 }
 start=performance.now();last=0;canvas.classList.add('is-active');frame=requestAnimationFrame(draw);
}
function draw(now){
 const elapsed=(now-start)/1000;if(elapsed>=(reduce.matches?2:10.5)||document.hidden){stop();return;}
 frame=requestAnimationFrame(draw);if(now-last<25)return;last=now;ctx.clearRect(0,0,w,h);
 const t=reduce.matches?5:elapsed,fade=reduce.matches?Math.sin(elapsed*Math.PI/2)*.45:1-ease((t-8)/2.5);
 for(const p of grains){
  const age=t-p.birth;if(age<=0)continue;
  const lock=ease(age/p.settle);
  // Filings rotate into tangents and settle in staggered waves, then travel along the field.
  const drift=reduce.matches?0:Math.max(0,age-p.settle)*.017*polarity;
  const u=clamp(p.u+drift),target=curve(p,u);
  const flutter=reduce.matches?0:Math.sin(t*13+p.phase)*Math.exp(-age*1.4)*3;
  const x=p.ox+(target.x-p.ox)*lock+p.noise+flutter;
  const y=p.oy+(target.y-p.oy)*lock+p.noise*.7;
  const delta=Math.atan2(Math.sin(target.a-p.angle),Math.cos(target.a-p.angle));
  const angle=p.angle+delta*lock+flutter*.025;
  const visibility=fade*ease(age/.45)*(1-ease((u-.96)/.04));
  const gleam=.5+.5*Math.sin(angle*2+t*.7+p.phase);
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);
  ctx.globalAlpha=visibility;
  if(p.chip){ctx.drawImage(p.chip,-p.size/2,-p.size*.24,p.size,p.size*.48);}
  else{
   ctx.fillStyle='rgba(8,12,19,.65)';ctx.fillRect(-p.size*.65,.65,p.size*1.3,1.1);
   ctx.fillStyle='rgb('+Math.round(103+gleam*98)+','+Math.round(109+gleam*92)+','+Math.round(119+gleam*78)+')';
   ctx.fillRect(-p.size*.6,-.4,p.size*1.2,.6+gleam*.6);
   if(gleam>.92){ctx.globalAlpha=visibility*.38;ctx.fillStyle='#e9e2cf';ctx.fillRect(-.45,-.9,.9,1.8);}
  }
  ctx.restore();
 }
 ctx.globalAlpha=1;
}
document.addEventListener('armory:magnet',play);document.addEventListener('armory:clear-effect',stop);
window.addEventListener('resize',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});reduce.addEventListener('change',stop);
})();
