import React, { useState, useRef } from 'react';
import { Row, Col, Form, Button, Image, ButtonGroup, Table } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import placeholder from '../../assets/placeholder.png'
import { Question } from '../../classes';

import equal from 'fast-deep-equal'

const QuestionForm = ({ questionObj, setQuestionObj, questions, setQuestions, setActiveTab }) => {
  const [body, setBody] = useState(questionObj?.body !== null ? questionObj?.text : '')
  const [image, setImage] = useState(questionObj?.image !== null ? questionObj?.image : null)
  const [answers, setAnswers] = useState(questionObj?.answers !== [] ? questionObj?.answers : [])
  const [correctAnswers, setCorrectAnswers] = useState(questionObj?.correctAnswers !== [] ? questionObj?.correctAnswers : [])
  const [randomized, setRandomized] = useState(questionObj?.isRandomized)

  const imageInputRef = useRef(null);
  const answerFormRef = useRef(null);

  const handleImageClick = () => {
    imageInputRef?.current?.click()
  }

  const handleImageChange = (e) => {
    // TODO check if upload's valid before setting
    if (e?.target?.files?.length === 1) {
      const uploadedFile = e.target.files[0]
      const imageUrl = URL.createObjectURL(uploadedFile)
      setImage(imageUrl)
    }
  }

  const handleImageClear = () => {
    setImage(null)
    // note that the onChange event will not be triggered if the user selects the same file again.
    // To work around this behavior, you can clear the input field value programmatically just
    //  before triggering the click event on the input element:
    imageInputRef.current.value = ''
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value)
  }

  const handleBodyClear = () => {
    setBody('')
  }

  const handleAnswerClear = (e) => {
    answerFormRef.current.value = ''
  }

  const handleRandomToggle = (e) => {
    setRandomized((prevState) => !prevState)
  }

  const handleAnswerAdd = (e) => {
    const newAnswer = answerFormRef.current.value.trim()
    if (newAnswer !== '') {
      setAnswers([...answers, newAnswer])
      answerFormRef.current.value = ''
    }
  }

  const handleAnswerDelete = (answerToDelete) => {
    let newAnswers = answers.filter((answer) => answer !== answerToDelete)
    setAnswers(newAnswers);

    if (correctAnswers.includes(answerToDelete)) {
      let newCorrectAnswers = correctAnswers.filter((answer) => answer !== answerToDelete);
      setCorrectAnswers(newCorrectAnswers);
    }
  }

  const handleAnswerToggle = (answerToMod) => {
    if (correctAnswers.includes(answerToMod)) {
      let newCorrectAnswers = correctAnswers.filter((answer) => answer !== answerToMod);
      setCorrectAnswers(newCorrectAnswers);
    }
    else {
      setCorrectAnswers([...correctAnswers, answerToMod])
    }
  }

  const resetComponentStates = () => {
    setBody('')
    setImage(null)
    setAnswers([])
    setCorrectAnswers([])
    setRandomized(false)

    answerFormRef.current.value = ''
    imageInputRef.current.value = ''
  }

  const onFormSave = () => {
    // TODO perform sanity checks on all fields before adding!
    //  with popup windows...

    // Creating a question object, assigning the component's states to its fields:
    const newQuestion = new Question()
    newQuestion.image = image
    newQuestion.body = body
    newQuestion.answers = answers
    newQuestion.correctAnswers = correctAnswers
    newQuestion.isRandomized = randomized

    // If the questionObj is an already existing question which is being edited,
    //  we will replace it with the new object we create:
    const idx = questions.findIndex((q) => equal(questionObj, q))
    if (idx !== -1) {
      questions.splice(idx, newQuestion)
    }
    // Adding the question to the questions array in parent component ExamBuilder:
    else {
      setQuestions([...questions, newQuestion])
    }

    // Clean-up:
    // Redirecting to the Exam Form, clearing all component states, resetting the temporary questionObj:
    resetComponentStates()
    setActiveTab('examform')
  }

  const onFormDiscard = () => {
    // TODO add a popup window: "are you sure?"

    setActiveTab('examform')
    resetComponentStates()
  }

  const renderAnswers = () => {
    return (
      answers.map((answer, idx) => {
        return (
          <tr key={idx.toString()} id={idx}>
            <td>
            </td>
            <td>
              <Form.Control readOnly type='text' value={answer} className='text-muted'></Form.Control>
            </td>
            <td>
              <Button
                variant={correctAnswers.includes(answer) ? 'outline-success' : 'outline-danger'}
                onClick={() => { handleAnswerToggle(answer) }}>
                {correctAnswers.includes(answer) ? '✔️' : '❌'}
              </Button>
            </td>
            <td>
              <Button variant='secondary' onClick={() => { handleAnswerDelete(answer) }}>Delete</Button>
            </td>
          </tr>
        )
      })
    )
  }

  return (
    <Row>
      <Col className='col-12'>
        <Table responsive>
          <tbody>
            <tr>
              <td>Image</td>
              <td>
                <Image src={image === null ? placeholder : image} style={{ height: '200px', width: '400px', objectFit: 'cover' }} className='img-fluid border border-2' alt='image depicting the question' onClick={handleImageClick} />
                <input type='file' ref={imageInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
              </td>
              <td />
              <td>
                <Button variant='secondary' onClick={handleImageClear}>Clear</Button>
              </td>
            </tr>
            <tr>
              <td>Body</td>
              <td>
                <Form.Control value={body} type='text' spellCheck='true' pattern='[A-Za-z0-9]+' onChange={handleBodyChange} />
              </td>
              <td />
              <td>
                <Button variant='secondary' onClick={handleBodyClear}>Clear</Button>
              </td>
            </tr>
            <tr>
              <td>Answer</td>
              <td>
                <Form.Control ref={answerFormRef} type='text' spellCheck='true' pattern='[A-Za-z0-9]+' />
              </td>
              <td></td>
              <td>
                <ButtonGroup>
                  <Button variant='secondary' onClick={handleAnswerClear}>Clear</Button>
                  <Button variant='primary' onClick={handleAnswerAdd}>Add</Button>
                </ButtonGroup>
              </td>
            </tr>
            <tr>
              <td>Randomize?</td>
              <td>
                <BootstrapSwitchButton offlabel='No' onlabel='Yes' onChange={handleRandomToggle} />
              </td>
            </tr>
            {renderAnswers()}
          </tbody>
        </Table>
      </Col>
      <Col className='col-12 d-flex justify-content-end'>
        <ButtonGroup>
          <Button variant='warning' onClick={onFormDiscard}>Discard</Button>
          <Button variant='primary' onClick={onFormSave}>Save</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export default QuestionForm