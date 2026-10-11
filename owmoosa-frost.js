(() => {
  'use strict';
  const canvas=document.createElement('canvas');
  canvas.className='frost-screen';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
  const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const landscape=new Image(),portrait=new Image();
  landscape.src='./assets/armory/frost-glass-v2.webp';portrait.src='./assets/armory/frost-glass-portrait-v2.webp';
  let texture=landscape;
  const surface=document.createElement('canvas'),mask=document.createElement('canvas');
  const surfaceCtx=surface.getContext('2d'),maskCtx=mask.getContext('2d');
  let frame=0,start=0,lastPaint=0,width=0,height=0,ratio=1,arrival,maskPixels,request=0;
  const clamp=n=>Math.max(0,Math.min(1,n));
  const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
  function hash(x,y){const v=Math.sin(x*127.1+y*311.7)*43758.5453;return v-Math.floor(v);}
  function noise(x,y){
    const ix=Math.floor(x),iy=Math.floor(y),fx=smooth(x-ix),fy=smooth(y-iy);
    return (hash(ix,iy)*(1-fx)+hash(ix+1,iy)*fx)*(1-fy)+(hash(ix,iy+1)*(1-fx)+hash(ix+1,iy+1)*fx)*fy;
  }
  function stop(){
    request++;cancelAnimationFrame(frame);frame=0;
    canvas.classList.remove('is-active');
    if(ctx){ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.clearRect(0,0,width,height);}
  }
  function prepare(){
    width=innerWidth;height=innerHeight;ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=surface.width=Math.round(width*ratio);
    canvas.height=surface.height=Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);surfaceCtx.setTransform(ratio,0,0,ratio,0,0);
    surfaceCtx.drawImage(texture,0,0,width,height);
    mask.width=Math.min(420,Math.ceil(width/3));mask.height=Math.ceil(mask.width*height/width);
    maskPixels=maskCtx.createImageData(mask.width,mask.height);
    arrival=new Float32Array(mask.width*mask.height);
    for(let y=0;y<mask.height;y++)for(let x=0;x<mask.width;x++){
      const u=x/(mask.width-1),v=y/(mask.height-1);
      const edge=Math.min(u,1-u,v,1-v);
      const n=noise(u*9,v*9)*.55+noise(u*25,v*25)*.3+noise(u*69,v*69)*.15;
      arrival[y*mask.width+x]=edge*2.35+n*.23;
      const i=(y*mask.width+x)*4;maskPixels.data[i]=maskPixels.data[i+1]=maskPixels.data[i+2]=255;
    }
  }
  async function play(){
    if(!ctx||!surfaceCtx||!maskCtx)return;
    stop();const token=request;
    texture=innerHeight>innerWidth?portrait:landscape;
    try{await texture.decode();}catch{return;}
    if(token!==request||document.hidden)return;
    prepare();start=performance.now();lastPaint=0;
    canvas.classList.add('is-active');frame=requestAnimationFrame(draw);
  }
  function draw(now){
    const t=now-start,duration=reduce.matches?1800:4800;
    if(t>=duration||document.hidden){stop();return;}
    frame=requestAnimationFrame(draw);
    // Keep texture rendering bounded on high-density mobile displays.
    if(now-lastPaint<30)return;lastPaint=now;
    ctx.clearRect(0,0,width,height);
    const fade=reduce.matches?smooth(t/350)*(1-smooth((t-850)/950))*.48:1-smooth((t-3050)/1750);
    if(reduce.matches){
      ctx.globalAlpha=fade;ctx.drawImage(surface,0,0,width,height);ctx.globalAlpha=1;return;
    }
    const growth=smooth(t/1850)*1.25;
    for(let i=0;i<arrival.length;i++){
      const frontier=(growth-arrival[i])/.105;
      maskPixels.data[i*4+3]=Math.round(smooth(frontier)*255);
    }
    maskCtx.putImageData(maskPixels,0,0);
    ctx.globalAlpha=fade*.94;ctx.drawImage(surface,0,0,width,height);
    ctx.globalAlpha=1;ctx.globalCompositeOperation='destination-in';
    ctx.drawImage(mask,0,0,width,height);ctx.globalCompositeOperation='source-over';
  }
  document.addEventListener('armory:frost',play);
  document.addEventListener('armory:clear-effect',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  window.addEventListener('resize',stop);
})();
