/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela filme
 * Data: 15/04/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.04.26
 ********************************************************************************************************************************************************************************************/

//import da biblioteca para gerenciar o banco de dados MySQL no node.JS
const knex = require("knex")

//import do arquivo de configuração para conexão com o Banco de Dados MySQL
const knexConfig = require("../../database_config_knex/knex_file.js")

//criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)

//função para inserir dados na tabela de filme
const insertFilme = async function(filme){
    let sql = //vai pegar o conteúdo do JSON "filme" pra criar um script
    `insert into tbl_filme (
	    nome, 
	    data_lancamento, 
	    duracao, 
	    sinopse, 
	    avaliacao, 
	    valor, 
	    capa
    )
    values(
        '${filme.nome}',
        '${filme.data_lancamento}',
        '${filme.duracao}',
        '${filme.sinopse}',
        '${filme.avaliacao}',
        '${filme.valor}',
        '${filme.capa}'
    );`

    //executar o script sql no banco de dados (passa a variável que nós fizemos)
    let result = await knexConex.raw(sql) //await está dizendo para o javaScript aguardar a resposta

    if(result)
        return true
    else
        return false
}

//função para atualizar um filme existente na tabela
const updateFilme = async function(filme){

}

//função para retornar todos os dados da tabela de filme
const selectAllFilme = async function(){

}

//função para retornar os dados do filme filtrando pelo id
const selectByIdFilme = async function(id){

}

//função para excluir um filme pelo id
const deleteFilme = async function(id){

}

//exportando funções
module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}