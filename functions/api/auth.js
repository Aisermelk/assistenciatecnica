// /api/auth
// Inicia o login do painel (/admin) com a conta do GitHub.
// Precisa das variáveis de ambiente GITHUB_CLIENT_ID e GITHUB_CLIENT_SECRET
// configuradas em Cloudflare Pages > Settings > Environment variables.

export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);

    if (!env.GITHUB_CLIENT_ID) {
        return new Response("GITHUB_CLIENT_ID não configurado nas variáveis de ambiente.", { status: 500 });
    }

    const redirectUri = `${url.origin}/api/callback`;
    const state = crypto.randomUUID();

    const authorizeUrl =
        "https://github.com/login/oauth/authorize" +
        `?client_id=${encodeURIComponent(env.GITHUB_CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        "&scope=repo,user" +
        `&state=${state}`;

    return Response.redirect(authorizeUrl, 302);
}
