import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollRestoration from './components/ScrollRestoration';

const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy'));
const HomeServices = React.lazy(() => import('./pages/HomeServices'));
const CommercialServices = React.lazy(() => import('./pages/CommercialServices'));
const BuildingServices = React.lazy(() => import('./pages/BuildingServices'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <HelmetProvider>
      <ProjectProvider>
        <Router>
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
        </Router>
      </ProjectProvider>
    </HelmetProvider>
  );
}

export default App;