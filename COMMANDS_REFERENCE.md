# 📋 Comandi di Riferimento Rapido

## 🔑 Token Prerender.io
```
w2gqqMwErwI5gtkoxCnD
```

---

## ⚡ Setup Iniziale (Una Volta)

```powershell
# 1. Installa Wrangler (global)
npm install -g wrangler

# 2. Verifica installazione
wrangler --version

# 3. Login a Cloudflare
wrangler login
# Si aprirà il browser - autorizza

# 4. Torna al terminale e attendi conferma
```

---

## 🔒 Salvare il Token (Prima del Deploy)

```powershell
# Salva il token in Cloudflare Secrets
wrangler secret put PRERENDER_TOKEN --env production

# Quando richiesto, incolla il token:
# w2gqqMwErwI5gtkoxCnD

# Verifica che è salvato
wrangler secret list --env production
# Output: PRERENDER_TOKEN [value hidden]
```

---

## 🚀 Deployment

```powershell
# Deploy il Worker in produzione
npm run worker:deploy

# Output atteso:
# ✓ Uploading 1 files...
# ✓ Uploaded the 1 file
# ✓ Deployment successful!
```

---

## 📊 Testing e Verifica

```powershell
# Test configurazione locale
npm run worker:test

# Vedi log live del Worker
npm run worker:logs

# Test request (Googlebot)
$headers = @{'User-Agent' = 'Googlebot/2.1'}
Invoke-WebRequest -Uri "https://edilquadro.it/" -Headers $headers

# Test request (human)
$headers = @{'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
Invoke-WebRequest -Uri "https://edilquadro.it/" -Headers $headers
```

---

## 🔧 Manutenzione

```powershell
# Aggiorna il token (se necessario)
wrangler secret put PRERENDER_TOKEN --env production

# Vedi ultime 10 linee di log
npm run worker:logs --tail=10

# Vedi log di ultime 2 ore
npm run worker:logs --since 2h

# Rollback a versione precedente
wrangler deployments rollback

# Vedi history di deployment
wrangler deployments list
```

---

## 🔄 Sviluppo Locale

```powershell
# Esegui Worker localmente
npm run worker:dev

# Output atteso:
# ⎔ Ready on http://127.0.0.1:8787/

# Premi Ctrl+C per fermare
```

---

## 🛑 Troubleshooting Rapido

```powershell
# 1. Controlla se il Worker è online
npm run worker:logs

# 2. Se vedi errori, controlla il token
wrangler secret list --env production

# 3. Se token è sbagliato, rigenera
wrangler secret put PRERENDER_TOKEN --env production

# 4. Rideploy
npm run worker:deploy

# 5. Verifica di nuovo
npm run worker:logs
```

---

## 📈 Monitoring Giornaliero

```powershell
# Mattina: controlla errori
npm run worker:logs | Select-String "ERROR"

# Se ci sono errori, controlla i log completi
npm run worker:logs

# Verifica ultima richiesta bot
npm run worker:logs | Select-String "PRERENDER"
```

---

## 🎯 Checklist Dopo Deployment

- [ ] `npm run worker:deploy` eseguito
- [ ] Output "Deployment successful"
- [ ] `npm run worker:logs` mostra nuovi log
- [ ] Route configurata in Cloudflare Dashboard
- [ ] Test bot request → CF-Cache-Status: MISS o HIT
- [ ] Test human request → risposta normale
- [ ] Google Search Console → nuovi crawl visibili

---

## 📞 In Caso di Problemi

```powershell
# Vedi tutti gli errori
npm run worker:logs | Select-String "ERROR|FAIL"

# Visualizza solo i log di Prerender
npm run worker:logs | Select-String "PRERENDER"

# Visualizza solo i log di Cache
npm run worker:logs | Select-String "CACHE"

# Vedi i dettagli di una specifica richiesta
npm run worker:logs --status 200  # solo 200
npm run worker:logs --status 500  # solo errori
```

---

## 🔑 Comando Importante (Mai Dimenticare)

**PRIMA di qualsiasi cosa, salva il token:**
```powershell
wrangler secret put PRERENDER_TOKEN --env production
# w2gqqMwErwI5gtkoxCnD
```

Se non lo fai, il deployment fallirà!

---

## 📚 File da Consultare

| Comando | Se Vuoi Sapere |
|---------|----------------|
| `npm run worker:dev` | Esecuzione locale |
| `npm run worker:test` | Test configurazione |
| `npm run worker:deploy` | Deploy produzione |
| `npm run worker:logs` | Log in tempo reale |
| `npm run worker:secret` | Gestire secrets |

Per più dettagli, vedi:
- QUICK_START.md (5 min)
- CLOUDFLARE_WORKER_SETUP.md (20 min)
- CLOUDFLARE_DEPLOYMENT_GUIDE.md (25 min)

---

**Token**: w2gqqMwErwI5gtkoxCnD  
**Status**: Pronto per deployment  
**Last Updated**: 2026-02-01
