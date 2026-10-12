export const sceneState = {
  /** Page scroll progress in [0, 1]. 0 = top, 1 = bottom. */
  scroll: 0,
};

export function readScrollProgress() {
  if (typeof window === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}

let bound = false;
let unbind: (() => void) | null = null;

/** Bind window scroll/resize to sceneState.scroll. Safe to call more than once. */
export function bindSceneScroll() {
  if (typeof window === "undefined") return () => {};
  if (bound && unbind) return unbind;

  const update = () => {
    sceneState.scroll = readScrollProgress();
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  bound = true;
  unbind = () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    bound = false;
    unbind = null;
  };
  return unbind;
}

export function setSceneScroll(value: number) {
  sceneState.scroll = Math.min(1, Math.max(0, value));
}
