/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmes.
 * Data: 17/04/2026
 * Autor: Lucas Dias Brnadão Kolle
 * Versão: 1.0.04.26
 *******************************************************************************************************************************************************************************************/

//função para inserir novo filme
const inserirNovoFilme = async function(filme){
    
    /* VALIDANDO DADOS QUE CHEGAM */

    // se o "filme.nome" (conteúdo do Json) vier vazio ou "null" ou undefined ou com mais caracteres do que é permitido (.lenght -> conta a quantidade de caracteres)
    if(filme.nome == "" || filme.nome == null || filme.nome == undefined || filme.nome.lenght > 80){

    }else if(filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.lenght != 10){ // != -> diferente 

    }else if(filme.duracao == "" || filme.duracao == null || filme.duracao == undefined || filme.duracao.lenght < 5){

    }else if(filme.sinopse == "" || filme.sinopse == null || filme.sinopse == undefined){

    }else if(isNaN(filme.avaliacao) || filme.avaliacao.lenght > 3 ){ //isNaN -> se vier algo que não seja um número

    }else if(filme.valor == "" || filme.valor == null || filme.valor == undefined || filme.valor.lenght > 5 || isNaN(filme.valor)){

    }else if(filme.capa.lenght > 255){

    }
}

//função para atualizar um filme
const atualizarFilme = async function(){

}

//função para retornar todos os filmes
const listarFilmes = async function(){

}

//função para buscar um filme pelo id
const buscarFilmeID = async function(){

}

//função para excluir um filme
const excluirFilme = async function(){
    
}