    // Every block fails to "visible and usable", never to "hidden": the page works with no JS.
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sticky CTA: appears once the hero's own button has scrolled up out of view, and hides
    // again when you scroll back to it. On a phone the hero button starts below the fold, so
    // "not intersecting" alone would show the bar on load, on top of the headline.
    (function () {
      var sticky = document.getElementById('stickyCta');
      var watch = document.querySelector('header a[href*="/go/blueprint/"]') || document.querySelector('header');
      if (!sticky || !watch || !('IntersectionObserver' in window)) return;
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var passed = !e.isIntersecting && e.boundingClientRect.top < 0;
          sticky.classList.toggle('translate-y-full', !passed);
        });
      }).observe(watch);
    })();

    // Scroll progress bar
    (function () {
      var bar = document.getElementById('progress');
      if (!bar) return;
      var ticking = false;
      function update() {
        var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
        bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
        ticking = false;
      }
      window.addEventListener('scroll', function () {
        if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
      }, { passive: true });
      update();
    })();

    // Scroll reveals (.reveal and the self-drawing .rule lines), with a 2.5s safety net.
    (function () {
      var els = document.querySelectorAll('.reveal, .rule');
      if (!('IntersectionObserver' in window) || !els.length) {
        els.forEach(function (el) { el.classList.add('in'); });
        return;
      }
      document.querySelectorAll('[data-stagger]').forEach(function (parent) {
        parent.querySelectorAll(':scope > .reveal').forEach(function (kid, i) { kid.style.transitionDelay = (i * 90) + 'ms'; });
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (el) { io.observe(el); });
    })();
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in), .rule:not(.in)').forEach(function (el) { el.classList.add('in'); });
    }, 2500);

    // Hero carousel: arrows, dots and the current slide. The swipe itself is native scroll-snap.
    (function () {
      var track = document.querySelector('[data-carousel]');
      if (!track) return;
      var slides = track.querySelectorAll('.slide-c');
      var dots = document.querySelectorAll('[data-c-dots] .c-dot');
      var prev = document.querySelector('[data-c-prev]');
      var next = document.querySelector('[data-c-next]');
      var current = 0;
      function go(i) {
        i = Math.max(0, Math.min(slides.length - 1, i));
        track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
      }
      function mark(i) {
        current = i;
        dots.forEach(function (d, k) { if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
        if (prev) prev.disabled = i === 0;
        if (next) next.disabled = i === slides.length - 1;
      }
      if (prev) prev.addEventListener('click', function () { go(current - 1); });
      if (next) next.addEventListener('click', function () { go(current + 1); });
      dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) mark(Array.prototype.indexOf.call(slides, e.target));
          });
        }, { root: track, threshold: 0.6 });
        slides.forEach(function (s) { io.observe(s); });
      }
      mark(0);
    })();

    // Before/after slideshows in the story (independent prev/next + dots per side).
    (function () {
      document.querySelectorAll('[data-slideshow]').forEach(function (box) {
        var slides = box.querySelectorAll('.slide');
        var hits = box.querySelectorAll('[data-dots] button');
        var dots = box.querySelectorAll('.dot');
        if (!slides.length) return;
        var i = 0, timer = null;
        function show(n) {
          i = (n + slides.length) % slides.length;
          slides.forEach(function (s, k) { s.classList.toggle('opacity-100', k === i); s.classList.toggle('opacity-0', k !== i); });
          dots.forEach(function (d, k) { d.classList.toggle('bg-cream', k === i); d.classList.toggle('bg-line', k !== i); });
        }
        function start() { if (!reduce && !timer) timer = setInterval(function () { show(i + 1); }, 4000); }
        function stop() { if (timer) { clearInterval(timer); timer = null; } }
        var p = box.querySelector('[data-prev]'), n = box.querySelector('[data-next]');
        if (p) p.addEventListener('click', function () { show(i - 1); });
        if (n) n.addEventListener('click', function () { show(i + 1); });
        hits.forEach(function (d, k) { d.addEventListener('click', function () { show(k); }); });
        box.addEventListener('mouseenter', stop);
        box.addEventListener('mouseleave', start);
        box.addEventListener('click', function () { stop(); setTimeout(start, 8000); });
        start();
      });
    })();

    // Cost anchors count up from zero. The markup already holds the final figure.
    (function () {
      var els = document.querySelectorAll('[data-count]');
      if (!els.length || reduce || !('IntersectionObserver' in window)) return;
      els.forEach(function (el) { el.textContent = '0'; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          var el = e.target, target = parseInt(el.getAttribute('data-count'), 10) || 0, t0 = null, dur = 900, done = false;
          function land() { done = true; el.textContent = target; }
          function step(t) {
            if (done) return;
            if (t0 === null) t0 = t;
            var k = Math.min((t - t0) / dur, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(step); else land();
          }
          requestAnimationFrame(step);
          setTimeout(function () { if (!done) land(); }, dur + 250);
        });
      }, { threshold: 0.6 });
      els.forEach(function (el) { io.observe(el); });
    })();

    // Urgency line (off by default in config): removes itself once its real deadline passes.
    document.querySelectorAll('[data-ends]').forEach(function (el) {
      var t = Date.parse(el.getAttribute('data-ends'));
      if (!isNaN(t) && Date.now() > t) el.remove();
    });

    // iOS only fires :active on elements it considers tappable; this makes the CTA press land.
    document.addEventListener('touchstart', function () {}, { passive: true });
