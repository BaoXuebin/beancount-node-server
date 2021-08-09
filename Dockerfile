# syntax=docker/dockerfile:1
FROM node:12 AS build

# install beancount
RUN apt-get update || : && apt-get install python -y
RUN pip install beancount

WORKDIR /app
COPY package* yarn.lock ./
RUN yarn install
COPY config ./config
COPY js ./js
COPY public ./public
COPY init.js server.js ./
RUN node init.js

# port=3001
CMD [ "node", "server.js" ]