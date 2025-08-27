import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { component } from '../dispatcher';
import renderer from './renderer';

class Camera extends component(PerspectiveCamera) {
  constructor() {
    super(35, 0, 0.1, 10000);
  }

  init() {
    this.position.set(10, 10, 10);
    this.lookAt(new Vector3(0, 0, 0));
    this.initOrbitControl();
  }

  initOrbitControl() {
    this.controls = new OrbitControls(this, renderer.domElement);
    this.controls.screenSpacePanning = false;
    this.controls.enabled = true;
    this.controls.enableDamping = true;

    this.controls.maxDistance = 1500;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2;

    this.controls.minDistance = 0;
  }

  calculateUnitSize(distance = this.position.z) {
    const vFov = (this.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * this.aspect;

    return {
      width,
      height,
    };
  }

  onResize({ ratio }) {
    this.aspect = ratio;
    this.unit = this.calculateUnitSize();
    this.updateProjectionMatrix();
  }

  onRaf() {
    this.controls.update();
  }
}

const cameraInstance = new Camera();
export default cameraInstance;
