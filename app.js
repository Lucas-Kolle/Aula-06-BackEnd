
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

//cadastrar novo filme
app.post("/v1/senai/locadora/filme", bodyParserJSON, async function(request, response){ //colocar "async" pra ele poder conversar com o await / colocar o "bodyParserJSON" para deixar o formato como Json do que foi recebido "dados do filme"
    
    //recebe o conteúdo dentro do body da requisição
    let dados = request.body

    //recebe o content type da requisição, para validar se é um JSON
    let contentType = request.headers['content-type']

    // CONFERINDO CHEGADA
    // console.log("Conferindo se chega (APP)")
    // console.log(dados)

    let result = await controllerFilme.inserirNovoFilme(dados, contentType) //chama a função inserir dados e passa a variável "dados"

    //mandando as respostas
    response.status(result.status_code) //manda só o código do Json
    response.json(result) //manda o Json completo
})

//listar dados da tabela de filmes 
app.get("/v1/senai/locadora/filme", async function(request, response){

    //pede os dados para controller e aguarda a resposta
    let result = await controllerFilme.listarFilmes()

    response.status(result.status_code)
    response.json(result)
})

//buscar filme pelo id 
app.get("/v1/senai/locadora/filme/:id", async function(request,response){ //o id deve ser enviado via parametro pois é uma PK, toda PK deve ser enviada via parametro

    //recebendo o id
    let id = request.params.id

    //enviando para controller
    let result = await controllerFilme.buscarFilmeID(id)

    //não precisa tratar nada, pois a controller já tratou tudo

    response.status(result.status_code)
    response.json(result)
})

//conteúdo do dia que eu faltei (daqui até o "delete")
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição, para voltar se é JSON
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe ps dadps dp body, que serão modificados no BD
    let dados = request.body

    //Chama a função para atualizar o filme, devemos 

    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function (request, response){
    let id = request.params.id
    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})



//iniciando uma API para receber requisições
app.listen(8080, function(){ //decidindo a porta para saída do conteúdo
    console.log("API funcionando e aguardando requisições...") //vai mostrar no terminal que a API já está funcionando
})