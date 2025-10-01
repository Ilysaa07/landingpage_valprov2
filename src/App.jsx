import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
// import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetail from './pages/layanan/ServiceDetail';
import DataPemenuhanAlat from './pages/DataPemenuhanAlat';
import SEO from './components/SEO';
import ValproAssistant from './components/ValproAssistant';
import LoadingAnimation from './components/LoadingAnimation';
import { usePageLoading } from './hooks/usePageLoading';

function App() {
  const location = useLocation();
  const isLoading = usePageLoading();
  
  useEffect(() => {
    // Add smooth scrolling behavior
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Ensure new pages (e.g., detail pages) start at the top
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <div className="App">
        <LoadingAnimation isLoading={isLoading} />
        <Routes>
          <Route path="/" element={
            <>
              <SEO 
                title="Valpro Intertech - Layanan Legalitas & Perizinan Usaha"
                description="Mitra Legalitas Usaha Anda. Kami menyediakan layanan pendirian badan usaha, sertifikasi konstruksi, ISO, audit keuangan, dan konsultasi pajak UMKM dengan profesionalitas tertinggi."
                keywords="legalitas usaha, pendirian perusahaan, sertifikasi konstruksi, ISO, audit keuangan, konsultasi pajak, UMKM, perizinan usaha, NPWP, OSS, NIB"
              />
              <Header />
              <Hero />
              <About />
              <Services />
              {/* <Portfolio /> */}
              <Contact />
              <Footer />
              <ValproAssistant />
            </>
          } />
          <Route path="/layanan/:serviceName" element={<><ServiceDetail /><ValproAssistant /></>} />
          <Route path="/datapemenuhanalat" element={<DataPemenuhanAlat />} />
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;
