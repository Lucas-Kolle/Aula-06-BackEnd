/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD da tabela de relacionamento de genero e filme.
 * Data: 03/06/2026
 * Autor: Lucas Dias Brnadão Kolle
 * Versão: 1.0.06.26
 *******************************************************************************************************************************************************************************************/

//importando arquivo de mensagens
const config_message = require("../modulo/configMessages.js")

//importando arquivo de diretor do DAO (MODEL)
const atorFilmeDAO = require("../../model/DAO/ator_filme/ator_filme.js")



//função para inserir
const inserirNovoAtorFilme = async function(atorFilme){

    //importando arquivo de mensagens 
    const message = JSON.parse(JSON.stringify(config_message)) //primeiro transforma em ele transformar em string para poder copiar, depois ele tranforma em json para ser utilizavel

    try {

        //tratando o tipo de dados recebido

        //enviado dados para a função validar
        let validar = await validarDados(atorFilme)

        //tratando retorno da validação
        if(validar){ //se a função validarDados() retornar a mensagem de erro ele envia para o app

            return validar // 400 (O retorno da função já é uma mensagem de erro)

        //se os dados estiverem corretos ele envia para o DAO 
        }else{
                
            //enviando dados para o DAO (mandar pro banco de dados)
            let result = await atorFilmeDAO.insertAtorFilme(atorFilme) //manda para a model para executar no banco de dados

            //validando retorno da função insertGenero()
            if(result){ //se o item for cadastrado corretamente ele envia uma mensagem de sucesso

                atorFilme.id = result //pegando o id do genero cadastrado e adicionando no JSON de genero

                message.DEFAULT_MESSAGE.status = message.SUCESS_CHEATED_ITEM.status //cria um atributo de status no cabeçalho "DEFAULT_MESSAGE" e atribui um valor predefinido no "SUCESS_CHEATED_ITEM"
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_CHEATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_CHEATED_ITEM.message
                message.DEFAULT_MESSAGE.response = atorFilme //aparece os dados do genero do response para o usuário conferir

            //se a função retornar um "false" (o genero não foi cadastrado) ele cai aqui
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (model) item não cadastrado
            }

            return message.DEFAULT_MESSAGE //201 MENSAGEM DE SUCESSO NO CADASTRO
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//função para atualizar um genero
const atualizarAtorFilme = async function(atorFilme, id){

    //importando mensagens
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        //validando id e existencia do conteúdo no banco de dados
        let validandoId = await buscarAtorFilmeID(id)

        //validando retorno da função de buscarGenero
        if(validandoId.status){ //vai olhar o status (true / false) da função

            //enviando dados do genero para a função de validação
            let validarAtorFilme = await validarDados(atorFilme)

            //validaddo retorno da função
            if(!validarAtorFilme){ //se a função de validação retornar "false" (dados corretos) ele cai aqui

                //adicionando o id no objeto "genero" recebido na requisição, para enviar tudo em um único objeto
                atorFilme.id = Number(id)

                //enviando para para o DAO 
                let result = await atorFilmeDAO.updateAtorFilme(atorFilme) //manda para a model para executar no banco de dados

                //tratando retorno do DAO
                if(result){

                    //montando o cabeçalho de resposta, pois a requisição não pede nada pro banco
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                    message.DEFAULT_MESSAGE.response = atorFilme //envia os dados do filme no response, para o usuário visualizar

                    return message.DEFAULT_MESSAGE //200 retornando a mensagem criada
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500 model
                }

            }else{
                return validarAtorFilme //400 mensagem de erro da própria validação 
            }

        }else{
            return validandoId //400(id inválido) ou 404(não encontrado) ou 500 (contraller e model)
        }
        
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 controler
    }
}

//função para listar todos os generos
const listarAtorFilme = async function(){

    //importando arquivo de mensagens
    let message = JSON.parse(JSON.stringify(config_message)) //primeiro transforma em ele transformar em string para poder copiar, depois ele tranforma em json para ser utilizavel

    try {

        //chamando a função para enviar os dados
        let result = await atorFilmeDAO.selectAllAtorFilme()

        //verificando retorno 
        if(result){

            //verificando tamanho do array
            if(result.length > 0){

                //personalizando mensagem de sucesso
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status // True or False
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code // 200
                message.DEFAULT_MESSAGE.response.count = result.length // Mostra a quantidade de itens
                message.DEFAULT_MESSAGE.response.atorFilme = result // Mostra os itens

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
const buscarAtorFilmeID = async function(id){

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
            let result = await atorFilmeDAO.selectAtorByIdFilme(id)

            //vaidando retorno
            if(result){ //se tiver algo ele cai aqui

                //conferindo tamanho do array de retorno
                if(result.length > 0){ //se estiver conteúdo no array ele cai aqui

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status //true / false
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code //200
                    message.DEFAULT_MESSAGE.response.atorFilme = result //conteúdo

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
const excluirAtorFilme = async function(id){
    
    //importando arquivo de mensagem
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //enviando id para função "buscarGeneroId" para verificar existencia
        let verificarId = await buscarAtorFilmeID(id)

        //tratando retorno da função
        if(verificarId.status){

            //mandando para o DAO
            let result = await atorFilmeDAO.deleteAtorFilme(id) 

            //tratando retornos
            if(result){
                return message.SUCCESS_DELETED_ITEM //200 registro excluido
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 model
            }

        }else{
            return verificarId //retorna a mensagem criada na função, contendo os possíveis erros no id (não existe, id errado ...)
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller
    }
}

//função para fazer a validação dos dados recebidos (POST / PUT)
const validarDados = function(atorFilme){

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json

    try {
        
        //iniciando validação dos dados recebidos
        if(atorFilme.id_ator == undefined /*undefined sempre deve vir primeiro*/ || atorFilme.id_ator == "" || atorFilme.id_ator == null || isNaN(atorFilme.id_ator)){

            //personalizando mensagem de erro
            message.ERROR_BAD_REQUEST.field /*field = campo (local do erro)*/ = "O campo [ID_filme] está incorreto!"
            return message.ERROR_BAD_REQUEST

        }else if(atorFilme.id_filme == undefined /*undefined sempre deve vir primeiro*/ || atorFilme.id_filme == "" || atorFilme.id_filme == null || isNaN(atorFilme.id_filme)){
            //personalizando mensagem de erro
            message.ERROR_BAD_REQUEST.field /*field = campo (local do erro)*/ = "O campo [ID_filme] está incorreto!"
            return message.ERROR_BAD_REQUEST
        //se estiver tudo certo ele cai aqui       
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}


/* CONTEÚDOS NOVOS DAQUI PRA BAIXO */

//função para retornar os filmes pelo id do genero (filmes relacionados a esse genero)
const buscarFilmeIdAtor = async function(idAtor){

    //importando o arquivo de mensagens
    const message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //validando id
        if(idAtor == undefined || idAtor == "" || idAtor == null || isNaN(idAtor)){ //se o id estiver erra ele vai entrar aqui

            //personalizando mensagem
            message.ERROR_BAD_REQUEST.field = "O campo [idAtor] está incorreto!"
            return message.ERROR_BAD_REQUEST //400 (requisição incorreta)

        }else{ //se estiver tudo certo com o id ele continua o programa

            //enviando para o DAO
            let result = await atorFilmeDAO.selectFilmeByIdAtor(idAtor)

            //vaidando retorno
            if(result){ //se tiver algo ele cai aqui

                //conferindo tamanho do array de retorno
                if(result.length > 0){ //se estiver conteúdo no array ele cai aqui

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status //true / false
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code //200
                    message.DEFAULT_MESSAGE.response.atorFilme = result //conteúdo

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

//função para retornar os generos pelo id do filme (generos relacionados a esse filme)
const buscarAtorIdFilme = async function(idFilme){

    //importando o arquivo de mensagens
    const message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //validando id
        if(idFilme == undefined || idFilme == "" || idFilme == null || isNaN(idFilme)){ //se o id estiver erra ele vai entrar aqui

            //personalizando mensagem
            message.ERROR_BAD_REQUEST.field = "O campo [ID_FILME] está incorreto!"
            return message.ERROR_BAD_REQUEST //400 (requisição incorreta)

        }else{ //se estiver tudo certo com o id ele continua o programa

            //enviando para o DAO
            let result = await atorFilmeDAO.selectAtorByIdFilme(idFilme)

            //vaidando retorno
            if(result){ //se tiver algo ele cai aqui

                //conferindo tamanho do array de retorno
                if(result.length > 0){ //se estiver conteúdo no array ele cai aqui

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status //true / false
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code //200
                    message.DEFAULT_MESSAGE.response.atorFilme = result //conteúdo

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

//função para excluir os generos relacionados com o filme, mesma do DAO (exclui pra depois adiconar os novos generos)
const excluirAtoresIdFilme = async function(idFilme){
    
    //importando arquivo de mensagem
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //mandando para o DAO
        let result = await atorFilmeDAO.deleteAtoresByIdFilme(idFilme) //manda o id do filme para a função de excluir os generos relacionados a esse filme

        //tratando retornos
        if(result){
            return message.SUCCESS_DELETED_ITEM //200 registro excluido
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500 model
        }
  
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller
    }
}

//exportando arquivos
module.exports = {
    inserirNovoAtorFilme,
    atualizarAtorFilme,
    listarAtorFilme,
    buscarAtorFilmeID,
    excluirAtorFilme,
    buscarFilmeIdAtor,
    buscarAtorIdFilme,
    excluirAtoresIdFilme
}