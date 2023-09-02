import * as crud from "./crud.js"


const fetchExams = async () => {
  try {
    const localExams = await crud.read("exams")
    return localExams
  }
  catch (err) {
    console.error("Fetching local exams failed:\n", err)
    return undefined
  }
}


export const storage = {
  fetchExams
}