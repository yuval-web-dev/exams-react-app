import React, { useState, useRef, useImperativeHandle, forwardRef } from "react"
import {
  Row, Col,
  Form,
  Button, ButtonGroup,
  ListGroup,
  Card,
  ToggleButton,
  OverlayTrigger, Tooltip
} from "react-bootstrap"
import { BiShuffle } from "react-icons/bi"
import { GoListOrdered } from "react-icons/go"
import { GoTrash } from "react-icons/go"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { BsArrowReturnLeft } from "react-icons/bs"
import { testStringPattern } from "./helpers"


const AnswersCard = forwardRef(({ }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if (
        (answers === defaultStates.answers) ||
        (answers.length < 2) ||
        (correct === defaultStates.correct)
      ) {
        throw "err"
      }
    },
    yield() {
      return { answers: answers, correct: correct, shuffle: shuffle }
    }
  }))

  const defaultStates = {
    answers: [],
    correct: "",
    shuffle: false,
    checked: []
  }

  const [answers, setAnswers] = useState(defaultStates.answers)
  const [correct, setCorrect] = useState(defaultStates.correct)
  const [shuffle, setShuffle] = useState(defaultStates.shuffle)
  const [checked, setChecked] = useState(defaultStates.checked)

  const answerFormRef = useRef()
  const checkAllRef = useRef()

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

  const handleOrderBtnToggle = () => {
    if (shuffle) {
      setShuffle(false)
    }
  }

  const handleShuffleBtnToggle = () => {
    if (!shuffle) {
      setShuffle(true)
    }
  }

  const handleCheckAll = (e) => {
    if (!e.target.checked) {
      setChecked(defaultStates.checked)
    }
    else {
      setChecked(answers)
    }
  }

  const handleItemClick = (answer) => {
    if (answer === correct) {
      setCorrect(defaultStates.correct)
    }
    else {
      setCorrect(answer)
    }
  }

  const AnswerForm = () => (
    <Row>
      <ButtonGroup as="Col" xs="12">
        <Form.Control
          ref={answerFormRef}
          spellCheck
          pattern="[A-Za-z0-9]+" />
        <Button
          size="sm"
          onClick={handleAnswerAdd}
          variant="outline-primary">
          <BsArrowReturnLeft />
        </Button>
      </ButtonGroup>
    </Row>
  )

  const ActionBar = () => {
    const single = answers.length === 1
    const variant = "light"
    return (
      <Row>
        <Col className="d-flex align-items-center justify-content-end">

          <Form.Check
            className="me-auto"
            style={answers.length === 0 ? { display: "none" } : {}}
            ref={checkAllRef}
            type="checkbox"
            disabled={answers.length < 1}
            onChange={e => handleCheckAll(e)} />

          <ButtonGroup>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Move up</Tooltip>}>
              <Button
                className="border"
                disabled={!single}
                variant={variant}
                onClick={handleMoveUp}>
                <AiOutlineArrowUp />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Move down</Tooltip>}>
              <Button
                className="border"
                disabled={!single}
                variant={variant}
                onClick={handleMoveDown}>
                <AiOutlineArrowDown />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Remove</Tooltip>}>
              <Button
                className="border"
                variant="danger"
                onClick={handleRemove}>
                <GoTrash />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }

  const ListGroupAnswers = () => (
    <ListGroup>
      <ListGroup.Item
        variant="light">
        {ActionBar()}
      </ListGroup.Item>
      {answers.map((answer, idx) => (
        <ListGroup.Item
          key={idx}
          action
          variant={answer === correct ? "success" : "danger"}>
          <Row>
            <Col xs="1">
              <Form.Check
                type="checkbox"
                checked={checked.includes(answer)}
                onChange={() => handleCheckboxChange(answer)} />
            </Col>
            <Col onClick={() => handleItemClick(answer)}>
              {`${idx + 1}. ${answer}`}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )

  return (
    <Card>
      <Card.Header className="d-flex align-items-center">
        <h5 className="me-auto">
          Answers
        </h5>
        <ButtonGroup>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Ordered</Tooltip>}>
            <ToggleButton
              className="border"
              type="checkbox"
              variant="light"
              checked={!shuffle}
              onClick={handleOrderBtnToggle}>
              <GoListOrdered />
            </ToggleButton>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Shuffle</Tooltip>}>
            <ToggleButton
              className="border"
              type="checkbox"
              variant={shuffle ? "warning" : "light"}
              checked={shuffle}
              onClick={handleShuffleBtnToggle}>
              <BiShuffle />
            </ToggleButton>
          </OverlayTrigger>
        </ButtonGroup>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col xs="12" className="mb-4">
            {AnswerForm()}
          </Col>
          <Col xs="12">
            {ListGroupAnswers()}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
})

export default AnswersCard
