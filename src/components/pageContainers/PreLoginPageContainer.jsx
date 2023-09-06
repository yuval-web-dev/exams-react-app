import React from "react"
import { Container, Row, Col } from "react-bootstrap"


const PreLoginPageContainer = ({ children }) => {

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-start justify-content-center mt-5" style={{ height: "100vh" }}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default PreLoginPageContainer