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
const inserirNovoFilme = async function(filme, contentType){

    // CONFERINDO CHEGADA 
    // console.log("Conferindo se chega 2 (controller)")
    // console.log(filme)

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json

    try {
        
        //Tratando tipo de dados recebidos, se não for um Json ele não processa e cai no else
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            /* VALIDANDO DADOS QUE CHEGAM */

            let validar = await validarDados(filme)

            //se a função validar retornar um mensagem de erro, ele retorna o erro
            if(validar){
                return validar
            
            //se tudo der certo ele vai cair aqui e mandar para pasta "model"
            //encaminha os dados do filme para o DAO
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

                    //retorna a mensagem de erro completa
                    message.ERROR_INTERNAL_SERVER_MODEL

                }

                //retorna a mensagem completa, já personalizada de acordo com os erros apresentados em cada etapa
                return message.DEFAULT_MESSAGE

            }

        //se o tipo de dados não for um Json, ele vai entrar aqui
        }else{

            //retorna a mensagem de erro personalizada
            return message.ERROR_CONTENT_TYPE

        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
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

//função para validar todos os dados de filmes (se é obrigatório, quantidade de letras, números e etc)
const validarDados = async function(filme){

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json


    // se o "filme.nome" (conteúdo do Json) vier vazio ou "null" ou undefined ou com mais caracteres do que é permitido (.lenght -> conta a quantidade de caracteres)
    if(filme.nome == "" || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){

        //Criando um novo atributo no Json de mensagem para personalizar conforme o erro (NESSE CASO O ERRO É 400)
        message.ERROR_BAD_REQUEST.field = "[NOME] INVALIDO"
        return message.ERROR_BAD_REQUEST

    }else if(filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){ // != -> diferente 

        message.ERROR_BAD_REQUEST.field = "[DATA_LANCAMENTO] INVALIDO"
        return message.ERROR_BAD_REQUEST

    }else if(filme.duracao == "" || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){

        message.ERROR_BAD_REQUEST.field = "[DURACAO] INVALIDA"
        return message.ERROR_BAD_REQUEST

    }else if(filme.sinopse == "" || filme.sinopse == null || filme.sinopse == undefined){

        message.ERROR_BAD_REQUEST.field = "[SINOPSE] INVALIDA"
        return message.ERROR_BAD_REQUEST

    }else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3 ){ //isNaN -> se vier algo que não seja um número

        message.ERROR_BAD_REQUEST.field = "[AVALIACAO] INVALIDA"
        return message.ERROR_BAD_REQUEST

    }else if(filme.valor == "" || filme.valor == null || filme.valor == undefined || filme.valor.split(".")[0].length > 3 || isNaN(filme.valor)){ //.split(".") -> Transforma o número em um ARRAY, permitindo contar a parte decimal separadamente 

        message.ERROR_BAD_REQUEST.field = "[VALOR] INVALIDO"
        return message.ERROR_BAD_REQUEST

    }else if(filme.capa.lenght > 255){

        message.ERROR_BAD_REQUEST.field = "[CAPA] INVALIDO"
        return message.ERROR_BAD_REQUEST

    // se tudo estiver correto ele vai cair aqui
    }else{
        return false
    }

}

//exportando as funções
module.exports = {
    inserirNovoFilme,
}