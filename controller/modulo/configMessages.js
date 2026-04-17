/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela configuração e padronização das mensagen da API.
 * Data: 17/04/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.04.26
 *******************************************************************************************************************************************************************************************/

//Criando cabeçalho padronizado para as devolutivas da API
const defaultMessage = {
    api_description: "API para gerenciar o controle de filmes",
    development: "Lucas Dias Brandão Kolle",
    version: "1.0.04.26",
    status: Boolean,
    status_code: Number,
    response: {}
}

//Criando mensagens de erros personalizadas de acordo com os status code
const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message: "Os dados enviados na requisição não estão corretos!"
}

//exportando as mensagens
module.exports = {
    defaultMessage,
    ERROR_BAD_REQUEST
}