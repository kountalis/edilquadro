# ⚡ Quick Start: Cloudflare + Prerender

## 🔑 Token Salvato
```
w2gqqMwErwI5gtkoxCnD
```

## 📦 Installazione (primo setup)
```powershell
# 1. Installa Wrangler
npm install -g wrangler

# 2. Login
wrangler login

# 3. Salva token
wrangler secret put PRERENDER_TOKEN --env production
# Incolla: w2gqqMwErwI5gtkoxCnD
```

## 🚀 Deploy
```powershell
npm run worker:deploy
```

## 📋 Dopo Deploy
1. Configura route in https://dash.cloudflare.com
   - Pattern: `edilquadro.it/*`
   - Worker: `edilquadro-prerender`

2. Controlla i log:
```powershell
npm run worker:logs
```

## ✅ Test
```powershell
npm run worker:test
```

## 📁 File Creati
- `wrangler.toml` - Configurazione
- `src/worker.js` - Logica (75 righe)
- `scripts/test-worker.js` - Test
- Documentazione completa

## 📚 Docs Disponibili
- [SETUP_COMPLETATO.md](SETUP_COMPLETATO.md) - Riepilogo completo
- [CLOUDFLARE_WORKER_SETUP.md](CLOUDFLARE_WORKER_SETUP.md) - Dettagli tecnici
- [CLOUDFLARE_DEPLOYMENT_GUIDE.md](CLOUDFLARE_DEPLOYMENT_GUIDE.md) - Guide step-by-step

## ⏱️ Tempo Totale
- Setup locale: ✅ Completo
- Testing: ✅ Passato
- Documentazione: ✅ Completa
- Deployment: 📋 Pronto (5-10 minuti)

---
**Status**: ✅ Pronto per produzione
