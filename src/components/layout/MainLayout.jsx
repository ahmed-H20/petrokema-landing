import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from '../../features/contact/ContactModal';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';

export const MainLayout = ({ isLoading = false }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenContactModal = (product = null) => {
    setSelectedProduct(product);
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar: completely hidden while preloader is active */}
      {!isLoading && (
        <Navbar onOpenContactModal={() => handleOpenContactModal(null)} />
      )}

      {/* Main Page Content */}
      <main className="flex-grow pt-16">
        <Outlet context={{ openContactModal: handleOpenContactModal }} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Connection Button */}
      {!isLoading && <FloatingWhatsApp />}

      {/* Reusable Contact / Consultation Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default MainLayout;
