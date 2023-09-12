import axios from "axios"

import { ENDPOINT } from "./consts.js"

/**
 * 
 * @param {string} username The username which is associated with the user in the database.
 * @param {string} password The password which is associated with the user in the database.
 * @returns a signed JSON Web Token (JWT), which is valid for x time.
 */
const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${ENDPOINT}/login`,
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    )
    const jwt = response?.data
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

/**
 * 
 * @param {string} username The username for the user to be created.
 * @param {string} password The password for the user to be created.
 * @param {string} firstName The first name of the user, for displaying purposes.
 * @param {string} lastName The last name of the user, for displaying purposes.
 * @param {string} inviteCode Will register the user with lecturer privileges if code is correct.
 * @returns `true` if registration was successful, otherwise `false`.
 */
const register = async (username, password, firstName, lastName, inviteCode) => {
  try {
    const response = await axios.post(
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


const auth = {
  login,
  register
}
export default auth