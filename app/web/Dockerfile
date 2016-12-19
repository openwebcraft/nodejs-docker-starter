FROM node:boron-slim
# "boron" as of writing current Node's' LTS release tag, i.e. v6.9.2

MAINTAINER "Matthias Geisler" <matthias@openwebcraft.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install

RUN npm install pm2@latest -g

CMD [ "npm", "start" ]