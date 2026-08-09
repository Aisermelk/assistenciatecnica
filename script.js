/* =====================================
   1. CARREGAMENTO DE CONFIGURAÇÕES (ADMIN)
===================================== */
const CONFIG_PADRAO = {
  whatsapp: "5511972608991",
  instagram: "#",
  facebook: "#",
  pixel_id: "",
  google_id: ""
};

function obterConfig() {
  const salva = localStorage.getItem("site_config");
  return salva ? JSON.parse(salva) : CONFIG_PADRAO;
}

const config = obterConfig();

/* =====================================
   2. INJEÇÃO DO META PIXEL
===================================== */
if (config.pixel_id) {
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  fbq("init", config.pixel_id);
  fbq("track", "PageView");
}

/* =====================================
   3. INJEÇÃO DA GOOGLE TAG (GA4 / ADS)
===================================== */
if (config.google_id) {
  const gScript = document.createElement("script");
  gScript.async = true;
  gScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.google_id}`;
  document.head.appendChild(gScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', config.google_id);
}

/* =====================================
   4. ATUALIZAÇÃO DOS LINKS E EVENTOS
===================================== */
document.addEventListener("DOMContentLoaded", () => {
  // WhatsApp
  const numWhatsApp = config.whatsapp ? config.whatsapp.replace(/\D/g, "") : "";
  if (numWhatsApp) {
    const linkWhatsApp = `https://wa.me/${numWhatsApp}`;
    document.querySelectorAll(".js-wa-link").forEach(btn => {
      btn.href = linkWhatsApp;
      btn.target = "_blank";
    });
  }

  // Instagram
  if (config.instagram) {
    document.querySelectorAll(".js-insta-link").forEach(btn => {
      btn.href = config.instagram;
      btn.target = "_blank";
    });
  }

  // Facebook
  if (config.facebook) {
    document.querySelectorAll(".js-face-link").forEach(btn => {
      btn.href = config.facebook;
      btn.target = "_blank";
    });
  }

  // Ano Atual
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
});

// Dispara eventos de conversão ao clicar nos botões do WhatsApp
document.addEventListener("click", (e) => {
  if (e.target.closest(".js-wa-link")) {
    if (typeof fbq === "function") fbq("track", "Contact");
    if (typeof gtag === "function") {
      gtag("event", "generate_lead", {
        event_category: "engagement",
        event_label: "WhatsApp Click"
      });
    }
  }
});

/* =====================================
   5. ACORDEÃO DO FAQ (PERGUNTAS FREQUENTES)
===================================== */
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    document.querySelectorAll(".faq-item").forEach(outro => {
      if (outro !== item) outro.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});