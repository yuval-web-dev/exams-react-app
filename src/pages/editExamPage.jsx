import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { Row, Col, Button, Tabs, Tab, Spinner } from "react-bootstrap"

import { Forms, PageContainers } from "../components"
import { default as storage } from "../storage"
import { default as api } from "../api"


const EditExamPage = () => {
  const [loadingPage, setLoadingPage] = React.useState(true)
  const [loadingSave, setLoadingSave] = React.useState(false)
  const authUser = AuthKit.useAuthUser()
  const authHeader = AuthKit.useAuthHeader()
  const navigate = RouterDom.useNavigate()
  const [exam, setExam] = React.useState(null)

  React.useEffect(() => {
    const getExam = async () => {
      const selectedExam = await storage.getSelectedExam()
      if (!selectedExam) {
        navigate("/")
      }
      setExam(selectedExam)
      setLoadingPage(false)
    }
    getExam()
  }, [])

  const metadataFormRef = React.useRef()
  const questionsFormRef = React.useRef()

  const handleClickButton = async (buttonName) => {
    switch (buttonName) {
      case "form-cancel":
        return navigate("/my-exams")

      case "form-save":
        setLoadingSave(true)
        const metadata = metadataFormRef.current.get()
        const questions = questionsFormRef.current.get()
        const modifiedExam = {
          id: exam.id,
          ...metadata,
          ...questions
        }
        const isLocal = await storage.getSelectedExamType()
        if (isLocal) {
          // push changes locally.
          const storageResponse = await storage.updateExam(exam.id, modifiedExam)
          if (storageResponse) {
            setTimeout(() => {
              navigate("/my-exams")
            }, 500)
          }
          else {
            // TODO add an alert
            setLoadingSave(false)
          }
        }
        else {
          // push changes immediately to backend DB.
          const backendResponse = await api.updateExam(modifiedExam, authHeader())
          if (backendResponse) {
            setTimeout(() => {
              navigate("/my-exams")
            }, 500)
          }
          else {
            // TODO add an alert
            setLoadingSave(false)
          }
        }
        return

      default:
        return
    }
  }

  if (authUser().privilege !== "lecturer") {
    return <RouterDom.Navigate to="/" />
  }
  else {
    if (loadingPage) {
      return <Spinner size="lg" />
    }
    else {
      return (
        <PageContainers.PostLogin>
          <span className="fs-3">Editing Exam: <span>{exam?.id}</span></span>
          <Tabs defaultActiveKey="metadata" transition={false} >
            <Tab eventKey="metadata" title="Metadata">

              <div className="border" style={{ height: "75vh", overflowY: "auto" }}>
                {loadingPage ? <Spinner size="sm" /> :
                  <Forms.ExamMetadata
                    ref={metadataFormRef}
                    initialValues={{
                      name: exam?.name,
                      lecturerFirstName: exam?.lecturerFirstName,
                      lecturerLastName: exam?.lecturerLastName,
                      start: exam?.start,
                      duration: exam?.duration
                    }} />
                }
              </div>
            </Tab>
            <Tab eventKey="questions" title="Questions">
              <div className="border" style={{ height: "75vh", overflowY: "auto", overflowX: "hidden" }}>
                {
                  loadingPage ? <Spinner size="sm" /> :
                    <Forms.ExamQuestions
                      ref={questionsFormRef}
                      initialValues={{
                        questions: exam?.questions,
                        shuffle: exam?.shuffle
                      }} />
                }
              </div>
            </Tab>
          </Tabs>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button
                variant="outline-secondary"
                style={{ width: "100px" }}
                onClick={() => handleClickButton("form-cancel")}>
                Cancel
              </Button>
              <Button
                variant={loadingSave ? "secondary" : "primary"}
                className="ms-1"
                style={{ width: "100px" }}
                onClick={() => handleClickButton("form-save")}>
                {loadingSave ? <Spinner size="sm" /> : "Save"}
              </Button>
            </Col>
          </Row>
        </PageContainers.PostLogin>
      )
    }
  }

}

export default EditExamPage
