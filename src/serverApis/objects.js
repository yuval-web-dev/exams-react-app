// WARNING:
// Every object here MUST correlate with its matching
//  Mongoose Schema object in 'dbSchemaBodies.js' file in the backend.

import { v4 as uuidv4 } from 'uuid'

function questionObject(text = null, answers = [], correctAnswer = null, isRandomized = false) {
  this.qid = null
  this.image = false
  this.text = text
  this.answers = answers
  this.correctAnswer = correctAnswer
  this.isRandomized = isRandomized
}

function examObject(name = null, lecturer = null, date = null, duration = null, questions = [], isRandomized = false) {
  this.eid = uuidv4()
  this.name = name
  this.lecturer = lecturer
  this.date = date
  this.duration = duration
  this.questions = questions
  this.isRandomized = isRandomized
  this.isModifible = true
}

function errorObject(qid = null, selectedAnswer = null) {
  this.qid = qid
  this.selectedAnswer = selectedAnswer
}

function submissionObject(eid = null, submittor = null, grade = null, errs = []) {
  this.eid = eid
  this.submittor = submittor
  this.grade = grade
  this.errs = errs
}

function userObject(login_username = null, login_password = null, firstname = null, surname = null) {
  this.login_username = login_username
  this.login_password = login_password
  this.firstname = firstname
  this.surname = surname
}

export {
  questionObject,
  examObject,
  errorObject,
  submissionObject,
  userObject
}
