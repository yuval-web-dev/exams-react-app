import { crud } from "./crud.js"


const fetchExams = async () => {
  try {
    const localExams = await crud.readMany("exams")
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
    await crud.createOne("selectedExam", selectedExam, "selectedExam")
  }
  catch (err) {
    console.error("Setting selected exam failed:", err)
    return false
  }
}


export const storage = {
  fetchExams,
  setSelectedExam
}