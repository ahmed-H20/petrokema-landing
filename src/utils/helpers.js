/**
 * Merges class names cleanly, filtering out falsy values.
 * @param  {...(string|boolean|undefined|null)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Delays execution for a given number of milliseconds (useful for simulating network responses).
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncates text with an ellipsis if it exceeds the specified maximum length.
 * @param {string} text 
 * @param {number} maxLen 
 * @returns {string}
 */
export function truncate(text, maxLen = 80) {
  if (!text) return '';
  return text.length > maxLen ? text.substring(0, maxLen) + '...' : text;
}
