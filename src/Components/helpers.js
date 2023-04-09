const isQuestionSane = (question) => {
  if (
    question.body === '' ||
    question.answers.length <= 1 ||
    question.correctAnswers.length === 0 ||
    question.correctAnswers.length === question.answers.length
  ) {
    return false
  }
  else {
    return true
  }
}

export default isQuestionSane