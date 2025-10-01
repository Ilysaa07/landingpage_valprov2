import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mic, Square, MessageCircle } from 'lucide-react';

// Expanded knowledge base: intents grouped with keywords and concise answers
const KNOWLEDGE_BASE = [
  // Greetings & basic navigation
  { keywords: ['halo', 'hai', 'hi', 'assalamualaikum', 'selamat'], answer: 'Halo! Saya Valpro Asisten. Tanyakan apa pun tentang layanan kami atau minta diarahkan ke bagian Beranda, Profil, Layanan, atau Kontak.' },
  { keywords: ['beranda', 'home', '#beranda'], answer: 'Untuk kembali ke Beranda, klik menu Beranda di atas atau gulir ke bagian paling atas halaman.' },
  { keywords: ['profil', 'tentang', 'perusahaan', '#profil'], answer: 'Tentang Perusahaan: Valpro Intertech adalah mitra legalitas usaha. Kami membantu pendirian badan usaha, sertifikasi, ISO, audit, dan perizinan dengan pendekatan profesional.' },

  // Contact & operational info
  { keywords: ['kontak', 'hubungi', 'whatsapp', 'telepon', 'email', '#kontak'], answer: 'Kontak kami: WhatsApp +62 813-9971-0085, Email mail@valprointertech.com. Anda juga bisa isi formulir di bagian Kontak halaman ini.' },
  { keywords: ['alamat', 'lokasi', 'maps', 'peta'], answer: 'Alamat: Jl. Raya Gading Tutuka No.175 B, Soreang, Bandung. Lihat peta pada bagian bawah halaman Kontak.' },
  { keywords: ['jam', 'operasional', 'buka', 'tutup', 'hari'], answer: 'Jam operasional: Senin–Jumat 08.00–16.00, Sabtu 08.00–13.00, Minggu libur.' },

  // General services summary
  { keywords: ['layanan', 'service', 'apa saja', 'list layanan', '#layanan'], answer: 'Layanan utama: 1) Pendirian Badan Usaha, 2) Sertifikasi SKK Konstruksi, 3) Sertifikasi SBU Konstruksi, 4) Sertifikasi SBU JPTL, 5) Sertifikasi Serkom/SKKTK, 6) Sertifikasi ISO, 7) Audit & Laporan Keuangan, 8) Pengurusan NPWP/OSS/NIB, 9) Konsultasi & Pajak UMKM.' },

  // Pendirian Badan Usaha
  { keywords: ['pendirian', 'badan', 'usaha', 'pt', 'cv', 'firma', 'perseroan'], answer: 'Pendirian Badan Usaha: kami bantu dari akta sampai izin operasional. Proses ringkas: Konsultasi awal → Persiapan dokumen → Pengajuan → Monitoring → Selesai (dokumen diserahkan). Estimasi 7–14 hari kerja.' },
  { keywords: ['dokumen', 'syarat', 'persyaratan', 'pendirian'], answer: 'Syarat umum pendirian: KTP pengurus, domisili, data modal/struktur, dan dokumen pendukung lain. Detail akan disesuaikan saat konsultasi.' },

  // Konstruksi: SKK & SBU
  { keywords: ['skk', 'sertifikasi skk', 'keahlian konstruksi'], answer: 'Sertifikasi SKK Konstruksi: pendampingan semua jenjang, registrasi via LPJK/BNSP, estimasi 14–21 hari kerja.' },
  { keywords: ['sbu', 'konstruksi', 'sertifikasi sbu', 'badan usaha konstruksi'], answer: 'Sertifikasi SBU Konstruksi: pengajuan via LPJK/OSS, konsultasi bidang & kualifikasi, hingga sertifikat terbit. Estimasi 21–30 hari kerja.' },

  // Kelistrikan: Serkom/SKKTK & SBU JPTL
  { keywords: ['serkom', 'skktk', 'ketenagalistrikan'], answer: 'Sertifikasi Serkom/SKKTK: konsultasi, penyiapan dokumen, pelatihan, uji kompetensi, penerbitan sertifikat. Estimasi 14–21 hari kerja.' },
  { keywords: ['jptl', 'sbu jptl', 'penunjang tenaga listrik'], answer: 'Sertifikasi SBU JPTL: analisis klasifikasi, penyiapan dokumen, registrasi, verifikasi teknis, hingga sertifikat. Estimasi 21–30 hari kerja.' },

  // ISO
  { keywords: ['iso', '9001', '14001', '45001', 'sertifikasi iso'], answer: 'Sertifikasi ISO (9001/14001/45001): gap analysis → penyusunan & implementasi sistem → audit internal → audit eksternal & sertifikasi.' },

  // Keuangan & Perizinan
  { keywords: ['audit', 'laporan keuangan', 'kap'], answer: 'Audit & Laporan Keuangan: audit tahunan PSAK, laporan tender/izin, dikerjakan KAP resmi.' },
  { keywords: ['npwp', 'oss', 'nib', 'perizinan', 'izin usaha'], answer: 'Pengurusan NPWP, OSS & NIB: registrasi pajak dan perizinan usaha (OSS-RBA), sertifikat standar, dan update data.' },
  { keywords: ['pajak', 'umkm', 'konsultasi pajak'], answer: 'Konsultasi & Pajak UMKM: registrasi NPWP & EFIN, pelaporan SPT, e-Bupot, dan pendampingan berkelanjutan.' },

  // Help / commands
  { keywords: ['bantuan', 'help', 'daftar perintah', 'perintah'], answer: 'Perintah suara: "buka beranda", "buka profil", "buka layanan", "buka kontak", atau sebut layanan: pendirian badan usaha; sertifikasi SKK; sertifikasi SBU konstruksi; sertifikasi Serkom/SKKTK; sertifikasi SBU JPTL; sertifikasi ISO; audit & laporan keuangan; pengurusan NPWP/OSS/NIB; konsultasi & pajak UMKM.' },

  // Harga, estimasi, SLA
  { keywords: ['harga', 'biaya', 'fee', 'tarif', 'estimasi biaya'], answer: 'Biaya disesuaikan skala & kompleksitas. Sampaikan jenis layanan dan profil usaha Anda, kami berikan estimasi transparan sebelum mulai.' },
  { keywords: ['lama', 'durasi', 'timeline', 'berapa lama', 'hari kerja'], answer: 'Estimasi durasi: Pendirian 7–14 hari, SKK/SKKTK 14–21 hari, SBU/SBU JPTL 21–30 hari, ISO 3–6 bulan, Audit 14–21 hari. Dapat berbeda tergantung validasi instansi.' },

  // CTA
  { keywords: ['mulai', 'konsultasi', 'bagaimana mulai', 'caranya'], answer: 'Klik Kontak untuk konsultasi gratis, atau kirim WhatsApp ke +62 813-9971-0085. Kami akan memandu langkah awal sesuai kebutuhan Anda.' },
];

function matchAnswer(message) {
  const text = message.toLowerCase();
  let best = { score: 0, answer: null };

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const k of item.keywords) {
      if (!k) continue;
      const key = String(k).toLowerCase();
      // phrase match weight > token match
      if (text.includes(key)) score += Math.min(4, Math.max(1, key.split(' ').length));
      // token overlap heuristic
      key.split(/[^a-z0-9]+/).forEach(t => {
        if (t && text.includes(t)) score += 1;
      });
    }
    if (score > best.score) best = { score, answer: item.answer };
  }

  if (best.answer) return best.answer;
  return 'Terima kasih atas pertanyaannya. Bisa jelaskan kebutuhan Anda lebih spesifik? Sebutkan layanan atau kendala yang dihadapi, saya bantu arahkan.';
}

const ValproAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => [
    { role: 'assistant', text: 'Halo! Saya Valpro Asisten. Ada yang bisa saya bantu hari ini?' }
  ]);

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const recognizerRef = useRef(null);
  const recognizerActiveRef = useRef(false);
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Keyboard accessibility: toggle with Alt+K, close with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Salam suara dihilangkan sesuai permintaan (tidak ada TTS)

  // Navigation helper consistent with header/footer
  const scrollOrNavigate = (hash) => {
    const isServicePage = location.pathname.startsWith('/layanan/');
    if (isServicePage) {
      navigate(`/${hash}`);
      return;
    }
    const element = document.querySelector(hash);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    } else {
      navigate(`/${hash}`);
    }
  };

  // Service name to slug mapping for voice navigation
  const serviceKeywords = [
    { names: ['pendirian badan usaha', 'pendirian perusahaan', 'buat pt', 'buat cv'], slug: 'pendirian-badan-usaha' },
    { names: ['sertifikasi skk konstruksi', 'skk konstruksi', 'skk'], slug: 'sertifikasi-skk-konstruksi' },
    { names: ['sertifikasi sbu konstruksi', 'sbu konstruksi', 'sbu'], slug: 'sertifikasi-sbu-konstruksi' },
    { names: ['sertifikasi serkom', 'serkom', 'skktk'], slug: 'sertifikasi-serkom-skktk' },
    { names: ['sertifikasi sbu jptl', 'sbu jptl', 'jptl'], slug: 'sertifikasi-sbu-jptl' },
    { names: ['sertifikasi iso', 'iso', 'iso 9001', 'iso 14001', 'iso 45001'], slug: 'sertifikasi-iso' },
    { names: ['audit dan laporan keuangan', 'audit laporan keuangan', 'audit keuangan'], slug: 'audit-laporan-keuangan' },
    { names: ['pengurusan npwp', 'oss', 'nib', 'npwp oss nib'], slug: 'pengurusan-npwp-oss-nib' },
    { names: ['konsultasi pajak umkm', 'pajak umkm', 'konsultasi pajak'], slug: 'konsultasi-pajak-umkm' },
  ];

  const navigateToServiceByVoice = (cmd) => {
    const text = cmd.toLowerCase();
    for (const svc of serviceKeywords) {
      for (const key of svc.names) {
        if (text.includes(key)) {
          navigate(`/layanan/${svc.slug}`);
          return svc.slug;
        }
      }
    }
    return null;
  };

  const processTextCommand = (cmd) => {
    const text = cmd.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!text) return false;

    if (/beranda|home/.test(text) || /buka beranda/.test(text)) {
      scrollOrNavigate('#beranda');
      setMessages(prev => [...prev, { role: 'assistant', text: 'Membuka Beranda.' }]);
      return true;
    }
    if (/profil|tentang/.test(text) || /buka profil|buka tentang/.test(text)) {
      scrollOrNavigate('#profil');
      setMessages(prev => [...prev, { role: 'assistant', text: 'Menuju bagian Profil.' }]);
      return true;
    }
    if (/layanan/.test(text) || /buka layanan/.test(text)) {
      scrollOrNavigate('#layanan');
      setMessages(prev => [...prev, { role: 'assistant', text: 'Membuka bagian Layanan.' }]);
      return true;
    }
    if (/kontak|hubungi/.test(text) || /buka kontak/.test(text)) {
      scrollOrNavigate('#kontak');
      setMessages(prev => [...prev, { role: 'assistant', text: 'Membuka bagian Kontak.' }]);
      return true;
    }
    if (/bantuan|help|daftar perintah|perintah apa/.test(text)) {
      const helpMsg = 'Perintah suara/ketik: "buka beranda", "buka profil", "buka layanan", "buka kontak", atau sebut layanan: pendirian badan usaha; sertifikasi SKK; sertifikasi SBU konstruksi; sertifikasi Serkom/SKKTK; sertifikasi SBU JPTL; sertifikasi ISO; audit & laporan keuangan; pengurusan NPWP/OSS/NIB; konsultasi & pajak UMKM.';
      setMessages(prev => [...prev, { role: 'assistant', text: helpMsg }]);
      return true;
    }
    const matchedSlug = navigateToServiceByVoice(text);
    if (matchedSlug) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Membuka detail layanan.' }]);
      return true;
    }
    return false;
  };

  // Quick actions and FAQs for initial view
  const QUICK_COMMANDS = [
    'buka beranda',
    'buka profil',
    'buka layanan',
    'buka kontak',
    'bantuan',
  ];
  const POPULAR_QUESTIONS = [
    'Layanan apa saja? ',
    'Berapa lama prosesnya?',
    'Berapa kisaran biaya?',
    'Alamat kantor di mana?',
    'Bagaimana cara mulai konsultasi?',
  ];

  const handleQuickCommandClick = (cmd) => {
    const userMsg = { role: 'user', text: cmd };
    setMessages(prev => [...prev, userMsg]);
    const acted = processTextCommand(cmd);
    if (!acted) {
      const answer = matchAnswer(cmd);
      setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    }
    requestAnimationFrame(() => {
      panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  const handlePopularQuestionClick = (q) => {
    const userMsg = { role: 'user', text: q };
    const answer = matchAnswer(q);
    setMessages(prev => [...prev, userMsg, { role: 'assistant', text: answer }]);
    requestAnimationFrame(() => {
      panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  // Voice command recognition (buka beranda/profil/layanan/kontak)
  const ensureRecognizer = () => {
    if (recognizerRef.current) return recognizerRef.current;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return null;
    const rec = new Recognition();
    rec.lang = 'id-ID';
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.continuous = true;

    rec.onstart = () => { recognizerActiveRef.current = true; setIsListening(true); setLiveTranscript(''); };
    rec.onend = () => { recognizerActiveRef.current = false; setIsListening(false); };
    rec.onerror = (ev) => {
      recognizerActiveRef.current = false;
      setIsListening(false);
      const code = ev?.error;
      let msg = 'Kendala pada layanan suara. Coba lagi nanti.';
      if (code === 'not-allowed' || code === 'service-not-allowed') {
        msg = 'Akses mikrofon ditolak. Izinkan mikrofon di browser (ikon kunci/izin situs).';
      } else if (code === 'no-speech') {
        msg = 'Tidak ada suara terdeteksi. Ucapkan perintah lebih jelas atau lebih dekat mikrofon.';
      } else if (code === 'audio-capture') {
        msg = 'Mikrofon tidak terdeteksi. Pastikan perangkat input audio tersedia dan tidak dipakai aplikasi lain.';
      } else if (code === 'aborted') {
        msg = 'Pengenalan suara dihentikan. Coba mulai lagi.';
      } else if (code === 'network') {
        msg = 'Jaringan layanan suara bermasalah. Periksa koneksi internet dan coba lagi.';
      } else if (code === 'bad-grammar' || code === 'language-not-supported') {
        msg = 'Bahasa/gramatika tidak didukung. Pastikan bahasa diatur ke Bahasa Indonesia (id-ID).';
      }
      setMessages(prev => [...prev, { role: 'assistant', text: msg }]);
    };

    rec.onresult = (e) => {
      // Build combined transcript (final + interim)
      let interim = '';
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i += 1) {
        const res = e.results[i];
        const t = res[0]?.transcript || '';
        if (res.isFinal) final += t;
        else interim += t;
      }
      const combined = `${final} ${interim}`.trim();
      setLiveTranscript(combined);
      const cmd = combined.toLowerCase().replace(/\s+/g, ' ').trim();
      if (!cmd) return;
      setMessages(prev => [...prev, { role: 'user', text: cmd }]);

      if (/beranda|home/.test(cmd) || /buka beranda/.test(cmd)) {
        scrollOrNavigate('#beranda');
        setMessages(prev => [...prev, { role: 'assistant', text: 'Membuka Beranda.' }]);
        rec.stop();
        return;
      }
      if (/profil|tentang/.test(cmd) || /buka profil|buka tentang/.test(cmd)) {
        scrollOrNavigate('#profil');
        setMessages(prev => [...prev, { role: 'assistant', text: 'Menuju bagian Profil.' }]);
        rec.stop();
        return;
      }
      if (/layanan/.test(cmd) || /buka layanan/.test(cmd)) {
        scrollOrNavigate('#layanan');
        setMessages(prev => [...prev, { role: 'assistant', text: 'Membuka bagian Layanan.' }]);
        rec.stop();
        return;
      }
      if (/kontak|hubungi/.test(cmd) || /buka kontak/.test(cmd)) {
        scrollOrNavigate('#kontak');
        setMessages(prev => [...prev, { role: 'assistant', text: 'Membuka bagian Kontak.' }]);
        rec.stop();
        return;
      }

      // Help/commands list
      if (/bantuan|help|daftar perintah|perintah apa/.test(cmd)) {
        const helpMsg = 'Perintah suara: "buka beranda", "buka profil", "buka layanan", "buka kontak", atau sebut layanan: pendirian badan usaha; sertifikasi SKK; sertifikasi SBU konstruksi; sertifikasi Serkom/SKKTK; sertifikasi SBU JPTL; sertifikasi ISO; audit & laporan keuangan; pengurusan NPWP/OSS/NIB; konsultasi & pajak UMKM.';
        setMessages(prev => [...prev, { role: 'assistant', text: helpMsg }]);
        rec.stop();
        return;
      }

      // Open service detail when user mentions a service name
      const matchedSlug = navigateToServiceByVoice(cmd);
      if (matchedSlug) {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Membuka detail layanan.' }]);
        rec.stop();
        return;
      }

      setMessages(prev => [...prev, { role: 'assistant', text: 'Perintah tidak dikenali. Ucapkan: "buka beranda", "buka profil", "buka layanan", "buka kontak", atau sebut nama layanan. Ucapkan "bantuan" untuk daftar perintah.' }]);
    };

    recognizerRef.current = rec;
    return rec;
  };

  const startVoiceCommand = () => {
    // Check secure context for mic (required by most browsers)
    const isSecure = window.isSecureContext || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isSecure) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Fitur suara membutuhkan koneksi aman (HTTPS). Buka situs melalui HTTPS agar dapat menggunakan perintah suara.' }]);
      return;
    }

    const preflight = async () => {
      try {
        if (navigator?.permissions?.query) {
          const status = await navigator.permissions.query({ name: 'microphone' });
          if (status?.state === 'denied') {
            setMessages(prev => [...prev, { role: 'assistant', text: 'Akses mikrofon ditolak. Mohon izinkan mikrofon di browser Anda.' }]);
            return false;
          }
        }
        if (navigator?.mediaDevices?.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        return true;
      } catch {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Tidak dapat mengakses mikrofon. Periksa izin mikrofon pada browser.' }]);
        return false;
      }
    };

    (async () => {
      const ok = await preflight();
      if (!ok) return;
      const rec = ensureRecognizer();
      if (!rec) {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Maaf, peramban Anda belum mendukung perintah suara.' }]);
        return;
      }
      try {
        if (recognizerActiveRef.current) {
          // If already active, restart safely
          try { rec.stop(); } catch { /* noop */ }
        }
        rec.start();
      } catch {
        // if already started, stop then start
        try { rec.stop(); rec.start(); } catch { /* noop */ }
      }
    })();
  };

  const stopVoiceCommand = () => {
    const rec = recognizerRef.current;
    try { rec?.stop(); } catch { /* noop */ }
    setIsListening(false);
    recognizerActiveRef.current = false;
  };

  // Cleanup on unmount
  useEffect(() => () => {
    try { recognizerRef.current?.stop(); } catch { /* noop */ }
    recognizerRef.current = null;
    recognizerActiveRef.current = false;
  }, []);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Try to process navigation/help commands first
    const acted = processTextCommand(trimmed);
    if (acted) {
      // scroll to bottom
      requestAnimationFrame(() => {
        panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
      });
      return;
    }

    // Fallback to knowledge base answer
    const answer = matchAnswer(trimmed);
    const botMsg = { role: 'assistant', text: answer };
    setMessages(prev => [...prev, botMsg]);
    // scroll to bottom
    requestAnimationFrame(() => {
      panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  // Enhanced animated floating icon
  const FloatingButton = (
    <button
      type="button"
      onClick={() => { setOpen(true); }}
      className="fixed bottom-6 right-6 z-40 group transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls="valpro-asisten"
    >
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#5792ff] via-[#4a7cd6] to-[#3b6bc7] shadow-2xl ring-2 ring-white/30 flex items-center justify-center overflow-hidden group-hover:shadow-[0_0_30px_rgba(87,146,255,0.6)] group-hover:ring-white/50 transition-all duration-300">
        {/* Multiple animated rings for more visual impact */}
        <span className="absolute inset-0 rounded-full animate-ping bg-[#5792ff]/40" aria-hidden="true"></span>
        <span className="absolute inset-1 rounded-full animate-pulse bg-white/20" aria-hidden="true"></span>
        
        {/* Glowing background effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Animated chat icon with enhanced effects */}
        <MessageCircle 
          className="relative w-8 h-8 text-white animate-bounce group-hover:animate-pulse transition-all duration-300" 
          style={{ 
            animationDuration: '2s',
            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))'
          }}
          aria-label="Chat icon"
        />
        
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat dengan Valpro Asisten
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
      
      <span className="sr-only">Buka Valpro Asisten</span>
    </button>
  );

  return (
    <>
      {!open && FloatingButton}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Valpro Asisten"
          id="valpro-asisten"
          className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-96 rounded-2xl bg-[#0e0637]/95 backdrop-blur-md ring-1 ring-white/15 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5792ff] to-[#4a7cd6] flex items-center justify-center ring-1 ring-white/20">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-0.5"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </div>
              <div>
                <p className="text-white font-semibold leading-tight">Valpro Asisten</p>
                <p className="text-xs text-white/70">Online • Siap membantu</p>
              </div>
            </div>
          <div className="flex items-center gap-2 relative">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-2 py-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#5792ff]"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Center listening orb overlay */}
          {isListening && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {/* Vivid glow ring using SVG gradient + blur */}
              <svg width="180" height="180" viewBox="0 0 180 180" className="drop-shadow-[0_0_30px_rgba(87,146,255,0.6)] animate-[spin_16s_linear_infinite]">
                <defs>
                  <radialGradient id="va_glow" cx="50%" cy="50%" r="50%">
                    <stop offset="60%" stopColor="rgba(0,0,0,0)" />
                    <stop offset="95%" stopColor="#6bb3ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </radialGradient>
                  <filter id="va_blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                </defs>
                <circle cx="90" cy="90" r="70" fill="none" stroke="url(#va_glow)" strokeWidth="18" filter="url(#va_blur)" />
              </svg>
            </div>
          )}

          {/* Live transcript */}
          {isListening && (
            <div className="px-4 pt-2 text-xs text-white/80" aria-live="polite">
              <span className="opacity-70">Transkrip:</span> {liveTranscript || '—'}
            </div>
          )}

          {/* Messages */}
          <div ref={panelRef} className="max-h-80 overflow-y-auto px-4 py-3 space-y-3" aria-live="polite">
            {/* Initial quick chips and suggestions */}
            {messages.length <= 1 && (
              <div className="mb-2">
                <div className="mb-3">
                  <p className="text-xs text-white/70 mb-2">Perintah cepat</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_COMMANDS.map((c, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickCommandClick(c)}
                        className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-[#5792ff]"
                        aria-label={`Perintah ${c}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/70 mb-2">Pertanyaan populer</p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePopularQuestionClick(q)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs ring-1 ring-white/15 text-left focus:outline-none focus:ring-2 focus:ring-[#5792ff]"
                        aria-label={`Tanyakan: ${q}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${m.role === 'user' ? 'bg-[#5792ff] text-white' : 'bg-white/10 text-white'}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-3 pb-3 pt-1">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Tulis pertanyaan Anda..."
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 ring-1 ring-white/20 focus:outline-none focus:ring-2 focus:ring-[#5792ff]"
                aria-label="Ketik pesan"
              />
              <button
                type="button"
                onClick={() => { isListening ? stopVoiceCommand() : startVoiceCommand(); }}
                className={`p-2 rounded-lg ring-1 ring-white/20 focus:outline-none focus:ring-2 ${isListening ? 'bg-[#5792ff] text-white focus:ring-[#5792ff]' : 'bg-white/10 hover:bg-white/15 text-white focus:ring-[#5792ff]'}`}
                aria-label={isListening ? 'Hentikan perintah suara' : 'Aktifkan perintah suara'}
                aria-pressed={isListening}
              >
                {isListening ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-[#5792ff] hover:bg-[#4a7cd6] text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Kirim pesan"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ValproAssistant;


