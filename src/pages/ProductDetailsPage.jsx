import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProductDetails } from '../api/productsService';
import ScrollReveal from '../components/ui/ScrollReveal';
import {
  FileText,
  FileDown,
  Headset,
  Phone,
  Link2,
  ChevronLeft,
  Check,
  Share2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

/**
 * ProductDetailsPage Component
 * 
 * Strict RTL layout for Petrochem Paints detailed product page:
 * - 2-Column Layout matching the design screenshot:
 *   - Visual Column (Right in RTL): Active Can image, 4 thumbnails gallery, TDS PDF download & share buttons.
 *   - Content Column (Left in RTL): Bold title, acrylic description, 3 size selector cards, recommended exterior colors,
 *     large 'Request a Quote' CTA, and Quick Engineering Consultation banner with hotline 19842.
 */
export const ProductDetailsPage = () => {
  const { id } = useParams();
  const { openContactModal } = useOutletContext() || {};

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch product details whenever route param ID changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProductDetails(id || 'weather-shield-25000')
      .then((data) => {
        if (isMounted) {
          setProductData(data);
          // Set initial active image & selected size
          if (data.images && data.images.length > 0) {
            setActiveImage(data.images[0].full || data.images[0].thumb);
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0]);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load product details:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafbfc] py-16" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 h-[450px] bg-slate-200 rounded-3xl animate-pulse" />
            <div className="lg:col-span-7 space-y-6">
              <div className="h-10 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-24 w-full bg-slate-100 rounded-xl animate-pulse" />
              <div className="h-28 w-full bg-slate-100 rounded-2xl animate-pulse" />
              <div className="h-16 w-full bg-slate-200 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center" dir="rtl">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">لم يتم العثور على المنتج</h2>
        <p className="text-slate-500 mb-6">المنتج المطلوب غير متوفر حالياً أو تم تعديل الرابط.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-2.5 rounded-xl font-bold hover:bg-brand-orange-hover transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          العودة لكتالوج المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfd] text-slate-800 min-h-screen py-6 sm:py-10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 sm:mb-8">
          <Link to="/" className="hover:text-brand-orange transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/products" className="hover:text-brand-orange transition-colors">
            منتجاتنا
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-700 truncate max-w-xs sm:max-w-md">
            {productData.title}
          </span>
        </nav>

        {/* =========================================================================
            2-COLUMN LAYOUT MATCHING DESIGN SCREENSHOT
            In RTL, Column 1 (Media - lg:col-span-5) renders on the RIGHT side.
            Column 2 (Text & CTAs - lg:col-span-7) renders on the LEFT side.
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ========================================================= */}
          {/* COLUMN 1: MEDIA GALLERY & DOWNLOADS (RIGHT SIDE IN RTL)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal yOffset={20}>
              {/* Main Can Preview Container */}
              <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[440px] bg-white rounded-3xl border border-slate-100/90 flex items-center justify-center p-6 shadow-sm overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={productData.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 select-none"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails Row (4 thumbnails) */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4">
                {(productData.images || []).map((img, idx) => {
                  const targetSrc = img.full || img.thumb;
                  const isCurrent = activeImage === targetSrc;
                  return (
                    <button
                      key={img.id || idx}
                      type="button"
                      onClick={() => setActiveImage(targetSrc)}
                      className={`h-20 sm:h-24 rounded-2xl p-1.5 bg-white border-2 flex items-center justify-center overflow-hidden transition-all duration-200 outline-none ${
                        isCurrent
                          ? 'border-brand-orange shadow-md ring-2 ring-brand-orange/20 scale-[1.03]'
                          : 'border-slate-100 hover:border-slate-300 shadow-sm opacity-85 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.thumb || img.full}
                        alt={img.alt || `صورة المعاينة ${idx + 1}`}
                        className="h-full w-full object-cover rounded-xl"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Actions Row: TDS Download (Right) & Share Buttons (Left) */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-2">
                
                {/* Download TDS Button (Right in RTL) */}
                <a
                  href={productData.tdsLink || '#'}
                  download
                  onClick={(e) => {
                    if (!productData.tdsLink || productData.tdsLink === '#') {
                      e.preventDefault();
                      alert('سيتم إتاحة النشرة الفنية المعتمدة (TDS) للتحميل المباشر قريباً.');
                    }
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#eaf2fd] hover:bg-[#dbe9fc] text-[#1e60c8] font-bold text-xs sm:text-sm py-3 px-4 sm:px-6 rounded-2xl shadow-sm transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  <FileDown className="w-4 h-4 text-[#1e60c8] flex-shrink-0" />
                  <span>{productData.tdsText || 'تحميل النشرة الفنية (TDS - PDF)'}</span>
                </a>

                {/* Share Icons Group (Left in RTL) */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                    مشاركة:
                  </span>

                  {/* Copy Link Button */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    title="نسخ رابط المنتج"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm ${
                      copiedLink
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#f0f4fa] hover:bg-[#e2eaf5] text-slate-600'
                    }`}
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                  </button>

                  {/* WhatsApp Share Button */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `شاهد تفاصيل ${productData.title} من شركة بتروكيما للدهانات: ${
                        typeof window !== 'undefined' ? window.location.href : ''
                      }`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="مشاركة عبر واتساب"
                    className="w-10 h-10 rounded-full bg-[#e8f7ee] hover:bg-[#d5f0df] text-[#25D366] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12.004 2C6.484 2 2.008 6.476 2.008 11.996c0 1.838.498 3.565 1.365 5.064L2 22l5.105-1.338a9.92 9.92 0 004.899 1.334c5.52 0 9.996-4.476 9.996-9.996C22 6.476 17.524 2 12.004 2zm5.836 14.18c-.244.688-1.42 1.32-1.956 1.378-.49.052-1.12.074-3.626-.963-3.208-1.327-5.263-4.577-5.424-4.79-.16-.214-1.306-1.74-1.306-3.32 0-1.58.828-2.357 1.12-2.678.293-.321.637-.402.85-.402.213 0 .426.002.613.012.2.01.468-.076.732.558.274.66.932 2.274 1.013 2.438.082.164.137.357.027.575-.11.218-.164.354-.326.548-.163.193-.343.432-.49.58-.163.164-.333.342-.143.668.19.327.846 1.396 1.815 2.26 1.246 1.11 2.298 1.455 2.625 1.618.327.164.518.137.71-.082.191-.219.82-1.008 1.038-1.353.219-.346.438-.288.733-.18.295.109 1.875.883 2.196 1.043.322.16.536.24.614.372.078.132.078.766-.166 1.454z" />
                    </svg>
                  </a>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2: TEXT DETAILS & SELECTORS (LEFT SIDE IN RTL)     */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <ScrollReveal yOffset={30}>
              
              {/* Product Main Title & English Subtitle */}
              <div className="mb-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy leading-tight tracking-tight">
                  <span>{productData.title}</span>
                  {productData.subTitleEn && (
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy mt-1 tracking-tight">
                      {productData.subTitleEn}
                    </span>
                  )}
                </h1>
              </div>

              {/* Product Detailed Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                {productData.description}
              </p>

              {/* ========================================================= */}
              {/* SIZE SELECTOR SECTION                                     */}
              {/* ========================================================= */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    {productData.sizesHeader || 'اختر حجم العبوة المطلوب:'}
                  </h3>
                  <span className="text-xs font-bold text-brand-orange">
                    {productData.sizesDiscountNotice || 'متاح للكميات الكبيرة بخصم تجاري'}
                  </span>
                </div>

                {/* 3 Selectable Size Cards */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {(productData.sizes || []).map((size) => {
                    const isSelected = selectedSize?.id === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-3.5 sm:p-4 rounded-2xl text-right transition-all duration-200 border-2 relative cursor-pointer outline-none ${
                          isSelected
                            ? 'border-brand-orange bg-white shadow-md ring-2 ring-brand-orange/20 scale-[1.01]'
                            : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                        }`}
                      >
                        <div className="font-bold text-slate-800 text-xs sm:text-sm">
                          {size.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {size.subText}
                        </div>
                        <div className="mt-3 flex items-baseline gap-1">
                          <span
                            className={`text-base sm:text-lg font-black ${
                              isSelected ? 'text-brand-orange' : 'text-slate-800'
                            }`}
                          >
                            {size.price}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {size.currency}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ========================================================= */}
              {/* COLOR SELECTOR SECTION                                    */}
              {/* ========================================================= */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {productData.colorsHeader || 'نغمات وتدرجات الواجهات الموصى بها:'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      if (openContactModal) openContactModal();
                      else window.location.href = '/contact';
                    }}
                    className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{productData.catalogLinkText || 'كتالوج الألوان الرقمي'}</span>
                    <span className="text-sm">←</span>
                  </button>
                </div>

                {/* Color Swatches Row + Extra Colors Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {(productData.colors || []).map((color) => {
                    const isSelected = selectedColor?.id === color.id;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-brand-orange bg-orange-50/40 text-brand-orange shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border shadow-inner flex-shrink-0"
                          style={{
                            backgroundColor: color.hex,
                            borderColor: color.border || '#cbd5e1',
                          }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}

                  {/* + 1,200 لون تلوين كمبيوتري badge */}
                  <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-100 text-blue-700 text-xs font-bold shadow-sm">
                    {productData.moreColorsBadge || '+ 1,200 لون تلوين كمبيوتري'}
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* CTAs SECTION: REQUEST A QUOTE & QUICK PHONE BANNER       */}
              {/* ========================================================= */}
              <div className="space-y-4">
                
                {/* Full-width Solid Orange Quote Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (openContactModal) {
                      openContactModal(productData);
                    } else {
                      window.location.href = '/contact';
                    }
                  }}
                  className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-black text-sm sm:text-base py-4 px-6 rounded-2xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] cursor-pointer"
                >
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <span>طلب عرض أسعار للمشاريع والكميات (Request a Quote)</span>
                </button>

                {/* Engineering Consultation Banner with Hotline 19842 */}
                <div className="bg-[#f4f7fb] border border-slate-200/80 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center flex-shrink-0">
                      <Headset className="w-4 h-4" />
                    </div>
                    <span>
                      {productData.consultation?.text ||
                        'استشارة هندسية سريعة لحساب الكميات ومواصفات السطح'}
                    </span>
                  </div>

                  <a
                    href={`tel:${productData.consultation?.hotline || '01023452349'}`}
                    dir="ltr"
                    style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
                    className="font-black text-brand-navy hover:text-brand-orange transition-colors flex items-center gap-1.5 text-sm sm:text-base font-mono cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-orange rotate-12 flex-shrink-0" />
                    <span>&#x200E;{productData.consultation?.hotline || '01023452349'}</span>
                  </a>
                </div>

              </div>

            </ScrollReveal>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;
