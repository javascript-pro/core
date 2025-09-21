// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/actionscript/pingpongball.tsx

// homage to ActionScript — but really just TypeScript with .as extension
import { gsap } from 'gsap';

export type TFlashMovieOptions = {
  target: SVGCircleElement;
  color: string;
  loop: boolean;
};

/**
 * pingpongball — starts tiny, waits briefly,
 * zooms in with a twist, then snaps back and stops.
 */
export default function pingpongball({
  target,
  color,
  loop,
}: TFlashMovieOptions) {
  const tl = gsap.timeline({
    repeat: loop ? -1 : 0,
    delay: 0.75, // wait 333ms before starting
  });

  // set initial state
  gsap.set(target, {
    scale: 0.1,
    rotation: 0,
    transformOrigin: '50% 50%',
    fill: color,
  });

  // animate up
  tl.to(target, {
    scale: 4.25,
    rotation: 45,
    duration: 0.5,
    ease: 'power3.out',
  });

  // snap back
  tl.to(target, {
    scale: 4,
    rotation: 0,
    duration: 0.2,
    ease: 'power2.out',
  });

  return tl;
}
