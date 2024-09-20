CREATE DATABASE gabinet;

USE gabinet;

CREATE TABLE cidadao(
	id int primary key auto_increment,
    nome varchar(100) not null,
    data_nasc  date not null,
    rg varchar(13) not null,
    cpf varchar(14) not null unique,
    cep varchar(9) not null,
    endereco varchar(100),
    numero int not null,
    bairro varchar(30),
    cidade varchar(25),
    estado varchar(2),
    email varchar(50) not null,
    telefone varchar(14)not null);
    
CREATE TABLE funcionario(
	id int primary key auto_increment,
    nome varchar(100) not null,
    data_nasc  date not null,
    cpf varchar(14) not null unique,
    cep varchar(9) not null,
    endereco varchar(100),
    numero int not null,
    bairro varchar(30),
    cidade varchar(25),
    estado varchar(2),
    partido varchar(10),
    cargo varchar(20),
    email varchar(50) not null,
    telefone varchar(14)not null);

CREATE TABLE secretaria(
	id int primary key auto_increment,
    nome_secretaria varchar(100) not null,
    secretario varchar(100) not null,
    cpf varchar(14) not null,
    cep varchar(9) not null,
    endereco varchar(100) not null,
    numero int not null,
    bairro varchar(30) not null,
    cidade varchar(25) not null,
    estado varchar(2) not null,
    email varchar(50) not null,
    telefone varchar(14)not null);
    
    CREATE TABLE usuario(
	id int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(50) not null,
    senha varchar(14)not null);
    


CREATE TABLE solicitacao (
    id INT AUTO_INCREMENT,
    cidadao_id INT NOT NULL,
    usuario_id INT,
    data_solicitacao timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assunto VARCHAR(255) NOT NULL,
    solicitacao TEXT,
    secretaria_id INT NOT NULL,
    andamento ENUM('ABERTA', 'EM_ANALISE', 'CONCLUIDA', 'ARQUIVADA') NOT NULL DEFAULT 'ABERTA',
    CONSTRAINT pk_solicitacao PRIMARY KEY (id),
    CONSTRAINT fk_cidadao FOREIGN KEY (cidadao_id) REFERENCES cidadao(id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_secretaria FOREIGN KEY (secretaria_id) REFERENCES secretaria(id)
);

/*Exemplo de como popular as tabelas*/

INSERT INTO usuario (nome, email, senha)
VALUES
  ('Usuário 1', 'usuario1@email.com', 'senha123'),
  ('Usuário 2', 'usuario2@email.com', 'senha456');

INSERT INTO secretaria (nome_secretaria, secretario, cpf, cep, endereco, numero, bairro, cidade, estado, email, telefone)
VALUES
  ('Secretaria de Saúde', 'Pedro Santos', '11122233355', '01234567', 'Rua C', 789, 'Bairro C', 'Cidade C', 'MG', 'pedroa@email.com', '31777777777'),
  ('Secretaria de Educação', 'Ana Costa', '55566677799', '01234567', 'Rua D', 1011, 'Bairro D', 'Cidade D', 'BA', 'anaf@email.com', '71666666666');
  
  INSERT INTO cidadao (nome, data_nasc, rg, cpf, cep, endereco, numero, bairro, cidade, estado, email, telefone)
VALUES
  ('João Silva', '1980-01-01', '12345678901', '12345678900', '01234567', 'Rua A', 123, 'Bairro A', 'Cidade A', 'SP', 'joao@email.com', '11999999999'),
  ('Maria Oliveira', '1990-02-02', '98765432101', '98765432100', '01234567', 'Rua B', 456, 'Bairro B', 'Cidade B', 'RJ', 'maria@email.com', '21888888888');
  
INSERT INTO solicitacao (cidadao_id, usuario_id, assunto, solicitacao, secretaria_id, andamento)
VALUES (1, 1, 'Problema na iluminação pública', 'A iluminação da Praça Central está apagada há uma semana.', 1, 'ABERTA');


INSERT INTO solicitacao (cidadao_id, usuario_id, assunto, solicitacao, secretaria_id, andamento)
VALUES (2, 2, 'Reclamação de barulho', 'Barulho excessivo vindo de uma obra na rua X.', 2, 'EM_ANALISE');

