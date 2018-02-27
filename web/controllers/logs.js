const mongoose = require('mongoose')
const Logs = require('../models/logs')

exports.createLog = async(req, res, next) => {

  try {

    const log = await new Logs(req.body)
      .save()

    res.json({
      status: true,
      info: 'log created success'
    })


  } catch (error) {
    res.json({
      status: false,
      info: 'error created log'
    })
  }

}

exports.getLogs = async(req, res, next) => {
  try {
    const logs = await Logs.find()

    res.json({
      status: true,
      contacts: logs,
      info: 'without errors'
    })
  } catch (err) {
    res.json({
      status: false,
      info: 'error get logs'
    })
  }
}
