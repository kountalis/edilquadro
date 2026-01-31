import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import './i18n.js';

const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter future={routerFuture}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);










