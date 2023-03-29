const moment = require('moment')

const onSuccess = (action) => {
  console.log(`[${moment(Date.now()).format('HH:mm:ss.S')}] ${action} SUCCEEDED`)
}

const onFail = (action) => {
  console.log(`[${moment(Date.now()).format('HH:mm:ss.S')}] ${action} FAILED`)
}

module.exports = {
  onSuccess,
  onFail
}