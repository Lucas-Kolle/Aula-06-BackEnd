/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela filme
 * Data: 15/04/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.04.26
 ********************************************************************************************************************************************************************************************/

//função para inserir dados na tabela de filme
const insertFilme = async function(filme){
    let sql = 
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