import React from "react"
import { Row, Col, Button, Container } from "react-bootstrap"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { SelectionLists, PageContainers } from "../components"
import { default as api } from "../api"
import { default as storage } from "../storage"


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
        <Col className="h-100 d-flex justify-content-center align-items-center">
          <p className="display-6">
            Welcome back, {authUser().firstName}.
          </p>
        </Col>
      </Row>
    </PageContainers.PostLogin>
  )
}



export default HomePage