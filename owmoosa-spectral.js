(() => {
  'use strict';
  // Evolving density fields, never a scaled precomposed image.
  const canvas=document.createElement('canvas');
  canvas.className='spectral-screen';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
  const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false,depth:false,preserveDrawingBuffer:true});
  if(!gl)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fragment=`
precision highp float;
uniform vec2 resolution;
uniform float time,seed,mode,still;
float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7))+seed)*43758.5453);}
float noise(vec3 p){
 vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
 mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float fbm(vec3 p){
 float n=0.,a=.54;
 for(int i=0;i<4;i++){n+=noise(p)*a;p=p*2.03+vec3(7.1,3.7,1.3);a*=.48;}return n;
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;
 float aspect=resolution.x/resolution.y;
 vec2 p=(uv-.5)*vec2(aspect,1.);
 float t=mix(time,2.8,still);
 float side=min(uv.x,1.-uv.x);
 float edge=min(side*.85,min(uv.y,1.-uv.y));
 float birth=noise(vec3(uv*5.,seed*.01))*1.7;
 float arrival=mode<.5 ? birth+(1.-uv.y)*.8+side*3.4 : birth+edge*13.;
 float front=smoothstep(arrival,arrival+1.6,t);
 float peripheral=1.-smoothstep(.09,.42,side)*.79;
 float envelope=smoothstep(0.,.9,time)*(1.-smoothstep(6.4,9.,time));
 if(still>.5)envelope=sin(clamp(time/2.,0.,1.)*3.14159265)*.42;
 vec3 sum=vec3(0.);float alpha=0.;
 for(int layer=0;layer<3;layer++){
  float z=float(layer)*2.73;
  vec3 q=vec3(p*vec2(3.4,2.2)+vec2(sin(t*.19+z+seed)*.13,-t*(.065+float(layer)*.022)),z+t*.09);
  vec2 warp=vec2(fbm(q+vec3(0,0,4)),fbm(q+vec3(6,3,0)))-.5;
  vec3 w=q+vec3(warp*2.9,0);
  float n=fbm(w*1.9);
  float detail=noise(w*13.);
  float density=smoothstep(.36,.76,n+detail*.055);
  float filament=pow(max(0.,1.-abs(n-.49)*12.),3.);
  float local=front*(.3+.7*noise(vec3(uv*7.,z+seed)));
  float a;vec3 color;
  if(mode<.5){
   // Silver backscatter and fine curling vapor filaments.
   a=(density*.36+filament*.15)*peripheral*local;
   float light=clamp((fbm(w+vec3(-.09,.11,0))-n)*7.+.48,0.,1.);
   color=mix(vec3(.29,.43,.48),vec3(.88,.95,.96),light);
  }else{
   // Uneven absorption fronts, with subdued light at thin smoke edges.
   a=(.045+density*.29)*peripheral*local;
   float rim=filament*.38*(1.-density);
   color=vec3(.012,.009,.024)+vec3(.32,.25,.46)*rim;
  }
  a*=envelope;
  sum+=color*a*(1.-alpha);alpha+=a*(1.-alpha);
 }
 if(mode<.5 && still<.5){
  vec2 grid=(p+vec2(t*.008,-t*.025))*vec2(87.,65.);
  vec2 cell=floor(grid),f=fract(grid)-.5;
  float h=hash(vec3(cell,5.));
  float dust=(1.-smoothstep(.015,.11,length(f)))*step(.983,h);
  float a=dust*.28*front*peripheral*envelope*(.5+.5*sin(t*.8+h*91.));
  sum+=vec3(.69,.83,.86)*a*(1.-alpha);alpha+=a*(1.-alpha);
 }

 if(mode>.5){
  // Six staggered roots enter from all four edges; local coordinates rotate each path.
  // Width is local to each newly exposed segment, never a scale of a full image.
  for(int tear=0;tear<6;tear++){
   float k=float(tear),sgn=mod(k,2.)<.5?1.:-1.;
   vec2 localUV=uv;
   if(tear==1 || tear==5)localUV=vec2(1.-uv.x,1.-uv.y);
   if(tear==2)localUV=vec2(uv.y,1.-uv.x);
   if(tear==3)localUV=vec2(1.-uv.y,uv.x);
   float crossScale=(tear==2 || tear==3)?1.:aspect;
   float y=localUV.y;
   float birth=.12+k*.29+hash(vec3(k,8.,2.))*.5;
   float travel=3.5+hash(vec3(k,5.,3.))*1.1;
   float extent=.48+hash(vec3(k,4.,8.))*.28;
   float head=clamp((t-birth)/travel,0.,extent);
   float growth=smoothstep(.0,.045,head-y)*(1.-smoothstep(extent-.05,extent,y));
   float base=(tear<4?.12:.69)+hash(vec3(k,1.,7.))*.19;
   float jag=noise(vec3(y*29.,k*7.,seed*.02))-.5;
   float bend=sin(y*12.+seed+k)*.017+jag*.019;
   float center=base+sgn*(sin(y*5.+k)*.025+bend);
   float dx=(localUV.x-center)*crossScale;
   float grain=noise(vec3(uv*vec2(340.,260.),k+seed));
   float thick=(.003+.009*pow(max(0.,sin(y*17.+seed)),2.)+.003*grain)*growth;
   float d=abs(dx);
   float smoke=fbm(vec3(dx*22.+sin(y*9.-t*.6),y*9.-t*.21,k+seed*.03));
   float halo=exp(-d*23.)*smoothstep(.3,.73,smoke)*growth;
   float fogA=halo*.44*envelope;
   vec3 fog=mix(vec3(.055,.04,.095),vec3(.31,.24,.40),smoke);
   sum=sum*(1.-fogA)+fog*fogA;alpha=alpha+(1.-alpha)*fogA;
   float rim=exp(-abs(d-thick)*900.)*growth;
   float bloom=exp(-abs(d-thick)*95.)*growth;
   float edgeLight=(.38+.62*noise(vec3(y*38.,k,t*.32)));
   vec3 radiance=(vec3(.63,.53,.77)*rim*.85+vec3(.25,.13,.42)*bloom*.22)*edgeLight;
   float lightA=clamp((rim*.8+bloom*.13)*envelope,0.,.9);
   sum=sum*(1.-lightA)+radiance*envelope;alpha=alpha+(1.-alpha)*lightA;
   float core=(1.-smoothstep(thick*.68,thick+.0012,d))*growth*envelope;
   sum=mix(sum,vec3(.001,.0005,.003),core*.96);alpha=alpha+(1.-alpha)*core*.96;
   // Junctions inherit the arrival time of their parent. Child tips propagate separately.
   for(int branch=0;branch<6;branch++){
    float j=float(branch),junction=.08+j*.072+hash(vec3(j,k,4.))*.023;
    float age=t-birth-junction*travel-.12;
    float length=.07+hash(vec3(j,k,5.))*.09;
    float reach=clamp(age/2.,0.,length);
    float by=y-junction;
    float direction=mod(j,2.)<.5?-1.:1.;
    float slope=direction*(.6+hash(vec3(j,k,6.))*.7);
    float bx=base+sgn*(sin(junction*5.+k)*.025+sin(junction*12.+seed+k)*.017+(noise(vec3(junction*29.,k*7.,seed*.02))-.5)*.019);
    float curve=bx+slope*by+sin(by*90.+j)*by*.10;
    float bd=abs((localUV.x-curve)*crossScale);
    float mask=step(0.,by)*(1.-smoothstep(max(0.,reach-.018),reach+.001,by))*step(.002,reach);
    float bw=.0024*(1.-clamp(by/length,0.,1.));
    float br=exp(-abs(bd-bw)*1000.)*mask*envelope;
    float bc=(1.-smoothstep(bw*.5,bw+.0008,bd))*mask*envelope;
    sum+=vec3(.40,.29,.55)*br*.7;alpha=alpha+(1.-alpha)*br*.7;
    sum=mix(sum,vec3(.002,.001,.004),bc*.9);alpha=alpha+(1.-alpha)*bc*.9;
    // One finer fork grows from each branch after its own tip reaches the split.
    float split=length*.43,fy=by-split;
    float forkReach=clamp((age-split*2.-.16)*.4,0.,length*.65);
    float fx=bx+slope*split+sin(split*90.+j)*split*.10-slope*fy*.75+sin(fy*100.+k)*fy*.07;
    float fd=abs((localUV.x-fx)*crossScale);
    float fm=step(0.,fy)*(1.-smoothstep(max(0.,forkReach-.012),forkReach+.001,fy))*step(.002,forkReach);
    float fl=exp(-fd*1200.)*fm*envelope*.48;
    sum+=vec3(.40,.30,.55)*fl;alpha=alpha+(1.-alpha)*fl;
   }
   // Dust accelerates and curves into the tear, disappearing on contact.
   if(still<.5)for(int mote=0;mote<8;mote++){
    float j=float(mote),h=hash(vec3(j,k,2.));
    float age=fract(max(0.,t-1.-h*3.)/(2.4+h*2.));
    float active=step(1.+h*3.,t);
    float my=.04+hash(vec3(j,k,7.))*(extent-.08);
    my+=sin(age*3.+h*6.)*.045*(1.-age);
    float targetX=base+sgn*(sin(my*5.+k)*.025+sin(my*12.+seed+k)*.017+(noise(vec3(my*29.,k*7.,seed*.02))-.5)*.019);
    float mx=targetX+(hash(vec3(j,k,9.))-.5)*.30*(1.-age*age);
    float opened=smoothstep(my,my+.08,head);
    vec2 delta=(localUV-vec2(mx,my))*vec2(crossScale,(tear==2 || tear==3)?aspect:1.);
    float radius=.0008+h*.0015;
    float dotA=exp(-dot(delta,delta)/(radius*radius))*sin(age*3.14159)*active*opened*envelope*.7;
    sum+=vec3(.64,.59,.72)*dotA;alpha=alpha+(1.-alpha)*dotA;
   }
  }
 }
 gl_FragColor=vec4(sum/max(alpha,.0001),alpha);
}`;
  function shader(type,source){
    const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.error('Spectral shader:',gl.getShaderInfoLog(s));gl.deleteShader(s);return null;}return s;
  }
  const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment);
  if(!vs||!fs)return;
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
  gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  const u=Object.fromEntries(['resolution','time','seed','mode','still'].map(k=>[k,gl.getUniformLocation(program,k)]));
  let frame=0,start=0,last=0;
  function stop(){cancelAnimationFrame(frame);frame=0;canvas.classList.remove('is-active');gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);}
  function play(mode){
    stop();if(document.hidden||gl.isContextLost())return;
    const scale=Math.min(.7,960/innerWidth);
    canvas.width=Math.max(1,Math.round(innerWidth*scale));canvas.height=Math.max(1,Math.round(innerHeight*scale));
    gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(u.resolution,canvas.width,canvas.height);
    gl.uniform1f(u.seed,Math.random()*900);gl.uniform1f(u.mode,mode);gl.uniform1f(u.still,reduce.matches?1:0);
    canvas.dataset.effect=mode?'shadow':'soul';start=performance.now();last=0;canvas.classList.add('is-active');frame=requestAnimationFrame(draw);
  }
  function draw(now){
    const t=(now-start)/1000;
    if(t>=(reduce.matches?2:9)||document.hidden){stop();return;}
    frame=requestAnimationFrame(draw);if(now-last<32)return;last=now;
    gl.uniform1f(u.time,t);gl.drawArrays(gl.TRIANGLES,0,6);
  }
  document.addEventListener('armory:soul',()=>play(0));
  document.addEventListener('armory:shadow',()=>play(1));
  document.addEventListener('armory:clear-effect',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  window.addEventListener('resize',stop);reduce.addEventListener('change',stop);
  canvas.addEventListener('webglcontextlost',stop);
})();
