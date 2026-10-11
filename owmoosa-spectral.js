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
   a=min(.88,.22+density*.84)*peripheral*local;
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
