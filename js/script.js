/* =========================================================
   ASSISTÊNCIA TÉCNICA
   STYLE.CSS — V5
   DESIGN PREMIUM / EDITORIAL
   Compatível com V8 Admin Universal
   ========================================================= */


/* =========================================================
   RESET
   ========================================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: "Poppins", Arial, sans-serif;
    background: #070907;
    color: #f4f5f2;
    line-height: 1.6;
    overflow-x: hidden;
}

img {
    display: block;
    max-width: 100%;
}

a {
    color: inherit;
    text-decoration: none;
}

button,
input,
textarea,
select {
    font-family: inherit;
}

button,
a {
    -webkit-tap-highlight-color: transparent;
}

:root {

    /* CORES PRINCIPAIS */

    --black: #070907;
    --black-soft: #0c0f0d;
    --black-card: #111511;

    --white: #f5f6f2;
    --white-soft: #d8ddd7;

    --gray: #a2aaa2;
    --gray-dark: #6e766e;

    --green: #9bc7a8;
    --green-light: #b8d9c1;
    --green-strong: #25d366;

    --line: rgba(255, 255, 255, 0.10);
    --line-soft: rgba(255, 255, 255, 0.06);

    --radius: 18px;

    --shadow:
        0 30px 80px rgba(0, 0, 0, 0.35);
}

.container {
    width: min(1180px, calc(100% - 48px));
    margin: 0 auto;
}


/* =========================================================
   HEADER
   ========================================================= */

header {
    position: fixed;
    z-index: 1000;

    top: 0;
    left: 0;

    width: 100%;
    height: 76px;

    background:
        rgba(7, 9, 7, 0.78);

    border-bottom:
        1px solid var(--line-soft);

    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);

    transition:
        background 0.3s ease,
        border-color 0.3s ease;
}

.header-container {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 30px;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    width: auto;
    max-width: 185px;
    max-height: 52px;

    object-fit: contain;
}


/* =========================================================
   BOTÃO WHATSAPP HEADER
   ========================================================= */

.btn-whatsapp {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-height: 44px;

    padding: 10px 19px;

    border:
        1px solid rgba(37, 211, 102, 0.30);

    border-radius: 999px;

    background:
        rgba(37, 211, 102, 0.10);

    color: #c9f5d7;

    font-size: 13px;
    font-weight: 600;

    transition:
        transform 0.25s ease,
        background 0.25s ease,
        border-color 0.25s ease;
}

.btn-whatsapp:hover {
    transform: translateY(-2px);

    background:
        rgba(37, 211, 102, 0.18);

    border-color:
        rgba(37, 211, 102, 0.50);
}


/* =========================================================
   HERO
   ========================================================= */

#hero {
    position: relative;

    min-height: 850px;

    display: flex;
    align-items: center;

    padding:
        150px 0 100px;

    overflow: hidden;

    background:
        radial-gradient(
            circle at 75% 45%,
            rgba(155, 199, 168, 0.09),
            transparent 34%
        ),
        radial-gradient(
            circle at 15% 20%,
            rgba(155, 199, 168, 0.05),
            transparent 30%
        ),
        #070907;
}

#hero::before {
    content: "";

    position: absolute;

    width: 650px;
    height: 650px;

    right: -330px;
    top: 80px;

    border-radius: 50%;

    background:
        rgba(155, 199, 168, 0.06);

    filter: blur(100px);

    pointer-events: none;
}

.hero-container {
    position: relative;
    z-index: 2;

    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        minmax(400px, 0.85fr);

    align-items: center;

    gap: 70px;
}


/* =========================================================
   HERO — TEXTO
   ========================================================= */

.hero-left {
    max-width: 680px;
}

.badge {
    display: inline-flex;

    align-items: center;

    margin-bottom: 28px;

    padding: 8px 13px;

    border:
        1px solid rgba(155, 199, 168, 0.25);

    border-radius: 999px;

    background:
        rgba(155, 199, 168, 0.06);

    color: var(--green-light);

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 1.5px;
}

.hero-left h1 {
    margin-bottom: 28px;

    font-size:
        clamp(3.5rem, 7vw, 6.8rem);

    line-height: 0.98;

    font-weight: 700;

    letter-spacing: -4px;
}

.hero-left h1 span {
    display: block;

    color: var(--green);
}

.hero-left > p {
    max-width: 590px;

    margin-bottom: 36px;

    color: var(--gray);

    font-size: 17px;

    line-height: 1.8;
}


/* =========================================================
   BOTÕES
   ========================================================= */

.hero-buttons {
    display: flex;

    align-items: center;

    flex-wrap: wrap;

    gap: 12px;

    margin-bottom: 38px;
}

.btn-primary,
.btn-secondary {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-height: 54px;

    padding: 14px 23px;

    border-radius: 999px;

    font-size: 13px;

    font-weight: 700;

    transition:
        transform 0.25s ease,
        background 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
}

.btn-primary {
    background:
        var(--green);

    color: #09100b;

    box-shadow:
        0 12px 35px rgba(155, 199, 168, 0.15);
}

.btn-primary:hover {
    transform: translateY(-3px);

    background:
        var(--green-light);

    box-shadow:
        0 18px 45px rgba(155, 199, 168, 0.22);
}

.btn-secondary {
    border:
        1px solid var(--line);

    background:
        rgba(255, 255, 255, 0.025);

    color: var(--white-soft);
}

.btn-secondary:hover {
    transform: translateY(-3px);

    border-color:
        rgba(155, 199, 168, 0.35);

    background:
        rgba(155, 199, 168, 0.06);
}


/* =========================================================
   HERO — BENEFÍCIOS
   ========================================================= */

.hero-features {
    display: flex;

    flex-wrap: wrap;

    gap: 22px;
}

.feature {
    display: flex;

    align-items: center;

    gap: 8px;
}

.feature span {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;

    border:
        1px solid rgba(155, 199, 168, 0.25);

    border-radius: 50%;

    background:
        rgba(155, 199, 168, 0.08);

    color: var(--green);

    font-size: 11px;

    font-weight: 700;
}

.feature p {
    color: var(--gray-dark);

    font-size: 11px;

    letter-spacing: 0.2px;
}


/* =========================================================
   HERO — IMAGEM
   ========================================================= */

.hero-right {
    position: relative;

    min-height: 560px;

    display: flex;

    align-items: center;
    justify-content: center;
}

.hero-img-wrapper {
    position: relative;

    width: 100%;

    display: flex;

    align-items: center;
    justify-content: center;
}

.hero-img-wrapper::before {
    content: "";

    position: absolute;

    width: 470px;
    height: 470px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(155, 199, 168, 0.13),
            transparent 67%
        );

    filter: blur(20px);

    z-index: -1;
}

.hero-img {
    width: 100%;

    max-width: 570px;
    max-height: 590px;

    object-fit: contain;

    filter:
        drop-shadow(
            0 35px 50px rgba(0, 0, 0, 0.55)
        );

    animation:
        deviceFloat 6s ease-in-out infinite;
}

@keyframes deviceFloat {

    0%,
    100% {
        transform:
            translateY(0);
    }

    50% {
        transform:
            translateY(-12px);
    }
}


/* =========================================================
   SEÇÕES
   ========================================================= */

section {
    padding: 120px 0;
}

.section-title {
    max-width: 780px;

    margin:
        0 auto 65px;

    text-align: center;
}

.section-title > span,
.section-title span {
    display: inline-block;

    margin-bottom: 14px;

    color: var(--green);

    font-size: 10px;

    font-weight: 700;

    letter-spacing: 2px;
}

.section-title h2 {
    color: var(--white);

    font-size:
        clamp(2.2rem, 4vw, 4rem);

    line-height: 1.05;

    font-weight: 700;

    letter-spacing: -2px;
}


/* =========================================================
   SERVIÇOS
   ========================================================= */

#services {
    background:
        #0a0d0a;

    border-top:
        1px solid var(--line-soft);
}

.services-grid {
    display: grid;

    grid-template-columns:
        repeat(3, minmax(0, 1fr));

    gap: 0;
}

.card {
    position: relative;

    min-height: 310px;

    padding: 35px 34px;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    background:
        transparent;

    border-top:
        1px solid var(--line);

    border-bottom:
        1px solid var(--line);

    border-right:
        1px solid var(--line);

    border-radius: 0;

    box-shadow: none;

    transition:
        background 0.3s ease,
        transform 0.3s ease;
}

.card:first-child {
    border-left:
        1px solid var(--line);
}

.card:hover {
    transform: translateY(-5px);

    background:
        rgba(155, 199, 168, 0.035);
}

.icon {
    width: 46px;
    height: 46px;

    margin-bottom: 55px;

    display: flex;

    align-items: center;
    justify-content: center;

    border:
        1px solid rgba(155, 199, 168, 0.22);

    border-radius: 50%;

    background:
        rgba(155, 199, 168, 0.05);

    font-size: 19px;
}

.card h3 {
    margin-bottom: 12px;

    color: var(--white);

    font-size: 19px;

    line-height: 1.3;

    font-weight: 600;
}

.card p {
    max-width: 350px;

    margin-bottom: 20px;

    color: var(--gray);

    font-size: 13px;

    line-height: 1.75;
}

.card .btn-secondary {
    margin-top: auto;

    min-height: 42px;

    padding:
        9px 17px;

    font-size: 11px;
}


/* =========================================================
   COMO FUNCIONA
   ========================================================= */

#how-it-works {
    background:
        #070907;

    border-top:
        1px solid var(--line-soft);
}

#how-it-works .services-grid {
    counter-reset: process;
}

#how-it-works .card {
    min-height: 280px;
}

#how-it-works .icon {
    position: relative;

    font-size: 0;

    background:
        transparent;

    border:
        0;

    width: auto;
    height: auto;

    margin-bottom: 65px;
}

#how-it-works .icon::before {
    counter-increment: process;

    content:
        "0" counter(process);

    color: var(--green);

    font-size: 13px;

    font-weight: 700;

    letter-spacing: 1px;
}


/* =========================================================
   FORMULÁRIO
   ========================================================= */

#formulario {
    position: relative;

    padding:
        130px 0;

    background:
        #0a0d0a;

    border-top:
        1px solid var(--line-soft);
}

#formulario::before {
    content: "";

    display: block;

    width: 45px;
    height: 2px;

    margin:
        0 auto 40px;

    background:
        var(--green);
}

#formulario .section-title {
    max-width: 760px;

    margin-bottom: 50px;
}

#formulario .section-title h2 {
    margin-bottom: 18px;
}

#formulario .section-title p {
    max-width: 600px;

    margin: 0 auto;

    color: var(--gray);

    font-size: 15px;

    line-height: 1.75;
}


/* =========================================================
   CAIXA DO FORMULÁRIO
   ========================================================= */

.lead-form {
    position: relative;

    width: min(680px, 100%);

    margin: 0 auto;

    padding: 42px;

    background:
        #0e120f;

    border:
        1px solid var(--line);

    border-radius:
        var(--radius);

    box-shadow:
        var(--shadow);

    overflow: hidden;
}

.lead-form::before {
    content: "";

    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 2px;

    background:
        linear-gradient(
            90deg,
            transparent,
            var(--green),
            transparent
        );

    opacity: 0.7;
}


/* =========================================================
   CAMPOS
   ========================================================= */

.form-group {
    margin-bottom: 22px;
}

.form-group label {
    display: block;

    margin-bottom: 8px;

    color: var(--white-soft);

    font-size: 12px;

    font-weight: 600;

    letter-spacing: 0.2px;
}

.lead-form input,
.lead-form textarea,
.lead-form select {
    width: 100%;

    min-height: 54px;

    padding:
        14px 16px;

    border:
        1px solid rgba(255, 255, 255, 0.10);

    border-radius:
        10px;

    outline: none;

    background:
        #080b08;

    color:
        var(--white);

    font-family:
        "Poppins",
        Arial,
        sans-serif;

    font-size: 15px;

    transition:
        border-color 0.25s ease,
        background 0.25s ease,
        box-shadow 0.25s ease;
}

.lead-form textarea {
    min-height: 120px;

    resize: vertical;
}

.lead-form input::placeholder,
.lead-form textarea::placeholder {
    color:
        #596159;

    opacity: 1;
}

.lead-form input:focus,
.lead-form textarea:focus,
.lead-form select:focus {
    border-color:
        rgba(155, 199, 168, 0.60);

    background:
        #0b100c;

    box-shadow:
        0 0 0 3px rgba(155, 199, 168, 0.08);
}

.lead-form input:invalid:not(:placeholder-shown) {
    border-color:
        rgba(255, 100, 100, 0.40);
}


/* =========================================================
   BOTÃO FORMULÁRIO
   ========================================================= */

.lead-form .btn-primary {
    width: 100%;

    min-height: 56px;

    margin-top: 8px;

    border: 0;

    cursor: pointer;

    font-size: 13px;

    letter-spacing: 0.3px;
}


/* =========================================================
   FAQ
   ========================================================= */

#faq {
    background:
        #070907;

    border-top:
        1px solid var(--line-soft);
}

.faq-list {
    width: min(850px, 100%);

    margin: 0 auto;

    display: flex;

    flex-direction: column;

    gap: 0;
}

.faq-item {
    overflow: hidden;

    background:
        transparent;

    border-top:
        1px solid var(--line);

    border-radius: 0;

    transition:
        background 0.25s ease;
}

.faq-item:last-child {
    border-bottom:
        1px solid var(--line);
}

.faq-item:hover {
    background:
        rgba(155, 199, 168, 0.025);
}

.faq-question {
    position: relative;

    width: 100%;

    padding:
        24px 58px 24px 4px;

    text-align: left;

    background:
        transparent;

    border: 0;

    color:
        var(--white);

    font-size: 14px;

    font-weight: 600;

    cursor: pointer;
}

.faq-question::after {
    content: "+";

    position: absolute;

    right: 5px;
    top: 50%;

    transform:
        translateY(-50%);

    color:
        var(--green);

    font-size: 23px;

    font-weight: 300;

    transition:
        transform 0.25s ease;
}

.faq-item.active .faq-question::after,
.faq-item.is-open .faq-question::after {
    content: "−";
}

.faq-answer {
    padding:
        0 50px 24px 4px;
}

.faq-answer p {
    max-width: 700px;

    color:
        var(--gray);

    font-size: 13px;

    line-height: 1.75;
}


/* =========================================================
   CTA FINAL
   ========================================================= */

#cta {
    position: relative;

    overflow: hidden;

    padding:
        140px 0;

    background:
        #101510;

    border-top:
        1px solid var(--line-soft);
}

#cta::before {
    content: "";

    position: absolute;

    width: 500px;
    height: 500px;

    left: 50%;
    top: 50%;

    transform:
        translate(-50%, -50%);

    border-radius: 50%;

    background:
        rgba(155, 199, 168, 0.06);

    filter: blur(100px);

    pointer-events: none;
}

.cta-container {
    position: relative;

    z-index: 2;

    max-width: 800px;

    text-align: center;
}

.cta-container h2 {
    margin-bottom: 20px;

    font-size:
        clamp(2.3rem, 5vw, 4.5rem);

    line-height: 1;

    font-weight: 700;

    letter-spacing: -2px;
}

.cta-container p {
    max-width: 560px;

    margin:
        0 auto 32px;

    color:
        var(--gray);

    font-size: 15px;
}

.cta-container .btn-primary {
    min-width: 250px;
}


/* =========================================================
   FOOTER
   ========================================================= */

footer {
    padding:
        42px 20px;

    text-align: center;

    background:
        #050705;

    border-top:
        1px solid var(--line-soft);

    color:
        var(--gray-dark);
}

.footer-socials {
    display: flex;

    align-items: center;
    justify-content: center;

    gap: 10px;

    margin-bottom: 20px;
}

.social-link {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-height: 38px;

    padding:
        8px 14px;

    border:
        1px solid var(--line);

    border-radius:
        999px;

    background:
        transparent;

    color:
        var(--gray);

    font-size: 11px;

    transition:
        background 0.25s ease,
        border-color 0.25s ease,
        color 0.25s ease;
}

.social-link:hover {
    background:
        rgba(155, 199, 168, 0.06);

    border-color:
        rgba(155, 199, 168, 0.30);

    color:
        var(--green-light);
}

footer p {
    font-size: 11px;
}


/* =========================================================
   WHATSAPP FLUTUANTE
   ========================================================= */

.whatsapp-float {
    position: fixed;

    right: 22px;
    bottom: 22px;

    z-index: 2000;

    width: 58px;
    height: 58px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background:
        var(--green-strong);

    color:
        #ffffff;

    font-size: 25px;

    box-shadow:
        0 14px 35px rgba(0, 0, 0, 0.40);

    animation:
        whatsappPulse 3s infinite;

    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;
}

.whatsapp-float:hover {
    transform:
        scale(1.08);

    box-shadow:
        0 18px 45px rgba(37, 211, 102, 0.22);
}

@keyframes whatsappPulse {

    0% {
        box-shadow:
            0 14px 35px rgba(0, 0, 0, 0.40),
            0 0 0 0 rgba(37, 211, 102, 0.30);
    }

    70% {
        box-shadow:
            0 14px 35px rgba(0, 0, 0, 0.40),
            0 0 0 11px rgba(37, 211, 102, 0);
    }

    100% {
        box-shadow:
            0 14px 35px rgba(0, 0, 0, 0.40),
            0 0 0 0 rgba(37, 211, 102, 0);
    }
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 1000px) {

    .hero-container {
        grid-template-columns: 1fr;

        text-align: center;

        gap: 45px;
    }

    .hero-left {
        max-width: 760px;

        margin:
            0 auto;
    }

    .hero-left > p {
        margin-left: auto;
        margin-right: auto;
    }

    .hero-buttons {
        justify-content: center;
    }

    .hero-features {
        justify-content: center;
    }

    .hero-right {
        min-height: auto;
    }

    .hero-img {
        max-width: 500px;
        max-height: 500px;
    }

    .services-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

    .card:nth-child(3) {
        grid-column:
            1 / -1;
    }
}


/* =========================================================
   CELULAR
   ========================================================= */

@media (max-width: 700px) {

    .container {
        width:
            calc(100% - 30px);
    }

    header {
        height: 68px;
    }

    .logo img {
        max-width: 140px;
        max-height: 43px;
    }

    .btn-whatsapp {
        min-height: 38px;

        padding:
            8px 13px;

        font-size: 10px;
    }


    /* HERO */

    #hero {
        min-height: auto;

        padding:
            110px 0 70px;
    }

    .hero-container {
        gap: 25px;
    }

    .hero-left h1 {
        font-size:
            clamp(
                2.7rem,
                13vw,
                4rem
            );

        letter-spacing:
            -2.5px;
    }

    .hero-left > p {
        font-size: 14px;

        line-height: 1.7;
    }

    .hero-buttons {
        flex-direction: column;

        width: 100%;
    }

    .hero-buttons .btn-primary,
    .hero-buttons .btn-secondary {
        width: 100%;
    }

    .hero-features {
        flex-direction: column;

        align-items: center;

        gap: 10px;
    }

    .hero-right {
        min-height: 300px;
    }

    .hero-img {
        max-width: 100%;

        max-height: 360px;
    }

    .hero-img-wrapper::before {
        width: 280px;
        height: 280px;
    }


    /* SEÇÕES */

    section {
        padding:
            80px 0;
    }

    .section-title {
        margin-bottom:
            40px;
    }

    .section-title h2 {
        font-size:
            2.2rem;

        letter-spacing:
            -1px;
    }


    /* SERVIÇOS */

    .services-grid {
        grid-template-columns:
            1fr;
    }

    .card {
        min-height:
            auto;

        padding:
            30px 22px;

        border-left:
            1px solid var(--line);

        border-right:
            1px solid var(--line);

        border-bottom:
            0;
    }

    .card:last-child {
        border-bottom:
            1px solid var(--line);
    }

    .card:nth-child(3) {
        grid-column:
            auto;
    }

    .icon {
        margin-bottom:
            38px;
    }


    /* COMO FUNCIONA */

    #how-it-works .card {
        min-height:
            auto;
    }


    /* FORMULÁRIO */

    #formulario {
        padding:
            85px 0;
    }

    #formulario .section-title h2 {
        font-size:
            2.2rem;
    }

    #formulario .section-title p {
        font-size:
            14px;
    }

    .lead-form {
        padding:
            28px 20px;

        border-radius:
            16px;
    }

    .form-group {
        margin-bottom:
            19px;
    }

    .lead-form input,
    .lead-form textarea,
    .lead-form select {
        min-height:
            53px;

        font-size:
            16px;
    }


    /* FAQ */

    .faq-question {
        padding:
            22px 48px
            22px 2px;

        font-size:
            13px;
    }

    .faq-answer {
        padding:
            0 35px
            22px 2px;
    }


    /* CTA */

    #cta {
        padding:
            95px 0;
    }

    .cta-container h2 {
        font-size:
            2.5rem;

        letter-spacing:
            -1.5px;
    }

    .cta-container p {
        font-size:
            14px;
    }

    .cta-container .btn-primary {
        width:
            100%;
    }


    /* FOOTER */

    .footer-socials {
        flex-wrap:
            wrap;
    }


    /* WHATSAPP */

    .whatsapp-float {
        right:
            16px;

        bottom:
            16px;

        width:
            55px;

        height:
            55px;

        font-size:
            24px;
    }
}


/* =========================================================
   CELULARES PEQUENOS
   ========================================================= */

@media (max-width: 400px) {

    .container {
        width:
            calc(100% - 24px);
    }

    .logo img {
        max-width:
            120px;
    }

    .btn-whatsapp {
        padding:
            7px 10px;

        font-size:
            9px;
    }

    #hero {
        padding-top:
            105px;
    }

    .hero-left h1 {
        font-size:
            2.5rem;

        letter-spacing:
            -2px;
    }

    .hero-left > p {
        font-size:
            13px;
    }

    .hero-img {
        max-height:
            300px;
    }

    .section-title h2 {
        font-size:
            1.9rem;
    }

    .lead-form {
        padding:
            24px 16px;
    }

    .faq-question {
        font-size:
            13px;
    }

    .footer-socials {
        flex-direction:
            column;
    }

    .social-link {
        width:
            180px;
    }
}


/* =========================================================
   ACESSIBILIDADE
   ========================================================= */

:focus-visible {
    outline:
        2px solid var(--green);

    outline-offset:
        3px;
}

@media (prefers-reduced-motion: reduce) {

    html {
        scroll-behavior:
            auto;
    }

    *,
    *::before,
    *::after {
        animation-duration:
            0.01ms !important;

        animation-iteration-count:
            1 !important;

        transition-duration:
            0.01ms !important;
    }
}
