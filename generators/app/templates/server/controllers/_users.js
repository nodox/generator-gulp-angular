'use strict';
const path = require('path'),
      User = require(path.join(__dirname, '../models/user.js')),
      JWT = require('jsonwebtoken'),
      Boom = require('boom');


module.exports = {

  create: (req, res) => {
    const errors = {
      email_error: 'email is required',
      password_error: 'password is required',
      password_confirmation_error: 'password confirmation is required'
    };

    if (req.payload) {
      ['email', 'password', 'password_confirmation'].forEach( field => {
        if (!req.payload[field])
          return res(Boom.badData(errors[`${field}_error`]));
      });

      if (req.payload['password'] !== req.payload['password_confirmation']) {
        return res(Boom.badData('password and password confirmation must match'));
      }

      let user = new User();
      user.email = req.payload['email'];
      user.password = req.payload['password'];
      user.save(function(err, user) {
        if (err) {
          if (err.code ===  11000) {
            return res(Boom.badData('user already exists'));
          } else {
            return res(Boom.badData('invalid email'));
          }
        }
        user.token = JWT.sign({ _id: user._id }, 'xxx');
        user.save().then( _ => {
          return res({token: user.token});
        });
      });
    }
  },

  getUser: (req, res) => {
    let query = User.findOne({ '_id': req.user._id});
    query.exec((err, results) => {
      return res(results);
    });
  },

  get: (req, res) => {
    let query = User.find();
    query.exec((err, results) => {
      return res(results);
    });
  }
}
