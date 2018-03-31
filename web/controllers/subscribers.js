const mongoose = require('mongoose')
const Subscribers = require('../models/subscribers')

exports.createSubscriber = async(req, res, next) => {

  try {
    const subscriber = await new Subscribers(req.body)
      .save()

    res.json({
      status: true,
      info: 'subscriber created success'
    })

  } catch (error) {
    console.log(error)
    res.json({
      status: false,
      info: 'error created subscriber'
    })
  }

}

exports.editSubscribers = async (req, res, next) => {
  try {
    const query = {
      _id: req.body._id
    }
    let update = req.body
    delete update._id
    await Subscribers.update()
    res.json({
      status: true
    })
  } catch (error) {
    res.json({
      status: false,
      info: 'error update subscriber',
      error: error
    })
  }
}


exports.getSubscribers = async(req, res, next) => {
  try {
    const subscribers = await Subscribers.find()
    res.json({
      status: true,
      subscribers: subscribers,
      info: 'without errors'
    })
  } catch (err) {
    res.json({
      status: false,
      info: 'error get logs'
    })
  }
}
