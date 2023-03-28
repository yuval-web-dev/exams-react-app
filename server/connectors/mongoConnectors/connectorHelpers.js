const moment = require('moment')

export const onSuccess = (action) => {
  console.log(`[${moment(Date.now()).format('HH:mm:ss.S')}] ${action} SUCCEEDED`)
}

export const onFail = (action) => {
  console.log(`[${moment(Date.now()).format('HH:mm:ss.S')}] ${action} FAILED`)
}