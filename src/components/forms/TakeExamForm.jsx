import React from "react"
import { Offcanvas, ListGroup, Row, Col, Button, Card, ButtonGroup, Spinner } from "react-bootstrap"
import CodeEditor from "@uiw/react-textarea-code-editor" // https://www.npmjs.com/package/@uiw/react-textarea-code-editor
import * as Icons from "react-bootstrap-icons"
import { v4 as uuidv4 } from "uuid"

import { default as Modals } from "../modals"
import { default as useBreakpoint } from "./useBreakpoint.js"
import "./index.css"


const TakeExamForm = ({ showNavigate, hideHandler, exam, submitHandler, isLoading }) => {
  const [idx, setIdx] = React.useState(0)
  const [answers, setAnswers] = React.useState({}) // {questionId: {id: String, answer: String}}
  const [currentCard, setCurrentCard] = React.useState("start") // or "question" or "end"
  const [showSubmitModal, setShowSubmitModal] = React.useState(false)
  const breakpoint = useBreakpoint()


  const handleSelectAnswer = (questionId, selectedAnswer) => {
    const currentAnswer = answers[questionId] // the object holds values as answer id

    if (selectedAnswer === currentAnswer) {// De-select the answer.
      setAnswers({ ...answers, [questionId]: null })
    }
    else {
      setAnswers({
        ...answers,
        [questionId]: selectedAnswer
      })
    }
  }

  const handleClickButton = (event) => {
    event.preventDefault()
    switch (event.target.name) {

      case "start-card-next-button":
        setCurrentCard("question")
        return

      case "question-card-prev-button":
        if (idx === 0) {
          setCurrentCard("start")
        }
        else {
          setIdx(idx - 1)
        }
        return

      case "question-card-next-button":
        if (idx === exam.questions.length - 1) {
          setCurrentCard("end")
        }
        else {
          setIdx(idx + 1)
        }
        return

      case "end-card-prev-button":
        setCurrentCard("question")
        return

      default:
        return
    }
  }

  const handelCancelSubmitModal = () => {
    setShowSubmitModal(false)
  }

  const handleConfirmSubmitModal = async () => {
    setShowSubmitModal(false)
    await submitHandler(answers)
  }

  const totalAnswered = () => {
    var total = 0
    for (const val of Object.values(answers)) { if (val) { total++ } }
    return total
  }

  const colQuestion = (question) => {
    if (question.codeSnippet === undefined) {
      return (
        <Col className="h-50 p-3 fs-3 border-bottom d-flex justify-content-center align-items-center">{question.question}</Col>
      )
    }
    else {
      return (
        <Col className="border-bottom h-50" style={{ overflowY: "auto" }}>
          <Col xs="12" className="fs-3 d-flex justify-content-center align-items-center">{question.question}</Col>
          <Col xs="12">{
            question.codeSnippet === "" ? null :
              <CodeEditor
                style={{ fontFamily: "Hack" }}
                className="fs-6"
                readOnly
                name="codeSnippet"
                language={question.codeLanguage === "" ? "plaintext" : question.codeLanguage}
                value={question.codeSnippet} />
          }</Col>
        </Col>
      )
    }
  }

  const colAnswers = (question) => {
    return (
      <Col className="h-50" style={{ overflowY: "auto" }}>
        <ListGroup className="border-bottom" numbered variant="flush">
          {question.answers.map(answer => (
            <ListGroup.Item
              key={uuidv4()}
              action
              onClick={() => handleSelectAnswer(question.id, answer)}
              active={answer === answers[question.id]}>
              {answer.answer}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    )
  }

  const offCanvas = () => {
    return (
      <Offcanvas
        show={showNavigate}
        backdrop={false}
        onHide={hideHandler}
        placement={breakpoint === "xxl" ? "start" : "bottom"}
        style={breakpoint === "xxl" ? { width: "20vw" } : { height: "30vh" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span>Answered: </span>
            <span className={answeredAll ? "text-success" : "text-danger"}>{totalAnswered()}</span>
            <span>/{exam.questions.length}</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <ListGroup variant="flush">
            {
              exam.questions.map(
                (question, qIdx) => {
                  const variant = (answers[question.id] ? "success" : "light")
                  return (
                    <ListGroup.Item
                      action
                      className="d-flex border-0 border-top justify-content-between align-items-center"
                      key={uuidv4()}
                      value={qIdx}
                      active={qIdx === idx}
                      variant={variant}
                      onClick={() => setIdx(qIdx)}>
                      <div className="bold">{qIdx + 1}</div>
                      <div className="small">{question.points} Points</div>
                    </ListGroup.Item>
                  )
                }
              )
            }
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    )
  }

  const startCard = () => (
    <Card>
      <Card.Header className="fs-5 d-flex justify-content-between">
        Start
      </Card.Header>

      <Card.Body style={{ height: "50vh" }}>
        <Row className="fs-5">
          <Col xs="12" className="mb-5 d-flex justify-content-center">
            <span className="fs-1">{exam.name}</span>
          </Col>
          <Col xs="12" className="d-flex flex-column justify-content-center align-items-center">
            <div className="mb-2">
              <span>Lecturer:</span>
              &nbsp;
              <span>{exam.lecturerLastName}, {exam.lecturerFirstName}</span>
            </div>
            <div className="mb-2">
              <span>Questions:</span>
              &nbsp;
              <span>{exam.questions.length}</span>
            </div>
            <div>
              <span>Time:</span>
              &nbsp;
              <span>{exam.duration} Minutes</span>
            </div>
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className="d-flex flex-row justify-content-center align-items-center">
        <ButtonGroup>
          <Button
            disabled
            name="prev-button"
            variant="light"
            style={{ width: "100px" }}
            onClick={handleClickButton}>
            <Icons.ChevronLeft size="20" style={{ pointerEvents: "none" }} />
          </Button>
          <Button disabled variant="light" className="fs-5" style={{ width: "100px" }}>
            ...
          </Button >
          <Button
            name="start-card-next-button"
            variant="light"
            style={{ width: "100px" }}
            onClick={handleClickButton}>
            <Icons.ChevronRight size="20" style={{ pointerEvents: "none" }} />
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  )

  const questionCard = () => (
    <Card>
      <Card.Header className="fs-5 d-flex justify-content-between">
        <div>
          Question #{idx + 1}
        </div>
        <div className="text-muted">
          {exam.questions[idx].points} Points
        </div>
      </Card.Header>

      <div style={{ height: "50vh" }}>
        {colQuestion(exam.questions[idx])}
        {colAnswers(exam.questions[idx])}
      </div >

      <Card.Footer className="d-flex flex-row justify-content-center align-items-center">
        <ButtonGroup>
          <Button
            name="question-card-prev-button"
            variant="light"
            style={{ width: "100px" }}
            onClick={handleClickButton}>
            <Icons.ChevronLeft size="20" style={{ pointerEvents: "none" }} />
          </Button>
          <Button
            disabled
            variant="light"
            className="fs-5"
            style={{ width: "100px" }}>
            {idx + 1}
          </Button >
          <Button
            name="question-card-next-button"
            variant="light"
            style={{ width: "100px" }}
            onClick={handleClickButton}>
            <Icons.ChevronRight size={20} style={{ pointerEvents: "none" }} />
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  )

  const endCard = () => (
    <Card>
      <Card.Header className="fs-5 d-flex justify-content-between">
        Review and Finalize
      </Card.Header>

      <Card.Body
        className="py-0"
        style={{ height: "50vh" }}>
        <Row className="h-100 d-flex">
          <Col
            xs="12"
            className="ps-3 pt-1 pb-2 d-flex align-items-center fs-5"
            style={{ height: "15%" }}>
            Please review your answers before submitting:
          </Col>

          <Col
            xs="12"
            className="border p-0"
            style={{ height: "70%", overflowY: "auto" }}>
            <ListGroup variant="flush">
              {exam.questions.map((question, i) => (
                <ListGroup.Item key={uuidv4()} className="d-flex">
                  <span>{i + 1}.</span>
                  &nbsp;
                  <div className="d-flex flex-column">
                    <span>Q: {question.question}</span>
                    <span>A: {answers[question.id] ?
                      <span className="text-primary">{answers[question.id].answer}</span> :
                      <span className="text-danger">None selected.</span>
                    }</span>
                  </div>
                </ListGroup.Item>
              )
              )}
            </ListGroup>
          </Col>

          <Col
            xs="12"
            className="d-flex align-items-center"
            style={{ height: "15%" }}>
            {
              isLoading ?
                <Button
                  disabled
                  className="w-100"
                  variant="secondary"
                  style={{ width: "100px" }}>
                  <Spinner size="sm" />
                </Button>
                :
                <Button
                  className="w-100"
                  variant={answeredAll ? "outline-success" : "outline-danger"}
                  style={{ width: "100px" }}
                  onClick={() => setShowSubmitModal(true)}>
                  {answeredAll ?
                    <Icons.SendCheckFill size="25" /> : <Icons.SendExclamationFill size="25" />} &nbsp; Submit
                </Button>
            }
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className="d-flex flex-row justify-content-center align-items-center">
        <ButtonGroup>
          <Button
            disabled={isLoading}
            name="end-card-prev-button"
            variant="light"
            style={{ width: "100px" }}
            onClick={handleClickButton}>
            <Icons.ChevronLeft size="20" style={{ pointerEvents: "none" }} />
          </Button>
          <Button disabled variant="light" className="fs-5" style={{ width: "100px" }}>
            ...
          </Button >
          <Button
            disabled
            variant="light"
            style={{ width: "100px" }}>
            <Icons.ChevronRight size="20" style={{ pointerEvents: "none" }} />
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  )

  const renderCard = () => {
    switch (currentCard) {
      case "start":
        return startCard()
      case "question":
        return questionCard()
      case "end":
        return endCard()
      default:
        return null
    }
  }

  const answeredAll = totalAnswered() === exam.questions.length

  return (
    <React.Fragment>
      {renderCard()}
      {offCanvas()}
      <Modals.Confirm
        show={showSubmitModal}
        header="Submit the test"
        body="Are you sure you want to submit?"
        cancelHandler={handelCancelSubmitModal}
        confirmHandler={handleConfirmSubmitModal}
      />
    </React.Fragment >
  )
}


export default TakeExamForm