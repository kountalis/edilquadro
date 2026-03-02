# 🔍 AUDIT SEO COMPLETO - EDILQUADRO.IT

**Data**: Marzo 2026  
**Status**: ⚠️ **PROBLEMA CRITICO TROVATO** - Pagine non indicizzabili  
**Soluzione**: Proposta in fondo

---

## 📊 ARCHITETTURA ATTUALE

```
┌─────────────────────────────────────────────────┐
│  SOURCE CODE (React + Vite)                     │
│  - src/pages/*.jsx (Home, Services, Portfolio) │
│  - src/components/*.jsx (Navbar, Footer, etc)  │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │  VITE BUILD    │
        │ (npm run build)│
        │  Genera:       │
        │  - index.html  │
        │  - /assets/*   │
        └────────┬───────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │  PRERENDERING              │
    │  (scripts/prerender.js)    │
    │  Copia index.html per:     │
    │  - /servizi/index.html     │
    │  - /portfolio/index.html   │
    │  - /contatti/index.html    │
    │  - etc...                  │
    └────────────┬───────────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │  CLOUDFLARE PAGES    │
      │  (functions/)        │
      │  - _middleware.js    │
      │  - _redirects        │
      └────────┬─────────────┘
               │
               ▼
      ┌──────────────────────┐
      │  ROUTING FINALE      │
      │  /** -> /index.html  │ ⚠️ PROBLEMA!
      └──────────────────────┘
```

---

## ⚠️ **PROBLEMA CRITICO: SPA Fallback Override**

### Il Problema

Il file `public/_redirects` contiene:

```plaintext
/ /index.html 200
/* /index.html 200
```

**Cosa succede:**
1. Google crawla `www.edilquadro.it/servizi`
2. Cloudflare lo reindirizza a `/index.html` (SPA fallback)
3. **NON serve** `/servizi/index.html` (il file prerendizzato!)
4. Google riceve sempre il STESSO HTML per tutte le pagine
5. **Risultato**: Nessun metadato specifico → pagine non indicizzate

### Perché è Successo

Il sistema SPA fallback serve per il **client-side routing**:
- L'utente clicca su un link
- React Router intercetta e cambia rotta
- La pagina viene renderizzata JavaScript

**MA**: I crawlers di Google NON ESEGUONO JavaScript bene (specialmente nel vecchio sistema di crawling).

---

## ✅ **SOLUZIONE: Hybrid Rendering (Static + SPA)**

### Opzione 1: Disabilitare Fallback per Rotte Statiche (CONSIGLIATO)

Modifica `public/_redirects`:

```plaintext
# Redirect www to non-www
https://www.edilquadro.it/* https://edilquadro.it/:splat 301!

# Serve file statici prerendizzati direttamente
/servizi /servizi/index.html 200!
/en/services /en/services/index.html 200!
/portfolio /portfolio/index.html 200!
/en/portfolio /en/portfolio/index.html 200!
/servizi/casa /servizi/casa/index.html 200!
/en/services/home /en/services/home/index.html 200!
/servizi/commerciale /servizi/commerciale/index.html 200!
/en/services/commercial /en/services/commercial/index.html 200!
/servizi/edifici /servizi/edifici/index.html 200!
/en/services/buildings /en/services/buildings/index.html 200!
/contatti /contatti/index.html 200!
/en/contact /en/contact/index.html 200!
/privacy /privacy/index.html 200!
/en/privacy /en/privacy/index.html 200!
/cookie-policy /cookie-policy/index.html 200!
/en/cookie-policy /en/cookie-policy/index.html 200!

# Fallback finale per client-side routing (404 page)
/* /index.html 200
```

**Vantaggi:**
- ✅ Google riceve HTML statico specifico per ogni pagina
- ✅ Metadati (H1, description, canonical) sono nel HTML grezzo
- ✅ no JavaScript needed per indicizzazione
- ✅ SPA routing funziona ancora lato client

---

### Opzione 2: Middleware Smart (Avanzato)

Se vuoi un'unica regola, crea un middleware Cloudflare:

```javascript
// functions/_sitemapware.js
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  
  // Lista di rotte statiche generate
  const static_routes = [
    '/servizi', '/portfolio', '/contatti', '/privacy', '/cookie-policy',
    '/en/services', '/en/portfolio', '/en/contact', '/en/privacy', '/en/cookie-policy',
    '/servizi/casa', '/servizi/commerciale', '/servizi/edifici',
    '/en/services/home', '/en/services/commercial', '/en/services/buildings'
  ];
  
  // Se è una rotta statica, servi il file
  if (static_routes.some(route => pathname === route || pathname === route + '/')) {
    const file_path = pathname.endsWith('/') ? pathname : pathname + '/';
    return context.env.ASSETS.fetch(context.request.url.replace(pathname, file_path + 'index.html'));
  }
  
  // Altrimenti, usa il SPA fallback
  return context.next();
}
```

---

## 🔍 **COME FUNZIONA IL CRAWLING ATTUALMENTE**

### Fase 1: Discovery
1. ✅ Google vede il `robots.txt` (OK)
2. ✅ Google vede il `sitemap.xml` (OK)
3. ✅ Google crawla 18 URL

### Fase 2: Rendering
1. ❌ Google riceve `/index.html` per TUTTE le pagine
2. ❌ Esegue JavaScript per vedere i metadati di ogni pagina
3. ❌ Se JS fallisce, non vede nulla

### Fase 3: Indicizzazione
1. ❌ Tutte le pagine hanno lo stesso titolo, description
2. ❌ Google penalizza come "duplicate content"
3. ❌ **Risultato**: Solo homepage indicizzata (forse)

---

## 📝 **METADATI PER PAGINA** (Attualmente Non Presenti)

Il sito **DOVREBBE** avere:

```html
<!-- Homepage -->
<title>Edilquadro - Ristrutturazioni Roma - Impresa Edile</title>
<meta name="description" content="Impresa edile Roma specializzata in ristrutturazioni casa, negozi, edifici. Preventivo gratuito e soluzioni chiavi in mano.">

<!-- Servizi -->
<title>Servizi di Ristrutturazione - Edilquadro Roma</title>
<meta name="description" content="Scopri i servizi di ristrutturazione: case, edifici, locali commerciali. Esperti a Roma.">

<!-- Portfolio -->
<title>Portfolio Lavori - Edilquadro - Ristrutturazioni Roma</title>
<meta name="description" content="Vedi i nostri lavori di ristrutturazione realizzati a Roma e provincia.">
```

**PROBLEMA**: Tutto serve il titolo di `public/index.html`!

---

## 🛠️ **CHECKLIST COSA MANCA**

- [ ] ❌ Metadati unici per pagina (title, description)
- [ ] ❌ Canonical URL per ogni pagina
- [ ] ❌ Open Graph tags (og:title, og:description, og:image)
- [ ] ❌ Metadati locali (LocalBusiness schema per ogni servizio)
- [ ] ✅ robots.txt (presente, OK)
- [ ] ✅ sitemap.xml (presente, OK)
- [ ] ✅ SSL/HTTPS (Cloudflare, OK)
- [ ] ✅ Mobile responsive (React, OK)
- [ ] ✅ Core Web Vitals (buoni, OK)
- [ ] ⚠️ Prerendering: fatto male (staticp solo template)

---

## 🚀 **PIANO DI AZIONE**

### Step 1: Fix Immediato (_redirects)
**Tempo**: 5 minuti  
**Impatto**: Alto - Pagine diventano indicizzabili

Modifica `public/_redirects` con le regole esplicite (vedi Opzione 1 sopra).

### Step 2: Improve Prerendering
**Tempo**: 1-2 ore  
**Impatto**: Molto Alto - Metadati corretti nel HTML statico

Attualmente il prerendering copia solo il template.  
**Dovrebbe**: Generare HTML con contenuto reale (headings, body text, immagini).

**Opzione A** (Semplice): Usa Puppeteer per eccellere il rendering
```javascript
// Usa Puppeteer per visitare ogni rotta e salvare l'HTML renderizzato
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:3000${route.path}`);
const html = await page.content();
fs.writeFileSync(filePath, html);
```

**Opzione B** (Migliore): React Helmet + Prerendering intelligente
- React Helmet dovrebbe già impostare i metadati
- Il prerendering dovrebbe leggere l'HTML renderizzato

### Step 3: Aggiungere Metadati per Pagina
**Tempo**: 30 minuti  
**Impatto**: Altissimo - Indicizzazione per keyword specifici

Ogni pagina dovrebbe usare React Helmet:
```jsx
<Helmet>
  <title>Servizi di Ristrutturazione - Edilquadro Roma</title>
  <meta name="description" content="..." />
  <canonical href="https://edilquadro.it/servizi" />
  <meta property="og:title" content="..." />
  <meta property="og:image" content="..." />
</Helmet>
```

### Step 4: Verifica Google Search Console
**Quando**: Dopo tutti i step precedenti  
**Cosa aspettarsi:**
- Crawl error diminuiscono
- Pagine vengono indicizzate
- URL inspection mostra il rendering corretto

---

## 📈 **POST CLOUDFLARE: COSA ASPETTARSI**

### Timeline Indicizzazione
1. **Giorno 1-2**: Google crawla il sito (potrebbe non indicizzare se vede duplicate)
2. **Giorno 3-7**: Aspetta il fix dello Step 1 (_redirects)
3. **Giorno 7-14**: Google re-crawla e indicizza le pagine
4. **Settimana 3+**: Posizionamento organico inizia

### Come Monitorare
1. **Google Search Console**:
   - Coverage report (quante pagine indicizzate)
   - Performance report (impressioni, click, posizione)
   - Inspect URL (vedi se Google prende il rendering corretto)

2. **Bing Webmaster**:
   - Simile, ma Bing è meno scrupoloso
   - Indicizza a volte anche con JS fallback

---

## 🎯 **RACCOMANDAZIONE FINALE**

### Priorità 1: Fix CRITICO (_redirects) ✅
```
Tempo: 5 min | Impatto: MASSIMO
```

### Priorità 2: Migliorare Prerendering ✅
```
Tempo: 1-2 ore | Impatto: ALTISSIMO
```

### Priorità 3: Metadati Specifici ✅
```
Tempo: 30 min | Impatto: MOLTO ALTO
```

### Dopo Fix: Resubmit a Google
- In Google Search Console, usa "Request Indexing" per le URL principali
- Aspetta 1-2 settimane per il re-crawl

---

## 📞 Hai domande su qualche punto?

Fammi sapere e farò i fix uno per uno!

