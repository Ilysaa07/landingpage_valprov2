import React from 'react';
import { Star, Users, Clock, CheckCircle, Building2, Award, FileText, HelpCircle } from 'lucide-react';
import bgHero from '../assets/background-hero.svg';

const Hero = () => {
  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <section
      id="beranda"
      className="relative text-white overflow-hidden bg-[#0e0637]"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for readability (reduced opacity to reveal background) */}
      <div className="absolute inset-0 " aria-hidden="true" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 lg:pt-32 pb-24 md:pb-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Fondasi Hukum yang{' '}
                <span className="text-[#5792ff]">Kuat</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-blue-100">
                Kunci Pertumbuhan Usaha
              </h2>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-[#5792ff]/20 to-[#5792ff]/10 rounded-full border border-[#5792ff]/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-2">
              <Star className="w-5 h-5 text-[#5792ff] mr-3 fill-[#5792ff] animate-pulse" />
              <span className="text-sm font-semibold text-white">Layanan Hukum Terpercaya</span>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl">
              Fondasi hukum yang kuat adalah kunci pertumbuhan usaha. Kami hadir untuk menyederhanakan proses legalitas dan perizinan agar Anda bisa fokus mengembangkan bisnis.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('#kontak')}
                className="bg-[#5792ff] hover:bg-[#4a82e6] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Konsultasi Gratis
              </button>
              <button 
                onClick={() => scrollToSection('#layanan')}
                className="border-2 border-white text-white hover:bg-white hover:text-[#173e8a] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl"
              >
                Lihat Layanan
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all">
                <Users className="w-5 h-5 text-[#5792ff]" />
                <span className="text-sm font-medium">1000+ Klien Puas</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all">
                <Clock className="w-5 h-5 text-[#5792ff]" />
                <span className="text-sm font-medium">10+ Tahun Pengalaman</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all">
                <CheckCircle className="w-5 h-5 text-[#5792ff]" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Removed bottom blur and border for seamless transition to About */}
    </section>
  );
};

export default Hero;