import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Users, Shield, Award, Building2, FileText, Zap, Calculator } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

const ServiceDetail = () => {
  const { serviceName } = useParams();
  
  // Service data mapping
  const servicesData = {
    'pendirian-badan-usaha': {
      title: "Pendirian Badan Usaha",
      description: "Layanan lengkap pendirian perusahaan mulai dari akta hingga izin operasional. Kami memastikan semua dokumen legalitas perusahaan Anda terpenuhi dengan standar hukum yang berlaku.",
      icon: Building2,
      category: "Legal",
      features: [
        "Akta Notaris",
        "SK Kemenkumham", 
        "NPWP Badan",
        "NIB & Sertifikat OSS",
        "Konsultasi Nama & Struktur Kepemilikan"
      ],
      process: [
        { title: "Konsultasi Awal", description: "Diskusi kebutuhan dan requirement" },
        { title: "Persiapan Dokumen", description: "Penyiapan semua dokumen yang diperlukan" },
        { title: "Pengajuan", description: "Submit aplikasi ke instansi terkait" },
        { title: "Monitoring", description: "Pantau progress dan follow up" },
        { title: "Selesai", description: "Dokumen siap dan diserahkan" }
      ],
      benefits: [
        "Legalitas perusahaan yang sah dan diakui",
        "Kemudahan dalam mengakses perbankan",
        "Kredibilitas yang meningkat di mata investor",
        "Kepatuhan terhadap regulasi pemerintah",
        "Dukungan konsultasi berkelanjutan"
      ],
      duration: "7-14 hari kerja",
      requirements: [
        "Fotokopi KTP direktur dan komisaris",
        "Surat keterangan domisili",
        "Bukti pembayaran modal",
        "Dokumen pendukung lainnya"
      ]
    },
    'sertifikasi-skk-konstruksi': {
      title: "Sertifikasi SKK Konstruksi",
      description: "Sertifikat Keahlian Kerja untuk tenaga ahli konstruksi semua jenjang. Kami membantu profesional konstruksi mendapatkan sertifikasi kompetensi yang diakui secara resmi.",
      icon: Award,
      category: "Konstruksi",
      features: [
        "Pendampingan semua jenjang",
        "Konsultasi klasifikasi & subklasifikasi",
        "Registrasi via LPJK/BNSP"
      ],
      process: [
        "Konsultasi dan penilaian kompetensi",
        "Penyiapan dokumen persyaratan",
        "Pendaftaran dan registrasi",
        "Pelatihan dan uji kompetensi",
        "Penerbitan sertifikat"
      ],
      benefits: [
        "Sertifikat kompetensi yang diakui nasional",
        "Peningkatan kredibilitas profesional",
        "Akses ke proyek konstruksi besar",
        "Peningkatan nilai jual keahlian"
      ],
      duration: "14-21 hari kerja",
      requirements: [
        "Fotokopi KTP",
        "Ijazah pendidikan terakhir",
        "Surat pengalaman kerja",
        "Pas foto terbaru"
      ]
    },
    'sertifikasi-sbu-konstruksi': {
      title: "Sertifikasi SBU Konstruksi",
      description: "Sertifikat Badan Usaha untuk perusahaan konstruksi. Memastikan perusahaan Anda memiliki legalitas yang sah untuk menjalankan proyek konstruksi sesuai dengan regulasi yang berlaku.",
      icon: FileText,
      category: "Konstruksi",
      features: [
        "Pengajuan via LPJK / OSS",
        "Konsultasi bidang dan kualifikasi",
        "Validasi hingga sertifikat terbit"
      ],
      process: [
        "Analisis klasifikasi dan kualifikasi",
        "Penyiapan dokumen perusahaan",
        "Pendaftaran dan registrasi",
        "Verifikasi dan validasi",
        "Penerbitan sertifikat SBU"
      ],
      benefits: [
        "Legalitas untuk mengikuti tender",
        "Kredibilitas perusahaan meningkat",
        "Akses ke proyek pemerintah",
        "Kepatuhan terhadap regulasi"
      ],
      duration: "21-30 hari kerja",
      requirements: [
        "Akta pendirian perusahaan",
        "NPWP Badan",
        "SIUP/TDP",
        "Dokumen tenaga ahli"
      ]
    },
    'sertifikasi-serkom-skktk': {
      title: "Sertifikasi Serkom / SKKTK",
      description: "Sertifikasi kompetensi untuk tenaga kerja ketenagalistrikan. Kami membantu profesional di bidang kelistrikan mendapatkan sertifikasi yang diakui secara nasional.",
      icon: Zap,
      category: "Kelistrikan",
      features: [
        "Sertifikasi individu",
        "Pelatihan & uji kompetensi",
        "Pendaftaran via DJK ESDM"
      ],
      process: [
        "Konsultasi dan penilaian awal",
        "Penyiapan dokumen persyaratan",
        "Pelatihan teknis",
        "Uji kompetensi",
        "Penerbitan sertifikat"
      ],
      benefits: [
        "Sertifikat kompetensi kelistrikan",
        "Peningkatan kredibilitas profesional",
        "Akses ke proyek kelistrikan",
        "Kepatuhan terhadap standar keselamatan"
      ],
      duration: "14-21 hari kerja",
      requirements: [
        "Fotokopi KTP",
        "Ijazah pendidikan teknik",
        "Surat pengalaman kerja",
        "Sertifikat pelatihan sebelumnya"
      ]
    },
    'sertifikasi-sbu-jptl': {
      title: "Sertifikasi SBU JPTL",
      description: "Sertifikat untuk perusahaan jasa penunjang tenaga listrik. Memastikan perusahaan Anda memiliki legalitas yang sah untuk menjalankan bisnis di sektor ketenagalistrikan.",
      icon: Shield,
      category: "Kelistrikan",
      features: [
        "Legalitas PJT, PJL, PJK, dll",
        "Konsultasi klasifikasi usaha",
        "Pendampingan sertifikasi"
      ],
      process: [
        "Analisis klasifikasi usaha",
        "Penyiapan dokumen perusahaan",
        "Pendaftaran dan registrasi",
        "Verifikasi teknis",
        "Penerbitan sertifikat"
      ],
      benefits: [
        "Legalitas untuk bisnis kelistrikan",
        "Kredibilitas perusahaan meningkat",
        "Akses ke proyek kelistrikan",
        "Kepatuhan terhadap regulasi"
      ],
      duration: "21-30 hari kerja",
      requirements: [
        "Akta pendirian perusahaan",
        "NPWP Badan",
        "Dokumen tenaga ahli",
        "Sertifikat kompetensi"
      ]
    },
    'sertifikasi-iso': {
      title: "Sertifikasi ISO",
      description: "Sertifikasi sistem manajemen internasional ISO. Kami membantu perusahaan Anda mendapatkan sertifikasi ISO yang meningkatkan kredibilitas dan standar operasional.",
      icon: CheckCircle,
      category: "Standar",
      features: [
        "ISO 9001, 14001, 45001",
        "Audit internal & eksternal",
        "Sertifikasi lembaga resmi"
      ],
      process: [
        "Konsultasi dan gap analysis",
        "Penyusunan sistem manajemen",
        "Implementasi sistem",
        "Audit internal",
        "Audit eksternal dan sertifikasi"
      ],
      benefits: [
        "Peningkatan kredibilitas internasional",
        "Efisiensi operasional",
        "Akses ke pasar global",
        "Kepatuhan terhadap standar internasional"
      ],
      duration: "3-6 bulan",
      requirements: [
        "Dokumen perusahaan lengkap",
        "Struktur organisasi",
        "Prosedur operasional",
        "Dokumen pendukung lainnya"
      ]
    },
    'audit-laporan-keuangan': {
      title: "Audit & Laporan Keuangan",
      description: "Layanan audit dan penyusunan laporan keuangan. Kami menyediakan jasa audit profesional yang memenuhi standar akuntansi dan regulasi yang berlaku.",
      icon: Calculator,
      category: "Keuangan",
      features: [
        "Audit tahunan PSAK",
        "Laporan tender / izin",
        "Dikerjakan KAP resmi"
      ],
      process: [
        "Konsultasi dan perencanaan audit",
        "Pengumpulan dokumen keuangan",
        "Pelaksanaan audit",
        "Penyusunan laporan audit",
        "Review dan finalisasi"
      ],
      benefits: [
        "Laporan keuangan yang akurat",
        "Kepatuhan terhadap standar akuntansi",
        "Kredibilitas keuangan meningkat",
        "Dukungan untuk tender dan izin"
      ],
      duration: "14-21 hari kerja",
      requirements: [
        "Laporan keuangan tahunan",
        "Dokumen transaksi",
        "Bukti pendukung",
        "Dokumen perusahaan"
      ]
    },
    'pengurusan-npwp-oss-nib': {
      title: "Pengurusan NPWP, OSS & NIB",
      description: "Pengurusan dokumen perpajakan dan izin usaha. Kami membantu mengurus semua dokumen legalitas yang diperlukan untuk menjalankan bisnis Anda secara legal.",
      icon: FileText,
      category: "Legal",
      features: [
        "NPWP Badan / Perorangan",
        "NIB & Izin Usaha OSS-RBA",
        "Sertifikat Standar & Update Data"
      ],
      process: [
        "Konsultasi dan penilaian kebutuhan",
        "Penyiapan dokumen persyaratan",
        "Pendaftaran online",
        "Verifikasi dan validasi",
        "Penerbitan dokumen"
      ],
      benefits: [
        "Kepatuhan terhadap kewajiban pajak",
        "Legalitas usaha yang sah",
        "Kemudahan akses perbankan",
        "Dukungan untuk pengembangan usaha"
      ],
      duration: "7-14 hari kerja",
      requirements: [
        "Fotokopi KTP",
        "Akta pendirian perusahaan",
        "Surat keterangan domisili",
        "Dokumen pendukung lainnya"
      ]
    },
    'konsultasi-pajak-umkm': {
      title: "Konsultasi & Pajak UMKM",
      description: "Layanan konsultasi perpajakan khusus UMKM. Kami membantu usaha mikro, kecil, dan menengah memahami kewajiban perpajakan dan mengoptimalkan pengelolaan keuangan.",
      icon: Calculator,
      category: "Keuangan",
      features: [
        "Registrasi NPWP & EFIN",
        "Pelaporan SPT PPh 21/23/PPN",
        "Pemutihan & e-Bupot"
      ],
      process: [
        "Konsultasi dan analisis kebutuhan",
        "Pendaftaran NPWP dan EFIN",
        "Pembuatan sistem pelaporan",
        "Pelatihan dan pendampingan",
        "Follow-up dan konsultasi berkelanjutan"
      ],
      benefits: [
        "Kepatuhan terhadap kewajiban pajak",
        "Optimasi beban pajak",
        "Kemudahan dalam pelaporan",
        "Konsultasi berkelanjutan"
      ],
      duration: "7-14 hari kerja",
      requirements: [
        "Fotokopi KTP",
        "Dokumen usaha",
        "Laporan keuangan sederhana",
        "Dokumen pendukung lainnya"
      ]
    }
  };

  const service = servicesData[serviceName];
  const IconComponent = service?.icon;
  const otherServices = Object.entries(servicesData)
    .filter(([key]) => key !== serviceName)
    .map(([key, val]) => ({ key, title: val.title }));

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0e0637] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Layanan Tidak Ditemukan</h1>
          <p className="text-gray-300 mb-8">Layanan yang Anda cari tidak tersedia.</p>
          <Link 
            to="/#layanan" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5792ff] text-white rounded-lg hover:bg-[#4a7cd6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Layanan
          </Link>
        </div>
      </div>
    );
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Valpro Intertech",
      "url": "https://valprointertech.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Raya Gading Tutuka No.175 B, RT.03/RW.12, Parungserab",
        "addressLocality": "Soreang",
        "addressRegion": "Jawa Barat",
        "postalCode": "40921",
        "addressCountry": "ID"
      },
      "telephone": "+62 813-9971-0085",
      "email": "mail@valprointertech.com"
    },
    "serviceType": service.category,
    // Price information intentionally omitted per requirement
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0637]">
      <SEO 
        title={service.title}
        description={service.description}
        keywords={`${service.title}, ${service.category}, legalitas usaha, perizinan, ${service.features.join(', ')}`}
        canonical={`/layanan/${serviceName}`}
        ogType="article"
        structuredData={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0e0637] via-[#1a4bb1] to-[#2c5cc5] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.04\'/></svg>')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link 
              to="/#layanan" 
              className="inline-flex items-center gap-2 text-[#5792ff] hover:text-[#4a7cd6] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Layanan
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-0.5 w-16 bg-gradient-to-r from-[#5792ff] to-transparent" />
                <span className="text-sm font-semibold tracking-wider text-[#5792ff] uppercase">{service.category}</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
                {service.title}
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5 text-[#5792ff]" />
                  <span className="text-sm">{service.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#5792ff] to-[#4a7cd6] rounded-2xl flex items-center justify-center shadow-2xl">
                {IconComponent && <IconComponent className="w-16 h-16 text-white" />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-[#0e0637]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Features */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Fitur Layanan</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#5792ff] flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Proses Layanan</h2>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-[#5792ff] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      {typeof step === 'string' ? (
                        <p className="text-white">{step}</p>
                      ) : (
                        <div>
                          <p className="text-white font-semibold">{step.title}</p>
                          <p className="text-gray-300 text-sm">{step.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Manfaat</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                      <Shield className="w-5 h-5 text-[#5792ff] flex-shrink-0 mt-0.5" />
                      <span className="text-white">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Other services navigation */}
              <div className="bg-white/5 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Layanan Lainnya</h3>
                <ul className="space-y-3">
                  {otherServices.map(({ key, title }) => (
                    <li key={key}>
                      <Link
                        to={`/layanan/${key}`}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <span className="text-sm">{title}</span>
                        <ArrowLeft className="w-4 h-4 rotate-180 opacity-70" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Requirements */}
              <div className="bg-white/5 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Persyaratan</h3>
                <ul className="space-y-3">
                  {service.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5792ff] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#5792ff] to-[#4a7cd6] p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Konsultasi Gratis</h3>
                <p className="text-white/80 text-sm mb-6">
                  Dapatkan konsultasi gratis untuk layanan ini dan temukan solusi terbaik untuk kebutuhan bisnis Anda.
                </p>
                <a 
                  href="/#kontak" 
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-[#5792ff] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Konsultasi Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
