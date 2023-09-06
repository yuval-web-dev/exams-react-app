import React from "react"
import RangeSlider from "react-bootstrap-range-slider" // https://www.npmjs.com/package/react-bootstrap-range-slider
import VirtualList from "react-virtual-drag-list" // https://www.npmjs.com/package/react-virtual-drag-list
import CodeEditor from "@uiw/react-textarea-code-editor" // https://www.npmjs.com/package/@uiw/react-textarea-code-editor
import { Modal, Button, Form, InputGroup, Row, Col, ListGroup, ListGroupItem, Badge } from "react-bootstrap"
import { BsArrowReturnLeft } from "react-icons/bs"
import { v4 as uuidv4 } from "uuid"


const QuestionCreationModalForm = ({ show, saveHandler, cancelHandler }) => {
  const [inputs, setInputs] = React.useState(
    {
      id: uuidv4(),
      question: "",
      codeSnippet: "",
      codeLanguage: "plaintext",
      points: 5,
      correctAnswer: "",
      shuffle: false
    }
  )
  const [answers, setAnswers] = React.useState([]) // VirtualList requires a separate component
  const answerRef = React.useRef()


  const inputsSetter = (key, value) => {
    setInputs({
      ...inputs,
      [key]: value
    })
  }

  const handleChangeInput = (event) => {
    event.preventDefault()
    inputsSetter(event.target.name, event.target.value)
  }

  const handleAnswerAdd = () => {
    const answer = answerRef.current.value.trim()
    if (answer !== "") {
      const newAnswers = [...answers, { id: uuidv4(), answer: answer }]
      setAnswers(newAnswers)
      answerRef.current.value = ""
    }
  }

  const handleModalFormSubmit = () => {
    const formData = {
      id: inputs.id,
      points: inputs.points,
      question: inputs.question,
      codeSnippet: inputs.codeSnippet,
      codeLanguage: inputs.codeLanguage,
      correctAnswer: inputs.correctAnswer,
      shuffle: inputs.shuffle,
      answers,
    }
    saveHandler(formData)
  }

  const handleClickButton = (event) => {
    event.preventDefault()
    switch (event.target.name) {
      case "Default":
        inputsSetter("shuffle", true)
        return

      case "Shuffled":
        inputsSetter("shuffle", false)
        return

      case "Save":
        handleModalFormSubmit()
        return

      case "Cancel":
        cancelHandler()
        return

      default:
        alert(`Clicked "${event.target.name}" button.`)
        return
    }
  }

  const handleDragEnd = (params) => {
    if (params.changed) {
      setAnswers(params.list)
    }
  }

  const handleRightClickAnswer = (event) => {
    event.preventDefault()
    const newAnswers = answers.filter(answer => answer.id !== event.target.id)
    setAnswers(newAnswers)
    if (event.target.id === inputs.correctAnswer) {
      setInputs("correctAnswer", "")
    }
  }

  const handleClickSetCorrect = (event) => {
    event.preventDefault()
    const answerId = event.target.id
    if (answerId === inputs.correctAnswer) {
      inputsSetter("correctAnswer", "") // de-correct an answer
    }
    else {
      inputsSetter("correctAnswer", answerId)
    }
  }


  return (
    <Modal show={show} size="lg">
      <Modal.Header>
        <Modal.Title>New Question</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        <ListGroup variant="flush">

          <ListGroupItem>
            <Form.Label>Points</Form.Label>
            <Row>
              <Col xs="2" className="pe-0 d-flex justify-content-start align-items-center">
                <Badge className="w-75 fs-6 me-0">{inputs.points}</Badge>
              </Col>
              <Col className="ps-0">
                <RangeSlider
                  name="points"
                  value={inputs.points}
                  step={5}
                  min={5}
                  max={100}
                  tooltip="off"
                  onChange={handleChangeInput} />
              </Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Form.Label>Question</Form.Label>
            <Form.Control
              required
              name="question"
              value={inputs.question}
              onChange={handleChangeInput}
              placeholder="Enter your question..." />
          </ListGroupItem>

          <ListGroupItem>
            <div className="d-flex flex-row justify-content-between">
              <Form.Label>Code Snippet</Form.Label>
              <Form.Select
                className="w-25"
                name="codeLanguage"
                onChange={handleChangeInput}>
                {LANGS.map((lang, idx) => <option key={idx} value={lang[0]}>{lang[1]}</option>)}
              </Form.Select>
            </div>

            <CodeEditor
              name="codeSnippet"
              style={{ fontSize: 14, fontFamily: "Hack" }}
              language={inputs.codeLanguage === "" ? "plaintext" : inputs.codeLanguage}
              placeholder="Enter your code..."
              value={inputs.codeSnippet}
              onChange={handleChangeInput} />

          </ListGroupItem>

          <ListGroupItem>
            <Form.Label>Answers</Form.Label>
            <InputGroup>
              <Form.Control ref={answerRef} placeholder="Add an answer..." />
              <Button
                name="add-answer"
                style={{ width: "75px" }}
                size="sm"
                onClick={() => handleAnswerAdd()}
                variant="outline-primary">
                <BsArrowReturnLeft />
              </Button>
            </InputGroup >
          </ListGroupItem>
          {
            answers.length === 0 ? null :
              <VirtualList
                className="virtual-list"
                dataKey="id"
                dataSource={answers}
                v-drop={handleDragEnd}>
                {(answer, idx, dataKey) => (
                  <div key={"div_" + dataKey} className="d-flex">
                    <ListGroupItem
                      id={dataKey}
                      key={"button_" + dataKey}
                      style={{ width: "50px", cursor: "pointer" }}
                      variant={answer.id === inputs.correctAnswer ? "success" : "danger"}
                      onClick={handleClickSetCorrect}
                      className="border-top-0 border-end-0 border-start-0">
                      {answer.id === inputs.correctAnswer ? "✓" : "✗"}
                    </ListGroupItem>
                    <ListGroupItem
                      id={dataKey}
                      key={"answer_" + dataKey}
                      onContextMenu={handleRightClickAnswer}
                      action
                      style={{ cursor: "grab" }}
                      variant={answer.id === inputs.correctAnswer ? "success" : "danger"}
                      className="border-top-0 border-end-0 border-start-0">
                      {answer.answer}
                    </ListGroupItem>
                  </div>
                )}
              </VirtualList>
          }

          {
            answers.length === 0 ? null :
              <ListGroupItem className="d-flex flex-column">
                <Form.Label>Order of Appearance</Form.Label>
                <Button
                  name={inputs.shuffle ? "Shuffled" : "Default"}
                  variant={inputs.shuffle ? "warning" : "light"}
                  style={{ width: "100px" }}
                  onClick={handleClickButton}>
                  {inputs.shuffle ? "Shuffled" : "Default"}
                </Button>
              </ListGroupItem>
          }

        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button name="Cancel" variant="outline-secondary" style={{ width: "75px" }} onClick={handleClickButton}>Cancel</Button>
        <Button name="Save" variant="primary" style={{ width: "75px" }} onClick={handleClickButton}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default QuestionCreationModalForm

const LANGS = [
  ["plaintext", "Plaintext"],
  ["javascript", "JavaScript"],
  ["python", "Python"],
  ["cpp", "C++"],
  ["java", "Java"],
  ["bash", "Bash"]
]