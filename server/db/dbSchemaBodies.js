// Read this:
// https://mongoosejs.com/docs/schematypes.html

const questionSchemaBody = {
  bodyText: String,
  bodyImg: Buffer,
  isRandomized: Boolean,
  answers: [String],
  correctAnswer: String
}

const examSchemaBody = {
  id: String,
  name: String,
  lecturer: String,
  date: Date,
  duration: Number,
  isRandomized: Boolean,
  questions: [questionSchemaBody],
  isModifiable: Boolean // after a student took this exam, it becomes permanently unmodifiable.
}

const errorSchemaBody = {
  question: questionSchemaBody,
  selectedAnswer: String // If null then no answer was selected during submission.
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