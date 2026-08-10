/* =====================================
   0. URL DO APP DA PLANILHA (GOOGLE APPS SCRIPT)
===================================== */
const APP_URL = "https://script.google.com/macros/s/AKfycbxgJkhJw1aUD6bFWxv8xqrhE5udnKqWUfGAUXJKnasMlG21DyfBbh8uhlHS4XjQeluyXQ/exec";

/* =====================================
   1. CONFIGURAÇÃO PADRÃO (usada enquanto a planilha
      carrega, e se ela falhar, pro site nunca ficar quebrado)
===================================== */
const CONFIG_PADRAO = {
  whatsapp: "5511972608991",
  instagram: "#",
  facebook: "#",
  pixel_id: "",
  google_id: ""
};

/* =====================================
   2. LINKS (WHATSAPP / INSTAGRAM / FACEBOOK)
      Aplica de imediato com o padrão, e de novo
      quando a planilha responder (por isso é função)
===================================== */
function aplicarLinks(config) {
  const numWhatsApp = config.whatsapp ? config.whatsapp.replace(/\D/g, "") : "";
  if (numWhatsApp) {
    const linkWhatsApp = `https://wa.me/${numWhatsApp}`;
    document.querySelectorAll(".js-wa-link").forEach(btn => {
      btn.href = linkWhatsApp;
      btn.target = "_blank";
    });
  }

  if (config.instagram && config.instagram !== "#") {
    document.querySelectorAll(".js-insta-link").forEach(btn => {
      btn.href = config.instagram;
      btn.target = "_blank";
    });
  }

  if (config.facebook && config.facebook !== "#") {
    document.querySelectorAll(".js-face-link").forEach(btn => {
      btn.href = config.facebook;
      btn.target = "_blank";
    });
  }

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
}

function rodarQuandoPronto(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

/* Aplica o padrão imediatamente para o botão do WhatsApp nunca ficar sem link */
rodarQuandoPronto(() => aplicarLinks(CONFIG_PADRAO));

/* =====================================
   3. BUSCA A CONFIGURAÇÃO REAL NA PLANILHA
===================================== */
fetch(APP_URL)
  .then(res => res.json())
  .then(dados => iniciar(Object.assign({}, CONFIG_PADRAO, dados)))
  .catch(() => { /* mantém o padrão que já foi aplicado acima */ });

function iniciar(config) {

  rodarQuandoPronto(() => aplicarLinks(config));

  /* ---------- META PIXEL ---------- */
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

  /* ---------- GOOGLE TAG (GA4 / ADS) ---------- */
  if (config.google_id) {
    const gScript = document.createElement("script");
    gScript.async = true;
    gScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.google_id}`;
    document.head.appendChild(gScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', config.google_id);
  }
}

/* =====================================
   4. EVENTOS DE CONVERSÃO NO CLIQUE DO WHATSAPP
===================================== */
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
      (não depende da planilha, já pode rodar direto)
===================================== */
rodarQuandoPronto(() => {
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      document.querySelectorAll(".faq-item").forEach(outro => {
        if (outro !== item) outro.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
});
