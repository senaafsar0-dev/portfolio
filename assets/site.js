/* Reveal, counters, live motion pieces, case-study phase bar. */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- reveal + counters ---------- */
function countUp(b) {
  const to = +b.dataset.c; if (to < 3 || reduced()) return;
  const t0 = performance.now(), d = 1100;
  const f = t => { const k = Math.min(1, (t - t0) / d); b.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}
const revealEls = $$('.rv,.how h2,.cta,.hl-box,.rail,.foot');
if ('IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting) {
      e.target.classList.add('in'); revealObs.unobserve(e.target);
      const b = e.target.querySelector('b[data-c]:not([data-c=""])'); if (b) countUp(b);
    }
  }, {rootMargin: '0px 0px -8% 0px', threshold: .08});
  // the footer sits flush with the page bottom, so it gets an observer without the bottom inset
  const footObs = new IntersectionObserver(es => { for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); footObs.unobserve(e.target); } }, {threshold: .3});
  revealEls.forEach(el => (el.classList.contains('foot') ? footObs : revealObs).observe(el));
} else revealEls.forEach(el => el.classList.add('in'));

/* ---------- motion stage scaling (stages are drawn at 1180px wide) ---------- */
if ('ResizeObserver' in window) {
  const scaleObs = new ResizeObserver(es => { for (const e of es) { const st = e.target.firstElementChild; if (st) st.style.setProperty('--s', e.contentRect.width / 1180); } });
  $$('.mwrap').forEach(w => scaleObs.observe(w));
}

/* ---------- motion controllers (run only while on screen) ---------- */
const timers = new Map();
function phoneRun(st) {
  const imgs = $$('.scr img', st), steps = $$('.step', st), ind = $('.ind', st); let i = 0;
  return () => { i = (i + 1) % imgs.length; imgs.forEach((m, k) => m.classList.toggle('on', k === i)); steps.forEach((s, k) => s.classList.toggle('on', k === i)); ind.style.transform = `translateY(${steps[i].offsetTop}px)`; };
}
function respRun(st) {
  const vp = $('.vp', st), imgs = $$('img', vp), lb = $$('.bpl span', st), S = [[900, 640], [442, 589], [186, 403]]; let i = 0;
  return () => { i = (i + 1) % 3; const [w, h] = S[i]; vp.style.width = w + 'px'; vp.style.height = h + 'px'; vp.style.left = (1180 - w) / 2 + 'px'; imgs.forEach((m, k) => m.classList.toggle('on', k === i)); lb.forEach((m, k) => m.classList.toggle('on', k === i)); };
}
function tapsRun(st) {
  const imgs = $$('.scr img', st), rips = $$('.rip', st), nums = $$('.num', st), tap = $('.tap', st), of = $('.of', st), big = $('.big', st), big2 = $('.big2', st), scan = $('.scan', st), flash = $('.flash', st);
  const show = (el, on) => el.classList.toggle('on', on), scr = k => imgs.forEach((m, j) => m.classList.toggle('on', j === k));
  const fire = el => { el.classList.remove('go'); void el.offsetWidth; el.classList.add('go'); };
  const seq = [
    () => { scr(0); show(big, true); show(big2, false); [tap, of, ...nums].forEach(e => show(e, false)); scan.classList.remove('go'); },
    () => { show(big, false); show(tap, true); show(of, true); show(nums[0], true); fire(rips[0]); },
    () => { scr(1); scan.classList.add('go'); },
    () => { fire(rips[1]); show(nums[0], false); show(nums[1], true); scan.classList.remove('go'); fire(flash); scr(2); },
    () => { fire(rips[2]); show(nums[1], false); show(nums[2], true); scr(3); },
    () => { [tap, of, ...nums].forEach(e => show(e, false)); show(big2, true); },
    () => {}
  ]; let i = 0;
  return () => { i = (i + 1) % seq.length; seq[i](); };
}
const RUN = {phone: [phoneRun, 2600], resp: [respRun, 2800], taps: [tapsRun, 1300]};
if ('IntersectionObserver' in window) {
  const motionObs = new IntersectionObserver(es => {
    for (const e of es) {
      const st = e.target, k = st.dataset.m; if (!RUN[k]) continue;
      if (e.isIntersecting && !timers.has(st) && !reduced()) { const step = st._step || (st._step = RUN[k][0](st)); timers.set(st, setInterval(step, RUN[k][1])); }
      else if (!e.isIntersecting && timers.has(st)) { clearInterval(timers.get(st)); timers.delete(st); }
    }
  }, {threshold: .25});
  $$('.stage[data-m]').forEach(s => motionObs.observe(s));
}

/* videos play only while on screen */
const vidObs = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
  for (const e of es) { const v = e.target; if (e.isIntersecting && !reduced()) { const p = v.play(); if (p) p.catch(() => {}); } else v.pause(); }
}, {threshold: .3}) : {observe() {}};
$$('video').forEach(v => vidObs.observe(v));

/* ---------- case phase bar: scrollspy + progress ---------- */
let spy = null;
const links = $$('.phases a[data-to]');
if (links.length) {
  const secs = links.map(a => document.getElementById(a.dataset.to)), bar = $('.prog i');
  links.forEach(a => a.addEventListener('click', e => {
    const t = document.getElementById(a.dataset.to); if (!t) return;
    e.preventDefault(); t.scrollIntoView({behavior: reduced() ? 'auto' : 'smooth', block: 'start'}); history.replaceState(null, '', '#' + a.dataset.to);
  }));
  spy = () => {
    const y = scrollY + innerHeight * .35; let cur = -1;
    secs.forEach((s, i) => { if (s && s.offsetTop <= y) cur = i; });
    links.forEach((a, i) => a.classList.toggle('act', i === cur));
    const h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
  };
  spy();
}

/* ---------- scroll cue (home): fixed, fades out as soon as the page scrolls ---------- */
const cue = $('#cue');
const cueCheck = () => { if (cue) cue.classList.toggle('hide', scrollY > 40); };
cueCheck();

addEventListener('scroll', () => { if (spy) spy(); cueCheck(); }, {passive: true});
addEventListener('resize', () => { if (spy) spy(); }, {passive: true});

/* ---------- small pointer touches ---------- */
document.addEventListener('pointermove', e => {
  const t = e.target.closest && e.target.closest('.bt.fill'); if (!t) return;
  const r = t.getBoundingClientRect(); t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, {passive: true});

/* ---------- snapshots: justified contact sheet + lightbox ---------- */
const sheet = $('#sheet');
if (sheet && window.SNAPS) {
  const SNAPS = window.SNAPS.map(([t, k, ar, bg, p, pad], i) => ({t, k, ar, bg, p, pad: !!pad, i,
    src: t === 'v' ? `assets/video/${k}.mp4` : `assets/img/snap/${k}.webp`, poster: t === 'v' ? `assets/video/${k}-poster.webp` : ''}));
  let filter = 'all', list = SNAPS, lastW = 0;
  const tileHTML = s => `<button type="button" class="st-t${s.pad ? ' pad' : ''}" data-i="${s.i}" style="--ar:${s.ar};--tbg:${s.bg};--rt:${s.i % 2 ? .6 : -.6}deg${s.k.startsWith('f4') ? ';--pd:9% 14%' : s.pad ? ';--pd:5% 7%' : ''}" aria-label="${s.p} — ${s.t === 'v' ? 'play animation' : 'view screen'}">${s.t === 'v' ? `<video muted loop playsinline preload="metadata" poster="${s.poster}" src="${s.src}"></video><span class="pl"></span>` : `<img src="${s.src}" alt="" loading="lazy" decoding="async">`}</button>`;
  const tileObs = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting) { const el = e.target; setTimeout(() => el.classList.add('in'), (+el.dataset.k || 0) * 70); tileObs.unobserve(el); }
  }, {rootMargin: '0px 0px -6% 0px'}) : {observe: el => el.classList.add('in'), unobserve() {}};
  const build = () => {
    const W = sheet.clientWidth; if (!W) return; lastW = W;
    const gap = W < 600 ? 8 : 12, H = W < 600 ? 200 : W < 1000 ? 280 : 360;
    list = SNAPS.filter(s => filter === 'all' || s.t === filter);
    const rows = []; let row = [], sum = 0;
    for (const s of list) { row.push(s); sum += s.ar; if (sum * H + gap * (row.length - 1) >= W * .94) { rows.push(row); row = []; sum = 0; } }
    if (row.length) { const t = row.reduce((x, s) => x + s.ar, 0); if (rows.length && t * H < W * .7) rows[rows.length - 1].push(...row); else rows.push(row); }
    sheet.innerHTML = rows.map((r, ri) => {
      const last = ri === rows.length - 1, tot = r.reduce((a, s) => a + s.ar, 0), fill = !last || tot * H > W * .7;
      return `<div class="srow"${fill ? '' : ` style="width:${Math.round(tot * H + gap * (r.length - 1))}px;max-width:100%"`}>${r.map(tileHTML).join('')}</div>`;
    }).join('');
    $$('.srow', sheet).forEach(r => $$('.st-t', r).forEach((t, j) => { t.dataset.k = j; tileObs.observe(t); }));
    $$('video', sheet).forEach(v => vidObs.observe(v));
    const nv = list.filter(s => s.t === 'v').length;
    $('#sn-count').innerHTML = `<b>${list.length}</b> frames · <b>${nv}</b> in motion`;
  };
  $$('.sn-seg button').forEach(b => b.addEventListener('click', () => { filter = b.dataset.f; $$('.sn-seg button').forEach(x => x.setAttribute('aria-pressed', x === b)); build(); }));
  build();
  addEventListener('resize', () => { if (Math.abs(sheet.clientWidth - lastW) > 40) build(); }, {passive: true});

  /* lightbox */
  const lb = $('#lb'), lbs = $('#lb-stage'); let lbI = -1, lbRaf = 0, lbLast = null;
  const fit = s => { const vw = innerWidth, vh = innerHeight, mw = Math.min(vw - (vw < 600 ? 24 : 180), 1500), mh = vh - (vw < 600 ? 150 : 130); let w = mw, h = w / s.ar; if (h > mh) { h = mh; w = h * s.ar; } lbs.style.width = Math.round(w) + 'px'; lbs.style.height = Math.round(h) + 'px'; };
  const open = idx => {
    const s = list[idx]; if (!s) return; lbI = idx; cancelAnimationFrame(lbRaf);
    lbs.className = 'lb-stage' + (s.pad ? ' pad' : ''); lbs.style.setProperty('--tbg', s.bg); lbs.style.setProperty('--pd', s.k.startsWith('f4') ? '4% 10%' : s.pad ? '3% 5%' : '0');
    lbs.innerHTML = s.t === 'v' ? `<video autoplay muted loop playsinline src="${s.src}" poster="${s.poster}"></video><div class="lb-bar"><i></i></div>` : `<img src="${s.src}" alt="${s.p} screen">`;
    lbs.style.animation = 'none'; void lbs.offsetWidth; lbs.style.animation = '';
    fit(s);
    $('#lb-meta').innerHTML = `<b>${String(idx + 1).padStart(2, '0')}</b><span>/ ${String(list.length).padStart(2, '0')}</span><span>${s.p}</span>`;
    const v = $('video', lbs);
    if (v) {
      const p = v.play(); if (p) p.catch(() => {});
      const bar = $('.lb-bar i', lbs), tick = () => { if (v.duration) bar.style.width = (v.currentTime / v.duration * 100) + '%'; lbRaf = requestAnimationFrame(tick); }; tick();
      v.addEventListener('click', () => v.paused ? v.play() : v.pause());
    }
    if (!lb.classList.contains('on')) { lbLast = document.activeElement; lb.classList.add('on'); document.body.style.overflow = 'hidden'; $('.lb-x').focus({preventScroll: true}); }
  };
  const close = () => { lb.classList.remove('on'); cancelAnimationFrame(lbRaf); lbs.innerHTML = ''; document.body.style.overflow = ''; lbI = -1; if (lbLast) lbLast.focus({preventScroll: true}); };
  const step = d => open((lbI + d + list.length) % list.length);
  sheet.addEventListener('click', e => { const t = e.target.closest('.st-t'); if (t) open(list.findIndex(s => s.i === +t.dataset.i)); });
  $('.lb-x').addEventListener('click', close); $('.lb-p').addEventListener('click', () => step(-1)); $('.lb-n').addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (lbI < 0) return; if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1); });
  addEventListener('resize', () => { if (lbI > -1) fit(list[lbI]); });
  let x0 = null;
  lbs.addEventListener('pointerdown', e => { x0 = e.clientX; });
  lbs.addEventListener('pointerup', e => { if (x0 !== null && Math.abs(e.clientX - x0) > 50) step(e.clientX < x0 ? 1 : -1); x0 = null; });

  /* a cursor that follows over the frames */
  const cur = $('#sn-cur');
  if (cur && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    $('.snap').classList.add('cur');
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => { cx += (tx - cx) * .22; cy += (ty - cy) * .22; cur.style.translate = `${cx}px ${cy}px`; raf = requestAnimationFrame(loop); };
    document.addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY; const t = e.target.closest && e.target.closest('.st-t');
      if (t) {
        cur.innerHTML = $('video', t) ? '<svg viewBox="0 0 18 18"><path d="M5 3v12l10-6z" fill="currentColor"/></svg>' : '<svg viewBox="0 0 18 18"><path d="M9 3v12M3 9h12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
        if (!raf) { cx = tx; cy = ty; loop(); } cur.classList.add('on');
      } else cur.classList.remove('on');
    }, {passive: true});
  }
}

/* ---------- copy email ---------- */
const cp = $('#copy');
if (cp) cp.addEventListener('click', () => {
  const done = txt => { cp.textContent = txt; setTimeout(() => cp.textContent = 'Copy', 1600); };
  if (navigator.clipboard) navigator.clipboard.writeText('senaafsar0@gmail.com').then(() => done('Copied'), () => done('Select the address'));
  else done('Select the address');
});
})();
