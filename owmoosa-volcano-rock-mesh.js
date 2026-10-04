/* Small pre-rendered 3D basalt meshes. Generated photographic material is mapped
   onto rotating irregular geometry; all animation reuses these cached frames. */
window.buildVolcanicRockFrames = async function(atlas) {
  const result=[], sides=32, rings=20, frames=40, size=576;
  function triangle(c,image,p,q,r){
    const du1=q.u-p.u,dv1=q.v-p.v,du2=r.u-p.u,dv2=r.v-p.v,det=du1*dv2-du2*dv1;
    if(Math.abs(det)<.00001)return;
    const dx1=q.x-p.x,dy1=q.y-p.y,dx2=r.x-p.x,dy2=r.y-p.y;
    const a=(dx1*dv2-dx2*dv1)/det,b=(dy1*dv2-dy2*dv1)/det;
    const cc=(dx2*du1-dx1*du2)/det,d=(dy2*du1-dy1*du2)/det;
    const cx=(p.x+q.x+r.x)/3,cy=(p.y+q.y+r.y)/3;const expand=v=>{const dx=v.x-cx,dy=v.y-cy,n=Math.hypot(dx,dy)||1;return{x:v.x+dx/n*.35,y:v.y+dy/n*.35};};const pp=expand(p),qq=expand(q),rr=expand(r);c.save();c.beginPath();c.moveTo(pp.x,pp.y);c.lineTo(qq.x,qq.y);c.lineTo(rr.x,rr.y);c.closePath();c.clip();
    c.transform(a,b,cc,d,p.x-a*p.u-cc*p.v,p.y-b*p.u-d*p.v);c.drawImage(image,0,0);c.restore();
  }
  for(let type=0;type<6;type++){
    const tile=document.createElement('canvas');tile.width=tile.height=512;
    const material=tile.getContext('2d');material.imageSmoothingEnabled=true;material.imageSmoothingQuality='high';material.drawImage(atlas,type%3*atlas.naturalWidth/3,Math.floor(type/3)*atlas.naturalHeight/2,atlas.naturalWidth/3,atlas.naturalHeight/2,0,0,512,512);
    const forms=[[1,.88,.9],[.66,1.18,.68],[1.12,.62,.9],[.86,.96,.68],[1,.83,1.05],[.72,1.05,.84]];
    const form=forms[type],vertices=[],shapePhase=type*2.399963;
    for(let y=0;y<=rings;y++)for(let x=0;x<=sides;x++){
      const lat=y/rings*Math.PI,lon=x/sides*Math.PI*2;
      const radial=.83+.115*Math.sin(lon*(type%3+2)+shapePhase)*Math.sin(lat*3+type)+.065*Math.cos(lon*5-lat*3)+.035*Math.sin(lon*7+shapePhase)*Math.sin(lat*5)+.045*Math.cos(lat*4+shapePhase);
      vertices.push({x:Math.sin(lat)*Math.cos(lon)*radial*form[0],y:Math.cos(lat)*radial*form[1],z:Math.sin(lat)*Math.sin(lon)*radial*form[2],
        u:112+x/sides*288,v:112+y/rings*288});
    }
    const faces=[];for(let y=0;y<rings;y++)for(let x=0;x<sides;x++){const a=y*(sides+1)+x,b=a+1,c=a+sides+1,d=c+1;faces.push([a,c,b],[b,c,d]);}
    const batch=[];
    for(let frame=0;frame<frames;frame++){
      const yaw=frame/frames*Math.PI*2,pitch=.4+Math.sin(yaw)*.55,cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
      const points=vertices.map(v=>{const xx=v.x*cy+v.z*sy,zz=-v.x*sy+v.z*cy,yy=v.y*cp-zz*sp,z=v.y*sp+zz*cp;const roll=Math.sin(yaw)*.7,rx=xx*Math.cos(roll)-yy*Math.sin(roll),ry=xx*Math.sin(roll)+yy*Math.cos(roll),perspective=3.8/(3.8-z);return{x:size/2+rx*(size*.375)*perspective,y:size/2+ry*(size*.375)*perspective,z,wx:rx,wy:ry,wz:z,u:v.u,v:v.v};});
      const surface=document.createElement('canvas');surface.width=surface.height=size;const c=surface.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
      const visible=faces.map(f=>{const [a,b,d]=f.map(i=>points[i]);return{a,b,d,z:(a.z+b.z+d.z)/3,area:(b.x-a.x)*(d.y-a.y)-(b.y-a.y)*(d.x-a.x)};}).filter(f=>f.area<-.03).sort((a,b)=>a.z-b.z);
      for(const f of visible){
        triangle(c,tile,f.a,f.b,f.d);
        const ab=[f.b.wx-f.a.wx,f.b.wy-f.a.wy,f.b.wz-f.a.wz],ac=[f.d.wx-f.a.wx,f.d.wy-f.a.wy,f.d.wz-f.a.wz];
        let nx=ab[1]*ac[2]-ab[2]*ac[1],ny=ab[2]*ac[0]-ab[0]*ac[2],nz=ab[0]*ac[1]-ab[1]*ac[0];
        if(nx*f.a.wx+ny*f.a.wy+nz*f.a.wz<0){nx=-nx;ny=-ny;nz=-nz;}
        const norm=Math.hypot(nx,ny,nz)||1;nx/=norm;ny/=norm;nz/=norm;
        const center=[f.a.wx+f.b.wx+f.d.wx,f.a.wy+f.b.wy+f.d.wy,f.a.wz+f.b.wz+f.d.wz],cn=Math.hypot(...center)||1;nx=nx*.3+center[0]/cn*.7;ny=ny*.3+center[1]/cn*.7;nz=nz*.3+center[2]/cn*.7;const smoothNorm=Math.hypot(nx,ny,nz)||1;nx/=smoothNorm;ny/=smoothNorm;nz/=smoothNorm;
        const diffuse=Math.max(0,-nx*.45-ny*.6+nz*.66),rim=Math.pow(1-Math.max(0,nz),2)*Math.max(0,ny*.6-nx*.5);
        c.beginPath();c.moveTo(f.a.x,f.a.y);c.lineTo(f.b.x,f.b.y);c.lineTo(f.d.x,f.d.y);c.closePath();
        c.fillStyle=`rgba(3,3,4,${.1+.64*(1-diffuse)})`;c.fill();
        const highlight=Math.pow(Math.max(0,-nx*.25-ny*.32+nz*.91),18)*.17;
        if(highlight>.005){c.fillStyle=`rgba(240,216,182,${highlight})`;c.fill();}
        if(rim>.025){c.fillStyle=`rgba(255,95,20,${Math.min(.24,rim*.32)})`;c.fill();}
      }
      batch.push(surface);
    }
    result.push(batch);
    // Yield between mesh variants so navigation remains responsive during setup.
    await new Promise(resolve=>setTimeout(resolve,0));
  }
  return result;
};
