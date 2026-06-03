/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de relação entre ator e filme.
 * Data: 03/06/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.06.26
 ********************************************************************************************************************************************************************************************/

//importando a biblioteca para gerenciar o banco de dados no node.js
const knex = require("knex")

//importando o arquivo "database_config_knex" para atribuir as configurações do BD
const knexConfig = require("../../database_config_knex/knex_file.js")

//criando a conexão por meio do arquivo que contém os dados necessários para estabelecer o acesso e a conexão
const knexConex = knex(knexConfig.development) //aciona o knex e passa as configurações estabelecidas no arquivo

/*INICIANDO CRUD DA TABELA DE DIRETOR_FILME (TABELA INTERMEDIÁRIA)*/

//função para inserir 
const insertAtorFilme = async function(atorFilme){

    //try catch para segurar a API no ar mesmo com erros
    try {
        
        //criando a variável responsável por construir o script para enviar ao banco de dados
        let sql = 
            `insert into tbl_ator_filme (
                id_ator,
                id_filme
            )
            values (
                ${atorFilme.id_ator},
                ${atorFilme.id_filme}
            );`

        //executa o script no banco de dados usando a nossa variável
        let result = await knexConex.raw(sql) //usa o knexConex para enviar o script

        if(result)
            return result[0].insertId //retorna o ID do ator criado ao invés de retorna "true"
        else
            return false
        
    } catch (error) {
        return false
    }
}

//função para atualizar
const updateAtorFilme = async function(atorFilme){

    try {

        //criando variável sql
        let sql =   `update tbl_ator_filme set 
                        id_ator = ${atorFilme.id_ator},
                        id_filme = ${atorFilme.id_filme}

                    where id = ${atorFilme.id};`

        //enviando para o banco de dados 
        let result = await knexConex.raw(sql)

        //validando retornos
        if(result){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

//função para retornar todos
const selectAllAtorFilme = async function(){

    try {

        //criando variável sql para guardar o script
        let sql = "select * from tbl_ator_filme order by id desc;" //colocando em ordem decrescente para facilitar o entendimento

        //executando no banco de dados
        let result = await knexConex.raw(sql) //usa o knexConex para enviar o script

        //verificando retorno do banco de dados
        if(Array.isArray(result)){ //se o banco retornar um array ele cai aqui

            return result[0] //retornando apenas o conteúdo que pedimos, sem os adicionais de descrição da tabela
        
        //se o retorno estiver vazio ele vai cair aqui
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

//função para retornar um genero de acordo com o id
const selectByIdAtorFilme = async function(id){

    try {
        
        //criando variável sql
        let sql = `select * from tbl_ator_filme where id = ${id}`

        //executando no banco de dados
        let result = await knexConex.raw(sql)

        //validando retorno
        if(Array.isArray(result)){ //vendo se é um array

            return result[0] //retornando somente o que nós pedimos, sem expecificações da tabela
        //se não for array ele cai aqui
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//função para deletar um filme pelo id
const deleteAtorFilme = async function(id){

    try {

        //criando variável sql
        let sql = `delete from tbl_ator_filme where id = ${id};`

        console.log(sql)

        //enviando para o banco
        let result = await knexConex.raw(sql)

        //tratando retorno
        if(result){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

/* ATÉ AQUI FOI SÓ ALTERAÇÃO SIMPLES, DAQUI PRA BAIXO SÃO IMPLEMENTAÇÕES DIFERENTES */

//função para retornar os filmes pelo id do diretor (filmes que o diretor participa)
const selectFilmeByIdAtor = async function(idAtor){

    try {
        
        //criando variável sql
        let sql = `select   tbl_filme.*
                        from tbl_filme
                            inner join tbl_ator_filme
                                on tbl_filme.id = tbl_ator_filme.id_filme
                            inner join tbl_ator
                                on tbl_ator.id = tbl_ator_filme.id_ator
                    where tbl_ator.id = ${idAtor};`

        //executando no banco de dados
        let result = await knexConex.raw(sql)

        //validando retorno
        if(Array.isArray(result)){ //vendo se é um array

            return result[0] //retornando somente o que nós pedimos, sem expecificações da tabela
        //se não for array ele cai aqui
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//função para retornar os diretores pelo id do filme (diretores que participam do filme)
const selectAtorByIdFilme = async function(idFilme){

    try {
        
        //criando variável sql
        let sql = `select   tbl_ator.*
                        from tbl_filme
                            inner join tbl_ator_filme
                                on tbl_filme.id = tbl_ator_filme.id_filme
                            inner join tbl_ator
                                on tbl_ator.id = tbl_ator_filme.id_ator
                    where tbl_filme.id = ${idFilme};`

        //executando no banco de dados
        let result = await knexConex.raw(sql)

        //validando retorno
        if(Array.isArray(result)){ //vendo se é um array

            return result[0] //retornando somente o que nós pedimos, sem expecificações da tabela
        //se não for array ele cai aqui
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


//função para excluir os diretores filtrando pelo id do filme, essa função será utilizada no update do filme, pois precisa apagar pra depois inserir os novos diretores relacionados a esse filme
const deleteAtoresByIdFilme = async function(idFilme){

    try {

        //criando variável sql
        let sql = `delete from tbl_ator_filme where id_filme = ${idFilme};` //apagando pela chave estrangeira do filme, para apagar todos os diretores relacionados a esse filme

        console.log(sql)

        //enviando para o banco
        let result = await knexConex.raw(sql)

        //tratando retorno
        if(result){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}


//exportando arquivos
module.exports = {
    insertAtorFilme,
    updateAtorFilme,
    selectAllAtorFilme,
    selectByIdAtorFilme,
    deleteAtorFilme,
    selectFilmeByIdAtor,
    selectAtorByIdFilme,
    deleteAtoresByIdFilme
}