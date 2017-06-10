FROM node:6.2

MAINTAINER Thiago Paes <mrprompt@gmail.com>

ENV APP=/api ENV=development NODE_ENV=development

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR $APP

VOLUME $APP

EXPOSE 8080
