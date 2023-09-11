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
    console.error(
      "Getting questions from QuizAPI failed!",
      err.response
    )
    return false
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
    console.info("User login successful.")
    return jwt
  }
  catch (err) {
    console.error(
      "User login failed!",
      err.response
    )
    return false
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
    console.error(
      "User registration failed!",
      err.response
    )
    return false
  }
}

const getExams = async (jwt) => {
  try {
    const apiResponse = await axios.get(
      `${ENDPOINT}/get-exams`,
      {
        headers: {
          "Authorization": jwt
        }
      }
    )
    const exams = apiResponse.data.exams
    console.info("Getting exams from backend successful.")
    return exams
  }
  catch (err) {
    console.error(
      "Getting exams from backend failed!",
      err.response
    )
    return false
  }
}

const postExam = async (exam, jwt) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/post-exam`,
      exam,
      {
        headers: {
          "Authorization": jwt
        }
      }
    )
    console.info(res?.response)
    console.info("Posting exam to backend successful.")
    return true
  }
  catch (err) {
    console.error(
      "Posting exam to backend failed!",
      err.response
    )
    return false
  }
}

const postSubmission = async (examId, examName, answers, jwt) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/post-submission`,
      {
        date: moment().toDate(),
        examId,
        examName,
        answers
      },
      {
        headers: {
          "Authorization": jwt,
          "Content-Type": "application/json"
        }
      }
    )
    console.log(res?.response)
    console.info("Posting submission to backend successful.")
    return true
  }
  catch (err) {
    console.error(
      "Posting submission to backend failed!",
      err.response
    )
    return false
  }
}

const getSubmissions = async (jwt) => {
  try {
    const apiResponse = await axios.get(
      `${ENDPOINT}/get-submissions`,
      { headers: { "Authorization": jwt, } }
    )
    const submissions = apiResponse.data
    console.log(apiResponse)
    console.info("Getting submissions from backend successful.")
    return submissions
  }
  catch (err) {
    console.error(
      "Getting submissions from backend failed!",
      err.response
    )
    return false
  }
}

const deleteExam = async (examId, jwt) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/delete-exam`,
      { examId },
      {
        headers: {
          "Authorization": jwt,
          "Content-Type": "application/json"
        }
      }
    )
    console.log(res?.response)
    console.info("Deleting exam from backend DB successful.")
    return true
  }
  catch (err) {
    console.error(
      "Deleting exam from backend DB failed!",
      err
    )
    return false
  }
}

const updateExam = async (exam, jwt) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/update-exam`,
      { exam },
      {
        headers: {
          "Authorization": jwt
        }
      }
    )
    console.info(res?.response)
    console.info("updating exam in the backend successful")
    return true
  }
  catch (err) {
    console.error(
      "updating exam in the backend failed",
      err.response
    )
    return false
  }
}

const api = {
  getQuestionsQuizApi,
  login,
  register,
  getExams,
  postExam,
  postSubmission,
  getSubmissions,
  deleteExam,
  updateExam
}

export default api