import React, { useRef } from "react"
import {
  Container, Row, Col,
  Button,
  Card
} from "react-bootstrap"

import { QuestList, MetadataForm, SiteNavbar } from "../components"
import * as storage from "../utils/storage"
import { Exam } from "../classes.ts"
import "./editor.scss"


const Editor = () => {
  const questListRef = useRef()
  const metaFormRef = useRef()

  const handleSaveButton = () => {
    try {
      metaFormRef.current.validate()
    }
    catch {
      alert("MetadataForm validation error")
      return
    }
    try {
      questListRef.current.validate()
    }
    catch {
      alert("QuestList validation error")
      return
    }
    const examObj = new Exam(
      metaFormRef.current.yield(),
      questListRef.current.yield()
    )
    storage.save(examObj.id, examObj)
  }

  const handleCancelButton = () => {

  }

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
        <QuestList ref={questListRef} />
      </Card.Body>
    </Card>
  )

  return (
    <React.Fragment>
      <SiteNavbar.Top />
      <Container fluid="lg">
        <h2>New Closed Exam</h2>
        <Card>
          <Row>
            <Col lg="3">
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