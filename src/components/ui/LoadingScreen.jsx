import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ASSETS } from '../../utils/constants';

const LOGO_SRC = ASSETS.preloaderLogo || '/media/images/Gemini_Generated_Image_88h0qg88h0qg88h0-removebg-preview.png';

/**
 * Full-screen Preloader Component with Logo Fill / Drawing Reveal Animation
 * 
 * @param {Object} props
 * @param {Function} [props.onComplete] Callback invoked when the loading animation finishes
 * @param {number} [props.duration=2] Duration of the fill animation in seconds
 */
export const LoadingScreen = ({ onComplete, duration = 2 }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Mark as filled once the 2-second fill animation completes
    const fillTimer = setTimeout(() => {
      setIsFilled(true);
    }, duration * 1000);

    // 2. Gracefully start dismissing the screen after a brief pause (0.4s) to admire completed logo
    const dismissTimer = setTimeout(() => {
      setIsDismissed(true);
    }, (duration + 0.4) * 1000);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(dismissTimer);
    };
  }, [duration]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (onComplete) onComplete();
      }}
    >
      {!isDismissed && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: -25, 
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white sm:bg-slate-50 select-none overflow-hidden pointer-events-auto"
          dir="rtl"
        >
          {/* Centered Logo Container */}
          <div className="relative flex flex-col items-center justify-center space-y-6">
            
            {/* The Logo Fill Container */}
            <div className="relative w-32 h-36 sm:w-36 sm:h-42 flex items-center justify-center">
              
              {/* Bottom Image: Grayscale & Low Opacity Base */}
              <img
                src={LOGO_SRC}
                alt="بتروكيما للدهانات - تحميل"
                className="absolute inset-0 w-full h-full object-contain opacity-20 grayscale pointer-events-none select-none filter contrast-75"
              />

              {/* Top Image: Full Color with Bottom-to-Top Fill/Reveal Animation */}
              <motion.div
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ 
                  duration: duration, 
                  ease: [0.25, 1, 0.5, 1], // Smooth fluid curve
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
              >
                <img
                  src={LOGO_SRC}
                  alt="بتروكيما للدهانات"
                  className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
                />
              </motion.div>

              {/* Subtle Shimmer / Glow Light at the Fill Front */}
              <motion.div
                initial={{ top: '100%', opacity: 0 }}
                animate={{ top: '0%', opacity: [0, 0.8, 0.8, 0] }}
                transition={{ 
                  duration: duration, 
                  ease: [0.25, 1, 0.5, 1] 
                }}
                className="absolute left-1/2 -translate-x-1/2 w-32 sm:w-40 h-1.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent blur-sm pointer-events-none"
              />
            </div>

            {/* Brand Title & Tagline with Staggered Fade In */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center space-y-1.5"
            >
              <h2 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
                بتروكيما للدهانات
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                لكل لون... حكاية بيت
              </p>
            </motion.div>

            {/* Subtle Progress Bar */}
            <div className="w-36 sm:w-44 h-1 bg-slate-200/80 rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: duration, ease: [0.25, 1, 0.5, 1] }}
                className="h-full bg-gradient-to-r from-blue-600 via-orange-500 to-amber-400 rounded-full"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
