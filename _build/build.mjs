// Generates index.html, the six case-study pages and 404.html from content.mjs.
// Run from the repo root:  node _build/build.mjs
import {writeFileSync} from 'node:fs';
import {CARDS, TK, CASES, caseHTML} from './content.mjs';

const V = '20261123'; // bump to bust the CSS/JS cache after edits
const SITE = 'https://senaafsar.com';
const MAIL = 'senaafsar0@gmail.com';

const META = {
  'quin-ai': ['Quin AI — rescuing a dashboard nobody could build', "An agency shipped a predictive-AI dashboard that couldn't be built and nobody used — not even the internal team. Three decisions that turned it into the product the company works in.", 'home-quin'],
  'ruvio': ['Ruvio — an AI marketing team that never publishes without you', "Founding designer on Ruvio, an AI marketing team for businesses built on one promise: nothing is published without the customer's approval. Onboarding, the agents, the review flow on every device — and the brand, website and launch on the same rule.", 'home-ruvio'],
  'hirehoot': ['Hirehoot — the file the next designer inherits', "A recruitment startup needed a designed foundation before they could hire their first designer. Two months: a design system, the brand's behaviour in the product, and the AI flows drawn as real screens.", 'home-hirehoot'],
  'teslimx': ['TeslimX — one thumb, bad signal, direct sunlight', 'Couriers running 20–100 packages a day out of Excel. Brief to dev-ready handoff in one month: three taps per delivery, contrast audited in both modes, offline-first.', 'home-teslimx'],
  'ceers': ["Ceer's — four user types, one permission model", 'Logistics, stock, reservations, agreements and reporting in one B2B interface — for four kinds of user who each see a different slice of the same data.', 'ce-cover'],
  'ojo-candles': ['Ojo Premium Candles — scent, treated as a narrative', 'A rushed MVP on a generic template, rebuilt as a luxury storefront: collections as chapters, a photography standard, and motion that does a job. Live in two markets.', 'ojo-cover'],
};

const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function head({title, desc, path, image, type = 'website', base = '', noindex = false}) {
  const url = SITE + '/' + path;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${title}</title>
${noindex ? '<meta name="robots" content="noindex">' : `<meta name="description" content="${attr(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${attr(title.replace(/ \| Sena Afsar$/, ''))}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/img/${image}.webp">
<meta name="twitter:card" content="summary_large_image">`}
<meta name="theme-color" content="#F4F2ED">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230047FF'/%3E%3Ctext x='16' y='23' font-family='monospace' font-size='18' font-weight='700' fill='%23fff' text-anchor='middle'%3ES%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=JetBrains+Mono:wght@400;500&family=Inter:wght@600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/site.css?v=${V}">
</head>`;
}

const nav = (home, base = '') => `<header class="nav" id="top">
  <a class="sig" href="${home ? '#top' : base + 'index.html'}" aria-label="Sena Afsar, home">SENA<b>.</b>AFSAR</a>
  <a class="lk" href="${home ? '' : base + 'index.html'}#work">Work</a>
  <a class="lk hw" href="${home ? '' : base + 'index.html'}#how">How I work</a>
  <a class="btn-talk" href="${home ? '' : base + 'index.html'}#contact">Send me the brief</a>
</header>`;

const tail = (base = '') => `<script src="${base}assets/site.js?v=${V}"></script>
</body>
</html>
`;

/* ---------------- home ---------------- */
const cards = CARDS.map(c => `<a class="pcard rv" href="${c.id}.html"><div class="shot"><img src="assets/img/${c.img}.webp" alt="${c.h} product screens" width="2000" height="802" loading="lazy"></div><div class="pbody"><div class="tags">${c.tags.map((t, i) => `<span class="tag${i ? '' : ' b'}">${t}</span>`).join('')}</div><h3>${c.h}</h3><p class="pdesc">${c.p}</p><div class="pout${c.three ? ' three' : ''}">${c.o.map(o => `<div><b>${o[0]}</b><span>${o[1]}</span></div>`).join('')}</div><span class="plink">Read the case study <i>↗</i></span></div></a>`).join('\n        ');
const one = TK.map((t, i) => `<span>${t}</span><i class="${i == 2 ? 'c' : ''}">✳</i>`).join('');

const home = `${head({title: 'Sena Afsar — Product designer for AI products', desc: 'I rescue AI products that shipped wrong and leave a design system the team can keep building on. First designer at Quin AI. Available for 0→1 builds, product rescues and design-system work.', path: '', image: 'home-quin'})}
<body class="home">
<a class="skip" href="#work">Skip to work</a>
${nav(true)}

<main>
  <div class="cue" id="cue" aria-hidden="true"><span>SCROLL</span><img src="assets/img/sk-arrow3.svg" alt=""></div>
  <div class="hwrap">
    <aside class="rail rv">
      <div class="who">
        <div class="avatar"><img src="assets/img/portrait.webp" alt="Portrait of Sena Afsar" width="1400" height="1400"></div>
        <div><h1>Sena Afsar</h1><div class="role">Product designer for AI products — and the systems underneath them.</div></div>
      </div>
      <p class="bio">First designer at Quin AI. I took an unbuildable agency dashboard to <span class="hl">~50% customer adoption</span> and four awards, and left a design system that has absorbed two years of features without a rewrite.</p>
      <div class="avail"><span class="dot" aria-hidden="true"></span><span>Available for 0→1 builds, product rescues and design-system work.</span></div>
      <div class="logos"><div class="lbl">Worked on products for</div><div class="row"><span>Quin AI</span><span>Penti</span><span>Kingfisher Group</span><span>Ceer's</span><span>Ojo</span></div></div>
      <div class="xp">
        <h2>EXPERIENCE</h2>
        <div class="it"><span class="when">2022 — Now</span><span class="what">Senior Product Designer at Quin AI</span></div>
        <div class="it"><span class="when">2024 — Now</span><span class="what">Self Employed Designer at <a href="https://dasmione.studio/" target="_blank" rel="noopener">Das Mione</a></span></div>
        <div class="it"><span class="when">2021 — 2023</span><span class="what">Program Communications Lead at Founder Institute Turkey</span></div>
        <div class="it"><span class="when">2020 — 2022</span><span class="what">Freelance Designer</span><img class="coffee steam" src="assets/img/dd-coffee.svg" alt="" aria-hidden="true"></div>
      </div>
      <div class="xp">
        <h2>EDUCATION</h2>
        <div class="it"><span class="when">2017 — 2022</span><span class="what">BA Industrial Design<span class="where">Middle East Technical University</span></span></div>
        <div class="it"><span class="when">2023</span><span class="what">AI Product Management<span class="where">Product HQ</span></span></div>
      </div>
      <div class="cv"><a class="lnk" href="assets/Sena-Afsar-CV.pdf" target="_blank" rel="noopener">Download CV</a><a class="lnk" href="mailto:${MAIL}">Email</a><a class="lnk" href="https://linkedin.com/in/senaafsar" target="_blank" rel="noopener">LinkedIn</a><a class="lnk" href="https://calendly.com/senaafsar0/30min" target="_blank" rel="noopener">Schedule a call</a></div>
    </aside>

    <section id="work">
      <div class="work-h"><h2>Selected work</h2><span class="count">2021 — 2026</span></div>
      <div class="workbox">
        ${cards}
      </div>
      <img class="screen-dd" src="assets/img/dd-screen.svg" alt="" aria-hidden="true">
      <div class="also-h"><h2>Also</h2><span class="mono">Range, not the pitch</span></div>
      <div class="also">
        <a class="acard rv" href="ceers.html"><span class="tag">B2B SaaS · 0 → 1</span><h3>Ceer's</h3><p>One platform for retailers, suppliers and logistics: four user types, one permission model. Architecture, system, UI, brand and landing page — live at ceershub.com.</p><span class="plink">Case study <i>↗</i></span></a>
        <a class="acard rv" href="ojo-candles.html"><span class="tag">Art direction · D2C</span><h3>Ojo Premium Candles</h3><p>A generic template rebuilt as a luxury storefront — each scent its own chapter, with a photography standard and motion that does a job. Live in two markets.</p><span class="plink">Case study <i>↗</i></span></a>
        <a class="acard f4 rv" href="https://find4digits.netlify.app/" target="_blank" rel="noopener"><span class="tag">Designed + built solo</span><h3>FIND4 — digit duel</h3><p>Not a case study. A two-player code-breaking game I designed, then built myself. Live in a browser, no install, no sign-up.</p><span class="plink">Play it <i>↗</i></span></a>
      </div>
    </section>
  </div>

  <div class="ticker-clip" aria-hidden="true"><div class="ticker"><div class="track">${one + one + one + one}</div></div></div>

  <section class="how" id="how">
    <h2 class="rv">What working with me <em>actually<svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9 C 40 3, 90 13, 130 6 S 185 8, 198 4" fill="none" stroke="#0047ff" stroke-width="3" stroke-linecap="round"/></svg></em> looks like.</h2>
    <p class="sub rv">Not a process diagram. This is the loop I run on every team I've joined.</p>
    <div class="mcards">
      <article class="mcard rv"><span class="n">01</span><h3>YOU SEE IT<br>THE SAME DAY</h3><p>Ten minutes after the meeting there's something on screen. I'd rather argue with a bad sketch than a good paragraph — it collapses weeks of debate into one afternoon.</p><span class="k">PEN → FIGMA → DECISION</span><img class="pencil" src="assets/img/dd-pencil.svg" alt="" aria-hidden="true"></article>
      <article class="mcard rv"><span class="n">02</span><h3>ONE STORY,<br>EVERY ROOM</h3><p>Your engineers and your investors hear the same thing. Because I translate between founders, engineering, marketing and the board without dropping intent, unbuildable concepts come back as scoped, shippable specs.</p><span class="k">THE ROOM AGREES, THEN WE BUILD</span></article>
      <article class="mcard rv"><span class="n">03</span><h3>STILL THERE<br>IN THE PR</h3><p>I sit with the devs until the build matches the file. States, edge cases, empty screens, the 3am error toast. Design isn't done when it's pretty — it's done when it's live.</p><span class="k">IN THE PR REVIEW, NOT JUST THE HANDOFF</span></article>
    </div>
    <div class="divider rv">AND THE RANGE BEHIND IT</div>
    <div class="bento">
      <div class="bt fill rv"><div class="lbl">Core</div><h3>Product &amp; UI design</h3><p>Dashboards, mobile apps, design systems, AI interfaces. From messy discovery to a component library the team maintains.</p></div>
      <div class="bt ink rv"><div class="lbl">Narrative</div><h3>Pitch decks</h3><p>Two years at Founder Institute watching founders pitch. It changed how I structure any argument — narrative first, slides second.</p></div>
      <div class="bt lt rv"><div class="lbl">Identity</div><h3>Brand ownership</h3><p>Logo systems, type, colour, photography direction, motion — carried from the first mark through to guidelines that survive contact with a real team.</p><img class="cat" src="assets/img/dd-cat.svg" alt="" aria-hidden="true"></div>
      <div class="bt lt wide rv"><div class="lbl">Toolbox</div><h3>Figma · Figma Motion · Illustrator · Photoshop · Rive · Framer · Webflow · WordPress · Procreate · Notion · Cursor · Codex · Claude · Netlify</h3><p>Plus enough HTML/CSS to prototype the thing myself instead of describing it — this site is one of them.</p></div>
    </div>
  </section>

  <section class="cta" id="contact">
    <img class="star" src="assets/img/sk-star.svg" alt="" aria-hidden="true">
    <h2><span class="w"><span>Tell</span></span> <span class="w"><span>me</span></span> <span class="w"><span>what</span></span><br><span class="w"><span><em>you're</em></span></span> <span class="w"><span>building.</span></span></h2>
    <p>Send me the brief and I'll tell you whether I'm the right person — usually within a day. I'm most interested in products where AI capability is arriving faster than the interface can explain it. Working out how a product should speak about what it just learned to do is the problem I want next.</p>
    <div class="btns"><a class="btn pr" href="mailto:${MAIL}?subject=Project%20brief">Send me the brief <i>→</i></a><a class="btn gh" href="https://calendly.com/senaafsar0/30min" target="_blank" rel="noopener">Or book 30 minutes</a></div>
    <p class="mail">${MAIL} <button type="button" id="copy">Copy</button></p>
  </section>
</main>
<footer class="foot"><div class="in"><span>© 2026 Sena Afsar · Ankara, UTC+3</span><span><a href="mailto:${MAIL}">Email</a> · <a href="https://linkedin.com/in/senaafsar" target="_blank" rel="noopener">LinkedIn</a> · <a href="https://find4digits.netlify.app/" target="_blank" rel="noopener">FIND4</a></span><img class="sign" src="assets/img/sk-sign.svg" alt="Sena Afsar signature"></div></footer>
${tail()}`;
writeFileSync('index.html', home);

/* ---------------- case studies ---------------- */
CASES.forEach((c, idx) => {
  const [t, d, img] = META[c.id];
  const html = `${head({title: `${t} | Sena Afsar`, desc: d, path: `${c.id}.html`, image: img, type: 'article'})}
<body class="case" style="--acc:${c.acc}">
<a class="skip" href="#main">Skip to content</a>
${nav(false)}
<main id="main">
${caseHTML(c, idx)}
</main>
${tail()}`;
  writeFileSync(`${c.id}.html`, html);
});

/* ---------------- 404 (served from any path, so links are root-absolute) ---------------- */
const nf = `${head({title: 'Not found — Sena Afsar', noindex: true, base: '/'})}
<body class="nf">
${nav(false, '/').replace(/index\.html/g, '')}
<main class="body"><div class="mono" style="font-size:11px;letter-spacing:1.1px;color:var(--mute)">404 · NOT IN THE FILE</div><h1>This page didn't<br>make the cut.</h1><p>Like a V1 feature, it was parked. The work that did ship is one click away.</p><div class="btns"><a class="btn pr" style="background:var(--blue);color:#fff" href="/#work">Back to the work <i>→</i></a></div></main>
<footer class="foot"><div class="in"><span>© 2026 Sena Afsar · Ankara, UTC+3</span><span><a href="mailto:${MAIL}">Email</a> · <a href="/assets/Sena-Afsar-CV.pdf" target="_blank" rel="noopener">Download CV</a></span></div></footer>
${tail('/')}`;
writeFileSync('404.html', nf);
console.log('Built index.html, 404.html and', CASES.length, 'case studies.');
