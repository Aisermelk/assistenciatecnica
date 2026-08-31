```javascript
/* =========================================================
   ASSISTÊNCIA TÉCNICA
   SCRIPT.JS — V4
   =========================================================
   Funções próprias do site.

   CONFIGURAÇÕES ADMINISTRATIVAS:
   São fornecidas pelo V8 Loader / V8 Admin Universal.

   NÃO utiliza:
   - Google Sheets
   - Google Apps Script
   - localStorage para configurações
   - admin.html próprio
   - banco de dados próprio

   O V8 Loader é responsável por:
   - WhatsApp
   - Instagram
   - Facebook
   - TikTok
   - YouTube
   - LinkedIn
   - Meta Pixel
   - Google Analytics
   - Google Tag Manager
   - SEO
   - Formspree
   - demais configurações do projeto
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       CONFIGURAÇÕES BÁSICAS DO SITE
       ========================================================= */

    const CONFIG = {
        companyName: "Assistência Técnica"
    };


    /* =========================================================
       FUNÇÕES AUXILIARES
       ========================================================= */

    function onlyNumbers(value) {
        return String(value || "").replace(/\D/g, "");
    }


    /* =========================================================
       OBTÉM CONFIGURAÇÃO DO V8 ADMIN
       ========================================================= */

    function getV8Config() {
        return window.V8_CONFIG || {};
    }


    /* =========================================================
       OBTÉM NÚMERO DO WHATSAPP
       =========================================================
       Prioridade:

       1. V8_CONFIG.contact.whatsapp
       2. V8_CONFIG.whatsapp
       3. window.WHATSAPP_NUMBER
       4. data-whatsapp no body

       Não utiliza localStorage.
       ========================================================= */

    function getWhatsAppNumber() {

        const v8Config = getV8Config();

        const values = [

            v8Config?.contact?.whatsapp,

            v8Config?.whatsapp,

            window.WHATSAPP_NUMBER,

            document.body?.dataset?.whatsapp

        ];

        for (const value of values) {

            const number = onlyNumbers(value);

            if (number.length >= 10) {
                return number;
            }
        }

        return "";
    }


    /* =========================================================
       CRIA URL DO WHATSAPP
       ========================================================= */

    function createWhatsAppURL(message) {

        const number = getWhatsAppNumber();

        if (!number) {

            console.warn(
                "V8 Admin Universal: número do WhatsApp não configurado."
            );

            return "";
        }

        const defaultMessage =
            "Olá! Gostaria de informações sobre a assistência técnica para meu aparelho.";

        const finalMessage =
            message || defaultMessage;

        return (
            `https://wa.me/${number}` +
            `?text=${encodeURIComponent(finalMessage)}`
        );
    }


    /* =========================================================
       ABRE WHATSAPP
       ========================================================= */

    function openWhatsApp(message) {

        const url = createWhatsAppURL(message);

        if (!url) {

            alert(
                "O WhatsApp ainda não foi configurado. " +
                "Entre em contato com o administrador do site."
            );

            return false;
        }

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

        return true;
    }


    /* =========================================================
       RASTREAMENTO
       =========================================================
       O carregamento do Google Analytics e Meta Pixel
       é responsabilidade do V8 Loader.

       Este arquivo apenas dispara os eventos.
       ========================================================= */

    function trackEvent(
        eventName,
        parameters = {}
    ) {

        try {

            /* ---------------------------------------------
               GOOGLE ANALYTICS
               --------------------------------------------- */

            if (
                typeof window.gtag === "function"
            ) {

                window.gtag(
                    "event",
                    eventName,
                    parameters
                );
            }


            /* ---------------------------------------------
               META PIXEL
               --------------------------------------------- */

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
    }


    /* =========================================================
       WHATSAPP — BOTÕES
       ========================================================= */

    document
        .querySelectorAll(
            [
                "[data-whatsapp]",
                "[data-whatsapp-message]",
                ".whatsapp-button",
                ".whatsapp-float",
                '[data-v8="contact.whatsapp"]'
            ].join(", ")
        )
        .forEach((button) => {

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


                    /* -----------------------------------------
                       SE O V8 LOADER JÁ CONFIGUROU O LINK
                       ----------------------------------------- */

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
                                    button.innerText.trim()
                            }
                        );

                        return;
                    }


                    /* -----------------------------------------
                       ABRIR WHATSAPP PELO SCRIPT
                       ----------------------------------------- */

                    event.preventDefault();


                    trackEvent(
                        "whatsapp_click",
                        {
                            source: "website",
                            button_text:
                                button.innerText.trim()
                        }
                    );


                    openWhatsApp(
                        customMessage
                    );
                }
            );
        });


    /* =========================================================
       SERVIÇOS
       =========================================================
       Exemplo:

       <a href="#" data-service="troca de tela">
           Troca de tela
       </a>
       ========================================================= */

    document
        .querySelectorAll(
            "[data-service]"
        )
        .forEach((element) => {

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
                        `Meu aparelho está apresentando um problema ` +
                        `e gostaria de saber como funciona o atendimento.`;


                    trackEvent(
                        "service_whatsapp_click",
                        {
                            service: service
                        }
                    );


                    openWhatsApp(
                        message
                    );
                }
            );
        });


    /* =========================================================
       FAQ
       ========================================================= */

    const faqItems =
        document.querySelectorAll(
            ".faq-item, [data-faq]"
        );


    faqItems.forEach((item) => {

        const question =
            item.querySelector(
                [
                    ".faq-question",
                    "[data-faq-question]",
                    ".faq-header"
                ].join(", ")
            );


        const answer =
            item.querySelector(
                [
                    ".faq-answer",
                    "[data-faq-answer]",
                    ".faq-content"
                ].join(", ")
            );


        if (
            !question ||
            !answer
        ) {
            return;
        }


        /* ---------------------------------------------
           ESTADO INICIAL
           --------------------------------------------- */

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


        /* ---------------------------------------------
           ABRIR / FECHAR FAQ
           --------------------------------------------- */

        function toggleFAQ() {

            const isOpen =
                item.classList.contains(
                    "active"
                ) ||
                item.classList.contains(
                    "is-open"
                );


            /* -----------------------------------------
               FECHA OUTROS FAQs
               ----------------------------------------- */

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
                            [
                                ".faq-answer",
                                "[data-faq-answer]",
                                ".faq-content"
                            ].join(", ")
                        );


                    const otherQuestion =
                        otherItem.querySelector(
                            [
                                ".faq-question",
                                "[data-faq-question]",
                                ".faq-header"
                            ].join(", ")
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


            /* -----------------------------------------
               ABRE / FECHA ATUAL
               ----------------------------------------- */

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
                            question.innerText.trim()
                    }
                );
            }
        }


        /* ---------------------------------------------
           CLIQUE
           --------------------------------------------- */

        question.addEventListener(
            "click",
            toggleFAQ
        );


        /* ---------------------------------------------
           TECLADO
           --------------------------------------------- */

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

    });


    /* =========================================================
       LINKS COM DATA-TRACK
       ========================================================= */

    document
        .querySelectorAll(
            "[data-track]"
        )
        .forEach((element) => {

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
                                element.innerText.trim()
                        }
                    );
                }
            );
        });


    /* =========================================================
       LINKS SOCIAIS
       ========================================================= */

    document
        .querySelectorAll(
            "[data-social], [data-v8^='social.']"
        )
        .forEach((link) => {

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
                            network:
                                social
                        }
                    );
                }
            );
        });


    /* =========================================================
       CTA PRINCIPAL
       ========================================================= */

    document
        .querySelectorAll(
            [
                "#hero .btn-primary",
                "#hero .cta-primary",
                ".hero .btn-primary",
                ".hero .cta-primary"
            ].join(", ")
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    trackEvent(
                        "hero_cta_click",
                        {
                            source: "hero"
                        }
                    );
                }
            );
        });


    /* =========================================================
       CTA FINAL
       ========================================================= */

    document
        .querySelectorAll(
            [
                ".final-cta a",
                ".cta-section a",
                "#contato a",
                "#cta a"
            ].join(", ")
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    trackEvent(
                        "final_cta_click",
                        {
                            source:
                                "final_cta"
                        }
                    );
                }
            );
        });


    /* =========================================================
       FORMULÁRIOS
       =========================================================
       O V8 Loader pode configurar o Formspree e o envio
       dos leads.

       Aqui apenas registramos o evento de envio.
       ========================================================= */

    document
        .querySelectorAll(
            "form"
        )
        .forEach((form) => {

            form.addEventListener(
                "submit",
                () => {

                    trackEvent(
                        "form_submit",
                        {
                            source:
                                "website"
                        }
                    );
                }
            );
        });


    /* =========================================================
       SCROLL — EVENTOS DE ENGAJAMENTO
       ========================================================= */

    let scroll25 = false;
    let scroll50 = false;
    let scroll75 = false;


    window.addEventListener(
        "scroll",
        () => {

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
                (
                    scrollTop /
                    documentHeight
                ) *
                100;


            /* -----------------------------------------
               25%
               ----------------------------------------- */

            if (
                percentage >= 25 &&
                !scroll25
            ) {

                scroll25 = true;


                trackEvent(
                    "scroll_25",
                    {
                        percentage: 25
                    }
                );
            }


            /* -----------------------------------------
               50%
               ----------------------------------------- */

            if (
                percentage >= 50 &&
                !scroll50
            ) {

                scroll50 = true;


                trackEvent(
                    "scroll_50",
                    {
                        percentage: 50
                    }
                );
            }


            /* -----------------------------------------
               75%
               ----------------------------------------- */

            if (
                percentage >= 75 &&
                !scroll75
            ) {

                scroll75 = true;


                trackEvent(
                    "scroll_75",
                    {
                        percentage: 75
                    }
                );
            }

        },
        {
            passive: true
        }
    );


    /* =========================================================
       LINKS EXTERNOS
       ========================================================= */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach((link) => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );
        });


    /* =========================================================
       API GLOBAL DO SITE
       ========================================================= */

    window.AssistenciaTecnica = {

        openWhatsApp,

        createWhatsAppURL,

        trackEvent,

        getWhatsAppNumber,

        getV8Config

    };


    /* =========================================================
       INICIALIZAÇÃO
       ========================================================= */

    console.log(
        `${CONFIG.companyName} — sistema V4 inicializado.`
    );

});
```
