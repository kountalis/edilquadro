# 🔍 Guida: Come Verificare che l'H1 sia Online

## ✅ Verifica 1: Controllare l'H1 nel View-Source

### Metodo A: Browser (Chrome/Edge/Firefox)

1. **Apri il sito:**
   - Vai su: https://edilquadro.it/

2. **Apri il View-Source:**
   - **Windows:** Premi `Ctrl + U`
   - **Mac:** Premi `Cmd + Option + U`
   - Oppure: Click destro → "Visualizza sorgente pagina"

3. **Cerca l'H1:**
   - Premi `Ctrl + F` (o `Cmd + F` su Mac)
   - Cerca: `<h1`
   - Dovresti trovare questa riga:
     ```html
     <h1 style="font-size: 1.5rem; ...">Edilquadro – Ristrutturazioni Roma | Impresa Edile</h1>
     ```

4. **Se NON lo trovi:**
   - ❌ Il sito non è stato deployato correttamente
   - ❌ I file nella cartella `dist/` non sono stati caricati sul server

---

## ✅ Verifica 2: Evitare Cache del Browser

### Metodo A: Modalità Incognito/Privata

1. **Apri una finestra incognito:**
   - **Chrome/Edge:** `Ctrl + Shift + N` (Windows) o `Cmd + Shift + N` (Mac)
   - **Firefox:** `Ctrl + Shift + P` (Windows) o `Cmd + Shift + P` (Mac)

2. **Vai al sito:**
   - https://edilquadro.it/

3. **Apri View-Source:**
   - `Ctrl + U` e cerca `<h1`

### Metodo B: Svuotare Cache del Browser

**Chrome/Edge:**
1. Premi `Ctrl + Shift + Delete`
2. Seleziona "Immagini e file memorizzati nella cache"
3. Intervallo: "Ultima ora" o "Tutto il tempo"
4. Clicca "Cancella dati"

**Firefox:**
1. Premi `Ctrl + Shift + Delete`
2. Seleziona "Cache"
3. Clicca "Cancella ora"

### Metodo C: Hard Refresh (Forza Ricaricamento)

1. Vai su https://edilquadro.it/
2. Premi:
   - **Windows:** `Ctrl + F5` o `Ctrl + Shift + R`
   - **Mac:** `Cmd + Shift + R`

---

## ✅ Verifica 3: Evitare Cache del Server

### Metodo A: Aggiungi Parametro alla URL

1. Vai su: `https://edilquadro.it/?v=12345`
2. Il parametro `?v=12345` forza il server a servire una versione fresca
3. Apri View-Source e verifica l'H1

### Metodo B: Usa Strumenti Online

1. **View-Source Online:**
   - Vai su: https://view-source.org/
   - Inserisci: `https://edilquadro.it/`
   - Cerca `<h1`

2. **Validator W3C:**
   - Vai su: https://validator.w3.org/
   - Inserisci: `https://edilquadro.it/`
   - Verifica che l'H1 sia presente

3. **SEO Checker:**
   - Vai su: https://www.seobility.net/en/seocheck/
   - Inserisci: `https://edilquadro.it/`
   - Verifica la sezione "H1 Tags"

---

## ✅ Verifica 4: Controllo con DevTools

1. **Apri DevTools:**
   - Premi `F12` o `Ctrl + Shift + I`

2. **Vai alla tab "Network":**
   - Ricarica la pagina (`F5`)
   - Cerca `index.html` nella lista
   - Click destro → "Open in new tab"

3. **Verifica l'H1:**
   - Nel file aperto, cerca `<h1`
   - Dovresti trovarlo

---

## ✅ Verifica 5: Controllo con cURL (Terminale)

**Windows PowerShell:**
```powershell
curl https://edilquadro.it/ | Select-String -Pattern "<h1"
```

**Se vedi l'output con `<h1`, significa che l'H1 è presente!**

---

## 🚨 Se l'H1 NON è visibile:

### Problema 1: File non deployati
**Soluzione:**
1. Verifica che i file in `dist/` siano stati caricati sul server
2. Controlla che `dist/index.html` contenga l'H1
3. Ricarica i file sul server

### Problema 2: Cache del server
**Soluzione:**
1. Contatta il tuo hosting provider
2. Chiedi di svuotare la cache del server
3. Oppure aspetta 15-30 minuti che la cache scada

### Problema 3: File sbagliato
**Soluzione:**
1. Verifica che stai caricando i file da `dist/` e non da `public/`
2. Vite genera i file in `dist/`, non in `public/`

---

## ✅ Checklist Finale:

- [ ] H1 visibile nel view-source (Ctrl+U)
- [ ] H1 presente anche in modalità incognito
- [ ] H1 presente dopo hard refresh (Ctrl+F5)
- [ ] H1 presente con parametro URL (?v=12345)
- [ ] H1 verificato con strumenti online

**Se tutte le verifiche sono OK, allora l'H1 è online e Bing dovrebbe rilevarlo!** ✅

