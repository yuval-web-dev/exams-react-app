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

export {
  answerObject,
  questionObject,
  examObject
}

// const answerObject = {
//   bodyText: String = null,
//   bodyImg: Image = null,
//   isCorrect: Boolean = null
// }
// const questionObject = (isRandomized, answers) => {
//   this.isRandomized = isRandomized,
//   this.answers = answers
// }
// const examObject = {
//   name: String = null,
//   lecturer: String = null,
//   date: Date = null,
//   duration: Number = null,
//   isRandomized: Boolean = null,
//   questions: [questionObject] = []
// }