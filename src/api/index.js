import axios from "axios"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import _ from "lodash"

const URL = "http://localhost:8080"
const SERVICE = "exams-app-backend"
const ENDPOINT = `${URL}/${SERVICE}`


const getQuestionsQuizApi = async (apiKey, category, tags, limit) => {
  try {
    const apiResponse = await axios.get(
      "https://quizapi.io/api/v1/questions",
      {
        params:
        {
          apiKey,
          category,
          tags,
          limit
        }
      }
    )
    const questions = []
    apiResponse.data.forEach(question => {
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

    console.info("Getting questions from QuizAPI successful.")
    return questions
  }
  catch (err) {
    console.error("Getting questions from QuizAPI failed:", err)
    return null
  }
}

const login = async (username, password) => {
  try {
    const data = { username, password }
    const apiResponse = await axios.post(
      `${ENDPOINT}/login`,
      data,
      { headers: { "Content-Type": "application/json" } }
    )
    const jwt = apiResponse.data
    console.info(`User login "${username}" successful.`)
    return jwt
  }
  catch (err) {
    console.error(`User login "${username}" failed:`, err)
    return null
  }
}

const register = async (username, password, firstName, lastName, inviteCode) => {
  try {
    const data = {
      username,
      password,
      firstName,
      lastName,
      inviteCode
    }
    const apiResponse = await axios.post(
      `${ENDPOINT}/register`,
      data,
      { headers: { "Content-Type": "application/json" } }
    )
    console.info("User registration successful.")
    return true
  }
  catch (err) {
    console.error("User registration failed:", err)
    return false
  }
}

const getExams = async (authHeader) => {
  try {
    const apiResponse = await axios.get(
      `${ENDPOINT}/get-exams`,
      { headers: { "Authorization": authHeader } }
    )
    const exams = apiResponse.data.exams
    console.info("Getting exams from backend successful.")
    return exams
  }
  catch (err) {
    console.error("Getting exams from backend failed:", err)
    return null
  }
}

const postExam = async (exam, authHeader) => {
  try {
    await axios.post(
      `${ENDPOINT}/post-exam`,
      exam,
      { headers: { "Authorization": authHeader } }
    )
    console.info("Posting exam to backend successful.")
    return true
  }
  catch (err) {
    console.error("Posting exam to backend failed:", err)
    return false

  }
}

const postSubmission = async (examName, answers, authHeader) => {
  try {
    const data = {
      date: moment().toDate(),
      examName,
      answers
    }
    await axios.post(
      `${ENDPOINT}/post-submission`,
      data,
      {
        headers:
        {
          "Content-Type": "application/json",
          "Authorization": authHeader,
        }
      }
    )
    console.info("Posting submission to backend successful.")
  }
  catch (err) {
    console.error("Posting submission to backend failed:", err)
  }
}

const api = {
  getQuestionsQuizApi,
  login,
  register,
  getExams,
  postExam,
  postSubmission
}

export default api