import moment from "moment"


export function getTomorrow() {
  return moment()
    .add(1, 'days')
    .toDate()
}


export function genStart(hr = 9) {
  return moment()
    .add(1, 'days')
    .startOf('day')
    .add(hr, 'hours')
    .toDate();
}


export function calcStart(date, secs) {
  return moment(date)
    .startOf('day')
    .add(secs, 'seconds')
    .toDate();
}


export function numberToHHmm(number) {
  return `${number}:00`
}