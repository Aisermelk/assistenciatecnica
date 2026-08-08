/* =====================================
   CONTENT-LOADER.JS
   Lê content/site-content.json e preenche o site.
   Isso é o que permite editar os textos pelo
   Painel de Conteúdo (/admin) sem mexer em código.
===================================== */

(function () {

    function escapeHtml(str) {
        return String(str == null ? "" : str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    function getPath(obj, path) {
        return path.split(".").reduce(function (acc, key) {
            return acc && acc[key] !== undefined ? acc[key] : undefined;
        }, obj);
    }

    function aplicarTextos(content) {
        document.querySelectorAll("[data-cms]").forEach(function (el) {
            const valor = getPath(content, el.getAttribute("data-cms"));
            if (valor !== undefined) {
                el.textContent = valor;
            }
        });
    }

    function aplicarLinks(content) {
        document.querySelectorAll("[data-cms-href]").forEach(function (el) {
            const campo = el.getAttribute("data-cms-href");
            if (campo === "whatsapp" && content.whatsapp) {
                el.href = "https://wa.me/" + content.whatsapp.replace(/\D/g, "");
            } else if (campo === "facebook" && content.facebook) {
                el.href = content.facebook;
            }
        });
    }

    function renderLista(id, itens, templateFn) {
        const container = document.getElementById(id);
        if (!container || !Array.isArray(itens)) return;
        container.innerHTML = itens.map(templateFn).join("");
    }

    function renderListas(content) {

        renderLista("trust-bar-grid", content.trust_bar, function (item) {
            return '<div class="trust-item"><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + '</p></div>';
        });

        renderLista("benefits-grid", content.benefits && content.benefits.items, function (item) {
            return '<article class="benefit-card"><div class="icon">' + escapeHtml(item.icon) + '</div><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + '</p></article>';
        });

        renderLista("services-grid", content.services && content.services.items, function (item) {
            return '<article class="service-card"><div class="service-icon">' + escapeHtml(item.icon) + '</div><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + '</p></article>';
        });

        renderLista("steps-grid", content.steps && content.steps.items, function (item) {
            return '<div class="step-item"><div class="step-number">' + escapeHtml(item.number) + '</div><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + '</p></div>';
        });

        renderLista("testimonials-slider", content.testimonials && content.testimonials.items, function (item) {
            return '<article class="testimonial-card"><div class="stars">' + escapeHtml(item.stars) + '</div><p>' + escapeHtml(item.text) + '</p><h4>' + escapeHtml(item.name) + '</h4></article>';
        });

        renderLista("faq-container", content.faq && content.faq.items, function (item) {
            return '<div class="faq-item"><button class="faq-question">' + escapeHtml(item.question) + '</button><div class="faq-answer"><p>' + escapeHtml(item.answer) + '</p></div></div>';
        });

    }

    function reativarInteracoes() {
        /* Reaplica o accordion do FAQ e as animações,
           já que as listas acima foram reconstruídas */

        document.querySelectorAll(".faq-item").forEach(function (item) {
            const pergunta = item.querySelector(".faq-question");
            if (!pergunta) return;
            pergunta.addEventListener("click", function () {
                const jaAberto = item.classList.contains("active");
                document.querySelectorAll(".faq-item.active").forEach(function (outro) {
                    if (outro !== item) outro.classList.remove("active");
                });
                item.classList.toggle("active", !jaAberto);
            });
        });

        if ("IntersectionObserver" in window) {
            const elementos = document.querySelectorAll(
                ".benefit-card, .service-card, .testimonial-card, .step-item, .trust-item"
            );
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
            elementos.forEach(function (el) { observer.observe(el); });
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        fetch("content/site-content.json", { cache: "no-store" })
            .then(function (res) { return res.json(); })
            .then(function (content) {
                window.__siteContent = content;
                aplicarTextos(content);
                aplicarLinks(content);
                renderListas(content);
                reativarInteracoes();
            })
            .catch(function () {
                /* Se falhar, a página continua com o texto padrão já escrito no HTML */
            });
    });

})();
