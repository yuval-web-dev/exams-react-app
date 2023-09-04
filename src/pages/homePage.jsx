import React from "react"
import { Row, Col, Button, Container } from "react-bootstrap"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { SelectionLists, PageContainers } from "../components"
import { api } from "../api"
import { storage } from "../storage"


const HomePage = () => {
  const navigate = RouterDom.useNavigate()
  const authUser = AuthKit.useAuthUser()

  const handleClickButton = (event) => {
    navigate(event.target.name)
  }

  const md = () => {
    if (authUser().privilege === "lecturer") {
      return 4
    }
    else {
      return 6
    }
  }

  return (
    <PageContainers.PostLogin>
      <Row>
        <Col xs="12" className="d-flex justify-content-center">
          <p className="display-6">
            Welcome back, {authUser().firstName}.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={md()}>
          <Button
            name="/my-exams"
            className="p-5 w-100 h-100"
            variant="light"
            onClick={handleClickButton}>
            <p className="display-6">My Exams</p>
          </Button>
        </Col>
        <Col md={md()}>
          <Button
            name="/my-submissions"
            className="p-5 w-100 h-100"
            variant="light"
            onClick={handleClickButton}>
            <p className="display-6">My Submissions</p>
          </Button>
        </Col>
        {
          authUser().privilege === "lecturer" ?
            <Col md={md()}>
              <Button
                name="/create-exam"
                className="p-5 w-100 h-100"
                variant="light"
                onClick={handleClickButton}>
                <p className="display-6">Create an Exam</p>
              </Button>
            </Col>
            :
            null
        }
      </Row>
    </PageContainers.PostLogin>
  )
}



export default HomePage