import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ASSETS } from '../../utils/constants';
import Button from '../ui/Button';
import useScrollPosition from '../../hooks/useScrollPosition';
import { Menu, X, PhoneCall } from 'lucide-react';

export const Navbar = ({ onOpenContactModal, isLoading = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrolled } = useScrollPosition(20);
  const location = useLocation();

  if (isLoading) return null;

  const navItems = [
    { label: 'الرئيسية', path: '/' },
    { label: 'منتجاتنا', path: '/products' },
    { label: 'من نحن', path: '/about' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.includes('#')) {
      const hash = path.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in-rtl ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Action / Contact Button (Left side in RTL) */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center bg-brand-orange text-white hover:bg-brand-orange-hover font-bold text-sm rounded-lg px-6 py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              تواصل معنا
            </Link>

            {/* Mobile hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-slate-700 hover:text-brand-orange focus:outline-none"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-8 text-base font-semibold">
            {navItems.map((item) => {
              const isHash = item.path.includes('#');
              const isActive = location.pathname === item.path && !location.hash;

              if (isHash) {
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => {
                      if (location.pathname === '/' && item.path.includes('#')) {
                        e.preventDefault();
                        handleNavClick(item.path);
                      }
                    }}
                    className="relative py-1 transition-colors duration-200 text-slate-600 hover:text-brand-orange"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-brand-orange font-bold'
                      : 'text-slate-600 hover:text-brand-orange'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-brand-orange rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Brand Logo (Right side in RTL) */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={ASSETS.logo}
              alt="بتروكيما للدهانات"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl px-4 pt-3 pb-6 animate-fade-in-rtl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isHash = item.path.includes('#');
              const isActive = location.pathname === item.path;

              if (isHash) {
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => {
                      if (location.pathname === '/' && item.path.includes('#')) {
                        e.preventDefault();
                        handleNavClick(item.path);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="text-base font-semibold text-slate-700 hover:text-brand-orange py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'text-brand-orange font-bold bg-orange-50'
                      : 'text-slate-700 hover:text-brand-orange hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center bg-brand-orange text-white hover:bg-brand-orange-hover font-bold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                <PhoneCall className="w-4 h-4 ml-2" />
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
