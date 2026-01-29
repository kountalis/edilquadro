import { Routes, Route } from 'react-router-dom';
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

function App({ helmetContext } = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <HelmetProvider context={helmetContext}>
      <ProjectProvider>
        <ScrollRestoration />
        <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <ScrollToTop />
        <Suspense fallback={
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
            <svg className="animate-spin h-12 w-12 text-green-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <p className="text-lg font-semibold">Caricamento contenuti...</p>
          </div>
        }>
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
    </HelmetProvider>
  );
}

export default App;
