const mongoose = require('mongoose')
require('../models/contacts')
const Contacts = mongoose.model('contacts')

exports.createContact = function(req, res, next) {

  new Contacts(req.body).save(function(err) {
  	if (err) throw err;
  	res.json({status:true, info: 'contact create success'})
  })

}
