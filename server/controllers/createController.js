const isEqual = require('fast-deep-equal')

const { insertMany } = require('../connectors/mongoConnectors/examMongoConnector.js')

const createController = async (req, res, next) => {
  try {

    const exams = req.body
    // await insertMany(exams, 'exam')
    console.log(exams)
    res
      .json({ body: '/api/create response' })
      .status(200)
      .end()
  }
  catch (err) {
    console.error(err)
    res
      .status(500)
      .end()
  }
  next()
}

module.exports = {
  createController
}