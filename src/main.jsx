import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n'; // import i18n configuration
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

console.log('APP STARTED');

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback="loading...">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);