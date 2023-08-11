import React, { useState, useRef } from "react"
import { Navbar, Accordion, Container, Row, Col, Modal, ButtonGroup, Button } from "react-bootstrap"

import { BottomControlBar, QuestionList, MetadataForm, SiteNavbar } from "../components"

import QuestionForm from "../components/ClosedQuestionForm/ClosedQuestionForm"

import * as storage from "../utils/storage"
import { Exam } from "../classes.ts"

const Editor = () => {
  const defaultStates = {
    metadata: null,
    quests: [],
    questModalShow: false
  }
  const [quests, setQuests] = useState(defaultStates.quests)
  const [questModalShow, setQuestModalShow] = useState(defaultStates.questModalShow)

  const questFormRef = useRef()
  const metaFormRef = useRef()

  const handleQuestModalSave = () => {
    if (questFormRef.current.error()) {
      alert("Please fill question form as intended.")
      return
    }
    const questObj = questFormRef.current.yieldObj()
    setQuests([...quests, questObj])
    setQuestModalShow(false)
  }

  const handleExamSave = () => {
    if (metaFormRef.current.error()) {
      alert("Please fill required metadata fields.")
      return
    }
    if (quests.length === 0) {
      alert("Please add at least one question.")
    }
    const metaObj = metaFormRef.current.yieldObj()
    const examObj = new Exam(
      metaObj,
      quests
    )
    storage.save(examObj.id, examObj)
  }


  const QuestModal = () => (
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
          onClick={handleQuestModalSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const scrollable = { maxHeight: "40vh", overflowY: "scroll" }

  return (
    <React.Fragment>
      <SiteNavbar.Top />
      {QuestModal()}
      <Container>
        <h1>New Exam</h1>
        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Metadata</Accordion.Header>
            <Accordion.Body>
              <MetadataForm ref={metaFormRef} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Questions</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col className="d-flex">
                  <Button className="me-auto"
                    variant="primary"
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
                  <Button variant="light"
                    size="sm"
                    onClick={() => { }}>
                    from JSON
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <QuestionList
                    questions={quests}
                    setQuestions={setQuests}
                    defaultState={defaultStates.quests} />
                </Col></Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Navbar sticky="bottom" className="justify-content-end">
          <Button
            variant="secondary"
            onClick={() => { }}>Cancel</Button>
          <Button
            variant="primary"
            onClick={handleExamSave}>Save</Button>
        </Navbar>
      </Container>
      <SiteNavbar.Bottom />
    </React.Fragment>
  )
}

export default Editor