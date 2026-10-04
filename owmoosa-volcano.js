(() => {
  'use strict';
  const scene=document.querySelector('#volcano'),canvas=scene.querySelector('canvas'),ctx=canvas.getContext('2d');
  if(!ctx)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),R=(a,b)=>a+Math.random()*(b-a),C=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),TAU=Math.PI*2;
  const pointer={x:0,y:0,active:false},assets={};
  let w=1,h=1,dpr=1,scale=1,left=0,top=0,raf=null,last=0,time=0,pulse=0,clock=0,ready=false;
  let ash=[],smoke=[],rocks=[],trails=[],detachedTails=[],sparks=[],impactDust=[],groundSmoke=[],groundChips=[],groundMarks=[],landedRocks=[];
  let activity=.8,activityTarget=.8,nextPhase=5,quiet=false,shockwaves=[];
  let smokeWind=0,windTarget=0,nextWind=0,smokeInterval=.075;
  const point=(x,y)=>({x:left+x*1600*scale,y:top+y*900*scale});
  const grid=Float32Array.from({length:16384},()=>Math.random());
  function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y);let fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);const at=(a,b)=>grid[(a&127)+(b&127)*128];return(at(ix,iy)*(1-fx)+at(ix+1,iy)*fx)*(1-fy)+(at(ix,iy+1)*(1-fx)+at(ix+1,iy+1)*fx)*fy;}
  const fbm=(x,y)=>noise(x,y)*.58+noise(x*2.07,y*2.07)*.28+noise(x*4.13,y*4.13)*.14;
  function makeAsh(initial=false){const near=Math.random()<.12;return{x:R(-40,w+40),y:initial?R(0,h):R(-60,-10),depth:near?R(1.3,2):R(.25,1),size:near?R(1.4,3.1):R(.3,1.3),fall:R(20,64),vx:R(-12,12),phase:R(0,TAU),tumble:R(-2,2),shade:R(65,143),alpha:R(.2,.6),shape:Array.from({length:5},()=>R(.4,1)),seed:R(0,100)};}
  function prepareSmokeKinds(){
    if(!assets.smoke)return;
    const palette=[[24,24,26],[50,43,36],[83,78,72],[116,115,110],[62,65,68]];
    assets.smokeKinds=[0,.7,4].map((blur,kind)=>palette.map(rgb=>{
      function tint(warm){const tile=document.createElement('canvas');tile.width=tile.height=320;const c=tile.getContext('2d');c.filter=`blur(${blur}px)`;c.drawImage(assets.smoke,14,14,292,292);c.filter='none';c.globalCompositeOperation='source-atop';c.fillStyle=`rgba(${rgb.join(',')},${kind===0?.48:.3})`;c.fillRect(0,0,320,320);if(warm){const glow=c.createLinearGradient(0,0,0,320);glow.addColorStop(0,'rgba(169,76,27,0)');glow.addColorStop(1,'rgba(185,81,28,.4)');c.fillStyle=glow;c.fillRect(0,0,320,320);}return tile;}
      return{cool:tint(false),warm:tint(true)};
    }));
  }
  function paintSmoke(texture,x,y,size,alpha,heat){
    ctx.globalAlpha=C(alpha*(1-heat));ctx.drawImage(texture.cool,x,y,size,size);
    if(heat>.001){ctx.globalAlpha=C(alpha*heat);ctx.drawImage(texture.warm,x,y,size,size);}
  }
  const smokeVents=[{x:.497,y:.378,fan:0,clock:0,interval:.14},{x:.423,y:.427,fan:-.035,clock:0,interval:.22},{x:.568,y:.468,fan:.04,clock:0,interval:.3}];
  function emitSmoke(age=0,ventIndex=Math.floor(R(0,3))){
    if(smoke.length>=155)return;const vent=smokeVents[ventIndex];const pick=Math.random(),kind=pick<.35?0:pick<.78?1:2;
    const specs=[{life:[5,8],alpha:[.3,.49],grow:[.1,.18],stretch:[.8,1.1]},{life:[7,12],alpha:[.2,.38],grow:[.18,.29],stretch:[.8,1.5]},{life:[6,10],alpha:[.09,.19],grow:[.22,.34],stretch:[1.5,2.2]}][kind];
    smoke.push({tone:Math.floor(R(0,5)),warmth:R(.25,.85),breathe:R(.03,.13),ventIndex,originY:vent.y,kind,age,life:R(...specs.life),fan:R(-.19,.19)+vent.fan,rise:R(.5,.76),windOffset:0,windResponse:R(.55,1.65)*(kind===2?1.3:1),rotation:R(-.8,.8),spin:R(-.17,.17),size:R(.016,.038),expansion:R(...specs.grow),seed:R(0,TAU),alpha:R(...specs.alpha),stretch:R(...specs.stretch),flip:Math.random()<.5?-1:1,growth:R(.75,1.1),curl:R(.006,.025),frequency:R(.4,1.1),fadeIn:R(2,5),fadeOut:R(1.7,3.5),originX:vent.x+R(-.007,.007)});
  }
  const rockVents=[{x:.497,y:.378,next:.5,interval:1,smokeIndex:0},{x:.568,y:.468,next:2.1,interval:2,smokeIndex:2}];
  function rockHeat(r,age){const flicker=r.baseSize?(1-C(r.age/2)*.06*(1-noise(r.seed+age*.16,r.seed*.73))):1;return C((r.heat??.3)*Math.exp(-age*(r.cooling??.04))*flicker);}
  function rockVisibility(r){const distance=r.baseSize?(r.impactDepth??3)*r.depth/3:r.z;return Math.exp(-Math.max(0,(distance??1)-.8)*(r.haze??.085));}
  function rockMaterial(r,age){const heat=rockHeat(r,age),visibility=rockVisibility(r);return `saturate(${(.65+heat*2.1)*(.72+.28*visibility)}) brightness(${((r.shade??.9)+heat*.45)*(.57+.43*visibility)}) contrast(${.8+(.22+heat*.12)*visibility})`;}
  function emitRock(near,vent){if(rocks.length>=128)return;rocks.push({ground:R(.79,.94),breakAt:Math.random()<.32?R(1.3,3.5):Infinity,fragment:false,drag:R(.015,.05),cooling:R(.025,.065),haze:R(.065,.105),heat:Math.random()<.4?R(.7,1):R(.05,.5),shade:R(.78,1.06),aspect:R(.76,1.26),wobble:R(.02,.07),ox:vent.x,oy:vent.y,near,tail:[],tailClock:0,x:R(-12,12),y:R(-8,5),z:R(6,8),age:0,life:R(5,7.5),vx:near?R(-32,32):R(-170,170),vy:near?R(-95,-45):R(-260,-135),vz:near?R(1.25,1.7):R(.35,.9),gravity:near?R(36,60):R(75,105),size:near?R(8,15):R(4,10),angle:R(0,TAU),spin:R(-3.8,3.8),roll:R(0,TAU),rollSpeed:R(1.2,3),tile:Math.floor(R(0,6)),smokeClock:0,tailInterval:R(.027,.065),smokeInterval:R(.025,.06)});}
  function updateEruption(dt){
    if(dt<=0)return;
    if(time>=nextPhase){quiet=!quiet;activityTarget=quiet?R(.28,.5):R(.95,1.4);nextPhase=time+(quiet?R(7,13):R(10,18));}
    activity+=(activityTarget-activity)*Math.min(1,dt*.55);
    shockwaves=shockwaves.filter(p=>time-p.born<3);
  }
  function shockForce(x,y){let fx=0,fy=0;for(const wave of shockwaves){if(wave.ground)continue;const age=time-wave.born;if(age<0)continue;const origin=point(wave.x,wave.y),dx=x-origin.x,dy=y-origin.y,d=Math.hypot(dx,dy),radius=age*wave.speed*scale,band=(wave.ground?55:100)*scale;const force=Math.exp(-Math.pow((d-radius)/band,2))*wave.strength*Math.exp(-age*.6);fx+=dx/Math.max(1,d)*force;fy+=dy/Math.max(1,d)*force;}return{x:fx,y:fy};}
  function delayedShake(axis=0){let force=0;for(const wave of shockwaves){const age=time-wave.born-wave.delay;if(age<0)continue;if(wave.ground){const onset=1-Math.exp(-age*65),envelope=onset*Math.exp(-age*wave.damping),motion=Math.sin(age*wave.frequency+(axis?1.1:0))+.25*Math.sin(age*wave.frequency*1.63+wave.phase);force+=motion*envelope*wave.strength*(axis?1:wave.sideForce);}else force+=Math.sin(age*wave.frequency+axis*.7)*Math.exp(-age*3.3)*wave.strength;}return C(force,-1.2,1.2);}
  function erupt(vent){
    const strength=C(activity*R(.7,1.15),.2,1.5);pulse=Math.max(pulse,strength);
    vent.next=time+R(1.8,4)*vent.interval/(Math.max(.4,activity)*1.5);
    if(strength>.72&&shockwaves.length<8)shockwaves.push({x:vent.x,y:vent.y,born:time,strength,speed:R(520,800),delay:R(.45,1.1),frequency:R(27,43)});
    const count=Math.max(3,Math.floor(R(12,23)*strength)),nearCount=Math.floor(count*.21+Math.random()),spreadCount=Math.floor(count*1.16+Math.random());
    for(let i=0;i<nearCount;i++)emitRock(true,vent);for(let i=0;i<spreadCount;i++)emitRock(false,vent);
    for(let i=0;i<Math.ceil(8*strength);i++)emitSmoke(0,vent.smokeIndex);
    for(let i=0;i<Math.ceil(40*strength)&&sparks.length<180;i++)sparks.push({ox:vent.x,oy:vent.y,x:0,y:0,vx:R(-120,120)*strength,vy:R(-310,-90)*Math.sqrt(strength),age:0,life:R(.6,1.8),size:R(.5,1.5)});
  }
  function project(r,mx,my){const zoom=5/Math.max(.42,r.z),o=point(r.ox,r.oy);return{x:o.x+r.x*zoom*scale-mx*zoom*.8,y:o.y+r.y*zoom*scale-my*zoom*.8,zoom};}
  function smokeSprite(x,y,size,angle,alpha){if(!assets.smoke||alpha<=0||x+size<0||x-size>w||y+size<0||y-size>h)return;ctx.save();ctx.globalAlpha=C(alpha);ctx.translate(x,y);ctx.rotate(angle);ctx.drawImage(assets.smoke,-size/2,-size/2,size,size);ctx.restore();}
  function drawSmoke(dt){
    if(dt>0&&time>=nextWind){windTarget=R(-.034,.034);nextWind=time+R(2.5,6);}
    smokeWind+=(windTarget-smokeWind)*Math.min(1,dt*.65);
    smoke=smoke.filter(p=>p.age<p.life);
    for(const p of smoke){
      p.age+=dt;const u=C(p.age/p.life);
      const pressure=shockForce(point(p.originX+p.windOffset,p.originY-p.rise*u).x,point(p.originX,p.originY-p.rise*u).y);
      p.windOffset+=pressure.x*dt*.045;
      p.windOffset+=(smokeWind+Math.sin(time*p.frequency+p.seed)*p.curl*.45)*p.windResponse*(.3+u)*dt;
      const x=p.originX+p.fan*u**1.35+p.windOffset+Math.sin(u*5+p.seed)*p.curl*u;
      const y=p.originY-p.rise*(u*.9+u*u*.1);
      const at=point(x,y),size=(p.size+u**p.growth*p.expansion)*1600*scale;
      const texture=assets.smokeKinds?.[p.kind]?.[p.tone];if(!texture)continue;
      const stretch=p.stretch*(1+Math.sin(p.age*p.frequency+p.seed)*.1*u),alpha=C(p.age*p.fadeIn)*C((1-u)*p.fadeOut)*p.alpha;
      ctx.save();ctx.translate(at.x,at.y-size*.32);ctx.rotate(p.rotation+p.age*p.spin+smokeWind*u*2);ctx.scale(p.flip*stretch,1/stretch);paintSmoke(texture,-size/2,-size/2,size,alpha*(1+p.breathe*Math.sin(p.age*p.frequency+p.seed)),p.warmth*(1-u)**2);ctx.restore();
    }
  }
  function tailVariation(){return{tone:Math.floor(R(0,5)),warmth:R(.15,.6),life:R(.85,2.1),rotation:R(-Math.PI,Math.PI),spin:R(-.6,.6),drift:R(-9,9),response:R(.5,1.6),seed:R(0,100),windV:smokeWind*400,lift:R(2,12),curl:R(4,18),density:R(.2,.43),growth:R(1.1,2.8),stretch:R(.65,1.45),flip:Math.random()<.5?-1:1,fadePower:R(1.1,2.4)};}
  function drawTailPuff(p,age,size,mx,my,strength=1){
    const u=C(age/p.life),at=project(p,mx,my),diameter=Math.min(w*.38,size*at.zoom*scale*(1+u*p.growth));
    const alpha=C(age/.08)*(1-u)**p.fadePower*p.density*strength;
    if(!assets.smoke||alpha<=0)return;
    const stretch=p.stretch*(1+.16*Math.sin(age*1.7+p.seed));
    ctx.save();ctx.translate(at.x,at.y);ctx.rotate(p.rotation+p.spin*age);ctx.scale(p.flip*stretch,1/stretch);ctx.globalAlpha=C(alpha);
    const texture=assets.smokeKinds?.[1]?.[p.tone];if(texture)paintSmoke(texture,-diameter/2,-diameter/2,diameter,alpha,p.warmth*(1-u)**2);ctx.restore();
  }
  function advectTail(p,dt,age){
    const gust=smokeWind*700*p.response+(noise(p.x*.02+time*.32,p.y*.02+p.seed)-.5)*p.curl*2+p.drift;
    p.windV+=(gust-p.windV)*Math.min(1,dt*1.8);
    p.x+=p.windV*dt;
    p.y-=(p.lift+Math.sin(time*.8+p.seed)*p.curl*.18)*dt;
    p.rotation+=p.windV*.0015*dt;
  }
  function releaseRockTail(r){
    for(let j=r.tail.length-1;j>=0;j--){const p=r.tail[j],age=time-p.born;if(age<p.life)detachedTails.push({...p,age,strength:C(r.age*4)*1.2});}
    r.tail=[];
  }
  function drawDetachedTails(dt,mx,my){
    detachedTails=detachedTails.filter(p=>p.age<p.life);
    for(const p of detachedTails){p.age=time-p.born;advectTail(p,dt,p.age);drawTailPuff(p,p.age,p.size,mx,my,p.strength);}
  }
  function drawTrails(dt,mx,my){trails=trails.filter(p=>p.age<p.life);for(const p of trails){p.age+=dt;advectTail(p,dt,p.age);drawTailPuff(p,p.age,p.size,mx,my);}}
  function shatterRock(r){
    const pieces=[],count=Math.floor(R(4,8));
    for(let i=0;i<count;i++){
      const a=i/count*TAU+R(-.35,.35),kick=R(20,65);
      pieces.push({...r,fragment:true,breakAt:Infinity,age:.12,life:R(1.5,3.3),size:r.size*R(.27,.48),x:r.x+Math.cos(a)*r.size*.2,y:r.y+Math.sin(a)*r.size*.2,z:r.z+R(-.08,.08),vx:r.vx+Math.cos(a)*kick,vy:r.vy+Math.sin(a)*kick,vz:Math.max(.15,r.vz+R(-.25,.25)),spin:R(-7,7),rollSpeed:R(2.5,5),tile:Math.floor(R(0,6)),tail:[],tailClock:0,smokeClock:0});
    }
    // Retain the parent's trail so it does not disappear when the body breaks.
    releaseRockTail(r);
    for(let i=0;i<8&&trails.length<550;i++)trails.push({ox:r.ox,oy:r.oy,x:r.x+R(-6,6),y:r.y+R(-6,6),z:r.z,age:0,...tailVariation(),size:r.size*R(1.8,3.8)});
    r.age=r.life;return pieces;
  }
  function retireGroundObjects(items){
    const active=items.filter(p=>!p.retiring);
    for(let i=0;i<active.length-40;i++){const p=active[i];p.retiring=true;p.life=Math.min(p.life,p.age+12);}
  }
  function groundFade(p){const t=C((p.life-p.age)/12);return t*t*(3-2*t);}
  function impactRock(r,x,y,speed,screenSize){
    const energy=C((r.size/12)*Math.sqrt(Math.max(1,speed)/400),.25,1.65);
    const bodySize=screenSize||r.size*scale;
    if(bodySize>22&&shockwaves.length<20)shockwaves.push({x:(x-left)/(1600*scale),y:(y-top)/(900*scale),born:time,strength:C(bodySize/140*energy*C((y/h-.65)/.35),.02,.65),speed:R(220,340),delay:R(.03,.09),frequency:R(25,36),phase:R(0,TAU),damping:R(6.5,9),sideForce:R(.25,.5),ground:true});
    groundMarks.push({x:x/w,y:y/h,size:bodySize*R(1.1,1.55),age:0,life:R(35,55),seed:R(0,TAU)});retireGroundObjects(groundMarks);
    landedRocks.push({x:x/w,y:y/h,ground:y/h,size:bodySize,baseSize:bodySize,depth:3,forward:r.near?R(.65,1):R(.25,.55),tile:r.tile,angle:r.angle,roll:r.roll,aspect:r.aspect||1,heat:r.heat,shade:r.shade,cooling:r.cooling,flightAge:r.age,impactDepth:r.z,haze:r.haze,spin:r.spin*.4,friction:R(.45,.8),seed:R(0,TAU),smokePuffs:[],smokeClock:.26,smokeInterval:R(.18,.26),smokeLife:R(20,32),smokeStrength:R(.65,1.15),smokePhase:R(0,TAU),vx:(Math.abs(r.vx*5/Math.max(.42,r.z)*scale)>25?C(r.vx*5/Math.max(.42,r.z)*scale,-220,220):(Math.sign(r.vx)||Math.sign(r.x)|| (Math.random()<.5?-1:1))*R(30,65))*(r.near?.25:.55)/w,vy:-R(18,40)/h,age:0,life:R(28,45),bounce:0});retireGroundObjects(landedRocks);
    const count=Math.floor(5+energy*5);
    for(let i=0;i<count&&groundChips.length<130;i++){
      const angle=R(-Math.PI*.92,-Math.PI*.08),kick=R(45,160)*energy;
      groundChips.push({x:x/w,y:y/h,ground:y/h,vx:(Math.cos(angle)*kick+r.vx*.12)/w,vy:Math.sin(angle)*kick/h,age:0,life:R(1.1,2.4),size:R(1.5,4.5)*energy,tile:Math.floor(R(0,6)),angle:R(0,TAU),spin:R(-8,8),bounce:0,rebound:R(.18,.35)});
    }
    for(let i=0;i<Math.ceil(4+energy*4)&&impactDust.length<100;i++){
      impactDust.push({x:x/w,y:y/h,ground:y/h,windResponse:R(.35,.8),drag:R(1.1,2),vx:(R(-65,65)*energy+C(r.vx,-90,90)*.22)/w,vy:-R(10,25)*Math.sqrt(energy)/h,age:0,life:R(1.1,2.7),size:R(18,38)*energy,growth:R(28,62)*energy,stretch:R(1.5,2.6),tone:Math.random()<.65?1:2,rotation:R(-.2,.2),alpha:R(.1,.23)});
    }
    releaseRockTail(r);
    r.age=r.life;
  }
  function drawGroundSurface(dt){
    groundMarks=groundMarks.filter(p=>p.age<p.life);
    for(const p of groundMarks){p.age+=dt;const fade=groundFade(p),size=p.size;ctx.save();ctx.translate(p.x*w,p.y*h);ctx.scale(1,.28);const g=ctx.createRadialGradient(0,0,size*.12,0,0,size*1.8);g.addColorStop(0,'rgba(4,3,2,.85)');g.addColorStop(.55,'rgba(16,12,9,.65)');g.addColorStop(1,'rgba(15,11,8,0)');ctx.globalAlpha=fade;ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,size*1.8,size*1.8,0,0,TAU);ctx.fill();ctx.strokeStyle='rgba(70,55,43,.65)';ctx.lineWidth=1.3;ctx.beginPath();for(let j=0;j<13;j++){const a=j/13*TAU,rr=size*(1+.18*Math.sin(j*4.7+p.seed));const x=Math.cos(a)*rr,y=Math.sin(a)*rr;j?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.closePath();ctx.stroke();ctx.restore();}
  }
  function drawResidualGlow(p,size,fade){
    const heat=rockHeat(p,p.age+p.flightAge),lift=Math.max(0,(p.ground-p.y)*h),contact=Math.exp(-lift/Math.max(8,size*.3));
    ctx.save();ctx.translate(0,lift);ctx.scale(1,.2);
    for(let j=0;j<3;j++){const n=noise(p.seed+j*13,p.seed*.3),radius=size*(.65+n*.55),x=(n-.5)*size*1.2,y=(noise(p.seed,j*7)-.5)*size*.35,alpha=heat**1.7*.12*fade*contact;const glow=ctx.createRadialGradient(x,y,0,x,y,radius);glow.addColorStop(0,`rgba(246,${Math.round(62+heat*35)},15,${alpha})`);glow.addColorStop(.45,`rgba(184,43,7,${alpha*.35})`);glow.addColorStop(1,'rgba(130,24,3,0)');ctx.fillStyle=glow;ctx.fillRect(x-radius,y-radius,radius*2,radius*2);}
    ctx.restore();
  }
  function drawGroundImpacts(dt){
    landedRocks=landedRocks.filter(p=>p.age<p.life);
    for(const p of landedRocks){p.age+=dt;const previousDepth=p.depth;p.depth=Math.max(1.35,p.depth-p.forward*dt);const advance=(1/p.depth-1/previousDepth)*.65;p.ground+=advance;p.y+=advance;p.size=p.baseSize*3/p.depth;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=480/h*dt;const resistance=p.friction*(1+.16*Math.sin(p.age*2.1+p.seed));p.vx*=Math.exp(-dt*resistance);p.forward*=Math.exp(-dt*resistance);p.roll+=((Math.hypot(p.vx*w,advance*h/Math.max(.001,dt))/Math.max(8,p.size))*.85+p.spin)*dt;p.spin*=Math.exp(-dt*.8);
      p.smokePuffs=p.smokePuffs.filter(q=>q.age<q.life);p.smokeClock+=dt;const motion=C(Math.abs(p.vx*w)/85),heat=Math.exp(-p.age/45)*p.smokeStrength*(.8+.2*Math.sin(p.age*1.3+p.smokePhase))*groundFade(p);if(dt>0&&p.smokeClock>=p.smokeInterval&&(motion>.04||heat>0)&&p.smokePuffs.length<24){p.smokeClock%=p.smokeInterval;p.smokeInterval=R(.18,.26);const puff={x:p.x+R(-.18,.18)*p.size/w,y:p.y-p.size*R(.85,1.1)/h,vx:(-p.vx*w*R(.1,.25)+R(-12,12))/w,vy:-R(28,48)/h,age:0,life:R(2.4,4.2),size:p.size*R(.55,.85),growth:R(26,52),stretch:R(.9,1.5),tone:Math.random()<.65?1:2,rotation:R(-.3,.3),alpha:R(.32,.48)*Math.max(motion,heat),rising:true};p.smokePuffs.push(puff);groundSmoke.push(puff);}
      if(p.y>=p.ground&&p.vy>0){p.y=p.ground;p.bounce++;p.vy=p.bounce<2?-p.vy*.2:0;}const frames=assets.meshes?.[p.tile];if(!frames)continue;const size=p.size,fade=groundFade(p);ctx.save();ctx.translate(p.x*w,p.y*h);drawResidualGlow(p,size,fade);ctx.globalAlpha=fade*.7;ctx.fillStyle='#050403';ctx.beginPath();ctx.ellipse(size*.12,0,size*1.05,size*.22,0,0,TAU);ctx.fill();ctx.translate(0,-size*.65);ctx.scale(p.aspect,1/p.aspect);ctx.globalAlpha=fade*(.85+.15*rockVisibility(p));ctx.filter=rockMaterial(p,p.age+p.flightAge);const index=Math.floor((((p.roll+p.angle*.25)/TAU)%1+1)%1*frames.length);ctx.drawImage(frames[index],-size,-size,size*2,size*2);ctx.restore();}

    groundChips=groundChips.filter(p=>p.age<p.life);
    for(const p of groundChips){
      p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=480/h*dt;p.vx*=Math.exp(-dt*1.3);p.angle+=p.spin*dt;
      if(p.y>=p.ground&&p.vy>0){p.y=p.ground;p.bounce++;p.vy=p.bounce<3?-p.vy*p.rebound:0;p.vx*=.55;p.spin*=.45;}
      const frames=assets.meshes?.[p.tile];if(!frames)continue;
      const size=p.size*Math.min(1.5,scale),alpha=C((p.life-p.age)/.6);
      ctx.save();ctx.translate(p.x*w,p.y*h-size*.5);ctx.rotate(p.angle);ctx.globalAlpha=alpha;ctx.drawImage(frames[Math.floor(p.age*18)%frames.length],-size,-size,size*2,size*2);ctx.restore();
    }
    impactDust=impactDust.filter(p=>p.age<p.life);
    groundSmoke=groundSmoke.filter(p=>p.age<p.life);
    for(const p of [...impactDust,...groundSmoke]){p.age+=dt;p.vx+=(smokeWind*600/w*(p.windResponse??1)-p.vx)*Math.min(1,dt*(p.drag??.5));p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.rising)p.vy+=(-32/h-p.vy)*Math.min(1,dt*.5);else{p.vy+=18/h*dt;if(p.y>=p.ground){p.y=p.ground;p.vy=0;}}const u=C(p.age/p.life),size=(p.size+p.growth*(1-Math.exp(-u*2)))*Math.min(1.5,scale),texture=assets.smokeKinds?.[p.rising?1:2]?.[p.tone];if(!texture)continue;ctx.save();ctx.translate(p.x*w,p.y*h-size*.12);ctx.rotate(p.rotation);ctx.scale(p.stretch,p.rising?1:.55);paintSmoke(texture,-size/2,-size/2,size,p.alpha*C(p.age*15)*(1-u)**1.4,0);ctx.restore();}
  }
  function drawRocks(dt,mx,my){rocks=rocks.filter(r=>r.age<r.life&&r.z>.45).sort((a,b)=>b.z-a.z);const atlas=assets.rocks,pending=[];
    for(const r of rocks){const old={x:r.x,y:r.y,z:r.z,ox:r.ox,oy:r.oy};r.age+=dt;r.x+=r.vx*dt;r.y+=r.vy*dt;r.vy+=r.gravity*dt;r.z-=r.vz*dt;r.vx*=Math.exp(-r.drag*dt);r.angle+=r.spin*dt;r.roll+=r.rollSpeed*(1+r.wobble*Math.sin(r.age*1.7+r.tile))*dt;r.smokeClock+=dt;
      if(dt>0&&(r.near||r.fragment)&&r.vy>0){
        const before=project(old,mx,my),after=project(r,mx,my),radius=r.size*after.zoom*scale*.65,ground=r.ground*h;
        if(before.y+r.size*before.zoom*scale*.65<ground&&after.y+radius>=ground){
          const fraction=C((ground-before.y-r.size*before.zoom*scale*.65)/Math.max(.001,after.y+radius-before.y-r.size*before.zoom*scale*.65));
          const x=before.x+(after.x-before.x)*fraction;
          if(x>0&&x<w){impactRock(r,x,ground,Math.max(1,(after.y-before.y)/dt),Math.min(Math.min(w,h)*.35,r.size*(before.zoom+(after.zoom-before.zoom)*fraction)*scale*(r.near?1+Math.max(0,2-r.z)*.22:1)));continue;}
        }
      }
      if(dt>0&&!r.fragment&&r.age>=r.breakAt&&r.z>1){const hit=project(r,mx,my);if(hit.x>0&&hit.x<w&&hit.y>0&&hit.y<h&&rocks.length+pending.length<152){pending.push(...shatterRock(r));continue;}}
      if(r.near&&dt>0){r.tailClock+=dt;if(r.tailClock>=r.tailInterval){r.tail.unshift({ox:r.ox,oy:r.oy,x:old.x,y:old.y,z:old.z,born:time,...tailVariation(),size:r.size*R(2.5,3.7)});r.tailClock%=r.tailInterval;r.tailInterval=R(.027,.065);}r.tail=r.tail.filter(p=>time-p.born<p.life).slice(0,48);}

      if(!r.near&&r.smokeClock>=r.smokeInterval&&dt>0){const count=Math.min(3,Math.max(1,Math.ceil(Math.hypot(r.x-old.x,r.y-old.y)/5)));for(let j=0;j<count&&trails.length<550;j++){const u=(j+1)/count;trails.push({ox:r.ox,oy:r.oy,x:old.x+(r.x-old.x)*u,y:old.y+(r.y-old.y)*u,z:old.z+(r.z-old.z)*u,age:0,...tailVariation(),size:r.size*R(1.7,3.2)});}r.smokeClock%=r.smokeInterval;r.smokeInterval=R(.025,.06);}
      if(r.near){for(let j=r.tail.length-1;j>=0;j--){const p=r.tail[j],age=time-p.born;advectTail(p,dt,age);drawTailPuff(p,age,p.size,mx,my,C(r.age*4)*1.2);}}
      const at=project(r,mx,my),size=Math.min(Math.min(w,h)*.35,r.size*at.zoom*scale*(r.near?1+Math.max(0,2-r.z)*.22:1));if(!atlas||at.x<-size*2||at.x>w+size*2||at.y<-size*2||at.y>h+size*2)continue;
      const frames=assets.meshes[r.tile],step=(((r.roll+r.angle*.25)/TAU)%1+1)%1*frames.length,index=Math.floor(step);ctx.save();ctx.translate(at.x,at.y);ctx.scale(r.aspect,1/r.aspect);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.filter=rockMaterial(r,r.age);ctx.globalAlpha=C(r.age*5)*C((r.life-r.age)*2)*C((r.z-.45)/.13)*(.85+.15*rockVisibility(r));ctx.drawImage(frames[index],-size,-size,size*2,size*2);ctx.restore();
    }
    rocks.push(...pending);
  }
  function drawAsh(dt,mx){const wind=Math.sin(time*.31)*23+Math.sin(time*.77)*12;for(let i=0;i<ash.length;i++){const a=ash[i],eddy=(noise(a.x*.003+time*.13,a.y*.004+a.seed)-.5)*105;const pressure=shockForce(a.x,a.y);a.vx+=pressure.x*140*dt;a.y+=pressure.y*38*dt;
      if(a.y>h*.65){for(const wave of shockwaves){if(!wave.ground)continue;const age=time-wave.born;if(age<0||age>1.4)continue;const o=point(wave.x,wave.y),dx=a.x-o.x,dy=(a.y-o.y)*3.5,d=Math.hypot(dx,dy),band=45*scale;const kick=Math.exp(-Math.pow((d-age*wave.speed*scale)/band,2))*wave.strength*Math.exp(-age*2);const proximity=Math.exp(-Math.abs(a.y-o.y)/Math.max(20,65*scale));a.vx+=(dx/Math.max(1,d)*180+smokeWind*90)*kick*proximity*dt;a.y-=38*kick*proximity*dt;}}

      a.vx+=(wind+eddy+mx*1.5-a.vx)*Math.min(1,dt*1.7);a.x+=a.vx*a.depth*dt;a.y+=(a.fall+Math.sin(time*1.2+a.seed)*14)*a.depth*dt;a.phase+=a.tumble*dt;if(a.y>h+30){ash[i]=makeAsh();continue;}if(a.x<-60)a.x=w+50;if(a.x>w+60)a.x=-50;let x=a.x,y=a.y;if(pointer.active){const dx=x-pointer.x,dy=y-pointer.y,d=Math.hypot(dx,dy);if(d<100){const push=(1-d/100)*18*a.depth;x+=dx/Math.max(1,d)*push;y+=dy/Math.max(1,d)*push;}}const size=a.size*a.depth;ctx.save();ctx.translate(x,y);ctx.rotate(a.phase);ctx.scale(1,.25+.65*Math.abs(Math.sin(a.phase)));ctx.fillStyle=`rgba(${a.shade},${a.shade-2},${a.shade-4},${a.alpha})`;ctx.beginPath();a.shape.forEach((v,j)=>{const angle=j/5*TAU,px=Math.cos(angle)*size*v,py=Math.sin(angle)*size*v;j?ctx.lineTo(px,py):ctx.moveTo(px,py);});ctx.closePath();ctx.fill();ctx.restore();}}
  function drawSparks(dt){sparks=sparks.filter(p=>p.age<p.life);ctx.save();ctx.globalCompositeOperation='lighter';for(const p of sparks){const o=point(p.ox,p.oy);p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=160*dt;ctx.strokeStyle=`rgba(255,135,42,${C(1-p.age/p.life)*.65})`;ctx.lineWidth=p.size;ctx.beginPath();ctx.moveTo(o.x+p.x*scale,o.y+p.y*scale);ctx.lineTo(o.x+(p.x-p.vx*.018)*scale,o.y+(p.y-p.vy*.018)*scale);ctx.stroke();}ctx.restore();}
  // Refract the photograph only inside soft-edged thermal plumes.
  const heatZones=[{x:.497,y:.345,rx:.105,ry:.135,seed:R(0,100),rate:R(.7,1.05)},{x:.61,y:.555,rx:.18,ry:.09,seed:R(0,100),rate:R(.5,.85)},{x:.33,y:.505,rx:.13,ry:.075,seed:R(0,100),rate:R(.55,.95)}].map(zone=>{
    const surface=document.createElement('canvas');surface.width=320;surface.height=160;
    const mask=document.createElement('canvas');mask.width=320;mask.height=160;const m=mask.getContext('2d');m.save();m.scale(160,80);const fade=m.createRadialGradient(1,1,.05,1,1,1);fade.addColorStop(0,'rgba(255,255,255,.86)');fade.addColorStop(.4,'rgba(255,255,255,.7)');fade.addColorStop(1,'rgba(255,255,255,0)');m.fillStyle=fade;m.fillRect(0,0,2,2);m.restore();return{...zone,surface,mask,ctx:surface.getContext('2d')};
  });
  function drawHeatHaze(){
    const image=assets.background;if(!image||reduced.matches)return;
    const iw=image.naturalWidth,ih=image.naturalHeight;
    for(const z of heatZones){
      const c=z.ctx,sw=z.rx*2*iw,sh=z.ry*2*ih,sx=(z.x-z.rx)*iw,sy=(z.y-z.ry)*ih;
      const strength=(.65+activity*.6+pulse*.85)*z.rate;
      c.clearRect(0,0,320,160);c.globalCompositeOperation='source-over';
      for(let row=0;row<160;row+=2){
        const y=row/160,phase=time*z.rate;
        const turbulence=(noise(z.seed+y*5,phase*.65)-.5)*2;
        const bend=Math.sin(y*18-phase*2.8+z.seed)*.65+turbulence;
        const dx=(bend+smokeWind*12)*strength*1.9,dy=Math.sin(y*12-phase*2+z.seed)*strength*.65;
        c.drawImage(image,C(sx+dx,0,iw-sw),C(sy+y*sh+dy,0,ih-sh/80),sw,sh/80,0,row,320,2);
      }
      c.globalCompositeOperation='destination-in';c.drawImage(z.mask,0,0);c.globalCompositeOperation='source-over';
      const at=point(z.x-z.rx,z.y-z.ry);ctx.drawImage(z.surface,at.x,at.y,z.rx*3200*scale,z.ry*1800*scale);
    }
  }
  function frame(now){raf=null;const dt=reduced.matches?0:Math.min(.035,Math.max(0,(now-last)/1000));last=now;time+=dt;updateEruption(dt);if(dt>0){for(const vent of rockVents)if(time>=vent.next)erupt(vent);for(let v=0;v<smokeVents.length;v++){const vent=smokeVents[v];vent.clock+=dt;while(vent.clock>=vent.interval){vent.clock-=vent.interval;emitSmoke(0,v);vent.interval=R(.16,.31)/Math.max(.65,activity);}}}pulse*=Math.exp(-dt*2.7);const mx=pointer.active?(pointer.x/w-.5)*7:0,my=pointer.active?(pointer.y/h-.5)*5:0,sx=mx+delayedShake(0)*1.8,sy=my+delayedShake(1)*1.8;
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.save();ctx.translate(sx,sy);if(assets.background)ctx.drawImage(assets.background,left,top,1600*scale,900*scale);drawHeatHaze();drawSmoke(dt);const o=point(.497,.378),glow=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,Math.max(1,w*.2));glow.addColorStop(0,`rgba(255,88,15,${.035+pulse*.14})`);glow.addColorStop(1,'rgba(255,75,10,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);drawSparks(dt);drawTrails(dt,mx,my);drawGroundSurface(dt);drawRocks(dt,mx,my);drawDetachedTails(dt,mx,my);drawGroundImpacts(dt);ctx.restore();drawAsh(dt,mx);if(!reduced.matches&&!document.hidden)raf=requestAnimationFrame(frame);
  }
  function restart(){if(raf!==null)cancelAnimationFrame(raf);raf=null;last=performance.now();if(ready&&!document.hidden)frame(last);}
  function resize(){const b=scene.getBoundingClientRect();w=Math.max(1,b.width);h=Math.max(1,b.height);dpr=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);scale=Math.max(w/1600,h/900)*1.055;left=(w-1600*scale)/2;top=(h-900*scale)/2;ash=Array.from({length:Math.min(1350,Math.max(450,Math.floor(w*h/1800)))},()=>makeAsh(true));restart();}
  function load(name,url){return new Promise(resolve=>{const image=new Image();image.onload=()=>{assets[name]=image;resolve();};image.onerror=()=>{console.warn('Volcano asset unavailable:',url);resolve();};image.src=url;});}
  scene.addEventListener('pointermove',e=>{const b=scene.getBoundingClientRect();pointer.x=e.clientX-b.left;pointer.y=e.clientY-b.top;pointer.active=true;});for(const event of ['pointerleave','pointercancel'])scene.addEventListener(event,()=>pointer.active=false);scene.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')pointer.active=false;});document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);
  Promise.all([load('background','./owmoosa-volcano-background.png'),load('rocks','./owmoosa-volcano-rocks.png'),load('smoke','./owmoosa-volcano-smoke.png')]).then(async()=>{prepareSmokeKinds();if(assets.rocks)assets.meshes=await window.buildVolcanicRockFrames(assets.rocks);for(let i=0;i<80;i++)emitSmoke(R(.2,6),i%3);ready=true;new ResizeObserver(resize).observe(scene);resize();});
})();
