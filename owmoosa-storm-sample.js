(() => {
  const frame=document.querySelector('#frame'),canvas=document.querySelector('#galaxy-stars');
  const ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const rand=(a,b)=>a+Math.random()*(b-a);
  let w=0,h=0,rain=[],clouds=[],bolts=[],spray=[],nextStrike=0,last=0,raf=null,wind=0,gustUntil=0,nextGust=0,gustTarget=0,squall=1,squallTarget=1,nextSquall=0,mist=[],ripples=[];
  const mouse={x:0,y:0,active:false,vx:0,vy:0,spawn:0};
  function drop(initial=false){const z=Math.random()<.2?rand(.8,1.3):rand(.12,.85);return{x:rand(-w*.25,w*1.25),y:initial?rand(0,h):rand(-130,-10),z,speed:rand(650,1100)*( .35+z),alpha:rand(.12,.32),exposure:rand(.008,.022),width:rand(.3,.7)+z*.8,vx:0,phase:rand(0,6.28),shine:rand(.6,1.7)};}
  function resize(){const b=frame.getBoundingClientRect();w=b.width;h=b.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);rain=Array.from({length:Math.min(3400,Math.max(950,Math.floor(w*h/480)))},()=>drop(true));clouds=Array.from({length:22},()=>({x:rand(-.2,1.2),y:rand(-.15,.55),r:rand(.12,.3),speed:rand(.002,.009),phase:rand(0,6.28),shade:rand(8,28)}));spray=[];ripples=[];mist=Array.from({length:7},()=>({x:rand(-.2,1.2),y:rand(.45,1),radius:rand(.12,.3),phase:rand(0,6.28),speed:rand(.008,.024),alpha:rand(.025,.075)}));restart();}
  function fracture(a,b,rough,depth){if(!depth)return[a,b];const mid={x:(a.x+b.x)/2+rand(-rough,rough),y:(a.y+b.y)/2+rand(-rough*.22,rough*.22)};return fracture(a,mid,rough*.53,depth-1).slice(0,-1).concat(fracture(mid,b,rough*.53,depth-1));}
  function strike(time,echo=false){const start={x:rand(w*.08,w*.92),y:rand(-50,30)},end={x:start.x+rand(-w*.2,w*.2),y:Math.random()<.25?rand(h*.12,h*.4):rand(h*.4,h*.95)};const points=fracture(start,end,rand(35,95),6),branches=[];
    for(let i=8;i<points.length-7;i+=3){if(Math.random()<.2){const p=points[i],side=Math.random()<.5?-1:1;branches.push(fracture(p,{x:p.x+side*rand(40,170),y:p.y+rand(35,140)},rand(15,40),4));}}
    const durationScale=rand(1,2.5),widthScale=rand(1,2.2);
    const tint=[[213,225,255],[226,220,255],[235,240,255],[220,231,250]][Math.floor(rand(0,4))];
    const pulses=[{at:0,power:rand(.6,1),decay:rand(28,65)*durationScale}];let at=0;for(let i=0;i<Math.floor(rand(1,4));i++){at+=rand(65,170)*durationScale;pulses.push({at,power:rand(.2,.85),decay:rand(20,60)*durationScale});}
    bolts.push({tint,points,branches,born:time,pulses,life:at+380*durationScale,width:rand(.7,1.8)*widthScale,strength:rand(.4,.85),visible:Math.random()>.25});if(!echo)nextStrike=time+rand(1250,4750)/3;if(!echo&&Math.random()<.25)strike(time+rand(160,450),true);
  }
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
  function line(points){
    // Fade and narrow the terminal discharge along its actual path length.
    const distances=[0];for(let i=1;i<points.length;i++)distances.push(distances[i-1]+Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y));
    const total=distances[distances.length-1];if(!total)return;
    const width=ctx.lineWidth,opacity=ctx.globalAlpha;
    ctx.save();ctx.lineJoin='round';ctx.lineCap='round';
    for(let i=1;i<points.length;i++){
      const start=points[i-1],end=points[i],length=distances[i]-distances[i-1];
      const steps=Math.max(1,Math.ceil(length/7));
      for(let j=0;j<steps;j++){
        const u=j/steps,v=(j+1)/steps,progress=(distances[i-1]+length*(u+v)*.5)/total;
        const fade=Math.max(0,Math.min(1,(1-progress)/.3)),smooth=fade*fade*(3-2*fade);
        ctx.lineWidth=Math.max(.03,width*smooth);ctx.globalAlpha=opacity*smooth;
        ctx.beginPath();ctx.moveTo(start.x+(end.x-start.x)*u,start.y+(end.y-start.y)*u);ctx.lineTo(start.x+(end.x-start.x)*v,start.y+(end.y-start.y)*v);ctx.stroke();
      }
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
      wind+=((gust+(mouse.active?(mouse.x/w-.5)*95:0))-wind)*Math.min(1,dt*1.5);
      for(const c of clouds){const x=((c.x+t*c.speed)%1.4-.2)*w,y=c.y*h+Math.sin(t*.08+c.phase)*16,r=c.r*Math.max(w,h);const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${c.shade},${c.shade+2},${c.shade+5},.65)`);g.addColorStop(.6,'rgba(7,9,13,.3)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}
      if(!reduced.matches&&time>=nextStrike)strike(time);bolts=bolts.filter(b=>time-b.born<b.life);
      let illumination=0;
      for(const b of bolts){const age=time-b.born;if(age<0)continue;let a=0;for(const p of b.pulses)if(age>=p.at)a+=p.power*Math.exp(-(age-p.at)/p.decay);a=Math.min(1,a*b.strength);illumination=Math.max(illumination,a);
        const color=(alpha,white=0)=>`rgba(${b.tint.map(v=>Math.round(v+(255-v)*white)).join(',')},${alpha})`;
        const center=b.points[Math.floor(b.points.length*.35)],glow=ctx.createRadialGradient(center.x,center.y,0,center.x,center.y,Math.max(w,h)*.75);glow.addColorStop(0,color(a*.48,.25));glow.addColorStop(.25,color(a*.25));glow.addColorStop(.6,color(a*.1));glow.addColorStop(1,'rgba(180,200,230,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
        if(b.visible&&a>.005){ctx.save();
          ctx.strokeStyle=color(a*.13);ctx.lineWidth=b.width*18;ctx.shadowColor=color(a*.5);ctx.shadowBlur=45;line(b.points);ctx.shadowBlur=0;ctx.lineJoin='round';ctx.lineCap='round';ctx.strokeStyle=color(a*.2);ctx.lineWidth=b.width*7;line(b.points);ctx.strokeStyle=color(a*.6,.4);ctx.lineWidth=b.width*2.8;line(b.points);ctx.strokeStyle=color(a,.85);ctx.lineWidth=b.width;line(b.points);ctx.lineWidth=b.width*.35;ctx.strokeStyle=color(a*.65,.5);for(const branch of b.branches)line(branch);ctx.restore();}
      }
      if(!reduced.matches&&mouse.active){mouse.spawn+=dt;if(mouse.spawn>.045&&Math.hypot(mouse.vx,mouse.vy)>35){splash(mouse.x+rand(-12,12),mouse.y+rand(-12,12),.6);mouse.spawn=0;}}
      for(let i=0;i<rain.length;i++){let d=rain[i];const previousY=d.y;let target=wind*(.4+d.z)+Math.sin(t*.6+d.phase)*6;
        if(!reduced.matches){if(mouse.active){const dx=d.x-mouse.x,dy=d.y-mouse.y,dist=Math.hypot(dx,dy);if(dist<100){target+=dx/Math.max(1,dist)*(1-dist/100)*150+mouse.vx*.06;}}
          d.vx+=(target-d.vx)*Math.min(1,dt*5);d.y+=d.speed*squall*dt;d.x+=d.vx*dt;
          if(mouse.active){
            const radius=17,dx=d.x-mouse.x;
            if(Math.abs(dx)<radius){
              const surface=mouse.y-Math.sqrt(radius*radius-dx*dx);
              if(previousY<=surface&&d.y>=surface){
                splash(d.x,surface,1);
                const side=dx===0?(Math.random()<.5?-1:1):Math.sign(dx);
                if(spray.length<280)spray.push({x:d.x,y:surface,vx:side*rand(20,55),vy:rand(15,40),life:rand(.65,1),age:0,size:rand(1,2.3),alpha:rand(.35,.65),slide:true,side});
                rain[i]=d=drop();
              }
            }
          }if(d.z>.72){const ground=h-Math.min(45,h*.045)*(1.3-d.z);if(previousY<ground&&d.y>=ground){groundSplash(d,ground);rain[i]=d=drop();}}if(d.y>h+50||d.x<-w*.3||d.x>w*1.3){rain[i]=d=drop();}}
        const len=d.speed*d.exposure*squall,slant=d.vx*d.exposure;
        const alpha=Math.min(.55,d.alpha*(.35+d.z)*.65+illumination*d.z*.24);
        // Low contrast shutter streaks, without luminous tips or bloom.
        ctx.strokeStyle=`rgba(148,155,164,${alpha*.6})`;ctx.lineWidth=d.width*.65;
        ctx.beginPath();ctx.moveTo(d.x-slant,d.y-len);ctx.lineTo(d.x,d.y);ctx.stroke();
        if(d.z>.72){
          const radius=d.width*(.65+d.z*.45),tall=radius*(1.05+Math.min(.6,d.speed/1600));
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
        if(p.slide&&mouse.active&&p.y<mouse.y+18&&Math.abs(p.x-mouse.x)<23){
          const dy=Math.max(-17,Math.min(17,p.y-mouse.y));
          p.x=mouse.x+p.side*Math.sqrt(Math.max(0,18*18-dy*dy));
          p.vx=p.side*18;
        }}ctx.fillStyle=`rgba(208,226,245,${p.alpha*Math.max(0,1-p.age/p.life)})`;ctx.beginPath();ctx.ellipse(p.x,p.y,p.size*.7,p.size*(p.vy>100?1.5:1),Math.atan2(-p.vx,Math.max(1,p.vy)),0,Math.PI*2);ctx.fill();}
      ripples=ripples.filter(r=>r.age<r.life);for(const r of ripples){if(!reduced.matches)r.age+=dt;const progress=Math.min(1,r.age/r.life),radius=1+r.radius*progress;ctx.strokeStyle=`rgba(170,183,198,${.18*(1-progress)*(1+illumination)})`;ctx.lineWidth=.5;ctx.beginPath();ctx.ellipse(r.x,r.y,radius,radius*.18,0,0,Math.PI*2);ctx.stroke();}
      mouse.vx*=Math.exp(-dt*6);mouse.vy*=Math.exp(-dt*6);
      for(const m of mist){const x=((m.x+t*m.speed+wind*.0003)%1.4-.2)*w,y=(m.y+Math.sin(t*.19+m.phase)*.035)*h,r=m.radius*w;
        const veil=ctx.createRadialGradient(x,y,0,x,y,r);veil.addColorStop(0,`rgba(145,162,180,${m.alpha*squall+illumination*.04})`);veil.addColorStop(1,'rgba(130,145,165,0)');ctx.fillStyle=veil;ctx.fillRect(x-r,y-r,r*2,r*2);}
      const fog=ctx.createLinearGradient(0,h*.65,0,h);fog.addColorStop(0,'rgba(80,95,110,0)');fog.addColorStop(1,`rgba(85,100,120,${.08+illumination*.09})`);ctx.fillStyle=fog;ctx.fillRect(0,h*.65,w,h*.35);
    }
    if(!reduced.matches&&!document.hidden&&!frame.classList.contains('is-inside'))raf=requestAnimationFrame(draw);
  }
  function restart(){if(raf!==null)cancelAnimationFrame(raf);raf=null;last=performance.now();bolts=[];nextGust=last+rand(400,1500);nextSquall=last+rand(500,2000);nextStrike=last+rand(700,1750)/3;if(!document.hidden)draw(last);}
  frame.addEventListener('pointermove',e=>{const b=frame.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;mouse.vx=mouse.active?Math.max(-900,Math.min(900,(x-mouse.x)*30)):0;mouse.vy=mouse.active?Math.max(-900,Math.min(900,(y-mouse.y)*30)):0;mouse.x=x;mouse.y=y;mouse.active=true;});frame.addEventListener('pointerleave',()=>{mouse.active=false;mouse.vx=mouse.vy=0;});
  frame.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse'){mouse.active=false;mouse.vx=mouse.vy=0;}});
  frame.addEventListener('pointercancel',()=>{mouse.active=false;mouse.vx=mouse.vy=0;});
  new ResizeObserver(resize).observe(frame);new MutationObserver(restart).observe(frame,{attributes:true,attributeFilter:['class']});document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);
})();
