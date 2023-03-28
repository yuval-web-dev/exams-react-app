const moment = require('moment')

const logger = (text) => {
  console.log(`[${moment(Date.now()).format('HH:mm:ss.S')}] ${text}`)
}

module.exports = { logger }