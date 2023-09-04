import axios from "axios"
import moment from "moment"

const URL = "http://localhost:8080"
const SERVICE = "exams-app-backend"
const ENDPOINT = `${URL}/${SERVICE}`


const getQuestionsQuizApi = async (apiKey, category, tags, limit) => {
  // fetches questions from QuizAPI's endpoint with specific parameters.
  try {
    const res = await axios.get(
      "https://quizapi.io/api/v1/questions",
      {
        params: {
          apiKey,
          category,
          tags,
          limit
        }
      })
    console.info("Getting questions from QuizAPI successful.")
    return res?.data
  }
  catch (err) {
    console.error("Getting questions from QuizAPI failed:", err)
  }
}

const login = async (username, password) => {
  try {
    const data = { username, password }
    const res = await axios.post(
      `${ENDPOINT}/login`,
      data,
      { headers: { "Content-Type": "application/json" } }
    )
    console.info("User login successful.")
    return res?.data // the signed jwt
  }
  catch (err) {
    console.error("User login failed:", err)
    return undefined
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
    await axios.post(
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
    const res = await axios.get(
      `${ENDPOINT}/get-exams`,
      { headers: { "Authorization": authHeader } }
    )
    console.info("Getting exams from backend successful.")
    return res?.data
  }
  catch (err) {
    console.error("Getting exams from backend failed:", err)
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


export const api = {
  getQuestionsQuizApi,
  login,
  register,
  getExams,
  postSubmission
}