import axios from "axios"
import moment from "moment"

import { ENDPOINT } from "./consts.js"


// any JWT endpoints
const getAllExams = async (jwt) => {
  try {
    const response = await axios.get(
      `${ENDPOINT}/jwt-any/get-all-exams`,
      {
        headers: {
          "Authorization": jwt
        }
      }
    )
    const exams = response?.data?.exams
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

const postSubmission = async (examId, examName, answers, jwt) => {
  try {
    const response = await axios.post(
      `${ENDPOINT}/jwt-any/post-submission`,
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
    const response = await axios.get(
      `${ENDPOINT}/jwt-any/get-submissions`,
      { headers: { "Authorization": jwt, } }
    )
    const submissions = response?.data
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

// lecturer JWT endpoints
const getUserExams = async (jwt) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/jwt-lecturer/get-authored-exams`,
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
    const response = await axios.post(
      `${ENDPOINT}/jwt-lecturer/post-exam`,
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

const deleteExam = async (examId, jwt) => {
  try {
    const response = await axios.post(
      `${ENDPOINT}/jwt-lecturer/delete-exam`,
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
    const response = await axios.post(
      `${ENDPOINT}/jwt-lecturer/update-exam`,
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
    console.error("updating exam in the backend failed", err.response)
    return false
  }
}


const db = {
  getAllExams,
  postSubmission,
  getUserExams,
  postExam,
  getSubmissions,
  deleteExam,
  updateExam
}
export default db