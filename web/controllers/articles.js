const mongoose = require('mongoose')
require('../models/articles')
require('../models/qualifications')
const Articles = mongoose.model('articles')
const Qualifications = mongoose.model('qualifications')


const createQualification = async() => {
  const initQuali = {
    comments: [],
    likes: 0
  }

  return new Qualifications(initQuali).save()
}

exports.createArticle = async(req, res, next) => {
  
  try {
    const qualifications = await createQualification();
    let newArticle = req.body
    newArticle.qualification = qualifications._id

    const article = await new Articles(newArticle).save()

    res.json({
      status: true,
      info: 'article create success',
      article: article
    })


  } catch (e) {
    res.send(500).json({
      status: false,
      info: "error create a new article",
      error: e
    })
  }
}


exports.getAllArticles = async(req, res, next) => {
  
  try {

    const articles = await Articles.find()
    	.populate('qualification')

    res.json({
      status: true,
      articles: articles
    })

  } catch (e) {
    res.send(500).json({
      status: false,
      info: "error create a new article",
      error: e
    })
  }
}
