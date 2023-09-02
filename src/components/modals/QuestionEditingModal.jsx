import React from "react"
import { Modal, Button } from "react-bootstrap"


const QuestionEditingModal = ({ show, children }) => {
  const handleClickCancel = () => {
    // setFormShow(false)
    alert("clicked Cancel!")
  }

  const handleClickSave = () => {
    // try {
    //   editorRef.current.validate()
    // }
    // catch {
    //   alert("QuestForm validation error.")
    //   return
    // }

    // const questObj = editorRef.current.yield()
    // setQuests([...quests, questObj])
    // setFormShow(false)
    alert("clicked Save!")
  }

  return (
    <Modal
      show={show}
      size="lg">
      <Modal.Header>
        <Modal.Title>{`New Question`}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={handleClickCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleClickSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}