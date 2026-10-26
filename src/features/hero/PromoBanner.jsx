import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { ASSETS } from '@/utils/constants';
import { getFeaturedPromo } from '@/api/products.api';

/**
 * PromoBanner Component
 * 
 * Accurately styled to match the design reference:
 * - Two tilted cards for Super Star Paint: "شامبين" and "ميتالك(فضي)".
 * - Orange badge "منتج جديد" anchored to the top-right of the metallic card.
 * - Underline accents below category titles.
 * - Smooth Framer Motion AnimatePresence transitions when opening/closing the modal.
 * - Cleaned bottom edge with zero excess bars or shadow artifacts.
 */
export const PromoBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promo, setPromo] = useState({
    title: 'دهانات لاكيه سوبر ستار',
    subtitle: 'شامبين .. ميتالك',
    badge: 'منتج جديد',
    giftTitle: 'معجون اكريلك هدية',
  });

  useEffect(() => {
    let isMounted = true;
    getFeaturedPromo()
      .then((data) => {
        if (isMounted && data?.title) {
          setPromo(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="relative pt-6 sm:pt-10">
        
        {/* Main Banner Box with Crisp Dark Blue Theme (Zero excess bottom bar/shadow artifacts) */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#07162b] via-[#0d2242] to-[#07162b] shadow-xl border border-white/5 overflow-visible">
          
          {/* Center radial blue spotlight */}
          <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] bg-[radial-gradient(ellipse_at_center,_rgba(29,78,216,0.35)_0%,_transparent_70%)] pointer-events-none" />

          {/* Banner Inner Content: Right = Typography, Left = Paint Buckets */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-16 py-8 sm:py-10 gap-8 lg:gap-12 min-h-[250px] sm:min-h-[280px]">
            
            {/* RIGHT SIDE: Typography & CTA Button */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-right space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-white tracking-wide leading-tight drop-shadow-md">
                {promo.title}
              </h2>

              <p className="text-base sm:text-xl font-bold text-white/90 drop-shadow">
                {promo.subtitle}
              </p>

              {promo.giftTitle && (
                <span className="inline-block bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs px-3 py-1 rounded-full font-bold">
                  🎁 عرض خاص: {promo.giftTitle}
                </span>
              )}

              <div className="pt-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 bg-white text-brand-orange hover:text-brand-orange-hover hover:bg-orange-50 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 group"
                  aria-label="اكتشف تفاصيل منتج سوبر ستار"
                >
                  <span>اكتشف المنتج</span>
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange transition-transform duration-200 group-hover:-translate-x-1" />
                </motion.button>
              </div>
            </div>

            {/* LEFT SIDE: Two Paint Bucket Cards (Accurately matching uploaded reference) */}
            <div className="flex-1 flex justify-center md:justify-end items-center relative select-none w-full min-h-[200px] sm:min-h-[230px]">
              <AnimatePresence mode="wait">
                {!isModalOpen && (
                  <motion.div
                    key="paint-buckets-group"
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.65, 
                      y: 25, 
                      transition: { duration: 0.35, ease: 'easeInOut' } 
                    }}
                    transition={{ 
                      type: 'spring', 
                      damping: 20, 
                      stiffness: 260,
                      duration: 0.5 
                    }}
                    className="relative flex items-center justify-center -mt-8 sm:-mt-12 md:-mt-14"
                  >
                    {/* Paint Buckets Container (Strict LTR so Champagne is on the Left and Metallic is on the Right) */}
                    <div className="relative flex items-center justify-center" dir="ltr">
                      
                      {/* Card 1: Champagne (شامبين) - On the LEFT, tilted -12deg, positioned BEHIND (z-10) */}
                      <div className="relative w-36 sm:w-48 lg:w-52 bg-[#f4f7fb] rounded-[24px] sm:rounded-[30px] p-3 sm:p-4 pb-4 sm:pb-6 shadow-[0_12px_28px_rgba(0,0,0,0.25)] border border-white/80 transform -rotate-[12deg] -translate-y-5 sm:-translate-y-7 z-10 shrink-0">
                        {/* Label & Horizontal Line (Left Aligned) */}
                        <div className="text-left px-1" dir="ltr">
                          <span className="text-xs sm:text-sm font-black text-[#e85623] block leading-tight">
                            شامبين
                          </span>
                          <div className="w-full h-[1.5px] bg-slate-200/90 mt-1 mb-2" />
                        </div>

                        {/* Paint Can Image */}
                        <div className="aspect-square flex items-center justify-center">
                          <img
                            src={ASSETS.productCans}
                            alt="لاكيه سوبر ستار شامبين"
                            className="w-full h-full object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.18)] pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Card 2: Metallic Silver (ميتالك(فضي)) - On the RIGHT, tilted +7deg, positioned IN FRONT (z-20), overlapping Card 1 */}
                      <div className="relative w-36 sm:w-48 lg:w-52 bg-[#f4f7fb] rounded-[24px] sm:rounded-[30px] p-3 sm:p-4 pb-4 sm:pb-6 shadow-[0_18px_38px_rgba(0,0,0,0.35)] border border-white/80 transform rotate-[7deg] -translate-y-1 sm:-translate-y-2 -ml-16 sm:-ml-24 lg:-ml-28 z-20 shrink-0">
                        
                        {/* Floating Orange Badge: منتج جديد on the top-right */}
                        <div 
                          className="absolute -top-3.5 sm:-top-4 -right-1 sm:right-2 z-30 bg-[#f25b29] text-white text-xs sm:text-sm font-black px-4 sm:px-5 py-1 sm:py-1.5 rounded-full shadow-[0_6px_16px_rgba(242,91,41,0.4)] border-2 border-white tracking-wide select-none"
                          dir="rtl"
                        >
                          {promo.badge || 'منتج جديد'}
                        </div>

                        {/* Label & Horizontal Line (Left Aligned on the card) */}
                        <div className="text-left px-1" dir="ltr">
                          <span className="text-xs sm:text-sm font-black text-[#e85623] block leading-tight">
                            ميتالك(فضي)
                          </span>
                          <div className="w-full h-[1.5px] bg-slate-200/90 mt-1 mb-2" />
                        </div>

                        {/* Paint Can Image */}
                        <div className="aspect-square flex items-center justify-center">
                          <img
                            src={ASSETS.productCans2}
                            alt="لاكيه سوبر ستار ميتالك فضي"
                            className="w-full h-full object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.18)] pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* POP-UP MODAL OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            
            {/* Blurred Dark Backdrop */}
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card with Pop / Spring Animation */}
            <motion.div
              key="modal-box"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.8, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.25 } }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.8,
              }}
              className="relative z-10 w-full max-w-lg sm:max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-2 sm:p-4 my-auto flex flex-col items-center"
            >
              {/* Clean Close (X) Icon Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 shadow-md hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="إغلاق النافذة"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Specific Poster Image: WhatsApp Image 2026-10-18 at 6.59.00 PM.jpeg */}
              <div className="w-full flex justify-center items-center overflow-hidden rounded-2xl bg-slate-50">
                <img
                  src={ASSETS.modalPoster}
                  alt="طرح منتج جديد - دهانات سوبر ستار"
                  className="w-full h-auto max-h-[82vh] object-contain rounded-2xl shadow-sm select-none"
                />
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PromoBanner;
