import React from "react"
import {
  Container
} from "react-bootstrap"

import { SiteNav } from "../components"
import ExamEditor from "../components/ExamEditor/ExamEditor"


const editor = () => {
  return (
    <React.Fragment>
      <Container fluid="sm">
        <h2>New Exam</h2>
        <ExamEditor />
      </Container>
    </React.Fragment>
  )
}

export default editor

// const scrollable = { maxHeight: "40vh", overflowY: "scroll" }