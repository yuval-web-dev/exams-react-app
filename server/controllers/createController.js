const { insertMany } = require('../db/index.js')

const createController = async (req, res, next) => {
  try {
    const data = req.body
    const docs = data.payload // Array
    const docsType = data.type // String
    await insertMany(docs, docsType)
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