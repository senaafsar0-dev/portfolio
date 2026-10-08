/* Option 2 — reveal, cursor, jump-bar. Nothing heavier than it needs to be. */
(function(){

  /* ---- 1. reveal on scroll ---- */
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });
    items.forEach(function(el, i){
      el.style.transitionDelay = Math.min(i * 45, 270) + 'ms';
      io.observe(el);
    });
    setTimeout(function(){ items.forEach(function(el){ el.classList.add('in'); }); }, 2500);
  }

  /* ---- 2. year ---- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse  = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ---- 3. cursor: a ring that lags, a dot that doesn't ---- */
  if (!reduced && !coarse) {
    var ring = document.createElement('div'); ring.className = 'cur';
    var dot  = document.createElement('div'); dot.className  = 'curdot';
    document.body.appendChild(ring); document.body.appendChild(dot);

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2, rx = tx, ry = ty, on = false;

    window.addEventListener('mousemove', function(e){
      tx = e.clientX; ty = e.clientY;
      if (!on){ on = true; rx = tx; ry = ty; document.body.classList.add('cur-on'); }
      dot.style.transform = 'translate(' + tx + 'px,' + ty + 'px) translate(-50%,-50%)';
    }, { passive:true });

    window.addEventListener('mouseout', function(e){
      if (!e.relatedTarget) document.body.classList.remove('cur-on');
    });
    window.addEventListener('mouseover', function(){
      if (on) document.body.classList.add('cur-on');
    });

    (function loop(){
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();

    // grow over anything clickable
    var hot = 'a, button, .pcard, [role="button"]';
    document.addEventListener('mouseover', function(e){
      if (e.target.closest && e.target.closest(hot)) document.body.classList.add('cur-hot');
    }, true);
    document.addEventListener('mouseout', function(e){
      if (e.target.closest && e.target.closest(hot)) document.body.classList.remove('cur-hot');
    }, true);
  }

  /* ---- 3b. scroll cue, bottom left: fades out once they've started ---- */
  var cue = document.getElementById('cue');
  if (cue) {
    var hideCue = function(){
      cue.classList.toggle('gone', window.scrollY > 120);
    };
    hideCue();
    window.addEventListener('scroll', hideCue, { passive:true });
    // it has done its job the moment the work list moves, too
    var box = document.querySelector('.workbox');
    if (box) box.addEventListener('scroll', function(){
      if (box.scrollTop > 40) cue.classList.add('gone');
    }, { passive:true });
  }

  /* ---- 4. case-study jump bar: mark the section you're in ---- */
  var jump = document.querySelector('.jump');
  if (jump && 'IntersectionObserver' in window) {
    var links = [].slice.call(jump.querySelectorAll('a'));
    var targets = links.map(function(a){
      return document.querySelector(a.getAttribute('href'));
    }).filter(Boolean);

    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        links.forEach(function(a){
          a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    targets.forEach(function(t){ spy.observe(t); });
  }
})();
