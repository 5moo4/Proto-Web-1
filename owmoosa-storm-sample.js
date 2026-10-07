(() => {
  const frame=document.querySelector('#frame'),canvas=document.querySelector('#galaxy-stars');
  if(!frame||!canvas)return;
  const depthAtmosphere=frame.dataset.atmosphere==='depth';
  const ctx=canvas.getContext('2d');if(!ctx)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const rand=(a,b)=>a+Math.random()*(b-a);
  let w=0,h=0,rain=[],clouds=[],bolts=[],spray=[],nextStrike=0,last=0,raf=null,wind=0,gustUntil=0,nextGust=0,gustTarget=0,squall=1,squallTarget=1,nextSquall=0,mist=[],ripples=[],puddles=[],groundTexture=null,gustFronts=[];
  const mouse={x:0,y:0,active:false,vx:0,vy:0,spawn:0};
  const cloudMasks=[];
  // Cached multi-scale density fields keep cloud edges irregular without frame-by-frame noise.
  const cloudTextures=Array.from({length:6},()=>{
    const texture=document.createElement('canvas');texture.width=384;texture.height=192;
    const c=texture.getContext('2d'),pixels=c.createImageData(384,192),field=Array.from({length:4096},()=>Math.random());
    const noise=(x,y)=>{const ix=Math.floor(x),iy=Math.floor(y);let u=x-ix,v=y-iy;u=u*u*(3-2*u);v=v*v*(3-2*v);const at=(a,b)=>field[(a&63)+(b&63)*64];return(at(ix,iy)*(1-u)+at(ix+1,iy)*u)*(1-v)+(at(ix,iy+1)*(1-u)+at(ix+1,iy+1)*u)*v;};
    for(let y=0;y<192;y++)for(let x=0;x<384;x++){let n=0,weight=.55,freq=.016;for(let k=0;k<5;k++){n+=noise(x*freq,y*freq)*weight;freq*=2.07;weight*=.48;}const nx=(x-192)/192,ny=(y-96)/96,envelope=Math.max(0,1-nx*nx-ny*ny),density=Math.max(0,(n-.19)*1.75),shade=25+n*44-y*.06,i=(y*384+x)*4;pixels.data[i]=shade;pixels.data[i+1]=shade+4;pixels.data[i+2]=shade+8;pixels.data[i+3]=Math.min(220,255*density*Math.pow(envelope,.8));}
    cloudMasks.push(pixels.data);c.putImageData(pixels,0,0);return texture;
  });
  // Reuse the cloud silhouettes for illumination instead of whitening the whole sky.
  const litCloudTextures=depthAtmosphere?cloudTextures.map(texture=>{
    const lit=document.createElement('canvas');lit.width=texture.width;lit.height=texture.height;
    const c=lit.getContext('2d');c.drawImage(texture,0,0);c.globalCompositeOperation='source-in';
    c.fillStyle='#c9d9ed';c.fillRect(0,0,lit.width,lit.height);return lit;
  }):[];
  function lightClouds(b,t){
    if(!depthAtmosphere||b.light<.005)return;
    const source=b.cloudOnly?b.cloudCenter:b.points[0],radius=b.lightRadius*1.15;
    ctx.save();ctx.globalCompositeOperation='screen';
    for(const c of clouds){
      const width=c.width*w,height=c.height*h,breathe=Math.sin(t*c.rate+c.phase);
      const x=c.x*w,y=c.y*h+height*.5+breathe*height*.04;
      const proximity=Math.exp(-2*(Math.pow((x-source.x)/radius,2)+Math.pow((y-source.y)/(radius*.65),2)));
      if(proximity<.025)continue;
      const blend=(1+Math.sin(t*c.rate*.7+c.phase))*.5,light=Math.min(.58,b.light*.85)*proximity*c.alpha;
      ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(t*c.rate*.3+c.phase)*.018);ctx.scale(c.flip,1);
      ctx.globalAlpha=light*(.96+.04*breathe)*(1-blend*.35);ctx.drawImage(litCloudTextures[c.texture],-width/2,-height/2,width,height);
      ctx.globalAlpha=light*blend*.35;ctx.drawImage(litCloudTextures[(c.texture+1)%6],-width*.52,-height*.48,width*1.04,height);ctx.restore();
    }
    ctx.restore();
  }
  function cloud(){return{x:rand(-.4,1.4),y:rand(-.07,.18),width:rand(.35,.7),height:rand(.16,.32),speed:rand(.006,.017),response:rand(.35,1),phase:rand(0,Math.PI*2),rate:rand(.035,.08),alpha:rand(.55,.85),texture:Math.floor(rand(0,6)),flip:Math.random()<.5?-1:1};}
  function drawClouds(t,dt){for(const c of clouds){if(!reduced.matches)c.x+=(c.speed+wind*.000055*c.response)*dt;const width=c.width*w,height=c.height*h;if(c.x>1+c.width)c.x=-c.width;if(c.x<-c.width)c.x=1+c.width;const breathe=Math.sin(t*c.rate+c.phase),blend=(1+Math.sin(t*c.rate*.7+c.phase))*.5;ctx.save();ctx.translate(c.x*w,c.y*h+height*.5+breathe*height*.04);ctx.rotate(Math.sin(t*c.rate*.3+c.phase)*.018);ctx.scale(c.flip,1);ctx.globalAlpha=c.alpha*(.96+.04*breathe)*(1-blend*.35);ctx.drawImage(cloudTextures[c.texture],-width/2,-height/2,width,height);ctx.globalAlpha=c.alpha*blend*.35;ctx.drawImage(cloudTextures[(c.texture+1)%6],-width*.52,-height*.48,width*1.04,height);ctx.restore();}}
  function prepareGround(){
    groundTexture=document.createElement('canvas');groundTexture.width=768;groundTexture.height=160;const g=groundTexture.getContext('2d'),im=g.createImageData(768,160);
    for(let y=0;y<160;y++)for(let x=0;x<768;x++){const grain=rand(-7,7),v=17+y*.055+grain,i=(y*768+x)*4;im.data[i]=v;im.data[i+1]=v+4;im.data[i+2]=v+7;const edge=8+5*Math.sin(x*.008)+3*Math.sin(x*.023),blend=Math.max(0,Math.min(1,(y-edge)/125));im.data[i+3]=Math.round(255*blend*blend*(3-2*blend));}g.putImageData(im,0,0);
    if(depthAtmosphere){puddles=Array.from({length:w<600?4:6},()=>createPuddle(true));return;}
    const puddleCount=Math.max(6,Math.min(12,Math.round(w/150)));
    puddles=Array.from({length:puddleCount},(_,i)=>{const x=depthAtmosphere?w*(i+.5+rand(-.12,.12))/puddleCount:rand(-w*.05,w*1.05),y=h*(depthAtmosphere?rand(.875,.945):rand(.89,.98)),rx=depthAtmosphere?w/puddleCount*rand(.3,.42):rand(45,125)*Math.max(.65,w/1600),ry=depthAtmosphere?rand(10,18)*Math.max(.7,h/900):rand(6,17)*Math.max(.65,h/900),phase=rand(0,6.28),points=[];for(let j=0;j<32;j++){const a=j/32*Math.PI*2,r=.86+.22*Math.sin(a*3+phase)+.13*Math.cos(a*5-phase)+.06*Math.sin(a*9+phase);points.push({x:x+Math.cos(a)*rx*r,y:y+Math.sin(a)*ry*r});}const path=new Path2D();points.forEach((p,j)=>j?path.lineTo(p.x,p.y):path.moveTo(p.x,p.y));path.closePath();return{x,y,rx,ry,phase,points,path,reflect:rand(.07,.15)};});
  }
  const smooth=value=>{const x=Math.max(0,Math.min(1,value));return x*x*(3-2*x);};
  function createPuddle(initial=false){
    const grow=rand(8,18),hold=rand(12,32),dry=rand(10,24),delay=initial?0:rand(2,9);
    const p={x:rand(.08,.92)*w,y:rand(.86,.97)*h,baseRx:rand(.055,.12)*w,baseRy:rand(9,22)*Math.max(.65,h/900),phase:rand(0,6.28),reflect:rand(.07,.15),grow,hold,dry,delay,age:initial?rand(0,grow+hold+dry*.7):0,opacity:0,volume:0,wetness:0,edge:rand(.1,.2),spreadX:rand(.42,.7),spreadY:rand(.55,.9),points:[],path:new Path2D()};
    shapePuddle(p);return p;
  }
  function shapePuddle(p){
    const age=p.age-p.delay;
    const fill=age<0?0:age<p.grow?smooth(age/p.grow):age<p.grow+p.hold?1:1-smooth((age-p.grow-p.hold)/p.dry);
    p.volume=Math.max(0,Math.min(1,fill*(1+p.wetness)));
    p.opacity=smooth(p.volume*1.8);
    p.rx=p.baseRx*(.12+.88*Math.pow(p.volume,p.spreadX));
    p.ry=p.baseRy*(.12+.88*Math.pow(p.volume,p.spreadY));
    const edgePhase=p.phase+Math.sin(p.age*.08+p.phase)*.18;
    p.points=Array.from({length:40},(_,j)=>{const a=j/40*Math.PI*2;
      const r=.86+p.edge*Math.sin(a*3+edgePhase)+.1*Math.cos(a*5-p.phase)+.045*Math.sin(a*9+p.phase)+(1-p.volume)*.07*Math.sin(a*4+p.phase);
      return{x:p.x+Math.cos(a)*p.rx*r,y:p.y+Math.sin(a)*p.ry*r};
    });
    p.path=new Path2D();p.points.forEach((q,j)=>j?p.path.lineTo(q.x,q.y):p.path.moveTo(q.x,q.y));p.path.closePath();
  }
  function updatePuddles(dt){
    if(!depthAtmosphere||reduced.matches)return;
    for(let i=0;i<puddles.length;i++){let p=puddles[i];p.age+=dt;p.wetness*=Math.exp(-dt*.25);
      if(p.age>=p.delay+p.grow+p.hold+p.dry){p.opacity=0;puddles[i]=p=createPuddle();}
      shapePuddle(p);
    }
  }
  function cloudPose(c,t){
    const width=c.width*w,height=c.height*h;
    return{x:c.x*w,y:c.y*h+height*.5+Math.sin(t*c.rate+c.phase)*height*.04,width,height,angle:Math.sin(t*c.rate*.3+c.phase)*.018};
  }
  function cloudRainSource(layer){
    if(!clouds.length||Math.random()>(layer===2?.25:layer===1?.88:.96))return null;
    const t=reduced.matches?0:last*.001;
    for(let attempt=0;attempt<8;attempt++){
      const c=clouds[Math.floor(rand(0,clouds.length))],pose=cloudPose(c,t);
      // Slowly shifting rain cells follow their parent cloud and inherit its wind.
      const activity=.6+.4*Math.sin(t*.16+c.phase);
      if(Math.random()>activity)continue;
      const u=rand(-.3,.3)*pose.width,v=rand(.06,.26)*pose.height;
      const x=pose.x+u*Math.cos(pose.angle)-v*Math.sin(pose.angle),y=pose.y+u*Math.sin(pose.angle)+v*Math.cos(pose.angle);
      if(x<0||x>w||y<0||y>h*.5)continue;
      return{x,y,vx:(c.speed+wind*.000055*c.response)*w,fade:rand(18,45)};
    }
    return null;
  }
  function cloudTransmission(d){
    if(!depthAtmosphere||d.layer===2||d.y>h*.55)return 1;
    let transmission=1;
    for(const c of clouds){const pose=c.pose;if(!pose)continue;
      const dx=d.x-pose.x,dy=d.y-pose.y;
      const u=(dx*Math.cos(pose.angle)+dy*Math.sin(pose.angle))*c.flip/pose.width+.5;
      const v=(-dx*Math.sin(pose.angle)+dy*Math.cos(pose.angle))/pose.height+.5;
      if(u<=0||u>=1||v<=0||v>=1)continue;
      const index=(Math.floor(v*192)*384+Math.floor(u*384))*4+3;
      const blend=(1+Math.sin((reduced.matches?0:last*.001)*c.rate*.7+c.phase))*.5;
      const density=(cloudMasks[c.texture][index]*(1-blend*.35)+cloudMasks[(c.texture+1)%6][index]*blend*.35)/255;
      transmission*=1-Math.min(.95,density*c.alpha*(d.layer===0?1.65:1.2));
    }
    return transmission;
  }
  function puddleAt(x,y){return puddles.find(p=>{if(depthAtmosphere&&p.opacity<.08)return false;let inside=false;for(let i=0,j=p.points.length-1;i<p.points.length;j=i++){const a=p.points[i],b=p.points[j];if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)inside=!inside;}return inside;});}
  function drawWetGround(t){
    if(!groundTexture)return;ctx.save();ctx.drawImage(groundTexture,0,h*.69,w,h*.31);
    for(const p of puddles){if(depthAtmosphere&&p.opacity<.005)continue;ctx.save();ctx.globalAlpha=depthAtmosphere?p.opacity:1;ctx.clip(p.path);ctx.save();ctx.translate(p.x,p.y);ctx.scale(p.rx,p.ry);const water=ctx.createRadialGradient(0,0,0,0,0,1.2);water.addColorStop(0,depthAtmosphere?'rgba(88,104,119,.32)':'rgba(66,79,88,.16)');water.addColorStop(.5,depthAtmosphere?'rgba(66,83,100,.2)':'rgba(48,61,72,.09)');water.addColorStop(1,'rgba(36,46,56,0)');ctx.fillStyle=water;ctx.fillRect(-1.3,-1.3,2.6,2.6);ctx.restore();
      if(depthAtmosphere){ctx.strokeStyle='rgba(144,164,183,.13)';ctx.lineWidth=.8;ctx.stroke(p.path);}
      for(const b of bolts){
        if(!b.light)continue;
        if(depthAtmosphere){
          const source=b.cloudOnly?b.cloudCenter:b.points[Math.floor(b.points.length*.7)];
          const reach=Math.max(w*.18,b.lightRadius*.8),distance=(p.x-source.x)/reach;
          const strength=b.light*Math.exp(-2*distance*distance)*(b.cloudOnly?.65:1);
          if(strength>.005){
            ctx.save();ctx.translate(p.x,p.y);ctx.scale(p.rx,p.ry);ctx.globalCompositeOperation='screen';
            const shine=ctx.createRadialGradient(0,0,0,0,0,1.2);
            shine.addColorStop(0,`rgba(${b.tint.join(',')},${strength*.26})`);
            shine.addColorStop(.55,`rgba(${b.tint.join(',')},${strength*.12})`);
            shine.addColorStop(1,`rgba(${b.tint.join(',')},0)`);
            ctx.fillStyle=shine;ctx.fillRect(-1.3,-1.3,2.6,2.6);ctx.restore();
          }
        }
        if(!b.visible)continue;
        ctx.strokeStyle=`rgba(${b.tint.join(',')},${b.light*p.reflect*(depthAtmosphere?2.2:1)})`;ctx.lineWidth=Math.min(3,b.width)*.65;ctx.lineJoin='round';ctx.beginPath();for(let i=0;i<b.points.length;i+=2){const q=b.points[i],x=q.x+Math.sin(t*2.1+i*.37+p.phase)*3+Math.sin(t*.8+p.phase)*wind*.012,y=p.y-p.ry+(1-q.y/h)*p.ry*2; i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();
      }
      ctx.restore();}

    ctx.restore();
  }
  const groundVeils=Array.from({length:9},()=>({x:rand(-.2,1.2),y:rand(.87,.99),width:rand(.14,.3),height:rand(.025,.055),speed:rand(.003,.012),phase:rand(0,6.28),texture:Math.floor(rand(0,6))}));
  const blurredDrop=document.createElement('canvas');blurredDrop.width=blurredDrop.height=32;{const c=blurredDrop.getContext('2d'),g=c.createRadialGradient(16,16,1,16,16,15);g.addColorStop(0,'rgba(175,190,205,.35)');g.addColorStop(.35,'rgba(155,173,193,.22)');g.addColorStop(1,'rgba(155,173,193,0)');c.fillStyle=g;c.fillRect(0,0,32,32);}
  function drawGroundVeils(t,dt,light){ctx.save();for(const p of groundVeils){if(!reduced.matches)p.x+=(wind*.00009+p.speed)*dt;if(p.x>1.35)p.x=-.35;if(p.x<-.35)p.x=1.35;const strength=Math.min(1,Math.abs(wind)/160+squall*.25);ctx.globalAlpha=(.055+strength*.08+light*.045)*( .8+.2*Math.sin(t*.6+p.phase));ctx.drawImage(cloudTextures[p.texture],(p.x-p.width/2)*w,(p.y-p.height/2)*h,p.width*w,p.height*h);}ctx.restore();}
  let audioContext=null,audioEnabled=false,thunderBuffer=null;const thunderVoices=new Set();
  const soundButton=document.createElement('button');soundButton.type='button';soundButton.textContent='천둥 소리 켜기';soundButton.setAttribute('aria-pressed','false');soundButton.style.cssText='position:fixed;right:max(16px,env(safe-area-inset-right));top:max(16px,env(safe-area-inset-top));z-index:6;padding:10px 14px;border:1px solid #ffffff55;border-radius:20px;background:#101820cc;color:#eef3f7;font:12px system-ui;cursor:pointer';frame.appendChild(soundButton);
  function stopThunder(){for(const source of thunderVoices){try{source.stop();}catch{}}thunderVoices.clear();}
  soundButton.addEventListener('click',async()=>{try{if(!audioContext){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio){soundButton.textContent='소리 지원 안 됨';soundButton.disabled=true;return;}audioContext=new Audio();thunderBuffer=audioContext.createBuffer(1,audioContext.sampleRate*5,audioContext.sampleRate);const data=thunderBuffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last+Math.random()*.04-.02)/1.02;data[i]=last*4;}}await audioContext.resume();audioEnabled=!audioEnabled;if(!audioEnabled)stopThunder();soundButton.setAttribute('aria-pressed',String(audioEnabled));soundButton.textContent=audioEnabled?'천둥 소리 끄기':'천둥 소리 켜기';}catch{soundButton.textContent='소리 재시도';}});
  function queueThunder(cloudOnly,x){if(!audioEnabled||!audioContext||document.hidden||thunderVoices.size>=6)return;const distance=cloudOnly?rand(.6,1):rand(.15,.8),start=audioContext.currentTime+.3+distance*3.5,duration=rand(3.4,4.8),source=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter(),gain=audioContext.createGain();source.buffer=thunderBuffer;filter.type='lowpass';filter.frequency.value=140+(1-distance)*650;source.connect(filter);filter.connect(gain);const pan=audioContext.createStereoPanner();pan.pan.value=Math.max(-.8,Math.min(.8,x/w*1.6-.8));gain.connect(pan);pan.connect(audioContext.destination);const level=.12+(1-distance)*.22;gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(level,start+.07+distance*.18);gain.gain.exponentialRampToValueAtTime(.001,start+duration);source.start(start);source.stop(start+duration);thunderVoices.add(source);source.onended=()=>{thunderVoices.delete(source);source.disconnect();filter.disconnect();gain.disconnect();pan.disconnect();};}
  const rainProfiles=[
        {z:[.12,.3],speed:[300,480],alpha:[.12,.18],exposure:[.004,.007],width:[.35,.55]},
        {z:[.45,.85],speed:[650,1050],alpha:[.16,.24],exposure:[.006,.01],width:[.65,1.05]},
        {z:[1.05,1.35],speed:[1350,1850],alpha:[.2,.3],exposure:[.008,.012],width:[1.25,2]}
      ];
  function drop(initial=false,layer){
    if(depthAtmosphere){
      // Preserve each particle's layer on respawn so fast foreground rain stays sparse.
      if(layer===undefined){const depth=Math.random();layer=depth<.65?0:depth<.96?1:2;}
      const p=rainProfiles[layer];
      const source=cloudRainSource(layer),birthY=source?source.y:rand(-130,-10);
      return{layer,x:source?source.x:rand(-w*.25,w*1.25),y:initial?rand(Math.max(0,birthY),h):birthY,birthY,cloudBorn:!!source,emerge:source?source.fade:1,z:rand(...p.z),speed:rand(...p.speed),ground:h-rand(3,Math.min(90,h*.15)),alpha:rand(...p.alpha),exposure:rand(...p.exposure),width:rand(...p.width),vx:source?source.vx:0,phase:rand(0,6.28),shine:rand(.6,1.7)};
    }
    const sizeBoost=1+Math.pow(Math.random(),2.4)*1.15;const z=Math.random()<.2?rand(.8,1.3):rand(.12,.85);return{x:rand(-w*.25,w*1.25),y:initial?rand(0,h):rand(-130,-10),z,speed:rand(650,1100)*( .35+z),ground: h-rand(3,Math.min(90,h*.15)),alpha:rand(.12,.26),exposure:rand(.003,.009),width:(rand(.25,.5)+z*.65)*sizeBoost*1.2,vx:0,phase:rand(0,6.28),shine:rand(.6,1.7)};
  }
  function resize(){const b=frame.getBoundingClientRect();w=b.width;h=b.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);clouds=Array.from({length:18},cloud);rain=Array.from({length:Math.floor(Math.floor(Math.min(3400,Math.max(950,Math.floor(w*h/480)))*2.5)*1.2)},()=>drop(true));spray=[];ripples=[];mist=Array.from({length:7},()=>({x:rand(-.2,1.2),y:rand(.45,1),radius:rand(.12,.3),phase:rand(0,6.28),speed:rand(.008,.024),alpha:rand(.025,.075)}));prepareGround();restart();}
  function fracture(a,b,rough,depth){if(!depth)return[a,b];const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy)||1,offset=rand(-rough,rough),u=rand(.4,.6);const mid={x:a.x+dx*u-dy/length*offset,y:a.y+dy*u+dx/length*offset,z:a.z+(b.z-a.z)*u+rand(-.035,.035)};return fracture(a,mid,rough*.53,depth-1).slice(0,-1).concat(fracture(mid,b,rough*.53,depth-1));}
  function projectBolt(p){const perspective=1/(1+Math.max(-.35,p.z)*.38);return{x:w*.5+(p.x-w*.5)*perspective,y:h*.22+(p.y-h*.22)*perspective,z:p.z,perspective};}
  function strike(time,echo=false){if(bolts.length>=32){if(!echo)nextStrike=time+240/.7;return;}
    const mode=Math.random(),start={x:rand(w*.12,w*.88),y:rand(-30,h*.16),z:rand(.5,1.6)},side=start.x<w*.5?1:-1;
    const end=mode<.5?{x:start.x+rand(-w*.3,w*.3),y:rand(h*.7,h),z:rand(-.2,1.5)}:mode<.85?{x:start.x+side*rand(w*.35,w*.7),y:rand(h*.12,h*.55),z:rand(.1,2)}:{x:start.x+rand(-w*.28,w*.28),y:rand(h*.4,h*.8),z:rand(-.35,-.1)};
    const world=fracture(start,end,rand(30,75),7),points=world.map(projectBolt),branches=[];
    for(let i=12;i<world.length-12;i+=9){if(Math.random()<.5){const p=world[i],direction=Math.random()<.5?-1:1,angle=rand(-.8,1.1),length=rand(60,Math.min(w*.26,280));branches.push(fracture(p,{x:p.x+direction*Math.cos(angle)*length,y:p.y+Math.sin(angle)*length,z:p.z+rand(-.65,.85)},rand(12,28),5).map(projectBolt));}}
    const durationScale=rand(1,1.8),widthScale=echo?rand(.85,1.25):rand(1.25,1.9);
    const palette=[[213,225,255],[226,220,255],[235,240,255],[220,231,250],[241,244,255],[207,224,248],[232,223,249],[246,239,229],[195,218,255],[217,207,250],[224,237,255],[250,231,211],[242,230,252],[228,246,249]];
    const tint=palette[Math.floor(rand(0,palette.length))].map(v=>Math.max(0,Math.min(255,v+Math.round(rand(-7,7)))));
    const pulses=[{at:0,power:rand(.75,1),decay:rand(95,150)*durationScale}];let at=0;const pulseCount=Math.floor(rand(1,3));for(let i=0;i<pulseCount;i++){at+=rand(210,390)*durationScale;pulses.push({at,power:rand(.35,.7),decay:rand(70,125)*durationScale});}
    const cloudOnly=Math.random()<.28,cloudCenter={x:rand(w*.15,w*.85),y:rand(h*.04,h*.24)},lightRadius=rand(.22,.42)*Math.max(w,h);
    if(!echo)queueThunder(cloudOnly,cloudOnly?cloudCenter.x:points[0].x);
    bolts.push({cloudOnly,cloudCenter,lightRadius,cloudPhase:rand(0,6.28),tint,points,branches,born:time,pulses,life:at+rand(850,1200)*durationScale,width:rand(.7,1.8)*widthScale*1.2,strength:echo?rand(.4,.65):rand(.65,.9),visible:!cloudOnly});if(!echo){nextStrike=time+at+rand(1800,3400);if(Math.random()<.5){const companions=Math.floor(rand(1,4));for(let i=0;i<companions;i++)strike(time+rand(70,230)*(i+1),true);}}
  }
  function cursorHit(x0,y0,x1,y1,cx,cy,r){const dx=x1-x0,dy=y1-y0,ox=x0-cx,oy=y0-cy,a=dx*dx+dy*dy;if(a<.00001)return null;const b=2*(ox*dx+oy*dy),c=ox*ox+oy*oy-r*r,disc=b*b-4*a*c;if(c<0||disc<0)return null;const u=(-b-Math.sqrt(disc))/(2*a);return u>=0&&u<=1?{x:x0+dx*u,y:y0+dy*u}:null;}
  function splash(x,y,power){if(spray.length>260)return;for(let i=0;i<Math.floor(rand(2,5));i++)spray.push({x,y,vx:rand(-80,80)*power,vy:rand(-180,-45)*power,life:rand(.4,.85),age:0,size:rand(.4,1.5),alpha:rand(.18,.5)});}
  function groundSplash(d,y){
    const puddle=puddleAt(d.x,y);
    if(depthAtmosphere&&puddle)puddle.wetness=Math.min(.05,puddle.wetness+.002);
    if(puddle&&ripples.length<100)ripples.push({puddle,x:d.x,y,age:0,life:depthAtmosphere?rand(.85,1.4):rand(.45,.95),radius:(depthAtmosphere?rand(18,34):rand(10,27))*d.z});
    if(depthAtmosphere&&!puddle&&Math.random()<.75)return;
    if(spray.length>320)return;
    const impact=Math.min(1.7,d.speed*squall/1000),count=Math.floor(puddle?rand(4,8):rand(2,5));
    for(let j=0;j<count;j++){
      const angle=Math.PI*(j+.5)/count+rand(-.12,.12),speed=(puddle?rand(60,140):rand(25,75))*impact;
      spray.push({x:d.x,y,vx:Math.cos(angle)*speed+d.vx*.15,vy:-Math.sin(angle)*speed,life:rand(.45,.9),age:0,size:rand(.45,1.35)*d.z,alpha:rand(.18,.42),ground:y,bounced:false});
    }
  }
  function boltShape(b,width){
    const shape=new Path2D();
    for(const [index,raw] of [b.points,...b.branches].entries()){
      const points=raw.map((p,i)=>{if(!i||i===raw.length-1)return p;return{...p,x:(raw[i-1].x+2*p.x+raw[i+1].x)/4,y:(raw[i-1].y+2*p.y+raw[i+1].y)/4};});
      const left=[],right=[];
      for(let i=0;i<points.length;i++){const p=points[i],a=points[Math.max(0,i-1)],c=points[Math.min(points.length-1,i+1)],dx=c.x-a.x,dy=c.y-a.y,n=Math.hypot(dx,dy)||1,u=i/(points.length-1),taper=Math.min(1,(1-u)/.22),radius=width*.5*(index?.38:1)*p.perspective*taper;
        left.push({x:p.x-dy/n*radius,y:p.y+dx/n*radius});right.push({x:p.x+dy/n*radius,y:p.y-dx/n*radius});}
      shape.moveTo(left[0].x,left[0].y);for(let i=1;i<left.length;i++)shape.lineTo(left[i].x,left[i].y);for(let i=right.length-1;i>=0;i--)shape.lineTo(right[i].x,right[i].y);shape.closePath();
    }
    return shape;
  }
  function draw(time){raf=null;const dt=Math.min(.04,(time-last)/1000||.016);last=time;ctx.clearRect(0,0,w,h);
    if(!frame.classList.contains('is-inside')){
      const t=reduced.matches?0:time*.001;
      if(!reduced.matches&&time>=nextGust){gustTarget=rand(-180,180);gustUntil=time+rand(900,2400);nextGust=gustUntil+rand(1200,4500);gustFronts.push({born:t,dir:gustTarget>=0?1:-1,duration:rand(3,5.5),width:rand(.15,.3),strength:gustTarget*rand(.8,1.25)});}
      if(!reduced.matches&&time>=nextSquall){squallTarget=rand(.8,1.45);nextSquall=time+rand(2400,6000);}
      gustFronts=gustFronts.filter(g=>t-g.born<g.duration);
      squall+=(squallTarget-squall)*Math.min(1,dt*.7);
      const gust=Math.sin(t*.39)*35+Math.sin(t*1.13)*15+(time<gustUntil?gustTarget:0);
      wind+=(gust-wind)*Math.min(1,dt*1.5);
      drawClouds(t,dt);
      if(depthAtmosphere){for(const c of clouds)c.pose=cloudPose(c,t);updatePuddles(dt);}
      if(!reduced.matches&&time>=nextStrike)strike(time);bolts=bolts.filter(b=>time-b.born<b.life);
      let illumination=0;const rainLights=[];
      for(const b of bolts){const age=time-b.born;if(age<0)continue;let a=0;for(const p of b.pulses)if(age>=p.at)a+=p.power*(1-Math.exp(-(age-p.at)/14))*Math.exp(-(age-p.at)/p.decay);a=Math.min(1,a*b.strength);const afterglow=Math.min(.2,b.strength*.2*Math.exp(-Math.max(0,age-b.pulses.at(-1).at)/450))*(1-Math.exp(-age/30));illumination=Math.max(illumination,a,afterglow);b.light=Math.max(a,afterglow*.5);
        const color=(alpha,white=0)=>`rgba(${b.tint.map(v=>Math.round(v+(255-v)*white)).join(',')},${alpha})`;
        const center=b.cloudOnly?b.cloudCenter:b.points[Math.floor(b.points.length*.35)],radius=b.lightRadius;
        rainLights.push({x:center.x,y:center.y,radius,power:(a+afterglow)*(b.cloudOnly?.7:1)});
        if(b.visible)for(const fraction of [.15,.7]){const q=b.points[Math.floor((b.points.length-1)*fraction)];rainLights.push({x:q.x,y:q.y,radius:radius*.65,power:a*.55});}
        ctx.save();ctx.translate(center.x,center.y);ctx.scale(1,b.cloudOnly?.45:.85);const glow=ctx.createRadialGradient(0,0,0,0,0,radius);glow.addColorStop(0,color((a+afterglow)*(b.cloudOnly?.45:.3),.25));glow.addColorStop(.38,color((a+afterglow)*.13));glow.addColorStop(1,'rgba(180,200,230,0)');ctx.fillStyle=glow;ctx.fillRect(-radius,-radius,radius*2,radius*2);
        if(b.cloudOnly){ctx.globalCompositeOperation='screen';ctx.globalAlpha=Math.min(.32,(a+afterglow)*.4);ctx.drawImage(cloudTextures[Math.floor(b.cloudPhase)%6],-radius*.9,-radius*.6,radius*1.8,radius*1.2);}ctx.restore();
        lightClouds(b,t);
        if(b.visible&&a>.005){
          if(!b.shapes)b.shapes=[6,2.4,1].map(size=>boltShape(b,b.width*size));
          ctx.save();ctx.shadowColor=color(a*.35);ctx.shadowBlur=16;ctx.fillStyle=color(a*.12);ctx.fill(b.shapes[0]);ctx.shadowBlur=0;ctx.fillStyle=color(a*.35,.35);ctx.fill(b.shapes[1]);ctx.fillStyle=color(a,.85);ctx.fill(b.shapes[2]);ctx.restore();
        }
      }

      drawWetGround(t);
      for(let i=0;i<rain.length;i++){let d=rain[i];const previousY=d.y,previousX=d.x;let localWind=0;for(const g of gustFronts){const progress=(t-g.born)/g.duration,center=(g.dir>0?-.3+progress*1.6:1.3-progress*1.6)*w,band=g.width*w;localWind+=Math.exp(-Math.pow((d.x-center)/band,2))*Math.sin(Math.PI*progress)*g.strength;}let target=(wind*.45+localWind)*(.4+d.z)+Math.sin(t*.6+d.phase)*6;
        if(!reduced.matches){
          const emergence=d.cloudBorn?smooth((d.y-d.birthY)/(d.emerge*2)):1;
          d.vx+=(target-d.vx)*Math.min(1,dt*5);d.y+=d.speed*Math.sqrt(squall)*dt*(.45+.55*emergence);d.x+=d.vx*dt;
          if(mouse.active&&d.z>.45){const hit=cursorHit(previousX,previousY,d.x,d.y,mouse.x,mouse.y,17);
            if(hit){splash(hit.x,hit.y,Math.min(1.15,d.speed/1300));const side=hit.x<mouse.x?-1:1;
              const bead=spray.find(p=>p.slide&&Math.hypot(p.x-hit.x,p.y-hit.y)<9);if(bead){bead.size=Math.min(3.8,Math.sqrt(bead.size*bead.size+d.width*.5));bead.hold=Math.max(0,bead.hold-.1);bead.life=Math.max(bead.life,bead.age+.8);}else if(spray.length<320)spray.push({hold:rand(.12,.4),x:hit.x,y:hit.y,vx:0,vy:0,life:rand(1,1.6),age:0,size:rand(1,2)*d.z,alpha:rand(.25,.45),slide:true,side,angle:Math.atan2(hit.y-mouse.y,hit.x-mouse.x),angular:rand(.7,1.3)});
              rain[i]=d=drop(false,d.layer);continue;
            }
          }if(d.z>.72){
            let ground=d.ground;
            if(depthAtmosphere){
              // Intersect the visible water surface before the generic ground plane.
              for(const p of puddles){const surface=p.y+Math.sin(d.phase)*p.ry*.45;
                if(surface<ground&&previousY<surface&&d.y>=surface&&Math.abs(d.x-p.x)<p.rx*1.2&&puddleAt(d.x,surface)===p){ground=surface;}
              }
            }
            if(previousY<ground&&d.y>=ground){groundSplash(d,ground);rain[i]=d=drop(false,d.layer);}
          }if(d.y>h+50||d.x<-w*.3||d.x>w*1.3){rain[i]=d=drop(false,d.layer);}}
        const len=d.speed*d.exposure*Math.sqrt(squall),slant=d.vx*d.exposure;
        let localLight=0;for(const light of rainLights){const dx=(d.x-light.x)/light.radius,dy=(d.y-light.y)/light.radius,falloff=Math.max(0,1-(dx*dx+dy*dy));localLight=Math.max(localLight,light.power*falloff*falloff);}localLight*=.45+.55*Math.min(1,d.z);
        const visibility=cloudTransmission(d)*(d.cloudBorn?smooth((d.y-d.birthY)/d.emerge):1);
        const alpha=Math.min(.62,d.alpha*(.35+d.z)*.65+localLight*d.z*.32)*visibility;
        // Low contrast shutter streaks, without luminous tips or bloom.
        ctx.strokeStyle=`rgba(148,155,164,${alpha*.6})`;ctx.lineWidth=d.width*.65;
        ctx.beginPath();ctx.moveTo(d.x-slant,d.y-len);ctx.lineTo(d.x,d.y);ctx.stroke();
        if(depthAtmosphere&&d.layer===2){
          // A soft outer streak suggests a nearby, slightly out-of-focus drop.
          ctx.save();ctx.strokeStyle=`rgba(155,173,193,${alpha*.12})`;ctx.lineWidth=d.width*1.8;ctx.lineCap='round';
          ctx.beginPath();ctx.moveTo(d.x-slant,d.y-len);ctx.lineTo(d.x,d.y);ctx.stroke();ctx.restore();continue;
        }
        if(d.z>1.1){ctx.save();ctx.globalAlpha=Math.min(.8,.35+localLight*.4);const size=d.width*5;ctx.drawImage(blurredDrop,d.x-size/2,d.y-size/2,size,size);ctx.restore();continue;}
        if(d.z>.72){
          const radius=d.width*(.65+d.z*.45),tall=radius*.85;
          ctx.save();ctx.translate(d.x,d.y);ctx.rotate(-Math.atan2(d.vx,d.speed));
          // Flattened transparent bead with a dark refracted interior and one tiny glint.
          const water=ctx.createRadialGradient(-radius*.25,-tall*.3,0,0,0,tall*1.2);
          water.addColorStop(0,`rgba(160,170,183,${alpha*.4})`);
          water.addColorStop(.45,`rgba(12,18,25,${alpha*.65})`);
          water.addColorStop(1,`rgba(135,148,163,${alpha*.55})`);
          ctx.fillStyle=water;ctx.beginPath();
          ctx.ellipse(0,0,radius,tall,0,0,Math.PI*2);ctx.fill();
          ctx.strokeStyle=`rgba(183,194,205,${alpha*.6})`;ctx.lineWidth=.35;
          ctx.beginPath();ctx.ellipse(0,0,radius,tall,0,Math.PI*.85,Math.PI*1.8);ctx.stroke();
          if(localLight>.08||Math.sin(t*.8+d.phase)>.95){
            ctx.fillStyle=`rgba(215,221,229,${Math.min(.45,alpha*.6+localLight*.25)})`;
            ctx.beginPath();ctx.ellipse(-radius*.35,-tall*.35,radius*.2,tall*.16,0,0,Math.PI*2);ctx.fill();
          }
          ctx.restore();
        }
      }
      spray=spray.filter(p=>p.age<p.life);for(const p of spray){if(!reduced.matches){p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=620*dt;p.vx*=Math.exp(-dt*.8);
        if(p.ground!==undefined&&p.y>=p.ground&&p.vy>0){p.y=p.ground;if(!p.bounced){p.vy*=-rand(.18,.32);p.vx*=.6;p.size*=.7;p.bounced=true;}else p.age=p.life;}
        if(p.slide){if(mouse.active){p.hold=Math.max(0,(p.hold||0)-dt);p.angular+=Math.max(.2,Math.abs(Math.cos(p.angle)))*4*dt;if(p.hold===0||p.size>2.8)p.angle+=p.side>0?p.angular*dt:-p.angular*dt;p.x=mouse.x+Math.cos(p.angle)*18;p.y=mouse.y+Math.sin(p.angle)*18;
          const bottom=p.side>0?p.angle>=Math.PI*.43:p.angle<=-Math.PI*1.43;
          if(bottom){p.slide=false;p.x=mouse.x+Math.cos(p.angle)*18;p.y=mouse.y+17;p.vx=mouse.vx*.12+rand(-12,12);p.vy=rand(35,65);}
        }else p.slide=false;}}ctx.fillStyle=`rgba(208,226,245,${p.alpha*Math.max(0,1-p.age/p.life)})`;ctx.beginPath();ctx.ellipse(p.x,p.y,p.size*.7,p.size*(p.vy>100?1.5:1),Math.atan2(-p.vx,Math.max(1,p.vy)),0,Math.PI*2);ctx.fill();}
      ripples=ripples.filter(r=>r.age<r.life&&(!depthAtmosphere||r.puddle.opacity>.005));for(const r of ripples){if(!reduced.matches)r.age+=dt;const progress=Math.min(1,r.age/r.life),radius=1+r.radius*progress;ctx.save();ctx.globalAlpha=depthAtmosphere?r.puddle.opacity:1;if(r.puddle)ctx.clip(r.puddle.path);ctx.strokeStyle=`rgba(170,183,198,${(depthAtmosphere?.32:.18)*(1-progress)*(1+illumination)})`;ctx.lineWidth=depthAtmosphere?.75:.5;ctx.beginPath();ctx.ellipse(r.x,r.y,radius,radius*(depthAtmosphere?.25:.18),0,0,Math.PI*2);ctx.stroke();
        if(depthAtmosphere&&progress>.18){const inner=1+r.radius*(progress-.18);ctx.strokeStyle=`rgba(170,183,198,${.14*(1-progress)*(1+illumination)})`;ctx.lineWidth=.5;ctx.beginPath();ctx.ellipse(r.x,r.y,inner,inner*.25,0,0,Math.PI*2);ctx.stroke();}
        ctx.restore();}
      mouse.vx*=Math.exp(-dt*6);mouse.vy*=Math.exp(-dt*6);
      for(const m of mist){const x=((m.x+t*m.speed+wind*.0003)%1.4-.2)*w,y=(m.y+Math.sin(t*.19+m.phase)*.035)*h,r=m.radius*w;
        // Keep the middle distance clear; retain a little more haze near the ground.
        const density=depthAtmosphere?.32+.23*Math.max(0,Math.min(1,(m.y-.55)/.45)):1;
        const veil=ctx.createRadialGradient(x,y,0,x,y,r);veil.addColorStop(0,`rgba(145,162,180,${(m.alpha*squall+illumination*.04)*density})`);veil.addColorStop(1,'rgba(130,145,165,0)');ctx.fillStyle=veil;ctx.fillRect(x-r,y-r,r*2,r*2);}
      drawGroundVeils(t,dt,illumination);
      const fog=ctx.createLinearGradient(0,h*.65,0,h);fog.addColorStop(0,'rgba(80,95,110,0)');fog.addColorStop(.48,`rgba(85,100,120,${(.1+illumination*.07)*(depthAtmosphere?.55:1)})`);fog.addColorStop(1,`rgba(85,100,120,${(.065+illumination*.06)*(depthAtmosphere?.2:1)})`);ctx.fillStyle=fog;ctx.fillRect(0,h*.65,w,h*.35);

    }
    if(!reduced.matches&&!document.hidden&&!frame.classList.contains('is-inside'))raf=requestAnimationFrame(draw);
  }
  function restart(){stopThunder();if(raf!==null)cancelAnimationFrame(raf);raf=null;last=performance.now();bolts=[];gustFronts=[];nextGust=last+rand(400,1500);nextSquall=last+rand(500,2000);nextStrike=last+rand(1200,2300);if(!document.hidden)draw(last);}
  frame.addEventListener('pointermove',e=>{const b=frame.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;mouse.vx=mouse.active?Math.max(-900,Math.min(900,(x-mouse.x)*30)):0;mouse.vy=mouse.active?Math.max(-900,Math.min(900,(y-mouse.y)*30)):0;mouse.x=x;mouse.y=y;mouse.active=true;});frame.addEventListener('pointerleave',()=>{mouse.active=false;mouse.vx=mouse.vy=0;});
  frame.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse'){mouse.active=false;mouse.vx=mouse.vy=0;}});
  frame.addEventListener('pointercancel',()=>{mouse.active=false;mouse.vx=mouse.vy=0;});
  new ResizeObserver(resize).observe(frame);new MutationObserver(restart).observe(frame,{attributes:true,attributeFilter:['class']});document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);
})();
