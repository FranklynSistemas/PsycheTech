const mongoose = require('mongoose')
require('../models/articles')
require('../models/qualifications')
const Articles = mongoose.model('articles')
const Qualifications = mongoose.model('qualifications')


const createQualification = async() => {

  try {

    const initQuali = {
      comments: [],
      likes: 0
    }

    return new Qualifications(initQuali).save()
  } catch (error) {
    console.log("Error created ", error)
  }

}

/* Create

{
	"name": "the first article",
	"content": "<p>This can html, doesn't have any problem</p>",
	"shortView": {
		"title": "The origin of Psicology",
		"content": "The abstract"
	},
	"bost": 1,
  "categorie": "blog"
}

 */

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

  } catch (error) {
    res.send(500).json({
      status: false,
      info: "error create a new article",
      error: error
    })
  }
}


exports.getArticles = async(req, res, next) => {
  let query = req.query;
  
  try {
    
    const articles = await Articles.find(query)
      .sort({ bost: 1})
      .populate('qualification')

    res.json({
      status: true,
      articles: articles
    })

  } catch (error) {
    res.send(500).json({
      status: false,
      info: "error and get articles",
      error: error
    })
  }
}

/* Update

{
    query: {
      name: "Andy"
    },
    sort: { rating: 1 },
    update: { $inc: { score: 1 } },
    upsert: true
}

*/


exports.editArticles = async(req, res, next) => {

  try {
    const body = req.body;
    const articles = await Articles.findAndModify(body)
      .populate('qualification')

    res.json({
      status: true,
      articles: articles
    })

  } catch (error) {
    res.send(500).json({
      status: false,
      info: "error create a new article",
      error: e
    })
  }
}
