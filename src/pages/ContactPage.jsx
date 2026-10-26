import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchContactInfo,
  submitContactForm,
} from '../api/contactService';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';

/**
 * Platform SVG Brand Icons
 */
const BrandIcons = {
  facebook: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#1877F2]">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <defs>
        <radialGradient id="ig-grad" cx="20%" cy="105%" r="130%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="15%" stopColor="#fdf497" />
          <stop offset="60%" stopColor="#fd5949" />
          <stop offset="85%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" fill="url(#ig-grad)" />
      <path
        fill="#ffffff"
        d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.5a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"
      />
    </svg>
  ),
  telegram: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#229ED9]">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
    </svg>
  ),
  whatsapp: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#25D366]">
      <path d="M12.004 2C6.484 2 2.008 6.476 2.008 11.996c0 1.838.498 3.565 1.365 5.064L2 22l5.105-1.338a9.92 9.92 0 004.899 1.334c5.52 0 9.996-4.476 9.996-9.996C22 6.476 17.524 2 12.004 2zm5.836 14.18c-.244.688-1.42 1.32-1.956 1.378-.49.052-1.12.074-3.626-.963-3.208-1.327-5.263-4.577-5.424-4.79-.16-.214-1.306-1.74-1.306-3.32 0-1.58.828-2.357 1.12-2.678.293-.321.637-.402.85-.402.213 0 .426.002.613.012.2.01.468-.076.732.558.274.66.932 2.274 1.013 2.438.082.164.137.357.027.575-.11.218-.164.354-.326.548-.163.193-.343.432-.49.58-.163.164-.333.342-.143.668.19.327.846 1.396 1.815 2.26 1.246 1.11 2.298 1.455 2.625 1.618.327.164.518.137.71-.082.191-.219.82-1.008 1.038-1.353.219-.346.438-.288.733-.18.295.109 1.875.883 2.196 1.043.322.16.536.24.614.372.078.132.078.766-.166 1.454z" />
    </svg>
  ),
  linkedin: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#0A66C2]">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  snapchat: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <rect width="20" height="20" x="2" y="2" rx="5" fill="#FFFC00" />
      <path
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="0.8"
        d="M12 6.2c-1.8 0-3.1 1.3-3.1 3 0 .4.1.8.2 1.1-.5.1-.9.4-1.2.7-.2.2-.2.5 0 .7.3.3.7.4 1.2.4.1.4.3.7.6.9-.5.4-1.2.7-1.7 1.1-.3.2-.3.6-.1.8.3.3.9.4 1.6.4.3.5.7.8 1.3.8.4 0 .9-.1 1.2-.3.3.2.8.3 1.2.3.6 0 1-.3 1.3-.8.7 0 1.3-.1 1.6-.4.2-.2.2-.6-.1-.8-.5-.4-1.2-.7-1.7-1.1.3-.2.5-.5.6-.9.5 0 .9-.1 1.2-.4.2-.2.2-.5 0-.7-.3-.3-.7-.6-1.2-.7.1-.3.2-.7.2-1.1 0-1.7-1.3-3-3.1-3z"
      />
    </svg>
  ),
  tiktok: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <rect width="20" height="20" x="2" y="2" rx="5" fill="#000000" />
      <path
        fill="#25F4EE"
        d="M12.5 6.5v5.5a2.5 2.5 0 11-2.5-2.5c.3 0 .6.05.8.15V7.6a4.5 4.5 0 103.7 4.4V9.5c1 .7 2.2 1.1 3.5 1.1v-2c-1.7 0-3.1-1-3.5-2.1h-2z"
        transform="translate(-0.6, -0.6)"
      />
      <path
        fill="#FE2C55"
        d="M12.5 6.5v5.5a2.5 2.5 0 11-2.5-2.5c.3 0 .6.05.8.15V7.6a4.5 4.5 0 103.7 4.4V9.5c1 .7 2.2 1.1 3.5 1.1v-2c-1.7 0-3.1-1-3.5-2.1h-2z"
        transform="translate(0.6, 0.6)"
      />
      <path
        fill="#ffffff"
        d="M12.5 6.5v5.5a2.5 2.5 0 11-2.5-2.5c.3 0 .6.05.8.15V7.6a4.5 4.5 0 103.7 4.4V9.5c1 .7 2.2 1.1 3.5 1.1v-2c-1.7 0-3.1-1-3.5-2.1h-2z"
      />
    </svg>
  ),
  twitter: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-slate-900">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

/**
 * ContactPage Component
 * 
 * Strict RTL layout for Petrochem Paints:
 * 1. Top Section: Split layout with Clean Form & Luxury Architectural Interior Feature Card
 * 2. Middle Section: Light gray container with 3-Column Info (Phones, Emails, HQ) + Full-width Cairo Google Map
 * 3. Bottom Section: Centered white card with Heading 'تواصل معنا' and responsive 8-grid of Social Media handles
 */
export const ContactPage = () => {
  const [contactData, setContactData] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    message: '',
    referenceCode: '',
    error: '',
  });

  // Fetch contact information on mount
  useEffect(() => {
    let isMounted = true;
    setLoadingInfo(true);

    fetchContactInfo()
      .then((data) => {
        if (isMounted) {
          setContactData(data);
          setLoadingInfo(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load contact info:', err);
        if (isMounted) setLoadingInfo(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error once user types
    if (formStatus.error) {
      setFormStatus((prev) => ({ ...prev, error: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus((prev) => ({
        ...prev,
        error: 'يرجى استكمال جميع الحقول الإلزامية المطلوبة لإرسال استفسارك.',
      }));
      return;
    }

    setFormStatus((prev) => ({
      ...prev,
      submitting: true,
      error: '',
    }));

    try {
      const response = await submitContactForm(formData);
      setFormStatus({
        submitting: false,
        success: true,
        message: response.message,
        referenceCode: response.referenceCode,
        error: '',
      });
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setFormStatus({
        submitting: false,
        success: false,
        message: '',
        referenceCode: '',
        error: err.message || 'حدث خطأ غير متوقع أثناء إرسال الرسالة، يرجى المحاولة لاحقاً.',
      });
    }
  };

  return (
    <div className="bg-[#fcfdfd] text-slate-800 min-h-screen py-8 sm:py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* TOP SECTION: SPLIT FORM & LUXURY FEATURE IMAGE            */}
        {/* ========================================================= */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-4 pb-12">
            
            {/* RIGHT SIDE: Contact Form (Col span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Badge & Headings */}
              <div className="mb-6">
                <span className="inline-flex items-center text-xs sm:text-sm font-bold text-brand-orange mb-3 tracking-wide">
                  {contactData?.header?.tag || '• تواصل معنا | خدمة الاستشارات المعمارية واللونية'}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight mb-3">
                  {contactData?.header?.title || 'خلينا نتواصل'}
                </h1>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                  {contactData?.header?.subtitle ||
                    'يسعدنا نسمع منك ونساعدك في اختيار الحل المناسب لمشروعك المعماري والسكني.'}
                </p>
              </div>

              {/* Form Feedback Alert (Success) */}
              <AnimatePresence>
                {formStatus.success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 shadow-sm"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-1">تم إرسال رسالتك بنجاح!</h4>
                      <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                        {formStatus.message}
                      </p>
                      {formStatus.referenceCode && (
                        <div className="mt-2 text-xs font-mono font-bold bg-white/70 px-2.5 py-1 rounded inline-block border border-emerald-200">
                          رقم المرجع: {formStatus.referenceCode}
                        </div>
                      )}
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => setFormStatus({ submitting: false, success: false, message: '', referenceCode: '', error: '' })}
                          className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
                        >
                          إرسال رسالة أخرى
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Feedback Alert (Error) */}
              <AnimatePresence>
                {formStatus.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3 text-xs sm:text-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    <span>{formStatus.error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      الاسم بالكامل <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="محمد أحمد"
                      className="w-full bg-[#f4f7fb] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      رقم الهاتف <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="‎+20 1XX XXX XXXX"
                      dir="ltr"
                      style={{ direction: 'ltr' }}
                      className="w-full bg-[#f4f7fb] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:bg-white transition-all text-right"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      البريد الإلكتروني <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      dir="ltr"
                      className="w-full bg-[#f4f7fb] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:bg-white transition-all text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      موضوع الرسالة <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="استشارة لونية / توريد دهانات"
                      className="w-full bg-[#f4f7fb] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Message Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      رسالتك <span className="text-brand-orange">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      اكتب كافة التفاصيل
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="شاركنا بمساحة مشروعك، طبيعة الأسطح، والدرجات أو التأثيرات التي تفضلها..."
                    className="w-full bg-[#f4f7fb] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Row 4: Submit Button & Response Note */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>نرد عادةً خلال ساعات العمل الرسمية</span>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2"
                  >
                    {formStatus.submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <span>إرسال الرسالة</span>
                        <Send className="w-4 h-4 rotate-180" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* LEFT SIDE: Luxury Architectural Interior Feature Card (Col span 5) */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl min-h-[460px] lg:min-h-full flex flex-col justify-end group border border-slate-100">
              <img
                src={contactData?.featureImage?.src || '/media/images/contact-interior.png'}
                alt="التصميم الداخلي المعماري الفاخر مع دهانات بتروكيما"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-transparent pointer-events-none" />

              {/* Bottom Overlay Content */}
              <div className="relative z-10 p-6 sm:p-8">
                <span className="text-brand-orange font-bold text-xs sm:text-sm tracking-wider uppercase block mb-1">
                  {contactData?.featureImage?.subTag || 'الهندسة واللون'}
                </span>
                
                <h3 className="text-white font-black text-xl sm:text-2xl leading-snug drop-shadow-sm mb-4">
                  {contactData?.featureImage?.title || 'صناعة الجمال المعماري بأحدث تقنيات الدهانات'}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-sm">
                    {contactData?.featureImage?.badge || 'بتروكيما 2026'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* ========================================================= */}
        {/* MIDDLE SECTION: CONTACT INFO & FULL-WIDTH CAIRO GOOGLE MAP*/}
        {/* ========================================================= */}
        <ScrollReveal>
          <div className="bg-[#f5f8fc] rounded-3xl p-6 sm:p-10 border border-slate-200/70 my-10 shadow-sm">
            
            {/* Top 3 Columns Info (RTL) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200/80">
              
              {/* Column 1: Phones & WhatsApp */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span>{contactData?.phones?.label || 'الهاتف المباشر وواتساب'}</span>
                </div>
                <div className="text-sm font-bold text-brand-navy">
                  <a
                    href={`tel:${String(contactData?.phones?.direct || '01023452349').replace(/[\s\u200E]/g, '')}`}
                    dir="ltr"
                    style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
                    className="hover:text-brand-orange transition-colors inline-block font-mono tracking-wide"
                  >
                    &#x200E;{contactData?.phones?.direct || '01023452349'}
                  </a>
                </div>
                <div className="text-xs text-slate-600 font-semibold pt-1 flex items-center gap-1.5">
                  <span>واتساب: </span>
                  <a
                    href="https://wa.me/201008654772"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    style={{ direction: 'ltr' }}
                    className="text-emerald-600 font-mono font-extrabold text-sm hover:underline"
                  >
                    {contactData?.phones?.whatsapp || '+20 100 8654772'}
                  </a>
                </div>
              </div>

              {/* Column 2: Emails */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span>{contactData?.emails?.label || 'البريد الإلكتروني'}</span>
                </div>
                <div className="text-sm text-slate-700">
                  <a
                    href={`mailto:${contactData?.emails?.primary || 'info@petrochem-paints.com'}`}
                    dir="ltr"
                    style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
                    className="hover:text-brand-orange transition-colors font-medium inline-block"
                  >
                    {contactData?.emails?.primary || 'info@petrochem-paints.com'}
                  </a>
                </div>
                <div className="text-sm text-slate-700 pt-0.5">
                  <a
                    href={`mailto:${contactData?.emails?.projects || 'projects@petrochem-paints.com'}`}
                    dir="ltr"
                    style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
                    className="hover:text-brand-orange transition-colors font-medium inline-block"
                  >
                    {contactData?.emails?.projects || 'projects@petrochem-paints.com'}
                  </a>
                </div>
              </div>

              {/* Column 3: Headquarters Address */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>{contactData?.address?.label || 'عنوان المقر والمصنع'}</span>
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  {contactData?.address?.line1 || 'طريق مصر اسماعيليه الصحراوي - مفارق ابوصوير'}
                </p>
                <p className="text-xs text-slate-500 pt-0.5">
                  {contactData?.address?.line2 || 'الإسماعيلية، جمهورية مصر العربية'}
                </p>
              </div>

            </div>

            {/* Bottom: Cairo Google Map Embed Container */}
            <div className="mt-8 relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner h-[380px] sm:h-[430px] bg-slate-100">
              <iframe
                title="مقر مصنع بتروكيما للدهانات"
                src={
                  contactData?.address?.googleMapsEmbedUrl ||
                  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.61185040582!2d32.1000!3d30.5500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMzJzAwLjAiTiAzMsKwMDYnMDAuMCJF!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg'
                }
                className="w-full h-full border-0 filter saturate-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Center Map Overlay Pin Indicator matching Reference */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                  <MapPin className="w-5 h-5 fill-white text-brand-orange" />
                </div>
                <div className="mt-1 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-white/20 whitespace-nowrap">
                  مقر مصنع بتروكيما للدهانات
                </div>
              </div>

              {/* Bottom Right: Open in Google Maps Link */}
              <a
                href={contactData?.address?.googleMapsLink || 'https://maps.google.com/?q=طريق+مصر+اسماعيليه+الصحراوي+مفارق+ابوصوير'}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 hover:text-brand-orange shadow-md border border-slate-200 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              >
                <span>فتح في خرائط Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Bottom Left: GPS Badge */}
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
                {contactData?.address?.gps || 'مفارق أبوصوير - طريق الإسماعيلية'}
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* ========================================================= */}
        {/* BOTTOM SECTION: SOCIAL MEDIA WHITE CARD                   */}
        {/* ========================================================= */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-100 my-12 text-center">
            
            {/* Header */}
            <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
              تواصل معنا
            </h2>
            <div className="w-12 h-1 bg-brand-orange rounded-full mx-auto mt-2.5 mb-10" />

            {/* Social Grid (2 cols mobile, 4 cols desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {(contactData?.socialMedia || []).map((item) => {
                const IconComponent = BrandIcons[item.id] || BrandIcons.twitter;
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all text-right"
                  >
                    {/* Platform Icon */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <IconComponent />
                    </div>

                    {/* Platform Names & Handle */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-700 truncate group-hover:text-brand-orange transition-colors">
                        {item.name}
                      </span>
                      <span
                        dir="ltr"
                        style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
                        className="text-[11px] font-medium text-slate-400 truncate inline-block group-hover:text-brand-orange transition-colors"
                      >
                        {item.handle}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default ContactPage;
