import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-slate-100 px-2">
      <div className="bg-gray-800 rounded-3xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
        <div className="flex items-center justify-center mb-8 gap-5 flex-col sm:flex-row">
          <img
            src="/logo.png"
            alt="Logo EDILQUADRO - Edilizia e ristrutturazioni"
            className="w-16 h-16 bg-white rounded-full p-2 border-2 border-green-600 shadow"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <span className="text-3xl font-bold text-green-600 tracking-wide drop-shadow">EDILQUADRO</span>
        </div>
        <h1 className="text-6xl font-bold text-red-400 mb-2 text-center">404</h1>
        <h2 className="text-2xl mb-4 text-slate-100 text-center">{t('not_found_page.title')}</h2>
        <p className="text-base mb-8 text-slate-300 text-center" dangerouslySetInnerHTML={{ __html: t('not_found_page.subtitle') }} />
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow transition-colors duration-200"
          rel="home"
        >
          {t('not_found_page.go_home')}
        </Link>
      </div>
    </div>
  );
}