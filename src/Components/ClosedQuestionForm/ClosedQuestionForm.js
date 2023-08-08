import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Form, Button, Image as BootstrapImage, ButtonGroup, Table, Container } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// Javascript
import { ClosedQuestion } from '../../classes.ts'
import { saveImageToCache, getImageFromCache } from '../helpers.js'
import consts from './consts.js'

// Assets
import { green, red } from '../../assets/svg'

const ClosedQuestionForm = ({ onSave, onDiscard, question }) => {
  // States
  const [isEditing, setIsEditing] = useState(false) // 'true' if the user was redirected here by clicking 'Edit' in the 'all' tab.
  const [jsonImport, setJsonImport] = useState(null) // The actual JSON file uploaded via input
  const [jsonExport, setJsonExport] = useState('') // The name of the to-be exported JSON file

  // Form values states
  const [type, setType] = useState('text')
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)

  // const [imageUrl, setImageUrl] = useState(null)
  const [answers, setAnswers] = useState([])
  const [correct, setCorrect] = useState(null)
  const [shuffle, setShuffle] = useState(false)

  // Refs
  const jsonInputRef = useRef(null)
  const imageInputRef = useRef(null)
  const answerFormRef = useRef(null)

  // UseEffect
  // const effect = () => {
  //   if (question !== null) {
  //     setIsEditing(true)
  //     setBody(question.body)
  //     setImg(question.image)
  //     setAnswers(question.answers)
  //     setCorrect(question.correctAnswers)
  //     setShuffle(question.isRandomized)
  //   }
  // }
  // const dependancy = [question]
  // useEffect(effect, dependancy)

  // Handlers
  const handleImageChange = async (e) => {
    // Set the states
    const newImage = e.target.files[0]
    setImage(newImage)
    // setImageUrl(URL.createObjectURL(newImage))

    // // Save image to cache
    // await saveImageToCache(newImage)

    // // Update the input to be empty to allow same file consecutive upload
    // imageInputRef.current.value = ''
  }

  const handleImageClear = () => {
    setImage(null)
    imageInputRef.current.value = ''
  }

  const handleAnswerAdd = () => {
    const newAnswer = answerFormRef.current.value.trim()
    if (answers.includes(newAnswer)) {
      // TODO add a modal to inform answer already exists
    }
    else {
      setAnswers([...answers, newAnswer])
    }
    answerFormRef.current.value = ''
  }

  const handleAnswerDiscard = (idx, answerToDiscard) => {
    const newAnswers = [...answers]
    newAnswers.splice(idx, 1)
    setAnswers(newAnswers)
    if (correct === answerToDiscard) {
      setCorrect(null)
    }
  }

  const handleAnswerToggleCorrect = (answerToToggle) => {
    setCorrect(answerToToggle)
  }

  const handleQuestionDiscard = () => {
    // TODO popup window: "are you sure?"
    onDiscard()
    // cleanForm()
  }

  const handleQuestionSave = () => {
    // sanity check
    if (answers.length < 2) {
      // popup modal
      return
    }
    if (type === 'text' && correct === null) {
      // popup modal
      return
    }
    if (type === 'image' && image === null) {
      // popup modal
      return
    }

    const newQuestion = new ClosedQuestion(
      type === 'text' ? text : image,
      answers,
      correct,
      shuffle
    )

    onSave(newQuestion)
    // cleanForm()
  }

  const handleAnswerChange = (idx, newAnswer) => {
    let oldAnswer = answers[idx]
    let newAnswers = [...answers]
    newAnswers[idx] = newAnswer
    setAnswers(newAnswers)

    const oldCorrectIdx = correct.findIndex((answer) => answer === oldAnswer)
    if (oldCorrectIdx !== -1) {
      let newCorrects = [...correct]
      newCorrects[oldCorrectIdx] = newAnswer
      setCorrect(newCorrects)
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

  // const handleJsonChange = (newFile) => {
  //   const allowedTypes = ['application/json']
  //   if (newFile === undefined) {
  //     return
  //   }
  //   else if (!allowedTypes.includes(newFile?.type)) {
  //     alert(`Allowed file types: ${[...allowedTypes]}`)
  //     setJsonImport(null)
  //   }
  //   else {
  //     setJsonImport(newFile)
  //   }
  //   jsonInputRef.current.value = ''
  // }

  // const handleJsonImport = () => {
  //   // const reader = new FileReader()

  //   // reader.onload = async (e) => {
  //   //   const jsonParsed = JSON.parse(e.target.result)
  //   //   const keys = Object.keys(jsonParsed)
  //   //   const possibleKeys = ['body', 'image', 'answers', 'corrects', 'isRandomized']
  //   //   if (!keys.every(key => (possibleKeys.includes(key)))) {
  //   //     alert('bad JSON!')
  //   //     return
  //   //   }
  //   //   if (jsonParsed.hasOwnProperty('body')) {
  //   //     setBody(jsonParsed.body)
  //   //   }
  //   //   if (jsonParsed.hasOwnProperty('image')) {
  //   //     const imageName = jsonParsed.image
  //   //     const storedImageBlob = await getImageFromCache(imageName) // Returns Blob

  //   //     if (storedImageBlob === null) {
  //   //       alert(`Could not find '${imageName}' in cache`)
  //   //     }
  //   //     else {
  //   //       // const storedImageData = URL.createObjectURL(storedImageBlob)
  //   //       // const storedImage = new Image()
  //   //       // storedImage.onload = () => {
  //   //       //   setImageUrl(storedImage)
  //   //       // }
  //   //       // storedImage.src = storedImageData
  //   //       // setImageUrl(storedImageData)
  //   //       const storedImageData = URL.createObjectURL(storedImageBlob)
  //   //       const storedImage = new Image()
  //   //       storedImage.src = storedImageData
  //   //       setImageUrl(storedImage)
  //   //     }
  //   //   }
  //   //   if (jsonParsed.hasOwnProperty('answers')) {
  //   //     setAnswers(jsonParsed.answers)
  //   //   }

  //   //   if (jsonParsed.hasOwnProperty('corrects')) {
  //   //     setCorrect(jsonParsed.corrects)
  //   //   }

  //   //   if (jsonParsed.hasOwnProperty('isRandomized')) {
  //   //     setShuffle(jsonParsed.isRandomized)
  //   //   }
  //   // }
  //   // reader.readAsText(jsonImport)

  //   // setJsonImport(null)
  // }

  // const handleJsonExport = () => {
  //   // const data = {
  //   //   body,
  //   //   image: img.name,
  //   //   answers,
  //   //   corrects: correct,
  //   //   isRandomized: shuffle
  //   // }
  //   // const json = JSON.stringify(data)
  //   // const element = document.createElement('a')
  //   // element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(json))
  //   // // element.setAttribute('download', `${jsonName === '' ? 'question' : jsonName}.json`)
  //   // element.setAttribute('download', `${jsonExport === '' ? 'untitled_question' : jsonExport}.json`)
  //   // element.style.display = 'none'
  //   // document.body.appendChild(element)
  //   // element.click()
  //   // document.body.removeChild(element)
  // }

  const renderAnswers = () => {
    return (
      answers.map((answer, idx) => {
        return (
          <tr key={idx.toString()} id={idx}>
            <td>{idx + 1}</td>
            <td>
              {/* <Form.Control type='text' value={answer} onChange={e => handleAnswerChange(idx, e?.target?.value)} /> */}
              {answers[idx]}
            </td>
            <td>
              <Button
                variant='light'
                onClick={() => handleAnswerToggleCorrect(answer)}
                disabled={(correct === answer) ? true : false}>
                <img
                  src={correct === answer ? green : red}
                  height='30px' />
              </Button>
            </td>
            <td>
              <ButtonGroup>
                <Button variant='light' onClick={() => handleMoveUp(answer, idx)}>⯅</Button>
                <Button variant='light' onClick={() => handleMoveDown(answer, idx)}>⯆</Button>
              </ButtonGroup>
              <Button variant='light' onClick={() => handleAnswerDiscard(idx, answer)}>Discard</Button>
            </td>
          </tr>
        )
      })
    )
  }

  const cleanForm = () => {
    // setIsEditing(false)

    // setBody('')
    // setImg(null)
    // setAnswers([])
    // setCorrect([])
    // setShuffle(false)

    // setJsonImport(null)
    // setJsonExport('')

    // jsonInputRef.current.value = ''
    // imageInputRef.current.value = ''
    // answerFormRef.current.value = ''
  }

  const ImageInput = () => (
    <Form.Control
      ref={imageInputRef}
      type='file'
      accept='image/*'
      multiple={false}
      onChange={handleImageChange} />
  )

  const ImageClearButton = () => (
    <Button
      variant='light'
      onClick={handleImageClear}>Clear</Button>
  )

  const TextInput = () => (
    <Form.Control
      type='text'
      spellCheck='true'
      pattern='[A-Za-z0-9]+'
      onChange={(e) => { setText(e.target.value) }} />
  )

  const TextClearButton = () => (
    <Button
      variant='light'
      onClick={() => { setText('') }}>Clear</Button>
  )

  const onTypeChange = () => {
    if (type === 'text') { // from text to image
      setType('image')
      setText('')
    }
    else { // from image to text
      setType('text')
      setImage(null)
    }
  }

  return (
    // <Row>
    //   <Col>
    //     <Table borderless>
    //       <tbody>
    //         {/* <tr>
    //           <td>From JSON</td>
    //           <td>
    //             <Form>
    //               <Form.Control
    //                 ref={jsonInputRef}
    //                 type='file'
    //                 accept='.json'
    //                 multiple={false}
    //                 onChange={e => handleJsonChange(e?.target?.files[0])} />
    //             </Form>
    //           </td>
    //           <td>
    //             <Button
    //               disabled={jsonImport === null}
    //               onClick={() => handleJsonImport()}>Import</Button>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>To JSON</td>
    //           <td>
    //             <Form.Control
    //               value={jsonExport}
    //               // This pattern should allow only alnum chars, underscores, and hyphens,
    //               //  with the condition that the string must start with a letter and end with an alnum chars:
    //               pattern="/^[a-zA-Z][\w-]*[a-zA-Z\d]$/"
    //               placeholder='Name the JSON export file...'
    //               onChange={e => setJsonExport(e?.target?.value)}
    //             />
    //           </td>
    //           <td>
    //             <Button onClick={() => handleJsonExport()}>Export</Button>
    //           </td>
    //         </tr> */}
    //         <tr>
    //           <td>
    //             Question Type
    //           </td>
    //           <td>
    //             <BootstrapSwitchButton
    //               onstyle='light'
    //               width={100}
    //               offlabel={'Text'}
    //               onlabel={'Image'}
    //               onChange={onTypeChange} />
    //           </td>
    //         </tr>
    //         {type === 'text' ? TextInput() : ImageInput()}
    //         <tr>
    //           <td>New Answer</td>
    //           <td>
    //             <Form.Control
    //               ref={answerFormRef}
    //               type='text'
    //               spellCheck='true'
    //               pattern='[A-Za-z0-9]+' />
    //           </td>
    //           <td>
    //             <ButtonGroup>
    //               <Button
    //                 variant='light'
    //                 onClick={e => answerFormRef.current.value = ''}>Clear</Button>
    //               <Button
    //                 variant='primary'
    //                 onClick={handleAnswerAdd}>Add</Button>
    //             </ButtonGroup>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Shuffle Answers</td>
    //           <td>
    //             <BootstrapSwitchButton
    //               checked={shuffle}
    //               offlabel='No'
    //               onlabel='Yes'
    //               onChange={() => setShuffle(!shuffle)} />
    //           </td>
    //         </tr>
    //       </tbody>
    //     </Table>
    //   </Col>
    //   <Col xs={12}>
    <Container>
      <Row>
        <Col xs={2}>Question Type</Col>
        <Col xs={8}>
          <BootstrapSwitchButton
            onstyle='light'
            width={100}
            offlabel={'Text'}
            onlabel={'Image'}
            onChange={onTypeChange} />
        </Col>
      </Row>
      <Row>
        <Col xs={2}>Body</Col>
        <Col xs={8}>
          {type === 'text' ? TextInput() : ImageInput()}
        </Col>
        <Col xs={2} >
          {type === 'text' ? TextClearButton() : ImageClearButton()}
        </Col>
      </Row>
      <Row>
        <Col xs={2}>New Answer</Col>
        <Col xs={8}>
          <Form.Control
            ref={answerFormRef}
            type='text'
            spellCheck='true'
            pattern='[A-Za-z0-9]+' />
        </Col>
        <Col xs={2}>
          <ButtonGroup>
            <Button
              variant='light'
              onClick={e => answerFormRef.current.value = ''}>Clear</Button>
            <Button
              variant='primary'
              onClick={handleAnswerAdd}>Add</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          Shuffle Answers
        </Col>
        <Col md={8}>
          <BootstrapSwitchButton
            checked={shuffle}
            offlabel='No'
            onlabel='Yes'
            onChange={() => setShuffle(!shuffle)} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
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
      </Row>
      <Row>
        <Col md={12}>
          <ButtonGroup>
            <Button variant='warning' onClick={handleQuestionDiscard}>Discard</Button>
            <Button variant='primary' onClick={handleQuestionSave}>Save</Button>
          </ButtonGroup>
        </Col>
      </Row>



    </Container>
  )
}

export default ClosedQuestionForm