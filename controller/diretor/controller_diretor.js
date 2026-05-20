/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretor.
 * Data: 15/05/2026
 * Autor: Lucas Dias Brnadão Kolle
 * Versão: 1.0.05.26
 *******************************************************************************************************************************************************************************************/

//importando arquivo de mensagens
const config_message = require("../modulo/configMessages.js")

//importando arquivo de genero do DAO (MODEL)
const diretorDAO = require("../../model/DAO/diretor/diretor.js")
const { json } = require("body-parser")

/* FUNÇÕES PARA O CRUD DE DIRETOR */

//função para inserir um novo diretor
const inserirNovoDiretor = async function(contentType, diretor){

    let message = JSON.parse(JSON.stringify(config_message))

    try {

        //validando content type
        if(String(contentType).toUpperCase == "APPLICATION/JSON"){

            //validando dados recebidos
            let validando = await validarDadosDiretor(diretor)

            if(!validando){

                //mandando pro banco 
                let result = await diretorDAO.insertDiretor(diretor)

                if(result){

                    diretor.id = result //criando o atributo ID no Json do diretor e colocando o ID gerado no momento do insert

                    message.DEFAULT_MESSAGE.status = message.SUCESS_CHEATED_ITEM.status //cria um atributo de status no cabeçalho "DEFAULT_MESSAGE" e atribui um valor predefinido no "SUCESS_CHEATED_ITEM"
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CHEATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_CHEATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = diretor //aparece os dados do diretor do response para o usuário conferir
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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }

}

//função para atualizar um diretor
const atualizarDiretor = async function(id, contentType, diretor){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //verificando existencia do id
        let validarId = await buscarDiretorID(id)

        if(validarId.status){

            //verificando tipo de dados do diretor
            if(String(contentType).toUpperCase == "APPLICATION/JSON"){

                //validar dados do diretor
                let validarDadosDiretor = await validarDadosDiretor(diretor)

                if(!validarDadosDiretor){

                    //se estiver tudo certo ele adiciona o id no objeto diretor
                    diretor.id = Number(id)
    
                    //enviando para o banco 
                    let result = await diretorDAO.updateDiretor(diretor)

                    if(result){

                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                        message.DEFAULT_MESSAGE.response = diretor //envia os dados do diretor no response, para o usuário visualizar

                        return message.DEFAULT_MESSAGE //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
    
                }else{
                    return validarDadosDiretor
                }
            }else{
                return message.ERROR_CONTENT_TYPE
            }

        }else{
            return validarId //mensagem de erro da própria função
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//função para retornar todos os diretores
const listarDiretores = async function(){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        let result = diretorDAO.selectAllDiretor()

        if(result){

            if(result.length > 0){

                //personalizando o cabeçalho com a mensagem de sucesso
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.diretor = result

                return message.DEFAULT_MESSAGE //retorna o cabeçalho com o "result" que contém os dados do diretor

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

//função para bucar um diretor pelo id
const buscarDiretorID = async function(id){

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
            let result = await diretorDAO.selectByIdDiretor(id)

            //tratando retorno
            if(result){

                //verificando tamanho do array de resposta
                if(result.length > 0){

                    //editando cabeçalho
                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.diretor = result

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
const excluirDiretor = async function(id){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //validando id
        let validarId = await buscarDiretorID(id)

        if(validarId.status){

            //mandadno para o banco
            let result = await diretorDAO.deleteDiretor(id)

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
const validarDadosDiretor = async function(dados){

    let message = JSON.parse(JSON.stringify(config_message))

        // se o "dados.nome" (conteúdo do Json) vier vazio ou "null" ou undefined ou com mais caracteres do que é permitido (.lenght -> conta a quantidade de caracteres)
        if(dados.nome == undefined || dados.nome == "" || dados.nome == null || dados.nome.length > 90){

            //Criando um novo atributo no Json de mensagem para personalizar conforme o erro (NESSE CASO O ERRO É 400)
            message.ERROR_BAD_REQUEST.field = "[NOME] INVALIDO"
            return message.ERROR_BAD_REQUEST
    
        }else if(dados.nacionalidade == undefined || dados.nacionalidade == "" || dados.nacionalidade == null || dados.nacionalidade.length > 30){ 
    
            message.ERROR_BAD_REQUEST.field = "[NACIONALIDADE] INVALIDO"
            return message.ERROR_BAD_REQUEST
    
        }else if(dados.data_nascimento == undefined || dados.data_nascimento == "" || dados.data_nascimento == null || dados.data_nascimento.length != 10){
    
            message.ERROR_BAD_REQUEST.field = "[DATA DE NASCIMENTO] INVALIDA"
            return message.ERROR_BAD_REQUEST
    
        }else if(!isNaN(dados.avaliacao) ){
    
            message.ERROR_BAD_REQUEST.field = "[Biografia invalida] INVALIDA"
            return message.ERROR_BAD_REQUEST
    
        }else{
            return false
        }
    
}

/* EXPORTANDO FUNÇÕES */
module.exports = {
    inserirNovoDiretor,
    atualizarDiretor,
    listarDiretores,
    buscarDiretorID,
    excluirDiretor
}