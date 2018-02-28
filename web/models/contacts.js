const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactsSchema = new Schema({
  type: {
    type: String
  },
  nameEntity: {
    type: String
  },
  name: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  email: {
    type: String
  },
  message: {
    type: String
  },
  phone: {
    type: Number
  },
  topic: {
    type: String
  },
  availability: {
    type: String
  },
  typeVideoCall: {
    type: String
  },
  time: {
    type: String
  },
  date: {
    type: String
  },
  ocupation: {
    type: String
  }
})

const contacts = mongoose.model('contacts', ContactsSchema)
