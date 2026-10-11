(() => {
  'use strict';
  const scene = document.querySelector('#gravity');
  const world = document.querySelector('.world');
  const image = document.querySelector('.engine');
  const canvas = document.querySelector('#energy');
  const ctx = canvas.getContext('2d', { alpha: true });
  const trigger = document.querySelector('.core-trigger');
  const back = document.querySelector('.return');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const rand = (a, b) => a + Math.random() * (b - a);
  const tau = Math.PI * 2;
  let w = 0, h = 0, s = 1, ox = 0, oy = 0;
  let time = 0, last = 0, frame = 0, nextPulse = 2, nextArc = 1;
  let vibration = 0, illumination = 0, lastActivation = -10;
  let mx = 0, my = 0, px = 0, py = 0;
  let paused = reduced.matches;
  const pulses = [], arcs = [], sparks = [];
  const dust = Array.from({length: 64}, () => ({
    x: rand(0, 1672), y: rand(0, 941), depth: rand(.15, 1),
    phase: rand(0, tau), speed: rand(2, 8), radius: rand(.5, 2.2)
  }));
  const debris = Array.from({length: 16}, () => ({
    angle: rand(0, tau), radius: rand(132, 220), depth: rand(.4, 1),
    speed: rand(.025, .075), size: rand(1.5, 5), spin: rand(0, tau),
    vertices: Array.from({length: 6}, () => rand(.55, 1))
  }));
  const fog = Array.from({length: 9}, () => ({
    x: rand(300, 1370), y: rand(380, 800), r: rand(120, 260),
    phase: rand(0, tau), speed: rand(.04, .1)
  }));
  function sprite(rgb) {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(' + rgb + ',.8)');
    grad.addColorStop(.15, 'rgba(' + rgb + ',.35)');
    grad.addColorStop(.48, 'rgba(' + rgb + ',.08)');
    grad.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
    return c;
  }
  const cool = sprite('171,221,240'), warm = sprite('255,199,124');
  function glow(x, y, radius, opacity, texture = cool) {
    ctx.globalAlpha = Math.max(0, opacity);
    ctx.drawImage(texture, x - radius, y - radius, radius * 2, radius * 2);
  }
  function pulse(power = 1) {
    if (paused || pulses.length >= 4) return;
    pulses.push({age: 0, power, duration: rand(3.1, 4.3)});
    vibration = Math.max(vibration, power * .9);
    focusKick = Math.max(focusKick, power);
    for (let i = 0; i < 14; i++) {
      const a = rand(0, tau), r = rand(115, 155);
      sparks.push({x: 836 + Math.cos(a)*r, y: 405 + Math.sin(a)*r*.55,
        vx: Math.cos(a)*rand(9, 35), vy: Math.sin(a)*rand(7, 22),
        life: rand(.8, 2), age: 0});
    }
    fracture(power);
  }
  function fracture(power = 1) {
    // Fixed geometry for each event: the cracks do not randomly jump every frame.
    const angle = rand(0, tau), length = rand(24, 55);
    const points = [];
    let x = 836 + Math.cos(angle)*rand(78, 103);
    let y = 405 + Math.sin(angle)*rand(74, 98);
    for (let i = 0; i < 9; i++) {
      points.push([x, y]);
      x += Math.cos(angle + .7)*length/9 + rand(-3, 3);
      y += Math.sin(angle + .7)*length/9 + rand(-3, 3);
    }
    arcs.push({points, age: 0, life: rand(.65, 1.3), power});
    if (arcs.length > 5) arcs.shift();
  }
  function resize() {
    w = world.offsetWidth; h = world.offsetHeight;
    // Native device resolution, with a pixel budget for large monitors.
    const dpr = Math.min(devicePixelRatio || 1, 3, Math.sqrt(14000000/(w*h)));
    canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr);
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    s = Math.max(w/1672, h/941);
    ox = (w - 1672*s)/2; oy = (h - 941*s)/2;
    trigger.style.top = (world.offsetTop + oy + 405*s) + 'px';
    render(0);
  }
  // Keep the photograph stationary. Animate light locally, never rotate its pixels.
  const coreLayer = document.createElement('canvas');
  coreLayer.width = coreLayer.height = 640;
  const coreCtx = coreLayer.getContext('2d');
  let flowPhase = 0, drive = .4, requestedDrive = .4;
  let driveAt = 0, startup = 0, focusKick = 0;
  const currents = Array.from({length: 11}, (_, i) => ({
    phase: rand(0,tau), speed: rand(.25,.55), y: 55+i*11,
    amplitude: rand(4,10), length: rand(38,65)
  }));
  const steam = Array.from({length: 7}, (_, i) => ({
    side: i % 2 ? 1 : -1, phase: rand(0, 1), speed: rand(.035, .06),
    spread: rand(20, 45)
  }));
  function lens() {
    coreCtx.setTransform(1,0,0,1,0,0);
    coreCtx.clearRect(0,0,640,640);
    coreCtx.save();
    coreCtx.scale(640/218,640/218);
    coreCtx.globalCompositeOperation='screen';
    coreCtx.lineCap='round';
    // Independent curved filaments swell and dissolve at different rates.
    // Their brightness, not the core silhouette or baked-in hardware, changes.
    for (const current of currents) {
      const t=time*current.speed+current.phase;
      const x=45+(Math.sin(t*.57)+1)*27;
      const y=current.y+Math.sin(t*.83)*current.amplitude;
      const opacity=(.5+.5*Math.sin(t))*startup*(.10+drive*.09);
      coreCtx.beginPath();
      coreCtx.moveTo(x,y);
      coreCtx.bezierCurveTo(x+18,y-9+Math.sin(t)*5,
        x+current.length*.7,y+12+Math.cos(t*.7)*7,x+current.length,y-5);
      coreCtx.strokeStyle='#94c9de';
      coreCtx.globalAlpha=opacity*.32;coreCtx.lineWidth=9;coreCtx.stroke();
      coreCtx.globalAlpha=opacity*.6;coreCtx.lineWidth=2;coreCtx.stroke();
      coreCtx.globalAlpha=opacity*.5;coreCtx.lineWidth=.65;coreCtx.stroke();
    }
    coreCtx.restore();
    coreCtx.globalCompositeOperation='destination-in';
    const feather=coreCtx.createRadialGradient(320,320,150,320,320,305);
    feather.addColorStop(0,'rgba(0,0,0,1)');
    feather.addColorStop(.6,'rgba(0,0,0,.8)');
    feather.addColorStop(1,'rgba(0,0,0,0)');
    coreCtx.fillStyle=feather;coreCtx.fillRect(0,0,640,640);
    coreCtx.globalCompositeOperation='source-over';
    ctx.save();ctx.globalCompositeOperation='screen';
    ctx.drawImage(coreLayer,727,296,218,218);
    ctx.restore();
  }
  function machinery(dt) {
    if(time>driveAt){
      requestedDrive=rand(.35,.8);
      driveAt=time+rand(5,9);
    }
    drive+=(requestedDrive-drive)*Math.min(1,dt*.7);
    startup=Math.min(1,startup+dt/2.8);
    flowPhase+=dt*(.045+drive*.085)*startup;
    focusKick*=Math.exp(-dt*1.1);
  }
  function operatingLight() {
    // Fixed hardware receives changing reflected light; it does not orbit.
    ctx.save();
    ctx.globalCompositeOperation='screen';
    const mounts = [[625,428],[1047,428],[836,660]];
    mounts.forEach(([x,y],i)=>{
      const load=.07+drive*.035+Math.sin(time*(.62+i*.17)+i*2)*.015;
      glow(x,y,75,(load+illumination*.10)*startup);
    });
    // A continuous axial energy flow, feathered rather than hard-edged laser graphics.
    const flow=(time*(.15+drive*.1))%1;
    for(let i=0;i<3;i++){
      const t=(flow+i/3)%1;
      const y=155+t*510;
      const alpha=Math.sin(t*Math.PI)*(.1+drive*.09);
      ctx.save();ctx.translate(836,y);ctx.scale(.16,1);
      glow(0,0,100,alpha);ctx.restore();
    }
    // Coolant haze expands and dissipates from the two lower mounting points.
    for(const jet of steam){
      const t=(time*jet.speed+jet.phase)%1;
      const fade=Math.sin(t*Math.PI)*.13*(.6+drive);
      const x=836+jet.side*(185+t*jet.spread);
      const y=658-t*110;
      ctx.save();ctx.translate(x,y);ctx.rotate(jet.side*.24);ctx.scale(.7,1.7);
      glow(0,0,22+t*46,fade);ctx.restore();
    }
    // A broad, low-contrast reflection on the walkway responds to generator load.
    ctx.save();ctx.translate(836,775);ctx.scale(.7,.16);
    glow(0,0,300,(.065+illumination*.12)*startup);ctx.restore();
    ctx.restore();
  }
  function render(dt) {
    if (!ctx) return;
    ctx.clearRect(0,0,w,h);
    if (paused) return;
    time += dt;
    machinery(dt);
    if (time > nextPulse) { pulse(rand(.45,.85)); nextPulse = time + rand(6,11); }
    if (time > nextArc) { fracture(rand(.3,.6)); nextArc = time + rand(2.5,5); }
    vibration *= Math.exp(-dt*2.1);
    illumination = pulses.reduce((sum,p) => sum + Math.sin(Math.min(1,p.age/.6)*Math.PI/2)*Math.exp(-p.age*1.3)*p.power,0);
    px += (mx-px)*Math.min(1,dt*3); py += (my-py)*Math.min(1,dt*3);
    const shake = vibration*.5 + drive*.16;
    const sx = Math.sin(time*37)*shake + Math.sin(time*13.7)*.12;
    const sy = Math.sin(time*29.3)*shake*.7;
    world.style.transform = 'translate3d('+(px+sx).toFixed(3)+'px,'+(py+sy).toFixed(3)+'px,0) scale('+(1+focusKick*.0018).toFixed(5)+')';
    ctx.save(); ctx.translate(ox,oy); ctx.scale(s,s);
    lens();
    ctx.globalCompositeOperation = 'screen';
    operatingLight();
    // Low-frequency light breathing and localized bounce on surrounding hardware.
    const breathing = .10 + .025*Math.sin(time*.7) + .018*Math.sin(time*1.13);
    glow(836,405,260,breathing + illumination*.22);
    glow(836,190,170,.06 + illumination*.10);
    glow(836,660,260,.05 + illumination*.16);
    glow(630,430,110,illumination*.1);
    glow(1055,430,110,illumination*.1);
    // Soft volumetric haze, drifting at independent velocities and depths.
    for (const f of fog) {
      const x = f.x + Math.sin(time*f.speed+f.phase)*60;
      const y = f.y + Math.cos(time*f.speed*.6+f.phase)*20;
      ctx.save(); ctx.translate(x,y); ctx.scale(1,.4);
      glow(0,0,f.r,.028 + illumination*.025);
      ctx.restore();
    }
    // Thin curved filaments, with broad faint bloom and a smooth subpixel core.
    for (let i=0;i<5;i++) {
      const a = flowPhase*(2.2+i*.18) + i*1.27;
      const r = 126+i*9;
      ctx.save(); ctx.translate(836,405); ctx.rotate(-.23); ctx.scale(1,.38);
      ctx.beginPath(); ctx.ellipse(0,0,r,r,0,a,a+.45+i*.07);
      ctx.strokeStyle='#bce9ff'; ctx.globalAlpha=.025+illumination*.04;
      ctx.lineWidth=8; ctx.stroke();
      ctx.globalAlpha=.11+illumination*.12; ctx.lineWidth=.65; ctx.stroke();
      ctx.restore();
    }
    for (let i=pulses.length-1;i>=0;i--) {
      const p=pulses[i]; p.age+=dt; const t=p.age/p.duration;
      if(t>=1){pulses.splice(i,1);continue;}
      const r=105+Math.pow(t,.8)*370;
      const alpha=Math.sin(Math.PI*t)*Math.pow(1-t,2)*p.power;
      ctx.save();ctx.translate(836,405);ctx.rotate(-.22);ctx.scale(1,.48);
      const g=ctx.createRadialGradient(0,0,r*.88,0,0,r*1.09);
      g.addColorStop(0,'rgba(161,222,248,0)');
      g.addColorStop(.45,'rgba(161,222,248,'+(alpha*.11)+')');
      g.addColorStop(.6,'rgba(210,240,255,'+(alpha*.23)+')');
      g.addColorStop(1,'rgba(161,222,248,0)');
      ctx.globalAlpha=1;ctx.fillStyle=g;
      ctx.beginPath();ctx.arc(0,0,r*1.09,0,tau);ctx.fill();ctx.restore();
    }
    for(let i=arcs.length-1;i>=0;i--){
      const a=arcs[i];a.age+=dt;
      if(a.age>=a.life){arcs.splice(i,1);continue;}
      const opacity=Math.sin(Math.PI*a.age/a.life)*a.power*.65;
      ctx.beginPath();
      a.points.forEach(([x,y],j)=>j?ctx.lineTo(x,y):ctx.moveTo(x,y));
      ctx.lineJoin='round';ctx.lineCap='round';
      ctx.strokeStyle='#65caff';ctx.globalAlpha=opacity*.1;ctx.lineWidth=7;ctx.stroke();
      ctx.strokeStyle='#d9f2ff';ctx.globalAlpha=opacity*.55;ctx.lineWidth=.65;ctx.stroke();
      const [x,y]=a.points[4];
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-5,y+6);ctx.lineTo(x-7,y+14);
      ctx.globalAlpha=opacity*.24;ctx.lineWidth=.5;ctx.stroke();
      glow(x,y,22,opacity*.13);
    }
    for(let i=sparks.length-1;i>=0;i--){
      const p=sparks[i];p.age+=dt;
      if(p.age>=p.life){sparks.splice(i,1);continue;}
      // Inward acceleration, drag and a little gravity yield curved, decaying trajectories.
      p.vx+=((836-p.x)*.07-p.vx*.25)*dt;
      p.vy+=((405-p.y)*.05+5-p.vy*.2)*dt;
      p.x+=p.vx*dt;p.y+=p.vy*dt;
      const alpha=(1-p.age/p.life)*.5;
      glow(p.x,p.y,4,alpha,warm);
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*.045,p.y-p.vy*.045);
      ctx.strokeStyle='#ffe1ac';ctx.lineWidth=.65;ctx.globalAlpha=alpha;ctx.stroke();
    }
    for(const p of dust){
      const x=(p.x+time*p.speed*.25)%1672;
      const y=(p.y-time*p.speed*.17+941*100)%941+Math.sin(time*.15+p.phase)*6;
      const distance=Math.hypot((x-836)/1.6,y-405);
      const light=Math.max(.015,.18-distance/1700);
      glow(x+px*p.depth,y+py*p.depth,p.radius*(1+p.depth*2),light*p.depth);
    }
    // Irregular matte fragments: shaded facets and a narrow light-facing rim.
    ctx.globalCompositeOperation='source-over';
    for(const d of debris){
      const a=d.angle+time*d.speed;
      const x=836+Math.cos(a)*d.radius;
      const y=405+Math.sin(a)*d.radius*.48-Math.cos(a)*d.radius*.18;
      ctx.save();ctx.translate(x,y);ctx.rotate(d.spin+time*d.speed*.4);
      ctx.globalAlpha=.4+d.depth*.45;
      const g=ctx.createLinearGradient(-d.size,-d.size,d.size,d.size);
      g.addColorStop(0,'#70828b');g.addColorStop(.3,'#26353d');g.addColorStop(1,'#080e13');
      ctx.fillStyle=g;ctx.beginPath();
      d.vertices.forEach((v,j)=>{
        const angle=j*tau/6;const x=Math.cos(angle)*d.size*v,y=Math.sin(angle)*d.size*v;
        j?ctx.lineTo(x,y):ctx.moveTo(x,y);
      });
      ctx.closePath();ctx.fill();ctx.restore();
    }
    ctx.restore();
  }
  function tick(now){
    frame=0;
    render(last?Math.min((now-last)/1000,.05):0);
    last=now;
    if(!paused&&!document.hidden)frame=requestAnimationFrame(tick);
  }
  function sync(){
    cancelAnimationFrame(frame);frame=0;last=0;
    if(paused){
      pulses.length=arcs.length=sparks.length=0;
      vibration=illumination=focusKick=0;px=py=mx=my=0;
      world.style.transform='translate3d(0,0,0)';render(0);
    }else if(!document.hidden)frame=requestAnimationFrame(tick);
  }
  if(new URLSearchParams(location.search).get('from')==='preview')back.href='./owmoosa-entry-reference.html#project4';
  scene.addEventListener('pointermove',e=>{
    if(paused||e.pointerType!=='mouse')return;
    mx=(e.clientX/innerWidth-.5)*-12;my=(e.clientY/innerHeight-.5)*-8;
  });
  scene.addEventListener('pointerleave',()=>{mx=my=0;});
  trigger.addEventListener('click',()=>{
    if(time-lastActivation<1.2)return;
    lastActivation=time;requestedDrive=1;driveAt=time+4;pulse(1.25);nextPulse=time+rand(7,11);
  });
  reduced.addEventListener('change',e=>{paused=e.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  addEventListener('resize',resize);
  image.addEventListener('load',resize);
  addEventListener('keydown',e=>{if(e.key==='Escape')back.click();});
  resize();sync();
})();