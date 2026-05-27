/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de ator
 * Data: 27/05/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.05.26
 ********************************************************************************************************************************************************************************************/

//importando a biblioteca para gerenciar o banco de dados no node.js
const knex = require("knex")

//importando o arquivo "database_config_knex" para atribuir as configurações do BD
const knexConfig = require("../../database_config_knex/knex_file.js")

//criando a conexão por meio do arquivo que contém os dados necessários para estabelecer o acesso e a conexão
const knexConex = knex(knexConfig.development) //aciona o knex e passa as configurações estabelecidas no arquivo

/* INICIANDO CRUD DA TABELA DE ATOR */

//inserir ator
const insertAtor = async function(ator){

    try {

        //criando variável sql
        let sql = 
            `
                insert into tbl_ator (
                    nome,
                    nacionalidade,
                    data_nascimento,
                    biografia
                )
                values(
                    "${ator.nome}",
                    "${ator.nacionalidade}",
                    "${ator.data_nascimento}",
                    "${ator.biografia}"
                );
            `

        //executando no banco de dados
        let result = await knexConex.raw(sql) //usa a coneção com banco para executar a variável sql

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

//atualizar ator
const updateAtor = async function(ator){

    try {

        //criando variável sql
        let sql = 
        `
            update tbl_ator set 
                nome 			= "${ator.nome}",
                nacionalidade	= "${ator.nacionalidade}",
                data_nascimento = "${ator.data_nascimento}",
                biografia		= "${ator.biografia}"
            where id = ${ator.id};
        `

        let result = await knexConex.raw(sql)

        //validando retorno
        if(result){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }

}

//retornar todos os atores
const selectAllAtor = async function(){

    try {
        
        //criando variável sql
        let sql = `select * from tbl_ator order by id desc;`

        //enviando para o banco de dados
        let result = await knexConex.raw(sql)

        //Verificando se é um array
        if(Array.isArray(result)){

            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//retornar ator com base no id
const selectByIdAtor = async function(id){

    try {
        
        let sql = `select * from tbl_ator where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//deletar ator pelo id
const deleteAtor = async function(id){

    try {
        
        let sql = `delete from tbl_ator where id = ${id}`

        let result = await knexConex.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

/* EXPORTANDO FUNÇÕES */
module.exports = {
    insertAtor,
    updateAtor,
    selectAllAtor,
    selectByIdAtor,
    deleteAtor
}