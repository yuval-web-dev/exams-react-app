import React, { useState, useRef } from "react"
import {
  Navbar,
  Container, Row, Col,
  ButtonGroup, Button,
  Accordion,
  Modal,
  Card
} from "react-bootstrap"

import { QuestsList, MetadataForm, SiteNavbar } from "../components"
import * as storage from "../utils/storage"
import { Exam } from "../classes.ts"
import "./editor.scss"


const Editor = () => {
  const defaultStates = {
    metadata: null,
    quests: []
  }

  const questListRef = useRef()
  const metaFormRef = useRef()

  const handleSaveButton = () => {
    if (metaFormRef.current.error()) {
      alert("Please fill metadata form as intended.")
      return
    }
    if (questListRef.current.error()) {
      alert("Please fill questions form as intended.")
      return
    }
    const examObj = new Exam(
      metaFormRef.current.yieldObj(),
      questListRef.current.yieldArr()
    )
    storage.save(examObj.id, examObj)
  }

  const handleCancelButton = () => {

  }

  const MetaAccordItem = (eventKey) => (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>Metadata</Accordion.Header>
      <Accordion.Body>
        <MetadataForm ref={metaFormRef} />
      </Accordion.Body>
    </Accordion.Item>
  )

  const QuestsAccordItem = (eventKey) => (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>Questions</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col>
            <QuestsList ref={questListRef} />
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  )

  const MetaCard = () => (
    <Card>
      <Card.Header>Metadata</Card.Header>
      <Card.Body>
        <MetadataForm ref={metaFormRef} />
      </Card.Body>
    </Card>
  )

  const QuestsCard = () => (
    <Card>
      <Card.Header>Questions</Card.Header>
      <Card.Body>
        <QuestsList ref={questListRef} />
      </Card.Body>
    </Card>
  )

  return (
    <React.Fragment>
      <SiteNavbar.Top />
      <Container>
        <h1>New Exam</h1>
        <Card>
          <Row>
            <Col lg="4">
              <MetaCard />
            </Col>
            <Col>
              <QuestsCard />
            </Col>
          </Row>

          <Card.Footer className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={handleCancelButton}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveButton}>
              Save
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default Editor

// const scrollable = { maxHeight: "40vh", overflowY: "scroll" }