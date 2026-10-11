(() => {
  'use strict';
  const canvas=document.createElement('canvas');canvas.className='tempest-screen';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
  const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const mist=document.createElement('canvas');mist.width=192;mist.height=128;
  const mc=mist.getContext('2d');
  let frame=0,start=0,last=0,width=0,height=0,rain=[],clouds=[],drops=[],gusts=[],direction=1,seed=0;
  const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
  const rand=(a,b)=>a+Math.random()*(b-a);
  function hash(x,y){const v=Math.sin(x*127.1+y*311.7+seed)*43758.5453;return v-Math.floor(v);}
  function noise(x,y){
    const ix=Math.floor(x),iy=Math.floor(y),u=smooth(x-ix),v=smooth(y-iy);
    return (hash(ix,iy)*(1-u)+hash(ix+1,iy)*u)*(1-v)+(hash(ix,iy+1)*(1-u)+hash(ix+1,iy+1)*u)*v;
  }
  function buildMist(){
    const pixels=mc.createImageData(192,128);
    for(let y=0;y<128;y++)for(let x=0;x<192;x++){
      const u=x/191,v=y/127;
      const cloud=noise(u*5,v*4)*.55+noise(u*14,v*11)*.3+noise(u*40,v*33)*.15;
      const edge=Math.pow(Math.max(0,1-Math.pow((u-.5)*2,2)-Math.pow((v-.5)*2,2)),1.7);
      const i=(y*192+x)*4;pixels.data[i]=170;pixels.data[i+1]=184;pixels.data[i+2]=193;
      pixels.data[i+3]=Math.round(smooth((cloud-.27)*1.65)*edge*190);
    }
    mc.putImageData(pixels,0,0);
  }
  function stop(){
    cancelAnimationFrame(frame);frame=0;canvas.classList.remove('is-active');
    if(ctx){ctx.globalAlpha=1;ctx.clearRect(0,0,width,height);}
  }
  function play(){
    if(!ctx||!mc)return;stop();width=innerWidth;height=innerHeight;
    const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
    seed=rand(0,1000);direction=Math.random()<.5?-1:1;buildMist();
    gusts=Array.from({length:4},(_,i)=>({time:.8+i*1.35+rand(-.3,.4),strength:rand(.35,1),span:rand(.45,.95)}));
    rain=Array.from({length:Math.min(650,Math.round(width*height/1900))},()=>({x:rand(-width*.5,width*1.5),y:rand(-height,height),depth:rand(.15,1),life:rand(0,1.5)}));
    clouds=Array.from({length:10},()=>({x:rand(-width,width*1.5),y:rand(-height*.15,height*.85),size:rand(.45,1.1),speed:rand(25,95),alpha:rand(.15,.34)}));
    drops=Array.from({length:24},()=>({x:rand(0,width),y:rand(0,height),r:rand(1.5,5.5),birth:rand(.8,6),slide:rand(2,14)}));
    start=performance.now();last=start;canvas.classList.add('is-active');frame=requestAnimationFrame(draw);
  }
  function draw(now){
    const t=(now-start)/1000,dt=Math.min((now-last)/1000,.04);last=now;
    const duration=reduce.matches?2:9;
    if(t>=duration||document.hidden){stop();return;}
    frame=requestAnimationFrame(draw);ctx.clearRect(0,0,width,height);
    const envelope=reduce.matches?Math.sin(Math.PI*t/2)*.35:smooth(t/1.6)*(1-smooth((t-6.6)/2.4));
    let force=.25;
    for(const g of gusts)force+=g.strength*Math.exp(-Math.pow((t-g.time)/g.span,2));
    const wind=direction*(120+force*310)+Math.sin(t*1.1+seed)*55;
    const shade=ctx.createRadialGradient(width*.5,height*.4,width*.08,width*.5,height*.5,Math.max(width,height)*.7);
    shade.addColorStop(0,'rgba(16,28,37,.08)');shade.addColorStop(1,'rgba(9,23,37,.62)');
    ctx.globalAlpha=envelope;ctx.fillStyle=shade;ctx.fillRect(0,0,width,height);
    for(const c of clouds){
      if(!reduce.matches)c.x+=wind*c.speed/180*dt;
      const span=width*2.5;c.x=((c.x+width)%span+span)%span-width;
      const w=width*c.size,h=Math.max(150,height*c.size*.48);
      ctx.globalAlpha=envelope*c.alpha*(.6+force*.35);ctx.drawImage(mist,c.x,c.y,w,h);
    }
    if(!reduce.matches){
      ctx.lineCap='round';
      for(const r of rain){
        r.life-=dt;if(r.life>0)continue;
        const vx=wind*(.35+r.depth*.7),vy=520+r.depth*1050;
        r.x+=vx*dt;r.y+=vy*dt;
        if(r.y>height+80||r.x<-width*.4||r.x>width*1.4){r.y=rand(-height*.3,-20);r.x=rand(-width*.25,width*1.25);}
        const exposure=.011+r.depth*.02,dx=vx*exposure,dy=vy*exposure;
        ctx.globalAlpha=envelope*(.07+r.depth*.24);
        ctx.strokeStyle=r.depth>.8?'#c8d8e0':'#8cabbc';ctx.lineWidth=.3+r.depth*.85;
        ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x-dx,r.y-dy);ctx.stroke();
        if(r.depth>.9){
          ctx.globalAlpha=envelope*.045;ctx.lineWidth=3;ctx.stroke();
        }
      }
      for(const d of drops){
        const age=t-d.birth;if(age<0)continue;
        const opacity=smooth(age/.2)*(1-smooth((age-2)/2))*envelope;if(opacity<=0)continue;
        const x=d.x+direction*age*age*force*2,y=d.y+age*age*d.slide;
        ctx.globalAlpha=opacity;
        const lens=ctx.createRadialGradient(x-d.r*.3,y-d.r*.3,0,x,y,d.r*1.4);
        lens.addColorStop(0,'rgba(200,220,228,.10)');lens.addColorStop(.6,'rgba(5,18,28,.13)');lens.addColorStop(.88,'rgba(165,196,209,.25)');lens.addColorStop(1,'rgba(180,205,219,0)');
        ctx.fillStyle=lens;ctx.beginPath();ctx.ellipse(x,y,d.r,d.r*1.35,wind*.0004,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle='rgba(222,238,244,.35)';ctx.lineWidth=.65;ctx.beginPath();ctx.arc(x,y,d.r*.74,3.7,4.8);ctx.stroke();
      }
    }
    ctx.globalAlpha=1;
  }
  document.addEventListener('armory:tempest',play);document.addEventListener('armory:clear-effect',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('resize',stop);
})();
