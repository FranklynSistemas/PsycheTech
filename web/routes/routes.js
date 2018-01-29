const express = require('express')
const router = express.Router()
const contacts = require('../controllers/contacts')

// Angular Manejará el Frontend
router.get('*', function(req, res) {						
	res.sendfile('../public/index.html')			
});

router.post('/createContact', contacts.createContact)

module.exports = router
