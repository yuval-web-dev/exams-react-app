import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"


const TopNavbar = () => (
  <Navbar bg="light">
    <Container>
      <Navbar.Brand>ETest</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/edit">Editor</Nav.Link>
          <Nav.Link href="/test">Tester</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default TopNavbar