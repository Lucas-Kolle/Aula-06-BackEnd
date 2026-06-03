-- =======================================================
-- SCRIPTS PARA REALIZAR O CRUD DAS TABELAS (LOCADORA)
-- =======================================================
-- Criar o database do Projeto
create database db_filmes_2026_manha;

-- Entrar no database do Projeto
use db_filmes_2026_manha;

/* INSERT DAS TABELAS */


-- =======================================================
-- INSERT DAS TABELAS PRINCIPAIS (LOCADORA)
-- =======================================================


-- TABELA DE FILMES
insert into tbl_filme (
	nome, 
	data_lancamento, 
	duracao, 
	sinopse, 
	avaliacao, 
	valor, 
	capa
)
values(
	'Super Mario Galaxy: O Filme',
	'2026-04-02',
	'01:39:00',
	'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
	'3',
	'50.70',
	'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg'
);



-- TABELA DE GENERO
insert into tbl_genero (
	genero
)
values (
	"Romance"
);



-- TABELA DE DIRETORES
insert into tbl_diretor (
	nome,
    nacionalidade,
    data_nascimento,
    biografia
)
values(
	"José",
    "Brasileiro",
    "2023-01-22",
    "asdasdasdasfafasdasasd"
);



-- TABELA DE CLASSIFICAÇÕES
insert into tbl_classificacao (
	sigla,
    classificacao,
    descricao
)
values (
	"14",
    "Não Recomendado para menores de 14 anos",
    "askdhakjsfhakdhaskjdhasjdhkjashdkbjshadj"
);



-- TABELA DE ATORES
insert into tbl_ator (
	nome,
    nacionalidade,
    data_nascimento,
    biografia
)
values (
	"Marcel",
    "Tailandes",
    "1998-09-13",
    "asdljafjrirjfkjdlkasnkcndkslkdjfirirjkdjaeasnaskln"
);


-- =======================================================
-- INSERT DAS TABELAS INTERMEDIÁRIAS (LOCADORA)
-- =======================================================


-- TABELA DE GENERO E FILME
insert into tbl_genero_filme (
	id_genero,
    id_filme
)
values (
	2,
    20
);



-- TABELA DE DIRETOR E FILME
insert into tbl_diretor_filme (
	id_diretor,
    id_filme
)
values (
	1,
    32
);



-- TABELA DE CLASSIFICAÇÃO E FILME
insert into tbl_classificacao_filme (
	id_classificacao,
    id_filme
)
values (
	2,
    31
);



-- TABELA DE ATOR E FILME
insert into tbl_ator_filme (
	id_ator,
    id_filme
)
values (
	1,
    31
);

select * from tbl_ator;
show tables;
desc tbl_classificacao_filme;