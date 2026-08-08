// /api/callback
// Recebe o retorno do GitHub, troca o "code" por um token de acesso
// e devolve esse token para a janela do painel (/admin), como o
// Decap CMS espera.

export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return new Response("Código de autorização ausente.", { status: 400 });
    }

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code: code
        })
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
        return new Response("Não foi possível autenticar com o GitHub. Tente novamente.", { status: 401 });
    }

    const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });
    const message = `authorization:github:success:${payload}`;

    const html = `<!DOCTYPE html>
<html>
<body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(${JSON.stringify(message)}, e.origin);
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

    return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
    });
}
