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

}

//função para atualizar um genero
const atualizarGenero = async function(genero, contentType, id){

}

//função para listar todos os generos
const listarGeneros = async function(){

}

//função para buscar um genero pelo id
const buscarGeneroID = async function(id){

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
