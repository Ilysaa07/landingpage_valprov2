import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';
import bannerClient from '../assets/clientlogo/bannerclient.png';
import bannerClient2 from '../assets/clientlogo/bannerclient2.png';
import bannerClient3 from '../assets/clientlogo/bannerclient3.png';
import bannerClient4 from '../assets/clientlogo/bannerclient4.png';
import bannerClient5 from '../assets/clientlogo/bannerclient5.png';
import { Building2, Target, CheckCircle2, PlayCircle, ShieldCheck, Sparkles, Award, Users, TrendingUp } from 'lucide-react';
import logo from '../assets/logo.png';

const About = React.memo(() => {
  // Client logos banner - using a single wide image from src/assets/clientlogo/bannerclient.png

  const [isPaused, setIsPaused] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section 
      id="profil" 
      aria-labelledby="about-heading" 
      className="relative py-24 bg-[#0e0637] overflow-hidden"
    >
      {/* Enhanced background accents with animation */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft radial glow accents matching theme */}
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-[#5792ff]/10 blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-[#4a7cd6]/10 blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#5792ff]/5 blur-3xl" />

        {/* Subtle radial grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.08]" 
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5792ff 1px, transparent 0)', backgroundSize: '22px 22px' }} />

        {/* Conic highlight accent */}
        <div className="absolute -bottom-1/4 -left-1/4 h-[28rem] w-[28rem] blur-3xl opacity-20"
             style={{ background: 'conic-gradient(from 180deg at 50% 50%, rgba(87,146,255,0.25), rgba(74,124,214,0.15), transparent 55%)' }} />

        {/* Angled gradient ribbon for depth */}
        <div className="absolute -top-10 -left-24 h-56 w-[140%] rotate-[-6deg] opacity-20"
             style={{ background: 'linear-gradient(90deg, rgba(87,146,255,0.20), rgba(87,146,255,0.05) 45%, transparent)' }} />

        {/* Fine noise overlay */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
             style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.35\'/></svg>\')' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Video */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Media Section */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative group">
              {/* Main video container with enhanced styling */}
              <figure className="relative rounded-full overflow-hidden shadow-2xl ring-1 ring-white/20 bg-white aspect-square max-w-lg md:max-w-xl mx-auto transform transition-all duration-500 group-hover:shadow-[0_0px_60px_15px_rgba(87,146,255,0.8),0_0px_100px_30px_rgba(87,146,255,0.4),0_0px_150px_50px_rgba(87,146,255,0.2)] group-hover:scale-[1.05] group-hover:ring-[#5792ff]/80 group-hover:ring-2">
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#5792ff] border-t-transparent" />
                  </div>
                )}
                <img
                  className="w-full h-full object-contain p-6"
                  src={logo}
                  alt="Valpro Intertech Logo"
                  loading="lazy"
                  onLoad={() => setIsVideoLoaded(true)}
                />
                {/* Video overlay gradient */}
                <div className="hidden absolute inset-0 pointer-events-none" />
              </figure>


            </div>
          </div>

          {/* Content Section - Enhanced Typography */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                <span className="h-0.5 w-16 bg-gradient-to-r from-[#5792ff] to-transparent" />
                <span className="text-sm font-semibold tracking-wider text-[#5792ff] uppercase">Tentang Perusahaan</span>
              </div>
              <h2 id="about-heading" className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
                Tentang<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5792ff] to-[#4a7cd6]">
                  Perusahaan
                </span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#5792ff] to-transparent rounded-full" />
            </header>

            <p className="text-gray-200 text-lg leading-relaxed mb-8 font-light">
              Mitra Legalitas Usaha Anda — Kami hadir untuk membantu Anda memulai, memperkuat, dan menumbuhkan usaha dengan dasar hukum yang kuat dan terpercaya. Berdiri lebih dari 10 tahun yang lalu sebagai konsultan kecil, kini kami telah membantu ratusan pelaku usaha dari berbagai sektor.
            </p>

            <p className="text-gray-300 text-base leading-relaxed mb-10 font-light">
              Pada 2022, kami resmi berbadan hukum sebagai Perseroan Terbatas (PT), menandai komitmen kami dalam mendampingi bisnis Anda dengan profesionalitas tertinggi.
            </p>

            {/* Enhanced feature cards */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="group flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#5792ff]/10 to-[#5792ff]/5 flex items-center justify-center transition-all">
                  <Sparkles aria-hidden="true" className="w-6 h-6 text-[#5792ff]" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Pendampingan Andal</p>
                  <p className="text-sm text-gray-300 leading-relaxed">Ramah, cepat tanggap, dan solutif untuk setiap kebutuhan bisnis Anda.</p>
                </div>
              </div>
              <div className="group flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#5792ff]/10 to-[#5792ff]/5 flex items-center justify-center transition-all">
                  <ShieldCheck aria-hidden="true" className="w-6 h-6 text-[#5792ff]" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Legalitas Terpercaya</p>
                  <p className="text-sm text-gray-300 leading-relaxed">Profesional, transparan, dan berorientasi pada hasil maksimal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision and Mission - Enhanced Cards */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch mb-24">
          <section 
            aria-labelledby="vision-heading" 
            className="md:col-span-5 rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-8 sm:p-10 transform transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#5792ff]/5 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5792ff] to-[#4a7cd6] flex items-center justify-center shadow-lg">
                  <Target aria-hidden="true" className="w-7 h-7 text-white" />
                </div>
                <h3 id="vision-heading" className="text-3xl font-bold text-white">
                  Visi
                </h3>
              </div>
              <p className="text-gray-200 leading-relaxed text-lg font-light">
                Menjadi mitra utama layanan legalitas dan perizinan usaha terpercaya di Indonesia yang mendorong pertumbuhan bisnis melalui fondasi hukum yang kuat.
              </p>
            </div>
          </section>

          <section 
            aria-labelledby="mission-heading" 
            className="md:col-span-7 rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-8 sm:p-10 transform transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#5792ff]/5 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5792ff] to-[#4a7cd6] flex items-center justify-center shadow-lg">
                  <CheckCircle2 aria-hidden="true" className="w-7 h-7 text-white" />
                </div>
                <h3 id="mission-heading" className="text-3xl font-bold text-white">
                  Misi
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Memberikan pendampingan yang ramah, cepat tanggap, dan solutif.',
                  'Menyediakan layanan legalitas usaha yang profesional dan transparan.',
                  'Membantu UMKM hingga perusahaan besar membangun kepercayaan melalui dokumen legal yang sah.',
                  'Menjadi jembatan antara regulasi dan praktik bisnis yang efisien.'
                ].map((mission, index) => (
                  <li key={index} className="flex gap-4 group/item">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#5792ff]/20 to-[#5792ff]/10 flex items-center justify-center mt-0.5 group-hover/item:from-[#5792ff] group-hover/item:to-[#4a7cd6] transition-all">
                      <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-[#5792ff] group-hover/item:text-white transition-colors" />
                    </div>
                    <span className="text-gray-200 leading-relaxed font-light">{mission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Client Logos Marquee Section */}
        <section aria-labelledby="clients-heading" className="py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
              <span className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#5792ff] to-transparent" />
            </div>
            <h3 id="clients-heading" className="text-4xl font-bold text-white mb-4">
              Dipercaya Oleh
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
              Ratusan perusahaan telah mempercayakan legalitas bisnis mereka kepada kami
            </p>
          </div>

          {/* Interactive Marquee */
          /* Uses a single banner image repeated seamlessly */}
          <div 
            className="relative overflow-hidden py-8 bg-[#0e0637]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="rounded-full bg-white shadow-2xl ring-1 ring-white/20 px-16 py-20 space-y-8 max-w-6xl mx-auto">
              <Marquee pauseOnHover={true} gradient={false} speed={25}>
                <div className="flex items-center gap-16">
                  {[bannerClient, bannerClient2, bannerClient3, bannerClient4, bannerClient5].map((src, idx) => (
                    <img
                      key={`row1-${idx}`}
                      src={src}
                      alt={`Banner Klien ${idx + 1}`}
                      className="h-16 sm:h-20 md:h-24 object-contain opacity-95 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  ))}
                </div>
              </Marquee>
              <Marquee pauseOnHover={true} gradient={false} speed={22} direction="right">
                <div className="flex items-center gap-16">
                  {[bannerClient3, bannerClient4, bannerClient5, bannerClient, bannerClient2].map((src, idx) => (
                    <img
                      key={`row2-${idx}`}
                      src={src}
                      alt={`Banner Klien ${idx + 1}`}
                      className="h-16 sm:h-20 md:h-24 object-contain opacity-95 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  ))}
                </div>
              </Marquee>
              <Marquee pauseOnHover={true} gradient={false} speed={28}>
                <div className="flex items-center gap-16">
                  {[bannerClient2, bannerClient5, bannerClient, bannerClient3, bannerClient4].map((src, idx) => (
                    <img
                      key={`row3-${idx}`}
                      src={src}
                      alt={`Banner Klien ${idx + 1}`}
                      className="h-16 sm:h-20 md:h-24 object-contain opacity-95 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  ))}
                </div>
              </Marquee>
            </div>

            {/* Pause indicator */}
            {isPaused && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                Dijeda
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Removed custom marquee CSS as we now use react-fast-marquee */}
    </section>
  );
});

export default About;