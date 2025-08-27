import { WebGLRenderer } from 'three';

import { component } from '../dispatcher';
import settings from '../data/settings';

class Renderer extends component(WebGLRenderer) {
  constructor() {
    super({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });

    this.setPixelRatio(settings.dpr);
  }

  onDebug({gui}) {
    this.gui = gui.addFolder('Renderer');

    this.gui._calls = this.gui.add(this.info.render, 'calls')
      .disable()
   this.gui._triangles = this.gui.add(this.info.render, 'triangles')
      .disable()
      console.log('this.gui._calls: ', this.gui._calls);

  }

  onRaf({ delta, elapsedTime }) {
    if (this.gui) {
      this.gui._calls.updateDisplay();
      this.gui._triangles.updateDisplay();

    }
  }

  onResize({ width, height }) {
    this.setSize(width, height);
  }
}

const rendererInstance = new Renderer();
export default rendererInstance;
