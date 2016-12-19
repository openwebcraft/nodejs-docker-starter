'use strict';

const Hapi = require('hapi');
const MongoClient = require('mongodb').MongoClient;

const config = require('./config');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: config.server.host,
    port: config.server.port
});

// Add the route
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        MongoClient.connect(config.services.mongodb.url, function (err, db) {
            if (err) {
                throw err;
            }
            return reply('Connected successfully to MongoDB server');

            db.close();
        });
    },
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
});

module.exports = server;