import { default as forage } from "../localforage.js"


const get = async () => {
  const result = await forage.getOne("selectedExam", "selectedExam")
  if (result) {
    console.info("getting selected exam successful")
    return result
  }
  else {
    console.info("getting selected exam failed")
    return false
  }
}

const set = async (selectedExam, isLocal) => {
  var result = forage.setOne("selectedExam", "selectedExam", selectedExam)
  if (!result) {
    console.info("setting selectedExam failed")
    return false
  }
  result = forage.setOne("selectedExam", "isLocal", isLocal)
  if (!result) {
    console.info("setting isLocal failed")
    return false
  }
  console.info("setting selected exam successful")
  return true
}

const type = async () => {
  const result = await forage.getOne("selectedExam", "isLocal")
  if (result !== null) {
    console.info("getting selected exam type successful")
    return result
  }
  else {
    console.info("getting selected exam type failed")
    return null
  }
}

const clear = async () => {
  const result = await forage.dropStore("selectedExam")
  if (result) {
    console.info("clearing selected exam successful")
    return true
  }
  else {
    console.info("clearing selected exam failed")
    return false
  }
}


const selectedExam = {
  set,
  get,
  type,
  clear
}
export default selectedExam