# Painel Administrativo — Guia de Configuração

O site agora tem **dois painéis**:

1. **`/admin`** — Painel de Conteúdo (Decap CMS): edita textos, FAQ, depoimentos, WhatsApp, Facebook, **Pixel da Meta e Google Tag (GA4)**, sem mexer em código.
2. **`/admin-leads`** — Painel de Pedidos: mostra quem preencheu o formulário do site (nome, WhatsApp, aparelho, status).

Nenhum dos dois funciona "fora da caixa" — cada um precisa de uma configuração única de alguns minutos no GitHub/Cloudflare. Depois de configurado, você não mexe nisso de novo.

---

## 1. Painel de Conteúdo (`/admin`) — editar textos, WhatsApp, Facebook, Pixel e Google Tag

Funciona com **Decap CMS**: você loga com sua conta do GitHub, edita numa telinha simples, e ele salva direto no repositório. O Cloudflare Pages republica sozinho.

### Passo 1 — Criar um OAuth App no GitHub
1. Acesse **github.com/settings/developers** → **OAuth Apps** → **New OAuth App**.
2. Preencha:
   - **Homepage URL**: `https://SEU-SITE.pages.dev`
   - **Authorization callback URL**: `https://SEU-SITE.pages.dev/api/callback`
3. Copie o **Client ID** e gere um **Client Secret**.

### Passo 2 — Adicionar as variáveis no Cloudflare Pages
No projeto, vá em **Settings → Environment variables** e adicione:
- `GITHUB_CLIENT_ID` = (o Client ID do passo 1)
- `GITHUB_CLIENT_SECRET` = (o Client Secret do passo 1)

### Passo 3 — Ajustar `admin/config.yml`
Edite duas linhas no arquivo `admin/config.yml`:
```yaml
repo: SEU_USUARIO/SEU_REPOSITORIO
base_url: https://SEU-SITE.pages.dev
```

### Passo 4 — Usar
Acesse `https://SEU-SITE.pages.dev/admin`, clique em **Login with GitHub** e edite. Ao salvar, o Cloudflare já republica o site em cerca de 1 minuto.

### Como adicionar o Pixel da Meta e o Google Tag
Dentro do `/admin`: **Conteúdo do Site → Textos, WhatsApp, Facebook, FAQ e Depoimentos → Rastreamento (Pixel e Google Tag)**.
- **ID do Pixel da Meta**: cole só o número (ex: `1234567890123456`).
- **ID do Google Tag / GA4**: cole o ID que começa com `G-` (ex: `G-XXXXXXXXXX`).

Salvando, o site passa a carregar o Pixel/Google Tag automaticamente (arquivo `js/tracking.js`) — sem precisar editar nenhum código. Deixe em branco se ainda não tiver o ID.

---

## 2. Painel de Pedidos (`/admin-leads`) — ver e gerenciar quem pediu atendimento

O formulário "Peça seu atendimento" do site salva os dados num banco. O painel mostra a lista e permite mudar o status (Novo → Em andamento → Concluído/Cancelado).

### Passo 1 — Criar o banco (Cloudflare D1)
No painel do Cloudflare, vá em **Workers & Pages → D1** → **Create database**, dê um nome (ex: `assistencia-leads`).

### Passo 2 — Criar a tabela
Abra o console SQL do banco criado e cole o conteúdo do arquivo `schema.sql` (já incluso neste projeto) e execute.

### Passo 3 — Vincular o banco ao site
No seu projeto Cloudflare Pages: **Settings → Functions → D1 database bindings** → **Add binding**:
- **Variable name**: `DB`
- **D1 database**: selecione o banco criado no Passo 1

### Passo 4 — Definir a senha do painel
Em **Settings → Environment variables**, adicione:
- `ADMIN_TOKEN` = uma senha forte à sua escolha (ex: `minhaSenha123!`)

### Passo 5 — Usar
Acesse `https://SEU-SITE.pages.dev/admin-leads`, digite a senha (`ADMIN_TOKEN`) e veja os pedidos. Clique no WhatsApp de cada linha para abrir a conversa direto.

> Depois de alterar variáveis de ambiente ou bindings, é preciso fazer um novo deploy (ou clicar em "Retry deployment") para elas passarem a valer.

---

## O que mudou no conteúdo desta atualização
- Textos revisados para deixar claro o atendimento a **TV Box e BTV Box**.
- WhatsApp atualizado para `(11) 99726-0899`.
- Facebook adicionado: `facebook.com/share/1KVNFExU7R`.
- Link do Instagram removido (a empresa não tem Instagram).
- Novo formulário "Peça seu atendimento" além do botão direto do WhatsApp.
