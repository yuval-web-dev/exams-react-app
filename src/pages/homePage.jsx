import React from "react"
import { Row, Col, Button, Container } from "react-bootstrap"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { SelectionLists, PageContainers } from "../components"
import { default as api } from "../api"
import { default as storage } from "../storage"


const HomePage = () => {
  const authUser = AuthKit.useAuthUser()

  return (
    <PageContainers.PostLogin>
      <div style={{ height: "80vh" }}>
        <Row className="h-100">
          <Col className="h-100 d-flex justify-content-center align-items-center">
            <p className="display-1">
              Welcome back, {authUser().firstName}.
            </p>
          </Col>
        </Row>
      </div>
    </PageContainers.PostLogin>
  )
}



export default HomePage