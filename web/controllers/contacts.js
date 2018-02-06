const mongoose = require('mongoose')
require('../models/contacts')
const Contacts = mongoose.model('contacts')

exports.createContact = async(req, res, next) => {

  try {

    const contact = await new Contacts(req.body)
      .save()

    res.json({
      status: true,
      info: 'contact create success'
    })


  } catch (error) {
    res.json({
      status: false,
      info: 'error created contact'
    })
  }

}

exports.getContacts = async(req, res, next) => {
  try {
    const contacts = await Contacts.find()

    res.json({
      status: true,
      contacts: contacts,
      info: 'without errors'
    })
  } catch (err) {
    res.json({
      status: false,
      info: 'error get contacts'
    })
  }
}
