import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { HERO_COLOR_PALETTES } from '@/utils/constants';

export const COLOR_PALETTES = HERO_COLOR_PALETTES;

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
  const [activeColor, setActiveColor] = useState(HERO_COLOR_PALETTES[0]);

  return (
    <section 
      dir="rtl" 
      className="relative w-full h-[calc(100vh-64px)] min-h-[560px] max-h-[920px] overflow-hidden select-none bg-slate-900"
    >
      {/* 1. Crossfading Living Room Background Images with Framer Motion */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activeColor.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeColor.img}
              alt={`جدار صالون عصري بدهان ${activeColor.name}`}
              className="w-full h-full object-cover object-[center_45%] sm:object-center pointer-events-none"
            />
            {/* Color blend overlay harmonizing wall tone to exact hex */}
            <div
              className="absolute inset-0 mix-blend-color opacity-35 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: activeColor.hex }}
            />
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
            style={{ backgroundColor: activeColor.hex }}
          />
          <span>اللون: {activeColor.name}</span>
          {activeColor.nameEn && (
            <span className="text-white/70 text-xs font-normal">({activeColor.nameEn})</span>
          )}
        </div>

        {/* Color Circles Container */}
        <div className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl overflow-x-auto max-w-[94vw] sm:max-w-2xl md:max-w-3xl scrollbar-none scroll-smooth">
          {COLOR_PALETTES.map((color) => {
            const isActive = activeColor.id === color.id;
            const isLight = color.hex.toLowerCase() === '#f3efe5' || color.hex.toLowerCase() === '#d6c3a5' || color.hex.toLowerCase() === '#ffffff';
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setActiveColor(color)}
                style={{ backgroundColor: color.hex }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 transform cursor-pointer outline-none relative shrink-0 border border-black/10 ${
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
