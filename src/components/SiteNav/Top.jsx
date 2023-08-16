import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"


const Top = () => (
  <Navbar sticky="top" bg="light">
    <Container fluid="lg">
      <Navbar.Brand>ETest</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/edit">Editor</Nav.Link>
        <Nav.Link href="/test">Tester</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
)

export default Top