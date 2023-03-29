// WARNING:
// Every object here MUST correlate with its matching
//  Mongoose Schema object in 'dbSchemaBodies' file in the backend.

function answerObject(bodyText = null, isCorrect = null) {
  this.bodyText = bodyText
  this.isCorrect = isCorrect
}

function questionObject(bodyText = null, bodyImg = null, isRandomized = null, answers = []) {
  this.bodyText = bodyText
  this.bodyImg = bodyImg
  this.isRandomized = isRandomized
  this.answers = answers
}

function examObject(name = null, lecturer = null, date = null, duration = null, isRandomized = null, questions = []) {
  this.name = name
  this.lecturer = lecturer
  this.date = date
  this.duration = duration
  this.isRandomized = isRandomized
  this.questions = questions
}

function errorObject(question = null, selectedAnswer = null, correctAnswer = null) {
  this.question = question
  this.selectedAnswer = selectedAnswer
  this.correctAnswer = correctAnswer
}

function submissionObject(submittorId = null, submittorName = null, examID = null, grade = null, errs = []) {
  this.submittorId = submittorId
  this.submittorName = submittorName
  this.examID = examID
  this.grade = grade
  this.errs = errs
}

export {
  answerObject,
  questionObject,
  examObject,
  errorObject,
  submissionObject
}
