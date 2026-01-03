import { Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import React, { Suspense, useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollRestoration from './components/ScrollRestoration';

import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import CookiePolicy from './pages/CookiePolicy';
import HomeServices from './pages/HomeServices';
import CommercialServices from './pages/CommercialServices';
import BuildingServices from './pages/BuildingServices';
import NotFound from './pages/NotFound';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <ProjectProvider>
      <ScrollRestoration />
      <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servizi" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contatti" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/servizi/casa" element={<HomeServices />} />
          <Route path="/servizi/commerciale" element={<CommercialServices />} />
          <Route path="/servizi/edifici" element={<BuildingServices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </ProjectProvider>
  );
}

export default App;