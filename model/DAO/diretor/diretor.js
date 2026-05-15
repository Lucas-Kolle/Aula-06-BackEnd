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

    try {

        //criando variável sql
        let sql = 
            `
                insert into tbl_diretor (
                    nome,
                    nacionalidade,
                    data_nascimento,
                    biografia
                )
                values(
                    "${diretor.nome}",
                    "${diretor.nacionalidade}",
                    "${diretor.data_nascimento}",
                    "${diretor.biografia}"
                );
            `

        //executando no banco de dados
        let result = knexConex.raw(sql) //usa a coneção com banco para executar a variável sql

        //validadndo retorno do banco
        if(result){
            return result[0].insertId //pega o id do item adicionado para retornar, ao invés de retornar só o "true"
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }

}

//atualizar diretor
const updateDiretor = async function(diretor){

    try {

        //criando variável sql
        let sql = 
        `
            update tbl_diretor set 
	            nome 			= "${diretor.nome}",
                nacionalidade	= "${diretor.nacionalidade}",
                data_nascimento = "${diretor.data_nascimento}",
                biografia		= "${diretor.biografia}"
	        where id = 1;
        `

        /* PAREI AQUI !!!!!!!!!!!!!!!! */
        /* EXECUTAR NO BANCO DE DADOS E RETORNAR PARA REQUISIÇÃO */
        
    } catch (error) {
        return false
    }

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