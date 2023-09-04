import React from "react"
import { ListGroup, Form, Modal, Row, Col, Image, Button, ButtonGroup, Badge } from "react-bootstrap"
import { GoTrash, GoPencil } from "react-icons/go"


const ExamQuestionsForm = ({ examQuestions }, ref) => {

  const [questions, setQuestions] = React.useState(examQuestions)
  const [checked, setChecked] = React.useState([])
  const [shuffle, setShuffle] = React.useState(false)

  const checkAllRef = React.useRef()

  const handleCheckQuestion = (quest) => {
    if (checked.includes(quest)) {
      setChecked(checked.filter(i => i !== quest))
    }
    else {
      setChecked([...checked, quest])
    }
  }

  const handleCheckAll = () => {
    if (checked === questions) {
      setChecked([])
    }
    else {
      setChecked(questions)
    }
  }

  const handleMoveUp = () => {
    const idx = questions.indexOf(checked[0])
    if (idx > 0) {
      var newQuests = [...questions]
      const replaced = newQuests[idx - 1]
      newQuests[idx - 1] = checked[0]
      newQuests[idx] = replaced
      setQuestions(newQuests)
    }
  }

  const handleMoveDown = () => {
    const idx = questions.indexOf(checked[0])
    if (idx < (questions.length - 1)) {
      var newQuests = [...questions]
      const replaced = newQuests[idx + 1]
      newQuests[idx + 1] = checked[0]
      newQuests[idx] = replaced
      setQuestions(newQuests)
    }
  }

  const handleRemove = () => {
    setQuestions(questions.filter(question => !checked.includes(question)))
    setChecked([])
    checkAllRef.current.checked = false
  }

  const noneChecked = checked.length === 0
  const multipleChecked = checked.length > 1


  return (
    <ListGroup>
      {
        questions.map(
          (question, idx) => {
            return (
              <ListGroup.Item numbered key={idx} action>
                <Form.Check
                  type="checkbox"
                  checked={checked.includes(question)}
                  onChange={() => handleCheckQuestion(question)} />
                <p>{question.question}</p>
              </ListGroup.Item>
            )
          }
        )
      }
    </ListGroup >
  )
}


export default React.forwardRef(ExamQuestionsForm)