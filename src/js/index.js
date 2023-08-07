import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import screenfull from 'screenfull';

import { scene } from './scene';
import { generateGalaxy, points } from './galaxy';

import './gui';
import '../css/style.css';

THREE.ColorManagement.enabled = false;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Galaxy
 */
generateGalaxy();

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

/**
 * Clock
 */
const clock = new THREE.Clock();

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('webgl');
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(sizes.width, sizes.height);

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height);
  });
  window.addEventListener('dblclick', () => {
    if (!screenfull.isFullscreen) {
      screenfull.request(canvas);
    } else {
      screenfull.exit();
    }
  });

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    if (points !== null) {
      points.rotation.y = elapsedTime * 0.1;
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();
});
