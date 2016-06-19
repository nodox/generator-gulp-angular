'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const BCrypt = require('bcrypt');
const validator = require('validator');

function toLower(str) {
  return str.toLowerCase();
}

let schema = new mongoose.Schema({
  first_name: 'string',
  last_name: 'string',
  email: {
    type: 'string',
    set: toLower,
    required: true,
    index: { unique: true},
    validate: function(val) {
      return validator.isEmail(val)
    },
    message: 'invalid email'
  },
  hashed_password: 'string',
  token: 'string',
});

schema.methods.authenticate = function(password) {
  return BCrypt.compareSync(password, this.hashed_password);
}

schema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.hashed_password = BCrypt.hashSync(password, BCrypt.genSaltSync(10), null);
  })
  .get(function() {
    return this._password;
  })


schema.plugin(timestamps);

module.exports = mongoose.model('User', schema);
