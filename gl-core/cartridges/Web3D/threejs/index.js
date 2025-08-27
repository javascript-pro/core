import {
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  SphereGeometry,
  MeshMatcapMaterial,
} from 'three';
import dispatcher from './utils/dispatcher.js';

import camera from './core/camera.js';
import { component } from './dispatcher';
import loader from './utils/loader';
import renderer from './core/renderer.js';
import scene from './core/scene';
import { Grid } from './helpers/Grid/Grid';
// import postfx from '@/canvas/postfx/postfx';
import TileManager from './tile/TileManager.js';
let stats = null;
let gui = null;
// disable auto update
// Object3D.DEFAULT_MATRIX_AUTO_UPDATE = false;
// Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = false;
class Viewer extends component(null, {
  raf: {
    renderPriority: Infinity, // always render in last the loop
    fps: Infinity, // no throttle to the render RAF
  },
}) {
  init() {
    console.log('INIT');

    loader.preload();
    this.renderer = renderer;
    setTimeout(() => {
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = 0;
      renderer.domElement.style.left = 0;
      renderer.domElement.style.zIndex = -1;
      document.body.appendChild(renderer.domElement);
    }, 1000);
    new Grid();

    this.tileManager = new TileManager(camera);
    scene.add(this.tileManager);
    camera.controls.addEventListener('change', () => {
      this.tileManager.update?.();
    });
    this.tileManager.update?.();
    this.cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshMatcapMaterial({
        matcap: loader.resources.matcap.asset,
        color: 0xff0000,
      }),
    );
    this.sphere = new Mesh(
      new SphereGeometry(1, 50, 50),
      new MeshMatcapMaterial({
        matcap: loader.resources.matcap.asset,
        color: 0x0000ff,
      }),
    );
    this.cube.position.set(2, 5, 0);
    this.sphere.position.set(-2, 5, 0);
    scene.add(this.cube);
    scene.add(this.sphere);
  }

  setCubeVisibility(visible) {
    this.cube.visible = visible;
  }
  setSphereVisibility(visible) {
    this.sphere.visible = visible;
  }

  setDebugUIVisibility(visible) {
    if (stats) {
      stats.dom.style.display = visible ? 'block' : 'none';
    }
    if (gui) {
      gui.domElement.style.display = visible ? 'block' : 'none';
    }
  }

  onRaf() {
    renderer.render(scene, camera);
    // postprocess
    // postfx.render(scene, camera);
  }
  onAfterRaf() {
    if (!stats) return;
    stats.update();
  }
  onDebug() {
    if (stats) {
      document.body.appendChild(stats.dom);
      stats.init(renderer);
    }
  }
  onLoadEnd() {}
}

function init({ debug = false } = {}) {
  // Use debugMode to control debug-specific features
  if (debug) {
    console.log('🏗️ Debug mode is enabled');

    import('stats-gl').then((module) => {
      stats = new module.default();

      import('lil-gui').then((module) => {
        gui = new module.GUI();
        // Do something with gui

        dispatcher.trigger(
          { name: 'debug', fireAtStart: true },
          {
            gui,
          },
        );
      });
    });
  }

  const viewer = new Viewer();
  return viewer;
}

export { init, dispatcher };
