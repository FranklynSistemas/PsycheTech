const express = require('express')
const router = express.Router()
const admins = require('../controllers/admins')
const contacts = require('../controllers/contacts')
const articles = require('../controllers/articles')



router.post('/createContact', contacts.createContact)

// Routes Articles
router.post('/createArticle', articles.createArticle)
router.get('/getArticles', articles.getArticles)


// Admin
router.post('/login', admins.login)
router.post('/createAdmin', admins.createAdmin)

// Angular Manejará el Frontend
router.get('*', function(req, res) {						
	res.sendfile('../public/index.html')			
});


module.exports = router
