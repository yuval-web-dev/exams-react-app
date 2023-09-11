import moment from "moment"




export function genStart(hr = 9) {
  return moment()
    .startOf('day')
    .add(hr, 'hours')
    .toDate()
}


export function calcStart(date, secs) {
  return moment(date)
    .startOf('day')
    .add(secs, 'seconds')
    .toDate()
}


export function numberToHHmm(number) {
  return `${number}:00`
}