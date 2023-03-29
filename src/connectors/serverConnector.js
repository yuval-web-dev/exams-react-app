import axios from 'axios'

import { questionObject, examObject, errorObject, submissionObject } from './dbObjectsCtors.js'
import { url } from './consts.js'

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
    [
      loremErr1
    ]
  )

  let submissions = [loremSubmission]

  try {
    await axios({
      method: 'post',
      url: `${url}/api/create`,
      data: {
        payload: submissions,
        type: 'submissions',
      }
    })
  }
  catch (err) {
    console.error(err)
  }

  // try {
  //   await axios({
  //     method: 'post',
  //     url: `${url}/api/create`,
  //     data: {
  //       payload: exams,
  //       type: 'exams',
  //     }
  //   })
  // }
  // catch (err) {
  //   console.error(err)
  // }
}

export {
  addExam
}