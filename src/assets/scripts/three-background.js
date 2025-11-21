// Three.js background animation
import * as THREE from 'three';

export function initThreeBackground() {
  const container = document.getElementById('three-bg');
  if (!container) return;
  
  // Clear any existing content
  container.innerHTML = '';
  
  // Initialize Three.js
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true 
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  
  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 5000;
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xE48F13, // Orange color
    transparent: true,
    opacity: 0.8
  });
  
  const points = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(points);
  camera.position.z = 5;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    points.rotation.x += 0.0005;
    points.rotation.y += 0.0007;
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  // Start animation
  animate();
  
  // Add event listeners
  window.addEventListener('resize', onWindowResize);
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', onWindowResize);
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}

