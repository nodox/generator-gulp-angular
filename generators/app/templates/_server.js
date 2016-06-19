'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
const User = require('./server/models/user.js');
const JWT = require('jsonwebtoken');
const jwtAuth = require('hapi-auth-jwt');
const Boom = require('boom');
const mongoose = require('mongoose');
const routes = require('./server/routes');

const DB_NAME = 'test';
const DB_URI = 'mongodb://localhost:27017/' + DB_NAME;

mongoose.connect(DB_URI, _ => {
  server.connection({
    host: 'localhost',
    port: process.env.PORT || 8080
  });

  const validate = (decoded, req, cb) => {
    let err;
    User.findOne({_id: decoded._id }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return cb(err, false);
      }

      req.user = user;
      return cb(err, true);
    });
  };

  server.register(require('hapi-auth-jwt2'), (err) => {
    server.auth.strategy('token', 'jwt', {
      key: 'xxx',
      validateFunc: validate,
    });
  });

  routes.forEach(route => server.route(route) );

  const options = {
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        file: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }/*, {
            module: 'good-file',
            args: ['']
        }*/],
        http: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*' }]
        }, {
            module: 'good-http',
            args: ['http://prod.logs:3000', {
                wreck: {
                    headers: { 'x-api-key': 12345 }
                }
            }]
        }]
    }
  };

  server.register({ register: require('good'), options }, (err) => {
    if (err) throw err;
  });


  // Allow angular to handle routing on the the frontend
  server.register(require('inert'), (err) => {

    if (err) {
      throw err;
    }

    /** 
     * FIXME: Add robust production setup
     */
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'dist'
        }
      }
    });

    server.start((err) => {

      if (err) {
        throw err;
      }

      console.log('Server running at ', server.info.uri);
    });
  });
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + DB_URI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected. RESTful requests to server will not be available.'); 
});
