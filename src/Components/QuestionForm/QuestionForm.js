import React, { useState, useRef } from 'react';
import { Row, Col, Form, Button, Image, ButtonGroup, Table } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import equal from 'fast-deep-equal'

import placeholder from '../../assets/placeholder.png'
import greenCheck from '../../assets/svgs/green-checkmark-icon.svg'
import redCross from '../../assets/svgs/red-x-icon.svg'
import { Question } from '../../classes'


const QuestionForm = ({ onSave, onDiscard }) => {
  const [body, setBody] = useState('')
  const [image, setImage] = useState(null)
  const [answers, setAnswers] = useState([])
  const [corrects, setCorrects] = useState([])
  const [isRandomized, setIsRandomized] = useState(false)

  const imageInputRef = useRef(null);
  const answerFormRef = useRef(null);

  const resetForm = () => {
    setBody('')
    setImage(null)
    setAnswers([])
    setCorrects([])
    setIsRandomized(false)
  }

  const handleImageChange = (e) => {
    if (e.target.files.length === 1) {
      setImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleImageClear = () => {
    setImage(null)
    imageInputRef.current.value = ''
  }

  const handleAnswerAdd = () => {
    const newAnswer = answerFormRef.current.value.trim()
    if (newAnswer !== '') {
      setAnswers([...answers, newAnswer])
      answerFormRef.current.value = ''
    }
  }

  const handleAnswerDiscard = (idx, answerToDiscard) => {
    const newAnswers = [...answers]
    newAnswers.splice(idx, 1)
    setAnswers(newAnswers)
    if (corrects.includes(answerToDiscard)) {
      const newCorrectAnswers = corrects.filter((answer) => answer !== answerToDiscard);
      setCorrects(newCorrectAnswers);
    }
  }

  const handleAnswerToggleCorrect = (answerToToggle) => {
    if (corrects.includes(answerToToggle)) {
      let newCorrectAnswers = corrects.filter((answer) => answer !== answerToToggle);
      setCorrects(newCorrectAnswers);
    }
    else {
      setCorrects([...corrects, answerToToggle])
    }
  }


  const handleQuestionDiscard = () => {
    // TODO popup window: "are you sure?"

    onDiscard()
    resetForm()
  }

  const handleQuestionSave = () => {
    // TODO sanity check

    const newQuestion = new Question()
    newQuestion.image = image
    newQuestion.body = body
    newQuestion.answers = answers
    newQuestion.correctAnswers = corrects
    newQuestion.isRandomized = isRandomized

    onSave(newQuestion)
    resetForm()
  }

  const handleAnswerOnChange = (idx, newAnswer) => {
    let newQuestionAnswers = [...answers]
    newQuestionAnswers[idx] = newAnswer
    setAnswers(newQuestionAnswers)
  }

  const renderAnswers = () => {
    return (
      answers.map((answer, idx) => {
        return (
          <tr key={idx.toString()} id={idx}>
            <td>
            </td>
            <td>
              <Form.Control type='text' value={answer} onChange={e => handleAnswerOnChange = (idx, e?.target?.value)} />
            </td>
            <td>
              <Button
                variant='light'
                onClick={() => handleAnswerToggleCorrect(answer)}>
                <img src={corrects.includes(answer) ? greenCheck : redCross} height='30px' />
              </Button>
            </td>
            <td>
              <Button variant='light' onClick={e => handleAnswerDiscard(idx, answer)}>Discard</Button>
            </td>
          </tr>
        )
      })
    )
  }

  return (
    <Row>
      <Col>
        <Table>
          <tbody>
            <tr>
              <td>Image</td>
              <td>
                <Image
                  src={image === null ? placeholder : image}
                  style={{ height: '200px', width: '400px', objectFit: 'cover' }}
                  className='img-fluid border border-2'
                  alt='image depicting the question'
                  onClick={e => imageInputRef.current.click()} />
                <input
                  type='file'
                  ref={imageInputRef}
                  style={{ display: 'none' }}
                  onChange={e => handleImageChange(e)} />
              </td>
              <td />
              <td>
                <Button
                  variant='light'
                  onClick={e => handleImageClear()}>Clear</Button>
              </td>
            </tr>
            <tr>
              <td>Body</td>
              <td>
                <Form.Control
                  value={body}
                  type='text'
                  spellCheck='true'
                  pattern='[A-Za-z0-9]+'
                  onChange={e => setBody(e?.target?.value)} />
              </td>
              <td />
              <td>
                <Button
                  variant='light'
                  onClick={e => setBody('')}>Clear</Button>
              </td>
            </tr>
            <tr>
              <td>New Answer</td>
              <td>
                <Form.Control
                  ref={answerFormRef}
                  type='text'
                  spellCheck='true'
                  pattern='[A-Za-z0-9]+' />
              </td>
              <td></td>
              <td>
                <ButtonGroup>
                  <Button
                    variant='light'
                    onClick={e => answerFormRef.current.value = ''}>Clear</Button>
                  <Button
                    variant='primary'
                    onClick={e => handleAnswerAdd()}>Add</Button>
                </ButtonGroup>
              </td>
            </tr>
            <tr>
              <td>Randomize?</td>
              <td>
                <BootstrapSwitchButton
                  offlabel='No'
                  onlabel='Yes'
                  onChange={e => setIsRandomized((prevState) => !prevState)} />
              </td>
            </tr>
            {renderAnswers()}
          </tbody>
        </Table>
      </Col>
      <Col className='col-12 d-flex justify-content-end'>
        <ButtonGroup>
          <Button variant='warning' onClick={e => handleQuestionDiscard()}>Discard</Button>
          <Button variant='primary' onClick={e => handleQuestionSave()}>Save</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export default QuestionForm