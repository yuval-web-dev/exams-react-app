import axios from 'axios'

import { questionObject, examObject, errorObject, submissionObject, userObject } from './objectsCtors.js'
import { host } from './consts.js'


const addExam = async () => {
  let loremQuestion1 = new questionObject(
    'What is the GCD of 648, 762?',
    null,
    true,
    ['2', '4', '6', '8'],
    '4'
  )

  let loremErr1 = new errorObject(
    loremQuestion1,
    '6'
  )

  let loremExam = new examObject(
    '01',
    'Communication Networks',
    'Jim Kurose',
    new Date(2023, 6, 1, 12, 0, 0, 0),
    2.5,
    true,
    [loremQuestion1]
  )

  let loremSubmission = new submissionObject(
    '318419232',
    'John Doe',
    '01',
    90,
    [loremErr1]
  )

  try {
    await axios.post(`${host}/api/docs/create`, {
      objectArray: [loremExam],
      objectType: 'exams',
    })
  }
  catch (err) {
    console.error(err)
  }
}

const authUser = async () => {
  const user = 'admin'
  const pass = 'admin1'
  try {
    await axios.post(`${host}/api/users/auth`, { user, pass })
  }
  catch (err) {
    console.error(err)
  }
}

const addUser = async () => {
  let newUser = new userObject('admin', 'admin')
  try {
    await axios.post(`${host}/api/users/create`, [newUser])
  }
  catch (err) {
    console.error(err)
  }
}

export {
  addExam,
  authUser,
  addUser
}