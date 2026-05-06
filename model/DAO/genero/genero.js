/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de genero
 * Data: 06/05/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.05.26
 ********************************************************************************************************************************************************************************************/

//importando a biblioteca para gerenciar o banco de dados no node.js
const knex = require("knex")

//importando o arquivo "database_config_knex" para atribuir as configurações do BD
const knexConfig = require("../../database_config_knex/knex_file.js")

//criando a conexão por meio do arquivo que contém os dados necessários para estabelecer o acesso e a conexão
const knexConex = knex(knexConfig.development) //aciona o knex e passa as configurações estabelecidas no arquivo

/*INICIANDO CRUD DA TABELA DE GENEROS*/

//função para inserir generos
const insertGenero = async function(genero){

}

//função para atualizar um genero
const updateGenero = async function(genero){

}

//função para retornar todos os filmes
const selectAllGenero = async function(){

}

//função para retornar um genero de acordo com o id
const selectByIdGenero = async function(id){

}

//função para deletar um filme pelo id
const deleteGenero = async function(id){

}

//exportando arquivos
module.exports = {
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}