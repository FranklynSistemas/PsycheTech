const Qualifications = require('../models/qualifications')

exports.editQualifications = async(req, res, next) => {

  try {
    const query = {
      _id: req.body._id
    }
    let update = req.body
    delete update._id
    const qualification = await Qualifications.findByIdAndUpdate(query, update, {
      new: true
    })
    
    res.json({
      status: true,
      qualification: qualification
    })

  } catch (error) {
    res.json({
      status: false,
      info: "error create a new article",
      error: error
    })
  }
}