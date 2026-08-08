// /api/leads
// POST  -> qualquer visitante pode enviar um pedido de atendimento (formulário do site)
// GET   -> só quem tiver o token do painel (x-admin-token) pode listar os pedidos
//
// Precisa de:
//  - Banco D1 vinculado com o nome "DB" (Cloudflare Pages > Settings > Functions > D1 bindings)
//  - Variável de ambiente ADMIN_TOKEN (a senha do Painel de Pedidos)

function jsonResponse(obj, status = 200) {
    return new Response(JSON.stringify(obj), {
        status,
        headers: { "Content-Type": "application/json; charset=utf-8" }
    });
}

export async function onRequestPost({ request, env }) {
    let data;
    try {
        data = await request.json();
    } catch (err) {
        return jsonResponse({ error: "Dados inválidos." }, 400);
    }

    const name = (data.name || "").trim();
    const phone = (data.phone || "").trim();
    const device = (data.device || "").trim();
    const message = (data.message || "").trim();

    if (!name || !phone) {
        return jsonResponse({ error: "Nome e WhatsApp são obrigatórios." }, 400);
    }

    if (!env.DB) {
        return jsonResponse({ error: "Banco de dados não configurado." }, 500);
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    try {
        await env.DB.prepare(
            `INSERT INTO leads (id, name, phone, device, message, status, created_at)
             VALUES (?, ?, ?, ?, ?, 'novo', ?)`
        ).bind(id, name, phone, device, message, createdAt).run();
    } catch (err) {
        return jsonResponse({ error: "Erro ao salvar o pedido." }, 500);
    }

    return jsonResponse({ ok: true, id });
}

export async function onRequestGet({ request, env }) {
    const token = request.headers.get("x-admin-token");

    if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
        return jsonResponse({ error: "Não autorizado." }, 401);
    }

    if (!env.DB) {
        return jsonResponse({ error: "Banco de dados não configurado." }, 500);
    }

    const { results } = await env.DB.prepare(
        `SELECT * FROM leads ORDER BY created_at DESC`
    ).all();

    return jsonResponse({ leads: results });
}
