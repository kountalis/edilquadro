import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';
import path from 'path';

import App from './App';

const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

export async function render(req, isProd) {
  const helmetContext = {};

  const lng = req.originalUrl.startsWith('/en') ? 'en' : 'it';

  const i18n = i18next.createInstance();
  await i18n
    .use(FsBackend)
    .use(initReactI18next)
    .init({
      lng,
      fallbackLng: 'it',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: isProd
          ? path.resolve(process.cwd(), 'dist/client/locales/{{lng}}/translation.json')
          : path.resolve(process.cwd(), 'public/locales/{{lng}}/translation.json'),
      },
    });

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={req.originalUrl} future={routerFuture}>
          <App helmetContext={helmetContext} />
        </StaticRouter>
      </I18nextProvider>
    </React.StrictMode>
  );

  const { helmet } = helmetContext;
  const headContent = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `;

  return { appHtml, headContent };
}










