import { localForage } from "./localForage.js"


const saveExam = async (exam) => {
  try {
    await localForage.setOne("exams", exam, exam.id)
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
    const exams = await localForage.getMany("exams")
    console.info("Getting all local exams successful.")
    return exams
  }
  catch (err) {
    console.error("Getting all local exams failed:", err)
    return null
  }
}

const setSelectedExam = async (selectedExam) => {
  try {
    await localForage.setOne("selectedExam", selectedExam, "selectedExam")
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
    await localForage.removeOne("selectedExam", "selectedExam")
    return true
  }
  catch (err) {
    console.error("Getting selected exam failed:", err)
    return false
  }
}

const removeExam = async (examId) => {
  try {
    await localForage.removeOne("exams", examId)
    console.info(`Removal of exam successful.`)
    return true
  }
  catch (err) {
    console.error(`Removal of exam failed:`, err)
    return false
  }
}


const storage = {
  saveExam,
  getExams,
  getSelectedExam, setSelectedExam,
  clearSelectedExam,
  removeExam
}

export default storage