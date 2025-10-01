import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Clock, Copy, ExternalLink } from 'lucide-react';
import whatsappIcon from '../assets/whatsapp-icon.svg';

const Contact = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '6289518530306'; // Nomor WhatsApp Valpro Intertech
    const message = 'Halo, saya tertarik dengan layanan Valpro. Bisa bantu saya? (Pesan Otomatis Dari Website valprointertech.com)';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Address helpers
  const addressText = 'Jl. Raya Gading Tutuka No.175 B, RT.03/RW.12, Parungserab, Kec. Soreang, Kabupaten Bandung, Jawa Barat 40921';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(addressText);
      alert('Alamat telah disalin ke clipboard.');
    } catch {
      // Fallback: use a temporary textarea
      const el = document.createElement('textarea');
      el.value = addressText;
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); alert('Alamat telah disalin ke clipboard.'); } catch { /* noop */ }
      document.body.removeChild(el);
    }
  };

  const openInMaps = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <>
      {/* Header Section */}
      <section className="relative py-24 bg-[#0e0637] overflow-hidden">
        {/* Enhanced background accents matching About.jsx and Services.jsx */}
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
              <span className="text-sm font-semibold tracking-wider text-[#5792ff] uppercase">Hubungi Kami</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
              Hubungi<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5792ff] to-[#4a7cd6]">
                Kami
              </span>
            </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Jika Anda memiliki pertanyaan, hubungi kami melalui telepon, WhatsApp, atau email. Kami siap membantu pada jam operasional tertera.
          </p>
          </div>

        {/* Main Content Grid (Form removed) */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16" id="kontak">
          {/* Contact Information Card */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl ring-1 ring-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">INFORMASI KONTAK</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#5792ff] mr-4 mt-1" />
                <div>
                  <p className="font-bold text-white">TELEPON</p>
                  <a href="tel:+6281399710085" className="text-white hover:text-[#5792ff] transition-colors">
                    +62 813-9971-0085
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#5792ff] mr-4 mt-1" />
                <div>
                  <p className="font-bold text-white">ALAMAT</p>
                  <p className="text-white">{addressText}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copyAddress}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-white text-xs ring-1 ring-white/15"
                    >
                      <Copy className="w-4 h-4" /> Salin Alamat
                    </button>
                    <button
                      type="button"
                      onClick={openInMaps}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-white text-xs ring-1 ring-white/15"
                    >
                      <ExternalLink className="w-4 h-4" /> Buka di Maps
                    </button>
                  </div>
                  {/* Embedded map moved here */}
                  <div className="mt-4 h-56 sm:h-64 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9550621598223!2d107.53371829999999!3d-7.014567899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa3613d29fa909357%3A0xf02c45daf0efee5f!2sValpro%20Intertech!5e0!3m2!1sid!2sid!4v1759203998221!5m2!1sid!2sid" 
                      width="100%" 
                      height="100%" 
                      style={{border:0}} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade" 
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#5792ff] mr-4 mt-1" />
                <div>
                  <p className="font-bold text-white">EMAIL</p>
                  <a href="mailto:mail@valprointertech.com" className="text-white hover:text-[#5792ff] transition-colors">
                    mail@valprointertech.com
                  </a>
                </div>
              </div>

              {/* WhatsApp Button moved to QR card */}
            </div>
          </div>

          {/* Business Hours Card - compact */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl ring-1 ring-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">JAM OPERASIONAL</h2>
            
            {/* Current Time & Progress */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Time Display */}
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10">
                <p className="text-xs text-gray-300 mb-1">WAKTU SAAT INI</p>
                <p className="text-2xl font-bold text-white">{formatTime(currentTime)}</p>
                <p className="text-xs text-gray-300">{formatDate(currentTime)}</p>
              </div>

              {/* Progress */}
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10">
                <p className="text-xs text-gray-300 mb-2">PROGRESS HARI INI</p>
                {(() => {
                  const now = new Date(currentTime);
                  const day = now.getDay();
                  const hour = now.getHours();
                  const minute = now.getMinutes();
                  const minutesNow = hour * 60 + minute;
                  let start = null, end = null;
                  if (day >= 1 && day <= 5) { start = 8 * 60; end = 16 * 60; }
                  else if (day === 6) { start = 8 * 60; end = 13 * 60; }
                  if (start !== null && end !== null) {
                    const total = end - start;
                    const progressed = Math.max(0, Math.min(total, minutesNow - start));
                    const pct = Math.round((progressed / Math.max(1, total)) * 100);
                    return (
                      <>
                        <div className="text-lg font-bold text-white">{pct}%</div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden ring-1 ring-white/10 mt-2">
                          <div className="h-full bg-gradient-to-r from-[#5792ff] to-[#4a7cd6] transition-all duration-1000" style={{ width: `${pct}%` }}></div>
                        </div>
                        <p className="text-xs text-white/70 mt-1">
                          {String(Math.floor(start/60)).padStart(2,'0')}:{String(start%60).padStart(2,'0')} - {String(Math.floor(end/60)).padStart(2,'0')}:{String(end%60).padStart(2,'0')}
                        </p>
                      </>
                    );
                  }
                  return <div className="text-sm text-white/60">Tidak ada jadwal</div>;
                })()}
              </div>
            </div>

            {/* Weekly Schedule - Enhanced with Status */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {(() => {
                const days = [
                  { key: 0, label: 'Minggu', short: 'Min', range: null },
                  { key: 1, label: 'Senin', short: 'Sen', range: '08-16' },
                  { key: 2, label: 'Selasa', short: 'Sel', range: '08-16' },
                  { key: 3, label: 'Rabu', short: 'Rab', range: '08-16' },
                  { key: 4, label: 'Kamis', short: 'Kam', range: '08-16' },
                  { key: 5, label: 'Jumat', short: 'Jum', range: '08-16' },
                  { key: 6, label: 'Sabtu', short: 'Sab', range: '08-13' },
                ];
                const now = new Date(currentTime);
                const today = now.getDay();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const currentTimeInMinutes = currentHour * 60 + currentMinute;
                
                return days.map((d) => {
                  const isToday = d.key === today;
                  const open = Boolean(d.range);
                  
                  // Determine current status for today
                  let currentStatus = null;
                  if (isToday && open) {
                    const day = d.key;
                    let start = null, end = null;
                    if (day >= 1 && day <= 5) { start = 8 * 60; end = 16 * 60; }
                    else if (day === 6) { start = 8 * 60; end = 13 * 60; }
                    
                    if (start !== null && end !== null) {
                      if (currentTimeInMinutes >= start && currentTimeInMinutes <= end) {
                        currentStatus = 'BUKA';
                      } else {
                        currentStatus = 'TUTUP';
                      }
                    }
                  } else if (isToday && !open) {
                    currentStatus = 'TUTUP';
                  }
                  
                  return (
                    <div key={d.key} className={`text-center p-3 rounded-lg ring-1 transition-all ${isToday ? 'bg-[#5792ff]/15 ring-[#5792ff]/50' : 'bg-white/5 ring-white/10'}`}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className={`h-3 w-3 ${isToday ? 'text-[#79a6ff]' : 'text-[#5792ff]'}`} />
                        <span className={`text-xs font-medium ${isToday ? 'text-white' : 'text-white/90'}`}>{d.short}</span>
                      </div>
                      <div className={`text-xs ${open ? 'text-white' : 'text-white/50'}`}>
                        {open ? d.range : 'Libur'}
                      </div>
                      {currentStatus && (
                        <div className={`text-[10px] px-1 py-0.5 rounded-full font-medium mt-1 ${
                          currentStatus === 'BUKA' 
                            ? 'bg-green-500/20 text-green-300 ring-1 ring-green-400/30' 
                            : 'bg-red-500/20 text-red-300 ring-1 ring-red-400/30'
                        }`}>
                          {currentStatus}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            {/* Additional Info & Features */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {/* Time Zone Info */}
              <div className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-[#5792ff]" />
                  <p className="text-sm font-semibold text-white">Zona Waktu</p>
                </div>
                <p className="text-xs text-white/70 mb-1">Waktu Indonesia Barat (WIB)</p>
                <p className="text-xs text-white/60">UTC+7 • GMT+7</p>
              </div>

              {/* Next Business Day */}
              <div className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#5792ff]"></div>
                  <p className="text-sm font-semibold text-white">Hari Kerja Berikutnya</p>
                </div>
                {(() => {
                  const now = new Date(currentTime);
                  const day = now.getDay();
                  let nextWorkDay = '';
                  let nextWorkTime = '';
                  
                  if (day === 0) { // Sunday
                    nextWorkDay = 'Senin';
                    nextWorkTime = '08.00';
                  } else if (day === 6) { // Saturday
                    if (now.getHours() >= 13) {
                      nextWorkDay = 'Senin';
                      nextWorkTime = '08.00';
                    } else {
                      nextWorkDay = 'Hari ini';
                      nextWorkTime = '08.00';
                    }
                  } else if (day >= 1 && day <= 5) { // Monday-Friday
                    if (now.getHours() >= 16) {
                      if (day === 5) { // Friday
                        nextWorkDay = 'Senin';
                        nextWorkTime = '08.00';
                      } else {
                        nextWorkDay = 'Besok';
                        nextWorkTime = '08.00';
                      }
                    } else {
                      nextWorkDay = 'Hari ini';
                      nextWorkTime = '08.00';
                    }
                  }
                  
                  return (
                    <>
                      <p className="text-xs text-white/70">{nextWorkDay}</p>
                      <p className="text-xs text-white/60">Buka pukul {nextWorkTime}</p>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Business Hours Summary */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/10 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Ringkasan Jam Operasional</p>
                  <p className="text-xs text-white/70">Senin-Jumat: 08.00-16.00 • Sabtu: 08.00-13.00 • Minggu: Libur</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">Total jam kerja</p>
                  <p className="text-sm font-semibold text-white">44 jam/minggu</p>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="mt-4 text-xs text-white/60 text-center">
              Jam operasional dapat menyesuaikan hari libur nasional. WhatsApp tetap aktif 24/7.
            </p>
          </div>
        </div>
        
        {/* WhatsApp QR for desktop scan with CTA button */}
        <div className="max-w-7xl mx-auto mt-2">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl ring-1 ring-white/10 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <img
                alt="QR WhatsApp Valpro"
                className="w-36 h-36 rounded-lg ring-1 ring-white/10 bg-white"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent('https://wa.me/6289518530306?text=' + encodeURIComponent('Halo, saya tertarik dengan layanan Valpro. Bisa bantu saya? (Pesan Otomatis Dari Website valprointertech.com)'))}`}
              />
              <div className="text-white">
                <p className="font-semibold">Scan QR untuk chat WhatsApp dari Android/iOS</p>
                <p className="text-sm text-gray-300">Atau tekan tombol di samping untuk membuka WhatsApp.</p>
              </div>
            </div>
            <button
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="h-5 w-5" />
              Chat WhatsApp
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* Map section removed (now inside contact card) */}

      {/* SEO: LocalBusiness Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Valpro Intertech',
        image: 'https://valprointertech.com/logo.png',
        url: 'https://valprointertech.com',
        telephone: '+62 813-9971-0085',
        email: 'mail@valprointertech.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. Raya Gading Tutuka No.175 B, RT.03/RW.12, Parungserab',
          addressLocality: 'Soreang',
          addressRegion: 'Jawa Barat',
          postalCode: '40921',
          addressCountry: 'ID'
        },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '16:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '13:00' }
        ],
        sameAs: [
          'https://wa.me/6289518530306'
        ]
      }) }} />
    </>
  );
};

export default Contact;