import { gsap } from 'gsap';

type ClickRec = { el: Element; fn: EventListener };
type LogoASOptions = {
  onNavigate?: () => void;
};

export default class LogoAS {
  private id: string;
  private resizeHandler: (() => void) | null = null;
  private clickHandlers: ClickRec[] = [];
  private wrappers = new Map<Element, SVGGElement>();
  private onNavigate?: () => void;

  constructor(id: string, options: LogoASOptions = {}) {
    this.id = id;
    this.onNavigate = options.onNavigate;
  }

  init() {
    this.setup();
    this.resizeHandler = () => this.centerLogo();
    window.addEventListener('resize', this.resizeHandler);
  }

  setup() {
    const logoEl = document.getElementById(this.id);
    if (!logoEl) return;

    gsap.set(logoEl, { clearProps: 'transform,opacity,filter' });

    const { offsetX, offsetY, scale } = this.calculateCenter(logoEl);

    const tl = gsap.timeline({
      onComplete: () => {
        this.prepareTargets(logoEl);
        this.attachClickHandlers();
        this.wave(0.1);
      },
    });

    tl.fromTo(
      logoEl,
      {
        autoAlpha: 0,
        x: offsetX,
        y: offsetY,
        scale,
        transformOrigin: 'center center',
      },
      {
        autoAlpha: 1,
        x: offsetX,
        y: offsetY,
        scale,
        transformOrigin: 'center center',
        duration: 1,
        ease: 'power3.out',
      },
    );
  }

  private calculateCenter(el: HTMLElement) {
    gsap.set(el, { clearProps: 'transform' });
    const stage = el.parentElement as HTMLElement;
    if (!stage) return { offsetX: 0, offsetY: 0, scale: 1 };

    const stageRect = stage.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    const scaleX = (stageRect.width * 0.9) / rect.width;
    const scaleY = (stageRect.height * 0.9) / rect.height;
    const scale = Math.min(scaleX, scaleY, 1);

    const centerX = stageRect.left + stageRect.width / 2;
    const centerY = stageRect.top + stageRect.height / 2;
    const logoCenterX = rect.left + rect.width / 2;
    const logoCenterY = rect.top + rect.height / 2;

    return {
      offsetX: centerX - logoCenterX,
      offsetY: centerY - logoCenterY,
      scale,
    };
  }

  private centerLogo() {
    const logoEl = document.getElementById(this.id);
    if (!logoEl) return;

    const { offsetX, offsetY, scale } = this.calculateCenter(logoEl);
    gsap.to(logoEl, {
      x: offsetX,
      y: offsetY,
      scale,
      transformOrigin: 'center center',
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  private prepareTargets(container: HTMLElement) {
    this.detachClickHandlers();
    this.wrappers.clear();

    const selector =
      '[id]:not(svg):not(defs):not(clipPath):not(mask):not(pattern):not(linearGradient):not(radialGradient):not(marker):not(title):not(desc):not(metadata)';
    const nodes = Array.from(container.querySelectorAll<Element>(selector)).filter(
      (el) => (el as HTMLElement).id !== this.id,
    );

    nodes.forEach((el) => {
      if (this.wrappers.has(el)) return;

      if (el.tagName.toLowerCase() === 'g') {
        (el as SVGElement).style.transformBox = 'fill-box';
        (el as SVGElement).style.transformOrigin = '50% 50%';
        (el as SVGElement).style.cursor = 'pointer';
        gsap.set(el, { transformOrigin: '50% 50%' });
        this.wrappers.set(el, el as SVGGElement);
        return;
      }

      const parent = el.parentNode;
      if (!parent) return;

      const ns = 'http://www.w3.org/2000/svg';
      const wrap = document.createElementNS(ns, 'g');
      (wrap as SVGElement).style.transformBox = 'fill-box';
      (wrap as SVGElement).style.transformOrigin = '50% 50%';
      (wrap as SVGElement).style.cursor = 'pointer';

      const existingSVGTransform = (el as SVGGraphicsElement).getAttribute('transform');
      if (existingSVGTransform) {
        wrap.setAttribute('transform', existingSVGTransform);
        (el as SVGGraphicsElement).removeAttribute('transform');
      }

      const cssTx = (el as SVGElement).style.transform;
      if (cssTx && cssTx !== 'none') {
        (wrap as SVGElement).style.transform = cssTx;
        (el as SVGElement).style.transform = '';
      }

      parent.insertBefore(wrap, el);
      wrap.appendChild(el);
      gsap.set(wrap, { transformOrigin: '50% 50%' });
      this.wrappers.set(el, wrap);
    });
  }

  private attachClickHandlers() {
    this.detachClickHandlers();

    this.wrappers.forEach((wrap, el) => {
      const clickFn = () => {
        this.shake(wrap);

        // Optional: delay navigation slightly after the shake
        if (this.onNavigate) {
          setTimeout(() => this.onNavigate?.(), 300);
        }
      };

      el.addEventListener('click', clickFn);
      this.clickHandlers.push({ el, fn: clickFn });
    });
  }

  private detachClickHandlers() {
    this.clickHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
    this.clickHandlers = [];
  }

  private shake(target: Element) {
    gsap.killTweensOf(target);
    gsap.fromTo(
      target,
      { x: -2, rotation: -1, transformOrigin: '50% 50%' },
      {
        x: 2,
        rotation: 1,
        duration: 0.1,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 5,
        onComplete: () => gsap.set(target, { x: 0, rotation: 0 }),
      },
    );
  }

  wave(stagger: number = 0.1) {
    const items = Array.from(this.wrappers.values());
    if (items.length === 0) return;

    const sorted = items.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
    const tl = gsap.timeline();
    sorted.forEach((wrap, i) => tl.add(() => this.shake(wrap), i * stagger));
  }

  destroy() {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
    this.detachClickHandlers();
    this.wrappers.clear();
  }
}
