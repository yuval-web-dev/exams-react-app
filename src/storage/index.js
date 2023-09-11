import { default as funcs } from "./localForageFuncs.js"


const saveExam = async (exam) => {
  const result = await funcs.setOne("localExams", exam.id, exam)
  if (result) {
    console.info(`insertion of exam successful (${exam.name})`)
    return true
  }
  else {
    console.info(`insertion of exam failed (${exam.name})`)
    return false
  }
}

const getExams = async () => {
  const result = await funcs.getMany("localExams")
  if (result) {
    console.info("getting all local exams successful")
    return result
  }
  else {
    console.info("getting all local exams failed")
    return false
  }
}

const setSelectedExam = async (selectedExam, isLocal) => {
  var result = funcs.setOne("selectedExam", "selectedExam", selectedExam)
  if (!result) {
    console.info("setting selectedExam failed")
    return false
  }
  result = funcs.setOne("selectedExam", "isLocal", isLocal)
  if (!result) {
    console.info("setting isLocal failed")
    return false
  }
  console.info("setting selected exam successful")
  return true
}

const getSelectedExam = async () => {
  const result = await funcs.getOne("selectedExam", "selectedExam")
  if (result) {
    console.info("getting selected exam successful")
    return result
  }
  else {
    console.info("getting selected exam failed")
    return false
  }
}

const clearSelectedExam = async () => {
  const result = await funcs.dropStore("selectedExam")
  if (result) {
    console.info("clearing selected exam successful")
    return true
  }
  else {
    console.info("clearing selected exam failed")
    return false
  }
}

const removeExam = async (examId) => {
  const result = await funcs.removeOne("localExams", examId)
  if (result) {
    console.info("removing exam successful")
    return true
  }
  else {
    console.error(
      "removing exam failed"
    )
    return false
  }
}

const updateExam = async (examId, newExam) => {
  const result = funcs.setOne("localExams", examId, newExam)
  if (result) {
    console.info("updating exam successful")
    return true
  }
  else {
    console.info("updating exam failed")
    return false
  }
}

const getSelectedExamType = async () => {
  const result = await funcs.getOne("selectedExam", "isLocal")
  if (result !== null) {
    console.info("getting selected exam type successful")
    return result
  }
  else {
    console.info("getting selected exam type failed")
    return null
  }
}

const clearAll = async () => {
  const result = await funcs.dropDb()
  if (result) {
    console.info("clearing all data successful")
    return true
  }
  else {
    console.info("clearing all data failed")
    return false
  }
}


const storage = {
  saveExam,
  getExams,
  updateExam,
  getSelectedExam,
  setSelectedExam,
  clearSelectedExam,
  removeExam,
  getSelectedExamType,
  clearAll
}
export default storage