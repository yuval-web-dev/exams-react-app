import React, { useState } from 'react'
import { Table, Button, ButtonGroup, Nav } from 'react-bootstrap'

const QuestionList = ({ questions, setQuestions }) => {
  const [selectedQuestionImage, setSelectedQuestionImage] = useState(null)

  const [showImagePreview, setShowImagePreview] = useState(false)

  // const sanityCheck = (question) => {
  //   if (
  //     question.body === '' ||
  //     question.answers.length <= 1 ||
  //     question.correctAnswers.length === 0 ||
  //     question.correctAnswers.length === question.answers.length
  //   ) {
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // }

  const renderAnswers = (question) => {
    return (
      <ol>{
        question.answers.map(answer => {
          return (
            <li style={answer === question.correct ? { color: 'green', fontWeight: 'bold' } : {}}>
              {answer}
            </li>
          )
        })
      }
      </ol>
    )
  }



  const renderQuestions = (questions) => {
    return (
      questions.map((question, idx) => {
        return (
          <tr key={question.id}>
            <td>
              {idx + 1}
            </td>
            <td>
              {typeof question.body === 'string' ? 'Text' : 'Image'}
            </td>
            <td>
              {typeof question.body === 'string' ? question.body : <Nav><Nav.Link eventKey=''>{question.body.name}</Nav.Link></Nav>}
            </td>
            <td>
              {renderAnswers(question)}
            </td>
            <td>
              {question.shuffled ? 'Yes' : 'No'}
            </td>
            <td>
              <ButtonGroup>
                <Button variant='light' onClick={() => handleMoveUp(question, idx)}>⯅</Button>
                <Button variant='light' onClick={() => handleMoveDown(question, idx)}>⯆</Button>
              </ButtonGroup>
              <Button variant='primary' onClick={() => handleQuestionEdit(question)}>Edit</Button>
              <Button variant='light' onClick={() => handleQuestionDiscard(question)}>Discard</Button>
            </td>
          </tr>
        )
      })
    )
  }

  const handleMoveUp = (question, idx) => {
    if (idx > 0) {
      let newQuestions = [...questions]
      const replaced = newQuestions[idx - 1]
      newQuestions[idx - 1] = question
      newQuestions[idx] = replaced
      setQuestions(newQuestions)
    }
  }

  const handleMoveDown = (question, idx) => {
    if (idx < (questions.length - 1)) {
      let newQuestions = [...questions]
      const replaced = newQuestions[idx + 1]
      newQuestions[idx + 1] = question
      newQuestions[idx] = replaced
      setQuestions(newQuestions)
    }
  }

  const handleQuestionEdit = (question) => {
    // setQuestionToEdit(question)
    // setActiveTab('form')
  }

  const handleQuestionDiscard = (questionToDiscard) => {
    if (window.confirm('Are you sure?')) {
      setQuestions(
        questions.filter((question) => question !== questionToDiscard)
      )
    }
  }

  const handleImageLinkClick = (image) => {
    setSelectedQuestionImage(image)
    setShowImagePreview(true)
  }

  return (
    <Table hover responsive className='align-middle'>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Body</th>
          <th>Answers</th>
          <th>Shuffled</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {renderQuestions(questions)}
      </tbody>
    </Table>
  )
}

export default QuestionList