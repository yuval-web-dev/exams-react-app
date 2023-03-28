const createController = (req, res, next) => {
  try {

    // TODO:
    // const { createdExamJson } = req.body
    // Use the mongoConnector here
    // ...
    return res
      .json({ body: 'create api response' })
      .status(500)
      .end()
  }
  catch (err) {
    console.error(err)
    return res
      .json({ body: 'ok' })
      .status(500)
      .end()
  }
}

module.exports = {
  createController
}