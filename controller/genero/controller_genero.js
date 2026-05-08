/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de generos.
 * Data: 08/05/2026
 * Autor: Lucas Dias Brnadão Kolle
 * Versão: 1.0.05.26
 *******************************************************************************************************************************************************************************************/

//importando arquivo de mensagens
const config_message = require("../modulo/configMessages.js")

//importando arquivo de genero do DAO (MODEL)
const generoDAO = require("../../model/DAO/genero/genero.js")



//função para inserir um genero novo
const inserirNovoGenero = async function(genero, contentType){

    //importando arquivo de mensagens 
    const message = JSON.parse(JSON.stringify(config_message)) //primeiro transforma em ele transformar em string para poder copiar, depois ele tranforma em json para ser utilizavel

    try {

        //tratando o tipo de dados recebido (SÓ ACEITAMOS JSON)
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){ //se o content-type (informação presente no headers da requisição) não for um json ele cai no else

            //enviado dados para a função validar
            let validar = await validarDados(genero)

            //tratando retorno da validação
            if(validar){ //se a função validarDados() retornar a mensagem de erro ele envia para o app

                return validar // 400 (O retorno da função já é uma mensagem de erro)

            //se os dados estiverem corretos ele envia para o DAO 
            }else{
                
                //enviando dados para o DAO (mandar pro banco de dados)
                let result = await generoDAO.insertGenero(genero)

                //validando retorno da função insertGenero()
                if(result){ //se o item for cadastrado corretamente ele envia uma mensagem de sucesso

                    genero.id = result //pegando o id do genero cadastrado e adicionando no JSON de genero

                    message.DEFAULT_MESSAGE.status = message.SUCESS_CHEATED_ITEM.status //cria um atributo de status no cabeçalho "DEFAULT_MESSAGE" e atribui um valor predefinido no "SUCESS_CHEATED_ITEM"
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CHEATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_CHEATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = genero //aparece os dados do genero do response para o usuário conferir

                //se a função retornar um "false" (o genero não foi cadastrado) ele cai aqui
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500 (model) item não cadastrado
                }

                return message.DEFAULT_MESSAGE //201 MENSAGEM DE SUCESSO NO CADASTRO
            }
        
        }else{
            return message.ERROR_CONTENT_TYPE //415 (retorna erro de tipo de dados) 
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//função para atualizar um genero
const atualizarGenero = async function(genero, contentType, id){

}

//função para listar todos os generos
const listarGeneros = async function(){

    //importando arquivo de mensagens
    let message = JSON.parse(JSON.stringify(config_message)) //primeiro transforma em ele transformar em string para poder copiar, depois ele tranforma em json para ser utilizavel

    try {

        //chamando a função para enviar os dados
        let result = await generoDAO.selectAllGenero()
        console.log(result)

        //verificando retorno 
        if(result){

            //verificando tamanho do array
            if(result.length > 0){

                //personalizando mensagem de sucesso
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status // True or False
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code // 200
                message.DEFAULT_MESSAGE.response.count = result.length // Mostra a quantidade de itens
                message.DEFAULT_MESSAGE.response.genero = result // Mostra os itens

                return message.DEFAULT_MESSAGE // retorna as mensagens e os dados

            //se estiver vazio ele cai aqui 
            }else{
                return message.ERROR_NOT_FOUND //404 (não encontrado)
            }

        }else{
            return config_message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }

}

//função para buscar um genero pelo id
const buscarGeneroID = async function(id){

    //importando o arquivo de mensagens
    const message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //validando id
        if(id == undefined || id == "" || id == null || isNaN(id)){ //se o id estiver erra ele vai entrar aqui

            //personalizando mensagem
            message.ERROR_BAD_REQUEST.field = "O campo [ID] está incorreto!"
            return message.ERROR_BAD_REQUEST //400 (requisição incorreta)

        }else{ //se estiver tudo certo com o id ele continua o programa

            //enviando para o DAO
            let result = await generoDAO.selectByIdGenero(id)

            //vaidando retorno
            if(result){ //se tiver algo ele cai aqui

                //conferindo tamanho do array de retorno
                if(result.length > 0){ //se estiver conteúdo no array ele cai aqui

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status //true / false
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code //200
                    message.DEFAULT_MESSAGE.response.genero = result //conteúdo

                    return message.DEFAULT_MESSAGE //retornando dados

                }else{ //se estiver vazio ele cai aqui
                    return message.ERROR_NOT_FOUND //404 não encontrado
                }
            }else{ //se não tiver nada ele cai aqui
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (model) erro no banco 
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controler)
    }
}

//função para excluir um genero pelo id
const excluirGenero = async function(id){
    
}

//função para fazer a validação dos dados recebidos (POST / PUT)
const validarDados = function(genero){

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json

    try {
        
        //iniciando validação dos dados recebidos
        if(genero.genero == undefined /*undefined sempre deve vir primeiro*/ || genero.genero == "" || genero.genero == null || genero.genero.length >30){

            //personalizando mensagem de erro
            message.ERROR_BAD_REQUEST.field /*field = campo (local do erro)*/ = "O campo [GENERO] está incorreto!"
            return message.ERROR_BAD_REQUEST
        //se estiver tudo certo ele cai aqui
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

//exportando arquivos
module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    listarGeneros,
    buscarGeneroID,
    excluirGenero
}
