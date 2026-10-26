import { useState } from 'react';
import { HERO_COLOR_PALETTES } from '@/utils/constants';

/**
 * Custom local hook for hero color palette interactive switching
 */
export function useHeroColors() {
  const [activeColor, setActiveColor] = useState(HERO_COLOR_PALETTES[0]);

  const selectColor = (paletteId) => {
    const found = HERO_COLOR_PALETTES.find((c) => c.id === paletteId);
    if (found) {
      setActiveColor(found);
    }
  };

  return {
    palettes: HERO_COLOR_PALETTES,
    activeColor,
    selectColor,
  };
}

export default useHeroColors;
