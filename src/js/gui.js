import GUI from 'lil-gui';

import { galaxyParameters } from './parameters';
import { generateGalaxy } from './galaxy';

const gui = new GUI({ width: 360 });
gui
  .add(galaxyParameters, 'count')
  .min(100)
  .max(50000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParameters, 'size')
  .min(0.01)
  .max(0.2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParameters, 'radius')
  .min(0.01)
  .max(20)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParameters, 'branches')
  .min(2)
  .max(10)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParameters, 'spin')
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParameters, 'randomness')
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParameters, 'randomnessPower')
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(galaxyParameters, 'insideColor').onFinishChange(generateGalaxy);
gui.addColor(galaxyParameters, 'outsideColor').onFinishChange(generateGalaxy);
