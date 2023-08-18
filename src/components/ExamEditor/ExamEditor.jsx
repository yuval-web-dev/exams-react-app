import React from "react"
import {
  Row, Col,
  Card,
  Button
} from "react-bootstrap"

import { MetadataComponent } from "../Metadata"
import { QuestListComponent } from "../QuestList"
import * as storage from "../../utils/storage"


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
          <MetadataComponent ref={metadataRef} />
        </Col>
        <Col>
          <QuestListComponent ref={questlistRef} />
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



// const examObj = new Exam(
//   metaFormRef.current.yield(),
//   questListRef.current.yield()
// )
// storage.save(examObj.id, examObj)