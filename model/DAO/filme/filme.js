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

    try {
        
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
            if('${filme.avaliacao}' = "", null, '${filme.avaliacao}'),
            '${filme.valor}',
            '${filme.capa}'
        );`

        // CONFERINDO CHEGADA
        // console.log("Conferindo o Script do Banco")
        // console.log(sql)

        //executar o script sql no banco de dados (passa a variável que nós fizemos)
        let result = await knexConex.raw(sql) //await está dizendo para o javaScript aguardar a resposta

        console.log(result)
        if(result)
            return result[0].insertId //Retorna o ID gerado pelo banco
        else
            return false

    //se der algum erro ele cai aqui e retorna falso, mas não derruba a API
    } catch (error) {

        //console.log(error) //serve para ver onde eu errei
        return false

    }
}

//conteúdo do dia que eu faltei
//função para atualizar um filme existente na tabela
const updateFilme = async function(filme){

    try {
        let sql = `update tbl_filme set
	        nome            = '${filme.nome}',
            sinopse         = '${filme.sinopse}',
            capa            = '${filme.capa}',
            data_lancamento = '${filme.data_lancamento}',
            duracao         =  '${filme.duracao}',
            valor           = '${filme.valor}',
            avaliacao       =  if('${filme.avaliacao}' = '', null, '${filme.avaliacao}')
        where id  = ${filme.id}`

        let result = await knexConex.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todos os dados da tabela de filme
const selectAllFilme = async function(){

    //colocando dentro do "try catch" para evitar que o programa feche em caso de erros
    try {

        //criando a variável que guarda o script do banco
        let sql = "select * from tbl_filme order by id desc" //mostra todos os dados da tabela de filmes ordenando pelo id de forma decrescente

        //executar o script sql no banco de dados (passa a variável que nós fizemos)
        let result = await knexConex.raw(sql) //await está dizendo para o javaScript aguardar a resposta

        //printando no terminal a resposta do banco (itens cadastrados na tabela de filmes)
        // console.log(result)

        //verificando se o retorno do banco é um ARRAy, se não for um ARRAY é porque deu errado
        if(Array.isArray(result)){ //verifica se a variável "result" é um ARRAY
            return result[0] //pedindo apenas o ARRAY de dados, removendo a descrição da estrutura da tabela
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//função para retornar os dados do filme filtrando pelo id
const selectByIdFilme = async function(id){

    //colocando dentro do "try catch" para evitar que o programa feche em caso de erros
    try {
       
        //criando o script para buscar no banco
        let sql = `select * from tbl_filme where id=${id}` // buscar o filme pelo id

        let result = await knexConex.raw(sql) //envia o comando pro banco e espera a resposta

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }

}

//conteúdo do dia que eu faltei
//função para excluir um filme pelo id
const deleteFilme = async function(id){

    try {
        let sql = `delete from tbl_filme where id = ${id};` //deletando apenas 

        let result = await knexConex.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//exportando funções
module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}