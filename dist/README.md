# IQS — Worldwide Inspection Company

Static one-page site + three embedded animated reels (Brand, Reporting Ecosystem, Pre-shipment & Loading).

## File structure

```
index.html                     ← main page (all sections + iframe embeds)
iqs-reel.html                  ← Brand reel (host page, ~20 s)
iqs-reel-reporting.html        ← Reporting Ecosystem reel (host, ~25 s)
iqs-reel-loading.html          ← Pre-shipment & Loading reel (host, ~13 s)

animations.jsx                 ← shared timeline engine (Stage / Sprite / Easing / hooks)
scenes.jsx                     ← Brand reel scenes
reporting-scenes.jsx           ← Reporting reel scenes (Monday hook, pipeline, Flash Report, TIR, sign-off)
loading-scenes.jsx             ← Loading reel scenes (yard → crane → vessel → Bill of Lading)
```

All files are static. React, ReactDOM and Babel are loaded from `unpkg` CDN. Google Fonts are loaded from `fonts.googleapis.com`. No build step required.

## Deploy on GitHub Pages

1. Create a new public repo, e.g. `iqs-site`.
2. Upload all 8 files in the project root (or push via `git`).
3. In the repo: **Settings → Pages → Source: `main` / root → Save**.
4. The site will be served at `https://<user>.github.io/iqs-site/`.

That's it — no build, no Node, no dependencies. The reels work because each `.html` is a self-contained host that loads the shared engine and its scene file via `<script type="text/babel" src="…">`.

## Local preview

Open `index.html` in any modern browser. If your browser blocks local file `iframe`s, run a tiny static server first:

```
python3 -m http.server 8000
# → http://localhost:8000/
```

## Editing the reels

- **Timing & scene order**: edit the master component at the bottom of each `*-scenes.jsx` file (`ReportingReel`, `LoadingReel`, etc.) and the `duration={…}` prop on `<Stage>` inside the matching `.html`.
- **Copy**: search the scene file for the visible text and edit in place.
- **Colors / fonts**: each scene file defines a palette constant at the top (`IQS_R`, `IQS_L`); index.html uses CSS variables in the `:root` block.

## Contact

`info@iqs-ww.com` — IQS Worldwide Inspection Company
