# syntax=docker/dockerfile:1
FROM node:12 AS build

# install beancount
RUN apt-get update || : && apt-get install python -y
RUN python -V
RUN pip -V
RUN pip install beancount -i https://pypi.tuna.tsinghua.edu.cn/simple

WORKDIR /app
COPY package* yarn.lock ./
RUN echo 'Install dependencies'
RUN yarn install
COPY config ./config
COPY js ./js
COPY public ./public
COPY init.js server.js ./
RUN echo 'Success init project'
RUN node init.js

# port=3001
CMD [ "node", "server.js" ]