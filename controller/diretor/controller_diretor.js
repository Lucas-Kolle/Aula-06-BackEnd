/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretor.
 * Data: 15/05/2026
 * Autor: Lucas Dias Brnadão Kolle
 * Versão: 1.0.05.26
 *******************************************************************************************************************************************************************************************/

//importando arquivo de mensagens
const config_message = require("../modulo/configMessages.js")

//importando arquivo de genero do DAO (MODEL)
const generoDAO = require("../../model/DAO/genero/genero.js")

/* FUNÇÕES PARA O CRUD DE DIRETOR */

//função para inserir um novo diretor
const inserirNovoDiretor = async function(contentType, diretor){

}

//função para atualizar um diretor
const atualizarDiretor = async function(id, contentType, diretor){

}

//função para retornar todos os diretores
const listarDiretores = async function(){

}

//função para bucar um diretor pelo id
const buscarDiretorID = async function(id){

}

//função para excluir diretor
const excluirDiretor = async function(id){

}

//função para validar os dados recebidos na requição
const validarDadosDiretor = function(dados){
    
}

/* EXPORTANDO FUNÇÕES */
module.exports = {
    inserirNovoDiretor,
    atualizarDiretor,
    listarDiretores,
    buscarDiretorID,
    excluirDiretor
}