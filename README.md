# nodejs-docker-starter

A bare bones containerized ([Docker][Docker]) development environment for Node.js.

## Overview

A simple [hapi.js](https://hapijs.com)-based web application and a [MongoDB](https://www.mongodb.com/) make up a multi-container Docker application.

## "Infrastructure as Code"

The setup is aimed at providing both, a local development enviroment and optimized developer experience as well as support for building deployment artifacts for a Continuous Integration and Continuos Deployment pipeline.

We`re using [docker-compose](https://docs.docker.com/compose/) to define and run a multi-container/ multi-service Docker applications:

1. `web` Node.js hapi web application
2. `db` MongoDB database

## Assumption and Prerequisites

*nix environment, i.e. Linux or macOS.

[Docker][Docker] installed, check w/ `docker --version`.

[docker-compose](https://docs.docker.com/compose/) installed, check w/ `docker-compose --version`.

## Usage

The multi-container environment is composed as follows:

1. The individual services are configured in the file `docker-compose-services.yml`, looked down, bare-minimal configuration. For convenience the default `docker-compose` file name is used.

2. For the development enviroment the services in 1. are extended in the file `docker-compose.yml`, basically adding additional development juice: mapping the local directory, adding `nodemon` w/ debug option, etc.

3. For a 2nd enviroment, here *integration* the services in 1. are extended in the file `docker-compose-integration.yml`, using pre-build images.

### Development Enviroment - `docker-compose.yml`

- `nodemon`
- `NODE_ENV=development`
- Ports exposed to host:
  - Web: `8000`
  - Node.js debug: `5858`
  - MongoDB: `27017`

Build the container for the web application, onetime... or if you make changes to the `Dockerfile` (e.g. installing system packages or global NPM modules):

```shell
docker-compose build
```

Start the development enviroment, w/ logs from all services on stdout.

```shell
docker-compose up
```

... to terminate: `Ctrl+C`.

Start the development enviroment as a daemon:

```shell
docker-compose up -d
```

... and point your browser to the url [http://localhost:8000](http://localhost:8000).

To tail the log files for the web application:

```shell
docker-compose logs -f web
```

To install a [NPM](http://npmjs.com) module. e.g. [hapi](https://www.npmjs.com/package/hapi), into the **RUNNING** web container:

```shell
docker-compose exec web npm install hapi --save
```

To install a [NPM](http://npmjs.com) module. e.g. [mongodb](https://www.npmjs.com/package/mongodb), into the **STOPPED** web container:

```shell
docker-compose run web npm install mongodb --save
```

To stop the enviroment:

```shell
docker-compose stop
```

### Integration Enviroment - `docker-compose-integration.yml`

- `pm2`
- `NODE_ENV=production`
- Ports exposed to host:
  - Web: `80`

Assuming there is a automated build from Git commits set up, similiar to [Docker Hub's Automated Builds](https://docs.docker.com/docker-hub/builds/).

... or even manually:

```shell
cd app/web; \
  docker build -t matthiasg/nodejsdockerstarter-web:latest .; \
  docker push matthiasg/nodejsdockerstarter-web:latest
```

Start the integration enviroment, w/ logs from all services on stdout.

```shell
docker-compose -f docker-compose-integration.yml up
```

... to terminate: `Ctrl+C`.

Start the integration enviroment as a daemon:

```shell
docker-compose -f docker-compose-integration.yml up -d
```

... and point your browser to the url [http://localhost](http://localhost).

To tail the log files for the web application:

```shell
docker-compose -f docker-compose-integration.yml logs -f web
```

[Docker]: http://docker.com/