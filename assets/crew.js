/* The Ruvio crew: seven vector characters with seven expressions, from the Ruvio crew sheet.
   Used on the Snapshots page — the header lineup and the crew section. */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* shared lighting: one set of gradients, reused by every character */
document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<radialGradient id="g-light" cx=".34" cy=".24" r=".72"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".5" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<radialGradient id="g-shade" cx=".4" cy=".3" r=".86"><stop offset=".5" stop-color="#1F0A1A" stop-opacity="0"/><stop offset="1" stop-color="#1F0A1A" stop-opacity=".4"/></radialGradient>
<linearGradient id="g-bounce" x1="0" y1="0" x2="0" y2="1"><stop offset=".74" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".16"/></linearGradient>
<linearGradient id="g-cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".06"/><stop offset=".32" stop-color="#fff" stop-opacity=".34"/><stop offset=".66" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1F0A1A" stop-opacity=".34"/></linearGradient>
<linearGradient id="g-leg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1C171B"/><stop offset=".4" stop-color="#635762"/><stop offset="1" stop-color="#1C171B"/></linearGradient>
<radialGradient id="g-foot" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#6A5E68"/><stop offset="1" stop-color="#1C171B"/></radialGradient>
<radialGradient id="g-contact"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<radialGradient id="g-blush"><stop offset="0" stop-color="#FF7C98" stop-opacity=".6"/><stop offset="1" stop-color="#FF7C98" stop-opacity="0"/></radialGradient>
<radialGradient id="g-ball" cx=".35" cy=".3" r=".78"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".58" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1F0A1A" stop-opacity=".28"/></radialGradient>
<radialGradient id="g-eye" cx=".42" cy=".36" r=".7"><stop offset=".6" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E4DAE2"/></radialGradient>
</defs></svg>`);

const vol = (shape, color) => '<g style="fill:' + color + '">' + shape + '</g><g fill="url(#g-ball)">' + shape + '</g>';
const INK = '#1F1A1E', PAPER = '#F9F9F9';
const bub = shape => '<g style="fill:#FFFFFF;stroke:#CDBDC9;stroke-width:1">' + shape + '</g><g fill="url(#g-ball)">' + shape + '</g>';
const C = {murdum: '#833470', fistik: '#CFE39A', leylak: '#EADFE8', kayisi: '#F0A35E', nar: '#E0604E', cini: '#4565B8', lavanta: '#C3A3DB', cam: '#2F7A68'};

const CAST = {
  ruvio: {name: 'Ruvio', role: 'Lead agent', col: C.murdum, fc: PAPER,
    back: '<g class="sprout"><path d="M60 60C59.5 53 57.5 49 60.5 43" fill="none" stroke="#9DB56A" stroke-width="3" stroke-linecap="round"/>'
      + vol('<ellipse cx="53.5" cy="44" rx="7.4" ry="4.2" transform="rotate(-28 53.5 44)"/>', C.fistik)
      + vol('<ellipse cx="67.5" cy="40.5" rx="8.4" ry="4.6" transform="rotate(24 67.5 40.5)"/>', C.fistik) + '</g>',
    body: '<path d="M60 57C88 57 100 75 100 97C100 115 84 125 60 125C36 125 20 115 20 97C20 75 32 57 60 57Z"/>',
    detail: '<g transform="rotate(-14 38 110)"><path d="M34.4 110A3.6 3.6 0 1 1 38 113.6" fill="none" stroke="' + C.leylak + '" stroke-width="1.7" stroke-linecap="round" opacity=".9"/><circle cx="38" cy="110" r="1.5" style="fill:' + C.fistik + '"/></g>'
      + '<path d="M23 92C21 66 38 51.5 60 51.5C82 51.5 99 66 97 92" fill="none" stroke="' + INK + '" stroke-width="3.4" stroke-linecap="round"/>'
      + vol('<ellipse cx="22" cy="93" rx="5" ry="8"/>', INK) + vol('<ellipse cx="98" cy="93" rx="5" ry="8"/>', INK)
      + '<ellipse cx="98" cy="93" rx="2.2" ry="4.4" style="fill:' + C.fistik + '"/><ellipse cx="22" cy="93" rx="2.2" ry="4.4" style="fill:' + C.fistik + '"/>'
      + '<path d="M97 99Q95 108.5 78 106" fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round"/>' + vol('<circle cx="76" cy="105.8" r="2.9"/>', C.fistik), cb: true,
    legs: [[50, 121, 49, 138], [70, 121, 71, 138]], e: [48, 72, 90], es: 1.35, m: [60, 101.5], sh: [[27, 106], [93, 106]], al: 16, lap: [129, 14], b: [100, 52], gr: 36},
  mira: {name: 'Mira', role: 'Instagram', col: C.fistik, fc: INK,
    body: '<rect x="30" y="60" width="60" height="60" rx="20"/>',
    detail: vol('<ellipse cx="54" cy="61" rx="20" ry="6.8"/>', C.murdum) + vol('<circle cx="54" cy="53.4" r="2.6"/>', C.murdum) + vol('<circle cx="80" cy="75" r="3.6"/>', C.murdum),
    legs: [[46, 116, 44, 138], [74, 116, 76, 138]], e: [50, 70, 86], m: [60, 97], sh: [[34, 92], [86, 92]], al: 20, lap: [118, 18], b: [98, 58], gr: 32},
  atlas: {name: 'Atlas', role: 'LinkedIn', col: C.cini, fc: PAPER,
    body: '<rect x="40" y="24" width="40" height="96" rx="20"/>',
    detail: vol('<polygon points="49,68 60,74 53,80"/>', PAPER) + vol('<polygon points="71,68 60,74 67,80"/>', PAPER) + vol('<polygon points="60,74 64,79 61.6,96 60,99.5 58.4,96 56,79"/>', INK),
    legs: [[52, 116, 50, 138], [68, 116, 70, 138]], e: [53, 67, 45], m: [60, 55], sh: [[43, 72], [77, 72]], al: 22, lap: [108, 20], b: [90, 22], gr: 24},
  kaan: {name: 'Kaan', role: 'Search', col: C.kayisi, fc: INK,
    body: '<circle cx="60" cy="98" r="26"/>',
    detail: '<path d="M56 73q3-9 9-5" fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round"/>',
    front: '<circle cx="50.5" cy="94" r="7.4" fill="#fff" fill-opacity=".12" stroke="' + INK + '" stroke-width="2.3"/><circle cx="69.5" cy="94" r="7.4" fill="#fff" fill-opacity=".12" stroke="' + INK + '" stroke-width="2.3"/><path d="M57.9 93q2.1-1.8 4.2 0" fill="none" stroke="' + INK + '" stroke-width="2.3"/>',
    legs: [[52, 120, 50, 138], [68, 120, 70, 138]], e: [50.5, 69.5, 94], m: [60, 108], sh: [[37, 98], [83, 98]], al: 18, lap: [128, 15], b: [94, 68], gr: 26},
  ela: {name: 'Ela', role: 'Compliance', col: C.nar, fc: INK,
    body: '<path d="M60 39C72 39 78 48 78 59C78 67 76.5 72 79 78C83 86 95 92 95 106C95 118 81 123 60 123C39 123 25 118 25 106C25 92 37 86 41 78C43.5 72 42 67 42 59C42 48 48 39 60 39Z"/>',
    detail: vol('<circle cx="60" cy="104" r="9"/>', PAPER) + '<circle cx="60" cy="104" r="5.6" style="fill:' + C.nar + '"/><circle cx="60" cy="104" r="2.3" fill="' + PAPER + '"/>',
    legs: [[49, 119, 47, 138], [71, 119, 73, 138]], e: [53, 67, 62], m: [60, 72], sh: [[38, 92], [82, 92]], al: 20, lap: [120, 18], b: [86, 36], gr: 32},
  sena: {name: 'Sena', role: 'Brand voice', col: C.lavanta, fc: INK,
    body: '<path d="M46 57H74C87 57 96 66.5 96 80V92C96 105 87 115 74 115H46C33 115 24 105 24 92V80C24 66.5 33 57 46 57Z"/>',
    detail: '<path d="M35.6 64.2q-4.6 5.9 0 11.8M43.2 64.2q-4.6 5.9 0 11.8" fill="none" stroke="' + C.murdum + '" stroke-width="4" stroke-linecap="round"/>',
    legs: [[52, 113, 51, 138], [69, 113, 69, 138]], e: [53, 73, 83], es: 1.1, m: [63, 95], ms: 1.4, sh: [[29, 92], [91, 95]], al: 20, lap: [126, 14], b: [100, 50], gr: 34},
  nil: {name: 'Nil', role: 'Ads', col: C.cam, fc: PAPER,
    body: '<path d="M60 50C82 50 92 66 92 88C92 110 78 122 60 122C42 122 28 110 28 88C28 66 38 50 60 50Z"/>',
    detail: vol('<path d="M37 60C36 47 46 40.5 60 40.5C74 40.5 84 47 83 60Z"/>', '#2A2329')
      + '<rect x="37" y="55.5" width="46" height="4.6" rx="2" style="fill:' + C.fistik + '"/>'
      + vol('<path d="M35 60.5Q60 71 85 60.5Q60 65 35 60.5Z"/>', '#1F1A1E') + vol('<circle cx="60" cy="40.8" r="2.2"/>', C.leylak)
      + vol('<circle cx="60" cy="108" r="5.4"/>', C.fistik),
    legs: [[52, 118, 50, 138], [68, 118, 70, 138]], e: [51, 69, 80], m: [60, 92], sh: [[31, 92], [89, 92]], al: 19, lap: [122, 16], b: [94, 40], gr: 28}
};
const FACES = [
  {k: 'idle', label: 'Idle'}, {k: 'working', label: 'Working'}, {k: 'searching', label: 'Searching'},
  {k: 'thinking', label: 'Thinking'}, {k: 'happy', label: 'Happy'}, {k: 'waiting', label: 'Waiting'}, {k: 'off', label: 'Off'}
];
const APP = {ruvio: 'working', mira: 'happy', atlas: 'idle', kaan: 'off', ela: 'searching', sena: 'thinking', nil: 'off'};
const label = k => FACES.find(f => f.k === k).label;
let n = 0;

function faces(c) {
  const x1 = c.e[0], x2 = c.e[1], y = c.e[2], mx = c.m[0], my = c.m[1];
  const eye = (x, yy, s, px, py) => '<g class="eye"><ellipse cx="' + x + '" cy="' + yy + '" rx="' + (3.7 * s) + '" ry="' + (4.3 * s) + '" fill="url(#g-eye)"/><g class="pp"><circle cx="' + (x + px) + '" cy="' + (yy + py + .4) + '" r="' + (2.3 * s) + '" fill="' + INK + '"/><circle cx="' + (x + px - .8) + '" cy="' + (yy + py - .6) + '" r="' + (.75 * s) + '" fill="#fff"/></g></g>';
  const E = c.es || 1, M = c.ms || 1;
  const eyes = (s, px, py, big) => eye(x1, y, s * E, px, py) + eye(x2, y, (big || s) * E, px, py);
  const brow = (x, dy, a) => { const by = y - 8 * E + dy; return '<path class="ln" d="M' + (x - 3.4) + ' ' + by + 'H' + (x + 3.4) + '" transform="rotate(' + a + ' ' + x + ' ' + by + ')"/>'; };
  const arc = (x, up) => '<path class="ln" d="M' + (x - 3.6 * E) + ' ' + (y + (up ? 1.2 : 0)) + 'q' + (3.6 * E) + ' ' + (up ? -5 * E : 3 * E) + ' ' + (7.2 * E) + ' 0"/>';
  const blush = '<ellipse cx="' + (x1 - 6) + '" cy="' + (y + 7) + '" rx="5" ry="3.4" fill="url(#g-blush)"/><ellipse cx="' + (x2 + 6) + '" cy="' + (y + 7) + '" rx="5" ry="3.4" fill="url(#g-blush)"/>';
  const sure = c.cb ? brow(x1, -1.2, 7) + brow(x2, -2.4, -3) + '<path class="ln" d="M' + (mx - 4.5) + ' ' + (my + .6) + 'q5 4 9.5-1.2"/>' : '<path class="ln" d="M' + (mx - 4.5 * M) + ' ' + my + 'q' + (4.5 * M) + ' ' + (4 * M) + ' ' + (9 * M) + ' 0"/>';
  return '<g class="f f-idle">' + blush + eyes(1, 0, 0) + sure + '</g>'
    + '<g class="f f-working">' + eyes(.95, 0, 1.4) + brow(x1, 1.4, 12) + brow(x2, 1.4, -12) + '<path class="ln" d="M' + (mx - 3.5) + ' ' + (my + 1) + 'h7"/></g>'
    + '<g class="f f-searching">' + eyes(.95, 0, 0, 1.15) + brow(x1, -1.6, -10) + '<ellipse cx="' + mx + '" cy="' + (my + 1.4) + '" rx="2.2" ry="2.6" fill="#3B1230"/></g>'
    + '<g class="f f-thinking">' + eyes(1, 1.2, -1.4) + brow(x2, -2.2, -9) + '<path class="ln" d="M' + (mx - 2) + ' ' + (my + 1.6) + 'l6-1.6"/></g>'
    + '<g class="f f-happy">' + blush + arc(x1, true) + arc(x2, true) + '<path d="M' + (mx - 5.6) + ' ' + (my - 1) + 'q5.6 8.4 11.2 0z" fill="#3B1230"/><ellipse cx="' + mx + '" cy="' + (my + 3) + '" rx="2.8" ry="1.5" fill="#F08BA5"/></g>'
    + '<g class="f f-waiting">' + blush + eyes(1.1, 0, -.8) + brow(x1, -2.6, -8) + brow(x2, -2.6, 8) + '<path class="ln" d="M' + (mx - 3) + ' ' + (my + .4) + 'q3 2.6 6 0"/></g>'
    + '<g class="f f-off">' + arc(x1, false) + arc(x2, false) + '<circle cx="' + mx + '" cy="' + (my + 1.4) + '" r="1.5" fill="#3B1230"/></g>';
}
function arm(c, side) {
  const [sx, sy] = c.sh[side === 'l' ? 0 : 1], L = c.al;
  const shape = '<rect x="' + (sx - 4) + '" y="' + (sy - 3) + '" width="8" height="' + (L + 3) + '" rx="4"/>';
  const hold = side === 'r'
    ? '<g class="hold"><rect x="' + (sx - 1.3) + '" y="' + (sy + L - 2) + '" width="2.6" height="9" rx="1.3" fill="url(#g-leg)"/><circle cx="' + sx + '" cy="' + (sy + L + 13) + '" r="6.4" fill="#fff" fill-opacity=".35" stroke="' + INK + '" stroke-width="2.4"/></g>' : '';
  return '<g class="arm arm-' + side + '" style="transform-origin:' + sx + 'px ' + sy + 'px">' + hold
    + '<g style="fill:' + c.col + '">' + shape + '</g><g fill="url(#g-cyl)">' + shape + '</g></g>';
}
function props(c) {
  const bx = c.b[0], by = c.b[1], ly = c.lap[0], lh = c.lap[1];
  return '<g class="p p-working"><rect x="42" y="' + (ly - lh) + '" width="36" height="' + lh + '" rx="3.5" fill="#2E2532"/><rect x="42" y="' + (ly - lh) + '" width="36" height="' + lh + '" rx="3.5" fill="url(#g-ball)"/>'
    + '<circle cx="60" cy="' + (ly - lh / 2) + '" r="2.8" style="fill:' + C.fistik + '"/><rect x="38" y="' + ly + '" width="44" height="4.4" rx="2.2" fill="#4A4050"/></g>'
    + '<g transform="translate(' + bx + ' ' + by + ')">'
    + '<g class="p p-thinking"><g class="t1">' + bub('<circle cx="-9" cy="10" r="1.9"/>') + '</g><g class="t2">' + bub('<circle cx="-4.5" cy="5" r="2.9"/>') + '</g><g class="t3">' + bub('<ellipse cx="4" cy="-3.5" rx="9.5" ry="7"/>') + '</g></g>'
    + '<g class="p p-happy"><path class="pline" d="M-9 5l-5-2.5M-4-3l-1.5-6M4-1l5-4.5"/></g>'
    + '<g class="p p-waiting">' + bub('<circle r="7.4"/>') + '<path d="M0 0h3.4" fill="none" stroke="' + INK + '" stroke-width="1.8" stroke-linecap="round"/><path class="hand-tick" d="M0 0V-4.6" fill="none" stroke="' + INK + '" stroke-width="1.8" stroke-linecap="round"/></g>'
    + '<g class="p p-off"><text x="-2" y="2">z</text><text x="4" y="-6">z</text></g>'
    + '</g>';
}
function legs(c) {
  return c.legs.map(l => {
    const dx = l[2] - l[0], dy = l[3] - l[1], len = Math.hypot(dx, dy), a = Math.atan2(-dx, dy) * 180 / Math.PI;
    return '<rect x="' + (l[0] - 2.5) + '" y="' + l[1] + '" width="5" height="' + len + '" rx="2.5" fill="url(#g-leg)" transform="rotate(' + a.toFixed(1) + ' ' + l[0] + ' ' + l[1] + ')"/>'
      + '<ellipse cx="' + (l[2] + (dx < 0 ? -1.5 : dx > 0 ? 1.5 : 0)) + '" cy="' + (l[3] + .6) + '" rx="5.6" ry="3" fill="url(#g-foot)"/>';
  }).join('');
}
function makeChar(key, face) {
  const c = CAST[key]; n++;
  return '<svg class="ch" data-key="' + key + '" data-face="' + face + '" viewBox="0 0 120 146" role="img" aria-label="' + c.name + ', ' + label(face).toLowerCase() + '" style="--face:' + c.fc + ';--d:-' + ((n * 0.53) % 3.4).toFixed(2) + 's">'
    + '<g class="sh"><ellipse cx="60" cy="139" rx="' + (c.gr + 6) + '" ry="6" fill="url(#g-contact)"/></g>'
    + '<g class="all"><g class="legs">' + legs(c) + '</g>'
    + '<g class="body">' + (c.back || '')
    + '<g style="fill:' + c.col + '">' + c.body + '</g><g fill="url(#g-shade)">' + c.body + '</g><g fill="url(#g-light)">' + c.body + '</g><g fill="url(#g-bounce)">' + c.body + '</g>'
    + c.detail + '<g class="face">' + faces(c) + (c.front || '') + '</g></g>'
    + arm(c, 'l') + arm(c, 'r') + props(c) + '</g></svg>';
}

function setFace(svg, f) {
  svg.dataset.face = f;
  svg.setAttribute('aria-label', CAST[svg.dataset.key].name + ', ' + label(f).toLowerCase());
  $$('[data-now="' + svg.dataset.key + '"]').forEach(t => t.textContent = label(f));
}
const cycle = svg => setFace(svg, FACES[(FACES.findIndex(f => f.k === svg.dataset.face) + 1) % FACES.length].k);

/* header lineup: each character in the state it has in the app; click to step through */
const head = $('#crew-head');
if (head) {
  head.innerHTML = ['mira', 'atlas', 'kaan', 'ruvio', 'nil', 'sena', 'ela'].map(k =>
    `<button type="button" class="crew-btn${k === 'ruvio' ? ' lead' : ''}" aria-label="Change ${CAST[k].name}'s expression">${makeChar(k, APP[k])}</button>`).join('');
  head.addEventListener('click', e => { const b = e.target.closest('.crew-btn'); if (b) cycle($('.ch', b)); });
}

/* crew section: the full lineup with an expression switch */
const stage = $('#crew-stage'), bar = $('#crew-faces');
if (stage && bar) {
  bar.innerHTML = [{k: 'app', label: 'As in the app'}].concat(FACES).map((f, i) =>
    `<button type="button" aria-pressed="${i === 0}" data-set="${f.k}">${f.label}</button>`).join('');
  stage.innerHTML = Object.keys(CAST).map(k => `<div class="mate"><button type="button" class="stand" aria-label="Change ${CAST[k].name}'s expression">${makeChar(k, APP[k])}</button>`
    + `<b>${CAST[k].name}</b><span class="role">${CAST[k].role}</span><span class="now" data-now="${k}">${label(APP[k])}</span></div>`).join('');
  stage.addEventListener('click', e => { const b = e.target.closest('.stand'); if (b) cycle($('.ch', b)); });
  bar.addEventListener('click', e => {
    const b = e.target.closest('[data-set]'); if (!b) return;
    $$('[data-set]', bar).forEach(o => o.setAttribute('aria-pressed', String(o === b)));
    $$('.ch', stage).forEach(svg => setFace(svg, b.dataset.set === 'app' ? APP[svg.dataset.key] : b.dataset.set));
  });
}

/* blinking */
if (!reduce) $$('.ch').forEach(svg => {
  (function loop() { setTimeout(() => { svg.classList.add('blink'); setTimeout(() => svg.classList.remove('blink'), 130); loop(); }, 2000 + Math.random() * 4500); })();
});

/* eyes follow the cursor */
let px = 0, py = 0, raf = 0;
function look() {
  raf = 0;
  $$('.ch').forEach(svg => {
    const r = svg.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 180) * 2.6;
    svg.style.setProperty('--lx', (dx / d * k).toFixed(2)); svg.style.setProperty('--ly', (dy / d * k * .7).toFixed(2));
  });
}
if (!reduce) addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(look); }, {passive: true});
})();
