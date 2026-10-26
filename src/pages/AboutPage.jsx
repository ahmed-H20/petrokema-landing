import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchAboutData } from '../api/aboutService';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import {
  Eye,
  Target,
  ShieldCheck,
  Palette,
  Users,
  Leaf,
  PhoneCall,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Factory,
  Building2,
  Award,
} from 'lucide-react';

/**
 * AboutPage Component
 * 
 * Strict RTL layout for Petrochem Paints:
 * 1. Hero Section with dark interior background, overlay text & 3 stats
 * 2. Industry Leadership Section (Split layout with factory image & feature points)
 * 3. Vision & Mission Section (2 large cards for Vision & Mission)
 * 4. Professional Expertise Section (4 cards with images, badges, descriptions)
 * 5. Why Petrochem? (4 value proposition cards with orange icons)
 * 6. Bottom CTA Banner (Dark navy background with dual buttons)
 */
export const AboutPage = () => {
  const { openContactModal } = useOutletContext() || {};

  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAboutData()
      .then((data) => {
        if (isMounted) {
          setAboutData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load about data:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Icon mapping helper for WhyUs section
  const renderWhyUsIcon = (iconName) => {
    const iconProps = { className: 'w-6 h-6 text-brand-orange' };
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck {...iconProps} />;
      case 'Palette':
        return <Palette {...iconProps} />;
      case 'Users':
        return <Users {...iconProps} />;
      case 'Leaf':
        return <Leaf {...iconProps} />;
      default:
        return <Award {...iconProps} />;
    }
  };

  if (loading || !aboutData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center" dir="rtl">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-600 font-bold">جاري تحميل بيانات من نحن...</p>
      </div>
    );
  }

  const { hero, stats, leadership, visionMission, expertise, whyUs, cta } = aboutData;

  return (
    <div className="bg-white min-h-screen text-slate-800" dir="rtl">
      
      {/* =========================================================================
          1. HERO SECTION (DARK INTERIOR BACKGROUND & OVERLAY STATS)
          ========================================================================= */}
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] flex items-center bg-slate-950 overflow-hidden text-white">
        {/* Background Interior Image with Cinematic Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('${hero.bgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 z-10 w-full">
          <div className="max-w-3xl text-right">
            
            {/* Tag / Breadcrumb */}
            <ScrollReveal yOffset={-20}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-bold text-orange-400 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                <span>{hero.tag}</span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal yOffset={30}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-snug sm:leading-normal lg:leading-[1.3] mb-6">
                <span className="block mb-2 sm:mb-3">{hero.titleLine1}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-l from-white via-slate-100 to-orange-400">
                  {hero.titleLine2}
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal yOffset={40} delay={0.1}>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mb-12">
                {hero.description}
              </p>
            </ScrollReveal>

            {/* Bottom Floating Stats */}
            <ScrollReveal yOffset={50} delay={0.2}>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/15 max-w-2xl">
                <div>
                  <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    {stats.percentage}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                    {stats.percentageLabel}
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    {stats.years}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                    {stats.yearsLabel}
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    {stats.branches}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                    {stats.branchesLabel}
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. INDUSTRY LEADERSHIP SECTION (SPLIT LAYOUT)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Right Column: Text & Features (RTL right) */}
            <div className="lg:col-span-6 order-1 text-right">
              <ScrollReveal yOffset={30}>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-8 h-1 bg-brand-orange rounded-full" />
                  <span className="text-xs sm:text-sm font-bold text-brand-orange tracking-wider">
                    {leadership.tag}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-normal sm:leading-relaxed lg:leading-[1.45] mb-6">
                  {leadership.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-8">
                  {leadership.description}
                </p>

                {/* Feature Bullet Points */}
                <div className="space-y-4">
                  {leadership.points.map((pt) => (
                    <div
                      key={pt.id}
                      className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <h4 className="text-sm sm:text-base font-bold text-brand-navy">
                          {pt.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Left Column: Factory Image & Floating Badge Card */}
            <div className="lg:col-span-6 order-2">
              <ScrollReveal yOffset={40}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-100">
                  <img
                    src={leadership.image}
                    alt="مصانع ومعامل بتروكيما"
                    className="w-full h-[360px] sm:h-[460px] object-cover rounded-3xl hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Floating White Card at Bottom */}
                  <div className="absolute bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-6 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Factory className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <h4 className="text-sm sm:text-base font-bold text-brand-navy">
                        {leadership.cardBadge}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {leadership.cardSub}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. VISION & MISSION SECTION (2 LARGE CARDS)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <ScrollReveal yOffset={20}>
              <span className="text-xs sm:text-sm font-bold text-brand-orange tracking-wider block mb-2">
                نحو مستقبل أكثر إشراقاً
              </span>
              <div className="inline-flex items-center justify-center gap-3 mb-3">
                <span className="w-10 sm:w-14 h-0.5 bg-brand-orange rounded-full" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
                  رؤيتنا ورسالتنا
                </h2>
                <span className="w-10 sm:w-14 h-0.5 bg-brand-orange rounded-full" />
              </div>
            </ScrollReveal>
          </div>

          {/* 2-Card CSS Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            
            {/* Vision Card (Right in RTL) */}
            <ScrollReveal yOffset={30}>
              <div className="relative h-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between text-right group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {visionMission.vision.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-brand-navy mb-4">
                    {visionMission.vision.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                    {visionMission.vision.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-orange">
                  <span>ريادة معمارية إقليمية</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <span>حلول دهانات ذكية</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Mission Card (Left in RTL) */}
            <ScrollReveal yOffset={30} delay={0.15}>
              <div className="relative h-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between text-right group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-brand-orange border border-orange-100">
                      {visionMission.mission.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                      <Target className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-brand-navy mb-4">
                    {visionMission.mission.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                    {visionMission.mission.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-orange">
                  <span>أعلى معايير الجودة</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <span>دعم فني مستمر</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. EXPERTISE SECTION (4-COLUMN GRID OF CARDS)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <ScrollReveal yOffset={20}>
              <span className="text-xs sm:text-sm font-bold text-brand-orange tracking-wider block mb-2">
                حلول تشطيب متكاملة
              </span>
              <div className="inline-flex items-center justify-center gap-3 mb-3">
                <span className="w-8 sm:w-12 h-0.5 bg-brand-orange rounded-full" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight leading-normal sm:leading-relaxed lg:leading-[1.55]">
                  خبراتنا في عالم الدهانات والتشطيبات الاحترافية
                </h2>
                <span className="w-8 sm:w-12 h-0.5 bg-brand-orange rounded-full" />
              </div>
              <p className="text-sm sm:text-base text-slate-500 font-medium">
                نبتكر لكل سطح حلاً مخصصاً يجمع بين المظهر الفاخر والمتانة القصوى
              </p>
            </ScrollReveal>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {expertise.map((item, idx) => (
              <ScrollReveal key={item.id} yOffset={30} delay={idx * 0.1}>
                <div className="h-full rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                  
                  <div>
                    {/* Card Image with Badge */}
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-brand-navy/90 text-white backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 text-right">
                      <h3 className="text-base sm:text-lg font-black text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="p-5 sm:p-6 pt-0 text-right">
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-orange hover:text-brand-orange-hover transition-colors"
                    >
                      <span>استكشف المنتجات</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. WHY PETROCHEMA? (لماذا بتروكيما؟)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <ScrollReveal yOffset={20}>
              <span className="text-xs sm:text-sm font-bold text-brand-orange tracking-wider block mb-2">
                معايير تميزنا
              </span>
              <div className="inline-flex items-center justify-center gap-3 mb-3">
                <span className="w-10 sm:w-14 h-0.5 bg-brand-orange rounded-full" />
                <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
                  لماذا بتروكيما؟
                </h2>
                <span className="w-10 sm:w-14 h-0.5 bg-brand-orange rounded-full" />
              </div>
            </ScrollReveal>
          </div>

          {/* 4-Column Grid of Small Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyUs.map((feat, idx) => (
              <ScrollReveal key={feat.id} yOffset={30} delay={idx * 0.1}>
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 text-right group flex flex-col justify-between">
                  <div>
                    {/* Orange Icon Container */}
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
                      <span className="group-hover:brightness-0 group-hover:invert transition-all">
                        {renderWhyUsIcon(feat.icon)}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-brand-navy mb-2">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. CALL TO ACTION (CTA) BOTTOM BANNER
          ========================================================================= */}
      <section className="relative w-full bg-[#0a1a33] py-20 sm:py-24 text-white overflow-hidden text-center">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <ScrollReveal yOffset={30}>
            {/* Small accent dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-brand-orange mx-auto mb-4" />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              {cta.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
              {cta.subtitle}
            </p>

            {/* Centered Dual Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                className="rounded-xl px-8 shadow-hero-btn"
                onClick={openContactModal}
              >
                <PhoneCall className="w-5 h-5 ml-2" />
                {cta.primaryButton}
              </Button>

              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-white/30 text-white font-bold hover:bg-white/10 hover:border-white transition-all text-sm sm:text-base shadow-sm"
              >
                {cta.secondaryButton}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
