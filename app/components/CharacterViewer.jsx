"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RotateCcw, Expand, Minimize, Pause, Play } from "lucide-react";

// A real, procedural mesh study. It is not a reconstruction of the supplied photo.
function createCharacter() {
  const character = new THREE.Group();
  const satin = color => new THREE.MeshPhysicalMaterial({ color, roughness: .34, metalness: .12, clearcoat: .4, clearcoatRoughness: .3 });
  const skin = satin("#e8bfae"); skin.roughness=.55; skin.metalness=0;
  const fabric = satin("#151a23");fabric.roughness=.88;fabric.metalness=0;fabric.clearcoat=.04;
  const hair = satin("#82162f");hair.roughness=.43;hair.metalness=.02;hair.clearcoat=.25;
  const silver = satin("#a1b1c2");silver.metalness=1; silver.roughness=.23;
  const lime = new THREE.MeshStandardMaterial({ color:"#c5ff77", emissive:"#76b939", emissiveIntensity:.5, roughness:.2 });
  const ink = satin("#090d17");
  const eyeWhite = satin("#ede6e0");
  const iris = satin("#465875");iris.roughness=.13;
  const glass = new THREE.MeshPhysicalMaterial({ color:"#c2d6ff", roughness:.05, metalness:.05, transparent:true, opacity:.42, clearcoat:1 });
  function mesh(geometry, material, position, scale=[1,1,1], parent=character) {
    const object = new THREE.Mesh(geometry, material);object.position.set(...position);object.scale.set(...scale);object.castShadow=true;object.receiveShadow=true;parent.add(object);return object;
  }
  function sphere(material,p,s,parent=character) {return mesh(new THREE.SphereGeometry(1,32,24),material,p,s,parent);}
  function tube(points,r,material,parent=character) { const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));return mesh(new THREE.TubeGeometry(curve,24,r,8,false),material,[0,0,0],[1,1,1],parent); }
  // Boots, sculpted trousers and jacket.
  for (const side of [-1,1]) {
    sphere(ink,[side*.3,.23,.15],[.27,.21,.43]);
    mesh(new THREE.CylinderGeometry(.23,.25,.12,24),silver,[side*.3,.07,.09],[1,.6,1.3]);
    mesh(new THREE.CapsuleGeometry(.23,.45,6,20),fabric,[side*.29,.65,0],[1,1,1.05]);
    mesh(new THREE.CylinderGeometry(.27,.23,.1,24),ink,[side*.3,.33,0]);
    for(let n=0;n<3;n++)tube([[side*.3-.13,.27+n*.065,.47],[side*.3,.29+n*.065,.5],[side*.3+.13,.27+n*.065,.47]],.014,silver);
    const sleeve=mesh(new THREE.CapsuleGeometry(.22,.6,8,24),fabric,[side*.57,1.5,0]); sleeve.rotation.z=side*.25;
    sphere(skin,[side*.71,1.02,.05],[.18,.22,.17]);
    mesh(new THREE.CylinderGeometry(.21,.2,.13,24),ink,[side*.69,1.19,.04]);
  }
  sphere(fabric,[0,1.59,0],[.58,.68,.38]);
  mesh(new THREE.CylinderGeometry(.57,.6,.16,32),ink,[0,1.08,0],[1,1,.65]);
  sphere(fabric,[0,1.47,.35],[.36,.19,.07]);
  tube([[-.32,1.42,.412],[0,1.38,.44],[.32,1.42,.412]],.012,silver);
  tube([[0,1.16,.39],[0,1.58,.41],[0,2.06,.32]],.012,silver);
  mesh(new THREE.BoxGeometry(.09,.15,.035),silver,[.025,1.83,.42]);
  mesh(new THREE.BoxGeometry(.2,.075,.026),lime,[-.27,1.83,.385]);
  // Hood seen from the back and a raised collar.
  sphere(fabric,[0,2.17,-.22],[.72,.48,.5]);
  const collar=mesh(new THREE.TorusGeometry(.42,.11,12,48),fabric,[0,2.12,.07],[1,1,.8]);collar.rotation.x=Math.PI/2;
  for(const side of [-1,1]){
    tube([[side*.29,2.13,.31],[side*.3,1.98,.4],[side*.31,1.73,.43]],.016,silver);
    mesh(new THREE.CylinderGeometry(.027,.027,.075,12),silver,[side*.31,1.72,.43]);
  }
  // Oversized collectible head with separate eyes and ears.
  const head=new THREE.Group(); head.position.set(0,2.72,0);character.add(head);
  sphere(skin,[0,0,0],[.8,.73,.69],head);
  for(const side of [-1,1]){
    sphere(skin,[side*.78,-.03,-.02],[.15,.23,.15],head);
    sphere(satin("#c5908d"),[side*.845,-.03,.085],[.055,.13,.035],head);
  }
  const eyes=[];
  for(const side of [-1,1]){
    const eye=sphere(ink,[side*.33,-.065,.593],[.29,.24,.09],head);eye.rotation.z=-side*.16;
    const white=sphere(eyeWhite,[side*.33,-.078,.65],[.258,.205,.059],head);white.rotation.z=-side*.16;
    const pupil=new THREE.Group();pupil.position.set(side*.33,-.064,.707);head.add(pupil);eyes.push(pupil);
    sphere(iris,[0,0,0],[.156,.176,.047],pupil);
    sphere(ink,[0,.005,.036],[.084,.105,.025],pupil);
    sphere(eyeWhite,[-.043,.059,.065],[.03,.04,.012],pupil);
    sphere(eyeWhite,[.045,-.045,.061],[.012,.016,.009],pupil);
    tube([[side*.12,.125,.651],[side*.32,.175,.674],[side*.57,.135,.598]],.018,hair,head);
    // freckles are small modeled details, not a photo texture.
    for(let n=0;n<5;n++)sphere(satin("#b68279"),[side*(.31+n*.047),-.33+Math.sin(n*2)*.028,.619-n*.025],[.009,.009,.008],head);
  }
  sphere(skin,[0,-.18,.69],[.069,.065,.071],head);
  tube([[-.062,-.383,.593],[0,-.372,.609],[.065,-.383,.593]],.009,satin("#965f64"),head);
  mesh(new THREE.SphereGeometry(.87,40,24,0,Math.PI*2,0,Math.PI*.46),hair,[0,.14,-.055],[1,1,1.04],head);
  mesh(new THREE.SphereGeometry(.85,36,24,Math.PI,Math.PI,0,Math.PI*.86),hair,[0,.03,-.03],[1,1,1.04],head);
  // Swept tapered hair locks built around curved 3D splines.
  function lock(points,radius) {
    const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
    const geometry=new THREE.TubeGeometry(curve,28,radius,10,false);
    const pos=geometry.attributes.position;
    for(let ring=0;ring<=28;ring++){
      const t=ring/28;const center=curve.getPointAt(t);const taper=.12+.88*Math.pow(Math.sin(Math.PI*(t*.84+.06)),.65)*(1-t*.78);
      for(let j=0;j<=10;j++){const i=ring*11+j;pos.setXYZ(i,center.x+(pos.getX(i)-center.x)*taper,center.y+(pos.getY(i)-center.y)*taper,center.z+(pos.getZ(i)-center.z)*taper);}
    }
    geometry.computeVertexNormals();mesh(geometry,hair,[0,0,0],[1,1,1],head);
  }
  for(let n=0;n<11;n++){
    const x=-.69+n*.126;
    lock([[x*.72,.76,.13],[x-.13,.52,.56],[x-.2,.24,.7],[x-.17,.02+Math.abs(x)*.25,.67]],.2);
  }
  for(const side of [-1,1]) for(let n=0;n<5;n++)lock([[side*.59,.53,-.07-n*.09],[side*.8,.22,-.14-n*.06],[side*.81,-.22,-.12-n*.07],[side*.73,-.44,-.17-n*.07]],.115);
  for(let n=0;n<9;n++){const x=-.6+n*.15;lock([[x*.8,.58,-.56],[x,.2,-.81],[x,-.24,-.78],[x*.93,-.55,-.58]],.16);}
  lock([[-.24,.72,-.22],[.05,1.01,-.12],[.4,.96,-.03],[.6,.86,.03]],.13);
  // Chrome earring, necklace and visor on the crown.
  const earring=mesh(new THREE.TorusGeometry(.12,.025,8,28),silver,[.86,-.24,.03],[1,1,1],head);earring.rotation.y=.4;
  const chain=mesh(new THREE.TorusGeometry(.37,.013,6,48),silver,[0,2.04,.13],[1,1,.75]);chain.rotation.x=Math.PI/2-.4;
  const pendant=mesh(new THREE.OctahedronGeometry(.075),lime,[0,1.89,.41]);pendant.rotation.z=.2;
  for(const side of [-1,1]){
    const frame=mesh(new THREE.TorusGeometry(.2,.032,10,36),silver,[side*.26,.66,.42],[1,.8,1],head);frame.rotation.x=-.5;
    const lens=mesh(new THREE.CircleGeometry(.185,32),glass,[side*.26,.66,.426],[1,.8,1],head);lens.rotation.x=-.5;
  }
  tube([[-.08,.68,.41],[0,.7,.4],[.08,.68,.41]],.024,silver,head);
  character.userData.eyes=eyes;
  return character;
}

export default function CharacterViewer() {
  const containerRef=useRef(null);
  const engineRef=useRef(null);
  const [running,setRunning]=useState(true);
  const [expanded,setExpanded]=useState(false);
  const [failed,setFailed]=useState(false);
  const [mode,setMode]=useState("solid");
  useEffect(()=>{
    const container=containerRef.current;if(!container)return;
    let renderer;
    try {renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"});}catch {setFailed(true);return;}
    const mobile=window.innerWidth<700;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,mobile?1.25:1.75));
    renderer.setClearColor(0x090b10,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.9;
    renderer.shadowMap.enabled=!mobile;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-label","可旋转的三维角色，拖动旋转，滚轮或双指缩放");renderer.domElement.setAttribute("role","img");
    container.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const pmrem=new THREE.PMREMGenerator(renderer);
    const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;scene.environmentIntensity=.65;room.dispose();pmrem.dispose();
    const camera=new THREE.PerspectiveCamera(35,1,.1,50);camera.position.set(0,2.8,7.8);
    const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,1.8,0);controls.enableDamping=true;controls.dampingFactor=.07;controls.enablePan=false;controls.minDistance=4;controls.maxDistance=13;controls.autoRotate=true;controls.autoRotateSpeed=.65;controls.saveState();
    const character=createCharacter();const pivot=new THREE.Group();pivot.position.y=1.8;character.position.y=-1.8;pivot.add(character);scene.add(pivot);
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){controls.autoRotate=false;setRunning(false);}
    const stage=new THREE.Mesh(new THREE.CylinderGeometry(1.32,1.4,.15,72),new THREE.MeshPhysicalMaterial({color:"#1b242f",metalness:.9,roughness:.22,clearcoat:1}));stage.position.y=-.06;stage.receiveShadow=true;scene.add(stage);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.35,.016,8,96),new THREE.MeshStandardMaterial({color:"#c5ff77",emissive:"#c5ff77",emissiveIntensity:2}));ring.rotation.x=Math.PI/2;ring.position.y=.018;scene.add(ring);
    const hemisphere=new THREE.HemisphereLight(0x9aaeea,0x353a20,1.5);scene.add(hemisphere);
    const key=new THREE.DirectionalLight(0xffe6dd,2.8);key.position.set(3,5,4);key.castShadow=!mobile;key.shadow.mapSize.set(1024,1024);scene.add(key);
    const rim=new THREE.DirectionalLight(0x769bff,5);rim.position.set(-3,3,-3);scene.add(rim);
    const rimPink=new THREE.PointLight(0xff4a80,18,12);rimPink.position.set(3,3,-2);scene.add(rimPink);
    const particlesGeometry=new THREE.BufferGeometry();const positions=new Float32Array(70*3);
    for(let i=0;i<70;i++){positions[i*3]=(Math.sin(i*95.23)*.5+.5)*8-4;positions[i*3+1]=(Math.sin(i*43.4)*.5+.5)*5;positions[i*3+2]=(Math.cos(i*54.21)*.5+.5)*5-3;}
    particlesGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));const particles=new THREE.Points(particlesGeometry,new THREE.PointsMaterial({color:0xc5ff77,size:.017,transparent:true,opacity:.6}));scene.add(particles);
    let raf=0,visible=true,last=0;let flipped=false;
    const aim={x:0,y:0};
    const resize=()=>{const w=container.clientWidth,h=container.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};
    const observer=new ResizeObserver(resize);observer.observe(container);resize();
    const frame=now=>{
      raf=0;if(!visible||document.hidden)return;
      const delta=last?Math.min((now-last)/1000,.05):.016;last=now;
      controls.update(delta);particles.rotation.y+=delta*.025;
      pivot.rotation.x=THREE.MathUtils.lerp(pivot.rotation.x,flipped?Math.PI:0,.06);
      pivot.position.y=1.8+Math.sin(now*.0007)*.025;
      character.userData.eyes.forEach(eye=>{eye.children.forEach(child=>{child.position.x=THREE.MathUtils.lerp(child.position.x,aim.x*.018,.09);});});
      renderer.render(scene,camera);raf=requestAnimationFrame(frame);
    };
    const start=()=>{if(!raf&&visible&&!document.hidden){last=0;raf=requestAnimationFrame(frame);}};
    const onVisibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else start();};
    const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)start();else {cancelAnimationFrame(raf);raf=0;}});intersection.observe(container);
    const onMove=e=>{const rect=container.getBoundingClientRect();aim.x=(e.clientX-rect.left)/rect.width*2-1;};
    const onLeave=()=>{aim.x=0;};container.addEventListener("pointermove",onMove);container.addEventListener("pointerleave",onLeave);document.addEventListener("visibilitychange",onVisibility);
    engineRef.current={controls,character,camera,flip:()=>{flipped=!flipped;},front:()=>{flipped=false;controls.reset();},view:(view)=>{flipped=false;const views={front:[0,2.8,7.8],back:[0,2.8,-7.8],side:[7.8,2.8,0],top:[.01,9,.01]};camera.position.set(...views[view]);controls.update();},wire:wire=>character.traverse(object=>{if(object.isMesh)object.material.wireframe=wire;})};
    start();
    return()=>{cancelAnimationFrame(raf);observer.disconnect();intersection.disconnect();document.removeEventListener("visibilitychange",onVisibility);container.removeEventListener("pointermove",onMove);container.removeEventListener("pointerleave",onLeave);controls.dispose();scene.traverse(object=>{object.geometry?.dispose();if(object.material){const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(material=>material.dispose());}});environment.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();engineRef.current=null;};
  },[]);
  useEffect(()=>{if(engineRef.current)engineRef.current.controls.autoRotate=running;},[running]);
  useEffect(()=>{if(!expanded)return;const original=document.body.style.overflow;document.body.style.overflow="hidden";const key=e=>{if(e.key==="Escape")setExpanded(false);};window.addEventListener("keydown",key);return()=>{document.body.style.overflow=original;window.removeEventListener("keydown",key);};},[expanded]);
  function view(value){setRunning(false);engineRef.current?.view(value);}
  return <section className={`character-lab ${expanded?"character-lab--expanded":""}`} aria-label="三维角色交互展台" role={expanded?"dialog":undefined} aria-modal={expanded?true:undefined}>
    <div className="character-lab-copy"><span>REAL-TIME 3D / CHARACTER STUDY</span><h2>不止一个角度。<em>Beyond the flat.</em></h2><p>红发、黑衣、金属细节。<br />一件可以从各个角度探索的立体角色。</p><small>风格化建模习作 / 非原图模型还原</small></div>
    <div ref={containerRef} className="character-canvas">{failed&&<p className="character-failed">当前设备暂不支持 WebGL 3D 渲染。请尝试更新浏览器后打开。</p>}</div>
    <div className="character-studio-mark" aria-hidden="true">SIKOU<br /><span>360° / LIVE RENDER</span></div>
    <div className="character-toolbar"><div>{[["front","正面"],["side","侧面"],["back","背面"],["top","俯视"]].map(([value,label])=><button key={value} onClick={()=>view(value)}>{label}</button>)}<button onClick={()=>{setRunning(false);engineRef.current?.flip();}}>翻转</button><button aria-pressed={mode==="wire"} onClick={()=>{const next=mode==="solid"?"wire":"solid";setMode(next);engineRef.current?.wire(next==="wire");}}>线框</button></div><div><button onClick={()=>setRunning(!running)} aria-label={running?"暂停自动旋转":"开始自动旋转"}>{running?<Pause size={16}/>:<Play size={16}/>}</button><button onClick={()=>{engineRef.current?.front();setRunning(false);}} aria-label="复位模型"><RotateCcw size={16}/></button><button onClick={()=>setExpanded(!expanded)} aria-label={expanded?"退出放大":"放大模型展台"}>{expanded?<Minimize size={16}/>:<Expand size={16}/>}</button></div></div>
    <p className="character-help">拖动旋转 / 滚轮缩放 / 手机双指缩放</p>
  </section>;
}
