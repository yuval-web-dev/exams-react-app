import axios from 'axios'

// import { Question, Exam } from '../../classes.ts'
import { examEndpts } from '../endpoints.js'


const examPost = async (uploads) => {
  // // Hardcoding a user input:
  // let loremQ1 = new Question()
  // loremQ1.text = 'What is the GCD of 648, 762?'
  // loremQ1.answers = ['2', '4', '6', '8']
  // loremQ1.correctAnswer = loremQ1.answers[1]

  // let loremQ2 = new Question()
  // loremQ2.text = 'What is the LCM of 36, 58?'
  // loremQ2.answers = ['140', '264', '864', '1044']
  // loremQ2.correctAnswer = loremQ2.answers[3]


  // let questionTemplate1 = { // lecturer created a quetsion and attached an image
  //   'createdObject': loremQ1,
  //   'attachedImage': uploads[0]
  // }
  // let questionTemplate2 = { // lecturer created a quetsion and attached an image
  //   'createdObject': loremQ2,
  //   'attachedImage': uploads[1]
  // }
  // let templates = [questionTemplate1, questionTemplate2]

  // let loremE = new Exam()
  // const formData = new FormData()

  // templates.map((t, idx) => {
  //   // genereating a question ID according to the question's exam, then assigning it to it:
  //   const questionId = `${loremE.eid}@${idx}`
  //   t.createdObject.qid = questionId
  //   // if user attached an image with the template, the object will be marked as an image question:
  //   if (t.attachedImage !== null) {
  //     t.createdObject.image = true
  //     // renaming the image attachment as the question's id, so it can be easily saved and indexed in the server's uploads:
  //     const oldName = t.attachedImage.name
  //     const rename = oldName.replace(/^.*(?=\.)/, questionId)
  //     // appending the image to the formData with the new name:
  //     formData.append(rename, t.attachedImage)
  //   }
  //   // appending the question to the exam object:
  //   loremE.questions.push(t.createdObject)
  // })

  // const exam = JSON.stringify(loremE)

  // // Exam is finalized, now added to the form data:
  // formData.append('exam', exam)

  // try {
  //   await axios.post(examEndpts.post, formData, {
  //     // When you send a FormData object in a POST request, the Content-Type header of the HTTP request is automatically set to multipart/form-data.
  //     // This content type tells the server that the request contains a series of parts, each of which may have its own content type.
  //     // However, some servers may require additional information in the Content-Type header,
  //     //  such as a boundary string that separates the different parts of the message.
  //     // In order to ensure that your request is properly interpreted by the server,
  //     // you should always set the Content-Type header explicitly when sending a FormData POST request:
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //     maxContentLength: Infinity,
  //     maxBodyLength: Infinity
  //   })
  // }
  // catch (err) {
  //   console.error(err)
  // }
}

export default examPost