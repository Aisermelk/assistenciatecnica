/* =====================================
   LEAD-FORM.JS
   Envia o formulário de "Solicitar Atendimento"
   para /api/leads (Cloudflare Pages Function),
   que grava no banco (D1) para o Painel de Pedidos.
===================================== */

(function () {

    document.addEventListener("DOMContentLoaded", function () {

        const form = document.getElementById("lead-form-fields");
        if (!form) return;

        const status = document.getElementById("lead-form-status");
        const submitBtn = document.getElementById("lead-form-submit");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const dados = {
                name: form.name.value.trim(),
                phone: form.phone.value.trim(),
                device: form.device.value,
                message: form.message.value.trim()
            };

            if (!dados.name || !dados.phone) {
                mostrarStatus("Preencha nome e WhatsApp para continuar.", "error");
                return;
            }

            submitBtn.disabled = true;
            mostrarStatus("Enviando...", "");

            fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })
                .then(function (res) {
                    if (!res.ok) throw new Error("Falha ao enviar");
                    return res.json();
                })
                .then(function () {
                    const mensagemSucesso = (window.__siteContent &&
                        window.__siteContent.lead_form &&
                        window.__siteContent.lead_form.success_message) ||
                        "Pedido enviado! Vamos entrar em contato pelo WhatsApp em breve.";
                    mostrarStatus(mensagemSucesso, "success");
                    form.reset();
                })
                .catch(function () {
                    const mensagemErro = (window.__siteContent &&
                        window.__siteContent.lead_form &&
                        window.__siteContent.lead_form.error_message) ||
                        "Não foi possível enviar agora. Tente novamente ou chame no WhatsApp.";
                    mostrarStatus(mensagemErro, "error");
                })
                .finally(function () {
                    submitBtn.disabled = false;
                });

        });

        function mostrarStatus(texto, tipo) {
            status.textContent = texto;
            status.className = "lead-form-status" + (tipo ? " " + tipo : "");
        }

    });

})();
