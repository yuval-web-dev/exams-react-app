import React, { useState } from 'react'
import { Table, Button, ButtonGroup, Nav } from 'react-bootstrap'

import { green, red } from '../../assets/svg'

const QuestionList = () => {
  const [questions, setQuestions] = useState([])
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

  const renderQuestions = () => {
    return (
      questions.map((q, idx) => {
        return (
          <tr key={idx.toString()} id={idx}>
            <td>{idx + 1}</td>
            <td>{q.image === null ? '-' : <Nav.Link style={{ color: '#007bff' }} onClick={() => handleImageLinkClick(q.image)}>{q.image.name}</Nav.Link>}</td>
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
            {/* <td>{isQuestionSane(q) ? <img src={green} width='35px' /> : <img src={red} width='35px' />}</td> */}
            <td>
              <ButtonGroup>
                <Button variant='light' onClick={() => handleMoveUp(q, idx)}>⯅</Button>
                <Button variant='light' onClick={() => handleMoveDown(q, idx)}>⯆</Button>
              </ButtonGroup>
              <Button variant='primary' onClick={() => handleQuestionEdit(q)}>Edit</Button>
              <Button variant='light' onClick={() => handleQuestionDiscard(q)}>Discard</Button>
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
          {/* <th>Sanity</th> */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {renderQuestions()}
      </tbody>
    </Table>
  )
}

export default QuestionList