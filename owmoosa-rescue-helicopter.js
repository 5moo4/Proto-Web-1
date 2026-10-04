/* Local, deterministic-in-time flight motion: pilots correct gusts gradually. */
window.createRescueFlights = function(image) {
  const rand=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  let next=1.5, flights=[];
  function spawn(time){
    const direction=Math.random()<.5?1:-1;
    flights.push({born:time,duration:rand(20,32),direction,altitude:rand(.14,.26),size:rand(115,175),seed:rand(0,30),roll:0,drift:0,vy:0,phase:rand(0,6.28)});
    next=time+rand(26,43);
  }
  return {
    draw(ctx,time,dt,w,h,wind,reduced,eruption=0){
      if(!image)return;
      if((time>=next&&!reduced)||(!flights.length&&reduced))spawn(reduced?-10:time);
      flights=flights.filter(f=>time-f.born<f.duration);
      for(const f of flights){
        const u=clamp((time-f.born)/f.duration,0,1),size=f.size*Math.min(1,w/850+.4),x=f.direction>0?-size+(w+2*size)*u:w+size-(w+2*size)*u;
        const gust=wind*230+Math.sin(time*.79+f.seed)*3+Math.sin(time*1.63+f.phase)*1.2+Math.exp(-Math.pow((u-.5)/.18,2))*Math.sin(time*2.7+f.seed)*(2+eruption*5);
        f.vy+=(gust-f.vy)*Math.min(1,dt*1.4);f.drift+=(f.vy-f.drift*.45)*dt;
        const y=h*f.altitude+Math.sin(u*Math.PI*2+f.phase)*h*.025+f.drift;
        const target=clamp(-f.vy*.008+Math.sin(time*.37+f.seed)*.025,-.13,.13);
        f.roll+=(target-f.roll)*Math.min(1,dt*2);
        const fade=Math.min(1,u*10,(1-u)*10);
        // Diffuse searchlight is visible through airborne ash, with a gentle scan.
        const sweep=Math.sin(time*.32+f.seed)*h*.13,beam=ctx.createLinearGradient(x,y,x+sweep,y+h*.5);
        beam.addColorStop(0,`rgba(234,225,192,${fade*.08})`);beam.addColorStop(1,'rgba(234,225,192,0)');
        ctx.fillStyle=beam;ctx.beginPath();ctx.moveTo(x+size*.15*f.direction,y+size*.11);ctx.lineTo(x+sweep-h*.08,y+h*.5);ctx.lineTo(x+sweep+h*.08,y+h*.5);ctx.closePath();ctx.fill();
        ctx.save();ctx.globalAlpha=fade*.9;ctx.translate(x,y);ctx.rotate(f.roll);ctx.scale(f.direction,1);
        const height=size*image.naturalHeight/image.naturalWidth;
        ctx.drawImage(image,-size/2,-height/2,size,height);
        // Rotor blades are drawn independently of the aircraft photograph.
        ctx.save();ctx.translate(size*.125,-size*.157);ctx.scale(1,.14);
        ctx.strokeStyle='rgba(176,180,178,.18)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,size*.39,size*.39,0,0,Math.PI*2);ctx.stroke();
        ctx.rotate(time*91+f.phase);ctx.strokeStyle='rgba(34,37,38,.72)';ctx.lineWidth=2;
        for(let i=0;i<4;i++){const a=i*Math.PI/2;ctx.beginPath();ctx.moveTo(Math.cos(a)*size*.025,Math.sin(a)*size*.025);ctx.lineTo(Math.cos(a)*size*.39,Math.sin(a)*size*.39);ctx.stroke();}ctx.restore();
        ctx.save();ctx.translate(-size*.45,-size*.126);ctx.rotate(-time*137);ctx.strokeStyle='rgba(120,124,122,.75)';ctx.lineWidth=1;for(let i=0;i<3;i++){const a=i*Math.PI*2/3;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*size*.032,Math.sin(a)*size*.032);ctx.stroke();}ctx.restore();
        ctx.fillStyle=Math.sin(time*7+f.seed)>.8?'#ffd8bb':'#a33120';ctx.beginPath();ctx.arc(-size*.28,-size*.02,1.2,0,Math.PI*2);ctx.fill();ctx.restore();
        f.screen={x,y,size};
      }
    },
    downwash(x,y){let force=0;for(const f of flights){if(!f.screen)continue;const p=f.screen,dx=x-p.x,dy=y-p.y;if(dy>0&&dy<p.size*1.5)force+=Math.exp(-dx*dx/(p.size*p.size*.3))*(1-dy/(p.size*1.5))*28;}return force;}
  };
};
