import { Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { HelmetProvider } from 'react-helmet-async';
import React, { useState } from 'react';
import { useAnalytics } from './hooks/useAnalytics';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollRestoration from './components/ScrollRestoration';
import CookieBanner from './components/CookieBanner';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Privacy from './pages/Privacy';
import CookiePolicy from './pages/CookiePolicy';
import HomeServices from './pages/HomeServices';
import CommercialServices from './pages/CommercialServices';
import BuildingServices from './pages/BuildingServices';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';

function App({ helmetContext } = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useAnalytics(); // Auto-track: page views, scroll depth, time on page
  return (
    <HelmetProvider context={helmetContext}>
      <ProjectProvider>
        <ScrollRestoration />
        <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <ScrollToTop />
          <Routes>
            {/* Italian routes */}
            <Route path="/" element={<Home />} />
            <Route path="/servizi" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
            <Route path="/contatti" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/servizi/casa" element={<HomeServices />} />
            <Route path="/servizi/commerciale" element={<CommercialServices />} />
            <Route path="/servizi/edifici" element={<BuildingServices />} />
            {/* English routes - same components, i18n handles translation */}
            <Route path="/en" element={<Home />} />
            <Route path="/en/services" element={<Services />} />
            <Route path="/en/portfolio" element={<Portfolio />} />
            <Route path="/en/portfolio/:slug" element={<ProjectDetail />} />
            <Route path="/en/contact" element={<Contact />} />
            <Route path="/en/privacy" element={<Privacy />} />
            <Route path="/en/cookie-policy" element={<CookiePolicy />} />
            <Route path="/en/services/home" element={<HomeServices />} />
            <Route path="/en/services/commercial" element={<CommercialServices />} />
            <Route path="/en/services/buildings" element={<BuildingServices />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        <Footer />
        <CookieBanner />
      </ProjectProvider>
    </HelmetProvider>
  );
}

export default App;










