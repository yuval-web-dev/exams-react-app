import axios from 'axios'
import uuid from 'uuid'

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

const examPost = async (imgUpload) => {
  const formData = new FormData()

  const loremExam = new examObject(
    'Communication Networks',
    'PhD Kurose, Jim',
    new Date(2023, 6, 1, 12, 0, 0, 0),
    2.5,
    true,
    [new questionObject(
      null,
      true,
      answers = ['2', '4', '6', '8'],
      '4'
    )]
  )

  formData.append('exam', loremExam)

  loremExam.questions.map(q => {
    if (Object.keys(q)[0] === 'img') {

    }
    formData.append()
  })
  formData.append('img1', imgUpload)
  formData.append('img2', imgUpload)


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