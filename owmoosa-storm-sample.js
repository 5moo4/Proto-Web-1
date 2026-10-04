(() => {
  const frame=document.querySelector('#frame'),canvas=document.querySelector('#galaxy-stars');
  if(!frame||!canvas)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const rand=(a,b)=>a+Math.random()*(b-a);
  let w=0,h=0,rain=[],clouds=[],bolts=[],spray=[],nextStrike=0,last=0,raf=null,wind=0,gustUntil=0,nextGust=0,gustTarget=0,squall=1,squallTarget=1,nextSquall=0,mist=[],ripples=[];
  const mouse={x:0,y:0,active:false,vx:0,vy:0,spawn:0};
  // Cached multi-scale density fields keep cloud edges irregular without frame-by-frame noise.
  const cloudTextures=Array.from({length:6},()=>{
    const texture=document.createElement('canvas');texture.width=384;texture.height=192;
    const c=texture.getContext('2d'),pixels=c.createImageData(384,192),field=Array.from({length:4096},()=>Math.random());
    const noise=(x,y)=>{const ix=Math.floor(x),iy=Math.floor(y);let u=x-ix,v=y-iy;u=u*u*(3-2*u);v=v*v*(3-2*v);const at=(a,b)=>field[(a&63)+(b&63)*64];return(at(ix,iy)*(1-u)+at(ix+1,iy)*u)*(1-v)+(at(ix,iy+1)*(1-u)+at(ix+1,iy+1)*u)*v;};
    for(let y=0;y<192;y++)for(let x=0;x<384;x++){let n=0,weight=.55,freq=.016;for(let k=0;k<5;k++){n+=noise(x*freq,y*freq)*weight;freq*=2.07;weight*=.48;}const nx=(x-192)/192,ny=(y-96)/96,envelope=Math.max(0,1-nx*nx-ny*ny),density=Math.max(0,(n-.19)*1.75),shade=25+n*44-y*.06,i=(y*384+x)*4;pixels.data[i]=shade;pixels.data[i+1]=shade+4;pixels.data[i+2]=shade+8;pixels.data[i+3]=Math.min(220,255*density*Math.pow(envelope,.8));}
    c.putImageData(pixels,0,0);return texture;
  });
  function cloud(){return{x:rand(-.4,1.4),y:rand(-.07,.18),width:rand(.35,.7),height:rand(.16,.32),speed:rand(.006,.017),response:rand(.35,1),phase:rand(0,Math.PI*2),rate:rand(.035,.08),alpha:rand(.55,.85),texture:Math.floor(rand(0,6)),flip:Math.random()<.5?-1:1};}
  function drawClouds(t,dt){for(const c of clouds){if(!reduced.matches)c.x+=(c.speed+wind*.000055*c.response)*dt;const width=c.width*w,height=c.height*h;if(c.x>1+c.width)c.x=-c.width;if(c.x<-c.width)c.x=1+c.width;const breathe=Math.sin(t*c.rate+c.phase),blend=(1+Math.sin(t*c.rate*.7+c.phase))*.5;ctx.save();ctx.translate(c.x*w,c.y*h+height*.5+breathe*height*.04);ctx.rotate(Math.sin(t*c.rate*.3+c.phase)*.018);ctx.scale(c.flip,1);ctx.globalAlpha=c.alpha*(.96+.04*breathe)*(1-blend*.35);ctx.drawImage(cloudTextures[c.texture],-width/2,-height/2,width,height);ctx.globalAlpha=c.alpha*blend*.35;ctx.drawImage(cloudTextures[(c.texture+1)%6],-width*.52,-height*.48,width*1.04,height);ctx.restore();}}
  const frog={x:-60,y:0,dir:1,state:'rest',clock:0,wait:rand(1,2.5),duration:.6,distance:60,start:-60,hop:0,phase:rand(0,6.28)};
  function drawFrog(dt,light){
    if(!reduced.matches){frog.clock+=dt;if(frog.state==='rest'&&frog.clock>=frog.wait){frog.state='hop';frog.clock=0;frog.start=frog.x;frog.duration=rand(.45,.7);randHeight=rand(20,40);frog.distance=rand(38,75);}if(frog.state==='hop'){const u=Math.min(1,frog.clock/frog.duration);frog.x=frog.start+frog.dir*frog.distance*(u*u*(3-2*u));frog.hop=Math.sin(Math.PI*u)*randHeight;if(u===1){frog.state='rest';frog.clock=0;frog.wait=rand(.45,2.3);frog.hop=0;if(frog.x>w+70||frog.x<-70){frog.dir=-frog.dir;frog.x=frog.dir>0?-60:w+60;frog.wait=rand(4,9);}}}}
    const y=h-18-frog.hop,u=frog.state==='hop'?Math.min(1,frog.clock/frog.duration):0,extend=Math.sin(Math.PI*u),size=Math.max(.75,Math.min(1.15,w/1200));
    ctx.save();ctx.translate(frog.x,h-15);ctx.scale(size,1);ctx.fillStyle=`rgba(5,12,8,${.28*(1-frog.hop/100)})`;ctx.beginPath();ctx.ellipse(0,0,18,3,0,0,Math.PI*2);ctx.fill();ctx.restore();
    ctx.save();ctx.translate(frog.x,y);ctx.scale(frog.dir*size,size);ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#303d29';ctx.lineWidth=4;
    for(const side of [-1,1]){ctx.beginPath();ctx.moveTo(-6,side*3);ctx.lineTo(-17-extend*7,side*(6+extend*2));ctx.lineTo(-5-extend*24,8+side*2);ctx.stroke();ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(9,2);ctx.lineTo(13+extend*7,9);ctx.lineTo(19+extend*5,9);ctx.stroke();ctx.lineWidth=4;}
    const skin=ctx.createRadialGradient(-3,-7,1,0,-1,17);skin.addColorStop(0,`rgb(${65+Math.round(light*30)},${80+Math.round(light*28)},46)`);skin.addColorStop(1,'#253321');ctx.fillStyle=skin;ctx.beginPath();ctx.ellipse(-2,-2,14,8,-.12,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(10,-5,8,6,.1,0,Math.PI*2);ctx.fill();ctx.fillStyle='#566446';ctx.beginPath();ctx.ellipse(11,-11,3.5,3,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#131a10';ctx.beginPath();ctx.ellipse(12,-11,1.1,2,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#a3af83';ctx.beginPath();ctx.arc(12.5,-11.8,.6,0,Math.PI*2);ctx.fill();ctx.fillStyle='#263721';for(let i=0;i<7;i++){ctx.beginPath();ctx.ellipse(-10+i*2.6,-3+Math.sin(i*2+frog.phase)*3,1.1,.8,0,0,Math.PI*2);ctx.fill();}ctx.restore();
  }
  let randHeight=30;
  function drop(initial=false){const sizeBoost=1+Math.pow(Math.random(),2.4)*1.15;const z=Math.random()<.2?rand(.8,1.3):rand(.12,.85);return{x:rand(-w*.25,w*1.25),y:initial?rand(0,h):rand(-130,-10),z,speed:rand(650,1100)*( .35+z),ground: h-rand(3,Math.min(90,h*.15)),alpha:rand(.12,.26),exposure:rand(.003,.009),width:(rand(.25,.5)+z*.65)*sizeBoost,vx:0,phase:rand(0,6.28),shine:rand(.6,1.7)};}
  function resize(){const b=frame.getBoundingClientRect();w=b.width;h=b.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);rain=Array.from({length:Math.floor(Math.min(3400,Math.max(950,Math.floor(w*h/480)))*2.5)},()=>drop(true));clouds=Array.from({length:18},cloud);spray=[];ripples=[];mist=Array.from({length:7},()=>({x:rand(-.2,1.2),y:rand(.45,1),radius:rand(.12,.3),phase:rand(0,6.28),speed:rand(.008,.024),alpha:rand(.025,.075)}));restart();}
  function fracture(a,b,rough,depth){if(!depth)return[a,b];const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy)||1,offset=rand(-rough,rough),u=rand(.4,.6);const mid={x:a.x+dx*u-dy/length*offset,y:a.y+dy*u+dx/length*offset};return fracture(a,mid,rough*.53,depth-1).slice(0,-1).concat(fracture(mid,b,rough*.53,depth-1));}
  function strike(time,echo=false){if(bolts.length>=32){if(!echo)nextStrike=time+240/.7;return;}const start={x:rand(w*.08,w*.92),y:rand(-50,30)},end={x:start.x+rand(-w*.24,w*.24),y:Math.random()<.12?rand(h*.25,h*.5):rand(h*.65,h*.98)};const points=fracture(start,end,rand(30,80),7),branches=[];
    for(let i=8;i<points.length-7;i+=3){if(Math.random()<.2){const p=points[i],side=Math.random()<.5?-1:1;branches.push(fracture(p,{x:p.x+side*rand(40,170),y:p.y+rand(35,140)},rand(12,32),5));}}
    const durationScale=rand(1,1.8),widthScale=echo?rand(.85,1.25):rand(1.25,1.9);
    const palette=[[213,225,255],[226,220,255],[235,240,255],[220,231,250],[241,244,255],[207,224,248],[232,223,249],[246,239,229]];
    const tint=palette[Math.floor(rand(0,palette.length))].map(v=>Math.max(0,Math.min(255,v+Math.round(rand(-4,4)))));
    const pulses=[{at:0,power:rand(.75,1),decay:rand(95,150)*durationScale}];let at=0;const pulseCount=Math.floor(rand(1,3));for(let i=0;i<pulseCount;i++){at+=rand(210,390)*durationScale;pulses.push({at,power:rand(.35,.7),decay:rand(70,125)*durationScale});}
    bolts.push({tint,points,branches,born:time,pulses,life:at+rand(850,1200)*durationScale,width:rand(.7,1.8)*widthScale,strength:echo?rand(.4,.65):rand(.65,.9),visible:echo||Math.random()>.15});if(!echo){nextStrike=time+at+rand(1800,3400);if(Math.random()<.5){const companions=Math.floor(rand(1,4));for(let i=0;i<companions;i++)strike(time+rand(70,230)*(i+1),true);}}
  }
  function cursorHit(x0,y0,x1,y1,cx,cy,r){const dx=x1-x0,dy=y1-y0,ox=x0-cx,oy=y0-cy,a=dx*dx+dy*dy;if(a<.00001)return null;const b=2*(ox*dx+oy*dy),c=ox*ox+oy*oy-r*r,disc=b*b-4*a*c;if(c<0||disc<0)return null;const u=(-b-Math.sqrt(disc))/(2*a);return u>=0&&u<=1?{x:x0+dx*u,y:y0+dy*u}:null;}
  function splash(x,y,power){if(spray.length>260)return;for(let i=0;i<Math.floor(rand(2,5));i++)spray.push({x,y,vx:rand(-80,80)*power,vy:rand(-180,-45)*power,life:rand(.4,.85),age:0,size:rand(.4,1.5),alpha:rand(.18,.5)});}
  function groundSplash(d,y){
    if(ripples.length<100)ripples.push({x:d.x,y,age:0,life:rand(.3,.65),radius:rand(10,27)*d.z});
    if(spray.length>320)return;
    const impact=Math.min(1.7,d.speed*squall/1000),count=Math.floor(rand(4,9));
    for(let j=0;j<count;j++){
      const angle=Math.PI*(j+.5)/count+rand(-.12,.12),speed=rand(65,185)*impact;
      spray.push({x:d.x,y,vx:Math.cos(angle)*speed+d.vx*.15,vy:-Math.sin(angle)*speed,life:rand(.45,.9),age:0,size:rand(.45,1.35)*d.z,alpha:rand(.18,.42),ground:y,bounced:false});
    }
  }
  function line(points,branch=false){
    // Overlapping continuous sections avoid tiny disconnected stroke caps.
    const distances=[0];for(let i=1;i<points.length;i++)distances.push(distances[i-1]+Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y));
    const total=distances.at(-1);if(!total)return;const width=ctx.lineWidth,opacity=ctx.globalAlpha;
    const pathPoint=d=>{let i=1;while(i<distances.length-1&&distances[i]<d)i++;const u=Math.max(0,Math.min(1,(d-distances[i-1])/Math.max(.001,distances[i]-distances[i-1])));return{x:points[i-1].x+(points[i].x-points[i-1].x)*u,y:points[i-1].y+(points[i].y-points[i-1].y)*u};};
    ctx.save();ctx.lineJoin='round';ctx.lineCap='round';
    const sections=12;
    for(let band=0;band<sections;band++){
      const from=total*band/sections,to=Math.min(total,total*(band+1)/sections+Math.min(1,width*.35)),progress=(band+.5)/sections;
      const taper=Math.min(1,(1-progress)/.28),smooth=taper*taper*(3-2*taper),root=branch?Math.min(1,progress/.2):1,join=root*root*(3-2*root);ctx.lineWidth=Math.max(.04,width*smooth*join);ctx.globalAlpha=opacity*smooth*join;
      const start=pathPoint(from),path=[start];for(let i=1;i<points.length;i++)if(distances[i]>from&&distances[i]<to)path.push(points[i]);path.push(pathPoint(to));
      ctx.beginPath();ctx.moveTo(start.x,start.y);
      for(let i=1;i<path.length;i++){const p=path[i],previous=path[i-1],next=path[i+1];if(next){const mx=(p.x+next.x)*.5,my=(p.y+next.y)*.5;ctx.quadraticCurveTo(p.x,p.y,mx,my);}else ctx.lineTo(p.x,p.y);}
      ctx.stroke();
    }
    ctx.restore();
  }
  function draw(time){raf=null;const dt=Math.min(.04,(time-last)/1000||.016);last=time;ctx.clearRect(0,0,w,h);
    if(!frame.classList.contains('is-inside')){
      const t=reduced.matches?0:time*.001;
      if(!reduced.matches&&time>=nextGust){gustTarget=rand(-180,180);gustUntil=time+rand(900,2400);nextGust=gustUntil+rand(1200,4500);}
      if(!reduced.matches&&time>=nextSquall){squallTarget=rand(.8,1.45);nextSquall=time+rand(2400,6000);}
      squall+=(squallTarget-squall)*Math.min(1,dt*.7);
      const gust=Math.sin(t*.39)*35+Math.sin(t*1.13)*15+(time<gustUntil?gustTarget:0);
      wind+=(gust-wind)*Math.min(1,dt*1.5);
      drawClouds(t,dt);
      if(!reduced.matches&&time>=nextStrike)strike(time);bolts=bolts.filter(b=>time-b.born<b.life);
      let illumination=0;
      for(const b of bolts){const age=time-b.born;if(age<0)continue;let a=0;for(const p of b.pulses)if(age>=p.at)a+=p.power*(1-Math.exp(-(age-p.at)/14))*Math.exp(-(age-p.at)/p.decay);a=Math.min(1,a*b.strength);const afterglow=Math.min(.2,b.strength*.2*Math.exp(-Math.max(0,age-b.pulses.at(-1).at)/450))*(1-Math.exp(-age/30));illumination=Math.max(illumination,a,afterglow);
        const color=(alpha,white=0)=>`rgba(${b.tint.map(v=>Math.round(v+(255-v)*white)).join(',')},${alpha})`;
        const center=b.points[Math.floor(b.points.length*.35)],glow=ctx.createRadialGradient(center.x,center.y,0,center.x,center.y,Math.max(w,h)*.75);glow.addColorStop(0,color((a+afterglow)*.38,.25));glow.addColorStop(.25,color((a+afterglow)*.2));glow.addColorStop(.6,color((a+afterglow)*.08));glow.addColorStop(1,'rgba(180,200,230,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
        if(b.visible&&a>.005){ctx.save();
          ctx.strokeStyle=color(a*.13);ctx.lineWidth=b.width*11;ctx.shadowColor=color(a*.5);ctx.shadowBlur=22;line(b.points);ctx.shadowBlur=0;ctx.lineJoin='round';ctx.lineCap='round';ctx.strokeStyle=color(a*.2);ctx.lineWidth=b.width*4;line(b.points);ctx.strokeStyle=color(a*.6,.4);ctx.lineWidth=b.width*1.8;line(b.points);ctx.strokeStyle=color(a,.85);ctx.lineWidth=b.width;line(b.points);ctx.lineWidth=b.width*.35;ctx.strokeStyle=color(a*.65,.5);for(const branch of b.branches)line(branch,true);ctx.restore();}
      }

      for(let i=0;i<rain.length;i++){let d=rain[i];const previousY=d.y,previousX=d.x;let target=wind*(.4+d.z)+Math.sin(t*.6+d.phase)*6;
        if(!reduced.matches){
          d.vx+=(target-d.vx)*Math.min(1,dt*5);d.y+=d.speed*Math.sqrt(squall)*dt;d.x+=d.vx*dt;
          if(mouse.active&&d.z>.45){const hit=cursorHit(previousX,previousY,d.x,d.y,mouse.x,mouse.y,17);
            if(hit){splash(hit.x,hit.y,Math.min(1.15,d.speed/1300));const side=hit.x<mouse.x?-1:1;
              if(spray.length<320)spray.push({x:hit.x,y:hit.y,vx:0,vy:0,life:rand(1,1.6),age:0,size:rand(1,2)*d.z,alpha:rand(.25,.45),slide:true,side,angle:Math.atan2(hit.y-mouse.y,hit.x-mouse.x),angular:rand(.7,1.3)});
              rain[i]=d=drop();continue;
            }
          }if(d.z>.72){const ground=d.ground;if(previousY<ground&&d.y>=ground){groundSplash(d,ground);rain[i]=d=drop();}}if(d.y>h+50||d.x<-w*.3||d.x>w*1.3){rain[i]=d=drop();}}
        const len=d.speed*d.exposure*Math.sqrt(squall),slant=d.vx*d.exposure;
        const alpha=Math.min(.55,d.alpha*(.35+d.z)*.65+illumination*d.z*.24);
        // Low contrast shutter streaks, without luminous tips or bloom.
        ctx.strokeStyle=`rgba(148,155,164,${alpha*.6})`;ctx.lineWidth=d.width*.65;
        ctx.beginPath();ctx.moveTo(d.x-slant,d.y-len);ctx.lineTo(d.x,d.y);ctx.stroke();
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
          if(illumination>.08||Math.sin(t*.8+d.phase)>.95){
            ctx.fillStyle=`rgba(215,221,229,${Math.min(.45,alpha*.6+illumination*.2)})`;
            ctx.beginPath();ctx.ellipse(-radius*.35,-tall*.35,radius*.2,tall*.16,0,0,Math.PI*2);ctx.fill();
          }
          ctx.restore();
        }
      }
      spray=spray.filter(p=>p.age<p.life);for(const p of spray){if(!reduced.matches){p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=620*dt;p.vx*=Math.exp(-dt*.8);
        if(p.ground!==undefined&&p.y>=p.ground&&p.vy>0){p.y=p.ground;if(!p.bounced){p.vy*=-rand(.18,.32);p.vx*=.6;p.size*=.7;p.bounced=true;}else p.age=p.life;}
        if(p.slide){if(mouse.active){p.angular+=Math.max(.2,Math.abs(Math.cos(p.angle)))*4*dt;p.angle+=p.side>0?p.angular*dt:-p.angular*dt;p.x=mouse.x+Math.cos(p.angle)*18;p.y=mouse.y+Math.sin(p.angle)*18;
          const bottom=p.side>0?p.angle>=Math.PI*.43:p.angle<=-Math.PI*1.43;
          if(bottom){p.slide=false;p.x=mouse.x+Math.cos(p.angle)*18;p.y=mouse.y+17;p.vx=mouse.vx*.12+rand(-12,12);p.vy=rand(35,65);}
        }else p.slide=false;}}ctx.fillStyle=`rgba(208,226,245,${p.alpha*Math.max(0,1-p.age/p.life)})`;ctx.beginPath();ctx.ellipse(p.x,p.y,p.size*.7,p.size*(p.vy>100?1.5:1),Math.atan2(-p.vx,Math.max(1,p.vy)),0,Math.PI*2);ctx.fill();}
      ripples=ripples.filter(r=>r.age<r.life);for(const r of ripples){if(!reduced.matches)r.age+=dt;const progress=Math.min(1,r.age/r.life),radius=1+r.radius*progress;ctx.strokeStyle=`rgba(170,183,198,${.18*(1-progress)*(1+illumination)})`;ctx.lineWidth=.5;ctx.beginPath();ctx.ellipse(r.x,r.y,radius,radius*.18,0,0,Math.PI*2);ctx.stroke();}
      mouse.vx*=Math.exp(-dt*6);mouse.vy*=Math.exp(-dt*6);
      for(const m of mist){const x=((m.x+t*m.speed+wind*.0003)%1.4-.2)*w,y=(m.y+Math.sin(t*.19+m.phase)*.035)*h,r=m.radius*w;
        const veil=ctx.createRadialGradient(x,y,0,x,y,r);veil.addColorStop(0,`rgba(145,162,180,${m.alpha*squall+illumination*.04})`);veil.addColorStop(1,'rgba(130,145,165,0)');ctx.fillStyle=veil;ctx.fillRect(x-r,y-r,r*2,r*2);}
      const fog=ctx.createLinearGradient(0,h*.65,0,h);fog.addColorStop(0,'rgba(80,95,110,0)');fog.addColorStop(1,`rgba(85,100,120,${.08+illumination*.09})`);ctx.fillStyle=fog;ctx.fillRect(0,h*.65,w,h*.35);
      drawFrog(dt,illumination);
    }
    if(!reduced.matches&&!document.hidden&&!frame.classList.contains('is-inside'))raf=requestAnimationFrame(draw);
  }
  function restart(){if(raf!==null)cancelAnimationFrame(raf);raf=null;last=performance.now();bolts=[];nextGust=last+rand(400,1500);nextSquall=last+rand(500,2000);nextStrike=last+rand(1200,2300);if(!document.hidden)draw(last);}
  frame.addEventListener('pointermove',e=>{const b=frame.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;mouse.vx=mouse.active?Math.max(-900,Math.min(900,(x-mouse.x)*30)):0;mouse.vy=mouse.active?Math.max(-900,Math.min(900,(y-mouse.y)*30)):0;mouse.x=x;mouse.y=y;mouse.active=true;});frame.addEventListener('pointerleave',()=>{mouse.active=false;mouse.vx=mouse.vy=0;});
  frame.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse'){mouse.active=false;mouse.vx=mouse.vy=0;}});
  frame.addEventListener('pointercancel',()=>{mouse.active=false;mouse.vx=mouse.vy=0;});
  new ResizeObserver(resize).observe(frame);new MutationObserver(restart).observe(frame,{attributes:true,attributeFilter:['class']});document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);
})();
