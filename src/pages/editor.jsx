import React, { useState, useRef } from 'react'
import { Navbar, Accordion, Container, Row, Col, Modal, ButtonGroup, Button } from 'react-bootstrap'

import { BottomControlBar, QuestionList, MetadataForm, Navs } from '../components'

import QuestionForm from '../components/ClosedQuestionForm/ClosedQuestionForm'


const Editor = () => {
  const defaultStates = {
    metadata: null,
    questions: [],
    questModalShow: false
  }
  const [metadata, setMetadata] = useState(defaultStates.metadata)
  const [questions, setQuestions] = useState(defaultStates.questions)
  const [questModalShow, setQuestModalShow] = useState(defaultStates.questModalShow)

  const questFormRef = useRef()

  const onQuestionFormSave = (newQuestion) => {
    setQuestions([...questions, newQuestion])
  }

  const handleModalSave = () => {
    if (questFormRef.current.error()) {
      alert("Please fill the form as intended.")
      return
    }
    const newQuestion = questFormRef.current.yieldObj()
    setQuestions([...questions, newQuestion])
    setQuestModalShow(false)
  }

  const rowClass = "border"

  const questionModal = () => (
    <Modal
      show={questModalShow}
      size="lg">
      <Modal.Header>
        <Modal.Title>
          New Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QuestionForm ref={questFormRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setQuestModalShow(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleModalSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const scrollable = { maxHeight: "40vh", overflowY: "scroll" }

  return (
    <React.Fragment>
      <Navs.TopNavbar />
      {questionModal()}
      <Container>
        <h1>New Exam</h1>
        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Metadata</Accordion.Header>
            <Accordion.Body>
              <MetadataForm />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Questions</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col xs="12">
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => { setQuestModalShow(true) }}>
                    Create
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => { }}>
                    from API
                  </Button>
                </Col>
                <Col xs={12}>
                  <QuestionList
                    questions={questions}
                    setQuestions={setQuestions}
                    defaultState={defaultStates.questions} />
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Navbar sticky="bottom" className="justify-content-end">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </Navbar>
      </Container>

      <Navs.BottomNavbar />
    </React.Fragment>
  )
}

export default Editor