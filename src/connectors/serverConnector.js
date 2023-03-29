import axios from 'axios'

import { answerObject, questionObject, examObject } from './dbObjectsCtors.js'
import { url } from './consts.js'

const addExam = async () => {
  let loremAnswer1 = new answerObject('2', false)
  let loremAnswer2 = new answerObject('4', true)
  let loremAnswer3 = new answerObject('6', false)
  let loremAnswer4 = new answerObject('8', false)
  let loremQuestion1 = new questionObject('What is the GCD of 648, 762?', null, true, [loremAnswer1, loremAnswer2, loremAnswer3, loremAnswer4])

  let loremExam = new examObject(
    'Communication Networks',
    'Jim Kurose',
    new Date(2023, 6, 1, 12, 0, 0, 0),
    2.5,
    true,
    [loremQuestion1]
  )

  let exams = [loremExam]

  try {
    await axios({
      method: 'post',
      url: `${url}/api/create`,
      data: exams
    })
  }
  catch (err) {
    console.error(err)
  }
}

export {
  addExam
}