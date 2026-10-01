/* OUI.E Photography — interacties */
(function () {
  "use strict";

  // Header krijgt achtergrond na scrollen
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobiele navigatie
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Zacht verschijnen bij scrollen
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Lightbox — bladert door alle foto's van de galerij
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCount = lb.querySelector(".lb-count");
    var set = [], idx = 0, lastFocus = null;

    function show() {
      var img = set[idx];
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCount.textContent = (idx + 1) + " / " + set.length;
    }
    function open(imgs, i) {
      set = imgs; idx = i; lastFocus = document.activeElement;
      show();
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      lb.querySelector(".lb-close").focus();
    }
    function close() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      if (lastFocus) lastFocus.focus();
    }
    function step(d) { idx = (idx + d + set.length) % set.length; show(); }

    document.querySelectorAll("[data-lightbox]").forEach(function (t) {
      var imgs = Array.prototype.slice.call(t.querySelectorAll("img"));
      t.querySelectorAll("figure").forEach(function (fig, i) {
        fig.tabIndex = 0;
        fig.setAttribute("role", "button");
        fig.setAttribute("aria-label", "Vergroot foto " + (i + 1) + " van " + imgs.length);
        fig.addEventListener("click", function () { open(imgs, i); });
        fig.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(imgs, i); }
        });
      });
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
  }

  // Dienst voorselecteren via ?dienst=portraits
  var params = new URLSearchParams(window.location.search);
  var pre = params.get("dienst");
  if (pre) {
    var radio = document.querySelector('input[name="dienst"][value="' + pre + '"]');
    if (radio) radio.checked = true;
  }

  // Contactformulier — opent de mailapp met een ingevuld bericht.
  // (Vervang later gerust door een formulierdienst zoals Formspree of Netlify Forms.)
  var form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var body =
        "Naam: " + d.get("naam") + "\n" +
        "E-mail: " + d.get("email") + "\n" +
        "Telefoon: " + (d.get("telefoon") || "-") + "\n\n" +
        "Dienst: " + d.get("dienst") + "\n" +
        "Datum: " + (d.get("datum") || "nog niet bekend") + "\n" +
        "Locatie: " + (d.get("locatie") || "-") + "\n\n" +
        d.get("verhaal");
      var subject = "Aanvraag " + d.get("dienst") + " — " + d.get("naam");
      window.location.href = "mailto:info@ouie.be?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var status = form.querySelector(".form-status");
      if (status) status.textContent = "Merci! Je mailprogramma opent met je verhaal, klaar om te versturen.";
    });
  }

  var y = document.querySelectorAll("[data-year]");
  y.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
