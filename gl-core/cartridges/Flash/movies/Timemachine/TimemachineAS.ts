import { gsap } from 'gsap';

export default class TimemachineAS {
  private stageId: string;
  private movieId: string;
  private tl: gsap.core.Timeline | null = null;
  private raf1: number | null = null;
  private raf2: number | null = null;
  private scaleFactor = 3;

  constructor(stageId: string, movieId: string) {
    this.stageId = stageId;
    this.movieId = movieId;
  }

  init() {
    this.raf1 = requestAnimationFrame(() => {
      this.raf2 = requestAnimationFrame(() => this.setup());
    });
  }

  private setup() {
    const stage = document.getElementById(this.stageId);
    const machine = document.getElementById('mc_machine');

    if (!stage || !machine) {
      console.warn(
        `[TimemachineAS] Missing stage (${this.stageId}) or machine element`,
      );
      return;
    }

    const svgMachine = machine as unknown as SVGGraphicsElement;
    svgMachine.style.transformBox = 'fill-box';
    svgMachine.style.transformOrigin = '50% 50%';

    const stageRect = stage.getBoundingClientRect();
    const machineRect = machine.getBoundingClientRect();

    const startX = stageRect.width / 2 - machineRect.width / 2;
    const startY = -machineRect.height * 1.2;
    const groundY = stageRect.height - machineRect.height;

    gsap.set(machine, {
      x: startX,
      y: startY,
      scale: this.scaleFactor,
      opacity: 1,
      transformOrigin: '50% 50%',
    });

    if (this.tl) this.tl.kill();

    this.tl = gsap.timeline();

    this.tl.to(machine, { y: groundY, duration: 1.4, ease: 'bounce.out' });
    this.tl.to(machine, {
      y: groundY - 10,
      duration: 0.25,
      ease: 'power1.out',
    });
    this.tl.to(machine, { y: groundY, duration: 0.3, ease: 'bounce.out' });
  }

  destroy() {
    this.tl?.kill();
    if (this.raf1) cancelAnimationFrame(this.raf1);
    if (this.raf2) cancelAnimationFrame(this.raf2);
    this.tl = this.raf1 = this.raf2 = null;
  }
}
