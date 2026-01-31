import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';

export default function Privacy() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16 pt-8 text-white">
        <Helmet>
          <title>{t('privacy_page.meta_title')}</title>
          <meta name="description" content={t('privacy_page.meta_description')} />
          <link rel="canonical" href="https://edilquadro.it/privacy" />
          <meta property="og:title" content={t('privacy_page.meta_title')} />
          <meta property="og:description" content={t('privacy_page.meta_description')} />
          <meta property="og:image" content="https://edilquadro.it/logo192.png" />
          <meta property="og:url" content="https://edilquadro.it/privacy" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t('privacy_page.meta_title')} />
          <meta name="twitter:description" content={t('privacy_page.meta_description')} />
          <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
          <meta name="twitter:site" content="@edilquadro" />
          <html lang={i18n.language} />
        </Helmet>
        <h1 className="text-4xl font-bold mb-6">{t('privacy_page.title')}</h1>
        <p className="mb-4">
          <Trans i18nKey="privacy_page.intro" components={{ 1: <strong /> }} />
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('privacy_page.data_controller_title')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('privacy_page.data_controller_details') }} />
        
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('privacy_page.data_collected_title')}</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>{t('privacy_page.data_collected_item1')}</li>
          <li>{t('privacy_page.data_collected_item2')}</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('privacy_page.purpose_title')}</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>{t('privacy_page.purpose_item1')}</li>
          <li>{t('privacy_page.purpose_item2')}</li>
          <li>{t('privacy_page.purpose_item3')}</li>
          <li>{t('privacy_page.purpose_item4')}</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('privacy_page.legal_basis_title')}</h2>
        <p className="mb-4">
          {t('privacy_page.legal_basis_text')}
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('privacy_page.processing_methods_title')}</h2>
        <p className="mb-4">
          {t('privacy_page.processing_methods_text')}
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('privacy_page.communication_title')}</h2>
        <p className="mb-4">
          {t('privacy_page.communication_text')}
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('privacy_page.user_rights_title')}</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>{t('privacy_page.user_rights_item1')}</li>
          <li>{t('privacy_page.user_rights_item2')}</li>
          <li>{t('privacy_page.user_rights_item3')}</li>
          <li>{t('privacy_page.user_rights_item4')}</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('privacy_page.cookie_title')}</h2>
        <p className="mb-4">
          <Trans i18nKey="privacy_page.cookie_text" components={{ 1: <Link to="/cookie-policy" className="text-green-600 underline" /> }} />
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">{t('privacy_page.contacts_title')}</h2>
        <p>
          <Trans i18nKey="privacy_page.contacts_text" components={{ 1: <a href="mailto:edilquadroroma@gmail.com" className="text-green-600 underline" /> }} />
        </p>
      </div>
    </div>
  );
} 










