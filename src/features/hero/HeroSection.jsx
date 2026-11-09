import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { HERO_COLOR_PALETTES, DEFAULT_HERO_COLOR } from '@/utils/constants';
import { preloadImage } from '@/utils/preloadImage';
import { getOldWallStyle } from '@/utils/wallFraming';

export const COLOR_PALETTES = HERO_COLOR_PALETTES;

// Perceived luminance check so the active check mark stays visible on light swatches
const isLightHex = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.72;
};

/**
 * HeroSection Component
 * 
 * Features:
 * - High-definition master interior room background with crystal clarity.
 * - Interactive color switcher with 10 exact paint shades & color codes.
 * - Strict RTL layout with prominent Arabic typography on the right.
 * - Horizontal glassmorphic palette with active color indicator and code tooltip.
 * - Smooth Framer Motion crossfade transition between wall colors.
 */
export const HeroSection = () => {
  // Default active color is Blue (id: 'blue', code: '921')
  // selectedColor drives the swatch bar + tooltip immediately; wallColor is what the wall shows.
  // They differ only while a lazy (baked) wall image is still loading.
  const [selectedColor, setSelectedColor] = useState(DEFAULT_HERO_COLOR);
  const [wallColor, setWallColor] = useState(DEFAULT_HERO_COLOR);
  const wallColorRef = useRef(wallColor);
  const latestIdRef = useRef(selectedColor.id);
  const activeBtnRef = useRef(null);
  const wallBoxRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  // Track the wall container size so the older (looser) wall photos can be
  // zoomed/shifted to match the framing of the newer baked images.
  useLayoutEffect(() => {
    const el = wallBoxRef.current;
    if (!el) return undefined;
    const update = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Matches the img's object-position: center 45% below sm (640px), center from sm up
  const oldWallStyle = getOldWallStyle(box.w, box.h, box.w >= 640 ? 0.5 : 0.45);

  // Keep the selected swatch visible inside the horizontally scrolling bar (no page scroll)
  useEffect(() => {
    activeBtnRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [selectedColor]);

  // Preload the lazy wall images one at a time during browser idle time, after the page has loaded
  useEffect(() => {
    const queue = HERO_COLOR_PALETTES.filter((c) => c.baked).map((c) => c.img);
    let cancelled = false;
    let handle;
    const schedule = (fn) => {
      if (typeof window.requestIdleCallback === 'function') {
        handle = window.requestIdleCallback(fn, { timeout: 4000 });
      } else {
        handle = window.setTimeout(fn, 300);
      }
    };
    const next = () => {
      if (cancelled || queue.length === 0) return;
      preloadImage(queue.shift()).then(() => !cancelled && schedule(next));
    };
    const start = () => schedule(next);
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', start);
      if (handle !== undefined) {
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(handle);
        window.clearTimeout(handle);
      }
    };
  }, []);

  const warmUp = (color) => {
    if (color.baked) preloadImage(color.img);
  };

  const selectColor = (color) => {
    setSelectedColor(color);
    latestIdRef.current = color.id;
    if (!color.baked) {
      wallColorRef.current = color;
      setWallColor(color);
      return;
    }
    // Only crossfade once the new wall is loaded and decoded (no flash / blank frame)
    preloadImage(color.img).then((ok) => {
      if (latestIdRef.current !== color.id) return; // a newer click took over
      if (ok) {
        wallColorRef.current = color;
        setWallColor(color);
      } else {
        setSelectedColor(wallColorRef.current); // image failed: keep the current wall and selection
      }
    });
  };

  return (
    <section 
      dir="rtl" 
      className="relative w-full h-[100vw] min-h-[340px] sm:h-[calc(100vh-64px)] sm:min-h-[560px] max-h-[920px] overflow-hidden select-none bg-slate-900"
    >
      {/* 1. Crossfading Living Room Background Images with Framer Motion */}
      <div ref={wallBoxRef} className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={wallColor.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={wallColor.img}
              alt={`جدار صالون عصري بدهان ${wallColor.name}`}
              className="w-full h-full object-cover object-[center_45%] sm:object-center pointer-events-none"
              style={wallColor.baked ? undefined : oldWallStyle}
            />
            {/* Color blend overlay harmonizing wall tone to exact hex (baked images already carry the color) */}
            {!wallColor.baked && (
              <div
                className="absolute inset-0 mix-blend-color opacity-35 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: wallColor.hex }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Readability Gradient Overlay on the Right */}
      <div 
        className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/20 to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      {/* 3. Floating Arabic Typography Content on the Right */}
      <div className="absolute top-[42%] sm:top-[45%] -translate-y-1/2 right-6 sm:right-12 md:right-16 lg:right-24 xl:right-32 z-10 text-right max-w-lg lg:max-w-xl">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.25] drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
          <span className="block mb-1 sm:mb-2 text-white">
            كل لون....
          </span>
          <span className="text-[#f25b29] block">
            حكاية بيت...
          </span>
        </h1>

        <p className="mt-3 sm:mt-5 text-sm sm:text-lg lg:text-xl font-bold text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          دهانات عالية الجودة ، لحماية وجمال يدوم
        </p>
      </div>

      {/* 4. Horizontal Color Palette (curated paint colors with live preview) */}
      <div 
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 select-none w-auto max-w-[95%]"
        role="group"
        aria-label="محدد ألوان الدهان التفاعلي"
      >
        {/* Active Color Info Tooltip (بدون أكواد) */}
        <div className="bg-black/75 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/15 flex items-center gap-2 sm:gap-2.5">
          <span
            className="w-3 h-3 rounded-full border border-white/50 shadow-xs shrink-0"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <span>اللون: {selectedColor.name}</span>
          {selectedColor.nameEn && (
            <span className="text-white/70 text-xs font-normal">({selectedColor.nameEn})</span>
          )}
          {selectedColor.code && (
            <span dir="ltr" className="text-white/50 text-[10px] sm:text-[11px] font-normal tracking-wide [unicode-bidi:isolate]">
              {selectedColor.code}
            </span>
          )}
        </div>

        {/* Color Circles Container */}
        <div className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl overflow-x-auto overscroll-x-contain touch-pan-x snap-x max-w-[94vw] sm:max-w-2xl md:max-w-3xl scrollbar-none scroll-smooth">
          {COLOR_PALETTES.map((color, idx) => {
            const isActive = selectedColor.id === color.id;
            const isLight = isLightHex(color.hex);
            return (
              <React.Fragment key={color.id}>
              <button
                ref={isActive ? activeBtnRef : null}
                type="button"
                onClick={() => selectColor(color)}
                onMouseEnter={() => warmUp(color)}
                onFocus={() => warmUp(color)}
                onTouchStart={() => warmUp(color)}
                style={{ backgroundColor: color.hex }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 transform cursor-pointer outline-none relative shrink-0 snap-center border border-black/10 ${
                  isActive
                    ? 'ring-3 ring-white ring-offset-2 ring-offset-black/60 scale-120 shadow-2xl'
                    : 'opacity-85 hover:opacity-100 hover:scale-110 shadow-md'
                }`}
                title={`${color.name}${color.nameEn ? ` (${color.nameEn})` : ''}`}
                aria-label={`اختيار لون ${color.name}`}
              >
                {isActive && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Check
                      className={`w-3.5 h-3.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    />
                  </span>
                )}
              </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
