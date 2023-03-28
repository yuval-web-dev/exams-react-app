const answerObject = {
  bodyText: String = null,
  bodyImg: Image = null,
  isCorrect: Boolean = null
}

const questionObject = {
  isRandomized: Boolean = null,
  answers: [answerObject] = []
}

const errorObject = {
  question: questionObject = null,
  selectedAnswer: answerObject = null,
  correctAnswer: answerObject = null
}

export const submissionObject = {
  submittorId: String = null,
  submittorName: String = null,
  examID: String = null,
  grade: Number = null,
  errors: [errorObject] = null
}

export const examObject = {
  name: String = null,
  lecturer: String = null,
  date: Date = null,
  duration: Number = null,
  isRandomized: Boolean = null,
  questions: [questionObject] = []
}
