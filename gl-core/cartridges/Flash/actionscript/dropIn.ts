// /app/src/Flash/actionscript/dropIn.ts
import { gsap } from 'gsap';

export type TDropInOptions = {
  speed?: number; // factor to slow down/speed up animation
};

/**
 * dropIn — animate a bolt dropping into the stage (with configurable speed)
 * @param id - the DOM id of the movieclip element (set in the Flash movie)
 * @param options - dropIn configuration (speed, etc.)
 */
export default function dropIn(id: string, options: TDropInOptions = {}) {
  const { speed = 10 } = options;

  const target = document.getElementById(id);

  if (!target) {
    console.warn(`[ActionScript] dropIn: No element found with id "${id}"`);
    return;
  }

  const stage = target.parentElement;
  if (!stage) {
    console.warn(`[ActionScript] dropIn: No parent stage found for id "${id}"`);
    return;
  }

  const stageRect = stage.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  // center horizontally
  const centerX = stageRect.width - targetRect.width;

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  // Start above stage, horizontally centered
  gsap.set(target, {
    x: centerX - 100 + stageRect.width / 2,
    y: -targetRect.height,
    transformOrigin: '50% 100%',
    opacity: 1,
  });

  // Drop into center with bounce
  tl.to(target, {
    y: 100,
    duration: 0.8 * speed,
    ease: 'bounce.out',
  });

  return tl;
}
