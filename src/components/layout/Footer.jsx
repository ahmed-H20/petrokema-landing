import React from 'react';
import { MapPin, Phone, Headphones } from 'lucide-react';
import { COMPANY_INFO, SUPPORT_CONTACTS } from '../../utils/constants';

/**
 * Factory Circular Badge Icon matching brand reference
 */
const FactoryIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="w-8 h-8 sm:w-9 sm:h-9 text-white"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Chimney on Left */}
    <path d="M19 22h4v19h-4z" />
    <path d="M18 20h6v2h-6z" />
    {/* Smoke plumes */}
    <path
      d="M21 16c-1-2 0.5-4 2.5-4.5 2-0.5 4 0.5 4.5 2 0.5 1.5 2.5 2 4 1"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M25 10c0.5-1.5 2-2.5 3.5-2 1.5 0.5 2.5 2 2 3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Sawtooth Factory Building */}
    <path d="M25 41V29l9-7v7l9-7v7l7-5v21H25z" />
    {/* Windows */}
    <rect x="29" y="32" width="3.5" height="4.5" rx="0.5" fill="#131c16" />
    <rect x="34.5" y="32" width="3.5" height="4.5" rx="0.5" fill="#131c16" />
    <rect x="40" y="32" width="3.5" height="4.5" rx="0.5" fill="#131c16" />
    <rect x="45.5" y="32" width="3.5" height="4.5" rx="0.5" fill="#131c16" />
    {/* Foundation / Base */}
    <rect x="15" y="41" width="37" height="2.5" rx="1.2" />
  </svg>
);

/**
 * WhatsApp SVG Icon
 */
const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.004 2C6.484 2 2.008 6.476 2.008 11.996c0 1.838.498 3.565 1.365 5.064L2 22l5.105-1.338a9.92 9.92 0 004.899 1.334c5.52 0 9.996-4.476 9.996-9.996C22 6.476 17.524 2 12.004 2zm5.836 14.18c-.244.688-1.42 1.32-1.956 1.378-.49.052-1.12.074-3.626-.963-3.208-1.327-5.263-4.577-5.424-4.79-.16-.214-1.306-1.74-1.306-3.32 0-1.58.828-2.357 1.12-2.678.293-.321.637-.402.85-.402.213 0 .426.002.613.012.2.01.468-.076.732.558.274.66.932 2.274 1.013 2.438.082.164.137.357.027.575-.11.218-.164.354-.326.548-.163.193-.343.432-.49.58-.163.164-.333.342-.143.668.19.327.846 1.396 1.815 2.26 1.246 1.11 2.298 1.455 2.625 1.618.327.164.518.137.71-.082.191-.219.82-1.008 1.038-1.353.219-.346.438-.288.733-.18.295.109 1.875.883 2.196 1.043.322.16.536.24.614.372.078.132.078.766-.166 1.454z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden" dir="rtl">
      {/* Golden Arched Curve at the top matching visual reference */}
      <div className="w-full overflow-hidden leading-none -mb-[1px]">
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 block"
        >
          <path d="M0,48 Q600,0 1200,48 L1200,48 L0,48 Z" fill="#131c16" />
          <path d="M0,48 Q600,0 1200,48" fill="none" stroke="#c5a059" strokeWidth="2.5" />
        </svg>
      </div>

      {/* Main Dark Body */}
      <div className="bg-[#131c16] px-4 sm:px-6 lg:px-8 pb-8 pt-2 shadow-inner">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Factory Logo & Name (Right) + Address & Location Pin (Left) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 py-4">
            
            {/* Factory Badge & Name */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#c5a059] flex items-center justify-center bg-[#17221b] shadow-lg flex-shrink-0 p-1.5 sm:p-2">
                <FactoryIcon />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                {COMPANY_INFO.name}
              </h3>
            </div>

            {/* Address & Pin */}
            <div className="flex items-center gap-2 text-white/95 text-xs sm:text-sm md:text-base font-semibold text-center md:text-left">
              <span>
                العنوان : {COMPANY_INFO.address} .
              </span>
              <MapPin className="w-5 h-5 text-[#c5a059] fill-[#c5a059]/20 flex-shrink-0" />
            </div>

          </div>

          {/* Golden Horizontal Divider Line */}
          <div className="w-full h-[1px] bg-[#c5a059]/50 my-3 sm:my-4" />

          {/* Technical Support & Inquiries Strip */}
          <div className="my-2 py-2.5 px-4 rounded-xl bg-white/5 border border-[#c5a059]/30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-[#c5a059] font-bold">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a059]" />
              <span>الدعم الفني والاستفسار:</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {/* Eng Ahmed Hesham */}
              <div className="flex items-center gap-2">
                <span className="text-white/85 font-medium">مهندس أحمد هشام:</span>
                <a
                  href="tel:01226810306"
                  className="font-mono font-bold text-white hover:text-[#c5a059] transition-colors"
                  dir="ltr"
                >
                  01226810306
                </a>
                <a
                  href="https://wa.me/201226810306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
                  title="محادثة واتساب - م. أحمد هشام"
                >
                  <WhatsAppIcon className="w-3 h-3" />
                </a>
              </div>

              <span className="text-white/30 hidden sm:inline">|</span>

              {/* Eng Ahmed Gereish */}
              <div className="flex items-center gap-2">
                <span className="text-white/85 font-medium">مهندس أحمد جريش:</span>
                <a
                  href="tel:01018430679"
                  className="font-mono font-bold text-white hover:text-[#c5a059] transition-colors"
                  dir="ltr"
                >
                  010 18430679
                </a>
                <a
                  href="https://wa.me/201018430679"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
                  title="محادثة واتساب - م. أحمد جريش"
                >
                  <WhatsAppIcon className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Sub Divider Line */}
          <div className="w-full h-[1px] bg-white/10 my-2 sm:my-3" />

          {/* Bottom Row: Social Icons + Phone + Divider + WhatsApp */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Social Media Icons */}
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 hover:scale-105 transition-all shadow-md"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white hover:opacity-90 hover:scale-105 transition-all shadow-md"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                  }}
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>

              {/* Direct Phone Number */}
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 text-white hover:text-[#c5a059] transition-colors font-mono font-bold text-base sm:text-lg"
                dir="ltr"
              >
                <Phone className="w-5 h-5 text-white" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              {/* Separator Pipe */}
              <span className="text-white/40 font-light text-xl select-none hidden sm:inline">|</span>

              {/* WhatsApp Number */}
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors font-mono font-bold text-base sm:text-lg"
                dir="ltr"
              >
                <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <span>{COMPANY_INFO.whatsappDisplay}</span>
              </a>
            </div>

            {/* Slogan on Left */}
            <div className="text-xs sm:text-sm text-slate-300 font-medium">
              {COMPANY_INFO.slogan}
            </div>

          </div>

          {/* Copyright Sub-strip */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 gap-2">
            <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. جميع الحقوق محفوظة.</p>
            <p className="text-slate-400/80">صنع بكل فخر وفق أعلى معايير الجودة المصرية والعالمية.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
