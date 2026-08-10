/* =====================================
   CONFIGURAÇÃO DA API (PLANILHA DO GOOGLE)
===================================== */
const API_URL = "https://script.google.com/macros/s/AKfycbxgJkhJw1aUD6bFWxv8xqrhE5udnKqWUfGAUXJKnasMlG21DyfBbh8uhlHS4XjQeluyXQ/exec";

const CONFIG_PADRAO = {
  whatsapp: "5511972608991",
  instagram: "#",
  facebook: "#",
  pixel_id: "",
  google_id: ""
};

// Busca os dados diretamente da Planilha do Google
async function carregarConfiguracoes() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return {
      whatsapp: data.whatsapp || CONFIG_PADRAO.whatsapp,
      instagram: data.instagram || CONFIG_PADRAO.instagram,
      facebook: data.facebook || CONFIG_PADRAO.facebook,
      pixel_id: data.pixel_id || CONFIG_PADRAO.pixel_id,
      google_id: data.google_id || CONFIG_PADRAO.google_id
    };
  } catch (error) {
    console.warn("Erro ao buscar dados da planilha, usando padrão.", error);
    return CONFIG_PADRAO;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const config = await carregarConfiguracoes();

  // Injeção do Meta Pixel
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

  // Injeção da Google Tag (GA4 / Ads)
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

  // Atualização dos Links do WhatsApp
  const numWhatsApp = config.whatsapp ? String(config.whatsapp).replace(/\D/g, "") : "";
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

// Acordeão do FAQ
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    document.querySelectorAll(".faq-item").forEach(outro => {
      if (outro !== item) outro.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});
