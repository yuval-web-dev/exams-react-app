const updateController = async (req, res, next) => {
  try {
    // TODO:
    // const { updatedExamJson } = req.body
    // Use the mongoConnector here
    // ...
    res
      .json({ body: '/api/update response' })
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
  updateController
}