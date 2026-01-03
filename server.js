import fs from 'fs';
import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.resolve();
const isProd = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();

  let vite;
  if (!isProd) {
    // Development server
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    // Production server
    app.use((await import('compression')).default());
    app.use(
      express.static(path.resolve(__dirname, 'dist/client'), {
        index: false // Don't send index.html for '/'
      })
    );
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template;
      let render;

      if (!isProd) {
        // 1. Read index.html in dev
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        // 2. Apply Vite HTML transforms.
        template = await vite.transformIndexHtml(url, template);
        // 3. Load the server entry.
        const serverEntry = await vite.ssrLoadModule('/src/entry-server.jsx');
        render = serverEntry.render;
      } else {
        // 1. Read index.html from dist in prod
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
        // 2. Load the server entry from dist in prod
        const serverEntry = await import('./dist/server/entry-server.js');
        render = serverEntry.render;
      }

      // 4. Render the app HTML.
      const { appHtml, headContent } = await render(req, isProd);

      // 5. Inject the app-rendered HTML and head content into the template.
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--head-outlet-->`, headContent);

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (!isProd) {
        vite.ssrFixStacktrace(e);
      }
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

createServer();
