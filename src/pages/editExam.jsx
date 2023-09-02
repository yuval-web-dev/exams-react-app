import React from "react"
import {
  Container
} from "react-bootstrap"

import ExamEditor from "../components/editors/ExamEditor"


const EditExamPage = () => {
  return (
    <React.Fragment>
      <Container fluid="sm">
        <ExamEditor />
      </Container>
    </React.Fragment>
  )
}

export default EditExamPage
