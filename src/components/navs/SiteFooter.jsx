import React from "react"
import { Row, Col, Container, Navbar } from "react-bootstrap"
import { FaReact } from "react-icons/fa"

const SiteFooter = () => (
  <Navbar
    fixed="bottom"
    bg="light"
    variant="light"
    className="justify-content-center">
    <Container>
      <Row className="w-100">
        <Col className="d-flex justify-content-center">
          <Navbar.Text className="text-center text-muted small">
            Exams App &copy; 2023 Yuval Rotem. All Rights Reserved.
          </Navbar.Text>
        </Col>
      </Row>
    </Container>
  </Navbar>
);

export default SiteFooter;
