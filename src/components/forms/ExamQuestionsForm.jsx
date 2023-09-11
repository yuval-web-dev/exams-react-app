import React from "react"
import { Row, Col, Button, ListGroup, Image, Accordion } from "react-bootstrap"
import VirtualList from "react-virtual-drag-list" // https://www.npmjs.com/package/react-virtual-drag-list
import { v4 as uuidv4 } from "uuid"

import { default as ModalForms } from "../modalForms"
import QuizApiLogo from "../../assets/quizapi.svg"


const ExamQuestionsForm = ({ initialValues }, ref) => {
  const [questions, setQuestions] = React.useState([])
  const [shuffle, setShuffle] = React.useState(false)
  const [showQuestionMF, setShowQuestionMF] = React.useState(false)
  const [showQuizApiMF, setShowQuizApiMF] = React.useState(false)

  React.useImperativeHandle(
    ref,
    () => {
      return { get() { return { questions, shuffle } } }
    },
    [questions, shuffle]
  )

  React.useState(() => {
    if (initialValues) {
      setQuestions(initialValues.questions)
      setShuffle(initialValues.shuffle)
    }
  }, [])


  const handleClickButton = (event) => {
    event.preventDefault()
    switch (event.target.name) {
      case "Create a Question":
        setShowQuestionMF(true)
        return

      case "quiz-api":
        setShowQuizApiMF(true)
        return

      case "Shuffled":
        setShuffle(false)
        return

      case "Ordered":
        setShuffle(true)
        return

      default:
        return
    }
  }

  const handleSaveQuestionMF = (question) => {
    // Assuming the data passed validation
    setQuestions([...questions, question])
    setShowQuestionMF(false)
  }

  const handleCancelQuestionMF = () => {
    setShowQuestionMF(false)
  }

  const handleSaveQuizApiMF = (questionsArray) => {
    // Assuming the data passed validation
    setQuestions([...questions, ...questionsArray])
    setShowQuizApiMF(false)
  }

  const handleCancelQuizApiMF = () => {
    setShowQuizApiMF(false)
  }

  const handleDragEnd = (params) => {
    if (params.changed) {
      setQuestions(params.list)
    }
  }

  const handleRightClick = (questionId) => {
    const newQuestions = questions.filter(question => question.id !== questionId)
    setQuestions(newQuestions)
  }

  const totalPoints = () => {
    var points = 0
    questions.forEach(question => {
      points += Number(question.points)
    })
    return points
  }

  const noQuestions = questions.length === 0

  return (
    <React.Fragment>
      <Row>
        <Col className="d-flex bg-light">
          <Button
            name="Create a Question"
            variant="light"
            className=""
            onClick={handleClickButton}>
            Create a Question
          </Button>
          <Button
            name="quiz-api"
            variant="light"
            className=""
            onClick={handleClickButton}>
            <Image
              src={QuizApiLogo} height="18px"
              style={{ pointerEvents: "none" }} />
          </Button>
          <Button
            name={shuffle ? "Shuffled" : "Ordered"}
            disabled={noQuestions}
            variant={shuffle ? "warning" : "light"}
            onClick={handleClickButton}>
            {shuffle ? "Shuffled" : "Ordered"}
          </Button>
          <div className="ms-auto me-2 d-flex align-items-center">
            <div className={totalPoints() === 100 ? "text-success" : "text-danger"}>
              {totalPoints()}
            </div>
            <div className="text-muted">
              /100 Points
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion>
            <VirtualList className="virtual-list" dataKey="id" dataSource={questions} v-drop={handleDragEnd}>
              {(question, idx, dataKey) => (
                <Accordion.Item className="p-0" key={`question_${idx}`} eventKey={idx} onContextMenu={event => { event.preventDefault(); handleRightClick(question.id) }}>
                  <Accordion.Header>
                    <div className="w-100 d-flex flex-row justify-content-between">
                      <div>
                        {idx + 1}. {question.question}
                      </div>
                      <div className="pe-3">
                        {question.points} Points
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <ListGroup variant="flush">
                      {question.answers.map((answer, idx) => (
                        <ListGroup.Item
                          key={`answer_${idx}`}
                          variant={answer.id === question.correctAnswer ? "success" : "danger"}>
                          {idx + 1}. {answer.answer}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </VirtualList>
          </Accordion>

        </Col>
      </Row>
      <ModalForms.QuestionCreation
        key={uuidv4()}
        show={showQuestionMF}
        saveHandler={handleSaveQuestionMF}
        cancelHandler={handleCancelQuestionMF} />
      <ModalForms.QuizApi
        key={uuidv4()}
        show={showQuizApiMF}
        saveHandler={handleSaveQuizApiMF}
        cancelHandler={handleCancelQuizApiMF} />
    </React.Fragment>
  )
}


export default React.forwardRef(ExamQuestionsForm)