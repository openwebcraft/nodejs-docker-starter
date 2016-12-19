'use strict';

// required environment variables
[
  'NODE_ENV',
  'HOST',
  'PORT',
  'MONGODB_URI'
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`)
  }
})

const config = {
  env: process.env.NODE_ENV,
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT)
  },
  services: {
    mongodb: {
      url: process.env.MONGODB_URI
    }
  }
  // ...
}

module.exports = config;