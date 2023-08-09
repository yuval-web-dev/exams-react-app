const minHour = 9 * 60 * 60
const [minHourRepr, maxHourRepr] = ["09:00", "17:00"]
const [minDur, maxDur] = [30, 180]
const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
const dateFormat = "d/M/yy"
const col1Width = 2
const col2Width = 10

export default {
  minHour,
  minHourRepr,
  maxHourRepr,
  minDur,
  maxDur,
  tomorrow,
  dateFormat,
  col1Width,
  col2Width
}