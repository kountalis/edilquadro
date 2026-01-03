# 🔑 Guida: IndexNow API Key per Bing

## ✅ Cosa ho fatto

Ho creato il file della chiave API per IndexNow:
- **File:** `b7d43a4755394a2080bed030c359fa05.txt`
- **Contenuto:** `b7d43a4755394a2080bed030c359fa05`
- **Posizione:** Root del sito (cartella `public/` e `dist/`)

---

## 📤 Step 1: Deploy del file chiave

### Deploy del file

1. **Il file è già nella cartella `dist/`**
   - File: `dist/b7d43a4755394a2080bed030c359fa05.txt`
   - Contenuto: `b7d43a4755394a2080bed030c359fa05`

2. **Carica il file sul server**
   - Quando fai deploy della cartella `dist/`, assicurati che questo file sia incluso
   - Il file deve essere nella **root del sito web** (stessa cartella di `index.html`)

3. **Verifica che sia accessibile online**
   - Vai su: `https://edilquadro.it/b7d43a4755394a2080bed030c359fa05.txt`
   - Dovresti vedere solo: `b7d43a4755394a2080bed030c359fa05`

---

## 🚀 Step 2: Usare IndexNow per notificare Bing

### Metodo A: Via API IndexNow (Automatico)

IndexNow notifica automaticamente Bing quando aggiorni una pagina. Puoi usarlo in due modi:

#### Opzione 1: Notifica automatica (Consigliato)

Quando deployi il sito, IndexNow notificherà automaticamente Bing se:
- Il file chiave è accessibile a: `https://edilquadro.it/b7d43a4755394a2080bed030c359fa05.txt`
- Il file contiene solo la chiave: `b7d43a4755394a2080bed030c359fa05`

#### Opzione 2: Notifica manuale via API

Puoi notificare Bing manualmente usando questa URL:

```
https://api.indexnow.org/indexnow?url=https://edilquadro.it/&key=b7d43a4755394a2080bed030c359fa05&keyLocation=https://edilquadro.it/b7d43a4755394a2080bed030c359fa05.txt
```

**Come usarla:**
1. Apri questa URL nel browser (dopo aver deployato il file chiave)
2. Bing riceverà la notifica che la pagina è stata aggiornata
3. Bing ricrawlerà la pagina entro poche ore

---

## ✅ Step 3: Verifica che il file sia online

### Verifica rapida:

1. **Apri nel browser:**
   ```
   https://edilquadro.it/b7d43a4755394a2080bed030c359fa05.txt
   ```

2. **Dovresti vedere:**
   ```
   b7d43a4755394a2080bed030c359fa05
   ```

3. **Se vedi un errore 404:**
   - ❌ Il file non è stato deployato correttamente
   - ❌ Il file non è nella root del sito
   - **Soluzione:** Ricarica il file nella root del sito

---

## 🎯 Vantaggi di IndexNow

- ✅ **Notifica immediata** a Bing quando aggiorni una pagina
- ✅ **Ricrawling più veloce** (ore invece di giorni)
- ✅ **Gratuito** e facile da usare
- ✅ **Funziona con tutti i motori di ricerca** che supportano IndexNow

---

## 📋 Checklist Completa

- [ ] File `b7d43a4755394a2080bed030c359fa05.txt` presente in `dist/`
- [ ] File deployato nella root del sito web
- [ ] File accessibile a: `https://edilquadro.it/b7d43a4755394a2080bed030c359fa05.txt`
- [ ] File contiene solo: `b7d43a4755394a2080bed030c359fa05`
- [ ] (Opzionale) Notifica manuale inviata via API

---

## 🔗 Link Utili

- **IndexNow API:** https://www.indexnow.org/
- **Documentazione:** https://www.indexnow.org/documentation

---

## 💡 Nota Importante

IndexNow è **complementare** a Bing Webmaster Tools, non lo sostituisce. Usa entrambi:

1. **IndexNow** → Per notifiche rapide quando aggiorni il sito
2. **Bing Webmaster Tools** → Per monitoraggio completo e test URL

---

**Dopo aver deployato il file chiave, IndexNow notificherà automaticamente Bing delle modifiche!** 🚀

