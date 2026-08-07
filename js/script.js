/* =================================
   SCRIPT.JS
   LANDING PAGE ASSISTÊNCIA TÉCNICA TV BOX / BTV
================================= */


/* ===============================
   ROLAGEM SUAVE
================================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const destinoId = this.getAttribute("href");

        if (destinoId.length <= 1) return;

        const destino = document.querySelector(destinoId);

        if (destino) {
            e.preventDefault();
            destino.scrollIntoView({ behavior: "smooth" });
        }

    });

});


/* ===============================
   HEADER NO SCROLL
================================= */

const header = document.getElementById("main-header");

if (header) {

    const alternarHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", alternarHeader);
    alternarHeader();

}


/* ===============================
   FAQ - ACCORDION
================================= */

document.querySelectorAll(".faq-item").forEach(item => {

    const pergunta = item.querySelector(".faq-question");

    if (!pergunta) return;

    pergunta.addEventListener("click", () => {

        const jaAberto = item.classList.contains("active");

        document.querySelectorAll(".faq-item.active").forEach(outro => {
            if (outro !== item) outro.classList.remove("active");
        });

        item.classList.toggle("active", !jaAberto);

    });

});


/* ===============================
   ANIMAÇÃO AO APARECER
================================= */

if ("IntersectionObserver" in window) {

    document.body.classList.add("js-anim");

    const elementos = document.querySelectorAll(
        ".benefit-card, .service-card, .testimonial-card, .step-item, .trust-item"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    elementos.forEach(el => observer.observe(el));

}


/* ===============================
   ANO AUTOMÁTICO NO RODAPÉ
================================= */

const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}
