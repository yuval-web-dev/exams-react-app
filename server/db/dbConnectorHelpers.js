const moment = require('moment')

const consoleTimeLog = (text) => {
  console.log(`[${moment(Date.now()).format('HH:mm:ss.S')}] ${text}`)
}

const onSuccess = (action) => {
  console.log(`[${moment(Date.now()).format('HH:mm:ss.S')}] ${action} %cSUCCEDDED`, 'color: green')
}

const onFail = (action) => {
  console.log(`[${moment(Date.now()).format('HH:mm:ss.S')}] ${action} %cFAILED`, 'color: red')
}

module.exports = {
  consoleTimeLog,
  onSuccess,
  onFail
}