
-- =======================================================
-- SCRIPTS PARA REALIZAR O CRUD DAS TABELAS (LOCADORA)
-- =======================================================


/* INSERT DAS TABELAS */


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



--




#Atualizando dados da tabela de genero
update tbl_genero set 
	genero = "Drama Teste 3"
where id = 12;

#Deletando um item da tabela
delete from tbl_genero where id = 4;

select * from tbl_genero;







update tbl_diretor set 
	nome 			= "teste",
    nacionalidade	= "teste",
    data_nascimento = "2028-02-20",
    biografia		= "teste"
where id = 1;
    
    select * from tbl_diretor;










delete from tbl_genero_filme;

select * from tbl_filme;
select * from tbl_genero_filme;

#Vizualizar tabelas
show tables;

#Vizualizar a descrição da tabela
desc tbl_classificacao;

#Excluir tabela
drop table tbl_classificacao_filme;

# Vizualizar conteúdos da tabela
select * from tbl_genero;

#Permite vizualizar o conteudo de uma tabela, ordenando pelo id decrescente
select * from tbl_filme order by id desc;

# Apagando todos os filmes com o id maior que zero
delete from tbl_filme where id > 0;



