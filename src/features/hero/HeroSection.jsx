import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 6 Wall Color Palettes with Hex Codes and Real High-Resolution Room Backgrounds
 */
export const COLOR_PALETTES = [
  {
    id: 1,
    name: 'أرجواني ملكي',
    hex: '#7c3aed',
    bgClass: 'bg-[#7c3aed]',
    img: '/media/images/hero-wall-purple.png',
  },
  {
    id: 2,
    name: 'أزرق ملكي',
    hex: '#1d4ed8',
    bgClass: 'bg-[#1d4ed8]',
    img: '/media/images/hero-wall-blue.png',
  },
  {
    id: 3,
    name: 'فيروزي بحري',
    hex: '#0891b2',
    bgClass: 'bg-[#0891b2]',
    img: '/media/images/hero-wall-teal.png',
  },
  {
    id: 4,
    name: 'أخضر زمردي',
    hex: '#10b981',
    bgClass: 'bg-[#10b981]',
    img: '/media/images/hero-wall-green.png',
  },
  {
    id: 5,
    name: 'أصفر دافئ',
    hex: '#f59e0b',
    bgClass: 'bg-[#f59e0b]',
    img: '/media/images/hero-wall-yellow.png',
  },
  {
    id: 6,
    name: 'رمادي عصري',
    hex: '#94a3b8',
    bgClass: 'bg-[#94a3b8]',
    img: '/media/images/hero-wall-gray.png',
  },
];

/**
 * HeroSection Component
 * 
 * Features:
 * - Full-width hero container displaying living room interior background.
 * - Strict RTL layout with large bold typography on the right.
 * - Horizontal palette of 6 clickable color circles at bottom center.
 * - State-driven active color changer with white ring indicator.
 * - Smooth Framer Motion crossfade transition between background images.
 */
export const HeroSection = () => {
  // Default active color is Royal Blue (id: 2)
  const [activeColor, setActiveColor] = useState(COLOR_PALETTES[1]);

  return (
    <section 
      dir="rtl" 
      className="relative w-full h-[calc(100vh-64px)] min-h-[560px] max-h-[920px] overflow-hidden select-none bg-slate-900"
    >
      {/* 1. Crossfading Living Room Background Images with Framer Motion */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={activeColor.id}
            src={activeColor.img}
            alt={`جدار صالون عصري بدهان ${activeColor.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-[center_45%] sm:object-center pointer-events-none"
          />
        </AnimatePresence>
      </div>

      {/* 2. Readability Gradient Overlay on the Right (Ensures text pops on all wall colors) */}
      <div 
        className="absolute inset-0 bg-gradient-to-l from-black/45 via-black/15 to-transparent pointer-events-none" 
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

      {/* 4. Horizontal Color Palette (6 circles at bottom center) */}
      <div 
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 sm:gap-4 select-none"
        role="group"
        aria-label="محدد ألوان الدهان التفاعلي"
      >
        {COLOR_PALETTES.map((color) => {
          const isActive = activeColor.id === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => setActiveColor(color)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 transform cursor-pointer outline-none ${
                color.bgClass
              } ${
                isActive
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-black/30 scale-110 shadow-2xl'
                  : 'opacity-85 hover:opacity-100 hover:scale-110 shadow-md'
              }`}
              title={color.name}
              aria-label={`اختيار لون ${color.name}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
