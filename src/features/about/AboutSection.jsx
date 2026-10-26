import React from 'react';
import { ASSETS, COMPANY_INFO } from '../../utils/constants';
import Button from '../../components/ui/Button';
import { Leaf, Award, ShieldCheck } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Leaf,
    title: 'صديقة للبيئة',
    subtitle: 'استدامة وأمان',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  },
  {
    icon: Award,
    title: 'خبرة طويلة',
    subtitle: 'في السوق',
    color: 'text-brand-orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    icon: ShieldCheck,
    title: 'جودة مضمونة',
    subtitle: 'في كل منتج',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
];

export const AboutSection = ({ onLearnMore }) => {
  return (
    <section id="about" className="relative py-12 sm:py-20 bg-white overflow-hidden">
      
      {/* Paint Splash Decorative Divider (Expanded & High Impact) */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 mb-12 sm:mb-20 flex justify-center overflow-visible">
        <img
          src={ASSETS.paintSplash}
          alt="طيف ألوان بتروكيما المتناسقة"
          className="w-full max-w-5xl lg:max-w-6xl h-auto object-contain select-none pointer-events-none drop-shadow-md scale-100 sm:scale-105 transition-transform"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Text & Features (Right side in RTL) */}
          <div className="w-full lg:w-7/12 text-right space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy">
                من نحن
              </h2>
              <div className="w-16 h-1 bg-brand-orange mt-2 rounded-full" />
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              {COMPANY_INFO.description}
            </p>

            {/* 3 Key Value Cards (Matches screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${item.borderColor} ${item.bgColor} flex flex-col items-center sm:items-start text-center sm:text-right transition-transform hover:-translate-y-1 shadow-sm`}
                  >
                    <div className={`p-2.5 rounded-xl bg-white shadow-sm mb-3 ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                size="lg"
                showArrow
                className="rounded-full px-8 font-bold border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                onClick={onLearnMore}
              >
                اعرف المزيد
              </Button>
            </div>
          </div>

          {/* About Image / Painter at Work (Left side in RTL) */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50">
              <img
                src={ASSETS.painterWork}
                alt="فني دهانات متخصص مع منتجات بتروكيما"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
