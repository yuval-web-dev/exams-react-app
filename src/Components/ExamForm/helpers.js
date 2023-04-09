import { ButtonGroup, Button } from "react-bootstrap"


import greenCheck from '../../assets/svgs/green-checkmark-icon.svg'
import redAlert from '../../assets/svgs/red-alert-icon.svg'


const isQuestionSane = (question) => {
  if (
    question.body === '' ||
    question.answers.length <= 1 ||
    question.correctAnswers.length === 0 ||
    question.correctAnswers.length === question.answers.length

  ) {
    return false
  }
  return true
}

const renderQuestions = (questions) => {
  return (
    null
    // questions.map((q, idx) => {
    //   return (
    //     <tr key={idx.toString()} id={idx}>
    //       <td>{idx + 1}</td>
    //       <td>{q.image === null ? 'No' : 'Yes'}</td>
    //       <td>{q.body === '' ? '-' : `"${q.body.toString()}"`}</td>
    //       <td>
    //         <ol>
    //           {q.answers.length === 0 ? '-' : q.answers.map((answer) => {
    //             return (
    //               <li style={q.correctAnswers.includes(answer) ? { color: 'green', fontWeight: 'bold' } : {}}>{`"${answer}"`}</li>
    //             )
    //           })}
    //         </ol>
    //       </td>
    //       <td>{q.isRandomized === true ? 'Yes' : 'No'}</td>
    //       <td>{isQuestionSane(q) ? <img src={greenCheck} width='30px' /> : <img src={redAlert} width='30px' />}
    //       </td>
    //       <td>
    //         <ButtonGroup>
    //           <Button variant='secondary' onClick={handlers.handleQuestionEdit(q)}>Edit</Button>
    //           <Button variant='warning'>Discard</Button>
    //         </ButtonGroup>
    //       </td>
    //     </tr>
    //   )
    // })
  )
}

export default {
  isQuestionSane,
  renderQuestions
}