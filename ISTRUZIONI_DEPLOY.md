# 🚀 Istruzioni per Deploy e Verifica H1

## ⚠️ PROBLEMA ATTUALMENTE

Il sito online ha ancora il **vecchio H1**: "Impresa Edile per Ristrutturazioni a Roma"

Devi deployare i **nuovi file** dalla cartella `dist/` che contengono il nuovo H1.

---

## 📋 Step 1: Verifica che i file siano pronti

1. **Apri la cartella:**
   ```
   dist/index.html
   ```

2. **Apri il file `dist/index.html`** e cerca `<h1`
   - Dovresti vedere: `<h1 style="...">Edilquadro – Ristrutturazioni Roma | Impresa Edile</h1>`
   - Se vedi ancora "Impresa Edile per Ristrutturazioni a Roma" = il build non è aggiornato

3. **Se il file è corretto, procedi al deploy**

---

## 📤 Step 2: Deploy dei file

### Metodo A: FTP/SFTP

1. **Connettiti al tuo server** con FileZilla o altro client FTP
2. **Vai alla cartella del sito web** (di solito `public_html` o `www` o `htdocs`)
3. **Carica TUTTI i file** dalla cartella `dist/` sul server
4. **Sovrascrivi** i file esistenti quando richiesto

### Metodo B: Pannello di Controllo (cPanel/Plesk)

1. **Accedi al pannello di controllo** del tuo hosting
2. **Vai a "File Manager"**
3. **Naviga alla cartella del sito** (di solito `public_html`)
4. **Carica i file** dalla cartella `dist/`
5. **Sovrascrivi** i file esistenti

### Metodo C: Git/Deploy automatico

Se usi Git per il deploy:
```bash
git add dist/
git commit -m "Aggiornato H1 per SEO"
git push
```

---

## ✅ Step 3: Verifica che l'H1 sia online

### Metodo 1: View-Source nel Browser

1. **Apri una finestra incognito** (per evitare cache):
   - Chrome/Edge: `Ctrl + Shift + N`
   - Firefox: `Ctrl + Shift + P`

2. **Vai su:** https://edilquadro.it/

3. **Apri View-Source:**
   - Premi `Ctrl + U`

4. **Cerca l'H1:**
   - Premi `Ctrl + F`
   - Cerca: `<h1`
   - **Dovresti vedere:**
     ```html
     <h1 style="font-size: 1.5rem; ...">Edilquadro – Ristrutturazioni Roma | Impresa Edile</h1>
     ```

5. **Se vedi ancora il vecchio H1:**
   - ❌ I file non sono stati deployati correttamente
   - ❌ Il server sta servendo una versione cached

### Metodo 2: Hard Refresh (Forza Ricaricamento)

1. **Vai su:** https://edilquadro.it/
2. **Premi:** `Ctrl + F5` (Windows) o `Cmd + Shift + R` (Mac)
3. **Apri View-Source** e verifica l'H1

### Metodo 3: Aggiungi Parametro alla URL

1. **Vai su:** `https://edilquadro.it/?v=12345`
2. **Apri View-Source** e verifica l'H1
3. Il parametro `?v=12345` forza il server a servire una versione fresca

### Metodo 4: Strumenti Online

1. **View-Source Online:**
   - Vai su: https://view-source.org/
   - Inserisci: `https://edilquadro.it/`
   - Cerca `<h1`

2. **Validator W3C:**
   - Vai su: https://validator.w3.org/
   - Inserisci: `https://edilquadro.it/`
   - Verifica che l'H1 sia presente

---

## 🔧 Step 4: Risolvere Cache del Server

### Se l'H1 non è visibile dopo il deploy:

1. **Svuota cache del browser:**
   - `Ctrl + Shift + Delete`
   - Seleziona "Cache" e cancella

2. **Svuota cache del server:**
   - **cPanel:** Vai a "Optimize Website" → "Clear Cache"
   - **Plesk:** Vai a "Website" → "Clear Cache"
   - **Cloudflare:** Vai a "Caching" → "Purge Everything"
   - **Oppure:** Contatta il supporto hosting

3. **Attendi 15-30 minuti:**
   - A volte la cache del server impiega tempo a scadere

---

## ✅ Checklist Finale

- [ ] File `dist/index.html` contiene il nuovo H1
- [ ] File dalla cartella `dist/` caricati sul server
- [ ] File esistenti sovrascritti
- [ ] H1 visibile nel view-source (modalità incognito)
- [ ] H1 visibile anche dopo hard refresh
- [ ] Cache del server svuotata (se necessario)

---

## 🎯 Risultato Atteso

Dopo il deploy corretto, quando fai View-Source dovresti vedere:

```html
<h1 style="font-size: 1.5rem; line-height: 1.75rem; margin: 0; padding: 1rem; color: #ffffff; background-color: #1c1c1c; text-align: center; font-weight: bold;">Edilquadro – Ristrutturazioni Roma | Impresa Edile</h1>
```

**Se vedi questo, allora l'H1 è online e Bing dovrebbe rilevarlo!** ✅

