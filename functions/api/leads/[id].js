// /api/leads/:id
// PATCH -> atualiza o status de um pedido ("novo", "em_andamento", "concluido", "cancelado")
// Só quem tiver o token do painel (x-admin-token) pode usar.

function jsonResponse(obj, status = 200) {
    return new Response(JSON.stringify(obj), {
        status,
        headers: { "Content-Type": "application/json; charset=utf-8" }
    });
}

const STATUS_VALIDOS = ["novo", "em_andamento", "concluido", "cancelado"];

export async function onRequestPatch({ request, env, params }) {
    const token = request.headers.get("x-admin-token");

    if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
        return jsonResponse({ error: "Não autorizado." }, 401);
    }

    if (!env.DB) {
        return jsonResponse({ error: "Banco de dados não configurado." }, 500);
    }

    let data;
    try {
        data = await request.json();
    } catch (err) {
        return jsonResponse({ error: "Dados inválidos." }, 400);
    }

    if (!STATUS_VALIDOS.includes(data.status)) {
        return jsonResponse({ error: "Status inválido." }, 400);
    }

    await env.DB.prepare(`UPDATE leads SET status = ? WHERE id = ?`)
        .bind(data.status, params.id)
        .run();

    return jsonResponse({ ok: true });
}
