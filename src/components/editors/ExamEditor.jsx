import React from "react"
import { Row, Col, Card, Button } from "react-bootstrap"

import { Forms } from "../forms"
import { Lists } from "../editingLists"


const ExamEditor = () => {
  const metadataRef = React.useRef()
  const questlistRef = React.useRef()

  const handleClickCancel = () => {
    alert("Cancel button clicked!")
  }

  const handleClickSave = () => {
    alert("Save button clicked!")
  }

  return (
    <Card>
      <Row>
        <Col lg="4">
          <Forms.ExamMetadata ref={metadataRef} />
        </Col>
        <Col>
          <Lists.Questions ref={questlistRef} />
        </Col>
      </Row>

      <Card.Footer className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="outline-secondary"
          onClick={handleClickCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleClickSave}>
          Save
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default ExamEditor