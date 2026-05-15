/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de diretor
 * Data: 15/05/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.05.26
 ********************************************************************************************************************************************************************************************/

//importando a biblioteca para gerenciar o banco de dados no node.js
const knex = require("knex")

//importando o arquivo "database_config_knex" para atribuir as configurações do BD
const knexConfig = require("../../database_config_knex/knex_file.js")

//criando a conexão por meio do arquivo que contém os dados necessários para estabelecer o acesso e a conexão
const knexConex = knex(knexConfig.development) //aciona o knex e passa as configurações estabelecidas no arquivo

/* INICIANDO CRUD DA TABELA DE DIRETOR */

//inserir diretor
const insertDiretor = async function(diretor){

}

//atualizar diretor
const updateDiretor = async function(diretor){

}

//retornar todos os diretores
const selectAllDiretor = async function(){

}

//retornar diretor com base no id
const selectByIdDiretor = async function(id){

}

//deletar diretor pelo id
const deleteDiretor = async function(id){

}

/* EXPORTANDO FUNÇÕES */
module.exports = {
    insertDiretor,
    updateDiretor,
    selectAllDiretor,
    selectByIdDiretor,
    deleteDiretor
}