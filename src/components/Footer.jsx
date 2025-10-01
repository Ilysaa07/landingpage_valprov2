import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import footerLogo from '../assets/footer.png';
import logo from '../assets/logo.png';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to section when landing on home with hash (same logic as header)
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const scrollToElement = () => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

      setTimeout(scrollToElement, 500);
      setTimeout(scrollToElement, 1000);
      setTimeout(scrollToElement, 1500);
    }
  }, [location]);

  const isServicePage = location.pathname.startsWith('/layanan/');
  const isDataPage = location.pathname === '/datapemenuhanalat';

  const handleNavClick = (href) => {
    if (isServicePage || isDataPage) {
      navigate(`/${href}`);
    } else {
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = 80; // match header offset
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }
  };

  // Helper to create slug identical to Services.jsx
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleServiceClick = (label) => {
    // Map generic footer label to an exact service title where needed
    const titleMap = {
      'Sertifikasi Konstruksi': 'Sertifikasi SBU Konstruksi'
    };
    const exactTitle = titleMap[label] || label;
    const slug = createSlug(exactTitle);
    navigate(`/layanan/${slug}`);
  };

  return (
    <footer className="text-white relative overflow-hidden">
      {/* Unique Geometric Wave Design */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-48 sm:h-56" viewBox="0 0 1200 200" preserveAspectRatio="none">
          {/* Complex layered wave with geometric patterns */}
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0e0637" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1a4bb1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2c5cc5" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2c5cc5" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#3d6fd9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4e82ec" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4e82ec" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#5792ff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4a7cd6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          {/* Bottom layer - dark foundation */}
          <path d="M0,200 L0,180 C200,160 400,200 600,170 C800,140 1000,190 1200,160 L1200,200 Z" 
                fill="url(#waveGradient1)" />
          
          {/* Middle layer - medium depth */}
          <path d="M0,200 L0,160 C150,140 300,180 450,150 C600,120 750,170 900,140 C1050,110 1200,150 1200,200 Z" 
                fill="url(#waveGradient2)" />
          
          {/* Top layer - main wave */}
          <path d="M0,200 L0,120 C100,100 200,140 300,110 C400,80 500,130 600,100 C700,70 800,120 900,90 C1000,60 1100,110 1200,80 L1200,200 Z" 
                fill="url(#waveGradient3)" />
          
          {/* Geometric accent shapes */}
          <circle cx="200" cy="50" r="8" fill="#5792ff" opacity="0.6" />
          <circle cx="400" cy="80" r="6" fill="#4a7cd6" opacity="0.7" />
          <circle cx="600" cy="40" r="10" fill="#5792ff" opacity="0.5" />
          <circle cx="800" cy="70" r="7" fill="#4a7cd6" opacity="0.6" />
          <circle cx="1000" cy="30" r="9" fill="#5792ff" opacity="0.4" />
        </svg>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#5792ff]/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-[#4a7cd6]/10 rounded-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[#5792ff]/10 rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-1/3 w-14 h-14 bg-[#4a7cd6]/10 rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Main footer content */}
      <div className="relative bg-gradient-to-br from-[#0e0637] via-[#1a4bb1] to-[#2c5cc5] pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main content grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Company Info - Enhanced */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#5792ff] to-[#4a7cd6] rounded-xl blur opacity-30"></div>
                  <img 
                    src={footerLogo} 
                    alt="Valpro Logo" 
                    className="relative h-16 w-auto"
                  />
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Mitra Legalitas Usaha Anda — Kami hadir untuk membantu Anda memulai, memperkuat, dan menumbuhkan usaha dengan dasar hukum yang kuat dan terpercaya.
            </p>
            <div className="flex space-x-4">
                <a href="https://www.facebook.com/valprointertech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#5792ff] transition-all duration-300 hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/valprointertech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#5792ff] transition-all duration-300 hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
              <h4 className="text-xl font-bold mb-6 text-white relative">
                Navigasi
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#5792ff] to-transparent"></div>
              </h4>
              <ul className="space-y-3">
                <li><a href="#beranda" onClick={(e) => { e.preventDefault(); handleNavClick('#beranda'); }} className="text-white/80 hover:text-[#5792ff] transition duration-300 text-sm flex items-center group">
                  <div className="w-1 h-1 bg-[#5792ff] rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                  Beranda
                </a></li>
                <li><a href="#profil" onClick={(e) => { e.preventDefault(); handleNavClick('#profil'); }} className="text-white/80 hover:text-[#5792ff] transition duration-300 text-sm flex items-center group">
                  <div className="w-1 h-1 bg-[#5792ff] rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                  Tentang Kami
                </a></li>
                <li><a href="#layanan" onClick={(e) => { e.preventDefault(); handleNavClick('#layanan'); }} className="text-white/80 hover:text-[#5792ff] transition duration-300 text-sm flex items-center group">
                  <div className="w-1 h-1 bg-[#5792ff] rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                  Layanan
                </a></li>
                <li><a href="#kontak" onClick={(e) => { e.preventDefault(); handleNavClick('#kontak'); }} className="text-white/80 hover:text-[#5792ff] transition duration-300 text-sm flex items-center group">
                  <div className="w-1 h-1 bg-[#5792ff] rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                  Kontak
                </a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
              <h4 className="text-xl font-bold mb-6 text-white relative">
                Layanan
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#5792ff] to-transparent"></div>
              </h4>
              <ul className="space-y-3">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleServiceClick('Pendirian Badan Usaha'); }} className="text-white/80 hover:text-[#5792ff] transition duration-300 text-sm flex items-center group">
                  <div className="w-1 h-1 bg-[#5792ff] rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                  Pendirian Badan Usaha
                </a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleServiceClick('Sertifikasi Konstruksi'); }} className="text-white/80 hover:text-[#5792ff] transition duration-300 text-sm flex items-center group">
                  <div className="w-1 h-1 bg-[#5792ff] rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                  Sertifikasi Konstruksi
                </a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleServiceClick('Sertifikasi ISO'); }} className="text-white/80 hover:text-[#5792ff] transition duration-300 text-sm flex items-center group">
                  <div className="w-1 h-1 bg-[#5792ff] rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                  Sertifikasi ISO
                </a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleServiceClick('Audit & Laporan Keuangan'); }} className="text-white/80 hover:text-[#5792ff] transition duration-300 text-sm flex items-center group">
                  <div className="w-1 h-1 bg-[#5792ff] rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                  Audit & Laporan Keuangan
                </a></li>
            </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white relative">
                Kontak
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#5792ff] to-transparent"></div>
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-[#5792ff] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm">+62 813-9971-0085</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-[#5792ff] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm">mail@valprointertech.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#5792ff] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm">Jl. Raya Gading Tutuka No.175 B, Soreang, Bandung</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-[#5792ff] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm">Senin-Jumat: 08.00-16.00</p>
                    <p className="text-white/80 text-sm">Sabtu: 08.00-13.00</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

          {/* Bottom section with unique design */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img 
                  src={logo} 
                  alt="Valpro Logo" 
                  className="w-8 h-8 mr-3"
                />
                <p className="text-white/80 text-sm">
                  © 2025 Valpro Intertech. All Rights Reserved
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-white/60 hover:text-[#5792ff] transition duration-300 text-sm">Privacy Policy</a>
                <a href="#" className="text-white/60 hover:text-[#5792ff] transition duration-300 text-sm">Terms of Service</a>
                <a href="#" className="text-white/60 hover:text-[#5792ff] transition duration-300 text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;