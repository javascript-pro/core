// homage to ActionScript — but really just TypeScript with .as extension
import { gsap } from 'gsap';

export type TFlashMovieOptions = {
  target: SVGCircleElement;
  color: string;
  loop: boolean;
};

/**
 * default_movie — a simple GSAP animation
 * Expands and shrinks a circle while moving it across the stage.
 */
export default function defaultMovie({
  target,
  color,
  loop,
}: TFlashMovieOptions) {
  const tl = gsap.timeline({
    repeat: loop ? -1 : 0,
    defaults: { duration: 1, ease: 'power1.inOut' },
  });

  tl.to(target, { attr: { r: 50 }, fill: color })
    .to(target, { x: 100 })
    .to(target, { x: 0, attr: { r: 30 } });

  return tl;
}
