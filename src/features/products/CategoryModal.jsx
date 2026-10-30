import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Check, Sparkles, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WhatsAppIcon, openWhatsAppQuote } from '../../utils/whatsapp';

/**
 * CategoryModal Component
 * 
 * Displays an interactive showcase modal for the selected category:
 * - If category has colors (الدهانات، التشطيب):
 *   - Dynamic image display that updates when a color is clicked in the color palette.
 *   - High-end floating color palette bar underneath the image with smooth crossfade animation.
 * - If category has NO colors (التأسيس، المعجون):
 *   - No image container or color circles displayed (pure white only).
 *   - Sleek dedicated header with category stage, white color indicator, and technical specifications.
 * - Comprehensive Arabic category description, included products, and key features.
 * - Direct navigation to catalog filtered by this category.
 */
export const CategoryModal = ({ category, onClose, onRequestQuote }) => {
  const navigate = useNavigate();

  // Check if this category has interactive colors & images
  const hasColors = Boolean(
    category?.hasColors !== false &&
    Array.isArray(category?.colors) &&
    category.colors.length > 0
  );

  const colors = hasColors ? category.colors : [];
  const [activeColor, setActiveColor] = useState(hasColors ? colors[0] : null);

  // Reset active color when category changes
  useEffect(() => {
    if (hasColors && colors.length > 0) {
      setActiveColor(colors[0]);
    } else {
      setActiveColor(null);
    }
  }, [category, hasColors]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!category) return null;

  const handleNavigateToCatalog = () => {
    onClose();
    if (category.filterCategory) {
      navigate(`/products?category=${category.filterCategory}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in-rtl"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className={`relative w-full ${hasColors ? 'max-w-4xl' : 'max-w-2xl'
          } bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col my-auto max-h-[92vh]`}
      >
        {/* =========================================================================
            1. TOP BAR OVERLAYS (ONLY SHOWN OVER IMAGE WHEN hasColors IS TRUE)
            ========================================================================= */}
        {hasColors && (
          <>
            <div className="absolute top-4 left-4 z-30">
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 border border-white/10"
                aria-label="إغلاق النافذة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-4 right-4 z-30 pointer-events-none">
              <div className="bg-black/45 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg border border-white/15 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span>المرحلة {category.number}</span>
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            2. INTERACTIVE IMAGE CONTAINER WITH COLOR PALETTE (ONLY WHEN hasColors)
            ========================================================================= */}
        {hasColors && (
          <div className="relative w-full h-72 sm:h-96 md:h-[420px] bg-slate-950 overflow-hidden shrink-0 select-none">
            {/* Crossfading Background Image */}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeColor?.id || activeColor?.img || category.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="w-full h-full relative"
              >
                <img
                  src={activeColor?.img || category.image}
                  alt={`${category.title} - ${activeColor?.name || ''}`}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
                {activeColor?.hex && (
                  <div
                    className="absolute inset-0 mix-blend-color opacity-35 pointer-events-none transition-colors duration-400"
                    style={{ backgroundColor: activeColor.hex }}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Vignette gradients for top bar readability and bottom palette isolation */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/40 pointer-events-none" />

            {/* COLOR PALETTE (بلتة الألوان التفاعلية مثل البانر) */}
            {colors && colors.length > 1 && (
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none w-auto max-w-[95%]">
                {/* Selected Color Name Tooltip (بدون أكواد) */}
                <div className="bg-black/75 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3.5 py-1 rounded-full shadow-md border border-white/15 flex items-center gap-2 transition-all">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-xs shrink-0"
                    style={{ backgroundColor: activeColor?.hex || '#ffffff' }}
                  />
                  <span>اللون المختار: {activeColor?.name}</span>
                  {activeColor?.nameEn && (
                    <span className="text-white/70 text-[11px] font-normal">({activeColor.nameEn})</span>
                  )}
                </div>

                {/* Color Circles Row */}
                <div
                  className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl overflow-x-auto max-w-[94vw] sm:max-w-2xl scrollbar-none scroll-smooth"
                  role="group"
                  aria-label="بلتة ألوان التصنيف"
                >
                  {colors.map((color) => {
                    const isActive = activeColor?.id === color.id;
                    const isLight = color.hex?.toLowerCase() === '#f3efe5' || color.hex?.toLowerCase() === '#d6c3a5';
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setActiveColor(color)}
                        style={{ backgroundColor: color.hex }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 transform cursor-pointer outline-none relative shrink-0 border border-black/10 ${isActive
                          ? 'ring-3 ring-white ring-offset-2 ring-offset-black/60 scale-120 shadow-2xl'
                          : 'opacity-80 hover:opacity-100 hover:scale-110 shadow-md'
                          }`}
                        title={`${color.name} ${color.nameEn ? `(${color.nameEn})` : ''}`}
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
            )}
          </div>
        )}

        {/* =========================================================================
            HEADER FOR CATEGORIES WITHOUT COLORS (التأسيس والمعجون: لون أبيض فقط وبدون صورة)
            ========================================================================= */}
        {!hasColors && (
          <div className="p-6 sm:p-7 pb-4 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white relative text-right">
            {/* Top row with Stage badge & Close button */}
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-50 border border-brand-orange/20 text-brand-orange text-xs font-black px-3.5 py-1.5 rounded-full shadow-2xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span>المرحلة {category.number}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
                aria-label="إغلاق النافذة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-1.5 h-6 sm:h-7 bg-brand-orange rounded-full inline-block shrink-0 shadow-sm" />
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
                {category.title}
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed mb-4">
              {category.subtitle}
            </p>

          </div>
        )}

        {/* =========================================================================
            3. CATEGORY CONTENT & DESCRIPTION (وصف التصنيف)
            ========================================================================= */}
        <div className="p-6 sm:p-8 text-right bg-white overflow-y-auto space-y-5">
          {/* Header Title with Orange Bar (Shown ONLY in hasColors mode since !hasColors has it in dedicated header) */}
          {hasColors && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="w-1.5 h-6 bg-brand-orange rounded-full inline-block shrink-0 shadow-sm" />
                  <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
                    {category.title}
                  </h2>
                  <span className="text-xs font-black text-brand-orange bg-orange-50 border border-brand-orange/20 px-2.5 py-0.5 rounded-full">
                    {category.number}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {category.subtitle}
                </p>
              </div>

              {/* Stage Indicator Badge */}
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl w-fit">
                <Layers className="w-4 h-4 text-brand-orange" />
                <span>مرحلة معتمدة في منظومة بتروكيما</span>
              </div>
            </div>
          )}



          {/* Full Category Description (وصف للتصنيف) */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>نظرة عامة:</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed sm:leading-loose">
              {category.fullDescription || category.description}
            </p>
          </div>

          {/* Products Included */}
          {category.items && category.items.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                أبرز منتجات هذا القسم:
              </span>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-50 hover:bg-orange-50/70 border border-slate-200 hover:border-brand-orange/40 px-3 py-1.5 rounded-xl transition-colors shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-orange" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features Highlights */}
          {category.features && category.features.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                مميزات ومعايير الجودة:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {category.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-600 font-medium"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* =========================================================================
              4. ACTION BUTTONS (FOOTER)
              ========================================================================= */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleNavigateToCatalog}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group active:scale-98"
            >
              <span>استعراض منتجات {category.title} في الكتالوج</span>
              <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              {/* Direct WhatsApp Quote Button for Category + Selected Color */}
              <button
                type="button"
                onClick={() =>
                  openWhatsAppQuote({
                    category: category.title,
                    color: activeColor,
                    note: `طلب مواصفات وأسعار من قسم ${category.title}`,
                  })
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-emerald-600/30 transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>طلب تسعير واستشارة عبر واتساب</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestQuote && onRequestQuote(category);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 active:scale-98 cursor-pointer"
                title="نموذج استشارة"
              >
                <span>نموذج الموقع</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryModal;
