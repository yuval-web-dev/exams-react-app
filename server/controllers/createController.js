const createController = (req, res, next) => {
  try {
    // TODO:
    // const { createdExamJson } = req.body
    // Use the mongoConnector here
    // ...
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