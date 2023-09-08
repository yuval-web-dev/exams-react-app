import React from "react"
import { Offcanvas, ListGroup, Pagination, Row, Col, Button, Badge, Collapse, Card, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import CodeEditor from "@uiw/react-textarea-code-editor" // https://www.npmjs.com/package/@uiw/react-textarea-code-editor
import * as Icon from "react-bootstrap-icons"

import "./index.css"

const range = n => [...Array(n).keys()]


const TakeExamForm = ({ showNavigate, hideHandler, exam, submitHandler }) => {
  const [idx, setIdx] = React.useState(0)
  const [answers, setAnswers] = React.useState(
    () => {
      const inputsObject = {}
      exam.questions.forEach(question => {
        inputsObject[question._id] = null
      })
      return inputsObject
    }
  )// object of question ids (keys) and selected answers (values)

  const getQuestionId = (idx) => exam.questions[idx].id
  const getAnswer = (questionId) => answers[questionId]

  const handleClickAnswer = (selectedAnswer) => {
    const questionId = getQuestionId(idx)
    const currentAnswer = getAnswer(questionId)

    if (selectedAnswer === currentAnswer) {// De-select the answer.
      setAnswers({ ...answers, [questionId]: null })
    }
    else {
      setAnswers({ ...answers, [questionId]: selectedAnswer })
    }
  }

  const handleClickSubmit = async (event) => {
    event.preventDefault()
    if (!answeredAll) {
      // alert("Are you sure? You have not answered all questions!")
    }
    else {
      // submitHandler(answers)
    }
    await submitHandler(answers)
  }

  const handleClickButton = (event) => {
    event.preventDefault()
    switch (event.target.name) {
      case "prev-button":
        if (idx > 0) {
          setIdx(idx - 1)
        }
        return
      case "next-button":
        if (idx < exam.questions.length - 1) {
          setIdx(idx + 1)
        }
        return
      default:
        return
    }
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
        <Col className="border-bottom h-50">
          <Col xs="12" className="h-25 fs-3 d-flex justify-content-center align-items-center">{question.question}</Col>
          <Col xs="12" className="" style={{ height: "300px", overflowY: "auto" }}>{
            question.codeSnippet === "" ? null :
              <CodeEditor
                className="fs-6"
                readOnly
                name="codeSnippet"
                style={{ fontFamily: "Hack" }}
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
          {exam.questions[idx].answers.map((answer, idx) => (
            <ListGroup.Item
              key={idx}
              action
              onClick={() => handleClickAnswer(answer)}
              active={answers[question.id] === answer}>
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
        onHide={hideHandler}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Questions</Offcanvas.Title>
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
                      key={qIdx}
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

  const answeredAll = totalAnswered() === exam.questions.length

  return (
    <React.Fragment>
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
              disabled={idx === 0}
              name="prev-button"
              variant="light"
              style={{ width: "100px" }}
              onClick={handleClickButton}>
              <Icon.ChevronLeft size={20} style={{ pointerEvents: "none" }} />
            </Button>
            <Button disabled variant="light" className="fs-4" style={{ width: "100px" }}>
              {idx + 1}
            </Button >
            <Button
              disabled={idx === exam.questions.length - 1}
              name="next-button"
              variant="light"
              style={{ width: "100px" }}
              onClick={handleClickButton}>
              <Icon.ChevronRight size={20} style={{ pointerEvents: "none" }} />
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
      {offCanvas()}
    </React.Fragment >
  )
}


export default TakeExamForm

{/* <Button
className="w-100 mt-3"
variant={answeredAll ? "outline-success flush" : "outline-danger flush"}
onClick={handleClickSubmit}>
Submit
</Button> */}