/* =========================================================
   ASSISTÊNCIA TÉCNICA
   SCRIPT.JS — V2
   WhatsApp + FAQ + Google Sheets + Analytics + Meta Pixel
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     CONFIGURAÇÕES
     ========================================================= */

  const CONFIG = {
    whatsapp: "",
    instagram: "",
    facebook: "",
    companyName: "Assistência Técnica",
  };

  /* =========================================================
     FUNÇÕES AUXILIARES
     ========================================================= */

  function onlyNumbers(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function getWhatsAppNumber() {
    /*
     * Prioridade:
     * 1. CONFIG.whatsapp
     * 2. window.WHATSAPP_NUMBER
     * 3. data-whatsapp no body
     * 4. localStorage
     */

    const values = [
      CONFIG.whatsapp,
      window.WHATSAPP_NUMBER,
      document.body?.dataset?.whatsapp,
      localStorage.getItem("whatsappNumber"),
    ];

    for (const value of values) {
      const number = onlyNumbers(value);

      if (number.length >= 10) {
        return number;
      }
    }

    return "";
  }

  function createWhatsAppURL(message) {
    const number = getWhatsAppNumber();

    if (!number) {
      console.warn("Número do WhatsApp não configurado.");
      return "";
    }

    const defaultMessage =
      "Olá! Gostaria de informações sobre a assistência técnica para meu aparelho.";

    const finalMessage = message || defaultMessage;

    return `https://wa.me/${number}?text=${encodeURIComponent(
      finalMessage
    )}`;
  }

  function openWhatsApp(message) {
    const url = createWhatsAppURL(message);

    if (!url) {
      alert(
        "O WhatsApp ainda não foi configurado. Entre em contato com o administrador do site."
      );

      return false;
    }

    window.open(url, "_blank", "noopener,noreferrer");

    return true;
  }

  /* =========================================================
     RASTREAMENTO
     ========================================================= */

  function trackEvent(eventName, parameters = {}) {
    try {
      /*
       * Google Analytics
       */

      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, parameters);
      }

      /*
       * Meta Pixel
       */

      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", eventName, parameters);
      }

      console.log("Evento:", eventName, parameters);
    } catch (error) {
      console.warn("Erro ao registrar evento:", error);
    }
  }

  /* =========================================================
     WHATSAPP — BOTÕES
     ========================================================= */

  document
    .querySelectorAll(
      '[data-whatsapp], [data-whatsapp-message], .whatsapp-button, .whatsapp-float'
    )
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        const customMessage =
          button.getAttribute("data-whatsapp-message") ||
          button.getAttribute("data-whatsapp") ||
          "";

        /*
         * Se o elemento já for um link wa.me,
         * não precisamos abrir novamente.
         */

        const href = button.getAttribute("href");

        if (href && href.includes("wa.me")) {
          trackEvent("whatsapp_click", {
            source: "website",
            button_text: button.innerText.trim(),
          });

          return;
        }

        event.preventDefault();

        trackEvent("whatsapp_click", {
          source: "website",
          button_text: button.innerText.trim(),
        });

        openWhatsApp(customMessage);
      });
    });

  /* =========================================================
     SERVIÇOS
     ========================================================= */

  document.querySelectorAll("[data-service]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      const service =
        element.getAttribute("data-service") ||
        "assistência técnica";

      const message =
        `Olá! Gostaria de informações sobre ${service}. ` +
        `Meu aparelho está apresentando um problema e gostaria de saber como funciona o atendimento.`;

      trackEvent("service_whatsapp_click", {
        service: service,
      });

      openWhatsApp(message);
    });
  });

  /* =========================================================
     FAQ
     ========================================================= */

  const faqItems = document.querySelectorAll(
    ".faq-item, [data-faq]"
  );

  faqItems.forEach((item) => {
    const question =
      item.querySelector(
        ".faq-question, [data-faq-question], .faq-header"
      );

    const answer =
      item.querySelector(
        ".faq-answer, [data-faq-answer], .faq-content"
      );

    if (!question || !answer) {
      return;
    }

    /*
     * Estado inicial
     */

    answer.hidden = true;

    question.setAttribute("role", "button");
    question.setAttribute("tabindex", "0");
    question.setAttribute("aria-expanded", "false");

    function toggleFAQ() {
      const isOpen =
        item.classList.contains("active") ||
        item.classList.contains("is-open");

      /*
       * Fecha os outros FAQs
       */

      faqItems.forEach((otherItem) => {
        if (otherItem === item) {
          return;
        }

        otherItem.classList.remove("active");
        otherItem.classList.remove("is-open");

        const otherAnswer =
          otherItem.querySelector(
            ".faq-answer, [data-faq-answer], .faq-content"
          );

        const otherQuestion =
          otherItem.querySelector(
            ".faq-question, [data-faq-question], .faq-header"
          );

        if (otherAnswer) {
          otherAnswer.hidden = true;
        }

        if (otherQuestion) {
          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      });

      /*
       * Abre / fecha o atual
       */

      if (isOpen) {
        item.classList.remove("active");
        item.classList.remove("is-open");

        answer.hidden = true;

        question.setAttribute(
          "aria-expanded",
          "false"
        );
      } else {
        item.classList.add("active");
        item.classList.add("is-open");

        answer.hidden = false;

        question.setAttribute(
          "aria-expanded",
          "true"
        );

        trackEvent("faq_open", {
          question: question.innerText.trim(),
        });
      }
    }

    question.addEventListener("click", toggleFAQ);

    question.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        toggleFAQ();
      }
    });
  });

  /* =========================================================
     LINKS COM DATA-TRACK
     ========================================================= */

  document
    .querySelectorAll("[data-track]")
    .forEach((element) => {
      element.addEventListener("click", () => {
        const eventName =
          element.getAttribute("data-track");

        if (!eventName) {
          return;
        }

        trackEvent(eventName, {
          source: "website",
          button_text: element.innerText.trim(),
        });
      });
    });

  /* =========================================================
     LINKS SOCIAIS
     ========================================================= */

  document
    .querySelectorAll("[data-social]")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const social =
          link.getAttribute("data-social");

        trackEvent("social_click", {
          network: social,
        });
      });
    });

  /* =========================================================
     CTA PRINCIPAL
     ========================================================= */

  document
    .querySelectorAll(
      ".hero .btn-primary, .hero .cta-primary"
    )
    .forEach((button) => {
      button.addEventListener("click", () => {
        trackEvent("hero_cta_click", {
          source: "hero",
        });
      });
    });

  /* =========================================================
     CTA FINAL
     ========================================================= */

  document
    .querySelectorAll(
      ".final-cta a, .cta-section a, #contato a"
    )
    .forEach((button) => {
      button.addEventListener("click", () => {
        trackEvent("final_cta_click", {
          source: "final_cta",
        });
      });
    });

  /* =========================================================
     SCROLL — EVENTO DE ENGAJAMENTO
     ========================================================= */

  let scroll25 = false;
  let scroll50 = false;
  let scroll75 = false;

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        return;
      }

      const percentage =
        (scrollTop / documentHeight) * 100;

      if (percentage >= 25 && !scroll25) {
        scroll25 = true;

        trackEvent("scroll_25", {
          percentage: 25,
        });
      }

      if (percentage >= 50 && !scroll50) {
        scroll50 = true;

        trackEvent("scroll_50", {
          percentage: 50,
        });
      }

      if (percentage >= 75 && !scroll75) {
        scroll75 = true;

        trackEvent("scroll_75", {
          percentage: 75,
        });
      }
    },
    {
      passive: true,
    }
  );

  /* =========================================================
     LINKS EXTERNOS
     ========================================================= */

  document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {
      link.setAttribute("rel", "noopener noreferrer");
    });

  /* =========================================================
     API GLOBAL
     ========================================================= */

  window.AssistenciaTecnica = {
    openWhatsApp,
    createWhatsAppURL,
    trackEvent,
    getWhatsAppNumber,
  };

  /* =========================================================
     INICIALIZAÇÃO
     ========================================================= */

  console.log(
    `${CONFIG.companyName} — sistema inicializado.`
  );
});
