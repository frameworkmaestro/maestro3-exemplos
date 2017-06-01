DROP TABLE  manager_sequence;
DROP TABLE  acesso;
DROP TABLE  aluno;
DROP TABLE  funcionario;
DROP TABLE  grupo;
DROP TABLE  log;
DROP TABLE  pessoa;
DROP TABLE  setor;
DROP TABLE  transacao;
DROP TABLE  usuario;
DROP TABLE  usuario_grupo;


CREATE TABLE manager_sequence (
    sequence text,
    value integer
);

CREATE TABLE grupo (
    idgrupo integer NOT NULL primary key,
    grupo text
);

CREATE TABLE transacao (
    idtransacao integer NOT NULL primary key,
    transacao text,
    descricao text
);

CREATE TABLE pessoa (
    idpessoa integer NOT NULL primary key,
    nome text,
    cpf text,
    datanascimento integer,
    foto blob,
    email text
);


CREATE TABLE acesso (
    idacesso integer NOT NULL primary key,
    idtransacao integer references transacao(idtransacao),
    idgrupo integer references grupo(idgrupo),
    direito integer
);


CREATE TABLE aluno (
    idaluno integer NOT NULL primary key,
    matricula text,
    idpessoa integer NOT NULL  references pessoa(idpessoa)
);


CREATE TABLE funcionario (
    idfuncionario integer NOT NULL primary key,
    salario real,
    idpessoa integer NOT NULL  references pessoa(idpessoa)
);

CREATE TABLE setor (
    idsetor integer NOT NULL primary key,
    sigla text,
    nome text,
    idsetorpai integer
);

CREATE TABLE usuario (
    idusuario integer NOT NULL primary key,
    idpessoa integer NOT NULL references pessoa(idpessoa),
    idsetor integer references setor(idsetor),
    login text,
    password text,
    passmd5 text
);

CREATE TABLE log (
    idlog integer NOT NULL primary key,
    idusuario integer references usuario(idusuario),
    timestamp integer,
    descricao text,
    operacao text,
    idmodel integer
);

CREATE TABLE usuario_grupo (
    idusuario integer NOT NULL references usuario(idusuario),
    idgrupo integer NOT NULL references grupo(idgrupo),
    primary key (idusuario,idgrupo)
);

CREATE TABLE PessoaTeste (
    idPessoaTeste          INTEGER NOT NULL PRIMARY KEY,
    nome                   text,
    numeroMaximoDocumentos INTEGER NOT NULL
);

CREATE TABLE DocumentoTeste (
    idDocumentoTeste INTEGER NOT NULL PRIMARY KEY,
    idPessoaTeste    INTEGER NOT NULL references PessoaTeste(idPessoaTeste),
    nome             text,
    numero           text
);


INSERT INTO grupo VALUES (1, 'Grupo Geral');
INSERT INTO grupo VALUES (2, 'Super Grupo');

INSERT INTO pessoa VALUES (1, 'José', '123.456.789-01', '1980-01-01', NULL, 'jose@teste.com');
INSERT INTO pessoa VALUES (2, 'Bob', '457.345.234-75', '1976-03-06', NULL, 'bob@bob.com');
INSERT INTO pessoa VALUES (3, 'Aline', '974.386.721-90', '1995-01-09', NULL, 'aline@aline.com');
INSERT INTO pessoa VALUES (4, 'admin', NULL, NULL, NULL, NULL);

INSERT INTO setor VALUES (1, NULL, NULL, NULL);
INSERT INTO setor VALUES (2, 'ABC', 'AaBbCc', NULL);
INSERT INTO setor VALUES (3, 'SP', 'Setor Pequeno', 2);
INSERT INTO setor VALUES (4, 'OS', 'Outro Setor', 2);

INSERT INTO aluno VALUES (1, '34678', 2);
INSERT INTO aluno VALUES (2, '67326', 3);

INSERT INTO funcionario VALUES (1, 7568.12, 4);

INSERT INTO usuario VALUES (1, 4, 2, 'admin', 'admin', NULL);
INSERT INTO usuario VALUES (2, 1, 2, 'est', 'est12', NULL);
INSERT INTO usuario VALUES (3, 2, 2, 'bob', 'bob34', NULL);

INSERT INTO usuario_grupo VALUES (1, 2);
INSERT INTO usuario_grupo VALUES (2, 1);
INSERT INTO usuario_grupo VALUES (3, 1);

INSERT INTO manager_sequence VALUES ('seq_aluno', 3);
INSERT INTO manager_sequence VALUES ('seq_funcionario', 2);
INSERT INTO manager_sequence VALUES ('seq_grupo', 3);
INSERT INTO manager_sequence VALUES ('seq_pessoa', 5);
INSERT INTO manager_sequence VALUES ('seq_setor', 5);
INSERT INTO manager_sequence VALUES ('seq_usuario', 3);
INSERT INTO manager_sequence VALUES ('seq_acesso', 1);
INSERT INTO manager_sequence VALUES ('seq_log', 1);
INSERT INTO manager_sequence VALUES ('seq_transacao', 1);
INSERT INTO manager_sequence VALUES ('seq_pessoateste', 5);
INSERT INTO manager_sequence VALUES ('seq_documentoteste', 5);
