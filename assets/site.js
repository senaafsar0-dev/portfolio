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

  const vidObs = new IntersectionObserver(es => {
    for (const e of es) { const v = e.target; if (e.isIntersecting && !reduced()) { const p = v.play(); if (p) p.catch(() => {}); } else v.pause(); }
  }, {threshold: .3});
  $$('video').forEach(v => vidObs.observe(v));
}

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

/* ---------- copy email ---------- */
const cp = $('#copy');
if (cp) cp.addEventListener('click', () => {
  const done = txt => { cp.textContent = txt; setTimeout(() => cp.textContent = 'Copy', 1600); };
  if (navigator.clipboard) navigator.clipboard.writeText('senaafsar0@gmail.com').then(() => done('Copied'), () => done('Select the address'));
  else done('Select the address');
});
})();
