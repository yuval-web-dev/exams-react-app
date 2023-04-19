import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Form, Button, Image, ButtonGroup, Table } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import equal from 'fast-deep-equal'

import placeholder from '../../assets/png/placeholder.png'
import greenCheck from '../../assets/svg/green-checkmark-icon.svg'
import redCross from '../../assets/svg/red-x-icon.svg'
import { Question } from '../../classes'

// TODO merge QuestionForm and EditQuestionForm!

const QuestionForm = ({ onSave, onDiscard, question }) => {
  // This will be true if we were redirected to this form by clicking 'Edit' on one of the questions in the 'all' tab
  const [isEditing, setIsEditing] = useState(false)

  const [body, setBody] = useState('')
  const [image, setImage] = useState(null)
  const [answers, setAnswers] = useState([])
  const [corrects, setCorrects] = useState([])
  const [isRandomized, setIsRandomized] = useState(false)

  const [jsonImport, setJsonImportFile] = useState(null)
  const [jsonExportName, setJsonExportName] = useState('')

  const jsonInputRef = useRef(null)
  const imageInputRef = useRef(null)
  const answerFormRef = useRef(null)

  useEffect(() => {
    if (question !== null) {
      setIsEditing(true)
      setBody(question.body)
      setImage(question.image)
      setAnswers(question.answers)
      setCorrects(question.correctAnswers)
      setIsRandomized(question.isRandomized)
    }
  }, [question])

  const resetForm = () => {
    setIsEditing(false)

    setBody('')
    setImage(null)
    setAnswers([])
    setCorrects([])
    setIsRandomized(false)

    setJsonImportFile(null)
    setJsonExportName('')

    jsonInputRef.current.value = ''
    imageInputRef.current.value = ''
    answerFormRef.current.value = ''
  }

  const handleImageChange = (e) => {
    if (e.target.files.length === 1) {
      setImage(e.target.files[0])
      imageInputRef.current.value = ''
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
      const newCorrectAnswers = corrects.filter((answer) => answer !== answerToToggle);
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

    onSave(newQuestion, isEditing)
    resetForm()
  }

  const handleAnswerChange = (idx, newAnswer) => {
    let oldAnswer = answers[idx]
    let newAnswers = [...answers]
    newAnswers[idx] = newAnswer
    setAnswers(newAnswers)

    const oldCorrectIdx = corrects.findIndex((answer) => answer === oldAnswer)
    if (oldCorrectIdx !== -1) {
      let newCorrects = [...corrects]
      newCorrects[oldCorrectIdx] = newAnswer
      setCorrects(newCorrects)
    }
  }

  const handleMoveUp = (answer, idx) => {
    if (idx > 0) {
      let newAnswers = [...answers]
      const replaced = newAnswers[idx - 1]
      newAnswers[idx - 1] = answer
      newAnswers[idx] = replaced
      setAnswers(newAnswers)
    }
  }

  const handleMoveDown = (answer, idx) => {
    if (idx < (answers.length - 1)) {
      let newAnswers = [...answers]
      const replaced = newAnswers[idx + 1]
      newAnswers[idx + 1] = answer
      newAnswers[idx] = replaced
      setAnswers(newAnswers)
    }
  }

  const handleJsonChange = (newFile) => {
    if (!newFile) {
      return
    }
    if (newFile.type !== 'application/json') {
      alert('not JSON!')
      return
    }
    setJsonImportFile(newFile)
  }

  const handleJsonImport = () => {
    const reader = new FileReader()

    reader.onload = function (e) {
      const jsonParsed = JSON.parse(e.target.result)
      const keys = Object.keys(jsonParsed)
      const possibleKeys = ['body', 'answers', 'corrects', 'isRandomized']
      if (!keys.every(key => (possibleKeys.includes(key)))) {
        alert('bad JSON!')
        return
      }
      if (jsonParsed.hasOwnProperty('body')) {
        setBody(jsonParsed.body)
      }

      if (jsonParsed.hasOwnProperty('answers')) {
        setAnswers(jsonParsed.answers)
      }

      if (jsonParsed.hasOwnProperty('corrects')) {
        setCorrects(jsonParsed.corrects)
      }

      if (jsonParsed.hasOwnProperty('isRandomized')) {
        setIsRandomized(jsonParsed.isRandomized)
      }
    }
    reader.readAsText(jsonImport)
  }

  const handleJsonExport = () => {
    const data = {
      body,
      answers,
      corrects,
      isRandomized
    }
    const json = JSON.stringify(data)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(json))
    // element.setAttribute('download', `${jsonName === '' ? 'question' : jsonName}.json`)
    element.setAttribute('download', `${jsonExportName === '' ? 'untitled_question' : jsonExportName}.json`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const renderAnswers = () => {
    return (
      answers.map((answer, idx) => {
        return (
          <tr key={idx.toString()} id={idx}>
            <td>{idx + 1}</td>

            <td>
              <Form.Control type='text' value={answer} onChange={e => handleAnswerChange(idx, e?.target?.value)} />
            </td>
            <td>
              <Button
                variant='light'
                onClick={() => handleAnswerToggleCorrect(answer)}>
                <img src={corrects.includes(answer) ? greenCheck : redCross} height='30px' />
              </Button>
            </td>
            <td>
              <ButtonGroup>
                <Button variant='light' onClick={() => handleMoveUp(answer, idx)}>⯅</Button>
                <Button variant='light' onClick={() => handleMoveDown(answer, idx)}>⯆</Button>
              </ButtonGroup>
              <Button variant='light' onClick={e => handleAnswerDiscard(idx, answer)}>Discard</Button>
            </td>
          </tr>
        )
      })
    )
  }

  return (
    <Row>
      <Col xs={12}>
        <Table responsive className='align-middle'>
          <tbody>
            <tr>
              <td>From JSON</td>
              <td>
                <Form>
                  <Form.Control
                    ref={jsonInputRef}
                    type='file'
                    accept='.json'
                    multiple={false}
                    onChange={(e) => handleJsonChange(e?.target?.files[0])} />
                </Form>
              </td>
              <td>
                <Button
                  disabled={jsonImport === null}
                  onClick={() => handleJsonImport()}>Import</Button>
              </td>
            </tr>
            <tr>
              <td>To JSON</td>
              <td>
                <Form.Control
                  value={jsonExportName}
                  // This pattern should allow only alnum chars, underscores, and hyphens,
                  //  with the condition that the string must start with a letter and end with an alnum chars:
                  pattern="/^[a-zA-Z][\w-]*[a-zA-Z\d]$/"
                  placeholder='Name the JSON export file...'
                  onChange={(e) => setJsonExportName(e?.target?.value)}
                />
              </td>
              <td>
                <Button onClick={() => handleJsonExport()}>Export</Button>
              </td>
            </tr>
            <tr>
              <td>Image</td>
              <td>
                <Image
                  src={image === null ? placeholder : URL.createObjectURL(image)}
                  style={{ height: '200px', width: '400px', objectFit: 'cover' }}
                  className='img-fluid border border-2'
                  alt='image depicting the question'
                  onClick={e => imageInputRef.current.click()} />
                <input
                  type='file'
                  accept='image/png, image/jpeg, image/gif, image/webp'
                  ref={imageInputRef}
                  style={{ display: 'none' }}
                  onChange={e => handleImageChange(e)} />
              </td>
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
                  checked={isRandomized}
                  offlabel='No'
                  onlabel='Yes'
                  onChange={e => setIsRandomized((prevState) => !prevState)} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
      <Col xs={12}>
        <Table hover responsive className='align-middle'>
          <thead>
            <th>#</th>
            <th>Body</th>
            <th>Correct</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {renderAnswers()}
          </tbody>
        </Table>
      </Col>
      <Col xs={12}>
        <ButtonGroup>
          <Button variant='warning' onClick={e => handleQuestionDiscard()}>Discard</Button>
          <Button variant='primary' onClick={e => handleQuestionSave()}>Save</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export default QuestionForm