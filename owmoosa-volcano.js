(() => {
  'use strict';
  const scene=document.querySelector('#volcano'),canvas=scene.querySelector('canvas'),ctx=canvas.getContext('2d');
  if(!ctx)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),R=(a,b)=>a+Math.random()*(b-a),C=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),TAU=Math.PI*2;
  const pointer={x:0,y:0,active:false},assets={};
  let w=1,h=1,dpr=1,scale=1,left=0,top=0,raf=null,last=0,time=0,pulse=0,clock=0,lavaClock=1,ready=false;
  let ash=[],smoke=[],rocks=[],trails=[],sparks=[];
  let smokeWind=0,windTarget=0,nextWind=0,smokeInterval=.075;
  const point=(x,y)=>({x:left+x*1600*scale,y:top+y*900*scale});
  const grid=Float32Array.from({length:16384},()=>Math.random());
  function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y);let fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);const at=(a,b)=>grid[(a&127)+(b&127)*128];return(at(ix,iy)*(1-fx)+at(ix+1,iy)*fx)*(1-fy)+(at(ix,iy+1)*(1-fx)+at(ix+1,iy+1)*fx)*fy;}
  const fbm=(x,y)=>noise(x,y)*.58+noise(x*2.07,y*2.07)*.28+noise(x*4.13,y*4.13)*.14;
  const lava=document.createElement('canvas');lava.width=800;lava.height=450;
  const lc=lava.getContext('2d'),pixels=lc.createImageData(800,450),cells=[];
  // Widths and contours follow the actual gullies in the photograph, in image coordinates.
  const channels=[
    [[.501,.382,1.5],[.507,.415,3],[.515,.455,5],[.513,.484,7],[.537,.509,8],[.552,.547,10],[.591,.584,12],[.641,.616,16],[.70,.645,17]],
    [[.485,.38,1],[.477,.418,2],[.474,.451,3],[.48,.48,5],[.492,.511,5],[.483,.546,7]],
    [[.526,.413,1],[.542,.449,3],[.564,.475,4],[.581,.515,5],[.621,.551,8],[.667,.58,10]],
    [[.452,.39,1],[.419,.432,3],[.387,.458,4],[.349,.467,5],[.308,.491,7],[.257,.51,8]],
    [[.582,.555,2],[.589,.589,5],[.617,.627,9],[.68,.646,13],[.751,.663,15]]
  ];
  function prepareLava(){const winners=new Map();channels.forEach((path,channel)=>{let distance=0;for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],ax=a[0]*800,ay=a[1]*450,bx=b[0]*800,by=b[1]*450,dx=bx-ax,dy=by-ay,len=Math.hypot(dx,dy),radius=Math.max(a[2],b[2])*.5+3;
    for(let y=Math.max(0,Math.floor(Math.min(ay,by)-radius));y<Math.min(450,Math.ceil(Math.max(ay,by)+radius));y++)for(let x=Math.max(0,Math.floor(Math.min(ax,bx)-radius));x<Math.min(800,Math.ceil(Math.max(ax,bx)+radius));x++){
      const u=C(((x-ax)*dx+(y-ay)*dy)/(len*len)),half=(a[2]*(1-u)+b[2]*u)*.5,cross=((x-ax-u*dx)*-dy+(y-ay-u*dy)*dx)/len,dist=Math.hypot(x-ax-u*dx,y-ay-u*dy)/(half+1),key=y*800+x,old=winners.get(key);
      if(dist<=1.2&&(!old||dist<old.dist))winners.set(key,{key,x,y,cross,dist,along:distance+u*len,channel,speed:.65+channel*.17});
    }distance+=len;}});cells.push(...winners.values());}
  function paintLava(t){const data=pixels.data;for(const p of cells){const advect=p.along-t*(4+3*p.speed),warp=fbm(p.cross*.2+p.channel*8,advect*.035)-.5,grain=fbm(p.cross*.45+warp*3,advect*.13),edge=C((1.03-p.dist+(noise(p.x*.4,p.y*.4)-.5)*.26)*5),crust=C((grain-.42)*7),heat=C((1-crust)*(.78+.22*Math.sin(t*.63+p.channel))),i=p.key*4;data[i]=28+heat*227;data[i+1]=16+heat*heat*146;data[i+2]=11+heat**5*47;data[i+3]=edge*208;}lc.putImageData(pixels,0,0);}
  function makeAsh(initial=false){const near=Math.random()<.12;return{x:R(-40,w+40),y:initial?R(0,h):R(-60,-10),depth:near?R(1.3,2):R(.25,1),size:near?R(1.4,3.1):R(.3,1.3),fall:R(20,64),vx:R(-12,12),phase:R(0,TAU),tumble:R(-2,2),shade:R(65,143),alpha:R(.2,.6),shape:Array.from({length:5},()=>R(.4,1)),seed:R(0,100)};}
  function prepareSmokeKinds(){
    if(!assets.smoke)return;
    assets.smokeKinds=[{blur:0,tint:'rgba(20,16,13,.48)'},{blur:.7,tint:'rgba(52,43,35,.2)'},{blur:4,tint:'rgba(120,115,109,.18)'}].map(style=>{
      const tile=document.createElement('canvas');tile.width=tile.height=384;const c=tile.getContext('2d');c.filter=`blur(${style.blur}px)`;c.drawImage(assets.smoke,16,16,352,352);c.filter='none';c.globalCompositeOperation='source-atop';c.fillStyle=style.tint;c.fillRect(0,0,384,384);return tile;
    });
  }
  const smokeVents=[{x:.497,y:.378,fan:0,clock:0,interval:.14},{x:.423,y:.427,fan:-.035,clock:0,interval:.22},{x:.568,y:.468,fan:.04,clock:0,interval:.3}];
  function emitSmoke(age=0,ventIndex=Math.floor(R(0,3))){
    if(smoke.length>=155)return;const vent=smokeVents[ventIndex];const pick=Math.random(),kind=pick<.35?0:pick<.78?1:2;
    const specs=[{life:[5,8],alpha:[.3,.49],grow:[.1,.18],stretch:[.8,1.1]},{life:[7,12],alpha:[.2,.38],grow:[.18,.29],stretch:[.8,1.5]},{life:[6,10],alpha:[.09,.19],grow:[.22,.34],stretch:[1.5,2.2]}][kind];
    smoke.push({ventIndex,originY:vent.y,kind,age,life:R(...specs.life),fan:R(-.19,.19)+vent.fan,rise:R(.5,.76),windOffset:0,windResponse:R(.55,1.65)*(kind===2?1.3:1),rotation:R(-.8,.8),spin:R(-.17,.17),size:R(.016,.038),expansion:R(...specs.grow),seed:R(0,TAU),alpha:R(...specs.alpha),stretch:R(...specs.stretch),flip:Math.random()<.5?-1:1,growth:R(.75,1.1),curl:R(.006,.025),frequency:R(.4,1.1),fadeIn:R(2,5),fadeOut:R(1.7,3.5),originX:vent.x+R(-.007,.007)});
  }
  const rockVents=[{x:.497,y:.378,next:.5,interval:1,smokeIndex:0},{x:.568,y:.468,next:2.1,interval:2,smokeIndex:2}];
  function emitRock(near,vent){if(rocks.length>=128)return;rocks.push({ox:vent.x,oy:vent.y,near,tail:[],tailClock:0,x:R(-12,12),y:R(-8,5),z:R(6,8),age:0,life:R(5,7.5),vx:near?R(-32,32):R(-170,170),vy:near?R(-95,-45):R(-260,-135),vz:near?R(1.25,1.7):R(.35,.9),gravity:near?R(36,60):R(75,105),size:near?R(8,15):R(4,10),angle:R(0,TAU),spin:R(-3.8,3.8),roll:R(0,TAU),rollSpeed:R(1.2,3),tile:Math.floor(R(0,6)),smokeClock:0,tailInterval:R(.027,.065),smokeInterval:R(.025,.06)});}
  function erupt(vent){pulse=R(.65,1);vent.next=time+R(1.8,4)*vent.interval;const count=Math.floor(R(12,23));const nearCount=Math.floor(count*.21+Math.random()),spreadCount=Math.floor(count*1.16+Math.random());for(let i=0;i<nearCount;i++)emitRock(true,vent);for(let i=0;i<spreadCount;i++)emitRock(false,vent);for(let i=0;i<8;i++)emitSmoke(0,vent.smokeIndex);for(let i=0;i<40&&sparks.length<180;i++)sparks.push({ox:vent.x,oy:vent.y,x:0,y:0,vx:R(-120,120),vy:R(-310,-90),age:0,life:R(.6,1.8),size:R(.5,1.5)});}
  function project(r,mx,my){const zoom=5/Math.max(.42,r.z),o=point(r.ox,r.oy);return{x:o.x+r.x*zoom*scale-mx*zoom*.8,y:o.y+r.y*zoom*scale-my*zoom*.8,zoom};}
  function smokeSprite(x,y,size,angle,alpha){if(!assets.smoke||alpha<=0||x+size<0||x-size>w||y+size<0||y-size>h)return;ctx.save();ctx.globalAlpha=C(alpha);ctx.translate(x,y);ctx.rotate(angle);ctx.drawImage(assets.smoke,-size/2,-size/2,size,size);ctx.restore();}
  function drawSmoke(dt){
    if(dt>0&&time>=nextWind){windTarget=R(-.034,.034);nextWind=time+R(2.5,6);}
    smokeWind+=(windTarget-smokeWind)*Math.min(1,dt*.65);
    smoke=smoke.filter(p=>p.age<p.life);
    for(const p of smoke){
      p.age+=dt;const u=C(p.age/p.life);
      p.windOffset+=(smokeWind+Math.sin(time*p.frequency+p.seed)*p.curl*.45)*p.windResponse*(.3+u)*dt;
      const x=p.originX+p.fan*u**1.35+p.windOffset+Math.sin(u*5+p.seed)*p.curl*u;
      const y=p.originY-p.rise*(u*.9+u*u*.1);
      const at=point(x,y),size=(p.size+u**p.growth*p.expansion)*1600*scale;
      const texture=assets.smokeKinds?.[p.kind];if(!texture)continue;
      const stretch=p.stretch*(1+Math.sin(p.age*p.frequency+p.seed)*.1*u),alpha=C(p.age*p.fadeIn)*C((1-u)*p.fadeOut)*p.alpha;
      ctx.save();ctx.translate(at.x,at.y-size*.32);ctx.rotate(p.rotation+p.age*p.spin+smokeWind*u*2);ctx.scale(p.flip*stretch,1/stretch);ctx.globalAlpha=C(alpha);ctx.drawImage(texture,-size/2,-size/2,size,size);ctx.restore();
    }
  }
  function tailVariation(){return{life:R(.85,2.1),rotation:R(-Math.PI,Math.PI),spin:R(-.6,.6),drift:R(-9,9),response:R(.5,1.6),seed:R(0,100),windV:smokeWind*400,lift:R(2,12),curl:R(4,18),density:R(.2,.43),growth:R(1.1,2.8),stretch:R(.65,1.45),flip:Math.random()<.5?-1:1,fadePower:R(1.1,2.4)};}
  function drawTailPuff(p,age,size,mx,my,strength=1){
    const u=C(age/p.life),at=project(p,mx,my),diameter=Math.min(w*.38,size*at.zoom*scale*(1+u*p.growth));
    const alpha=C(age/.08)*(1-u)**p.fadePower*p.density*strength;
    if(!assets.smoke||alpha<=0)return;
    const stretch=p.stretch*(1+.16*Math.sin(age*1.7+p.seed));
    ctx.save();ctx.translate(at.x,at.y);ctx.rotate(p.rotation+p.spin*age);ctx.scale(p.flip*stretch,1/stretch);ctx.globalAlpha=C(alpha);
    ctx.drawImage(assets.smoke,-diameter/2,-diameter/2,diameter,diameter);ctx.restore();
  }
  function advectTail(p,dt,age){
    const gust=smokeWind*700*p.response+(noise(p.x*.02+time*.32,p.y*.02+p.seed)-.5)*p.curl*2+p.drift;
    p.windV+=(gust-p.windV)*Math.min(1,dt*1.8);
    p.x+=p.windV*dt;
    p.y-=(p.lift+Math.sin(time*.8+p.seed)*p.curl*.18)*dt;
    p.rotation+=p.windV*.0015*dt;
  }
  function drawTrails(dt,mx,my){trails=trails.filter(p=>p.age<p.life);for(const p of trails){p.age+=dt;advectTail(p,dt,p.age);drawTailPuff(p,p.age,p.size,mx,my);}}
  function drawRocks(dt,mx,my){rocks=rocks.filter(r=>r.age<r.life&&r.z>.45).sort((a,b)=>b.z-a.z);const atlas=assets.rocks;
    for(const r of rocks){const old={x:r.x,y:r.y,z:r.z};r.age+=dt;r.x+=r.vx*dt;r.y+=r.vy*dt;r.vy+=r.gravity*dt;r.z-=r.vz*dt;r.angle+=r.spin*dt;r.roll+=r.rollSpeed*dt;r.smokeClock+=dt;
      if(r.near&&dt>0){r.tailClock+=dt;if(r.tailClock>=r.tailInterval){r.tail.unshift({ox:r.ox,oy:r.oy,x:old.x,y:old.y,z:old.z,born:time,...tailVariation(),size:r.size*R(2.5,3.7)});r.tailClock%=r.tailInterval;r.tailInterval=R(.027,.065);}r.tail=r.tail.filter(p=>time-p.born<p.life).slice(0,48);}

      if(!r.near&&r.smokeClock>=r.smokeInterval&&dt>0){const count=Math.min(3,Math.max(1,Math.ceil(Math.hypot(r.x-old.x,r.y-old.y)/5)));for(let j=0;j<count&&trails.length<550;j++){const u=(j+1)/count;trails.push({ox:r.ox,oy:r.oy,x:old.x+(r.x-old.x)*u,y:old.y+(r.y-old.y)*u,z:old.z+(r.z-old.z)*u,age:0,...tailVariation(),size:r.size*R(1.7,3.2)});}r.smokeClock%=r.smokeInterval;r.smokeInterval=R(.025,.06);}
      if(r.near){for(let j=r.tail.length-1;j>=0;j--){const p=r.tail[j],age=time-p.born;advectTail(p,dt,age);drawTailPuff(p,age,p.size,mx,my,C(r.age*4)*1.2);}}
      const at=project(r,mx,my),size=Math.min(Math.min(w,h)*.35,r.size*at.zoom*scale*(r.near?1+Math.max(0,2-r.z)*.22:1));if(!atlas||at.x<-size*2||at.x>w+size*2||at.y<-size*2||at.y>h+size*2)continue;
      const frames=assets.meshes[r.tile],step=(((r.roll+r.angle*.25)/TAU)%1+1)%1*frames.length,index=Math.floor(step);ctx.save();ctx.translate(at.x,at.y);ctx.globalAlpha=C(r.age*5)*C((r.life-r.age)*2)*C((r.z-.45)/.13)*(.75+.25*C((6-r.z)/4));ctx.drawImage(frames[index],-size,-size,size*2,size*2);ctx.restore();
    }
  }
  function drawAsh(dt,mx){const wind=Math.sin(time*.31)*23+Math.sin(time*.77)*12;for(let i=0;i<ash.length;i++){const a=ash[i],eddy=(noise(a.x*.003+time*.13,a.y*.004+a.seed)-.5)*105;a.vx+=(wind+eddy+mx*1.5-a.vx)*Math.min(1,dt*1.7);a.x+=a.vx*a.depth*dt;a.y+=(a.fall+Math.sin(time*1.2+a.seed)*14)*a.depth*dt;a.phase+=a.tumble*dt;if(a.y>h+30){ash[i]=makeAsh();continue;}if(a.x<-60)a.x=w+50;if(a.x>w+60)a.x=-50;let x=a.x,y=a.y;if(pointer.active){const dx=x-pointer.x,dy=y-pointer.y,d=Math.hypot(dx,dy);if(d<100){const push=(1-d/100)*18*a.depth;x+=dx/Math.max(1,d)*push;y+=dy/Math.max(1,d)*push;}}const size=a.size*a.depth;ctx.save();ctx.translate(x,y);ctx.rotate(a.phase);ctx.scale(1,.25+.65*Math.abs(Math.sin(a.phase)));ctx.fillStyle=`rgba(${a.shade},${a.shade-2},${a.shade-4},${a.alpha})`;ctx.beginPath();a.shape.forEach((v,j)=>{const angle=j/5*TAU,px=Math.cos(angle)*size*v,py=Math.sin(angle)*size*v;j?ctx.lineTo(px,py):ctx.moveTo(px,py);});ctx.closePath();ctx.fill();ctx.restore();}}
  function drawSparks(dt){sparks=sparks.filter(p=>p.age<p.life);ctx.save();ctx.globalCompositeOperation='lighter';for(const p of sparks){const o=point(p.ox,p.oy);p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=160*dt;ctx.strokeStyle=`rgba(255,135,42,${C(1-p.age/p.life)*.65})`;ctx.lineWidth=p.size;ctx.beginPath();ctx.moveTo(o.x+p.x*scale,o.y+p.y*scale);ctx.lineTo(o.x+(p.x-p.vx*.018)*scale,o.y+(p.y-p.vy*.018)*scale);ctx.stroke();}ctx.restore();}
  function frame(now){raf=null;const dt=reduced.matches?0:Math.min(.035,Math.max(0,(now-last)/1000));last=now;time+=dt;if(dt>0){for(const vent of rockVents)if(time>=vent.next)erupt(vent);for(let v=0;v<smokeVents.length;v++){const vent=smokeVents[v];vent.clock+=dt;while(vent.clock>=vent.interval){vent.clock-=vent.interval;emitSmoke(0,v);vent.interval=R(.16,.31);}}}pulse*=Math.exp(-dt*2.7);const mx=pointer.active?(pointer.x/w-.5)*7:0,my=pointer.active?(pointer.y/h-.5)*5:0,sx=mx+Math.sin(time*57)*pulse*2.3,sy=my+Math.cos(time*49)*pulse*1.3;
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.save();ctx.translate(sx,sy);if(assets.background)ctx.drawImage(assets.background,left,top,1600*scale,900*scale);lavaClock+=dt;if(lavaClock>.065){paintLava(time);lavaClock=0;}ctx.drawImage(lava,left,top,1600*scale,900*scale);drawSmoke(dt);const o=point(.497,.378),glow=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,Math.max(1,w*.2));glow.addColorStop(0,`rgba(255,88,15,${.035+pulse*.14})`);glow.addColorStop(1,'rgba(255,75,10,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);drawSparks(dt);drawTrails(dt,mx,my);drawRocks(dt,mx,my);ctx.restore();drawAsh(dt,mx);if(!reduced.matches&&!document.hidden)raf=requestAnimationFrame(frame);
  }
  function restart(){if(raf!==null)cancelAnimationFrame(raf);raf=null;last=performance.now();if(ready&&!document.hidden)frame(last);}
  function resize(){const b=scene.getBoundingClientRect();w=Math.max(1,b.width);h=Math.max(1,b.height);dpr=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);scale=Math.max(w/1600,h/900)*1.055;left=(w-1600*scale)/2;top=(h-900*scale)/2;ash=Array.from({length:Math.min(1350,Math.max(450,Math.floor(w*h/1800)))},()=>makeAsh(true));restart();}
  function load(name,url){return new Promise(resolve=>{const image=new Image();image.onload=()=>{assets[name]=image;resolve();};image.onerror=()=>{console.warn('Volcano asset unavailable:',url);resolve();};image.src=url;});}
  scene.addEventListener('pointermove',e=>{const b=scene.getBoundingClientRect();pointer.x=e.clientX-b.left;pointer.y=e.clientY-b.top;pointer.active=true;});for(const event of ['pointerleave','pointercancel'])scene.addEventListener(event,()=>pointer.active=false);scene.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')pointer.active=false;});document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);
  prepareLava();paintLava(0);Promise.all([load('background','./owmoosa-volcano-background.png'),load('rocks','./owmoosa-volcano-rocks.png'),load('smoke','./owmoosa-volcano-smoke.png')]).then(async()=>{prepareSmokeKinds();if(assets.rocks)assets.meshes=await window.buildVolcanicRockFrames(assets.rocks);for(let i=0;i<80;i++)emitSmoke(R(.2,6),i%3);ready=true;new ResizeObserver(resize).observe(scene);resize();});
})();
