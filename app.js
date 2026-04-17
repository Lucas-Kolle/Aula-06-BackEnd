
/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de filmes
 * Data: 17/04/2026
 * Autor: Lucas Kolle
 * Versão: 1.0.4.26
 *******************************************************************************************************************************************************************************************/
 
/*
    Instalação do EXPRESS       - npm install express --save
        Dependencia responsável pela utilização do protocolo HTTP para criar uma API (A istalação deve ser feita na dominancia do app.js (raiz do projeto))

    Instalação do CORS          - npm install cors --save
        Dependencia responsável pelas configurações a serem realizadas para permissão de acesso da API (A istalação deve ser feita na dominancia do app.js (raiz do projeto))

    Instalação do BODY-PARSER    - npm install body-parser --save
*/

//importando as dependencias
const express       = require("express")
const cors          = require("cors")
const bodyParser    = require("body-parser")

//import das controllers do projeto
const controllerFilme = require("./controller/filme/controller_filme.js")

//criando um objeto para manipular dados do body da API em formato Json
const bodyParserJSON = bodyParser.json()

//criando um objeto para manipular o express
const app = express()

//conjunto de permissões a serem aplicados no CORS da API
const corsOption = {
    origin: ["*"], //A origrm da requisição (definido por meio do IP (192.168...), quando colocado o "*" fica livre para todas as máquinas)
    methods: "GET, POST, PUT, DELETE, OPTION", //são os verbos permitidos para serem utilizados na API
    allowedHeaders: ["content-type", "Autorizations"] //são permissões do cabeçalho do CORS
}

//configurando as permissões da API atravez do CORS
app.use(cors(corsOption))

//Criando os EndPoints
app.post("/v1/senai/locadora/filme", bodyParserJSON, async function(request, response){ //colocar "async" pra ele poder conversar com o await / colocar o "bodyParserJSON" para deixar o formato como Json
    
    //recebe o conteúdo dentro do body da requisição
    let dados = request.body

    let result = await controllerFilme.inserirNovoFilme(dados) //chama a função inserir dados e passa a variável "dados"

    //mandando as respostas
    response.status(result.status_code) //manda só o código do Json
    response.json(result) //manda o Json completo
})



//iniciando uma API para receber requisições
app.listen(8080, function(){ //decidindo a porta para saída do conteúdo
    console.log("API funcionando e aguardando requisições...") //vai mostrar no terminal que a API já está funcionando
})