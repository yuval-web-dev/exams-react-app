import React from "react"
import { Button, Row, Col, Form, ButtonGroup, ListGroup } from "react-bootstrap"
import { GoTrash } from "react-icons/go"
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"


const AnswersEditingList = ({ inputs, setInputs }, ref) => {
  const [checked, setChecked] = React.useState([])

  const checkAllRef = React.useRef()

  const noneChecked = checked.length === 0
  const multipleChecked = checked.length > 1

  const handleMoveUp = () => {
    alert("move up!")
    // const idx = answers.indexOf(checked[0])
    // if (idx > 0) {
    //   var newAnswers = [...answers]
    //   const replaced = newAnswers[idx - 1]
    //   newAnswers[idx - 1] = checked[0]
    //   newAnswers[idx] = replaced
    //   setAnswers(newAnswers)
    // }
  }

  const handleMoveDown = () => {
    alert("move down!")
    // const idx = answers.indexOf(checked[0])
    // if (idx < (answers.length - 1)) {
    //   var newAnswers = [...answers]
    //   const replaced = newAnswers[idx + 1]
    //   newAnswers[idx + 1] = checked[0]
    //   newAnswers[idx] = replaced
    //   setAnswers(newAnswers)
    // }
  }

  const handleCheckAll = (event) => {
    if (!event.target.checked) {
      setChecked([])
    }
    else {
      setChecked(inputs.answers)
    }
  }

  const handleRemove = () => {
    // setAnswers(answers.filter(answer => !checked.includes(answer)))
    // if (checked.includes(correct)) {
    //   setCorrect("")
    // }
    // setChecked([])
    // checkAllRef.current.checked = false
    alert("remove!")
  }

  const handleChangeCheckbox = (answer) => {
    if (checked.includes(answer)) {
      setChecked(checked.filter(i => i !== answer))
    }
    else {
      setChecked([...checked, answer])
    }
  }

  const handleClickOnAnswer = (answer) => {
    alert("clicked on answer!")
    // if (answer === inputs.correct) {
    //   setCorrect("")
    // }
    // else {
    //   setCorrect(answer)
    // }
  }

  return (
    <ListGroup>
      <ListGroup.Item>
        <Row>
          <Col className="d-flex align-items-center justify-content-end">
            <Form.Check
              className="me-auto"
              ref={checkAllRef}
              type="checkbox"
              disabled={inputs.answers.length < 1}
              onChange={e => handleCheckAll(e)} />

            <ButtonGroup
              vertical
              className="me-1">
              <Button
                style={{ width: "60px", height: "25px" }}
                className="p-0"
                disabled={noneChecked || multipleChecked}
                variant="outline-secondary"
                onClick={handleMoveUp}>
                <AiOutlineArrowUp />
              </Button>
              <Button
                style={{ width: "60px", height: "25px" }}
                className="p-0"
                disabled={noneChecked || multipleChecked}
                variant="outline-secondary"
                onClick={handleMoveDown}>
                <AiOutlineArrowDown />
              </Button>
            </ButtonGroup>

            <Button
              disabled={noneChecked}
              style={{ width: "60px", height: "50px" }}
              variant="outline-danger"
              onClick={handleRemove}>
              <GoTrash />
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
      {inputs.answers.map((answer, idx) => (
        <ListGroup.Item
          key={idx}
          action
          variant={answer === inputs.correct ? "success" : "danger"}>
          <Row>
            <Col xs="1">
              <Form.Check
                type="checkbox"
                checked={checked.includes(answer)}
                onChange={() => handleChangeCheckbox(answer)} />
            </Col>
            <Col onClick={() => handleClickOnAnswer(answer)}>
              {`${idx + 1}. ${answer}`}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}


export default React.forwardRef(AnswersEditingList)