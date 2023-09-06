import { localForage } from "./localForage.js"


const insertExam = async (exam) => {
  try {
    await localForage.setOne("exams", exam, exam.name)
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
    const localExams = await localForage.getMany("exams")
    console.info("Fetching local exams successful.")
    return localExams
  }
  catch (err) {
    console.error("Fetching local exams failed:", err)
    return undefined
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


export const storage = {
  insertExam,
  getExams,
  getSelectedExam, setSelectedExam,
  clearSelectedExam
}