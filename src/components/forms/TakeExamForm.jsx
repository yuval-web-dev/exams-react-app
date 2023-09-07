import React from "react"
import { Offcanvas, ListGroup, Pagination, Row, Col, Button, Badge, Collapse, Card } from "react-bootstrap"


const TakeExamForm = ({ showNavigate, hideHandler, exam, submitHandler }) => {
  const [currentIdx, setCurrentIdx] = React.useState(0)
  const [question, setQuestion] = React.useState(exam.questions[0])
  const [answers, setAnswers] = React.useState(
    () => {
      const inputsObject = {}
      exam.questions.forEach(question => {
        inputsObject[question._id] = null
      })
      return inputsObject
    }
  )// object of question ids (keys) and selected answers (values)

  React.useEffect(
    () => setQuestion(exam.questions[currentIdx]),
    []
  );

  const handleClickIndex = (idx) => {
    setCurrentIdx(idx)
    setQuestion(exam.questions[idx])
  }

  const handleClickAnswer = (selectedAnswer) => {
    if (answers[question.id] === selectedAnswer) {// de-select the answer
      setAnswers({ ...answers, [question.id]: null })
    }
    else {
      setAnswers({ ...answers, [question.id]: selectedAnswer })
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

  const totalAnswered = () => {
    var total = 0
    for (const val of Object.values(answers)) { if (val) { total++ } }
    return total
  }

  const answeredAll = totalAnswered() === exam.questions.length

  return (
    <React.Fragment>
      <Card className="w-100">
        <Card.Header className="d-flex justify-content-between">
          <div>Question #{currentIdx + 1}</div>
          <div className="text-muted">{question.points} Points</div>
        </Card.Header>
        <ListGroup
          className="h-100 d-flex flex-column"
          variant="flush"
          numbered>
          <div
            className="border-bottom d-flex fs-4 justify-content-center align-items-center"
            style={{ height: "300px" }}>
            {question.question}
          </div>
          {exam.questions[currentIdx].answers.map((answer, idx) => (
            <ListGroup.Item
              key={idx}
              action
              onClick={() => handleClickAnswer(answer)}
              active={answers[question.id] === answer}>
              {answer.answer}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
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
                (question, idx) => {
                  const variant = answers[question.id] ? "success" : "light"
                  return (
                    <ListGroup.Item
                      action
                      className="d-flex border-0 border-top justify-content-between align-items-center"
                      key={idx}
                      value={idx}
                      active={idx === currentIdx}
                      variant={variant}
                      onClick={() => handleClickIndex(idx)}>
                      <div className="bold">{idx + 1}</div>
                      <div className="small">{question.points} Points</div>
                    </ListGroup.Item>
                  )
                }
              )
            }
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
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