import React from "react"
import { useAuthUser, useSignOut } from "react-auth-kit"
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const SiteNavbar = () => {
  const auth = useAuthUser()
  const signOut = useSignOut()
  const navigate = useNavigate()

  const handleClickSignOut = async () => {
    // await storage.delete_store("exams")
    // await storage.delete_store("wizard")
    signOut()
    navigate("/")
  }

  return (
    <Navbar sticky="top" bg="light">
      <Container fluid="lg">
        <Navbar.Brand>Exams App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="" href="/">Home</Nav.Link>
          <Nav.Link className="" href="/my-exams">Exams</Nav.Link>
          <Nav.Link className="" href="/my-submissions">Submissions</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown className="me-auto" title={`${auth().firstName} ${auth().lastName}`}>
            <NavDropdown.Item href="#" onClick={handleClickSignOut}>Sign out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}


export default SiteNavbar