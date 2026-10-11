export const presets = {
  hero: { explode: 0, spin: 0, x: 2.4, y: 0, scale: 1, heat: 0.15, fade: 1 },
  problem: { explode: 1, spin: -0.6, x: 2.7, y: 0, scale: 0.95, heat: 1, fade: 0.5 },
  process: { explode: 0.4, spin: 1.6, x: 0, y: 0, scale: 1.15, heat: 0.5, fade: 0.16 },
  features: { explode: 0.15, spin: 2.4, x: 0, y: 0, scale: 1.3, heat: 0.3, fade: 0.12 },
  stack: { explode: 0.7, spin: 3.2, x: 2.8, y: 0, scale: 0.9, heat: 0.4, fade: 0.4 },
  showcase: { explode: 0, spin: 3.9, x: 0, y: 0, scale: 1, heat: 0.2, fade: 0 },
};

export const scene = {
  current: { ...presets.hero },
  target: { ...presets.hero },
};

export const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

export function setPreset(name) {
  const next = presets[name];
  if (next) Object.assign(scene.target, next);
}