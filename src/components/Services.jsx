import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Award, FileText, Zap, Shield, CheckCircle, Calculator, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Helper function to create URL-friendly slug
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const services = [
    {
      title: "Pendirian Badan Usaha",
      description: "Layanan lengkap pendirian perusahaan mulai dari akta hingga izin operasional. Kami memastikan semua dokumen legalitas perusahaan Anda terpenuhi dengan standar hukum yang berlaku.",
      tags: ["Akta Notaris • SK Kemenkumham • NPWP Badan • NIB & Sertifikat OSS • Konsultasi Nama & Struktur Kepemilikan"],
      icon: Building2,
      category: "Legal"
    },
    {
      title: "Sertifikasi SKK Konstruksi",
      description: "Sertifikat Keahlian Kerja untuk tenaga ahli konstruksi semua jenjang. Kami membantu profesional konstruksi mendapatkan sertifikasi kompetensi yang diakui secara resmi.",
      tags: ["Pendampingan semua jenjang • Konsultasi klasifikasi & subklasifikasi • Registrasi via LPJK/BNSP"],
      icon: Award,
      category: "Konstruksi"
    },
    {
      title: "Sertifikasi SBU Konstruksi",
      description: "Sertifikat Badan Usaha untuk perusahaan konstruksi. Memastikan perusahaan Anda memiliki legalitas yang sah untuk menjalankan proyek konstruksi sesuai dengan regulasi yang berlaku.",
      tags: ["Pengajuan via LPJK / OSS • Konsultasi bidang dan kualifikasi • Validasi hingga sertifikat terbit"],
      icon: FileText,
      category: "Konstruksi"
    },
    {
      title: "Sertifikasi Serkom / SKKTK",
      description: "Sertifikasi kompetensi untuk tenaga kerja ketenagalistrikan. Kami membantu profesional di bidang kelistrikan mendapatkan sertifikasi yang diakui secara nasional.",
      tags: ["Sertifikasi individu • Pelatihan & uji kompetensi • Pendaftaran via DJK ESDM"],
      icon: Zap,
      category: "Kelistrikan"
    },
    {
      title: "Sertifikasi SBU JPTL",
      description: "Sertifikat untuk perusahaan jasa penunjang tenaga listrik. Memastikan perusahaan Anda memiliki legalitas yang sah untuk menjalankan bisnis di sektor ketenagalistrikan.",
      tags: ["Legalitas PJT, PJL, PJK, dll • Konsultasi klasifikasi usaha • Pendampingan sertifikasi"],
      icon: Shield,
      category: "Kelistrikan"
    },
    {
      title: "Sertifikasi ISO",
      description: "Sertifikasi sistem manajemen internasional ISO. Kami membantu perusahaan Anda mendapatkan sertifikasi ISO yang meningkatkan kredibilitas dan standar operasional.",
      tags: ["ISO 9001, 14001, 45001 • Audit internal & eksternal • Sertifikasi lembaga resmi"],
      icon: CheckCircle,
      category: "Standar"
    },
    {
      title: "Audit & Laporan Keuangan",
      description: "Layanan audit dan penyusunan laporan keuangan. Kami menyediakan jasa audit profesional yang memenuhi standar akuntansi dan regulasi yang berlaku.",
      tags: ["Audit tahunan PSAK • Laporan tender / izin • Dikerjakan KAP resmi"],
      icon: Calculator,
      category: "Keuangan"
    },
    {
      title: "Pengurusan NPWP, OSS & NIB",
      description: "Pengurusan dokumen perpajakan dan izin usaha. Kami membantu mengurus semua dokumen legalitas yang diperlukan untuk menjalankan bisnis Anda secara legal.",
      tags: ["NPWP Badan / Perorangan • NIB & Izin Usaha OSS-RBA • Sertifikat Standar & Update Data"],
      icon: FileText,
      category: "Legal"
    },
    {
      title: "Konsultasi & Pajak UMKM",
      description: "Layanan konsultasi perpajakan khusus UMKM. Kami membantu usaha mikro, kecil, dan menengah memahami kewajiban perpajakan dan mengoptimalkan pengelolaan keuangan.",
      tags: ["Registrasi NPWP & EFIN • Pelaporan SPT PPh 21/23/PPN • Pemutihan & e-Bupot"],
      icon: Calculator,
      category: "Keuangan"
    }
  ];

  return (
    <section id="layanan" className="relative py-24 bg-[#0e0637] overflow-hidden">
      {/* Enhanced background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft radial glow accents */}
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
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
            <span className="h-0.5 w-16 bg-gradient-to-r from-[#5792ff] to-transparent" />
            <span className="text-sm font-semibold tracking-wider text-[#5792ff] uppercase">Layanan Kami</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
            Layanan<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5792ff] to-[#4a7cd6]">
              Legalitas
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Kami menyediakan layanan legalitas dan perizinan usaha yang komprehensif untuk membantu bisnis Anda berkembang dengan fondasi hukum yang kuat.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <div key={index} className="relative">
                  {/* Separator line */}
                  {index > 0 && (
                    <div className="h-px bg-white/10"></div>
                  )}
                  
                    <div
                      className={`transition-all duration-300 ease-out cursor-pointer ${
                        isHovered 
                          ? 'bg-white/10 py-8 px-8 -translate-y-2' 
                          : 'bg-white/5 py-6 px-8'
                      }`}
                      onClick={() => setHoveredIndex(isHovered ? null : index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setHoveredIndex(isHovered ? null : index);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isHovered}
                      aria-label={`${isHovered ? 'Tutup' : 'Buka'} detail untuk ${service.title}`}
                    >
                    <div className="flex items-start gap-6">
                      {/* Number */}
                      <div className="flex-shrink-0">
                        <span className="text-2xl font-light text-gray-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <IconComponent className="w-6 h-6 text-[#5792ff]" />
                          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                          <span className="text-xs bg-[#5792ff]/20 text-[#5792ff] px-2 py-1 rounded-full">
                            {service.category}
                          </span>
                          <div className="ml-auto">
                            {isHovered ? (
                              <ChevronUp className="w-5 h-5 text-[#5792ff]" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-3">{service.tags}</p>
                        
                        {/* Expanded content */}
                        <div 
                          className={`overflow-hidden transition-all duration-300 ease-out ${
                            isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                          role="region"
                          aria-label={`Detail layanan ${service.title}`}
                        >
                          <p className="text-gray-200 leading-relaxed mb-6">
                            {service.description}
                          </p>
                          
                          <Link 
                            to={`/layanan/${createSlug(service.title)}`}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#5792ff] transition-colors duration-150"
                            aria-label={`Lihat detail lengkap untuk ${service.title}`}
                          >
                            Lihat Detail
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
