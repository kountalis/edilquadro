# 🔑 TOKEN PRERENDER.IO - REFERENCE

## Token Principale
```
w2gqqMwErwI5gtkoxCnD
```

## Dove è Salvato

### 📁 File di Configurazione (LOCALE)
- `.wrangler.local.toml` - Variabile `PRERENDER_TOKEN` (per dev)

### 🔒 Cloudflare Secrets (PRODUCTION)
```powershell
wrangler secret put PRERENDER_TOKEN --env production
# Incolla il token quando richiesto
```

### 📝 Documentazione
- Annotato in `SETUP_COMPLETATO.md`
- Annotato in `QUICK_START.md`
- Annotato in `PROJECT_SUMMARY.md`
- Annotato in `CLOUDFLARE_WORKER_SETUP.md`

## Come Usarlo

### Primo Setup
```powershell
# 1. Salva in Cloudflare Secrets
wrangler secret put PRERENDER_TOKEN --env production
# Quando richiesto, incolla:
# w2gqqMwErwI5gtkoxCnD

# 2. Verifica che è salvato
wrangler secret list --env production
# Dovrebbe mostrare: PRERENDER_TOKEN (value hidden)

# 3. Deploy
npm run worker:deploy
```

### Cambio Token
```powershell
# Se mai necessario cambiare il token:
wrangler secret put PRERENDER_TOKEN --env production
# Incolla il nuovo token
# Rideploy: npm run worker:deploy
```

### Test Connectivity
```powershell
# Verifica che il worker può usare il token
npm run worker:logs | findstr "PRERENDER"
# Dovrebbe mostrare successful requests a Prerender.io
```

## Sicurezza

✅ Token NEVER in git
✅ Token NEVER in hardcoded files
✅ Token ONLY in Cloudflare Secrets
✅ Token HIDDEN in logs
✅ Token ROTATABLE se compromesso

## Informazioni API

- **API Endpoint**: `https://service.prerender.io`
- **Token Type**: Bearer token in X-Prerender-Token header
- **Rate Limit**: Depends on Prerender.io plan
- **Timeout**: 30 seconds max per request
- **Fallback**: Auto-fallback to normal fetch if error

## Riferimenti

- [Prerender.io API Docs](https://prerender.io)
- [wrangler.toml Reference](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Cloudflare Secrets](https://developers.cloudflare.com/workers/platform/environment-variables/)

---

**Token**: w2gqqMwErwI5gtkoxCnD  
**Status**: ✅ Configurato  
**Last Updated**: 2026-02-01
