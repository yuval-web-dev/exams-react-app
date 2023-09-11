import moment from "moment" // https://momentjs.com/
import React from "react"
import * as RouterDom from "react-router-dom"
import * as AuthKit from "react-auth-kit"
import { Container, Spinner, Nav, Navbar } from "react-bootstrap"
import Countdown from "react-countdown" // https://www.npmjs.com/package/react-countdown
import * as Icons from "react-bootstrap-icons"

import { Forms } from "../components"
import { default as api } from "../api"
import { default as storage } from "../storage"


const TakeExamPage = () => {
  const [exam, setExam] = React.useState(null)
  const [pageLoading, setPageLoading] = React.useState(true) // component is dependant on an async. function
  const [submitLoading, setSubmitLoading] = React.useState(false)
  const [showNavigate, setShowNavigate] = React.useState(false)
  const [endTime, setEndTime] = React.useState(null)
  const [timeRanOut, setTimeRanOut] = React.useState(false)

  const authHeader = AuthKit.useAuthHeader()
  const authUser = AuthKit.useAuthUser()
  const navigate = RouterDom.useNavigate()

  const FLUID = "md"


  React.useEffect(
    () => {
      const fetchSelectedExam = async () => {
        try {
          const exam = await storage.getSelectedExam()
          setExam(exam)
          const time = moment(exam.start)
          time.add(exam.duration, "minutes")
          setEndTime(time)
          setPageLoading(false)
        }
        catch (err) {
          console.error("Error fetching selected exam:", err)
        }
      }
      fetchSelectedExam()
    },
    []
  )

  const handleSubmitExam = async (answers) => {
    setSubmitLoading(true)
    const submitSuccess = await api.postSubmission(exam.id, exam.name, answers, authHeader())
    if (submitSuccess) {
      setTimeout(() => {
        navigate("/", { replace: true })
      },
        2000)
    }
    else {

    }
    setSubmitLoading(false)
  }

  const handleClickNavigateLink = (event) => {
    event?.preventDefault()
    setShowNavigate(!showNavigate)
  }

  const handleHideNavigate = (event) => {
    event?.preventDefault()
    setShowNavigate(false)
  }

  const renderExamTimer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setTimeRanOut(true)
    }
    else {
      return (
        <span
          className={(hours < 1 && minutes < 10) ? "text-danger" : ""}>
          {hours}:{minutes}:{seconds}
        </span>
      )
    }
  }

  const navbar = () => (
    <Navbar bg="light">
      <Container fluid={FLUID}>
        <Nav className="d-flex flex-row justify-content-start w-100">
          <Nav.Link className="d-flex align-items-center">
            <Icons.Stopwatch size="20" /> &nbsp;
            <Countdown
              date={moment(exam.start).add(exam.duration, "minutes")}
              renderer={renderExamTimer} />
          </Nav.Link>
          <Nav.Link
            active={showNavigate}
            className="ms-2"
            onClick={handleClickNavigateLink}>
            <div className="d-flex align-items-center">
              <Icons.Compass size="19" />&nbsp;Navigate
            </div>
          </Nav.Link>
          <Nav.Link
            disabled
            className="ms-auto"
            onClick={handleClickNavigateLink}>
            <div className="d-flex justify-items-center align-items-center">
              {`${authUser().firstName} ${authUser().lastName}`} &nbsp; <Icons.List size="20" />
            </div>

          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )


  if (pageLoading) {
    return <Spinner />
  }
  else {
    return (
      <React.Fragment>
        {navbar()}
        <Container fluid={FLUID} className="p-0">
          <Forms.TakeExam
            showNavigate={showNavigate}
            hideHandler={handleHideNavigate}
            exam={exam}
            submitHandler={handleSubmitExam}
            isLoading={submitLoading} />
        </Container>

      </React.Fragment>
    )
  }
}


export default TakeExamPage