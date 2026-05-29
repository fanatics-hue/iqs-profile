# IQS — Worldwide Inspection Company

Sito statico di una pagina con tre reel animati (Brand, Reporting Ecosystem, Pre-shipment & Loading).

## File (caricali TUTTI nella stessa cartella)

```
index.html                 ← pagina principale
iqs-reel.html              ← Brand reel (file autonomo)
iqs-reel-reporting.html    ← Reporting reel (file autonomo)
iqs-reel-loading.html      ← Pre-shipment & Loading reel (file autonomo)
```

Sono **4 file e basta**. Ogni reel è completamente autonomo: React, Babel, font e codice
sono già incorporati dentro il file HTML. Non serve nessun file `.jsx`, nessun build,
nessuna connessione a CDN esterne.

## Caricare su GitHub Pages

1. Carica i 4 file nella **root** del repository (NON dentro una sottocartella `dist`).
2. Repo → **Settings → Pages → Source: `main` / `root` → Save**.
3. Il sito sarà su `https://<utente>.github.io/<repo>/`.

> ⚠️ Importante: i tre file `iqs-reel*.html` devono stare nella **stessa cartella** di
> `index.html`, perché la pagina li mostra tramite `<iframe>`. Se carichi solo `index.html`
> i reel appaiono vuoti.

## Anteprima locale

Basta aprire `index.html` nel browser. Se il browser blocca gli iframe locali:

```
python3 -m http.server 8000   →   http://localhost:8000/
```

## Contatti

`info@iqs-ww.com` — IQS Worldwide Inspection Company
