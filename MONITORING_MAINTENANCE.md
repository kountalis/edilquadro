# 📊 Monitoring e Manutenzione Cloudflare Worker

## 🎯 KPI da Monitorare

| KPI | Target | Come Verificare | Azione se Fallisce |
|-----|--------|-----------------|-------------------|
| **Cache Hit Rate** | > 80% | Cloudflare Dashboard > Analytics | Aumenta TTL o purga cache |
| **Error Rate** | < 1% | `npm run worker:logs` | Controlla token e route |
| **Response Time (cache)** | < 500ms | DevTools Network Tab | Analizza bottleneck |
| **Response Time (render)** | < 2s | Prerender.io logs | Contatta support Prerender |
| **Availability** | > 99.9% | Cloudflare Dashboard | Fallback attivo |
| **Bot Requests** | 100-1000/day | Google Search Console | Monitora crawl budget |

---

## 📈 Dashboard Cloudflare - What to Look For

### 1. Analytics Page
```
Location: https://dash.cloudflare.com → 
          edilquadro.it → 
          Analytics & Logs → 
          Analytics
```

**Cosa controllare:**
- ✅ Requests by Status: prevalenza di 200 e 304
- ✅ Bandwidth saved: > 30% (per merito cache)
- ✅ Requests blocked: dovrebbe essere 0-5%
- ✅ Cache hit ratio: trend crescente

### 2. Workers Analytics
```
Location: https://dash.cloudflare.com → 
          Workers & Pages → 
          edilquadro-prerender → 
          Analytics
```

**Cosa controllare:**
- ✅ Requests: volume giornaliero
- ✅ Errors: dovrebbe essere 0 o < 1%
- ✅ CPU time: < 50ms medio
- ✅ Subrequests: numero di chiamate a Prerender

---

## 🔍 Verifiche Giornaliere

### ✅ Mattina (5 minuti)
```powershell
# 1. Controlla se il worker è online
npm run worker:logs --tail=5

# 2. Verifica errori
npm run worker:logs | findstr "ERROR"

# 3. Controlla ultime richieste bot
npm run worker:logs | findstr "PRERENDER"
```

### ✅ Settimanale (15 minuti)
1. Apri [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vai a **Analytics**
3. Verifica:
   - Cache hit rate > 80%?
   - Bandwidth saved trend positivo?
   - No spike di errori?
   - Bot requests stabili?

### ✅ Mensile (30 minuti)
1. Scarica report analytics
2. Confronta con mese precedente
3. Calcola ROI (bandwidth saved)
4. Controlla Google Search Console (indexation)
5. Aggiorna documentazione se necessario

---

## 🐛 Troubleshooting Rapido

### Problema: Cache Hit Rate basso (< 80%)
```
Possibili cause:
1. Troppi parametri URL diversi
2. Pagine dinamiche non dovrebbero essere cachate
3. TTL troppo basso

Soluzioni:
- Aggiungi esclusione per pagine dinamiche in worker.js
- Aumenta TTL da 86400s (24h) a 604800s (7d) se appropriato
- Purga cache e ricomincia: wrangler purge-cache
```

### Problema: Error Rate alto (> 1%)
```
Possibili cause:
1. Token Prerender.io invalido
2. Endpoint Prerender.io down
3. Rate limit raggiunto

Soluzioni:
# 1. Verifica token
npm run worker:test

# 2. Rigenera token
wrangler secret put PRERENDER_TOKEN --env production

# 3. Contatta Prerender.io support
# support@prerender.io
```

### Problema: Bot non vede contenuto renderizzato
```
Possibili cause:
1. User-Agent non riconosciuto
2. Route in lista esclusi
3. Token non passato correttamente

Verifica:
npm run worker:logs | findstr "Googlebot"

Soluzioni:
- Aggiungi bot mancante in botUserAgents array
- Controlla esclusioni route
- Rideploy: npm run worker:deploy
```

### Problema: Response time lento
```
Possibili cause:
1. Cache miss (primo accesso)
2. Prerender.io è lento
3. Rete tra Cloudflare e Prerender

Verifiche:
- Primo accesso = normale (< 2s)
- Accessi successivi = cache (< 500ms)
- Se entrambi lenti = contatta Prerender.io

Monitoraggio:
npm run worker:logs | findstr "CACHE\|PRERENDER"
```

---

## 📝 Maintenance Tasks

### Settimanale
- [ ] Controlla cache hit rate
- [ ] Verifica error log
- [ ] Esamina trend analytics

### Mensile
- [ ] Review bot traffic
- [ ] Check Google Search Console
- [ ] Verifica ranking improvement
- [ ] Test con diversi user agents

### Trimestrale
- [ ] Update token se necessario
- [ ] Review e aggiorna esclusioni route
- [ ] Analizza cost savings (bandwidth)
- [ ] Pianifica improvements

### Annualmente
- [ ] Revisione architettura
- [ ] Valuta nuove features Cloudflare
- [ ] Controlla Prerender.io updates
- [ ] Rinnova licenza/piano Prerender

---

## 🔧 Comandi Manutenzione

### Purga Cache Completa
```powershell
# Via dashboard
# https://dash.cloudflare.com → 
# edilquadro.it → 
# Caching → 
# Purge Everything

# Via CLI (se configurato)
# Require: Cloudflare API token
```

### Monitoring in Tempo Reale
```powershell
# Visualizza log live (100 log)
npm run worker:logs

# Filtra per PRERENDER
npm run worker:logs | findstr "PRERENDER"

# Filtra per ERROR
npm run worker:logs | findstr "ERROR"

# Filtra per CACHE
npm run worker:logs | findstr "CACHE"
```

### Rollback Deployment
```powershell
# Vedi versioni
wrangler deployments list

# Rollback a versione precedente
wrangler deployments rollback

# Rideploy versione attuale
npm run worker:deploy
```

### Test da Diverse Locazioni
```powershell
# Simula Googlebot
$headers = @{'User-Agent' = 'Googlebot/2.1'}
(Invoke-WebRequest -Uri "https://edilquadro.it/" -Headers $headers).Headers['CF-Cache-Status']
# Output atteso: HIT or MISS

# Simula Bingbot
$headers = @{'User-Agent' = 'Bingbot/2.0'}
(Invoke-WebRequest -Uri "https://edilquadro.it/servizi" -Headers $headers).Headers['CF-Cache-Status']

# Simula human
$headers = @{'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
(Invoke-WebRequest -Uri "https://edilquadro.it/" -Headers $headers).Headers['CF-Cache-Status']
```

---

## 📊 Metriche da Raccogliere

### Foglio di Calcolo Mensile (Excel/Sheets)

| Data | Cache Hit % | Errors | Requests | Bandwidth Saved | Note |
|------|-------------|--------|----------|-----------------|------|
| 2026-02-01 | - | 0 | 0 | 0 | Setup completato |
| 2026-02-08 | - | - | - | - | Dati primi 7 giorni |
| 2026-03-01 | - | - | - | - | First month review |

### Calcolo ROI Mensile
```
Bandwidth Saved (GB) × $0.02/GB = $ Saved

Esempio:
100 GB risparmiati × $0.02 = $2 savings/mese
= $24/anno

Costo Prerender = ~$20/mese per < 5M requests
ROI positivo da mese 2
```

---

## 🎯 Goals per i Prossimi Mesi

### Febbraio (Settimane 1-2)
- [x] Setup completato
- [ ] Deploy in produzione
- [ ] Monitoraggio iniziale
- [ ] Test SEO impact

### Febbraio-Marzo (Settimane 3-8)
- [ ] Cache hit > 80%
- [ ] Zero errori per 2 settimane
- [ ] Ranking improvement verificato
- [ ] Documentazione aggiornata

### Marzo-Aprile
- [ ] Ottimizzazione esclusioni route
- [ ] Analisi bot traffic
- [ ] SEO metrics consolidate
- [ ] Performance metrics stable

### Lungo termine
- [ ] Cache hit > 90%
- [ ] Uptime 99.99%
- [ ] Zero bot errors
- [ ] SEO domination (primo su ricerche locali)

---

## 📞 Contatti Support

| Servizio | Contatto | SLA |
|----------|----------|-----|
| **Cloudflare** | https://support.cloudflare.com | 4 ore (paid) |
| **Prerender.io** | support@prerender.io | 24 ore |
| **Community** | Discord Cloudflare | Variabile |

---

## 📚 Documentazione di Riferimento

1. [SETUP_COMPLETATO.md](SETUP_COMPLETATO.md) - Cosa è stato fatto
2. [CLOUDFLARE_WORKER_SETUP.md](CLOUDFLARE_WORKER_SETUP.md) - Configurazione
3. [CLOUDFLARE_DEPLOYMENT_GUIDE.md](CLOUDFLARE_DEPLOYMENT_GUIDE.md) - Deploy guide
4. [QUICK_START.md](QUICK_START.md) - Quick reference

---

**Ultimo Update**: 2026-02-01  
**Status**: ✅ Monitoraggio attivo post-deployment
