import React from "react"
import * as RouterDom from "react-router-dom"
import * as AuthKit from "react-auth-kit"
import {
  Row, Col,
  Container, Spinner, Nav, NavDropdown, Navbar
} from "react-bootstrap"
import { ImCompass2 } from "react-icons/im"
import Countdown from "react-countdown" // https://www.npmjs.com/package/react-countdown

import { Forms } from "../components"
import { default as api } from "../api"
import { default as storage } from "../storage"
import moment from "moment"


const TakeExamPage = () => {
  const [selectedExam, setExam] = React.useState(null)
  const [brand, setBrand] = React.useState(<Spinner />)
  const [loading, setLoading] = React.useState(true) // component is dependant on an async. function
  const [showNavigate, setShowNavigate] = React.useState(false)
  const [endTime, setEndTime] = React.useState(null)

  const formRef = React.useRef(null);
  const authHeader = AuthKit.useAuthHeader()
  const authUser = AuthKit.useAuthUser()
  const navigate = RouterDom.useNavigate()


  React.useEffect(
    () => {
      const fetchSelectedExam = async () => {
        try {
          const exam = await storage.getSelectedExam()
          setExam(exam)
          setBrand(exam.name)
          const time = moment(exam.start)
          time.add(exam.duration, "minutes")
          setEndTime(time)
        }
        catch (err) {
          console.error("Error fetching selected exam:", err)
        }
        finally {
          setLoading(false)
        }
      }
      fetchSelectedExam()
    },
    []
  )

  const handleSubmitForm = async (answers) => {
    try {
      await api.postSubmission(selectedExam.name, answers, authHeader())
    }
    catch (err) {
      console.error("Posting the submission to backend failed:", err)
    }
  }

  const handleClickNavigateLink = (event) => {
    event?.preventDefault()
    setShowNavigate(!showNavigate)
  }

  const handleHideNavigate = (event) => {
    event?.preventDefault()
    setShowNavigate(false)
  }

  const fluid = "lg"


  if (loading) {
    return <Spinner />
  }
  else {
    return (
      <React.Fragment>
        <Navbar bg="light">
          <Container fluid={fluid}>
            <Nav className="d-flex flex-row justify-content-start w-100">
              <Navbar.Brand>{brand}</Navbar.Brand>
              <Nav.Link
                active={showNavigate}
                onClick={handleClickNavigateLink}>
                <div className="d-flex align-items-center justify-content-center"><ImCompass2 />&nbsp;Navigate</div>
              </Nav.Link>
              <Nav.Link className="ms-auto">
                <Countdown date={endTime} />
              </Nav.Link>
              <NavDropdown
                disabled
                title={`${authUser().firstName} ${authUser().lastName}`} />
            </Nav>
          </Container>
        </Navbar>
        <Container fluid={fluid} className="p-0">
          <Forms.TakeExam
            ref={formRef}
            showNavigate={showNavigate}
            hideHandler={handleHideNavigate}
            exam={selectedExam}
            submitHandler={handleSubmitForm} />
        </Container>
      </React.Fragment>
    )
  }
}


export default TakeExamPage