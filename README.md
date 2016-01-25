# API

API de Produtos para empresas de pequeno e médio porte, que queiram uma forma simples de ter um site com vendas on-line.

### Pré Requisitos
- Sendgrid (Envio de e-mails de aviso)
- Cloudinary (Armazenamento)
- Pagar-me (Pagamentos)

### Instalação

Antes de rodar aplicação, são necessárias configurações para as variáveis de ambiente - valores entre parênteses é o padrão:

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


