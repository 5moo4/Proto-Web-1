(() => {
  'use strict';
  const canvas=document.createElement('canvas');canvas.className='flame-screen';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
  const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const texture=new Image();texture.src='./assets/armory/flame-overlay.webp';
  const surface=document.createElement('canvas'),surfaceCtx=surface.getContext('2d');
  const mask=document.createElement('canvas'),maskCtx=mask.getContext('2d');
  let frame=0,request=0,start=0,last=0,width=0,height=0,ratio=1,embers=[],seeds=[],arrival,grain,maskData,phase=0;
  const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
  function hash(x,y){const v=Math.sin(x*127.1+y*311.7+phase)*43758.5453;return v-Math.floor(v);}
  function noise(x,y){
    const ix=Math.floor(x),iy=Math.floor(y),u=smooth(x-ix),v=smooth(y-iy);
    return (hash(ix,iy)*(1-u)+hash(ix+1,iy)*u)*(1-v)+(hash(ix,iy+1)*(1-u)+hash(ix+1,iy+1)*u)*v;
  }
  function groundTime(x){return Math.min(...seeds.map(s=>s.birth+Math.abs(x-s.x)/s.spread));}
  function stop(){
    request++;cancelAnimationFrame(frame);frame=0;canvas.classList.remove('is-active');
    if(ctx){ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.clearRect(0,0,width,height);}
  }
  async function play(){
    if(!ctx||!surfaceCtx||!maskCtx)return;stop();const token=request;
    try{await texture.decode();}catch{return;}
    if(token!==request||document.hidden)return;
    width=innerWidth;height=innerHeight;ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=surface.width=Math.round(width*ratio);canvas.height=surface.height=Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);surfaceCtx.setTransform(ratio,0,0,ratio,0,0);
    // The photographic flame geometry is fixed for the entire run: no growth scaling.
    const baseHeight=Math.min(height*.94,Math.max(height*.65,width*.6));
    surfaceCtx.save();if(Math.random()<.5){surfaceCtx.translate(width,0);surfaceCtx.scale(-1,1);}
    surfaceCtx.drawImage(texture,0,height-baseHeight,width,baseHeight);surfaceCtx.restore();
    phase=Math.random()*1000;
    const origin=.12+Math.random()*.76;
    seeds=[
      {x:origin,birth:0,spread:.15+Math.random()*.09,rise:.18+Math.random()*.06},
      {x:(origin+.32+Math.random()*.2)%1,birth:.55+Math.random()*.7,spread:.12+Math.random()*.1,rise:.16+Math.random()*.08},
      {x:(origin+.64+Math.random()*.16)%1,birth:1.15+Math.random()*.9,spread:.13+Math.random()*.08,rise:.17+Math.random()*.07}
    ];
    mask.width=Math.min(360,Math.ceil(width/3));mask.height=Math.ceil(mask.width*height/width);
    maskData=maskCtx.createImageData(mask.width,mask.height);arrival=new Float32Array(mask.width*mask.height);grain=new Float32Array(arrival.length);
    for(let y=0;y<mask.height;y++)for(let x=0;x<mask.width;x++){
      const u=x/(mask.width-1),v=1-y/(mask.height-1),i=y*mask.width+x;
      const turbulence=noise(u*12,v*10)*.65+noise(u*39,v*34)*.25+noise(u*97,v*79)*.1;
      // Ignition propagates laterally from seeds, then upward at locally different speeds.
      arrival[i]=Math.min(...seeds.map(s=>s.birth+Math.abs(u-s.x)/s.spread+v/s.rise))+(turbulence-.5)*.8;
      grain[i]=turbulence;
      const j=i*4;maskData.data[j]=maskData.data[j+1]=maskData.data[j+2]=255;
    }
    embers=Array.from({length:95},()=>{
      const x=Math.random();return {x:x*width,birth:groundTime(x)+.25+Math.random()*3,speed:45+Math.random()*100,sway:8+Math.random()*28,r:.45+Math.random()*1.2,phase:Math.random()*6.28};
    });
    start=performance.now();last=0;canvas.classList.add('is-active');frame=requestAnimationFrame(draw);
  }
  function draw(now){
    const t=(now-start)/1000,duration=reduce.matches?1.8:8.5;
    if(t>=duration||document.hidden){stop();return;}
    frame=requestAnimationFrame(draw);if(now-last<30)return;last=now;
    ctx.clearRect(0,0,width,height);
    if(reduce.matches){
      ctx.globalAlpha=smooth(t/.35)*(1-smooth((t-.85)/.95))*.35;
      ctx.drawImage(surface,0,0,width,height);ctx.globalAlpha=1;return;
    }
    const fade=1-smooth((t-6.2)/2.3);
    // Fixed-size strips receive only small local lateral turbulence, never vertical stretching.
    const rows=Math.ceil(height/4);
    for(let row=0;row<rows;row++){
      const top=Math.round(row*height/rows*ratio)/ratio,bottom=Math.round((row+1)*height/rows*ratio)/ratio;
      const y=top/height,drift=(Math.sin(y*19-t*2.7+phase)*1.8+Math.sin(y*43-t*4.1)*.8)*(1-y);
      ctx.drawImage(surface,0,top*ratio,surface.width,(bottom-top)*ratio,drift,top,width,bottom-top);
    }
    for(let i=0;i<arrival.length;i++){
      const age=t-arrival[i],flicker=Math.sin(t*7-grain[i]*18)*.045;
      maskData.data[i*4+3]=Math.round(smooth((age+flicker)/.32)*fade*(.91+.07*Math.sin(t*4+grain[i]*13))*255);
    }
    maskCtx.putImageData(maskData,0,0);
    ctx.globalCompositeOperation='destination-in';ctx.drawImage(mask,0,0,width,height);ctx.globalCompositeOperation='source-over';
    // Heat and sparks exist only near regions that have already ignited.
    for(const seed of seeds){
      const power=smooth((t-seed.birth)/1.1)*fade*.12;
      if(!power)continue;
      const x=seed.x*width,r=Math.min(width*.38,height*.45),glow=ctx.createRadialGradient(x,height,0,x,height,r);
      glow.addColorStop(0,'rgba(255,88,12,1)');glow.addColorStop(1,'rgba(200,44,0,0)');
      ctx.globalAlpha=power;ctx.fillStyle=glow;ctx.fillRect(x-r,height-r,r*2,r);
    }
    ctx.globalCompositeOperation='lighter';
    for(const e of embers){
      const age=t-e.birth;if(age<0||age>3)continue;
      const x=e.x+Math.sin(age*1.8+e.phase)*e.sway,y=height-age*e.speed;
      ctx.globalAlpha=fade*Math.sin(age/3*Math.PI)*.68;ctx.fillStyle='#ffb35b';ctx.beginPath();ctx.ellipse(x,y,e.r*.55,e.r*1.5,-.25,0,Math.PI*2);ctx.fill();
    }
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
  }
  document.addEventListener('armory:flame',play);document.addEventListener('armory:clear-effect',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('resize',stop);
})();
