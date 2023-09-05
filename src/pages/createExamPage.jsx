import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { Forms, PageContainers, ModalForms } from "../components"
import { Row, Col, Button, Tabs, Tab } from "react-bootstrap"


const CreateExamPage = () => {
  const authUser = AuthKit.useAuthUser()

  const [exam, setExam] = React.useState({
    name: "",
    lecturerFirstName: "",
    lecturerLastName: "",
    start: "",
    duration: 0,
    shuffle: false,
    questions: []
  })

  const [activekey, setActiveKey] = React.useState("Metadata")

  const metadataFormRef = React.useRef()
  const questionsFormRef = React.useRef()

  // const handleChangeMetadata = (metadata) => {
  //   const { name, lecturerFirstName, lecturerLastName, start, duration } = metadata
  //   setExam({
  //     ...exam,
  //     name,
  //     lecturerFirstName,
  //     lecturerLastName,
  //     start,
  //     duration
  //   })
  // }

  // const handleChangeQuestions = (questions) => {
  //   setExam({
  //     ...exam,
  //     questions
  //   })
  // }

  const handleClick = (event) => {
    event.preventDefault()
    alert(`Clicked "${event.target.name}" button.`)
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
            <Button name="Save" variant="primary" onClick={handleClick} className="ms-1" style={{ width: "75px" }}>Save</Button>
          </Col>
        </Row>
      </PageContainers.PostLogin>
  )
}

export default CreateExamPage
