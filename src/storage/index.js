import { default as localExams } from "./stores/localExams.js"
import { default as selectedExam } from "./stores/selectedExam.js"
import { clearAll } from "./misc.js"


const stores = {
  localExams,
  selectedExam
}
const storage = {
  stores,
  clearAll
}
export default storage