# API

[![Build Status](https://codeship.com/projects/69ae5cc0-9e39-0133-d4d4-2a763bc2b06b/status?branch=master)](https://codeship.com/projects/127714)
[![Deployment Status](https://mrprompt.deploybot.com/badge/34534836039204/60550.svg)](http://deploybot.com)

### Instalação

Antes de rodar aplicação, são necessárias configurações para as variáveis de ambiente - valore entre parênteses é o padrão:

```
NODE_IP (127.0.0.1)
NODE_PORT (8080)
DB_USERNAME (admin)
DB_PASSWORD (admin)
DB_HOST (127.0.0.1)
DB_PORT (27017)
DB_NAME (test)
PASSWORD_SALT
``` 

Logo após tudo configurado, basta instalar as dependências

```
npm install
```


### Rodando

```
npm start
```


### Testes

Para os testes unitários, é utilizado o Mocha.

**ATENÇÃO**
Os testes utilizam as mesmas variáveis de ambiente da aplicação, então, para que não ocorra perda de dados, sempre
sobrescreva as variáveis para configurar o ambiente o banco de dados correto ANTES de executar os testes.

```
npm test
```


