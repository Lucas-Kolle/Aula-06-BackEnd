/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD da tabela de relacionamento de genero e filme.
 * Data: 22/05/2026
 * Autor: Lucas Dias Brnadão Kolle
 * Versão: 1.0.05.26
 *******************************************************************************************************************************************************************************************/

//importando arquivo de mensagens
const config_message = require("../modulo/configMessages.js")

//importando arquivo de genero do DAO (MODEL)
const generoFilmeDAO = require("../../model/DAO/genero_filme/genero_filme.js")



//função para inserir um genero novo
const inserirNovoGeneroFilme = async function(generoFilme){

    //importando arquivo de mensagens 
    const message = JSON.parse(JSON.stringify(config_message)) //primeiro transforma em ele transformar em string para poder copiar, depois ele tranforma em json para ser utilizavel

    try {

        //tratando o tipo de dados recebido

        //enviado dados para a função validar
        let validar = await validarDados(generoFilme)

        //tratando retorno da validação
        if(validar){ //se a função validarDados() retornar a mensagem de erro ele envia para o app

            return validar // 400 (O retorno da função já é uma mensagem de erro)

        //se os dados estiverem corretos ele envia para o DAO 
        }else{
                
            //enviando dados para o DAO (mandar pro banco de dados)
            let result = await generoFilmeDAO.insertGeneroFilme(generoFilme)

            //validando retorno da função insertGenero()
            if(result){ //se o item for cadastrado corretamente ele envia uma mensagem de sucesso

                generoFilme.id = result //pegando o id do genero cadastrado e adicionando no JSON de genero

                message.DEFAULT_MESSAGE.status = message.SUCESS_CHEATED_ITEM.status //cria um atributo de status no cabeçalho "DEFAULT_MESSAGE" e atribui um valor predefinido no "SUCESS_CHEATED_ITEM"
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_CHEATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_CHEATED_ITEM.message
                message.DEFAULT_MESSAGE.response = generoFilme //aparece os dados do genero do response para o usuário conferir

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
const atualizarGeneroFilme = async function(generoFilme, contentType, id){

    //importando mensagens
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        //validando id e existencia do conteúdo no banco de dados
        let validandoId = await buscarGeneroFilmeID(id)

        //validando retorno da função de buscarGenero
        if(validandoId.status){ //vai olhar o status (true / false) da função

            //enviando dados do genero para a função de validação
            let validarDadosGeneroFilme = await validarDados(generoFilme)

            //validaddo retorno da função
            if(!validarDadosGeneroFilme){

                //adicionando o id no objeto "genero" recebido na requisição, para enviar tudo em um único objeto
                generoFilme.id = Number(id)

                //enviando para para o DAO 
                let result = await generoFilmeDAO.updateGeneroFilme(generoFilme)

                //tratando retorno do DAO
                if(result){

                    //montando o cabeçalho de resposta, pois a requisição não pede nada pro banco
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                    message.DEFAULT_MESSAGE.response = generoFilme //envia os dados do filme no response, para o usuário visualizar

                    return message.DEFAULT_MESSAGE //200 retornando a mensagem criada
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500 model
                }

            }else{
                return validarDadosGeneroFilme //400 mensagem de erro da própria validação 
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
const listarGeneroFilme = async function(){

    //importando arquivo de mensagens
    let message = JSON.parse(JSON.stringify(config_message)) //primeiro transforma em ele transformar em string para poder copiar, depois ele tranforma em json para ser utilizavel

    try {

        //chamando a função para enviar os dados
        let result = await generoFilmeDAO.selectAllGeneroFilme()

        //verificando retorno 
        if(result){

            //verificando tamanho do array
            if(result.length > 0){

                //personalizando mensagem de sucesso
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status // True or False
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code // 200
                message.DEFAULT_MESSAGE.response.count = result.length // Mostra a quantidade de itens
                message.DEFAULT_MESSAGE.response.generoFilme = result // Mostra os itens

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
const buscarGeneroFilmeID = async function(id){

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
            let result = await generoFilmeDAO.selectByIdGeneroFilme(id)

            //vaidando retorno
            if(result){ //se tiver algo ele cai aqui

                //conferindo tamanho do array de retorno
                if(result.length > 0){ //se estiver conteúdo no array ele cai aqui

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status //true / false
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code //200
                    message.DEFAULT_MESSAGE.response.generoFilme = result //conteúdo

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
const excluirGeneroFilme = async function(id){
    
    //importando arquivo de mensagem
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //enviando id para função "buscarGeneroId" para verificar existencia
        let verificarId = await buscarGeneroFilmeID(id)

        //tratando retorno da função
        if(verificarId.status){

            //mandando para o DAO
            let result = await generoFilmeDAO.deleteGeneroFilme(id) 

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
const validarDados = function(generoFilme){

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json

    try {
        
        //iniciando validação dos dados recebidos
        if(generoFilme.id_genero == undefined /*undefined sempre deve vir primeiro*/ || generoFilme.id_genero == "" || generoFilme.id_genero == null || isNaN(generoFilme.id_genero)){

            //personalizando mensagem de erro
            message.ERROR_BAD_REQUEST.field /*field = campo (local do erro)*/ = "O campo [ID_filme] está incorreto!"
            return message.ERROR_BAD_REQUEST

        }else if(generoFilme.id_filme == undefined /*undefined sempre deve vir primeiro*/ || generoFilme.id_filme == "" || generoFilme.id_filme == null || isNaN(generoFilme.id_filme)){
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
const buscarFilmeIdGenero = async function(idGenero){

    //importando o arquivo de mensagens
    const message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //validando id
        if(idGenero == undefined || idGenero == "" || idGenero == null || isNaN(idGenero)){ //se o id estiver erra ele vai entrar aqui

            //personalizando mensagem
            message.ERROR_BAD_REQUEST.field = "O campo [ID_GENERO] está incorreto!"
            return message.ERROR_BAD_REQUEST //400 (requisição incorreta)

        }else{ //se estiver tudo certo com o id ele continua o programa

            //enviando para o DAO
            let result = await generoFilmeDAO.selectFilmeByIdGenero(idGenero)

            //vaidando retorno
            if(result){ //se tiver algo ele cai aqui

                //conferindo tamanho do array de retorno
                if(result.length > 0){ //se estiver conteúdo no array ele cai aqui

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status //true / false
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code //200
                    message.DEFAULT_MESSAGE.response.generoFilme = result //conteúdo

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
const buscarGeneroIdFilme = async function(idFilme){

    //importando o arquivo de mensagens
    const message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //validando id
        if(idFilme == undefined || idFilme == "" || idFilme == null || isNaN(idFilme)){ //se o id estiver erra ele vai entrar aqui

            //personalizando mensagem
            message.ERROR_BAD_REQUEST.field = "O campo [ID_GENERO] está incorreto!"
            return message.ERROR_BAD_REQUEST //400 (requisição incorreta)

        }else{ //se estiver tudo certo com o id ele continua o programa

            //enviando para o DAO
            let result = await generoFilmeDAO.selectGeneroByIdFilme(idFilme)

            //vaidando retorno
            if(result){ //se tiver algo ele cai aqui

                //conferindo tamanho do array de retorno
                if(result.length > 0){ //se estiver conteúdo no array ele cai aqui

                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status //true / false
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code //200
                    message.DEFAULT_MESSAGE.response.generoFilme = result //conteúdo

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
const excluirGenerosIdFilme = async function(idFilme){
    
    //importando arquivo de mensagem
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        //mandando para o DAO
        let result = await generoFilmeDAO.deleteGenerosByIdFilme(idFilme) //manda o id do filme para a função de excluir os generos relacionados a esse filme

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
    inserirNovoGeneroFilme,
    atualizarGeneroFilme,
    listarGeneroFilme,
    buscarGeneroFilmeID,
    excluirGeneroFilme,
    buscarFilmeIdGenero,
    buscarGeneroIdFilme,
    excluirGenerosIdFilme
}
