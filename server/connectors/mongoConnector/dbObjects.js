const answerObject = {
  body: String,
  isCorrect: Boolean
}

const questionObject = {
  answers: [answerObject] = [],
  isRandomized: Boolean = null,
  // modifible:
  chosenAnswer: answerObject
}

const submissionObject = {
  questionsAnswered: [questionObject] = [],
  submittorId: String = null,
  submittorName: String = null
}

export const examObject = {
  questions: [questionObject] = [],
  examName: String = null,
  lecturer: String = null,
  date: Date = null,
  duration: Number = null, // hrs
  isRandomized: Boolean = null,
  // modifible:
  grade: Number = null // 1-100
}

