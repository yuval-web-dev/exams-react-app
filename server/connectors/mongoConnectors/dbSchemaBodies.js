// Read this:
// https://mongoosejs.com/docs/schematypes.html

const answerSchemaBody = {
  bodyText: String,
  isCorrect: Boolean
}

const questionSchemaBody = {
  bodyText: String,
  bodyImg: Buffer,
  isRandomized: Boolean,
  answers: [answerSchemaBody]
}

const examSchemaBody = {
  name: String,
  lecturer: String,
  date: Date,
  duration: Number,
  isRandomized: Boolean,
  questions: [questionSchemaBody]
}

const errorSchemaBody = {
  question: questionSchemaBody,
  selectedAnswer: answerSchemaBody,
  correctAnswer: answerSchemaBody,
}

const submissionSchemaBody = {
  submittorId: String,
  submittorName: String,
  examID: String,
  grade: Number,
  errs: [errorSchemaBody]
}

module.exports = {
  examSchemaBody,
  submissionSchemaBody
}