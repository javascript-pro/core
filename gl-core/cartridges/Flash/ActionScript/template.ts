// ActionScript/animation/template.ts

// import { gsap } from 'gsap';

export type TTemplate = {
  option1?: number;
};

export const template = (
  divId: string,
  options: TTemplate = {
    option1: 1,
  },
) => {
  const el = document.getElementById(divId);
  if (!el) {
    console.warn(`template: div id "${divId}" not found`);
    return;
  }
  console.log('setOpacity options', options);
};
