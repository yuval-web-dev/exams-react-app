import React, { useState, useRef } from 'react';
import { Form, Button, Image, ButtonGroup } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import placeholder from '../../assets/placeholder.png'
import { Question } from '../../classes';


const QuestionForm = ({ questions, setQuestions, setActiveTab }) => {
  const [body, setBody] = useState('')
  const [image, setImage] = useState(placeholder)
  const [answers, setAnswers] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [randomized, setRandomized] = useState(false)

  const imageInputRef = useRef(null);
  // const bodyFormRef = useRef(null);
  const answerFormRef = useRef(null);

  const handleClick = () => {
    if (imageInputRef !== null) {
      imageInputRef.current.click()
    }
  }

  const handleImageClear = () => {
    setImage(placeholder)
  }

  const handleImageChange = (e) => {
    // TODO check if upload's valid before setting
    if (e.target.files.length > 0) {
      const uploadedFile = e.target.files[0]
      const imageUrl = URL.createObjectURL(uploadedFile)
      setImage(imageUrl)
    }
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

  const renderAnswers = () => (
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
            <Button variant='outline-warning' onClick={() => { handleAnswerDelete(answer) }}>Delete</Button>
          </td>
        </tr>
      )
    })
  )

  const onFormSubmit = () => {
    // TODO validity checks on all fields before adding to the questions array
    const newQuestion = new Question()
    newQuestion.text = body
    newQuestion.answers = answers
    newQuestion.correctAnswer = correctAnswers
    newQuestion.image = image
    newQuestion.isRandomized = randomized
    setQuestions([...questions, newQuestion])

    setImage(placeholder)
    setBody('')
    answerFormRef.current.value = ''

    setActiveTab('examform')
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Image</td>
            <td>
              <Image src={image} style={{ height: '200px', width: '400px', objectFit: 'cover' }} className='img-fluid border border-2' alt='image depicting the question' onClick={handleClick} />
              <input type='file' ref={imageInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
            </td>
            <td />
            <td>
              <Button variant='outline-warning' onClick={handleImageClear}>Clear</Button>
            </td>
          </tr>
          <tr>
            <td>Body</td>
            <td>
              <Form.Control value={body} type='text' spellCheck='true' pattern='[A-Za-z0-9]+' onChange={handleBodyChange} />
            </td>
            <td />
            <td>
              <Button variant='outline-warning' onClick={handleBodyClear}>Clear</Button>
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
                <Button variant='outline-warning' onClick={handleAnswerClear}>Clear</Button>
                <Button variant='outline-primary' onClick={handleAnswerAdd}>Add</Button>
              </ButtonGroup>
            </td>
          </tr>
          <tr>
            <td>Randomize?</td>
            <BootstrapSwitchButton offlabel='No' onlabel='Yes' onChange={handleRandomToggle} />
          </tr>
          {renderAnswers()}
        </tbody>
      </table>
      <Button onClick={onFormSubmit}>Submit</Button>
    </div>
  )
}

export default QuestionForm