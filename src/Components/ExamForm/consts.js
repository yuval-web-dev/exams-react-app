const [earliestHourStr, earliestHourNum] = ['09:00', 9 * 60 * 60]
const latestHourStr = '17:00'
const [minDuration, maxDuration] = [30, 180] // mins
const today = new Date()

const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)

export default {
  earliestHourStr,
  earliestHourNum,
  latestHourStr,
  minDuration,
  maxDuration,
  tomorrow
}