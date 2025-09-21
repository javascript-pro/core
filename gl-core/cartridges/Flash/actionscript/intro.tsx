// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/actionscript/intro.as
import { gsap } from 'gsap';

export type TFlashMovieOptions = {
  target: SVGCircleElement;
  color: string;
  loop: boolean;
  onComplete?: () => void;
  alreadyDone?: boolean;
};

/**
 * intro — starts tiny, waits briefly,
 * zooms in with a twist, then snaps back and stops.
 */
export default function intro({
  target,
  color,
  loop,
  onComplete,
  alreadyDone = false,
}: TFlashMovieOptions) {
  if (alreadyDone) {
    gsap.set(target, {
      scale: 6,
      rotation: 0,
      transformOrigin: '50% 50%',
      fill: color,
    });
    return undefined;
  }

  const tl = gsap.timeline({
    repeat: loop ? -1 : 0,
    delay: 0.25,
    onComplete,
  });

  // set initial state
  gsap.set(target, {
    scale: 0,
    rotation: -45,
    transformOrigin: '50% 50%',
    fill: color,
  });

  // animate up
  tl.to(target, {
    scale: 8,
    rotation: 145,
    duration: 0.75,
    ease: 'power3.out',
  });

  // snap back
  tl.to(target, {
    scale: 6,
    rotation: 0,
    duration: 0.5,
    ease: 'power2.out',
  });

  return tl;
}
