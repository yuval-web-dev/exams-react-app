import React, { useState, useRef, useImperativeHandle, forwardRef } from "react"
import { Row, Col, Form, Button, Image as BootstrapImage, ButtonGroup, Table, Container } from "react-bootstrap"
import BootstrapSwitchButton from "bootstrap-switch-button-react"

import { ClosedQuestion } from "../../classes.ts"
import { saveImageToCache, getImageFromCache } from "../helpers"
import consts from "./consts"
import { BottomControlBar } from "../index"

import { green, red } from "../../assets/svg"


const ClosedQuestionForm = forwardRef((props = {}, ref) => {
  useImperativeHandle(ref, () => ({
    error() {
      return (
        (type === "text" && text === defaultStates.text) ||
        (type === "image" && image === defaultStates.image) ||
        (answers === defaultStates.answers) ||
        (answers.length < 2) ||
        (correct === defaultStates.correct)
      )
    },
    yieldObj() {
      return new ClosedQuestion(
        type === "text" ? text : image,
        answers,
        correct,
        shuffle
      )
    }
  }))

  const defaultStates = {
    type: "text",
    text: "",
    image: null,
    answers: [],
    correct: "",
    shuffle: false
  }

  const defaultRefs = {
    imageInput: null,
    answerForm: null
  }

  const [type, setType] = useState(defaultStates.type)
  const [text, setText] = useState(defaultStates.text)
  const [image, setImage] = useState(defaultStates.image)
  const [answers, setAnswers] = useState(defaultStates.answers)
  const [correct, setCorrect] = useState(defaultStates.correct)
  const [shuffle, setShuffle] = useState(defaultStates.shuffle)

  const imageInputRef = useRef(defaultRefs.imageInput)
  const answerFormRef = useRef(defaultRefs.answerForm)

  const handleImageUpload = async (e) => {
    // Set the states
    const newImage = e.target.files[0]
    setImage(newImage)
    // setImageUrl(URL.createObjectURL(newImage))

    // // Save image to cache
    // await saveImageToCache(newImage)

    // // Update the input to be empty to allow same file consecutive upload
    // imageInputRef.current.value = ""
  }

  const testStringPattern = (s, pattern) => {
    const patternRegex = new RegExp(pattern)
    return patternRegex.test(s)
  }

  const handleAnswerAdd = () => {
    const newAnswer = answerFormRef.current.value.trim()
    if (testStringPattern(newAnswer) === false) {
      return
    }
    if (newAnswer === "") {
      return
    }
    if (answers.includes(newAnswer)) {
      // TODO add a modal to inform answer already exists
      return
    }
    else {
      setAnswers([...answers, newAnswer])
      answerFormRef.current.value = ""
    }
  }

  const handleAnswerDiscard = (answer) => {
    setAnswers(answers.filter(i => i !== answer))
    if (correct === answer) {
      setCorrect(defaultStates.correct)
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
  //   const allowedTypes = ["application/json"]
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
  //   jsonInputRef.current.value = ""
  // }

  // const handleJsonImport = () => {
  //   // const reader = new FileReader()

  //   // reader.onload = async (e) => {
  //   //   const jsonParsed = JSON.parse(e.target.result)
  //   //   const keys = Object.keys(jsonParsed)
  //   //   const possibleKeys = ["body", "image", "answers", "corrects", "isRandomized"]
  //   //   if (!keys.every(key => (possibleKeys.includes(key)))) {
  //   //     alert("bad JSON!")
  //   //     return
  //   //   }
  //   //   if (jsonParsed.hasOwnProperty("body")) {
  //   //     setBody(jsonParsed.body)
  //   //   }
  //   //   if (jsonParsed.hasOwnProperty("image")) {
  //   //     const imageName = jsonParsed.image
  //   //     const storedImageBlob = await getImageFromCache(imageName) // Returns Blob

  //   //     if (storedImageBlob === null) {
  //   //       alert(`Could not find "${imageName}" in cache`)
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
  //   //   if (jsonParsed.hasOwnProperty("answers")) {
  //   //     setAnswers(jsonParsed.answers)
  //   //   }

  //   //   if (jsonParsed.hasOwnProperty("corrects")) {
  //   //     setCorrect(jsonParsed.corrects)
  //   //   }

  //   //   if (jsonParsed.hasOwnProperty("isRandomized")) {
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
  //   // const element = document.createElement("a")
  //   // element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(json))
  //   // // element.setAttribute("download", `${jsonName === "" ? "question" : jsonName}.json`)
  //   // element.setAttribute("download", `${jsonExport === "" ? "untitled_question" : jsonExport}.json`)
  //   // element.style.display = "none"
  //   // document.body.appendChild(element)
  //   // element.click()
  //   // document.body.removeChild(element)
  // }

  const rowClass = "align-items-center"

  const style = {
    correct: { backgroundColor: `rgba(80, 224, 120, 0.1)` },
    wrong: { backgroundColor: `rgba(224, 80, 80, 0.1)` }
  }

  const buttonVariant = "outline-light"

  const AnswersTable = () => (
    <Table
      hover={true}
      responsive={true}>
      <tbody>
        {answers.map((answer, idx) => {
          return (
            <tr
              key={answer}
              style={answer === correct ? style.correct : style.wrong}>
              <td>
                <Button
                  variant={buttonVariant}
                  onClick={() => setCorrect(answer)}>
                  <img
                    src={correct === answer ? green : red}
                    height="30px" />
                </Button>
              </td>
              <td className="w-100">
                {answer}
              </td>
              <td>
                <ButtonGroup>
                  <Button
                    variant={buttonVariant}
                    onClick={() => handleMoveUp(answer, idx)}>
                    ⯅
                  </Button>
                  <Button
                    variant={buttonVariant}
                    onClick={() => handleMoveDown(answer, idx)}>
                    ⯆
                  </Button>
                  <Button
                    variant={buttonVariant}
                    onClick={() => handleAnswerDiscard(answer)}>
                    Discard
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )

  const ImageInput = () => (
    <Form.Control
      ref={imageInputRef}
      type="file"
      accept="image/*"
      multiple={false}
      onChange={handleImageUpload} />
  )

  const TextInput = () => (
    <Form.Control
      required={true}
      type="text"
      spellCheck={true}
      pattern={consts.answerPattern}
      onChange={e => setText(e.target.value)} />
  )

  const handleTypeChange = () => {
    if (type === "text") { // from text to image
      setType("image")
      setText(defaultStates.text)
    }
    else { // from image to text
      setType("text")
      setImage(defaultStates.image)
    }
  }

  const BodyRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1}>
        Body
      </Col>
      <Col xs={consts.col2}>
        {type === "text" ? TextInput() : ImageInput()}
      </Col>
      <Col xs={consts.col3}>
        <BootstrapSwitchButton
          width={100}
          onstyle="light"
          offlabel="Text"
          onlabel="Image"
          onChange={handleTypeChange} />
      </Col>
    </Row>
  )

  const AnswerRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1}>
        Answer
      </Col>
      <Col xs={consts.col2}>
        <Form.Control
          required={true}
          ref={answerFormRef}
          type="text"
          spellCheck={true}
          pattern="[A-Za-z0-9]+" />
      </Col>
      <Col xs={consts.col3}>
        <Button
          onClick={handleAnswerAdd}
          variant="outline-primary"
          style={{ width: 100 }}>
          Add
        </Button>
      </Col>
    </Row>
  )

  const ShuffleRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1}>
        Shuffle
      </Col>
      <Col xs={consts.col2}>
        <BootstrapSwitchButton
          checked={shuffle}
          onChange={() => setShuffle(!shuffle)} />
      </Col>
    </Row>
  )

  const AnswersListRow = () => (
    <Row >
      <Col xs={consts.col1} />
      <Col xs={consts.col2}>
        {AnswersTable()}
      </Col>
      <Col xs={consts.col3} />
    </Row>
  )

  return (
    <React.Fragment>
      {BodyRow()}
      {AnswerRow()}
      {AnswersListRow()}
      {ShuffleRow()}
    </React.Fragment>
  )
})

export default ClosedQuestionForm
