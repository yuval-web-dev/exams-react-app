const moment = require('moment')

const consoleTimeLogger = (text) => {
  console.log(`[${moment(Date.now()).format('HH:mm:ss.S')}] ${text}`)
}

module.exports = {
  consoleTimeLogger
}