import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { Row, Col, Button, Tabs, Tab } from "react-bootstrap"

import { Forms, PageContainers, ModalForms } from "../components"
import { storage } from "../storage"


const CreateExamPage = () => {
  const authUser = AuthKit.useAuthUser()

  const metadataFormRef = React.useRef()
  const questionsFormRef = React.useRef()

  const handleClickSave = async () => {
    const metadata = metadataFormRef.current.get()
    const questions = questionsFormRef.current.get()
    // TODO validate the above
    const exam = {
      id: uuidv4(),
      ...metadata,
      ...questions
    }
    await storage.insertExam(exam)
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
            <div style={{ height: "75vh" }}>
              <Forms.ExamMetadata ref={metadataFormRef} />
            </div>
          </Tab>
          <Tab eventKey="questions" title="Questions">
            <div style={{ height: "75vh" }}>
              <Forms.ExamQuestions ref={questionsFormRef} />
            </div>
          </Tab>
        </Tabs>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button name="Cancel" variant="outline-secondary" onClick={handleClick} style={{ width: "75px" }}>Cancel</Button>
            <Button name="Save" variant="primary" onClick={handleClickSave} className="ms-1" style={{ width: "75px" }}>Save</Button>
          </Col>
        </Row>
      </PageContainers.PostLogin>
  )
}

export default CreateExamPage
