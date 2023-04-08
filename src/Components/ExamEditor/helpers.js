import { ButtonGroup, Button } from "react-bootstrap"

import greenCheck from '../../assets/svgs/Eo_circle_green_checkmark.svg'
import redExclamation from '../../assets/svgs/Exclamation_flat_icon.svg'

import handlers from './handlers'

const isQuestionSane = (question) => {
  if (question.body === '' ||
    question.answers.length <= 1 ||
    question.correctAnswers.length === 0 ||
    question.correctAnswers.length === question.answers.length) {
    return false
  }
  return true
}

const renderQuestions = (questions) => {
  return (
    questions.map((q, idx) => {
      return (
        <tr key={idx.toString()} id={idx}>
          <td>{idx + 1}</td>
          <td>{q.image === null ? 'No' : 'Yes'}</td>
          <td>{q.body === '' ? '-' : `"${q.body.toString()}"`}</td>
          <td>
            <ol>
              {q.answers.length === 0 ? '-' : q.answers.map((answer) => {
                return (
                  <li style={q.correctAnswers.includes(answer) ? { color: 'green', fontWeight: 'bold' } : {}}>{`"${answer}"`}</li>
                )
              })}
            </ol>
          </td>
          <td>{q.isRandomized === true ? 'Yes' : 'No'}</td>
          <td>{isQuestionSane(q) ? <img src={greenCheck} width='30px' /> : <img src={redExclamation} width='30px' />}
          </td>
          <td>
            <ButtonGroup>
              <Button variant='secondary' onClick={handlers.handleQuestionEdit(q)}>Edit</Button>
              <Button variant='warning'>Discard</Button>
            </ButtonGroup>
          </td>
        </tr>
      )
    })
  )
}

export default {
  isQuestionSane,
  renderQuestions
}