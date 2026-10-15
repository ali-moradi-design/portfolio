/**
 * Runs before the first paint: marks <html data-motion> unless the visitor
 * asked for less motion, so content waiting for a reveal starts hidden
 * instead of flashing (see the [data-reveal] rules in globals.css).
 */
export const motionScript = `(function(){try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.motion=""}catch(e){}})();`;
