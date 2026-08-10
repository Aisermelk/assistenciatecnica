/**
 * CODE.GS — Backend do Painel Admin (Google Apps Script + Planilha)
 *
 * Como instalar:
 * 1. Abra a planilha do Google que vai guardar as configurações.
 * 2. Crie uma aba chamada exatamente "Config".
 * 3. Menu Extensões > Apps Script.
 * 4. Apague o conteúdo padrão e cole todo este arquivo.
 * 5. Menu Configurações do Projeto (ícone de engrenagem) > Propriedades do
 *    script > Adicionar propriedade do script:
 *       Propriedade: ADMIN_TOKEN
 *       Valor: escolha uma senha forte (é a senha do /admin.html)
 * 6. Menu Implantar > Gerenciar implantações > (lápis) Editar > Nova versão > Implantar.
 *    - Executar como: Eu (seu e-mail)
 *    - Quem tem acesso: Qualquer pessoa
 * 7. Use a URL /exec gerada (a mesma que você já tem) dentro de script.js e admin.html.
 */

const NOME_ABA_CONFIG = "Config";

const CAMPOS = ["whatsapp", "instagram", "facebook", "pixel_id", "google_id"];

function getAbaConfig_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(NOME_ABA_CONFIG);
  if (!aba) {
    aba = planilha.insertSheet(NOME_ABA_CONFIG);
  }
  return aba;
}

function saidaJson_(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET — usado pelo site (script.js) para ler as configurações atuais.
 * Público: qualquer visitante do site pode ler (não expõe senha nenhuma).
 */
function doGet(e) {
  const aba = getAbaConfig_();
  const dados = aba.getDataRange().getValues();

  const config = {};
  dados.forEach(function (linha) {
    const chave = linha[0];
    const valor = linha[1];
    if (chave) config[chave] = valor || "";
  });

  CAMPOS.forEach(function (campo) {
    if (!(campo in config)) config[campo] = "";
  });

  return saidaJson_(config);
}

/**
 * POST — usado pelo admin.html para salvar as configurações.
 * Protegido por senha (ADMIN_TOKEN nas Propriedades do script).
 */
function doPost(e) {
  let corpo;
  try {
    corpo = JSON.parse(e.postData.contents);
  } catch (erro) {
    return saidaJson_({ error: "Dados inválidos." });
  }

  const tokenSalvo = PropertiesService.getScriptProperties().getProperty("ADMIN_TOKEN");

  if (!tokenSalvo || corpo.token !== tokenSalvo) {
    return saidaJson_({ error: "Senha incorreta." });
  }

  const aba = getAbaConfig_();

  CAMPOS.forEach(function (campo, indice) {
    const linha = indice + 1;
    aba.getRange(linha, 1).setValue(campo);
    aba.getRange(linha, 2).setValue(corpo[campo] || "");
  });

  return saidaJson_({ ok: true });
}
