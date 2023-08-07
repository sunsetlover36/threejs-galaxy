import * as THREE from 'three';

import { galaxyParameters } from './parameters';
import { getRandomPos } from './utils';
import { scene } from './scene';

export let geometry,
  material,
  points = null;
export const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  const {
    count,
    size,
    radius,
    branches,
    spin,
    insideColor: insideColorStr,
    outsideColor: outsideColorStr,
  } = galaxyParameters;

  const positions = new Float32Array(count * 3);

  const colors = new Float32Array(count * 3);
  const insideColor = new THREE.Color(insideColorStr);
  const outsideColor = new THREE.Color(outsideColorStr);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const randomRadius = Math.random() * radius;
    const spinAngle = randomRadius * spin;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;

    const [randomX, randomY, randomZ] = new Array(3)
      .fill(null)
      .map(() => getRandomPos(galaxyParameters));

    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, randomRadius / radius);
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    positions[i3] = Math.cos(branchAngle + spinAngle) * randomRadius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * randomRadius + randomZ;
  }

  geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
  });
  points = new THREE.Points(geometry, material);
  scene.add(points);
};
