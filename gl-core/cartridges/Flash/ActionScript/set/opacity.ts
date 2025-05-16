// ActionScript/animation/setOpacity.ts

export type TSetOpacity = {
  opacity: number; // value between 0 and 1
};

export const setOpacity = (
  divId: string,
  options: TSetOpacity = { opacity: 1 }
) => {
  const el = document.getElementById(divId);
  if (!el) {
    console.warn(`setOpacity: div id "${divId}" not found`);
    return;
  }

  const { opacity } = options;

  el.style.opacity = `${opacity}`;

  // Optional: make sure it's visible if opacity > 0
  if (opacity > 0) {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }

  // console.log(`setOpacity: "${divId}" set to opacity ${opacity}`);
};
