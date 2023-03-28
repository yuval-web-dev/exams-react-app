const readController = (req, res, next) => {
  try {
    // TODO:
    // const { requestedFilter } = req.body
    // Use the mongoConnector here
    // ...
    console.log('asdfasdf')
    res
      .json({ body: `/api/read response` })
      .status(200)
      .send()
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