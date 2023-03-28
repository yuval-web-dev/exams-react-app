const readController = (req, res, next) => {
  try {
    // TODO:
    // const { requestedFilter } = req.body
    // Use the mongoConnector here
    // ...
    res
      .json({ body: `/api/read response` })
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
  readController
}