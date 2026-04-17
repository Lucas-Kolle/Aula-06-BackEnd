/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmes.
 * Data: 17/04/2026
 * Autor: Lucas Dias Brnadão Kolle
 * Versão: 1.0.04.26
 *******************************************************************************************************************************************************************************************/

//Importando biblioteca de mensagens
const config_message = require("../modulo/configMessages.js")

//Importando o arquivo de filme dentro da pasta "model"
const filmeDAO = require("../../model/DAO/filme/filme.js")


//função para inserir novo filme
const inserirNovoFilme = async function(filme){

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json
 

    /* VALIDANDO DADOS QUE CHEGAM */

    // se o "filme.nome" (conteúdo do Json) vier vazio ou "null" ou undefined ou com mais caracteres do que é permitido (.lenght -> conta a quantidade de caracteres)
    if(filme.nome == "" || filme.nome == null || filme.nome == undefined || filme.nome.lenght > 80){

        //Criando um novo atributo no Json de mensagem para personalizar conforme o erro (NESSE CASO O ERRO É 400)
        message.ERROR_BAD_REQUETS.field = "[NOME] INVALIDO"

    }else if(filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.lenght != 10){ // != -> diferente 

        message.ERROR_BAD_REQUETS.field = "[DATA_LANCAMENTO] INVALIDO"

    }else if(filme.duracao == "" || filme.duracao == null || filme.duracao == undefined || filme.duracao.lenght < 5){

        message.ERROR_BAD_REQUETS.field = "[DURACAO] INVALIDA"

    }else if(filme.sinopse == "" || filme.sinopse == null || filme.sinopse == undefined){

        message.ERROR_BAD_REQUETS.field = "[SINOPSE] INVALIDA"

    }else if(isNaN(filme.avaliacao) || filme.avaliacao.lenght > 3 ){ //isNaN -> se vier algo que não seja um número

        message.ERROR_BAD_REQUETS.field = "[AVALIACAO] INVALIDA"

    }else if(filme.valor == "" || filme.valor == null || filme.valor == undefined || filme.valor.lenght > 5 || isNaN(filme.valor)){

        message.ERROR_BAD_REQUETS.field = "[VALOR] INVALIDO"

    }else if(filme.capa.lenght > 255){

        message.ERROR_BAD_REQUETS.field = "[CAPA] INVALIDO"

    //se tudo der certo ele vai cair aqui e mandar para pasta "model"
    }else{

        //como nãou houveram erros, os dados do filme serão enviados para a fução "insertFilme" no arquivo "filme.js" dentro da pasta "model" (pasta que conversa com o banco de dados)
        let result = await filmeDAO.insertFilme(filme) //await -> espere a resposta (conversa com o "async", sem o async não será possível usar o "await" ou seja, ela não espera a resposta)

        //condicional de resposta do "insertFilme()" 

        // se o recurso for inserido no banco e a função retornar "true" ela vai cair aqui
        if(result){

            message.DEFAULT_MESSAGE.status = message.SUCESS_CHEATED_ITEM.status //cria um atributo de status no cabeçalho "DEFAULT_MESSAGE" e atribui um valor predefinido no "SUCESS_CHEATED_ITEM"
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CHEATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_CHEATED_ITEM.message

        //se o recurso não for inserido no banco e retornar um "false" ela vai cair aqui
        }else{

            message.DEFAULT_MESSAGE.status = message.ERROR_BAD_REQUETS.status //cria um atributo de status no cabeçalho "DEFAULT_MESSAGE" e atribui um valor predefinido no "ERROR_BAD_REQUETS"
            message.DEFAULT_MESSAGE.status_code = message.ERROR_BAD_REQUETS.status_code
            message.DEFAULT_MESSAGE.message = message.ERROR_BAD_REQUETS.message //cria um atributo de message no cabeçalho "DEFAULT_MESSAGE" e atribui um valor predefinido no "ERROR_BAD_REQUETS"
            message.DEFAULT_MESSAGE.field = message,ERROR_BAD_REQUETS.field //cria um atributo field no cabeçalho "DEFAULT_MESSAGE" e atribui u valor personalizado criado nos else if acima "ERROR_BAD_REQUETS"

        }

        //retorna a mensagem completa, já personalizada de acordo com os erros apresentados em cada etapa
        return message.DEFAULT_MESSAGE

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

//exportando as funções
module.exports = {
    inserirNovoFilme,
}