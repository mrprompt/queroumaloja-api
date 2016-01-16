# API

### Instalação

Antes de rodar aplicação, são necessárias configurações para as variáveis de ambiente - valore entre parênteses é o padrão:

```
NODE_IP (127.0.0.1)
NODE_PORT (8080)
OPENSHIFT_MONGODB_DB_USERNAME (admin)
OPENSHIFT_MONGODB_DB_PASSWORD (admin)
OPENSHIFT_MONGODB_DB_HOST (127.0.0.1)
OPENSHIFT_MONGODB_DB_PORT (27017)
OPENSHIFT_DATABASE_NAME (test)
SENDGRID_TOKEN 
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