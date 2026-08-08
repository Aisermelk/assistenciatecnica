/* =====================================
   TRACKING.JS
   Carrega o Meta Pixel e o Google Tag (GA4)
   usando os IDs salvos no Painel de Conteúdo
   (content/site-content.json -> tracking)
===================================== */

(function () {

    fetch("content/site-content.json", { cache: "no-store" })
        .then(function (res) { return res.json(); })
        .then(function (content) {

            const tracking = content.tracking || {};

            const pixelId = (tracking.meta_pixel_id || "").trim();
            const ga4Id = (tracking.ga4_id || "").trim();

            if (pixelId) {
                carregarMetaPixel(pixelId);
            }

            if (ga4Id) {
                carregarGoogleTag(ga4Id);
            }

        })
        .catch(function () {
            /* Se o content.json não carregar, o site continua funcionando normalmente */
        });


    /* ===============================
       META PIXEL (Facebook/Instagram Ads)
    ================================= */

    function carregarMetaPixel(pixelId) {

        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = true;
            n.version = "2.0";
            n.queue = [];
            t = b.createElement(e);
            t.async = true;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

        fbq("init", pixelId);
        fbq("track", "PageView");

        document.addEventListener("click", function (e) {
            const botao = e.target.closest(".btn-primary, .btn-whatsapp-header, .whatsapp-float");
            if (botao && typeof fbq === "function") {
                fbq("track", "Contact");
            }
        });

        document.addEventListener("submit", function (e) {
            if (e.target.id === "lead-form-fields" && typeof fbq === "function") {
                fbq("track", "Lead");
            }
        });

    }


    /* ===============================
       GOOGLE TAG (GA4)
    ================================= */

    function carregarGoogleTag(ga4Id) {

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + ga4Id;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;

        gtag("js", new Date());
        gtag("config", ga4Id);

        document.addEventListener("click", function (e) {
            const botao = e.target.closest(".btn-primary, .btn-whatsapp-header, .whatsapp-float");
            if (botao) {
                gtag("event", "contact_click");
            }
        });

        document.addEventListener("submit", function (e) {
            if (e.target.id === "lead-form-fields") {
                gtag("event", "generate_lead");
            }
        });

    }

})();
