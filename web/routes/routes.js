const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')
const admins = require('../controllers/admins')
const contacts = require('../controllers/contacts')
const articles = require('../controllers/articles')
const qualifications = require('../controllers/qualifications')
const logs = require('../controllers/logs')
const services = require('../controllers/services')
const subscribers = require('../controllers/subscribers')

function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/administrator/login')
  }
}

//Routes Subscribers
router.post('/createSubscriber', subscribers.createSubscriber)
router.get('/getSubscribers', subscribers.getSubscribers)
router.put('/updateSubscribers', subscribers.editSubscribers)

// Routes Logs
router.post('/createLog', logs.createLog)
router.get('/getLogs', logs.getLogs)

// Routes Services
router.post('/createService', services.createService)
router.get('/getServices', services.getServices)
router.put('/updateService', services.editService)

// Routes Contacts
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

// Angular handler of Frontend
router.get('/', function (req, res) {
  res.sendFile('../public/index.html')
})

module.exports = router
