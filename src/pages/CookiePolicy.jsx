import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation, Trans } from 'react-i18next';

export default function CookiePolicy() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16 pt-8 text-white">
        <Helmet>
          <title>{t('cookie_policy_page.meta_title')}</title>
          <meta name="description" content={t('cookie_policy_page.meta_description')} />
          <link rel="canonical" href="https://edilquadro.it/cookie-policy" />
          <meta property="og:title" content={t('cookie_policy_page.meta_title')} />
          <meta property="og:description" content={t('cookie_policy_page.meta_description')} />
          <meta property="og:image" content="https://edilquadro.it/logo192.png" />
          <meta property="og:url" content="https://edilquadro.it/cookie-policy" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t('cookie_policy_page.meta_title')} />
          <meta name="twitter:description" content={t('cookie_policy_page.meta_description')} />
          <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
          <meta name="twitter:site" content="@edilquadro" />
          <html lang={i18n.language} />
        </Helmet>
        <h1 className="text-4xl font-bold mb-6">{t('cookie_policy_page.title')}</h1>
        <p className="mb-4">
          <Trans i18nKey="cookie_policy_page.intro" components={{ 1: <strong /> }} />
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('cookie_policy_page.what_are_cookies_title')}</h2>
        <p className="mb-4">
          {t('cookie_policy_page.what_are_cookies_text')}
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('cookie_policy_page.types_of_cookies_title')}</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><Trans i18nKey="cookie_policy_page.technical_cookies" components={{ 0: <strong /> }} /></li>
          <li><Trans i18nKey="cookie_policy_page.third_party_cookies" components={{ 0: <strong /> }} /></li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('cookie_policy_page.cookie_management_title')}</h2>
        <p className="mb-4">
          {t('cookie_policy_page.cookie_management_text')}
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('cookie_policy_page.google_analytics_title')}</h2>
        <p className="mb-4">
          <Trans i18nKey="cookie_policy_page.google_analytics_text" components={{ 1: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-600 underline" />, 3: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-green-600 underline" /> }} />
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('cookie_policy_page.contacts_title')}</h2>
        <p>
          <Trans i18nKey="cookie_policy_page.contacts_text" components={{ 1: <a href="mailto:edilquadroroma@gmail.com" className="text-green-600 underline" /> }} />
        </p>
      </div>
    </div>
  );
}