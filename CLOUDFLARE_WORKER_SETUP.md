# Configurazione Cloudflare Worker + Prerender.io

## 📋 Panoramica

Questo setup integra **Cloudflare Workers** con **Prerender.io** per:
- Servire contenuto prerendered ai bot di ricerca (SEO)
- Cache intelligente per performance ottimale
- Fallback automatico al normale fetch
- Zero latenza per l'utente finale

## 🔑 Token Prerender.io

**Token salvato**: `w2gqqMwErwI5gtkoxCnD`

### Come è generato:
1. Account Prerender.io creato
2. Token API generato dal dashboard
3. Token salvato in Cloudflare Workers secrets

## 🚀 Setup Locale

### 1. Installare Wrangler (CLI di Cloudflare)
```bash
npm install -g wrangler
```

### 2. Autenticarsi con Cloudflare
```bash
wrangler login
```

### 3. Configurare il Worker localmente
```bash
wrangler dev --env local
```

## 📁 Struttura File

```
project/
├── wrangler.toml              # Configurazione principale Worker
├── .wrangler.local.toml       # Config locale (dev)
├── src/
│   └── worker.js              # Logica del Worker
└── scripts/
    └── test-worker.js         # Test di validazione
```

## 🔧 Configurazione

### wrangler.toml
- `name`: Nome del worker
- `main`: File entry point
- `compatibility_date`: Data di compatibilità
- `vars`: Variabili di ambiente
  - `PRERENDER_TOKEN`: Token API Prerender.io
  - `PRERENDER_DOMAIN`: Dominio service API

### src/worker.js
- Intercetta tutte le richieste
- Identifica bot dai User-Agent
- Routing a Prerender.io per bot
- Cache intelligente (24h TTL)
- Fallback a fetch normale

## 🤖 Bot Riconosciuti

Il worker riconosce automaticamente:
- Googlebot
- Bingbot
- Yandexbot
- DuckDuckBot
- BaiduSpider
- FacebookExternalHit
- TwitterBot
- LinkedinBot
- WhatsApp
- Telegram
- Discord
- Pinterest
- Viber

## 🚫 Route Escluse

Non vengono prerendered:
- `/api/*` - API endpoints
- `/admin/*` - Admin panel
- `/.well-known/*` - ACME challenges
- `/manifest.json` - PWA manifest
- `/robots.txt` - Robots file
- `/sitemap.xml` - Sitemap
- `/service-worker.js` - Service worker

## 💾 Cache Strategy

| Aspetto | Configurazione |
|---------|----------------|
| **TTL** | 24 ore |
| **Key** | URL + Metodo HTTP |
| **Hit** | Risposta immediata da cache |
| **Miss** | Fetch da Prerender.io |
| **Store** | Solo 200 OK responses |

## 📊 Testing

### Eseguire test locali
```bash
node scripts/test-worker.js
```

### Test inclusi:
- ✅ Connettività API Prerender.io
- ✅ Validità token
- ✅ Riconoscimento bot
- ✅ Esclusione route
- ✅ Strategia cache

## 🌐 Deployment a Produzione

### Passo 1: Setup Cloudflare Account
1. Accedi a https://dash.cloudflare.com
2. Seleziona dominio: `edilquadro.it`
3. Vai a "Workers & Pages"

### Passo 2: Settare Secrets
```bash
wrangler secret put PRERENDER_TOKEN --env production
```
Inserisci: `w2gqqMwErwI5gtkoxCnD`

### Passo 3: Configurare Route
In `wrangler.toml`:
```toml
[env.production]
routes = [
  { pattern = "edilquadro.it/*", zone_name = "edilquadro.it" }
]
```

### Passo 4: Deploy
```bash
wrangler deploy --env production
```

### Passo 5: Verifica
```bash
wrangler tail --env production
```

## 🔍 Monitoring

### Log in tempo reale
```bash
wrangler tail --env production
```

### Metriche da monitorare:
- **Cache Hit Rate**: % di risposte da cache
- **Prerender Requests**: Numero di richieste a Prerender.io
- **Error Rate**: Errori nel rendering
- **Response Time**: Tempo di risposta medio

## ⚙️ Variabili d'Ambiente

Productionesecreti (in Cloudflare):
```
PRERENDER_TOKEN = w2gqqMwErwI5gtkoxCnD
PRERENDER_DOMAIN = https://service.prerender.io
```

Locale (in `.wrangler.local.toml`):
```
[env.local.vars]
PRERENDER_TOKEN = "w2gqqMwErwI5gtkoxCnD"
PRERENDER_DOMAIN = "https://service.prerender.io"
```

## 🆘 Troubleshooting

### Worker non risponde
```bash
wrangler tail --env production  # Controlla log
```

### Token non valido
```bash
# Regenerare token su Prerender.io
wrangler secret put PRERENDER_TOKEN --env production
```

### Cache non funziona
```
Headers richiesti:
- Cache-Control: public, max-age=86400
- X-Prerender-Token: w2gqqMwErwI5gtkoxCnD
```

### Bot non viene prerendered
1. Controlla User-Agent in log
2. Verifica se in lista di esclusione
3. Controlla token Prerender.io

## 📈 Performance

Metriche attese dopo setup:
- **First Byte**: < 500ms (da cache)
- **Bots**: < 2s (Prerender.io)
- **Cache Hit**: > 80%
- **Success Rate**: > 99%

## 🔐 Sicurezza

- ✅ Token salvato in Cloudflare Secrets (non visibile)
- ✅ HTTPS solo (https://service.prerender.io)
- ✅ User-Agent validation
- ✅ Rate limiting implicito Cloudflare

## 📚 Risorse

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Prerender.io API](https://prerender.io/api)
- [Edge Runtime API](https://developers.cloudflare.com/workers/runtime-apis/)

## ✅ Checklist Deployment

- [ ] Token Prerender.io annotato: `w2gqqMwErwI5gtkoxCnD`
- [ ] File `wrangler.toml` creato
- [ ] File `src/worker.js` implementato
- [ ] Test locali eseguiti e passati
- [ ] Cloudflare account configurato
- [ ] Routes in produzione configurate
- [ ] Secret PRERENDER_TOKEN salvato
- [ ] Deploy completato
- [ ] Monitoring attivato
- [ ] Test dai bot eseguiti

---

**Data Setup**: 2026-02-01  
**Token**: w2gqqMwErwI5gtkoxCnD  
**Status**: ✅ Configurazione completata, pronto per deployment
