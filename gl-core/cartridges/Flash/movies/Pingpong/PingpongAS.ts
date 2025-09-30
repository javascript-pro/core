// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/movies/Pingpong/PingpongAS.ts
import { gsap } from 'gsap';

export default class PingpongAS {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  init() {
    // setup logic goes here
    console.log('PingpongAS', this.id);
  }

  destroy() {
    // cleanup logic goes here
  }
}
