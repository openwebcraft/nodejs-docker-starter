# nodejs-docker-starter

A bare bones containerized (Docker) development environment for Node.js.

## Overview

A simple [hapi.js](https://hapijs.com)-based web application and a [MongoDB](https://www.mongodb.com/) make up a multi-container Docker application.

## "Infrastructure as Code"

The setup is aimed at providing both, a local development enviroment and optimized developer experience as well as support for building deployment artifacts for a Continuous Integration and Continuos Deployment pipeline.

We`re using [docker-compose](https://docs.docker.com/compose/) to define and run a multi-container Docker applications.

## Assumption and Prerequisites

*nix environment, i.e. Linux or macOS.

[Docker](http://docker.com) installed, check w/ `docker --version`.

[docker-compose](https://docs.docker.com/compose/) installed, check w/ `docker-compose --version`.

## Usage

Build the container for the web application:

```shell
docker-compose build
```

Start the development enviroment, w/ logs from all services on stdout:

```shell
docker-compose up
```

... to terminate: `Ctrl+C`.

Start the development enviroment as a daemon:

```shell
docker-compose up -d
```

... and point your browser to the url [http://localhost](http://localhost).

To tail the log files for the web application:

```shell
docker-compose logs -f web
```

To install a [NPM](http://npmjs.com) module. e.g. [hapi](https://www.npmjs.com/package/hapi):

```shell
docker-compose run web npm install hapi --save
```

To stop the enviroment:

```shell
docker-compose stop
```

**Hints:**

The `docker-compose.yml` is currently doing a `npm install --dev` everytime you start it.

If you don’t want this to happen just adjust the `command` line.