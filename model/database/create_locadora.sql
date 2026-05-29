-- =======================================================
-- CREATE DAS TABELAS (LOCADORA)
-- =======================================================

-- Criar o database do Projeto
create database db_filmes_2026_manha;

-- Entrar no database do Projeto
use db_filmes_2026_manha;



-- =======================================================
-- CREATE DAS TABELAS PRINCIPAIS (LOCADORA)
-- =======================================================


-- TABELA DE FILMES
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



-- TABELA DE GENEROS
create table tbl_genero (
	id		int not null primary key auto_increment,
    genero	varchar(30) not null
);



-- TABELA DE DIRETORES
create table tbl_diretor (
	id					int not null primary key auto_increment,
    nome				varchar(90) not null,
    nacionalidade		varchar(30) not null,
    data_nascimento		date not null,
    biografia			text
);



-- TABELA DE CLASSIFICAÇÕES
create table tbl_classificacao (
	id				int not null primary key auto_increment,
    sigla			varchar(4) not null,
    classificacao	varchar(50) not null,
    descricao		varchar(70) not null
);



-- TABELA DE ATORES
create table tbl_ator (
	id				int not null primary key auto_increment,
    nome			varchar(90)	not null,
    nacionalidade	varchar(30) not null,
    data_nascimento	date not null,
    biografia		text
);



-- =======================================================
-- CREATE DAS TABELAS INTERMEDIÁRIAS (LOCADORA)
-- =======================================================


-- TABELA DE CLASSIFICAÇÃO E FILME
create table tbl_classificacao_filme (
	id					int not null primary key auto_increment,
    id_classificacao	int not null,
    id_filme			int not null,
    
    constraint 		FK_CLASSIFICACAO_CLASSIFICACAOFILME
    foreign key		(id_classificacao)
    references		tbl_classificacao(id),
    
	constraint 		FK_FILME_CLASSIFICACAOFILME
    foreign key		(id_filme)
    references		tbl_filme(id)
);



-- TABELA DE GENERO E FILME
create table tbl_genero_filme (
	id			int not null primary key auto_increment,
    id_genero 	int not null,
    id_filme	int not null,
    
    constraint 		FK_GENERO_GENEROFILME
    foreign key		(id_genero)
    references		tbl_genero(id),
    
	constraint 		FK_FILME_GENEROFILME
    foreign key		(id_filme)
    references		tbl_filme(id)
);



-- TABELA DE DIRETOR E FILME
create table tbl_diretor_filme (
	id				int not null primary key auto_increment,
    id_diretor		int not null,
    id_filme		int not null,
    
    constraint		FK_DIRETOR_DIRETORFILME
    foreign key		(id_diretor)
    references		tbl_diretor(id),
    
    constraint		FK_FILME_DIRETORFILME
    foreign key		(id_filme)
    references		tbl_filme(id)

);



-- TABELA DE ATOR E FILME
create table tbl_ator_filme (
	id				int not null primary key auto_increment,
    id_ator			int not null,
    id_filme		int not null,
    
    constraint		FK_ATOR_ATORFILME
    foreign key		(id_ator)
    references		tbl_ator(id),
    
    constraint		FK_FILME_ATORFILME
    foreign key		(id_filme)
    references		tbl_filme(id)

);
