const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServicesSchema = new Schema({
  type: {
    type: String // personas o empresas-e-instituciones
  },
  title: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  content: {
    type: String
  },
  price: {
    type: Number
  },
  medium: {
    type: Array
  },
  bost: {
    type: Number
  },
  live: {
    type: Boolean
  }
})

let Services = mongoose.model('services', ServicesSchema)

module.exports = Services
