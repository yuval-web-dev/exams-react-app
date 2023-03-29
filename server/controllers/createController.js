const isEqual = require('fast-deep-equal')

const { insertMany } = require('../connectors/mongoConnectors/examMongoConnector.js')

const createController = async (req, res, next) => {
  try {
    // TODO:
    // const { createdExamJson } = req.body
    // Use the mongoConnector here
    // ...
    const exam = req.body
    await insertMany([exam])

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