import React, { useRef } from "react"
import {
  Container, Row, Col,
  Button,
  Card
} from "react-bootstrap"

import { QuestList, MetadataForm, SiteNav } from "../components"
import * as storage from "../utils/storage"
import { Exam } from "../classes.ts"
import "./editor.scss"
import ExamEditor from "../components/ExamEditor/ExamEditor"


const editor = () => {

  const handleClickCancel = () => {
    alert("Cancel button clicked!")
  }

  const handleClickSave = () => {
    alert("Save button clicked!")
  }

  return (
    <React.Fragment>
      <SiteNav.Top />
      <Container fluid="sm">
        <h2>New Exam</h2>
        <Card>
          <ExamEditor />

          <Card.Footer className="d-flex justify-content-end">
            <Button
              variant="secondary"
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
      </Container>
    </React.Fragment>
  )
}

export default editor

// const scrollable = { maxHeight: "40vh", overflowY: "scroll" }