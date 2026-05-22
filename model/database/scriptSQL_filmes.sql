#Criar um database
create database db_filmes_2026_manha;

#Vizualizar os databases criados
show databases;

#Entrar em um database
use db_filmes_2026_manha;

#Criar uma tabela
create table tbl_filme (
	id 				int not null primary key auto_increment,
    nome 			varchar(100) not null,
    data_lancamento date not null,
    duracao 		time not null,
    sinopse 		text not null,
    avaliacao 		decimal(3,2) default null,
    valor 			decimal(5,2) not null default 0,
    capa 			varchar(255)
);

#Inserir dados
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

#criando tabela de genero
create table tbl_genero (
	id		int not null primary key auto_increment,
    genero	varchar(30) not null
);

#Inserindo dados na tabela de genero
insert into tbl_genero (
	genero
)
values (
	"Romance"
);

#Atualizando dados da tabela de genero
update tbl_genero set 
	genero = "Drama Teste 3"
where id = 12;

#Deletando um item da tabela
delete from tbl_genero where id = 4;

select * from tbl_genero;

#Criando tabela de diretor
create table tbl_diretor (
	id					int not null primary key auto_increment,
    nome				varchar(90) not null,
    nacionalidade		varchar(30) not null,
    data_nascimento		date not null,
    biografia			text
);

#Inserindo dados
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

update tbl_diretor set 
	nome 			= "teste",
    nacionalidade	= "teste",
    data_nascimento = "2028-02-20",
    biografia		= "teste"
where id = 1;
    
    select * from tbl_diretor;

#Criando tabela de classificacao
create table tbl_classificacao (
	id				int not null primary key auto_increment,
    sigla			varchar(4) not null,
    classificacao	varchar(50) not null,
    descricao		varchar(70) not null
);

#Inserindo valores
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

#Criando tabela de ator
create table tbl_ator (
	id				int not null primary key auto_increment,
    nome			varchar(90)	not null,
    nacionalidade	varchar(30) not null,
    data_nascimento	date not null,
    biografia		text
);

#Adicionando dados
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



