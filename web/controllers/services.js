const Services = require('../models/services')

/* Create

{
	"title": "the first services",
	"content": "This can html, doesn't have any problem",
	"price": 20000,
	"medium": ['videoCall', 'onSite']
	"bost": 1,
}

 */

exports.createService = async (req, res, next) => {
  try {
    const newService = req.body

    const service = await new Services(newService).save()

    res.json({
      status: true,
      info: 'service create success',
      service: service
    })
  } catch (error) {
    res.send(500).json({
      status: false,
      info: 'error create a new service',
      error: error
    })
  }
}

exports.getServices = async (req, res, next) => {
  try {
  	const query = req.query
    const services = await Services.find(query)
      .sort({
        bost: 1
      })

    res.json({
      status: true,
      services: services
    })
  } catch (error) {
    res.send(500).json({
      status: false,
      info: 'error to get services',
      error: error
    })
  }
}

exports.editService = async (req, res, next) => {
  try {
    const query = {
      _id: req.body._id
    }
    let update = req.body
    delete update._id
    const service = await Services.findByIdAndUpdate(query, update, {
      new: true
    })

    res.json({
      status: true,
      service: service
    })
  } catch (error) {
    res.send(500).json({
      status: false,
      info: 'error update service',
      error: error
    })
  }
}
