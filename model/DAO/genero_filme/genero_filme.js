/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de relação entre filme e gênero
 * Data: 22/05/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.05.26
 ********************************************************************************************************************************************************************************************/

//importando a biblioteca para gerenciar o banco de dados no node.js
const knex = require("knex")

//importando o arquivo "database_config_knex" para atribuir as configurações do BD
const knexConfig = require("../../database_config_knex/knex_file.js")

//criando a conexão por meio do arquivo que contém os dados necessários para estabelecer o acesso e a conexão
const knexConex = knex(knexConfig.development) //aciona o knex e passa as configurações estabelecidas no arquivo

/*INICIANDO CRUD DA TABELA DE GENEROS_FILME (TABELA INTERMEDIÁRIA)*/

//função para inserir generos
const insertGeneroFilme = async function(generoFilme){

    //try catch para segurar a API no ar mesmo com erros
    try {
        
        //criando a variável responsável por construir o script para enviar ao banco de dados
        let sql = 
            `insert into tbl_genero_filme (
                id_genero,
                id_filme
            )
            values (
                ${generoFilme.id_genero},
                ${generoFilme.id_filme}
            );`

        //executa o script no banco de dados usando a nossa variável
        let result = await knexConex.raw(sql) //usa o knexConex para enviar o script

        if(result)
            return result[0].insertId //retorna o ID do genero criado ao invés de retorna "true"
        else
            return false
        
    } catch (error) {
        return false
    }
}

//função para atualizar um genero
const updateGeneroFilme = async function(generoFilme){

    try {

        //criando variável sql
        let sql =   `update tbl_genero_filme set 
                        id_genero = ${generoFilme.id_genero},
                        id_filme = ${generoFilme.id_filme}

                    where id = ${generoFilme.id};`

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

//função para retornar todos os filmes
const selectAllGeneroFilme = async function(){

    try {

        //criando variável sql para guardar o script
        let sql = "select * from tbl_genero_filme order by id desc;" //colocando em ordem decrescente para facilitar o entendimento

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
const selectByIdGeneroFilme = async function(id){

    try {
        
        //criando variável sql
        let sql = `select * from tbl_genero_filme where id = ${id}`

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
const deleteGeneroFilme = async function(id){

    try {

        //criando variável sql
        let sql = `delete from tbl_genero_filme where id = ${id};`

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

//função para retornar os filmes pelo id do genero (filmes relacionados a esse genero)
const selectFilmeByIdGenero = async function(idGenero){

    try {
        
        //criando variável sql
        let sql = `select   tbl_filme.*
                        from tbl_filme
                            inner join tbl_genero_filme
                                on tbl_filme.id = tbl_genero_filme.id_filme
                            inner join tbl_genero
                                on tbl_genero.id = tbl_genero_filme.id_genero
                    where tbl_genero.id = ${idGenero};`

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

//função para retornar os generos pelo id do filme (generos relacionados a esse filme)
const selectGeneroByIdFilme = async function(idFilme){

    try {
        
        //criando variável sql
        let sql = `select   tbl_genero.*
                        from tbl_filme
                            inner join tbl_genero_filme
                                on tbl_filme.id = tbl_genero_filme.id_filme
                            inner join tbl_genero
                                on tbl_genero.id = tbl_genero_filme.id_genero
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


//função para excluir os generos filtrando pelo id do filme, essa função será utilizada no update do filme, pois precisa apagar pra depois inserir os novos generos relacionados a esse filme
const deleteGenerosByIdFilme = async function(idFilme){

    try {

        //criando variável sql
        let sql = `delete from tbl_genero_filme where id_filme = ${idFilme};` //apagando pela chave estrangeira do filme, para apagar todos os generos relacionados a esse filme

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
    insertGeneroFilme,
    updateGeneroFilme,
    selectAllGeneroFilme,
    selectByIdGeneroFilme,
    deleteGeneroFilme,
    selectFilmeByIdGenero,
    selectGeneroByIdFilme,
    deleteGenerosByIdFilme
}