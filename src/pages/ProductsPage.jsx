import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PRODUCT_CATEGORIES,
  getCategories,
  fetchProductsByCategory,
} from '../api/productsService';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Check, X, PhoneCall } from 'lucide-react';

/**
 * ProductsPage Component
 * 
 * Strict RTL layout for Petrochem Paints catalog:
 * 1. Top Header: Text & Feature graphic composition
 * 2. Categories Pill Tabs ('الكل', 'أكريليك', 'بلاستيك', 'سيلر وورنيش', 'معجون', 'برايمر', 'لاكيه')
 * 3. Products Grid Area: Dark blue container with paint splashes, animated category crossfade,
 *    and 'عرض التفاصيل' triggers
 * 4. Bottom Brand Statement Banner ('دقة في كل قطرة .. ثقة في كل لون')
 */
export const ProductsPage = () => {
  const { openContactModal } = useOutletContext() || {};

  const [categories, setCategories] = useState(PRODUCT_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState('all');
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load live categories from backend
  useEffect(() => {
    let isMounted = true;
    getCategories()
      .then((cats) => {
        if (isMounted && Array.isArray(cats) && cats.length > 0) {
          // Add 'all' category tab if not present
          const hasAll = cats.some((c) => c.id === 'all');
          const allTab = { id: 'all', label: 'الكل', subtitle: 'كافة دهانات ومواد بتروكيما' };
          setCategories(hasAll ? cats : [allTab, ...cats]);
        }
      })
      .catch((err) => console.warn('Could not load categories:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch category products whenever activeCategory changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProductsByCategory(activeCategory)
      .then((data) => {
        if (isMounted) {
          setProductsData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load products:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <div className="bg-white min-h-screen text-slate-800" dir="rtl">
      
      {/* =========================================================================
          1. TOP HEADER SECTION
          ========================================================================= */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Feature Composition Graphic (Left side in visual flow) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <ScrollReveal yOffset={30}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-3">
                  <img
                    src="/media/products/PETROKEMA Paints and Tools Composition.png"
                    alt="تشكيلة منتجات بتروكيما للدهانات"
                    className="w-full h-auto object-cover rounded-2xl select-none"
                    loading="eager"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Header Text & Value Proposition (Right side in RTL) */}
            <div className="lg:col-span-6 order-1 lg:order-2 text-right">
              <ScrollReveal yOffset={-20}>
                <div className="inline-block">
                  <span className="w-14 sm:w-16 h-1 bg-brand-orange rounded-full block mb-4" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy tracking-tight leading-tight">
                  منتجاتنا
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-navy/90 mt-2">
                  جودة عالية .. ألوان تدوم
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium mt-4 max-w-lg leading-relaxed">
                  مجموعة متكاملة من الدهانات والمواد عالية الجودة لتلبي جميع احتياجاتك في البناء والتشطيب.
                </p>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CATEGORY PILL TABS SECTION
          ========================================================================= */}
      <section className="pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            {categories.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  type="button"
                  className={`px-5 sm:px-7 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'bg-brand-orange text-white shadow-md shadow-orange-500/30 scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-brand-orange'
                  }`}
                  aria-pressed={isActive}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PRODUCTS GRID AREA (DARK BLUE CONTAINER)
          ========================================================================= */}
      <section className="relative w-full bg-[#0a1a33] py-16 sm:py-24 text-white overflow-hidden shadow-inner">
        
        {/* Background Decorative Splash Graphics (Left & Right) */}
        <img
          src="/media/products/Orange2 1.png"
          alt=""
          className="absolute left-0 top-1/4 -translate-y-1/2 w-28 sm:w-44 lg:w-56 pointer-events-none select-none opacity-85 object-contain"
        />
        <img
          src="/media/products/WhatsApp_Image_2026-08-24_at_5.15.26_PM-removebg-preview (1) 3.png"
          alt=""
          className="absolute right-0 bottom-4 w-28 sm:w-44 lg:w-56 pointer-events-none select-none opacity-85 object-contain"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Active Category Header with decorative lines */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center gap-3 mb-1">
              <span className="w-8 sm:w-12 h-0.5 bg-brand-orange rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                {currentCategory?.label}
              </h2>
              <span className="w-8 sm:w-12 h-0.5 bg-brand-orange rounded-full" />
            </div>
            {currentCategory?.subtitle && (
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {currentCategory.subtitle}
              </p>
            )}
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto justify-center">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex flex-col items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 animate-pulse"
                >
                  <div className="w-44 h-52 bg-white/10 rounded-2xl mb-6" />
                  <div className="w-32 h-9 bg-white/10 rounded-lg" />
                </div>
              ))}
            </div>
          ) : productsData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-300 text-lg">لا توجد منتجات مسجلة في هذا القسم حالياً.</p>
            </div>
          ) : (
            /* Animated Products Grid */
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`grid gap-8 sm:gap-12 mx-auto justify-center items-end ${
                  productsData.length === 1
                    ? 'grid-cols-1 max-w-sm'
                    : productsData.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl'
                }`}
              >
                {productsData.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col items-center justify-between text-center relative"
                  >
                    {/* Can Image Container */}
                    <div className="relative w-full h-56 sm:h-64 flex items-center justify-center p-2">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                      />
                    </div>

                    {/* Product Title */}
                    <h3 className="mt-3 text-base sm:text-lg font-bold text-white group-hover:text-brand-orange transition-colors">
                      {product.title}
                    </h3>
                    {product.subtitle && (
                      <p className="text-xs text-slate-300 font-medium mt-0.5">
                        {product.subtitle}
                      </p>
                    )}

                    {/* View Details Action Link */}
                    <Link
                      to={`/products/${product.id}`}
                      className="mt-4 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-bold px-7 py-2.5 rounded-lg shadow-md hover:shadow-orange-500/25 transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center"
                    >
                      عرض التفاصيل
                    </Link>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

        </div>
      </section>

      {/* =========================================================================
          4. BOTTOM BRAND STATEMENT BANNER (LIGHT WAVE BACKGROUND)
          ========================================================================= */}
      <section 
        className="relative w-full bg-cover bg-center bg-no-repeat py-20 sm:py-28 overflow-hidden"
        style={{ backgroundImage: `url('/media/products/Section - Brand Statement.png')` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center select-none">
          <ScrollReveal yOffset={30}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-navy tracking-tight leading-snug sm:leading-normal">
              دقة في كل قطرة
            </h2>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-400/80 mt-5 sm:mt-8 leading-snug sm:leading-normal">
              ثقة في كل لون
            </h3>
            <div className="w-16 sm:w-20 h-1 bg-brand-navy rounded-full mx-auto mt-6 sm:mt-8" />
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          5. PRODUCT DETAILS MODAL ('عرض التفاصيل')
          ========================================================================= */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-right overflow-hidden border border-slate-100"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                
                {/* Product Image */}
                <div className="w-40 h-44 sm:w-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                </div>

                {/* Details Content */}
                <div className="flex-1 space-y-3 text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-brand-orange">
                      {selectedProduct.badge || selectedProduct.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {selectedProduct.subCategory}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-brand-navy">
                    {selectedProduct.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Feature Highlights */}
                  {selectedProduct.features && (
                    <div className="space-y-1.5 pt-2">
                      <p className="text-xs font-bold text-slate-800">المميزات الرئيسية:</p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {selectedProduct.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Volume / Packaging */}
                  {selectedProduct.volume && (
                    <p className="text-xs font-semibold text-slate-500 pt-1">
                      العبوات المتوفرة: <span className="text-slate-800">{selectedProduct.volume}</span>
                    </p>
                  )}

                  {/* Actions */}
                  <div className="pt-4 flex items-center gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      className="rounded-lg px-6"
                      onClick={() => {
                        setSelectedProduct(null);
                        if (openContactModal) openContactModal();
                      }}
                    >
                      <PhoneCall className="w-4 h-4 ml-2" />
                      طلب تسعير أو استشارة
                    </Button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProductsPage;
