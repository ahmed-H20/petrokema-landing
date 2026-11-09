// Aligns the framing of the older hero wall photos (jpg) with the newer baked
// wall images (webp), which are cropped slightly tighter. Both images are shown
// with object-fit: cover, so the artwork frame lands in different places per
// viewport. We measure the artwork frame in each image once (fractions of the
// image) and compute a transform for the old images so their frame matches the
// new ones at the current container size. Image files are never modified.

const OLD = { w: 1376, h: 768, frame: { l: 580.5, r: 844, t: 191.5, b: 435 } };
const NEW = { w: 1306, h: 816, frame: { l: 522, r: 793.5, t: 209.5, b: 461 } };

// Where the frame sits on screen for an image shown with object-fit: cover.
function frameOnScreen(img, cw, ch, posX, posY) {
  const k = Math.max(cw / img.w, ch / img.h);
  const w = img.w * k;
  const h = img.h * k;
  const ox = (cw - w) * posX;
  const oy = (ch - h) * posY;
  const { l, r, t, b } = img.frame;
  return {
    cx: ox + ((l + r) / 2) * k,
    cy: oy + ((t + b) / 2) * k,
    w: (r - l) * k,
    h: (b - t) * k,
  };
}

/**
 * Styles for an old wall image so its artwork frame matches the new images.
 * Horizontal alignment uses object-position first (the photo has spare width
 * when the container is narrow), the rest is a transform. Scale never drops
 * below 1 so the image keeps covering the container.
 */
export function getOldWallStyle(cw, ch, posY = 0.5) {
  if (!cw || !ch) return undefined;
  const n = frameOnScreen(NEW, cw, ch, 0.5, posY);
  const o0 = frameOnScreen(OLD, cw, ch, 0.5, posY);

  const s = Math.max(1, (n.w / o0.w + n.h / o0.h) / 2);
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  // Spare width of the old photo inside the container (0 when width-bound)
  const k = Math.max(cw / OLD.w, ch / OLD.h);
  const spare = cw - OLD.w * k; // <= 0
  let posX = 0.5;
  if (spare < -1) {
    const frameInImg = ((OLD.frame.l + OLD.frame.r) / 2) * k;
    posX = clamp((n.cx / s - frameInImg) / spare, 0, 1);
  }

  const o = frameOnScreen(OLD, cw, ch, posX, posY);
  const tx = clamp(n.cx - s * o.cx, cw * (1 - s), 0);
  const ty = clamp(n.cy - s * o.cy, ch * (1 - s), 0);

  return {
    transformOrigin: '0 0',
    transform: `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${s.toFixed(4)})`,
    objectPosition: `${(posX * 100).toFixed(2)}% ${(posY * 100).toFixed(0)}%`,
  };
}
