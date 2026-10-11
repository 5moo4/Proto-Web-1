(() => {
  'use strict';
  const canvas=document.createElement('canvas');
  canvas.className='lightning-screen';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
  const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,start=0,width=0,height=0,bolts=[];
  const clamp=x=>Math.max(0,Math.min(1,x));
  function stop(){
    cancelAnimationFrame(frame);frame=0;canvas.classList.remove('is-active');
    if(ctx){ctx.globalAlpha=1;ctx.clearRect(0,0,width,height);}
  }
  // Midpoint displacement gives a fixed, irregular discharge channel.
  // Each branch starts only after the parent leader reaches its junction.
  function channel(a,b,roughness,depth){
    if(!depth)return [a,b];
    const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1;
    const displacement=(Math.random()-.5)*roughness;
    const mid={x:(a.x+b.x)/2-dy/len*displacement,y:(a.y+b.y)/2+dx/len*displacement};
    const left=channel(a,mid,roughness*.53,depth-1),right=channel(mid,b,roughness*.53,depth-1);
    return left.slice(0,-1).concat(right);
  }
  function addBolt(a,b,birth,duration,weight,depth){
    const points=channel(a,b,Math.hypot(b.x-a.x,b.y-a.y)*.27,6);
    const distances=[0];
    for(let i=1;i<points.length;i++)distances.push(distances[i-1]+Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y));
    const length=distances[distances.length-1];
    bolts.push({points,distances,length,birth,duration,weight,phase:Math.random()*6.28});
    if(!depth)return;
    const n=depth===2?6:2;
    for(let j=0;j<n;j++){
      const index=Math.floor((.16+j*.105+Math.random()*.05)*(points.length-1));
      const p=points[index],f=distances[index]/length;
      const angle=Math.atan2(b.y-a.y,b.x-a.x)+(j%2?1:-1)*(.48+Math.random()*.62);
      const reach=length*(.12+Math.random()*.12);
      addBolt(p,{x:p.x+Math.cos(angle)*reach,y:p.y+Math.sin(angle)*reach},birth+f*duration+65,500+Math.random()*450,weight*.42,depth-1);
    }
  }
  function play(){
    if(!ctx)return;stop();width=innerWidth;height=innerHeight;
    const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
    bolts=[];
    const routes=[
      [.10,-.02,.19,.80,0,2500],
      [.91,-.02,.80,.91,550,2700],
      [-.02,.38,.35,.20,1100,1750],
      [1.02,.56,.67,.32,1700,1850],
      [.10,1.02,.42,.78,2350,1500],
      [.97,1.02,.60,.91,2850,1500]
    ];
    for(const [ax,ay,bx,by,birth,duration] of routes)addBolt({x:ax*width,y:ay*height},{x:bx*width,y:by*height},birth,duration,1.25,2);
    start=performance.now();canvas.classList.add('is-active');frame=requestAnimationFrame(draw);
  }
  function trace(b,length){
    const p=b.points;ctx.beginPath();ctx.moveTo(p[0].x,p[0].y);
    let tip=p[0];
    for(let i=1;i<p.length;i++){
      if(b.distances[i]<=length){ctx.lineTo(p[i].x,p[i].y);tip=p[i];continue;}
      const f=clamp((length-b.distances[i-1])/(b.distances[i]-b.distances[i-1]));
      tip={x:p[i-1].x+(p[i].x-p[i-1].x)*f,y:p[i-1].y+(p[i].y-p[i-1].y)*f};ctx.lineTo(tip.x,tip.y);break;
    }
    return tip;
  }
  function draw(now){
    const t=now-start,duration=reduce.matches?2000:6900;
    if(t>=duration||document.hidden){stop();return;}
    ctx.clearRect(0,0,width,height);
    if(reduce.matches){
      const alpha=Math.sin(Math.PI*t/duration)*.15;
      const glow=ctx.createRadialGradient(width*.5,height*.5,width*.2,width*.5,height*.5,Math.max(width,height)*.8);
      glow.addColorStop(0,'rgba(126,164,255,0)');glow.addColorStop(1,'rgba(140,176,255,1)');
      ctx.globalAlpha=alpha;ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);ctx.globalAlpha=1;
    }else{
      const fade=1-clamp((t-5000)/1900);
      ctx.lineCap='round';ctx.lineJoin='round';
      for(const b of bolts){
        const age=t-b.birth;if(age<=0)continue;
        const progress=clamp(age/b.duration);
        // Smoothly changing brightness, never a full-screen strobe.
        const power=(.78+.12*Math.sin(t*.003+b.phase))*fade;
        const length=b.length*progress;
        const tip=trace(b,length);
        for(const [size,color,alpha] of [[12,'#4855d5',.07],[5,'#678fff',.19],[2,'#a2cfff',.64],[.65,'#f5fbff',.96]]){
          ctx.globalAlpha=power*alpha;ctx.lineWidth=Math.max(.25,b.weight*size);ctx.strokeStyle=color;ctx.stroke();
        }
        if(progress<1&&b.weight>.8){
          const halo=ctx.createRadialGradient(tip.x,tip.y,0,tip.x,tip.y,16);
          halo.addColorStop(0,'rgba(231,246,255,.65)');halo.addColorStop(.14,'rgba(136,186,255,.3)');halo.addColorStop(1,'rgba(90,125,255,0)');
          ctx.globalAlpha=fade;ctx.fillStyle=halo;ctx.fillRect(tip.x-16,tip.y-16,32,32);
        }
      }
      ctx.globalAlpha=1;
    }
    frame=requestAnimationFrame(draw);
  }
  document.addEventListener('armory:lightning',play);
  document.addEventListener('armory:clear-effect',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  window.addEventListener('resize',stop);
})();
