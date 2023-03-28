const deleteController = (req, res, next) => {
  try {
    // TODO:
    // const { filterToDelete } = req.body
    // Use the mongoConnector here
    // ...
    res
      .json({ body: 'delete api response' })
      .status(500)
      .end()
  }
  catch (err) {
    console.error(err)
    res.
      status(500)
      .end()
  }
  next()
}

module.exports = {
  deleteController
}