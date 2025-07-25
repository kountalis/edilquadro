import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16 pt-32 text-white">
        <Helmet>
          <title>Privacy Policy | Edilquadro</title>
          <meta name="description" content="Informativa sulla privacy di Edilquadro: come trattiamo i dati personali dei nostri clienti e visitatori." />
          <link rel="canonical" href="https://edilquadro.it/privacy" />
          <meta property="og:title" content="Privacy Policy | Edilquadro" />
          <meta property="og:description" content="Informativa sulla privacy di Edilquadro: come trattiamo i dati personali dei nostri clienti e visitatori." />
          <meta property="og:image" content="https://edilquadro.it/logo192.png" />
          <meta property="og:url" content="https://edilquadro.it/privacy" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Privacy Policy | Edilquadro" />
          <meta name="twitter:description" content="Informativa sulla privacy di Edilquadro: come trattiamo i dati personali dei nostri clienti e visitatori." />
          <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
          <meta name="twitter:site" content="@edilquadro" />
          <html lang="it" />
        </Helmet>
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          La presente informativa descrive le modalità di gestione del sito <strong>edilquadro.it</strong> in riferimento al trattamento dei dati personali degli utenti che lo consultano, ai sensi del Regolamento UE 2016/679 (GDPR).
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Titolare del trattamento</h2>
        <p className="mb-4">
          Edilquadro<br />
          Email: edilquadroroma@gmail.com<br />
          Telefono: +39 333 3377320<br />
          Sede: Via egerio Levio 13, 00174 Roma (RM)
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Dati raccolti</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Dati forniti volontariamente tramite il modulo contatti (nome, email, telefono, messaggio)</li>
          <li>Dati di navigazione raccolti automaticamente (indirizzo IP, browser, dati tecnici, cookie)</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">Finalità del trattamento</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Rispondere a richieste di informazioni o preventivi</li>
          <li>Gestire e migliorare il sito web</li>
          <li>Adempiere a obblighi di legge</li>
          <li>Analisi statistiche anonime (es. Google Analytics)</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">Base giuridica</h2>
        <p className="mb-4">
          Il trattamento si basa sul consenso dell’utente e sull’esecuzione di misure precontrattuali richieste dall’interessato.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Modalità di trattamento</h2>
        <p className="mb-4">
          I dati sono trattati con strumenti informatici e telematici, adottando misure di sicurezza adeguate a proteggere la riservatezza e l’integrità dei dati.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Comunicazione e diffusione</h2>
        <p className="mb-4">
          I dati non saranno diffusi, ma potranno essere comunicati a soggetti terzi (es. fornitori di servizi tecnici, hosting, consulenti) solo se necessario per le finalità indicate.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Diritti dell’utente</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Accesso, rettifica, cancellazione dei dati</li>
          <li>Limitazione o opposizione al trattamento</li>
          <li>Portabilità dei dati</li>
          <li>Reclamo all’Autorità Garante</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">Cookie</h2>
        <p className="mb-4">
          Il sito utilizza cookie tecnici e, se presenti, cookie di terze parti (es. Google Analytics). Per maggiori dettagli consulta la <Link to="/cookie-policy" className="text-green-600 underline">Cookie Policy</Link>.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Contatti</h2>
        <p>
          Per qualsiasi richiesta relativa alla privacy puoi scrivere a <a href="mailto:edilquadroroma@gmail.com" className="text-green-600 underline">edilquadroroma@gmail.com</a>.
        </p>
      </div>
    </div>
  );
} 