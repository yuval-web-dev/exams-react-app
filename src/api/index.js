import axios from "axios"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import _ from "lodash"

const URL = "http://localhost:8080"
const SERVICE = "exams-app-backend"
const ENDPOINT = `${URL}/${SERVICE}`


const getQuestionsQuizApi = async (apiKey, category, tags, limit) => {
  try {
    const res = await axios.get(
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
    res?.data?.forEach(question => {
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

const login = async (username, password) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/login`,
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    )
    const jwt = res?.data
    console.info("user login successful")
    return jwt
  }
  catch (err) {
    console.error(
      "user login failed",
      err?.response
    )
    return false
  }
}

const register = async (username, password, firstName, lastName, inviteCode) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/register`,
      {
        username,
        password,
        firstName,
        lastName,
        inviteCode
      },
      { headers: { "Content-Type": "application/json" } }
    )
    console.info("user registration successful")
    return true
  }
  catch (err) {
    console.error(
      "user registration failed",
      err?.response
    )
    return false
  }
}

const getUserExams = async (jwt) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/get-user-exams`,
      {
        headers: {
          "Authorization": jwt
        }
      }
    )
    const exams = res?.data?.exams
    console.info("getting exams from backend successful")
    return exams
  }
  catch (err) {
    console.error(
      "getting exams from backend failed",
      err?.response
    )
    return false
  }
}

const postExam = async (exam, jwt) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/post-exam`,
      { exam },
      {
        headers: {
          "Authorization": jwt
        }
      }
    )
    console.info("posting exam to backend successful")
    return true
  }
  catch (err) {
    console.error(
      "posting exam to backend failed",
      err?.response
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
    console.info("posting submission to backend successful")
    return true
  }
  catch (err) {
    console.error(
      "posting submission to backend failed",
      err?.response
    )
    return false
  }
}

const getSubmissions = async (jwt) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/get-submissions`,
      { headers: { "Authorization": jwt, } }
    )
    const submissions = res?.data
    console.info("getting submissions from backend successful")
    return submissions
  }
  catch (err) {
    console.error(
      "getting submissions from backend failed",
      err?.response
    )
    return false
  }
}

const getAllExams = async (jwt) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/get-all-exams`,
      {
        headers: {
          "Authorization": jwt
        }
      }
    )
    const exams = res?.data?.exams
    console.info("getting all exams from backend successful")
    return exams
  }
  catch (err) {
    console.error(
      "getting all exams from backend failed",
      err?.response
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
    console.info("deleting exam from backend DB successful")
    return true
  }
  catch (err) {
    console.error(
      "deleting exam from backend DB failed",
      err?.response
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
  getUserExams,
  postExam,
  postSubmission,
  getSubmissions,
  deleteExam,
  updateExam,
  getAllExams
}

export default api