// /app/src/Flash/actionscript/index.ts
import dropIn from './dropIn';

export default class ActionScript {
  private target: HTMLElement | null;

  constructor(target?: HTMLElement | null) {
    this.target = target || null;
  }

  init() {
    if (this.target) {
      console.log('[ActionScript] init called on', this.target);
      // Simple example: flash the background
      this.target.style.transition = 'background 0.5s ease';
      this.target.style.background = 'yellow';
      setTimeout(() => {
        if (this.target) this.target.style.background = '';
      }, 1000);
    } else {
      console.log('[ActionScript] init called with no target');
    }
  }

  setup(id: string, options: any) {
    setTimeout(() => {
      dropIn(id, options);
    }, 0)
    
  }
}
