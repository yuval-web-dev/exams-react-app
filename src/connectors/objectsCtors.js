// WARNING:
// Every object here MUST correlate with its matching
//  Mongoose Schema object in 'dbSchemaBodies' file in the backend.

function questionObject(bodyText = null, bodyImg = null, isRandomized = null, answers = [], correctAnswer = null) {
  this.bodyText = bodyText
  this.bodyImg = bodyImg
  this.isRandomized = isRandomized
  this.answers = answers
  this.correctAnswer = correctAnswer
}

function examObject(id = null, name = null, lecturer = null, date = null, duration = null, isRandomized = null, questions = []) {
  this.id = id
  this.name = name
  this.lecturer = lecturer
  this.date = date
  this.duration = duration
  this.isRandomized = isRandomized
  this.questions = questions
  this.isModifible = true
}

function errorObject(question = null, selectedAnswer = null) {
  this.question = question
  this.selectedAnswer = selectedAnswer
}

function submissionObject(submittorId = null, submittorName = null, examID = null, grade = null, errs = []) {
  this.submittorId = submittorId
  this.submittorName = submittorName
  this.examID = examID
  this.grade = grade
  this.errs = errs
}

function userObject(user = null, pass = null) {
  this.user = user
  this.pass = pass
}

export {
  questionObject,
  examObject,
  errorObject,
  submissionObject,
  userObject
}
