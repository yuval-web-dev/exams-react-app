import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import _ from "lodash"


/**
 * 
 * @param {string} apiKey QuizAPI key.
 * @param {string} category The category of the questions to fetch.
 * @param {string} tags The tag of the questions to fetch.
 * @param {number} limit The limit of questions to fetch.
 * @returns {object[]} Array of question objects if found, false if request failed.
 */
const quizApi = async (apiKey, category, tags, limit) => {
  try {
    const response = await axios.get(
      "https://quizapi.io/api/v1/questions",
      {
        params: {
          apiKey,
          category,
          tags,
          limit
        }
      }
    )
    const questions = []
    response?.data?.forEach(question => {
      if (question.multiple_correct_answers === "false") {
        var correctAnswer
        var answerObjects = []
        _.zip(Object.values(question.answers), Object.values(question.correct_answers)).forEach(
          ([answer, isCorrect]) => {
            if (answer) {
              const id = uuidv4()
              if (isCorrect === "true") {
                correctAnswer = id
              }
              answerObjects.push({ id, answer })
            }
          }
        )
        questions.push({
          id: uuidv4(),
          question: question.question,
          answers: answerObjects,
          correctAnswer,
          shuffle: false,
          points: 5
        })
      }
    })
    console.info("getting questions from QuizAPI successful")
    return questions
  }
  catch (err) {
    console.error(
      "getting questions from QuizAPI failed",
      err?.response
    )
    return false
  }
}


const misc = {
  quizApi
}
export default misc