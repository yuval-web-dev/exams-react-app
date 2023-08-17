import React, { useState, useRef, useImperativeHandle, forwardRef } from "react"
import {
  Row, Col,
  Form,
  Button, ButtonGroup,
  ListGroup,
  Card,
  InputGroup,
  OverlayTrigger, Tooltip
} from "react-bootstrap"
import { BiShuffle } from "react-icons/bi"
import { GoListOrdered } from "react-icons/go"
import { GoTrash } from "react-icons/go"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { BsArrowReturnLeft } from "react-icons/bs"
import { testStringPattern } from "./helpers"
import BootstrapSwitchButton from "bootstrap-switch-button-react"

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

  const AnswerForm = () => {

    return (
      <InputGroup>
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
      </InputGroup>
    )
  }

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

  const OrderForm = () => {
    const handleSwitchOrder = () => {
      setShuffle(!shuffle)
    }

    return (
      <Row>
        <Col className="d-flex align-items-center justify-content-start">
          <div className="me-5">Order of Appearance</div>
          <BootstrapSwitchButton
            checked={shuffle}
            width="125"
            offlabel="Ordered"
            onlabel="Shuffle"
            onstyle="warning"
            onChange={handleSwitchOrder} />
        </Col>
      </Row>
    )
  }

  return (
    <Card>
      <Card.Header className="d-flex align-items-center justify-content-center">
        <h5>Answers</h5>
      </Card.Header>

      <Card.Body className="p-0">
        <ListGroup>
          <ListGroup.Item>
            {OrderForm()}
          </ListGroup.Item>
          <ListGroup.Item>
            {AnswerForm()}
          </ListGroup.Item>
          <ListGroup.Item>
            {ListGroupAnswers()}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
})

export default AnswersCard
