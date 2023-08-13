import React, { useState, useRef, useImperativeHandle, forwardRef } from "react"
import { Accordion, Row, Col, Form, Button, ListGroup, Table, ButtonGroup, } from "react-bootstrap"

import { ClosedQuest } from "../../classes.ts"
import consts from "./consts.js"

const testStringPattern = (s, pattern) => {
  const patternRegex = new RegExp(pattern)
  return patternRegex.test(s)
}

const QuestForm = forwardRef(({ }, ref) => {
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
      return new ClosedQuest(
        type,
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
    shuffle: false,
    checked: []
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

  const [checked, setChecked] = useState(defaultStates.checked)

  const imageInputRef = useRef(defaultRefs.imageInput)
  const answerFormRef = useRef(defaultRefs.answerForm)

  const handleImageUpload = async (e) => {
    const newImage = e.target.files[0]
    setImage(newImage)
  }

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

  const handleSetCorrect = () => {
    setCorrect(checked[0])
    setChecked(defaultStates.checked)
  }

  const handleMoveUp = () => {
    const idx = answers.indexOf(checked[0])
    if (idx > 0) {
      var newAnswers = [...answers]
      const replaced = newAnswers[idx - 1]
      newAnswers[idx - 1] = checked[0]
      newAnswers[idx] = replaced
      setAnswers(newAnswers)
    }
  }

  const handleMoveDown = () => {
    const idx = answers.indexOf(checked[0])
    if (idx < (answers.length - 1)) {
      var newAnswers = [...answers]
      const replaced = newAnswers[idx + 1]
      newAnswers[idx + 1] = checked[0]
      newAnswers[idx] = replaced
      setAnswers(newAnswers)
    }
  }

  const handleRemove = () => {
    setAnswers(answers.filter(i => !checked.includes(i)))
    if (checked.includes(correct)) {
      setCorrect(defaultStates.correct)
    }
    setChecked(defaultStates.checked)
  }

  const handleCheckboxChange = (answer) => {
    if (checked.includes(answer)) {
      setChecked(checked.filter(i => i !== answer))
    }
    else {
      setChecked([...checked, answer])
    }
  }

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
      as="textarea"
      type="text"
      spellCheck
      pattern={consts.answerPattern}
      onChange={e => setText(e.target.value)} />
  )

  const BodyAccordItem = () => (
    <Accordion.Item>
      <Accordion.Header>Body</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col xs="12">
            <Button
              className="w-25"
              size="sm"
              variant={type === "text" ? "light" : "primary"}
              onClick={handleTypeChange}>
              {type === "text" ? "Text" : "Image"}
            </Button>
          </Col>
          <Col xs="12">
            {type === "text" ? TextInput() : ImageInput()}
          </Col>
        </Row>
      </Accordion.Body>

    </Accordion.Item>
  )

  const AnswerForm = () => (
    <Row>
      <ButtonGroup as="Col" xs="12">
        <Form.Control
          as="textarea"
          ref={answerFormRef}
          type="text"
          spellCheck
          pattern="[A-Za-z0-9]+" />
        <Button
          size="sm"
          onClick={handleAnswerAdd}
          variant="outline-primary">
          Add
        </Button>
      </ButtonGroup>
    </Row>
  )

  const AnswersAccordItem = () => (
    <Accordion.Item>
      <Accordion.Header>Answers</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col xs="12" className="mb-4">
            {AnswerForm()}
          </Col>
          <Col xs="12">
            {ActionBar()}
          </Col>
          <Col xs="12">
            {AnswersListGroup()}
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  )

  const ActionBar = () => {
    // ensures only one answer is checked
    const disabled = checked.length !== 1 ? true : false
    return (
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            className="me-auto"
            size="sm"
            variant={shuffle ? "warning" : "light"}
            onClick={() => setShuffle(!shuffle)}>
            {shuffle ? "Shuffled" : "Ordered"}
          </Button>
          <Button
            size="sm"
            variant="light"
            disabled={disabled || (checked[0] === correct)}
            onClick={handleSetCorrect}>
            Set correct
          </Button>
          <Button
            size="sm"
            variant="light"
            disabled={disabled}
            onClick={handleMoveUp}>
            Move up
          </Button>
          <Button
            size="sm"
            variant="light"
            disabled={disabled}
            onClick={handleMoveDown}>
            Move down
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            disabled={checked.length === 0}
            onClick={handleRemove}>Remove</Button>
        </Col>
      </Row>
    )
  }

  const AnswersListGroup = () => (
    <ListGroup>
      {answers.map((answer, idx) => (
        <ListGroup.Item
          key={idx}
          action
          variant={answer === correct ? "success" : "danger"}
          style={{ cursor: "default" }}>
          <Row>
            <Col xs="1">
              <Form.Check
                type="checkbox"
                checked={checked.includes(answer)}
                onChange={() => handleCheckboxChange(answer)} />
            </Col>
            <Col xs="1">
              {idx + 1}
            </Col>
            <Col>
              {answer}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )

  return (
    <Accordion>
      {BodyAccordItem()}
      {AnswersAccordItem()}
    </Accordion>
  )
})

export default QuestForm
