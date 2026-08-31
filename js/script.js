/* =========================================================
ASSISTÊNCIA TÉCNICA
SCRIPT.JS — V3
Funções próprias do site
Integração centralizada pelo V8 Loader
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
"use strict";

/* =========================================================
CONFIGURAÇÕES BÁSICAS
========================================================= */

const CONFIG = {
companyName: "Assistência Técnica",
};

/* =========================================================
FUNÇÕES AUXILIARES
========================================================= */

function onlyNumbers(value) {
return String(value || "").replace(/\D/g, "");
}

/*

* O WhatsApp é fornecido preferencialmente pelo
* V8 Loader / V8 Admin Universal.
*
* Mantemos algumas possibilidades de leitura para
* compatibilidade, sem criar uma configuração própria
* de administração.
  */

function getWhatsAppNumber() {
const values = [
window.V8_CONFIG?.contact?.whatsapp,
window.V8_CONFIG?.whatsapp,
window.WHATSAPP_NUMBER,
document.body?.dataset?.whatsapp,
];

```
for (const value of values) {
  const number = onlyNumbers(value);

  if (number.length >= 10) {
    return number;
  }
}

return "";
```

}

function createWhatsAppURL(message) {
const number = getWhatsAppNumber();

```
if (!number) {
  console.warn(
    "Número do WhatsApp não configurado no V8 Admin Universal."
  );

  return "";
}

const defaultMessage =
  "Olá! Gostaria de informações sobre a assistência técnica para meu aparelho.";

const finalMessage =
  message || defaultMessage;

return `https://wa.me/${number}?text=${encodeURIComponent(
  finalMessage
)}`;
```

}

function openWhatsApp(message) {
const url = createWhatsAppURL(message);

```
if (!url) {
  alert(
    "O WhatsApp ainda não foi configurado. Entre em contato com o administrador do site."
  );

  return false;
}

window.open(
  url,
  "_blank",
  "noopener,noreferrer"
);

return true;
```

}

/* =========================================================
RASTREAMENTO
========================================================= */

function trackEvent(
eventName,
parameters = {}
) {
try {

```
  /*
   * Google Analytics
   *
   * O carregamento/configuração do Analytics
   * fica sob responsabilidade do V8 Loader.
   */

  if (
    typeof window.gtag === "function"
  ) {
    window.gtag(
      "event",
      eventName,
      parameters
    );
  }

  /*
   * Meta Pixel
   *
   * O carregamento/configuração do Pixel
   * fica sob responsabilidade do V8 Loader.
   */

  if (
    typeof window.fbq === "function"
  ) {
    window.fbq(
      "trackCustom",
      eventName,
      parameters
    );
  }

  console.log(
    "Evento:",
    eventName,
    parameters
  );

} catch (error) {

  console.warn(
    "Erro ao registrar evento:",
    error
  );

}
```

}

/* =========================================================
WHATSAPP — BOTÕES
========================================================= */

document
.querySelectorAll(
'[data-whatsapp], [data-whatsapp-message], .whatsapp-button, .whatsapp-float, [data-v8="contact.whatsapp"]'
)
.forEach((button) => {

```
  button.addEventListener(
    "click",
    (event) => {

      const customMessage =
        button.getAttribute(
          "data-whatsapp-message"
        ) ||
        button.getAttribute(
          "data-whatsapp"
        ) ||
        "";

      /*
       * Se o V8 Loader já transformou o link
       * em uma URL do WhatsApp, não abrimos
       * novamente.
       */

      const href =
        button.getAttribute("href");

      if (
        href &&
        href.includes("wa.me")
      ) {

        trackEvent(
          "whatsapp_click",
          {
            source: "website",
            button_text:
              button.innerText.trim(),
          }
        );

        return;
      }

      event.preventDefault();

      trackEvent(
        "whatsapp_click",
        {
          source: "website",
          button_text:
            button.innerText.trim(),
        }
      );

      openWhatsApp(
        customMessage
      );
    }
  );
});
```

/* =========================================================
SERVIÇOS
========================================================= */

document
.querySelectorAll("[data-service]")
.forEach((element) => {

```
  element.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      const service =
        element.getAttribute(
          "data-service"
        ) ||
        "assistência técnica";

      const message =
        `Olá! Gostaria de informações sobre ${service}. ` +
        `Meu aparelho está apresentando um problema e gostaria de saber como funciona o atendimento.`;

      trackEvent(
        "service_whatsapp_click",
        {
          service: service,
        }
      );

      openWhatsApp(
        message
      );
    }
  );
});
```

/* =========================================================
FAQ
========================================================= */

const faqItems =
document.querySelectorAll(
".faq-item, [data-faq]"
);

faqItems.forEach((item) => {

```
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

question.setAttribute(
  "role",
  "button"
);

question.setAttribute(
  "tabindex",
  "0"
);

question.setAttribute(
  "aria-expanded",
  "false"
);

function toggleFAQ() {

  const isOpen =
    item.classList.contains(
      "active"
    ) ||
    item.classList.contains(
      "is-open"
    );

  /*
   * Fecha os outros FAQs
   */

  faqItems.forEach(
    (otherItem) => {

      if (
        otherItem === item
      ) {
        return;
      }

      otherItem.classList.remove(
        "active"
      );

      otherItem.classList.remove(
        "is-open"
      );

      const otherAnswer =
        otherItem.querySelector(
          ".faq-answer, [data-faq-answer], .faq-content"
        );

      const otherQuestion =
        otherItem.querySelector(
          ".faq-question, [data-faq-question], .faq-header"
        );

      if (otherAnswer) {
        otherAnswer.hidden =
          true;
      }

      if (otherQuestion) {
        otherQuestion.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    }
  );

  /*
   * Abre / fecha o atual
   */

  if (isOpen) {

    item.classList.remove(
      "active"
    );

    item.classList.remove(
      "is-open"
    );

    answer.hidden = true;

    question.setAttribute(
      "aria-expanded",
      "false"
    );

  } else {

    item.classList.add(
      "active"
    );

    item.classList.add(
      "is-open"
    );

    answer.hidden = false;

    question.setAttribute(
      "aria-expanded",
      "true"
    );

    trackEvent(
      "faq_open",
      {
        question:
          question.innerText.trim(),
      }
    );
  }
}

question.addEventListener(
  "click",
  toggleFAQ
);

question.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      toggleFAQ();
    }
  }
);
```

});

/* =========================================================
LINKS COM DATA-TRACK
========================================================= */

document
.querySelectorAll("[data-track]")
.forEach((element) => {

```
  element.addEventListener(
    "click",
    () => {

      const eventName =
        element.getAttribute(
          "data-track"
        );

      if (!eventName) {
        return;
      }

      trackEvent(
        eventName,
        {
          source: "website",
          button_text:
            element.innerText.trim(),
        }
      );
    }
  );
});
```

/* =========================================================
LINKS SOCIAIS
========================================================= */

document
.querySelectorAll(
"[data-social], [data-v8^='social.']"
)
.forEach((link) => {

```
  link.addEventListener(
    "click",
    () => {

      const social =
        link.getAttribute(
          "data-social"
        ) ||
        link.getAttribute(
          "data-v8"
        );

      trackEvent(
        "social_click",
        {
          network: social,
        }
      );
    }
  );
});
```

/* =========================================================
CTA PRINCIPAL
========================================================= */

document
.querySelectorAll(
"#hero .btn-primary, #hero .cta-primary"
)
.forEach((button) => {

```
  button.addEventListener(
    "click",
    () => {

      trackEvent(
        "hero_cta_click",
        {
          source: "hero",
        }
      );
    }
  );
});
```

/* =========================================================
CTA FINAL
========================================================= */

document
.querySelectorAll(
".final-cta a, .cta-section a, #contato a, #cta a"
)
.forEach((button) => {

```
  button.addEventListener(
    "click",
    () => {

      trackEvent(
        "final_cta_click",
        {
          source: "final_cta",
        }
      );
    }
  );
});
```

/* =========================================================
SCROLL — EVENTOS DE ENGAJAMENTO
========================================================= */

let scroll25 = false;
let scroll50 = false;
let scroll75 = false;

window.addEventListener(
"scroll",
() => {

```
  const scrollTop =
    window.scrollY;

  const documentHeight =
    document.documentElement
      .scrollHeight -
    window.innerHeight;

  if (
    documentHeight <= 0
  ) {
    return;
  }

  const percentage =
    (scrollTop /
      documentHeight) *
    100;

  if (
    percentage >= 25 &&
    !scroll25
  ) {

    scroll25 = true;

    trackEvent(
      "scroll_25",
      {
        percentage: 25,
      }
    );
  }

  if (
    percentage >= 50 &&
    !scroll50
  ) {

    scroll50 = true;

    trackEvent(
      "scroll_50",
      {
        percentage: 50,
      }
    );
  }

  if (
    percentage >= 75 &&
    !scroll75
  ) {

    scroll75 = true;

    trackEvent(
      "scroll_75",
      {
        percentage: 75,
      }
    );
  }

},
{
  passive: true,
}
```

);

/* =========================================================
LINKS EXTERNOS
========================================================= */

document
.querySelectorAll(
'a[target="_blank"]'
)
.forEach((link) => {

```
  link.setAttribute(
    "rel",
    "noopener noreferrer"
  );

});
```

/* =========================================================
API GLOBAL DO SITE
========================================================= */

window.AssistenciaTecnica = {

```
openWhatsApp,

createWhatsAppURL,

trackEvent,

getWhatsAppNumber,
```

};

/* =========================================================
INICIALIZAÇÃO
========================================================= */

console.log(
`${CONFIG.companyName} — sistema inicializado.`
);

});
