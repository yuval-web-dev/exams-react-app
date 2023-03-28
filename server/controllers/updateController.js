const updateController = (req, res, next) => {
  try {
    // TODO:
    // const { updatedExamJson } = req.body
    // Use the mongoConnector here
    // ...
    return res
      .json({ body: 'update api response' })
      .status(500)
      .end()
  }
  catch (err) {
    console.error(err)
    return res.status(500).end()
  }
}

module.exports = {
  updateController
}