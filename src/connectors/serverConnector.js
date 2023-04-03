import axios from 'axios'

import { questionObject, examObject, errorObject, submissionObject, userObject } from './objectsCtors.js'
import { host } from './consts.js'

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(new Uint8Array(reader.result))
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

const addExam = async (image) => {
  let loremQuestion1 = new questionObject(
    'What is the GCD of 648, 762?',
    image ? await readFile(image) : null,
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
    await axios.post(`${host}/api/docs/create`,
      { objectArray: [loremExam], objectType: 'exams' },
      { maxContentLength: Infinity, maxBodyLength: Infinity })
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