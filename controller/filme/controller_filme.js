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
                if(result){ //201

                    filme.id = result //criando o atributo ID no Json do filme e colocando o ID gerado no momento do insert

                    message.DEFAULT_MESSAGE.status = message.SUCESS_CHEATED_ITEM.status //cria um atributo de status no cabeçalho "DEFAULT_MESSAGE" e atribui um valor predefinido no "SUCESS_CHEATED_ITEM"
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CHEATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_CHEATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = filme //aparece os dados do filme do response para o usuário conferir

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

//conteúdo do dia que eu faltei
//função para atualizar um filme
const atualizarFilme = async function(filme, id, contentType){

        //clonando a variável de mensagens para não modificar a original
        let message = JSON.parse(JSON.stringify(config_message))
        //JSON.stringify(config_message) -> transforma o Json em string
        //JSON.parse -> transforma de volta em Json

    try {
        //Validação para verificar se o conteúdo do Body é um JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para buscar o filme e validar se o ID está correto, 
            //Se o ID existe no BD e se o FIlme existe
            let resultBuscarFilme = await buscarFilmeID(id)

            if (resultBuscarFilme.status) {
                //Chamar a função para validar os dados para alteração filme (Body)
                let validar = await validarDados(filme)
                if (!validar) {
                    //Adicionar um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    filme.id = Number(id)

                    //Chama a função para atualizar o filme no BD
                    let result = await filmeDAO.updateFilme(filme)

                    if (result) {
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                        message.DEFAULT_MESSAGE.response = filme //envia os dados do filme no response, para o usuário visualizar

                        return message.DEFAULT_MESSAGE //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500 (MODELO)
                    }
                } else {
                    return validar //400 de validação dos campos do banco de dados
                }
            } else {
                return resultBuscarFilme //400(id inválido) ou 404(não encontrado) ou 500 (contraller e model)
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }


    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller 
    }
}

//função para retornar todos os filmes
const listarFilmes = async function(){

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json

    try {

        //chama a função do DAO para retornar a lista de todos os filmes
        let result = await filmeDAO.selectAllFilme()

        //conferindo retorno do resulto para decidir qual mensagem mandar
        if(result){

            //verificando se o ARRAY está vazio (se for maior do que zero, ele envia o "200" se não, ele envia o "404")
            if(result.length > 0){
                //personalizando o cabeçalho com a mensagem de sucesso
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filme = result

                return message.DEFAULT_MESSAGE //retorna o cabeçalho com o "result" que contém os dados do filme

            //se estiver vazio ele retorna o "404"
            }else{
                return message.ERROR_NOT_FOUND //404
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
        }
        
    } catch (error) {
       return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//função para buscar um filme pelo id
const buscarFilmeID = async function(id){
    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json

    try {
        //tratando o id, para não mandar conteúdos errados pro banco
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST //400
        
        //se o id estiver no formato correto ele ennvia pro DAO
        }else{
            let result = await filmeDAO.selectByIdFilme(id) //enviando o id pro DAO concluir o script

            //se o resultado estiver algo ele continua o programa
            if(result){

                //se o resultado for um ARRAY maior do que zero
                if(result.length > 0){
                    //editando cabeçalho
                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme = result

                    return message.DEFAULT_MESSAGE //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }

            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }

        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//conteúdo do dia que eu faltei
//função para excluir um filme
const excluirFilme = async function(id){
    
    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json

    try {
        //validação do erro 400 e 404
        let resultBuscarID = await buscarFilmeID(id)

        //se o status for verdadeiro ele continua
        if(resultBuscarID.status){
            //chamar a função do DAO para excluir o filme
            let result = await filmeDAO.deleteFilme(id)

            if(result){
                return message.SUCCESS_DELETED_ITEM //200 registro excluido
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }
        }else{
            return resultBuscarID //400 ou 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 
    }
}

//função para validar todos os dados de filmes (se é obrigatório, quantidade de letras, números e etc)
const validarDados = async function(filme){

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json


    // se o "filme.nome" (conteúdo do Json) vier vazio ou "null" ou undefined ou com mais caracteres do que é permitido (.lenght -> conta a quantidade de caracteres)
    if(filme.nome == undefined || filme.nome == "" || filme.nome == null || filme.nome.length > 80){

        //Criando um novo atributo no Json de mensagem para personalizar conforme o erro (NESSE CASO O ERRO É 400)
        message.ERROR_BAD_REQUEST.field = "[NOME] INVALIDO"
        return message.ERROR_BAD_REQUEST

    }else if(filme.data_lancamento == undefined || filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento.length != 10){ // != -> diferente 

        message.ERROR_BAD_REQUEST.field = "[DATA_LANCAMENTO] INVALIDO"
        return message.ERROR_BAD_REQUEST

    }else if(filme.duracao == undefined || filme.duracao == "" || filme.duracao == null || filme.duracao.length < 5){

        message.ERROR_BAD_REQUEST.field = "[DURACAO] INVALIDA"
        return message.ERROR_BAD_REQUEST

    }else if(filme.sinopse == undefined || filme.sinopse == "" || filme.sinopse == null){

        message.ERROR_BAD_REQUEST.field = "[SINOPSE] INVALIDA"
        return message.ERROR_BAD_REQUEST

    }else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3 ){ //isNaN -> se vier algo que não seja um número

        message.ERROR_BAD_REQUEST.field = "[AVALIACAO] INVALIDA"
        return message.ERROR_BAD_REQUEST

    }else if(filme.valor == undefined || filme.valor == "" || filme.valor == null || filme.valor.split(".")[0].length > 3 || isNaN(filme.valor)){ //.split(".") -> Transforma o número em um ARRAY, permitindo contar a parte decimal separadamente 

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
    listarFilmes,
    buscarFilmeID,
    atualizarFilme,
    excluirFilme
}