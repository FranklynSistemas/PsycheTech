const express = require('express')
const router = express.Router()
const contacts = require('../controllers/contacts')
const articles = require('../controllers/articles')



router.post('/createContact', contacts.createContact)

// Routes Articles
router.post('/createArticle', articles.createArticle)
router.get('/getAllArticles', articles.getAllArticles)


// Angular Manejará el Frontend
router.get('*', function(req, res) {						
	res.sendfile('../public/index.html')			
});

module.exports = router
