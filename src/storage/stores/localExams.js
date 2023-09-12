import { default as forage } from "../localforage.js"


const save = async (exam) => {
  const result = await forage.setOne("localExams", exam.id, exam)
  if (result) {
    console.info(`saving exam successful (${exam.name})`)
    return true
  }
  else {
    console.info(`saving exam failed (${exam.name})`)
    return false
  }
}

const get = async () => {
  const result = await forage.getMany("localExams")
  if (result) {
    console.info("getting all local exams successful")
    return result
  }
  else {
    console.info("getting all local exams failed")
    return false
  }
}

const remove = async (examId) => {
  const result = await forage.removeOne("localExams", examId)
  if (result) {
    console.info("removing exam successful")
    return true
  }
  else {
    console.error("removing exam failed")
    return false
  }
}

const update = async (examId, newExam) => {
  const result = forage.setOne("localExams", examId, newExam)
  if (result) {
    console.info("updating exam successful")
    return true
  }
  else {
    console.info("updating exam failed")
    return false
  }
}


const localExams = {
  save,
  get,
  remove,
  update
}
export default localExams