// Loads and decodes an image ahead of time so it can be shown without a blank frame.
// Results are cached per URL; failed loads are dropped from the cache so they can be retried.
const cache = new Map();

/**
 * @param {string} src
 * @returns {Promise<boolean>} true once the image is loaded and decoded, false if it failed
 */
export function preloadImage(src) {
  if (!src) return Promise.resolve(false);
  if (cache.has(src)) return cache.get(src);

  const promise = new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      // decode() makes sure the first paint is ready, but a decode hiccup should not block the swap
      (img.decode ? img.decode() : Promise.resolve()).then(() => resolve(true), () => resolve(true));
    };
    img.onerror = () => {
      cache.delete(src);
      resolve(false);
    };
    img.src = src;
  });

  cache.set(src, promise);
  return promise;
}

export default preloadImage;
