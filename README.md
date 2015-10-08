# API

### Instalação


```
npm install
```


Configurando

A API foi desenvolvida para rodar na OpenShift, então, é necessário configurar as variáveis de ambiente para rodar 
 localmente.
 

```bash
#!/bin/sh

export OPENSHIFT_MONGODB_DB_USERNAME="admin"
export OPENSHIFT_MONGODB_DB_PASSWORD="q25er9zBvGun"
export OPENSHIFT_MONGODB_DB_HOST="127.0.0.1"
export OPENSHIFT_MONGODB_DB_PORT="27017"
export OPENSHIFT_APP_NAME="grupo"
export OPENSHIFT_NODEJS_IP="127.0.0.1"
export OPENSHIFT_NODEJS_PORT="8000"

```


### Rodando

```
npm start
```


### Testes

Para os testes unitários, é utilizado o Mocha.


```
npm test
```