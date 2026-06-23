/* Language switching, mobile nav, and small UX touches. */
(function () {
  "use strict";

  var SUPPORTED = ["en", "te", "hi", "ur"];
  var RTL = ["ur"];
  var STORAGE_KEY = "kd-lang";

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "en";
    var dict = window.TRANSLATIONS[lang] || window.TRANSLATIONS.en;

    // Replace all marked text nodes.
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!dict[key]) return;
      if (el.tagName === "META") {
        el.setAttribute("content", dict[key]);
      } else if (el.tagName === "TITLE") {
        el.textContent = dict[key];
      } else {
        el.textContent = dict[key];
      }
    });

    // Update <html lang>, text direction (RTL for Urdu), and active button.
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", RTL.indexOf(lang) !== -1 ? "rtl" : "ltr");
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  // Wire up language buttons.
  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  // Decide initial language: saved → browser → English.
  var initial = "en";
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) {
      initial = saved;
    } else {
      var nav = (navigator.language || "").slice(0, 2);
      if (SUPPORTED.indexOf(nav) !== -1) initial = nav;
    }
  } catch (e) {}
  applyLang(initial);

  // Scroll-reveal: fade elements up as they enter the viewport.
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // Mobile nav toggle.
  var toggle = document.querySelector(".nav-toggle");
  var header = document.querySelector(".site-header");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close menu after clicking a link.
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
