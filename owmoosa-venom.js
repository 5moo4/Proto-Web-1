(() => {
  'use strict';
  const canvas=document.createElement('canvas');canvas.className='venom-screen';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
  const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const texture=new Image();texture.src='./assets/armory/venom-overlay.webp';
  const mask=document.createElement('canvas'),mc=mask.getContext('2d');
  let frame=0,request=0,start=0,last=0,width=0,height=0,field,pixels,drops=[],phase=0,mirror=false;
  const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x);},rand=(a,b)=>a+Math.random()*(b-a);
  function stop(){request++;cancelAnimationFrame(frame);frame=0;canvas.classList.remove('is-active');if(ctx){ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.clearRect(0,0,width,height);}}
  async function play(){
    if(!ctx||!mc)return;stop();const token=request;
    try{await texture.decode();}catch{return;}
    if(token!==request||document.hidden)return;
    width=innerWidth;height=innerHeight;const ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
    phase=rand(0,6.28);mirror=Math.random()<.5;
    mask.width=Math.min(320,Math.ceil(width/3));mask.height=Math.ceil(mask.width*height/width);
    field=new Float32Array(mask.width*mask.height);pixels=mc.createImageData(mask.width,mask.height);
    const speed=rand(.85,1.2),origins=[rand(.04,.28),rand(.7,.96)];
    for(let y=0;y<mask.height;y++)for(let x=0;x<mask.width;x++){
      const u=x/(mask.width-1),v=y/(mask.height-1),i=y*mask.width+x;
      const startAt=Math.min(...origins.map(o=>Math.abs(o-u)))*1.4;
      const ripple=Math.sin(u*22+phase)*.25+Math.sin(u*57+phase*2)*.09;
      field[i]=startAt+v*(3.9+ripple*2)*speed+ripple*.5;
      const j=i*4;pixels.data[j]=pixels.data[j+1]=pixels.data[j+2]=255;
    }
    drops=Array.from({length:16},(_,i)=>{
      const side=i%2===0;return {x:(side?rand(.025,.13):rand(.87,.975))*width,y:rand(.01,.2)*height,r:rand(2.8,7),birth:rand(.5,3.3),speed:rand(13,47),bend:rand(1,6),phase:rand(0,6.28)};
    });
    start=performance.now();last=0;canvas.classList.add('is-active');frame=requestAnimationFrame(draw);
  }
  function draw(now){
    const t=(now-start)/1000,duration=reduce.matches?2:8.5;
    if(t>=duration||document.hidden){stop();return;}
    frame=requestAnimationFrame(draw);if(now-last<30)return;last=now;ctx.clearRect(0,0,width,height);
    const fade=reduce.matches?smooth(t/.4)*(1-smooth((t-1)/1))*.4:1-smooth((t-6)/2.5);
    ctx.save();if(mirror){ctx.translate(width,0);ctx.scale(-1,1);}
    ctx.globalAlpha=fade*.82;ctx.drawImage(texture,0,0,width,height);ctx.restore();
    if(reduce.matches){ctx.globalAlpha=1;return;}
    for(let i=0;i<field.length;i++)pixels.data[i*4+3]=Math.round(smooth((t-field[i])/.6)*255);
    mc.putImageData(pixels,0,0);ctx.globalCompositeOperation='destination-in';ctx.globalAlpha=1;ctx.drawImage(mask,0,0,width,height);ctx.globalCompositeOperation='source-over';
    for(const d of drops){
      const age=t-d.birth;if(age<0)continue;
      const grow=smooth(age/.6),distance=Math.max(0,age-.55)*d.speed;
      const x=d.x+Math.sin(age*.9+d.phase)*d.bend,y=d.y+distance,r=d.r*grow;
      if(y>height+20||r<.1)continue;
      ctx.globalAlpha=fade*.65;
      // A wet, tapered trail remains attached to each independently moving bead.
      ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.bezierCurveTo(d.x+d.bend,d.y+distance*.35,x-d.bend,y-distance*.25,x,y);
      ctx.strokeStyle='rgba(120,140,28,.2)';ctx.lineWidth=r*.75;ctx.lineCap='round';ctx.stroke();
      ctx.strokeStyle='rgba(226,227,156,.15)';ctx.lineWidth=.55;ctx.stroke();
      const liquid=ctx.createRadialGradient(x-r*.3,y-r*.35,r*.08,x,y,r*1.4);
      liquid.addColorStop(0,'rgba(239,239,178,.62)');liquid.addColorStop(.22,'rgba(144,160,47,.28)');
      liquid.addColorStop(.6,'rgba(66,80,13,.48)');liquid.addColorStop(.84,'rgba(181,194,78,.7)');liquid.addColorStop(1,'rgba(79,102,12,.05)');
      ctx.fillStyle=liquid;ctx.beginPath();ctx.ellipse(x,y,r,r*1.35,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(245,246,204,.65)';ctx.lineWidth=.7;ctx.beginPath();ctx.ellipse(x-r*.1,y-r*.1,r*.65,r*.92,0,3.5,4.8);ctx.stroke();
      if(r>4){ctx.strokeStyle='rgba(218,230,149,.35)';ctx.lineWidth=.45;ctx.beginPath();ctx.arc(x+r*.22,y+r*.4,r*.17,0,Math.PI*2);ctx.stroke();}
    }
    ctx.globalAlpha=1;
  }
  document.addEventListener('armory:venom',play);document.addEventListener('armory:clear-effect',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('resize',stop);
})();
