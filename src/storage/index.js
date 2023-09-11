import { localForage } from "./localForage.js"


const saveExam = async (exam) => {
  try {
    await localForage.setOne("localExams", exam.id, exam)
    console.info(`Insertion of exam "${exam.name}" successful.`)
    return true
  }
  catch (err) {
    console.error(`Insertion of exam "${exam.name}" failed:`, err)
    return false
  }
}

const getExams = async () => {
  try {
    const exams = await localForage.getMany("localExams")
    console.info("Getting all local exams successful.")
    return exams
  }
  catch (err) {
    console.error("Getting all local exams failed:", err)
    return false
  }
}

const setSelectedExam = async (selectedExam, isLocal) => {
  try {
    await localForage.setOne("selectedExam", "selectedExam", selectedExam)
    await localForage.setOne("selectedExam", "isLocal", isLocal)
    console.info("setting selected exam successful")
    return true
  }
  catch (err) {
    console.error("Setting selected exam failed:", err)
    return false
  }
}

const getSelectedExam = async () => {
  try {
    const exam = await localForage.getOne("selectedExam", "selectedExam")
    return exam
  }
  catch (err) {
    console.error("Getting selected exam failed:", err)
    return false
  }
}

const clearSelectedExam = async () => {
  try {
    const res = await localForage.dropStore("selectedExam")
    console.info("clearing selected exam successful")
    return true
  }
  catch (err) {
    console.error("clearing selected exam failed:", err)
    return false
  }
}

const removeExam = async (examId) => {
  try {
    await localForage.removeOne("localExams", examId)
    console.info("removing exam successful")
    return true
  }
  catch (err) {
    console.error(
      "removing exam failed",
      err
    )
    return false
  }
}

const updateExam = async (examId, newExam) => {
  try {
    const res = localForage.setOne("localExams", examId, newExam)
    return true
  }
  catch (err) {
    console.error(
      "replace exam failed",
      err
    )
    return false
  }
}

const getSelectedExamType = async () => {
  try {
    const isLocal = await localForage.getOne("selectedExam", "isLocal")
    return isLocal
  }
  catch (err) {
    console.error("Getting selected exam's type failed:", err)
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
  getSelectedExamType
}

export default storage