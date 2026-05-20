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
                let result = await diretorDAO(diretor)

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

}

//função para retornar todos os diretores
const listarDiretores = async function(){

}

//função para bucar um diretor pelo id
const buscarDiretorID = async function(id){

}

//função para excluir diretor
const excluirDiretor = async function(id){

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