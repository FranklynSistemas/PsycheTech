const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')
const admins = require('../controllers/admins')
const contacts = require('../controllers/contacts')
const articles = require('../controllers/articles')
const qualifications = require('../controllers/qualifications')

function authenticationMiddleware() {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/administrator/login')
  }
}

router.post('/createContact', contacts.createContact)
router.get('/getContacts', contacts.getContacts)


// Routes Articles
router.post('/createArticle', articles.createArticle)
router.get('/getArticles', articles.getArticles)
router.put('/updateArticle', articles.editArticles)


// Routes Qualifications
router.put('/updateQualification', qualifications.editQualifications)


// Admin
router.post('/login', admins.login)
router.post('/createAdmin', admins.createAdmin)

router.get('/administrator/login', (req, res) => {
  res.sendFile(path.resolve('./public/login.html'))
})

router.get('/administrator', authenticationMiddleware(), (req, res, next) => {
  res.sendFile(path.resolve('./public/administrator.html'))
})

// Angular Manejará el Frontend
router.get('/', function(req, res) {
  res.sendFile('../public/index.html')
});


module.exports = router
