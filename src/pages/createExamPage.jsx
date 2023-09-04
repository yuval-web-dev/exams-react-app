import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { Forms, PageContainers } from "../components"
import { Row, Col, Button } from "react-bootstrap"


const CreateExamPage = () => {
  const [exam, setExam] = React.useState({})
  const authUser = AuthKit.useAuthUser()
  const metadataFormRef = React.useRef()
  const questionsFormRef = React.useRef()

  const handleChangeMetadata = (metadata) => {

  }

  const handleChangeQuestions = (questions) => {

  }

  return (
    authUser().privilege !== "lecturer" ?
      <RouterDom.Navigate to="/" />
      :
      <PageContainers.PostLogin>
        <Forms.ExamMetadata handler={handleChangeMetadata} />
        {/* <Forms.ExamQuestions /> */}
        {/* <Row>
          <Col className="d-flex justify-content-end">
            <Button style={{ width: "75px" }} variant="secondary">
              Cancel
            </Button>
            <Button style={{ width: "75px" }} className="ms-1" variant="primary">
              Save
            </Button>
          </Col>
        </Row> */}
      </PageContainers.PostLogin>
  )
}

export default CreateExamPage
