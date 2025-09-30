// /cartridges/Flash/movies/Pingpong/PingpongAS.ts
import { gsap } from 'gsap';

export default class PingpongAS {
  private id: string;
  private tl: gsap.core.Timeline | null = null;
  private raf1: number | null = null;
  private raf2: number | null = null;
  private scaleFactor: number = 5; // 5x bigger

  constructor(id: string) {
    this.id = id;
  }

  init() {
    this.raf1 = requestAnimationFrame(() => {
      this.raf2 = requestAnimationFrame(() => this.setup());
    });
  }

  private setup() {
    const stage = document.getElementById(this.id) as HTMLElement | null;
    const ball = document.getElementById(
      'mc_pingpongball',
    ) as HTMLElement | null;

    if (!stage || !ball) {
      console.warn('[PingpongAS] Missing stage or ball element');
      return;
    }

    const svgBall = ball as unknown as SVGGraphicsElement;
    svgBall.style.transformBox = 'fill-box';
    svgBall.style.transformOrigin = '50% 50%';

    // Apply scale once
    gsap.set(ball, { scale: this.scaleFactor, transformOrigin: '50% 50%' });

    const stageRect = stage.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const groundY = stageRect.height - ballRect.height;

    const playCycle = () => {
      const spinDir = Math.random() < 0.5 ? -1 : 1;
      const randomX = gsap.utils.random(
        50,
        stageRect.width - ballRect.width - 50,
      );

      // Kill old tl if any
      if (this.tl) {
        this.tl.kill();
      }

      this.tl = gsap.timeline({
        onComplete: () => {
          // Start a new cycle when this finishes
          playCycle();
        },
      });

      // Reset off-screen
      this.tl.set(ball, {
        x: randomX,
        y: -ballRect.height * 2,
        rotation: 0,
        opacity: 0,
      });

      // Fade + drop
      this.tl.to(ball, {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out',
      });
      this.tl.to(
        ball,
        {
          y: groundY,
          rotation: 180 * spinDir,
          duration: 1.2,
          ease: 'bounce.out',
        },
        '<',
      );

      // Bounce
      this.tl.to(ball, {
        y: groundY - 30,
        rotation: 360 * spinDir,
        duration: 0.5,
        ease: 'power2.out',
      });
      this.tl.to(ball, {
        y: groundY,
        rotation: 540 * spinDir,
        duration: 0.4,
        ease: 'bounce.out',
      });

      // Roll off
      this.tl.to(ball, {
        x: spinDir > 0 ? stageRect.width + 200 : -200,
        rotation: 1080 * spinDir,
        duration: 3,
        ease: 'power1.in',
      });
    };

    // Kick off first cycle
    playCycle();
  }

  destroy() {
    if (this.tl) {
      this.tl.kill();
      this.tl = null;
    }
    if (this.raf1 != null) {
      cancelAnimationFrame(this.raf1);
      this.raf1 = null;
    }
    if (this.raf2 != null) {
      cancelAnimationFrame(this.raf2);
      this.raf2 = null;
    }
  }
}
