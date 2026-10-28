import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppIcon, openGeneralWhatsApp } from '../../utils/whatsapp';

/**
 * FloatingWhatsApp Component
 * 
 * Persistent floating action button positioned at bottom-left (optimal for RTL),
 * with pulsating ripple effect and instant connection to Petrochem technical sales on WhatsApp.
 */
export const FloatingWhatsApp = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3 select-none"
      dir="rtl"
    >
      {/* Tooltip speech bubble */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="hidden sm:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold py-2 px-3.5 rounded-2xl shadow-xl border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>تواصل فوري عبر واتساب</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <div className="relative group">
        {/* Pulsing radar waves */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 group-hover:opacity-70 animate-ping pointer-events-none" />

        <button
          type="button"
          onClick={() => openGeneralWhatsApp()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-900/30 hover:shadow-emerald-600/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/40"
          aria-label="تواصل مع مصنع بتروكيما عبر واتساب"
          title="تواصل مباشر عبر واتساب"
        >
          <WhatsAppIcon className="w-7 h-7 text-white fill-current drop-shadow-sm" />
        </button>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
