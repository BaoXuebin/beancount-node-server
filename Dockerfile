# syntax=docker/dockerfile:1
FROM node:12 AS build

# install beancount
RUN apt-get update || : && apt-get install python3.5 python3-pip -y
RUN pip3 install beancount -i https://pypi.tuna.tsinghua.edu.cn/simple

WORKDIR /app
COPY package* server.js app.js ./
COPY config ./config
COPY example ./example
COPY js ./js
COPY public/icons ./public/default_icons
COPY public ./public
RUN yarn install

# port=3001
CMD [ "node", "server.js" ]