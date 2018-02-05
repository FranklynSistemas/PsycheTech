'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getHash = require('../helpers/crypto').hash

let AdminSchema = new Schema({
  name: {
    type: String
  },
  photo: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  modified: {
    type: Date
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  }
})

const preSave = function(next) {
  let self = this
  console.log('Entra', self)
  self.modified = Date().now
  if (self.email) {
    self.email = self.email.toLowerCase()
  }


  if (self.password) {
    getHash(self.password, function(err, hash, salt) {
      if (err) {
        throw err
      } else {
        self.salt = salt
        self.hash = hash
        self.password = ''
      }
      next();
    });
  } else {
    next()
  }
}

AdminSchema.methods.validPassword = function(password, callback) {
  const self = this
  console.log('validPassword')
  getHash(password, self.salt, function(err, hash) {
    if (hash === self.hash) {
      callback(true)
    } else {
      callback(false)
    }
  })
}

AdminSchema.pre('save', preSave)

let Admin = mongoose.model('admins', AdminSchema)

module.exports = Admin
