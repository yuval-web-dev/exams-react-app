import axios from 'axios'

import { questionObject, examObject } from '../objects.js'
import { examEndpts } from '../endpoints.js'

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(new Uint8Array(reader.result))
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

const examPost = async (img) => {
  const formData = new FormData()

  // Hardcoding an exam object to be posted:
  let loremQ = new questionObject()
  loremQ.imageName = img.name
  loremQ.text = 'What is the GCD of 648, 762?'
  loremQ.answers = ['2', '4', '6', '8']
  loremQ.correctAnswer = loremQ.answers[1]
  let loremE = new examObject()
  loremE.questions.push(loremQ)
  // Assigning a unique id for each question in the exam:
  loremE.questions.map((q, idx) => {
    q.qid = `${loremE.eid}_q${idx}`
    if (q.imageName !== null) {
      formData.append(q.imageName, img)
    }
  })
  const exams = JSON.stringify([loremE, loremE])

  // Exam is finalized, now added to the form data:
  formData.append('exams', exams)

  try {
    await axios.post(examEndpts.post, formData, {
      // When you send a FormData object in a POST request, the Content-Type header of the HTTP request is automatically set to multipart/form-data.
      // This content type tells the server that the request contains a series of parts, each of which may have its own content type.
      // However, some servers may require additional information in the Content-Type header,
      //  such as a boundary string that separates the different parts of the message.
      // In order to ensure that your request is properly interpreted by the server,
      // you should always set the Content-Type header explicitly when sending a FormData POST request:
      headers: { 'Content-Type': 'multipart/form-data' },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    })
  }
  catch (err) {
    console.error(err)
  }
}

export default examPost