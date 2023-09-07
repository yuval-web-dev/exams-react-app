import React from "react"
import {
  Row, Col, Button,
  ListGroup, Spinner, Container
} from "react-bootstrap"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"
import * as Icon from "react-bootstrap-icons" // https://www.npmjs.com/package/react-bootstrap-icons

import { PageContainers, Modals } from "../components"
import { default as api } from "../api"
import { default as storage } from "../storage"


const MyExamsPage = () => {
  const [loading, setLoading] = React.useState(true)
  const [localExams, setLocalExams] = React.useState([]) // array of exam objects
  const [dbExams, setDbExams] = React.useState([]) // array of exam objects
  const [selectedExam, setSelectedExam] = React.useState(null) // exam object
  const [triggerRefresh, setTriggerRefresh] = React.useState(0)
  const [showConfirmModal, setShowConfirmModal] = React.useState(false)

  const navigate = RouterDom.useNavigate()
  const authHeader = AuthKit.useAuthHeader()
  const authUser = AuthKit.useAuthUser()

  React.useEffect(() => {
    const getLocalExams = async () => {
      const exams = await storage.getExams()
      if (exams) {
        setLocalExams(exams)
        setLoading(false)
      }
      else {
        // TODO Alert error.
      }
    }
    if (authUser().privilege === "lecturer") {
      getLocalExams()
    }
    setLoading(false)
  }, [triggerRefresh])

  React.useEffect(() => {
    const getDbExams = async () => {
      setLoading(true)
      const exams = await api.getExams(authHeader())
      if (exams) {
        setDbExams(exams)
        setLoading(false)
      }
      else {
        // TODO Alert error.
      }
      setLoading(false)
    }
    getDbExams()
  }, [triggerRefresh])


  const getExamById = (examId) => {
    const allExams = [...localExams, ...dbExams]
    const exam = allExams.find(exam => exam.id === examId)
    return exam
  }

  const handleSelectExam = async (examId) => {
    const exam = getExamById(examId)

    if (!selectedExam) {
      // No exam is currently selected.
      setSelectedExam(exam)
      await storage.setSelectedExam(exam)
    }
    else if (examId === selectedExam.id) {
      // The selected exam is the currently selected exam;
      // De-select it.
      setSelectedExam(null)
      await storage.clearSelectedExam()
    }
    else {
      // There is a selected exam already;
      // Change it to the newly selected one (examId).
      setSelectedExam(exam)
      await storage.setSelectedExam(exam)
    }
  }

  const handleLeftClickExam = async (event) => {
    event.preventDefault()
    const examId = event.target.id
    await handleSelectExam(examId)
  }

  const handleRightClickExam = async (event) => {
    event.preventDefault()
    const examId = event.target.id
    await handleSelectExam(examId)
    setShowConfirmModal(true)
  }

  const handleDiscardExamModalOk = async (event) => {
    event.preventDefault()
    setLoading(true)

    await storage.clearSelectedExam()
    await storage.removeExam(selectedExam.id)

    setShowConfirmModal(false)
    setSelectedExam(null)
    setTriggerRefresh(triggerRefresh + 1)
    setLoading(false)
  }

  const handleDiscardExamModalCancel = (event) => {
    event.preventDefault()
    setShowConfirmModal(false)
    setSelectedExam(null)
    setTriggerRefresh(triggerRefresh + 1)
  }

  const handleClickStart = () => {
    if (selectedExam) {
      navigate("/take-exam")
    }
  }

  const handleClickUpload = async () => {
    if (selectedExam) {
      setLoading(true)
      const apiResponse = await api.postExam(selectedExam, authHeader())
      if (apiResponse) {
        setTriggerRefresh(triggerRefresh + 1)
      }
      else {
        // TODO add a fail toast
      }
      setTriggerRefresh(triggerRefresh + 1)
      await storage.removeExam(selectedExam.id)
      await storage.clearSelectedExam()
      setSelectedExam(null)
      setLoading(false)
    }
  }

  return (
    <PageContainers.PostLogin>
      <Container>
        <Row className="mb-1">
          <Col className="d-flex">
            <span className="fs-3">Exams</span>
            <Button
              className="ms-auto"
              variant={loading ? "secondary" : "outline-primary"}
              disabled={selectedExam === null || dbExams.find(dbExam => dbExam === selectedExam)}
              style={{ width: "100px" }}
              onClick={handleClickUpload}>
              {loading ? <Spinner size="sm" /> : "Upload"}
            </Button>
            <Button
              className="ms-1"
              variant="primary"
              disabled={selectedExam === null}
              style={{ width: "100px" }}
              onClick={handleClickStart}>
              Start
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup variant="flush">
              {
                loading ?
                  <div className="w-100 justify-content-center"><Spinner /></div> :
                  <React.Fragment>
                    {
                      dbExams.map((exam, idx) => (
                        <ListGroup.Item
                          className="d-flex justify-content-between"
                          variant="success"
                          key={`exam_${idx}`}
                          id={exam.id}
                          active={exam === selectedExam}
                          style={{ cursor: "pointer" }}
                          onClick={handleLeftClickExam}>
                          {exam.name}
                          <Icon.CloudCheck size={23} />
                        </ListGroup.Item>
                      ))
                    }
                    {
                      localExams.map((exam, idx) => (
                        <ListGroup.Item
                          className="d-flex justify-content-between"
                          variant="warning"
                          key={`exam_${idx}`}
                          id={exam.id}
                          active={exam === selectedExam}
                          style={{ cursor: "pointer" }}
                          onClick={handleLeftClickExam}
                          onContextMenu={handleRightClickExam}>
                          {exam.name}
                          <Icon.FileEarmark size={23} />
                        </ListGroup.Item>
                      ))
                    }
                  </React.Fragment>
              }
            </ListGroup>
          </Col>
        </Row>
      </Container>

      <Modals.Confirm
        show={showConfirmModal}
        header={selectedExam?.name}
        body="Are you sure you want to discard this exam?"
        cancelHandler={handleDiscardExamModalCancel}
        okHandler={handleDiscardExamModalOk} />
    </PageContainers.PostLogin>
  )

}


export default MyExamsPage