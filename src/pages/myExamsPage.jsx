import React from "react"
import moment from "moment-timezone"
import { Row, Col, Button, ListGroup, Spinner } from "react-bootstrap"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"
import * as Icons from "react-bootstrap-icons" // https://www.npmjs.com/package/react-bootstrap-icons

import { PageContainers, Modals } from "../components"
import { default as api } from "../api"
import { default as storage } from "../storage"


const MyExamsPage = () => {
  const [loadingDelete, setLoadingDelete] = React.useState(false)
  const [loadingUpload, setLoadingUpload] = React.useState(false)
  const [loadingPage, setLoadingPage] = React.useState(true)
  const [localExams, setLocalExams] = React.useState([]) // array of exam objects
  const [dbExams, setDbExams] = React.useState([]) // array of exam objects
  const [selectedExam, setSelectedExam] = React.useState(null) // exam object
  const [refresh, setRefresh] = React.useState(0)
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)

  const navigate = RouterDom.useNavigate()
  const getJwt = AuthKit.useAuthHeader()
  const authUser = AuthKit.useAuthUser()

  React.useEffect(() => {
    const getLocalExams = async () => {
      const exams = await storage.getExams()
      if (exams) {
        setLocalExams(exams)
        setLoadingPage(false)
      }
      else {
        // TODO Alert error.
      }
    }
    if (authUser().privilege === "lecturer") {
      getLocalExams()
    }
    setLoadingPage(false)
  }, [refresh])

  React.useEffect(() => {
    const getDbExams = async () => {
      setLoadingUpload(true)
      var exams
      if (authUser().privilege === "lecturer") {
        exams = await api.getUserExams(getJwt())
      }
      else {
        exams = await api.getAllExams(getJwt())
      }
      if (exams) {
        setDbExams(exams)
      }
      else {
        // TODO Alert error.
      }
      setLoadingUpload(false)
    }
    getDbExams()
  }, [refresh])


  const triggerRefresh = () => setRefresh(refresh + 1)

  const clearExam = async () => {
    setSelectedExam(null)
    await storage.clearSelectedExam()
  }

  const getExamById = (examId) => {
    const allExams = [...localExams, ...dbExams]
    const exam = allExams.find(exam => exam.id === examId)
    return exam
  }

  const handleSelectExam = async (examId) => {
    const exam = getExamById(examId)
    const isLocal = localExams.find(localExam => localExam.id === exam.id) !== undefined

    if (!selectedExam) {
      // No exam is currently selected.
      setSelectedExam(exam)
      await storage.setSelectedExam(exam, isLocal)
    }
    else if (examId === selectedExam.id) {
      // The selected exam is the currently selected exam;
      // De-select it.
      await clearExam()
    }
    else {
      // There is a selected exam already;
      // Change it to the newly selected one (examId).
      setSelectedExam(exam)
      await storage.setSelectedExam(exam, isLocal)
    }
  }

  const handleDeleteModalConfirm = async (event) => {
    event.preventDefault()
    setLoadingDelete(true)

    if (localExams.find(exam => exam.id === selectedExam.id)) {
      await storage.removeExam(selectedExam.id)
    }
    else if (dbExams.find(exam => exam.id === selectedExam.id)) {
      await api.deleteExam(selectedExam.id, getJwt())
    }
    else {
      alert("error!")
    }
    await clearExam()
    setShowDeleteModal(false)
    setLoadingDelete(false)
    triggerRefresh()
  }

  const handleDeleteModalCancel = (event) => {
    event.preventDefault()
    setShowDeleteModal(false)
    setRefresh(refresh + 1)
  }

  const handleClickButton = async (buttonName) => {
    switch (buttonName) {
      case "edit":
        navigate("/edit-exam")
        return
      case "upload":
        const posted = await api.postExam(selectedExam, getJwt())
        if (posted) {
          await storage.removeExam(selectedExam.id)
          await storage.clearSelectedExam()
          triggerRefresh()
        }
        else {
          // TODO add alert
        }
        clearExam()
        return
      case "delete":
        setShowDeleteModal(true)
        return
      case "start":
        navigate("/take-exam")
        return
      default:
        return
    }
  }

  const renderDbExams = (authUser) => {
    const isTime = (exam) => {
      const now = moment()
      const startTime = moment(exam.start).subtract(3, "hours")
      const endTime = startTime.clone().add(exam.duration, "minutes")
      return now.isAfter(startTime) && now.isBefore(endTime)
    }

    return (
      dbExams.map((exam, idx) => {
        if (authUser().privilege === "lecturer") {
          return (
            <ListGroup.Item
              className="d-flex"
              variant="success"
              key={idx}
              id={exam.id}
              active={exam === selectedExam}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectExam(exam.id)}>
              <Icons.CloudCheck size="20" style={{ pointerEvents: "none" }} />
              &nbsp;
              <span style={{ pointerEvents: "none" }}>{exam.name}</span>
              <span className="ms-auto" style={{ pointerEvents: "none" }}>{moment(exam.start).format("H:mm, D/M/YY")}</span>
            </ListGroup.Item>
          )
        }
        else {
          return (
            <ListGroup.Item
              disabled={!isTime(exam)}
              className="d-flex justify-content-between border"
              variant="light"
              key={`exam_${idx}`}
              id={exam.id}
              active={exam === selectedExam}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectExam(exam.id)}>
              <span style={{ pointerEvents: "none" }}>{exam.name}</span>
              <span className="ms-auto" style={{ pointerEvents: "none" }}>{moment(exam.start).format("H:mm, D/M/YY")}</span>
            </ListGroup.Item>
          )
        }
      })
    )
  }

  const renderLocalExams = (authUser) => {
    if (authUser().privilege === "lecturer") {
      return (
        localExams.map((exam, idx) => (
          <ListGroup.Item
            key={idx}
            className="d-flex"
            variant="warning"
            active={exam === selectedExam}
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectExam(exam.id)}>
            <Icons.CloudSlash size="20" />
            &nbsp;
            <span style={{ pointerEvents: "none" }}>{exam.name}</span>
            <span className="ms-auto" style={{ pointerEvents: "none" }}>{moment(exam.start).subtract(3, "h").format("H:mm, D/M/YY")}</span>
          </ListGroup.Item>
        ))
      )
    }
    else {
      return null
    }
  }

  const renderButtons = (authUser) => {
    if (authUser().privilege === "lecturer") {
      return (
        <Col className="mt-1 d-flex flex-row align-items-center">
          <span className="me-auto fs-4">Exams</span>
          <Button
            className="ms-1"
            variant={loadingUpload ? "secondary" : "outline-primary"}
            disabled={selectedExam === null || dbExams.find(dbExam => dbExam === selectedExam)}
            onClick={() => handleClickButton("upload")}
            style={{ width: "100px" }}>
            {loadingUpload ?
              <Spinner size="sm" /> :
              <span>{<Icons.CloudUpload />} Upload</span>
            }
          </Button>
          <Button
            className="ms-1"
            variant={loadingDelete ? "secondary" : "outline-primary"}
            disabled={selectedExam === null}
            onClick={() => handleClickButton("edit")}
            style={{ width: "100px" }}>
            <span>{<Icons.Pencil />} Edit</span>
          </Button>
          <Button
            className="ms-1"
            variant={loadingDelete ? "secondary" : "outline-danger"}
            disabled={selectedExam === null}
            onClick={() => handleClickButton("delete")}
            style={{ width: "100px" }}>
            {loadingDelete ?
              <Spinner size="sm" /> :
              <span>{<Icons.Trash />} Delete</span>
            }
          </Button>
        </Col>
      )
    }
    else {
      return (
        <Col className="d-flex flex-row">
          <span className="fs-4">Exams</span>
        </Col>
      )
    }
  }

  return (
    <PageContainers.PostLogin>
      <Row className="">
        <Col xs="12" className="mb-2 d-flex">
          {renderButtons(authUser)}
        </Col>
        <Col xs="12" className="" style={{ height: "300px", overflowY: "auto" }}>
          <ListGroup variant="flush">
            {
              loadingUpload ?
                <div className="w-100 justify-content-center"><Spinner /></div> :
                <React.Fragment>
                  {renderLocalExams(authUser)}
                  {renderDbExams(authUser)}
                </React.Fragment>
            }
          </ListGroup>
        </Col>
        <Col xs="12" className="mt-2">
          <Button
            className="ms-1 w-100"
            variant="primary"
            disabled={selectedExam === null || localExams.find(exam => exam.id === selectedExam.id)}
            style={{ width: "75px" }}
            onClick={() => handleClickButton("start")}>
            Start
          </Button>
        </Col>
      </Row>

      <Modals.Confirm
        show={showDeleteModal}
        header={selectedExam?.name}
        body="Are you sure you want to delete this exam?"
        cancelHandler={handleDeleteModalCancel}
        confirmHandler={handleDeleteModalConfirm} />
    </PageContainers.PostLogin>
  )

}


export default MyExamsPage