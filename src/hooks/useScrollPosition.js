import { useState, useEffect } from 'react';

/**
 * Tracks window scroll position to toggle sticky headers or floating actions.
 * @param {number} threshold Number of pixels scrolled before 'scrolled' becomes true
 * @returns {{ scrolled: boolean, scrollY: number }}
 */
export function useScrollPosition(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrolled(currentScrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrolled, scrollY };
}

export default useScrollPosition;
