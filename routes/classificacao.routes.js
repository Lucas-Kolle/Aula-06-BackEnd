//importando o express
const express = require("express")
const bodyParser    = require("body-parser")

//criando um objeto para manipular dados do body da API em formato Json
const bodyParserJSON = bodyParser.json()

//cria um objeto de rota para o arquivo
const router = express.Router()

//importando o arquivo da controller, para pode enviar os dados para serem processados
const controllerClassificacao = require("../controller/classificacao/controller_classificacao.js")

/* CRUD DA TABELA DE CLASSIFICACAO */
//adicionar novo classificacao
router.post("/", bodyParserJSON, async function(request, response){

    //recebendo dados 
    let dadosClassificacao = request.body

    //pegando o content-type
    let contentType = request.headers['content-type']

    //enviando para a controller
    let result = await controllerClassificacao.inserirNovaClassificacao(contentType, dadosClassificacao)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//listar todos os classificacao
router.get("/", async function(request, response){

    //fazendo requisição
    let result = await controllerClassificacao.listarClassificacao()

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//buscasr um classificacao específico
router.get("/:id", async function(request, response){

    //recebendo o id
    let idClassificacao = request.params.id

    //enviando para o banco
    let result = await controllerClassificacao.buscarClassificacaoId(idClassificacao)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})

//atualizar classificacao
router.put("/:id", bodyParserJSON, async function(request, response){

        //recebendo o id e o conteúdo para serem enviados
        let idClassificacao = request.params.id
        let dadosClassificacao = request.body
        let contentType = request.headers['content-type']
    
        //enviando os dados para controller
        let result = await controllerClassificacao.atualizarClassificacao(idClassificacao, contentType, dadosClassificacao)
    
        //enviando para o usuário
        response.status(result.status_code)
        response.json(result)
    
})

//deletar classificacao
router.delete("/:id", async function(request, response){
    
        //recebendo o id
        let idClassificacao = request.params.id

        //enviando id para realizar o delete
        let result = await controllerClassificacao.excluirClassificacao(idClassificacao)
    
        //devolvendo mensagem e status-code
        response.status(result.status_code)
        response.json(result)
})



//exportando o router para ser utilizado no arquivo principal da API
module.exports = router