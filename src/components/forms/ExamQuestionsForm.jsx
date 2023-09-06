import React from "react"
import { Row, Col, Button, ListGroup, Image } from "react-bootstrap"
import VirtualList from "react-virtual-drag-list" // https://www.npmjs.com/package/react-virtual-drag-list
import { v4 as uuidv4 } from "uuid"

import { ModalForms } from "../modalForms"
import QuizApiLogo from "../../assets/quizapi_full.svg"


const ExamQuestionsForm = ({ }, ref) => {
  const [questions, setQuestions] = React.useState([])
  const [shuffle, setShuffle] = React.useState(false)
  const [modalFormShow, setModalFormShow] = React.useState(false)
  React.useImperativeHandle(
    ref,
    () => {
      return { get() { return { questions, shuffle } } }
    },
    [questions, shuffle]
  )

  const handleClickButton = (event) => {
    event.preventDefault()
    switch (event.target.name) {
      case "New Question":
        setModalFormShow(true)
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

  const handleSaveModalForm = (modalFormData) => {
    // Assuming the data passed validation
    setQuestions([...questions, modalFormData])
    setModalFormShow(false)
  }

  const handleCancelModalForm = () => {
    setModalFormShow(false)
  }

  const handleDragEnd = (params) => {
    console.log(params)
    if (params.changed) {
      setQuestions(params.list)
    }

  }

  const handleRightClickQuestion = (event) => {
    event.preventDefault()
    const newQuestions = questions.filter(question => question.id !== event.target.id)
    setQuestions(newQuestions)
  }

  const noQuestions = questions.length === 0

  return (
    <React.Fragment>
      <Row>
        <Col className="d-flex">
          <Button
            name="New Question"
            variant="light"
            className=""
            onClick={handleClickButton}>
            Create a Question
          </Button>
          <Button
            name="quiz-api"
            variant="light"
            className="mx-1 p-1"
            onClick={handleClickButton}>
            <Image src={QuizApiLogo} height="18px"></Image>
          </Button>
          <Button
            name={shuffle ? "Shuffled" : "Ordered"}
            disabled={noQuestions}
            variant={shuffle ? "warning" : "light"}
            className="ms-auto"
            onClick={handleClickButton}>
            {shuffle ? "Shuffled" : "Ordered"}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <VirtualList
              className="virtual-list"
              dataKey="id"
              dataSource={questions}
              v-drop={handleDragEnd}>
              {(question, idx, dataKey) => (
                <ListGroup.Item
                  id={dataKey}
                  key={idx}
                  onContextMenu={handleRightClickQuestion}
                  action
                  style={{ cursor: "grab" }}>
                  {idx + 1}. {question.question}
                </ListGroup.Item>
              )}
            </VirtualList>
          </ListGroup>
        </Col>
      </Row>
      <ModalForms.QuestionEditing
        key={uuidv4()}
        show={modalFormShow}
        saveHandler={handleSaveModalForm}
        cancelHandler={handleCancelModalForm} />
      <ModalForms.QuizApi
        show={true} />

    </React.Fragment>
  )
}


export default React.forwardRef(ExamQuestionsForm)