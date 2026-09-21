// =========================================================
// Portfolio — Circuit theme
//   1. フェードイン（IntersectionObserver）
//   2. 「詳細を見る」で details を開く
//   3. ナビの現在位置
//   4. ヒーローの数字カウントアップ
// =========================================================
(function () {
  "use strict";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- 1. フェードイン ----------
  const targets = document.querySelectorAll(".fade-in, .section__title, .card");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add("is-visible"));
  }
  // スキルチップの順次表示用に、何番目かを CSS 変数で渡す
  document.querySelectorAll(".skill-list").forEach((list) => {
    list.querySelectorAll(".skill").forEach((chip, i) => chip.style.setProperty("--i", i));
  });

  // ---------- 2. 詳細を開く ----------
  function openFromHash() {
    const t = location.hash && document.querySelector(location.hash);
    if (t && t.tagName === "DETAILS") t.open = true;
  }
  openFromHash();
  addEventListener("hashchange", openFromHash);

  // ---------- 3. ナビの現在位置 ----------
  const links = document.querySelectorAll(".nav a[href^='#']");
  const sections = Array.from(links).map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    const nio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute("href") === "#" + e.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-56px 0px -60% 0px" });
    sections.forEach((s) => nio.observe(s));
  }

  // ---------- 4. 数字カウントアップ ----------
  if (!reduceMotion) {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count), suffix = el.dataset.suffix || "";
      const t0 = performance.now(), dur = 1200;
      (function tick(now) {
        const p = Math.min(1, (now - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }
})();
