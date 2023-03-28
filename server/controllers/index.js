const { createController } = require('./createController.js')
const { readController } = require('./readController.js')
const { updateController } = require('./updateController.js')
const { deleteController } = require('./deleteController.js')

module.exports = {
  createController,
  readController,
  updateController,
  deleteController
}