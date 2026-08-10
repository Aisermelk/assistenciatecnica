# Painel Admin — GitHub + Planilha do Google + Cloudflare

Sem Firebase, sem banco de dados separado: as configurações do site (WhatsApp,
Instagram, Facebook, Pixel da Meta, Google Tag) ficam guardadas numa
**planilha do Google**, servidas por um **Google Apps Script** (o link que
você já tem: `.../exec`). O site é só arquivos estáticos, publicados pelo
**GitHub + Cloudflare Pages**.

```
Visitante do site  →  script.js  →  planilha (via Apps Script)  →  aplica WhatsApp/Instagram/Facebook/Pixel/Tag
Você no /admin.html →  salva com senha  →  grava na planilha (via Apps Script)
```

---

## Passo 1 — Preparar a planilha

1. Abra a planilha do Google já ligada ao seu link (`script.google.com/macros/.../exec`).
2. Crie uma aba chamada exatamente **`Config`** (se ainda não existir — o script cria sozinha na primeira vez, mas é bom conferir).

## Passo 2 — Colar o código do backend

1. Na planilha: **Extensões → Apps Script**.
2. Apague o conteúdo que estiver lá e cole o conteúdo do arquivo **`Code.gs`** (incluso neste pacote).
3. Clique no ícone de engrenagem **Configurações do projeto** → **Propriedades do script** → **Adicionar propriedade do script**:
   - Propriedade: `ADMIN_TOKEN`
   - Valor: escolha uma senha forte — é a senha que você vai digitar no `/admin.html`.

## Passo 3 — Reimplantar mantendo a mesma URL

1. Menu **Implantar → Gerenciar implantações**.
2. Clique no ícone de lápis (editar) na implantação existente.
3. Em "Versão", escolha **Nova versão** → **Implantar**.
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**

Isso atualiza o código *sem trocar* a URL `.../exec` — a mesma que já está escrita dentro de `script.js` e `admin.html`. Se por algum motivo o Google gerar uma URL nova, é só substituir o valor de `APP_URL` nesses dois arquivos.

## Passo 4 — Subir os arquivos no GitHub

Suba (ou atualize) estes arquivos no seu repositório: `index.html`, `style.css`, `script.js`, `admin.html`, e a pasta `assets/`. **Não precisa subir o `Code.gs`** no site — ele mora só na planilha.

## Passo 5 — Cloudflare Pages

Se o repositório já está conectado ao Cloudflare Pages, o deploy acontece sozinho a cada push. Não é necessário configurar Functions, D1 nem variáveis de ambiente — tudo estático.

## Passo 6 — Usar

- Acesse `https://SEU-SITE.pages.dev/admin.html`, digite a senha (`ADMIN_TOKEN`) e edite WhatsApp, Instagram, Facebook, Pixel e Google Tag. Ao salvar, grava direto na planilha.
- O site (`index.html`) busca essas configurações automaticamente a cada visita — não precisa gerar novo deploy quando você só muda esses dados.

---

## Por que isso é diferente da versão anterior (localStorage)
Antes, o `admin.html` salvava só no `localStorage` do seu próprio navegador —
ou seja, só você via a mudança, e o site publicado continuava com os dados
antigos para todo mundo. Agora o `admin.html` salva na planilha (compartilhada),
e todo visitante do site lê de lá — por isso funciona de verdade em produção.
