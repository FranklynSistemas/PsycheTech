const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getHash = require('../helpers/crypto').hash

const preSave = (next) => {
  let self = this
  console.log('Entra', self)
  self.modified = Date().now()
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


AdminSchema.methods.validPassword = async(password) => {
  try {
    const hash = await getHash(password, this.salt)
    if (hash === this.hash) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log('error valid password ', error)
    return false
  }

}

AdminSchema.pre('save', preSave)

const Admin = mongoose.model('admins', AdminSchema)
