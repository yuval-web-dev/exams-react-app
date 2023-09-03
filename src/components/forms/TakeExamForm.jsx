import React from "react"
import { ListGroup, Pagination, Row, Col, Button, Badge, Collapse, Card } from "react-bootstrap"


const TakeExamForm = ({ exam, submitHandler }, ref) => {
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

  const [showSidebar, setShowSidebar] = React.useState(false)

  React.useEffect(
    () => setQuestion(exam.questions[currentIdx]),
    []
  );

  const handleClickIndex = (idx) => {
    setCurrentIdx(idx)
    setQuestion(exam.questions[idx])
  }

  const handleClickAnswer = (selectedAnswer) => {
    if (answers[question._id] === selectedAnswer) {// de-select the answer
      setAnswers({ ...answers, [question._id]: null })
    }
    else {
      setAnswers({ ...answers, [question._id]: selectedAnswer })
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
    <Row>
      <Col xs="3" md="3" lg="2">
        <Card>
          <Card.Header className="text-center">Navigator</Card.Header>
          <ListGroup variant="flush">
            {
              exam.questions.map(
                (question, idx) => {
                  const variant = answers[question._id] ? "success" : "light"
                  return (
                    <ListGroup.Item
                      action
                      className="d-flex justify-content-between align-items-center"
                      key={idx}
                      value={idx}
                      active={idx === currentIdx}
                      variant={variant}
                      onClick={() => handleClickIndex(idx)}>
                      <div className="bold">{idx + 1}</div>
                      <div className="small">{question.points}</div>
                    </ListGroup.Item>
                  )
                }
              )
            }
          </ListGroup>
        </Card>
        <Button
          className="w-100 mt-3"
          variant={answeredAll ? "outline-success flush" : "outline-danger flush"}
          onClick={handleClickSubmit}>
          Submit
        </Button>
      </Col>
      <Col>
        <Card className="w-100 h-100">
          <Card.Header className="d-flex justify-content-between">
            <div>Question #{currentIdx + 1}</div>
            <div className="text-muted">{question.points} Points</div>
          </Card.Header>
          <ListGroup
            className="h-100 d-flex flex-column"
            variant="flush"
            numbered>
            <div className="p-1 mb-auto">
              {question.question}
            </div>
            {exam.questions[currentIdx].answers.map((answer, idx) => (
              <ListGroup.Item
                key={idx}
                action
                onClick={() => handleClickAnswer(answer)}
                active={answers[question._id] === answer}>
                {answer}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default React.forwardRef(TakeExamForm)