/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de classificacao.
 * Data: 29/05/2026
 * Autor: Lucas Dias Brnadão Kolle
 * Versão: 1.0.05.26
 *******************************************************************************************************************************************************************************************/

//importando arquivo de mensagens
const config_message = require("../modulo/configMessages.js")

//importando arquivo de genero do DAO (MODEL)
const classificacaoDAO = require("../../model/DAO/classificacao/classificacao.js")
const { json } = require("body-parser")

/* FUNÇÕES PARA O CRUD DE CLASSIFICACAO */

//função para inserir um novo classificacao
const inserirNovaClassificacao = async function(contentType, classificacao){

    let message = JSON.parse(JSON.stringify(config_message))

    try {

        //validando content type
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            //validando dados recebidos
            let validando = await validarDadosClassificacao(classificacao)

            if(!validando){

                //mandando pro banco 
                let result = await classificacaoDAO.insertClassificacao(classificacao)

                if(result){

                    classificacao.id = result //criando o atributo ID no Json do ator e colocando o ID gerado no momento do insert

                    message.DEFAULT_MESSAGE.status = message.SUCESS_CHEATED_ITEM.status //cria um atributo de status no cabeçalho "DEFAULT_MESSAGE" e atribui um valor predefinido no "SUCESS_CHEATED_ITEM"
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CHEATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_CHEATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = classificacao //aparece os dados do ator do response para o usuário conferir

                    return message.DEFAULT_MESSAGE //200 (retorna o cabeçalho com a mensagem de sucesso e os dados do ator)
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }else{
                return validando
            }

        }else{
            return message.ERROR_CONTENT_TYPE //415 (retorna erro de tipo de dados) 
        }
        
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }

}

//função para atualizar um ator
const atualizarClassificacao = async function(id, contentType, classificacao){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //verificando existencia do id
        let validarId = await buscarClassificacaoId(id)

        if(validarId.status){

            //verificando tipo de dados do diretor
            if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

                //validar dados do diretor
                let validarDados = await validarDadosClassificacao(classificacao)

                if(!validarDados){

                    //se estiver tudo certo ele adiciona o id no objeto diretor
                    classificacao.id = Number(id)
    
                    //enviando para o banco 
                    let result = await classificacaoDAO.updateClassificacao(classificacao)

                    if(result){

                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                        message.DEFAULT_MESSAGE.response = classificacao //envia os dados do ator no response, para o usuário visualizar

                        return message.DEFAULT_MESSAGE //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
    
                }else{
                    return validarDados
                }
            }else{
                return message.ERROR_CONTENT_TYPE
            }

        }else{
            return validarId //mensagem de erro da própria função
        }
        
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//função para retornar todos os atores
const listarClassificacao = async function(){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        let result = await classificacaoDAO.selectAllClassificacao()

        if(result){

            if(result.length > 0){

                //personalizando o cabeçalho com a mensagem de sucesso
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.classificacao = result

                return message.DEFAULT_MESSAGE //retorna o cabeçalho com o "result" que contém os dados do ator

            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//função para bucar um ator pelo id
const buscarClassificacaoId = async function(id){

    let message = JSON.parse(JSON.stringify(config_message))

    try {

        //tratando id
        //tratando o id, para não mandar conteúdos errados pro banco
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST //400
        
        //se o id estiver no formato correto ele ennvia pro DAO
        }else{
            
            //enviando para o banco
            let result = await classificacaoDAO.selectByIdClassificacao(id)

            //tratando retorno
            if(result){

                //verificando tamanho do array de resposta
                if(result.length > 0){

                    //editando cabeçalho
                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.classificacao = result

                    return message.DEFAULT_MESSAGE //200                 
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//função para excluir diretor
const excluirClassificacao = async function(id){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //validando id
        let validarId = await buscarClassificacaoId(id)

        if(validarId.status){

            //mandadno para o banco
            let result = await classificacaoDAO.deleteClassificacao(id)

            if(result){

                return message.SUCCESS_DELETED_ITEM //200 registro excluido
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return message.ERROR_BAD_REQUEST
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//função para validar os dados recebidos na requição
const validarDadosClassificacao = async function(dados){

    let message = JSON.parse(JSON.stringify(config_message))

        // se o "dados.nome" (conteúdo do Json) vier vazio ou "null" ou undefined ou com mais caracteres do que é permitido (.lenght -> conta a quantidade de caracteres)
        if(dados.sigla == undefined || dados.sigla == "" || dados.sigla == null || dados.sigla.length > 4){

            //Criando um novo atributo no Json de mensagem para personalizar conforme o erro (NESSE CASO O ERRO É 400)
            message.ERROR_BAD_REQUEST.field = "[sigla] INVALIDO"
            return message.ERROR_BAD_REQUEST
    
        }else if(dados.classificacao == undefined || dados.classificacao == "" || dados.classificacao == null || dados.classificacao.length > 50){ 
    
            message.ERROR_BAD_REQUEST.field = "[classificacao] INVALIDO"
            return message.ERROR_BAD_REQUEST
    
        }else if(dados.descricao == undefined || dados.descricao == "" || dados.descricao == null || dados.descricao.length > 70){
    
            message.ERROR_BAD_REQUEST.field = "[descricao] INVALIDA"
            return message.ERROR_BAD_REQUEST
    
        //se não tiver nenhum erro ele retorna false
        }else{
            return false
        }
    
}

/* EXPORTANDO FUNÇÕES */
module.exports = {
    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    buscarClassificacaoId,
    excluirClassificacao
}