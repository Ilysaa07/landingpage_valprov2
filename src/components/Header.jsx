import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, Phone, Menu, X } from 'lucide-react';
import logonav from '../assets/logonav.png';
import whatsappIcon from '../assets/whatsapp-icon.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on a service detail page or data page
  const isServicePage = location.pathname.startsWith('/layanan/');
  const isDataPage = location.pathname === '/datapemenuhanalat';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle scroll to section when navigating from service page
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const scrollToElement = () => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

      // Try multiple times to ensure scroll happens
      setTimeout(scrollToElement, 500);
      setTimeout(scrollToElement, 1000);
      setTimeout(scrollToElement, 1500);
    }
  }, [location]);

  // Handle navigation click
  const handleNavClick = (href) => {
    if (isServicePage || isDataPage) {
      // If on service page or data page, navigate to home page with hash
      navigate(`/${href}`);
    } else {
      // If on home page, just scroll to section with header offset
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = 80; // Height of fixed header
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Beranda', href: '#beranda', icon: Home },
    { label: 'Profil', href: '#profil', icon: User },
    { label: 'Layanan', href: '#layanan', icon: Briefcase },
    { label: 'Kontak', href: '#kontak', icon: Phone }
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = '6289518530306'; // Nomor WhatsApp Valpro Intertech
    const message = 'Halo, saya tertarik dengan layanan Valpro. Bisa bantu saya? (Pesan Otomatis Dari Website valprointertech.com)';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className={`fixed w-full top-0 z-50 navbar-transition bg-transparent`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mt-3 transition-all duration-500 ease-in-out`}>
          <div
            className={`pointer-events-auto rounded-[26px] border ${
              isScrolled
                ? 'bg-white/80 backdrop-blur-xl border-white/30 shadow-lg'
                : 'bg-slate-900/40 backdrop-blur-md border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.15)]'
            }`}
          >
            <div className={`flex items-center justify-between ${
              isScrolled ? 'py-2.5 sm:py-3 px-3 sm:px-4' : 'py-3 sm:py-4 px-3 sm:px-5'
            }`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleNavClick('#beranda')}
              className="block group"
            >
              <div className="logo-background rounded-lg p-0">
                <img 
                  src={logonav} 
                  alt="Valpro Logo" 
                  className={`h-8 sm:h-10 w-auto object-contain logo-transition transform ${
                    isScrolled 
                      ? 'hover:opacity-80 hover:scale-105' 
                      : 'hover:scale-105'
                  }`}
                  style={{
                    filter: isScrolled 
                      ? 'drop-shadow(0 6px 16px rgba(0,0,0,0.6))'
                      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.25)) brightness(0) invert(1)',
                    WebkitFilter: isScrolled 
                      ? 'drop-shadow(0 6px 16px rgba(0,0,0,0.6))'
                      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.25)) brightness(0) invert(1)'
                  }}
                />
              </div>
            </button>
          </div>
          {/* Desktop Navigation - Minimal icon-first pills */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map(({ label, href, icon }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                aria-label={label}
                className={`group inline-flex items-center h-10 rounded-full px-3 transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-800 hover:text-[#5792ff] hover:bg-[#5792ff]/10'
                    : 'text-white hover:text-[#5792ff] hover:bg-white/10'
                }`}
              >
                {React.createElement(icon, { className: 'w-5 h-5', 'aria-hidden': true })}
                <span className={`ml-2 max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100`}>
                  {label}
                </span>
              </button>
            ))}
            <button
              onClick={handleWhatsAppClick}
              className="ml-2 inline-flex items-center h-10 rounded-full px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-300 shadow-lg group relative overflow-hidden"
              aria-label="WhatsApp"
            >
              {/* Animated background pulse */}
              <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse opacity-30"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#20BA5A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center">
                <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 animate-bounce" style={{ animationDuration: '2s' }} />
                <span className="ml-2 max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[100px] group-hover:opacity-100 font-medium">
                  WhatsApp
                </span>
              </div>
              
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
              <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`focus:outline-none p-2 transition-all duration-300 hover:scale-110 ${
                  isScrolled 
                    ? 'text-gray-800 hover:text-[#5792ff]' 
                    : 'text-white hover:text-[#5792ff] text-shadow-strong'
                }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map(({ label, href, icon }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className="flex items-center gap-3 px-3 py-2 text-gray-800 hover:text-[#253994] font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-[#253994]/5 hover:to-amber-500/5 hover:translate-x-2 transform rounded w-full text-left"
                >
                  {React.createElement(icon, { className: 'w-5 h-5', 'aria-hidden': true })}
                  <span>{label}</span>
                </button>
              ))}

              {/* Mobile WhatsApp Button */}
              <button
                onClick={() => {
                  handleWhatsAppClick();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-3 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 mt-4 hover:scale-105 transform shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                {/* Animated background pulse */}
                <div className="absolute inset-0 bg-[#25D366] rounded-lg animate-pulse opacity-30"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#20BA5A] rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center space-x-2">
                  <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 animate-bounce" style={{ animationDuration: '2s' }} />
                  <span className="font-semibold">WhatsApp</span>
                </div>
                
                {/* Notification dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping">
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
