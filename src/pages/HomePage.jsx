import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../features/hero/Hero';
import PromoBanner from '../features/hero/PromoBanner';
import ProductsList from '../features/products/ProductsList';
import AboutSection from '../features/about/AboutSection';
import ScrollReveal from '../components/ui/ScrollReveal';

export const HomePage = () => {
  const { openContactModal } = useOutletContext();

  const handleProductSelect = (product) => {
    openContactModal();
  };

  return (
    <div>
      {/* 1. Hero Interior Section: Full Width & Full Screen */}
      <Hero />

      {/* Subsequent Sections with Consistent Vertical Spacing */}
      <div className="space-y-6 sm:space-y-12">
        {/* 2. Promo Banner Card (دهانات لاكيه سوبر ستار) */}
        <ScrollReveal yOffset={40}>
          <PromoBanner onDiscoverProduct={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }} />
        </ScrollReveal>

        {/* 3. Products List Catalog */}
        <ScrollReveal yOffset={50}>
          <ProductsList onRequestQuote={handleProductSelect} />
        </ScrollReveal>

        {/* 4. About Us with Paint Splash & Company Highlights */}
        <ScrollReveal yOffset={50}>
          <AboutSection onLearnMore={openContactModal} />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default HomePage;
