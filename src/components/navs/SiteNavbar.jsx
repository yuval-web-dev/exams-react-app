import React from "react"
import { useAuthUser, useSignOut } from "react-auth-kit"
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const SiteNavbar = () => {
  const authUser = useAuthUser()
  const signOut = useSignOut()
  const navigate = useNavigate()

  const handleClickSignOut = async () => {
    // TODO clear local storage! and move to an outer function
    if (signOut()) {
      console.info(`User sign out "${authUser().username}" successful.`)
      navigate("/")
    }
    else {
      console.info(`User sign out "${authUser().username}" failed.`)
    }

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
          <NavDropdown
            className="me-auto"
            align="end"
            title={`${authUser().firstName} ${authUser().lastName}`}>
            <NavDropdown.Item
              href="#"
              onClick={() => { }}>
              Settings
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#"
              className="bg-danger-subtle"
              onClick={handleClickSignOut}>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}


export default SiteNavbar