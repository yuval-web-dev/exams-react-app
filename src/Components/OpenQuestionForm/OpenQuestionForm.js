import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Form, Button, Image as BootstrapImage, ButtonGroup, Table } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// Javascript
import { Question } from '../../classes'
import { saveImageToCache, getImageFromCache } from '../helpers.js'
import consts from './consts.js'

// Assets
import placeholder from '../../assets/png/placeholder.png'
import greenCheck from '../../assets/svg/green-checkmark-icon.svg'
import redCross from '../../assets/svg/red-x-icon.svg'

const QuestionForm = ({ onSave, onDiscard, question }) => {
  // States
  const [isEditing, setIsEditing] = useState(false) // 'true' if the user was redirected here by clicking 'Edit' in the 'all' tab.
  const [jsonImport, setJsonImport] = useState(null) // The actual JSON file uploaded via input
  const [jsonExport, setJsonExport] = useState('') // The name of the to-be exported JSON file

  // Form values states
  const [body, setBody] = useState('')
  const [image, setImage] = useState(null) // file
  const [imageUrl, setImageUrl] = useState(null)
  const [answers, setAnswers] = useState([]) // [string, string, ...]
  const [corrects, setCorrects] = useState([]) // [string, string, ...]
  const [isRandomized, setIsRandomized] = useState(false)

  // Refs
  const jsonInputRef = useRef(null)
  const imageInputRef = useRef(null)
  const answerFormRef = useRef(null)

  // UseEffect
  const effect = () => {
    if (question !== null) {
      setIsEditing(true)
      setBody(question.body)
      setImage(question.image)
      setAnswers(question.answers)
      setCorrects(question.correctAnswers)
      setIsRandomized(question.isRandomized)
    }
  }
  const dependancy = [question]
  useEffect(effect, dependancy)

  // Handlers
  const handleImageChange = async (newImage) => {
    // Set the states
    setImage(newImage)
    setImageUrl(URL.createObjectURL(newImage))

    // Save image to cache
    await saveImageToCache(newImage)

    // Update the input to be empty to allow same file consecutive upload
    imageInputRef.current.value = ''
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
    cleanForm()
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
    cleanForm()
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
    const allowedTypes = ['application/json']
    if (newFile === undefined) {
      return
    }
    else if (!allowedTypes.includes(newFile?.type)) {
      alert(`Allowed file types: ${[...allowedTypes]}`)
      setJsonImport(null)
    }
    else {
      setJsonImport(newFile)
    }
    jsonInputRef.current.value = ''
  }

  const handleJsonImport = () => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      const jsonParsed = JSON.parse(e.target.result)
      const keys = Object.keys(jsonParsed)
      const possibleKeys = ['body', 'image', 'answers', 'corrects', 'isRandomized']
      if (!keys.every(key => (possibleKeys.includes(key)))) {
        alert('bad JSON!')
        return
      }
      if (jsonParsed.hasOwnProperty('body')) {
        setBody(jsonParsed.body)
      }
      if (jsonParsed.hasOwnProperty('image')) {
        const imageName = jsonParsed.image
        const storedImageBlob = await getImageFromCache(imageName) // Returns Blob

        if (storedImageBlob === null) {
          alert(`Could not find '${imageName}' in cache`)
        }
        else {
          // const storedImageData = URL.createObjectURL(storedImageBlob)
          // const storedImage = new Image()
          // storedImage.onload = () => {
          //   setImageUrl(storedImage)
          // }
          // storedImage.src = storedImageData
          // setImageUrl(storedImageData)
          const storedImageData = URL.createObjectURL(storedImageBlob)
          const storedImage = new Image()
          storedImage.src = storedImageData
          setImageUrl(storedImage)
        }
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

    setJsonImport(null)
  }

  const handleJsonExport = () => {
    const data = {
      body,
      image: image.name,
      answers,
      corrects,
      isRandomized
    }
    const json = JSON.stringify(data)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(json))
    // element.setAttribute('download', `${jsonName === '' ? 'question' : jsonName}.json`)
    element.setAttribute('download', `${jsonExport === '' ? 'untitled_question' : jsonExport}.json`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Renderers
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

  // Cleaners
  const cleanForm = () => {
    setIsEditing(false)

    setBody('')
    setImage(null)
    setAnswers([])
    setCorrects([])
    setIsRandomized(false)

    setJsonImport(null)
    setJsonExport('')

    jsonInputRef.current.value = ''
    imageInputRef.current.value = ''
    answerFormRef.current.value = ''
  }

  return (
    <Row>
      <Col xs={12}>
        <Table responsive borderless className='align-middle'>
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
                    onChange={e => handleJsonChange(e?.target?.files[0])} />
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
                  value={jsonExport}
                  // This pattern should allow only alnum chars, underscores, and hyphens,
                  //  with the condition that the string must start with a letter and end with an alnum chars:
                  pattern="/^[a-zA-Z][\w-]*[a-zA-Z\d]$/"
                  placeholder='Name the JSON export file...'
                  onChange={e => setJsonExport(e?.target?.value)}
                />
              </td>
              <td>
                <Button onClick={() => handleJsonExport()}>Export</Button>
              </td>
            </tr>
            <tr>
              <td>Image</td>
              <td>
                <BootstrapImage
                  // src={image === null ? placeholder : URL.createObjectURL(image)}
                  src={image === null ? placeholder : imageUrl}
                  style={{ height: '200px', width: '400px', objectFit: 'cover' }}
                  className='img-fluid border border-2'
                  alt='image depicting the question'
                  onClick={e => imageInputRef.current.click()} />
                <input
                  type='file'
                  accept={consts.acceptedImageTypes}
                  ref={imageInputRef}
                  style={{ display: 'none' }}
                  onChange={async e => {
                    // Check prevents possible crash when user does not select any file in dialog
                    if (e?.target?.files?.length === 1) {
                      handleImageChange(e?.target?.files[0])
                    }
                  }} />
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
                  onClick={() => setBody('')}>Clear</Button>
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
                    onClick={handleAnswerAdd}>Add</Button>
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
                  onChange={() => setIsRandomized(!isRandomized)} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
      <Col xs={12}>
        <Table hover responsive className='align-middle'>
          <thead>
            <tr>
              <th>#</th>
              <th>Body</th>
              <th>Correct</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderAnswers()}
          </tbody>
        </Table>
      </Col>
      <Col xs={12}>
        <ButtonGroup>
          <Button variant='warning' onClick={handleQuestionDiscard}>Discard</Button>
          <Button variant='primary' onClick={handleQuestionSave}>Save</Button>
        </ButtonGroup>
      </Col>
      <Button variant='outline-danger' onClick={() => {
        alert(image)
      }}>Test</Button>
    </Row>
  )
}

export default QuestionForm