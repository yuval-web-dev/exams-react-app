// WARNING:
// Every object here MUST correlate with its matching
//  Mongoose Schema object in 'dbSchemaBodies.js' file in the backend.

import { v4 as uuidv4 } from 'uuid';

class Question {
  constructor(text = null, answers = [], correctAnswers = [], isRandomized = false) {
    this.qid = null;
    this.image = false;
    this.text = text;
    this.answers = answers;
    this.correctAnswers = correctAnswers;
    this.isRandomized = isRandomized;
  }
}

class Exam {
  constructor(name = null, lecturer = null, date = null, duration = null, questions = [], isRandomized = false) {
    this.eid = uuidv4();
    this.name = name;
    this.lecturer = lecturer;
    this.date = date;
    this.duration = duration;
    this.questions = questions;
    this.isRandomized = isRandomized;
    this.isModifible = true;
  }
}

class Error {
  constructor(qid = null, selectedAnswer = null) {
    this.qid = qid;
    this.selectedAnswer = selectedAnswer;
  }
}

class Submission {
  constructor(eid = null, submittor = null, grade = null, errs = []) {
    this.eid = eid;
    this.submittor = submittor;
    this.grade = grade;
    this.errs = errs;
  }
}

class User {
  constructor(login_username = null, login_password = null, firstname = null, surname = null) {
    this.login_username = login_username;
    this.login_password = login_password;
    this.firstname = firstname;
    this.surname = surname;
  }
}

export {
  Question,
  Exam,
  Error,
  Submission,
  User
};

