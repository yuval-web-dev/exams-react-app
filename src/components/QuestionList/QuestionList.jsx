import React, { useState } from "react"
import { Modal, Row, Col, Image, Table, Button, ButtonGroup, Nav } from "react-bootstrap"

import ImageModal from "./ImageModal"

const QuestionList = ({ questions, setQuestions, defaultState }) => {
  const defaultStates = {
    showImageModal: false,
    selectedQuest: null
  }

  const [showImageModal, setShowImageModal] = useState(defaultStates.showImageModal)
  const [selectedQuest, setSelectedQuest] = useState(defaultStates.selectedQuest)

  const mapAnswers = (question) => (
    <ol>{
      question.answers.map(answer => {
        return (
          <li
            key={answer}
            style={answer === question.correct ? { color: "green", fontWeight: "bold" } : {}}>
            {answer}
          </li>
        )
      })
    }
    </ol>
  )

  const handleImageLinkClick = (question) => {
    setSelectedQuest(question)
    setShowImageModal(true)
  }

  const mapQuestions = (questions) => {
    return (
      questions.map((question, idx) => {
        if (question === undefined) {
          return
        }
        return (
          <tr key={idx}>
            <td>
              {idx + 1}
            </td>
            <td>
              {typeof question.body === "string" ? question.body : <Nav><Nav.Link onClick={() => handleImageLinkClick(question)}>{question.body.name}</Nav.Link></Nav>}
            </td>
            <td>
              {mapAnswers(question)}
            </td>
            <td>
              {question.shuffled ? "Yes" : "No"}
            </td>
            <td>
              <ButtonGroup>
                <Button
                  variant="light"
                  onClick={() => handleMoveUp(question, idx)}>
                  ⯅
                </Button>
                <Button
                  variant="light"
                  onClick={() => handleMoveDown(question, idx)}>
                  ⯆
                </Button>
                <Button
                  variant="light"
                  onClick={() => handleQuestionDiscard(question)}>
                  Discard
                </Button>
              </ButtonGroup>

            </td>
          </tr>
        )
      })
    )
  }

  const handleMoveUp = (question, idx) => {
    if (idx > 0) {
      let newQuestions = [...questions]
      const replaced = newQuestions[idx - 1]
      newQuestions[idx - 1] = question
      newQuestions[idx] = replaced
      setQuestions(newQuestions)
    }
  }

  const handleMoveDown = (question, idx) => {
    if (idx < (questions.length - 1)) {
      let newQuestions = [...questions]
      const replaced = newQuestions[idx + 1]
      newQuestions[idx + 1] = question
      newQuestions[idx] = replaced
      setQuestions(newQuestions)
    }
  }

  const handleQuestionDiscard = (question) => {
    setQuestions(questions.filter(i => i !== question))
  }

  return (
    <React.Fragment>
      {selectedQuest !== defaultStates.selectedQuest ? <ImageModal image={selectedQuest.body} show={showImageModal} onHide={() => setShowImageModal(false)} /> : null}
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Body</th>
            <th>Answers</th>
            <th>Shuffled</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mapQuestions(questions)}
        </tbody>
      </Table>
    </React.Fragment>

  )
}

export default QuestionList