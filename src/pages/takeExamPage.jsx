import React from "react"
import * as RouterDom from "react-router-dom"
import * as AuthKit from "react-auth-kit"
import {
  Row, Col,
  Container, Spinner, Nav, NavDropdown, Navbar
} from "react-bootstrap"
import { ImCompass2 } from "react-icons/im"

import { Forms } from "../components"
import { api } from "../api"
import { storage } from "../storage"


const TakeExamPage = () => {
  const [selectedExam, setExam] = React.useState(null)
  const [brand, setBrand] = React.useState(<Spinner />)
  const [loading, setLoading] = React.useState(true) // component is dependant on an async. function
  const [showNavigate, setShowNavigate] = React.useState(false)

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
              <Nav.Link active={showNavigate} onClick={handleClickNavigateLink}>Navigate <ImCompass2 /></Nav.Link>
              <Nav.Link className="ms-auto">Timer</Nav.Link>
              <NavDropdown
                disabled
                title={`${authUser().firstName} ${authUser().lastName}`} />
            </Nav>
          </Container>
        </Navbar>
        <Container fluid={fluid}>
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


export default TakeExamPage;