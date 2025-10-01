import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, Phone, Menu, X, ChevronDown } from 'lucide-react';
import logonav from '../assets/logonav.png';
import whatsappIcon from '../assets/whatsapp-icon.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [menuAnimReady, setMenuAnimReady] = useState(false);

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

  // Lock body scroll and bind ESC to close when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      window.addEventListener('keydown', onKeyDown);
      // prepare staged animations next frame
      const rafId = requestAnimationFrame(() => setMenuAnimReady(true));
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener('keydown', onKeyDown);
        cancelAnimationFrame(rafId);
        setMenuAnimReady(false);
      };
    }
  }, [isMenuOpen]);

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

  const openWhatsapp = (rawNumber) => {
    const phoneNumber = rawNumber.replace(/[^0-9]/g, '');
    const withCountry = phoneNumber.startsWith('62') ? phoneNumber : (phoneNumber.startsWith('0') ? `62${phoneNumber.slice(1)}` : `62${phoneNumber}`);
    const message = 'Halo, saya tertarik dengan layanan Valpro. Bisa bantu saya? (Pesan Otomatis Dari Website valprointertech.com)';
    const whatsappUrl = `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
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
            <div className="relative ml-2">
              <button
                onClick={() => setIsCsOpen(!isCsOpen)}
                className="inline-flex items-center h-10 rounded-full px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                aria-label="Customer Service"
              >
                <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
                <span className="ml-2 font-medium">Customer Service</span>
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isCsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black/5 overflow-hidden z-50 transform transition duration-200 ease-out">
                  <div className="py-1">
                    <button onClick={() => openWhatsapp('081399710085')} className="w-full px-4 py-3 text-left hover:bg-gray-50 flex flex-col transition-all duration-200 hover:translate-x-1">
                      <span className="font-semibold text-gray-900">Angga Puziana</span>
                      <span className="text-sm text-gray-600">081399710085</span>
                    </button>
                    <button onClick={() => openWhatsapp('089518530306')} className="w-full px-4 py-3 text-left hover:bg-gray-50 flex flex-col border-t border-gray-100 transition-all duration-200 hover:translate-x-1">
                      <span className="font-semibold text-gray-900">Ilyasa Meydiansyah</span>
                      <span className="text-sm text-gray-600">089518530306</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop overlay */}
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${menuAnimReady ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Overlay gradient for depth */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-transparent transition-opacity duration-500 ${menuAnimReady ? 'opacity-100' : 'opacity-0'}`} />

            {/* Sliding panel */}
            <div className={`absolute top-0 left-0 right-0 rounded-b-2xl bg-white shadow-xl transform transition-all duration-300 ease-out ${menuAnimReady ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
              {/* Panel header */}
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                  <img src={logonav} alt="Valpro" className="h-7 w-auto" />
                  <span className="font-semibold text-gray-900">Menu</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition"
                  aria-label="Tutup menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Panel content */}
              <div className="max-h-[75vh] overflow-y-auto">
                <div className="px-3 py-2 space-y-1">
                  {navItems.map(({ label, href, icon }, index) => (
                    <button
                      key={href}
                      onClick={() => handleNavClick(href)}
                      className={`flex items-center gap-3 px-3 py-3 text-gray-800 hover:text-[#253994] font-semibold transition-all duration-300 hover:bg-gray-50 active:scale-[0.99] rounded-xl w-full text-left transform ${menuAnimReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                      style={{ transitionDelay: `${menuAnimReady ? index * 60 : 0}ms` }}
                    >
                      {React.createElement(icon, { className: 'w-5 h-5', 'aria-hidden': true })}
                      <span className="text-base">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Sticky CS section */}
                <div className="sticky bottom-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 space-y-2">
                  <div className="text-xs text-gray-500 px-1">Customer Service</div>
                  <button
                    onClick={() => { openWhatsapp('081399710085'); setIsMenuOpen(false); }}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-3 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] shadow-sm"
                  >
                    <span className="flex items-center gap-2">
                      <img src={whatsappIcon} alt="WA" className="w-5 h-5" />
                      <span>
                        Angga Puziana
                        <span className="block text-xs font-normal text-white/90">Balas cepat</span>
                      </span>
                    </span>
                    <span className="text-white/95 font-medium tracking-wide">081399710085</span>
                  </button>
                  <button
                    onClick={() => { openWhatsapp('089518530306'); setIsMenuOpen(false); }}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-3 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] shadow-sm"
                  >
                    <span className="flex items-center gap-2">
                      <img src={whatsappIcon} alt="WA" className="w-5 h-5" />
                      <span>
                        Ilyasa Meydiansyah
                        <span className="block text-xs font-normal text-white/90">Admin online</span>
                      </span>
                    </span>
                    <span className="text-white/95 font-medium tracking-wide">089518530306</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
