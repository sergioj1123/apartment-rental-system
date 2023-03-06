# Sistema de Alugel de Apartamentos

### Visão geral

- Introdução
- Tecnologia Usadas
- Instalação
- Pontos de Teste

**Introdução**

O projeto foi desenvolvido desde a parte do Front-end até a parte do Back-end. O mesmo possui as funcionalidades de um sistema de aluguel de apartamentos ou casas, com funções de cadastro de novos locatários no sistema (locatários devem possuir nome e CPF), novos condomínios/prédios (possuindo um nome, rua e número), por fim, novos apartamentos (possuindo número, descrição, valor de aluguel e número de cômodos). Todos os apartamentos são vinculados a um condomínio/prédio, podendo possuir ou não um inquilino.

**Tecnologias Usadas**

A parte do Front-end foi feita utilizando HTML/CSS, e também JavaScript para realizar as chamadas de requisições no Back-end.

A parte do Back-end foi realizado utilizando também o JavaScript, além do Node.js, Cors e o framework Express. O formato escolhido para o banco de dados foi o MySQL, utilizando o Sequelize para realizar a interpretação e manipulação dos dados.

**Instalação**

1. Deve-se criar um banco vazio no formato MySql com nome “sistema_aluguel” (create database sistema_aluguel);

2. É necessário possuir o Node.js instalado e configurado na máquina;

3. A rota dentro do caminho back/database/db.js deve ser inserida para realizar a comunicação com o banco de dados local, alterando o usuário “root”, “senha”, “localhost” e a porta caso necessário;

4. O servidor dentro da pasta “back” deve ser iniciado (podendo ser iniciado através do npm run start);

5. Em seguida, deve-se emular um servidor para o arquivo index.html dentro da pasta front, pois os sricpts utilizam a exportação e importação local, podendo ser barrada pelo navegador. É possível emular esse servidor utilizando a extensão “Live Server” do Vscode. Após isso, já é possível utilizar o sistema.

**Pontos de Teste**

1. Inserção de um novo locatário, com um CPF que não exista dentro do sistema e outro que já exista;

2. Inserção de um novo prédio/condomínio com nome que não exista dentro do sistema e outro que já exista;

3. Inserção de um novo apartamento:

  - Inserção sem um CPF cadastrado e com CPF cadastrado;
  - Nome do prédio/condomínio que já existam no sistema e número que ainda não exista para esse prédio;
  - Nome do prédio/condomínio que já existam no sistema e número que já exista para esse prédio e esteja alugado, outro teste para um número que não esteja alugado;
  - Nome do prédio/condomínio que não exista no sistema.

4. Alteração para alugar um apartamento com informações de um CPF que não exista no sistema, nome de prédio que não exista no sistema, número que não pertença ao prédio inserido ou já esteja alocado.
