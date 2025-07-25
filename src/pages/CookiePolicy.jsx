import React from "react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16 pt-32 text-white">
        <Helmet>
          <title>Cookie Policy | Edilquadro</title>
          <meta name="description" content="Informativa sull'uso dei cookie di Edilquadro: cookie tecnici e di terze parti (Google Analytics)." />
          <link rel="canonical" href="https://edilquadro.it/cookie-policy" />
          <meta property="og:title" content="Cookie Policy | Edilquadro" />
          <meta property="og:description" content="Informativa sull'uso dei cookie di Edilquadro: cookie tecnici e di terze parti (Google Analytics)." />
          <meta property="og:image" content="https://edilquadro.it/logo192.png" />
          <meta property="og:url" content="https://edilquadro.it/cookie-policy" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Cookie Policy | Edilquadro" />
          <meta name="twitter:description" content="Informativa sull'uso dei cookie di Edilquadro: cookie tecnici e di terze parti (Google Analytics)." />
          <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
          <meta name="twitter:site" content="@edilquadro" />
          <html lang="it" />
        </Helmet>
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="mb-4">
          Questa pagina descrive l'uso dei cookie sul sito <strong>edilquadro.it</strong>, ai sensi del Regolamento UE 2016/679 (GDPR) e della normativa italiana.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Cosa sono i cookie?</h2>
        <p className="mb-4">
          I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro dispositivi, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Tipologie di cookie utilizzati</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Cookie tecnici:</strong> necessari per il corretto funzionamento del sito e per fornire il servizio richiesto dall'utente. Non richiedono consenso.</li>
          <li><strong>Cookie di terze parti:</strong> il sito può utilizzare Google Analytics per raccogliere informazioni statistiche anonime e aggregate sull'uso del sito. I dati raccolti non permettono di identificare personalmente l'utente.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">Gestione dei cookie</h2>
        <p className="mb-4">
          Puoi gestire le preferenze sui cookie direttamente dal tuo browser, bloccando o cancellando i cookie già presenti. La disabilitazione dei cookie tecnici può compromettere il funzionamento del sito.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Cookie di Google Analytics</h2>
        <p className="mb-4">
          Questo sito utilizza Google Analytics, un servizio di analisi web fornito da Google Inc. Google Analytics utilizza i cookie per raccogliere informazioni statistiche anonime sull'uso del sito. Puoi consultare l'informativa sulla privacy di Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">qui</a> e la pagina di disattivazione di Google Analytics <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">qui</a>.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Contatti</h2>
        <p>
          Per qualsiasi domanda sull'uso dei cookie puoi scrivere a <a href="mailto:edilquadroroma@gmail.com" className="text-green-600 underline">edilquadroroma@gmail.com</a>.
        </p>
      </div>
    </div>
  );
} 