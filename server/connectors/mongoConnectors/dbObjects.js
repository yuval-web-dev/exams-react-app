const answerObject = {
  bodyText: String = null,
  bodyImg: Image = null,
  isCorrect: Boolean = null
}

const questionObject = {
  answers: [answerObject] = [],
  isRandomized: Boolean = null,
}

const errorsObject = {
  question: questionObject = null,
  selectedAnswer: answerObject = null,
  correctAnswer: answerObject = null
}

export const submissionObject = {
  submittorId: String = null,
  submittorName: String = null,
  examID: String = null,
  grade: Number = null,
  errors: errorsObject = null
}

export const examObject = {
  questions: [questionObject] = [],
  examName: String = null,
  lecturer: String = null,
  date: Date = null,
  duration: Number = null,
  isRandomized: Boolean = null,
}
