import axios from "axios"

const ENDPOINT = "http://localhost:8080/exams"


const fetchFromQuizApi = async (apiKey, category, tags, limit) => {
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
    console.info("Fetching questions from QuizAPI successful.")
    return res?.data
  }
  catch (err) {
    console.error("Fetching questions from QuizAPI failed:\n", err)
  }
}


const login = async (formData) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/login`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    console.info("User login successful.")
    return res?.data // the signed jwt
  }
  catch (err) {
    console.error("User login failed:\n", err)
    return undefined
  }
}


const register = async (formData) => {
  try {
    await axios.post(
      `${ENDPOINT}/register`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    console.info("User registration successful.")
    return true
  }
  catch (err) {
    console.error("User registration failed:\n", err)
    return false
  }
}


const fetchExams = async (authHeaderString) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/fetch`,
      { headers: { "Authorization": authHeaderString } }
    )
    console.info("Fetching exams from server successful.")
    return res?.data
  }
  catch (err) {
    console.error("Fetching exams from server failed:\n", err)
  }
}


export const api = {
  fetchFromQuizApi,
  login,
  register,
  fetchExams
}