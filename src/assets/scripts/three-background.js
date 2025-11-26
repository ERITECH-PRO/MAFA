// Three.js Background Animation for MAFA
// This module initializes an interactive 3D background with Africa silhouette

export function initThreeBackground() {
  // Check if Three.js is available
  if (typeof window === 'undefined' || typeof window.THREE === 'undefined') {
    console.error('Three.js is not loaded. Please include it before calling initThreeBackground.');
    return;
  }
  
  const THREE = window.THREE;

  const container = document.getElementById('three-bg');
  if (!container) {
    console.error('Container element #three-bg not found');
    return;
  }

  // ---- SETUP ----
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0e1a, 50, 150);
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 85;
  
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // ---- ADVANCED LIGHTING ----
  const ambi = new THREE.AmbientLight(0xffa94d, 0.4);
  scene.add(ambi);
  
  const pointLight1 = new THREE.PointLight(0xffd700, 1.2, 100);
  pointLight1.position.set(30, 30, 20);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0xff6b35, 0.8, 80);
  pointLight2.position.set(-30, -20, 15);
  scene.add(pointLight2);

  // ---- ENHANCED AFRICA SILHOUETTE ----
  const africaPoints = [
    [-18, 38], [-14, 38], [-10, 37.5], [-6, 37], [-2, 36.5], [2, 36], [6, 35.5], [10, 35],
    [14, 34], [18, 33], [22, 31.5], [25, 29], [27, 26], [29, 22], [31, 18], [32.5, 14],
    [33.5, 10], [34, 6], [33.5, 2], [32.5, -2], [31, -6], [29.5, -10], [28, -14],
    [26, -18], [24, -21], [22, -24], [20, -27], [18, -29], [16, -31], [13, -32.5],
    [10, -33.5], [6, -34.5], [2, -35], [-2, -35], [-6, -34], [-9, -32], [-11, -29],
    [-12.5, -26], [-13.5, -22], [-14, -18], [-14.5, -14], [-15, -10], [-15.5, -6],
    [-16, -2], [-16.5, 2], [-17, 6], [-18, 10], [-19, 14], [-19.5, 18], [-19, 22],
    [-18.5, 26], [-18, 30], [-17.5, 34]
  ];

  const africaParticles = [];
  const africaGlowSpheres = [];
  
  africaPoints.forEach((pt, i) => {
    // Main particle
    const mat = new THREE.MeshBasicMaterial({ 
      color: 0xff6b35, 
      transparent: true, 
      opacity: 0.9 
    });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 16), mat);
    mesh.position.set(pt[0], pt[1], -3);
    scene.add(mesh);
    
    // Glow effect
    const glowMat = new THREE.MeshBasicMaterial({ 
      color: 0xffd700, 
      transparent: true, 
      opacity: 0.3 
    });
    const glowMesh = new THREE.Mesh(new THREE.SphereGeometry(2.5, 16, 16), glowMat);
    glowMesh.position.set(pt[0], pt[1], -3);
    scene.add(glowMesh);
    
    africaParticles.push({
      mesh,
      baseX: pt[0],
      baseY: pt[1],
      phase: i * 0.15,
      delay: i * 0.04
    });
    
    africaGlowSpheres.push({
      mesh: glowMesh,
      phase: i * 0.2
    });
  });

  // Enhanced connection lines
  const africaLineGeo = new THREE.BufferGeometry().setFromPoints(
    africaPoints.map(p => new THREE.Vector3(p[0], p[1], -3))
  );
  const africaLineMat = new THREE.LineBasicMaterial({ 
    color: 0xffd700, 
    transparent: true, 
    opacity: 0.6
  });
  const africaLine = new THREE.LineLoop(africaLineGeo, africaLineMat);
  scene.add(africaLine);
  
  // Inner glow line
  const africaGlowLineGeo = new THREE.BufferGeometry().setFromPoints(
    africaPoints.map(p => new THREE.Vector3(p[0], p[1], -3.5))
  );
  const africaGlowLineMat = new THREE.LineBasicMaterial({ 
    color: 0xff8c42, 
    transparent: true, 
    opacity: 0.4
  });
  const africaGlowLine = new THREE.LineLoop(africaGlowLineGeo, africaGlowLineMat);
  scene.add(africaGlowLine);

  // ---- ENHANCED FIREFLIES WITH VARIETY ----
  const FIREFLY_COUNT = 80;
  const fireflies = [];
  const fireflyTypes = ['small', 'medium', 'large'];

  for (let i = 0; i < FIREFLY_COUNT; i++) {
    const type = fireflyTypes[Math.floor(Math.random() * 3)];
    const c = [0xff8c42, 0xffd700, 0x2d5016, 0xd4691a, 0xffb347, 0x8b4513, 0xff6b35, 0xf4a460][Math.floor(Math.random()*8)];
    const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 1 });
    
    let size = 0.5;
    if (type === 'medium') size = 0.8;
    if (type === 'large') size = 1.2;
    
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 12, 12), mat);
    mesh.position.set(
       (Math.random() - 0.5) * 150,
       (Math.random() - 0.5) * 90,
       (Math.random() - 0.5) * 30
    );
    scene.add(mesh);
    
    // Add glow for larger fireflies
    let glowMesh = null;
    if (type !== 'small') {
      const glowMat = new THREE.MeshBasicMaterial({ 
        color: c, 
        transparent: true, 
        opacity: 0.2 
      });
      glowMesh = new THREE.Mesh(new THREE.SphereGeometry(size * 2.5, 12, 12), glowMat);
      glowMesh.position.copy(mesh.position);
      scene.add(glowMesh);
    }
    
    fireflies.push({
      mesh,
      glowMesh,
      base: mesh.position.clone(),
      speed: Math.random()*0.2+0.05,
      phase: Math.random()*Math.PI*2,
      flicker: Math.random()*2.5+0.5,
      pulse: Math.random()*0.7+0.3,
      type
    });
  }

  // ---- ENHANCED VINES WITH MORE DETAIL ----
  function makeVine(pathColor, yBase, noiseAmp, sinAmp, width, segments = 90) {
    const points = [];
    for(let t=0; t<1.02; t+=1/segments) {
      const x = t*140-70;
      const y = yBase + Math.sin(t*7 + noiseAmp*Math.sin(t*13)) * sinAmp 
                + Math.cos(t*9)*4 + Math.sin(t*15)*2;
      const z = Math.sin(t*5 + yBase*0.3) * width + Math.cos(t*8)*2 + Math.sin(t*11)*1.5;
      points.push(new THREE.Vector3(x, y, z));
    }
    const mat = new THREE.LineBasicMaterial({ 
      color: pathColor, 
      transparent: true, 
      opacity: 0.7 
    });
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return { line: new THREE.Line(geo, mat), segments };
  }
  
  const vines = [
    makeVine(0x2d5016, 32, 0.4, 12, 5, 100),
    makeVine(0x6b4423, -24, 0.45, 14, 10, 100),
    makeVine(0x8b6914, 10, 0.58, 18, 7, 100),
    makeVine(0x4a7023, -10, 0.32, 11, 6, 100),
    makeVine(0x5d4e37, 18, 0.38, 13, 8, 100),
  ];
  vines.forEach(v => scene.add(v.line));

  // ---- ATMOSPHERIC PARTICLES ----
  const DUST_COUNT = 100;
  const dustParticles = [];
  
  for(let i = 0; i < DUST_COUNT; i++) {
    const col = [0xffd700, 0xff8c42, 0xf4a460][Math.floor(Math.random()*3)];
    const mat = new THREE.MeshBasicMaterial({ 
      color: col, 
      transparent: true, 
      opacity: 0.15 
    });
    const size = Math.random() * 0.3 + 0.1;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 6, 6), mat);
    mesh.position.set(
      (Math.random() - 0.5) * 160,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 40
    );
    scene.add(mesh);
    dustParticles.push({
      mesh,
      vx: (Math.random() - 0.5) * 0.02,
      vy: Math.random() * 0.03 + 0.01,
      vz: (Math.random() - 0.5) * 0.015
    });
  }

  // ---- ENHANCED HAZE ----
  const HAZE_COUNT = 8;
  const hazes = [];
  for(let i=0; i<HAZE_COUNT; i++) {
    const geo = new THREE.SphereGeometry(20+Math.random()*12, 32, 32);
    const col = [0xcd7f32, 0xdaa520, 0xd2691e, 0x8fbc8f, 0xe3963e, 0xb8860b][i%6];
    const mat = new THREE.MeshBasicMaterial({ 
      color: col, 
      transparent: true, 
      opacity: 0.06+Math.random()*0.05 
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random()-0.5)*100,
      (Math.random()-0.5)*60,
      -20-Math.random()*30
    );
    scene.add(mesh);
    hazes.push({
      mesh, 
      vx: Math.random()*0.05-0.025, 
      vy: Math.random()*0.04-0.02,
      pulseSpeed: Math.random()*0.6+0.2
    });
  }

  // ---- ENHANCED MOUSE INTERACTION ----
  const mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
  let mouseVelocity = { x: 0, y: 0 };
  
  renderer.domElement.addEventListener('mousemove', (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    mouse.x = (e.clientX - rect.left) / rect.width * 120 - 60;
    mouse.y = -(e.clientY - rect.top) / rect.height * 80 + 40;
    mouseVelocity.x = mouse.x - mouse.prevX;
    mouseVelocity.y = mouse.y - mouse.prevY;
  });

  // ---- ENHANCED ANIMATION ----
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.012;
    
    // Camera subtle movement
    camera.position.x = Math.sin(t * 0.1) * 2;
    camera.position.y = Math.cos(t * 0.08) * 1.5;
    camera.lookAt(0, 0, 0);
    
    // Animate lights
    pointLight1.position.x = 30 + Math.sin(t * 0.5) * 10;
    pointLight1.position.y = 30 + Math.cos(t * 0.4) * 10;
    pointLight1.intensity = 1.0 + Math.sin(t * 0.8) * 0.3;
    
    pointLight2.position.x = -30 + Math.cos(t * 0.6) * 10;
    pointLight2.position.y = -20 + Math.sin(t * 0.5) * 10;
    
    // Enhanced fireflies
    fireflies.forEach(f => {
      const speedMult = f.type === 'small' ? 1.3 : f.type === 'large' ? 0.8 : 1;
      f.mesh.position.x = f.base.x + Math.sin(t*f.speed*speedMult+f.phase)*14 
                        + Math.sin(t*f.speed*1.4+f.phase*2.3)*6
                        + Math.cos(t*f.speed*0.7+f.phase)*3;
      f.mesh.position.y = f.base.y + Math.cos(t*f.speed*1.5+f.phase*1.3)*11 
                        + Math.sin(t*f.speed*0.9)*4
                        + Math.sin(t*f.speed*1.8+f.phase)*2;
      f.mesh.position.z = f.base.z + Math.sin(t*f.speed*0.8+f.phase)*5
                        + Math.cos(t*f.speed*1.2)*2;
      
      const pulse = 0.4 + Math.abs(Math.sin(t*f.flicker+f.phase)*Math.cos(t*f.pulse-f.phase))*0.7;
      f.mesh.material.opacity = pulse;
      
      const scale = 0.8 + Math.sin(t*f.flicker*0.9+f.phase)*0.3;
      f.mesh.scale.setScalar(scale);
      
      if (f.glowMesh) {
        f.glowMesh.position.copy(f.mesh.position);
        f.glowMesh.material.opacity = pulse * 0.3;
        f.glowMesh.scale.setScalar(scale * 1.2);
      }
      
      // Enhanced mouse interaction with velocity
      const dist = Math.sqrt((f.mesh.position.x-mouse.x)**2 + (f.mesh.position.y-mouse.y)**2);
      if(dist < 25) {
        const force = (25-dist)/25;
        f.mesh.position.x += (f.mesh.position.x-mouse.x) * 0.15 * force;
        f.mesh.position.y += (f.mesh.position.y-mouse.y) * 0.15 * force;
        f.mesh.position.x += mouseVelocity.x * 0.5;
        f.mesh.position.y += mouseVelocity.y * 0.5;
      }
    });
    
    // Enhanced vines
    vines.forEach((vine, index) => {
      const pts = [];
      const seg = 1 / vine.segments;
      for(let ti = 0; ti <= 1.001; ti += seg) {
        const x = ti*140-70;
        const baseY = index===0?32:index===1?-24:index===2?10:index===3?-10:18;
        const amp = index===0?15:index===1?11:index===2?20:index===3?13:16;
        const wave = Math.sin(t*1.0+ti*Math.PI*2.5) * amp
                  + Math.cos(ti*19+t*1.8+(index*10))*4
                  + Math.sin(ti*13+t*0.8)*3
                  + Math.cos(ti*25+t*1.2)*2;
        let y = baseY + wave;
        
        // Enhanced mouse wind effect
        const distX = Math.abs(mouse.x - x);
        const distY = Math.abs(mouse.y - y);
        if(distX < 15 && distY < 25) {
          const force = (1 - distX/15) * (1 - distY/25);
          y += Math.cos(t*5+ti*15)*8*force;
          y += mouseVelocity.y * 3 * force;
        }
        
        const z = Math.cos(t*1.5+ti*3+(index*4))*5 
                + Math.sin(t*0.9+ti*6)*3
                + Math.cos(ti*15+t)*2;
        pts.push(new THREE.Vector3(x, y, z));
      }
      vine.line.geometry.setFromPoints(pts);
    });
    
    // Dust particles
    dustParticles.forEach(d => {
      d.mesh.position.x += d.vx;
      d.mesh.position.y += d.vy;
      d.mesh.position.z += d.vz;
      
      if(d.mesh.position.x > 80) d.mesh.position.x = -80;
      if(d.mesh.position.x < -80) d.mesh.position.x = 80;
      if(d.mesh.position.y > 50) d.mesh.position.y = -50;
      if(d.mesh.position.y < -50) d.mesh.position.y = 50;
      
      d.mesh.material.opacity = 0.1 + Math.sin(t * 2 + d.mesh.position.x) * 0.08;
    });
    
    // Enhanced hazes
    hazes.forEach((obj, i) => {
      obj.mesh.position.x += obj.vx;
      obj.mesh.position.y += obj.vy;
      if(obj.mesh.position.x > 90 || obj.mesh.position.x < -90) obj.vx *= -1;
      if(obj.mesh.position.y > 50 || obj.mesh.position.y < -50) obj.vy *= -1;
      
      const breathe = 0.85 + Math.sin(t*obj.pulseSpeed+i)*0.2;
      obj.mesh.scale.setScalar(breathe);
      obj.mesh.material.opacity = (0.06 + Math.sin(t*0.8+i)*0.03);
    });

    // Enhanced Africa animation
    africaParticles.forEach((ap, i) => {
      const pulse = 0.6 + Math.sin(t*1.8 + ap.phase)*0.4;
      ap.mesh.material.opacity = pulse;
      
      ap.mesh.position.x = ap.baseX + Math.sin(t*0.9 + ap.delay)*0.7 + Math.cos(t*1.3)*0.3;
      ap.mesh.position.y = ap.baseY + Math.cos(t*0.7 + ap.delay)*0.6 + Math.sin(t*1.1)*0.2;
      
      const scale = 0.95 + Math.sin(t*2.2 + ap.phase)*0.25;
      ap.mesh.scale.setScalar(scale);
    });
    
    africaGlowSpheres.forEach((ag, i) => {
      const pulse = 0.2 + Math.sin(t*1.5 + ag.phase)*0.2;
      ag.mesh.material.opacity = pulse;
      const scale = 1 + Math.sin(t*1.8 + ag.phase)*0.3;
      ag.mesh.scale.setScalar(scale);
    });

    const linePoints = africaParticles.map(ap => 
      new THREE.Vector3(ap.mesh.position.x, ap.mesh.position.y, -3)
    );
    africaLine.geometry.setFromPoints(linePoints);
    africaLine.material.opacity = 0.5 + Math.sin(t*1.4)*0.2;
    
    const glowLinePoints = africaParticles.map(ap => 
      new THREE.Vector3(ap.mesh.position.x, ap.mesh.position.y, -3.5)
    );
    africaGlowLine.geometry.setFromPoints(glowLinePoints);
    africaGlowLine.material.opacity = 0.3 + Math.sin(t*1.6)*0.15;
    
    // Decay mouse velocity
    mouseVelocity.x *= 0.9;
    mouseVelocity.y *= 0.9;
    
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}
