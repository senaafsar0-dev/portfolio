# Page generator

`index.html`, `404.html` and the six case-study pages are generated. Don't edit them by hand — edit here, then rebuild:

```bash
node _build/build.mjs
```

- `content.mjs` — home cards, ticker words, every case study (copy, facts, phases, figures) and the HTML renderers, including the live motion pieces.
- `build.mjs` — page templates: the home page, SEO/meta per page, the 404, and the `?v=` cache-busting stamp (bump `V` after changing `assets/site.css` or `assets/site.js`).

Images live in `assets/img/`, videos (webm + mp4 + poster) in `assets/video/`.
