import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { Row, Col, Button, Tabs, Tab, Spinner } from "react-bootstrap"

import { Forms, PageContainers } from "../components"
import { default as storage } from "../storage"


const CreateExamPage = () => {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [fail, setFail] = React.useState(false)
  const authUser = AuthKit.useAuthUser()
  const navigate = RouterDom.useNavigate()

  const metadataFormRef = React.useRef()
  const questionsFormRef = React.useRef()

  const handleClickSave = async (event) => {
    event.preventDefault()
    setLoading(true)
    const metadata = metadataFormRef.current.get()
    const questions = questionsFormRef.current.get()
    const exam = {
      id: uuidv4(),
      ...metadata,
      ...questions
    }
    const storageResponse = await storage.saveExam(exam)
    if (storageResponse) {
      setSuccess(true)
      setTimeout(
        () => {
          navigate("/my-exams")
        },
        500
      )
    }
    else {
      setFail(true)
      setLoading(false)
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
  }


  return (
    authUser().privilege !== "lecturer" ?
      <RouterDom.Navigate to="/" />
      :
      <PageContainers.PostLogin>
        <Tabs defaultActiveKey="metadata" transition={false} >
          <Tab eventKey="metadata" title="Metadata">

            <div className="border" style={{ height: "75vh", overflowY: "auto" }}>
              <Forms.ExamMetadata ref={metadataFormRef} />
            </div>
          </Tab>
          <Tab eventKey="questions" title="Questions">
            <div className="border" style={{ height: "75vh", overflowY: "auto", overflowX: "hidden" }}>
              <Forms.ExamQuestions ref={questionsFormRef} />
            </div>
          </Tab>
        </Tabs>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button
              name="Cancel"
              variant="outline-secondary"
              style={{ width: "100px" }}
              onClick={handleClick}>
              Cancel
            </Button>
            <Button
              name="Save"
              variant={loading ? "secondary" : "primary"}
              className="ms-1"
              style={{ width: "100px" }}
              onClick={handleClickSave}>
              {loading ? <Spinner size="sm" /> : "Save"}
            </Button>
          </Col>
        </Row>
      </PageContainers.PostLogin>
  )
}

export default CreateExamPage
