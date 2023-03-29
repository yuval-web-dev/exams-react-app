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
    'Lorem Ipsum',
    'Dolor Sit Amet',
    Date(2023, 1, 30, 23, 59, 59, 999),
    2.5,
    true,
    [loremQuestion1]
  )

  try {
    await axios({
      method: 'post',
      url: `${url}/api/create`,
      data: loremExam
    })
  }
  catch (err) {
    console.error(err)
  }
}

export {
  addExam
}