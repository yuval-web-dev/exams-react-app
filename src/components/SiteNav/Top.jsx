import React from "react"
import { useAuthUser, useSignOut } from "react-auth-kit"
import { Container, Navbar, Nav, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const Top = () => {
  const auth = useAuthUser()
  const signOut = useSignOut()
  const navigate = useNavigate()

  const handleSignout = () => {
    signOut()
    navigate("/")
  }

  return (
    <Navbar sticky="top" bg="light">
      <Container fluid="lg">
        <Navbar.Brand>Exams</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/dashboard/edit">Editor</Nav.Link>
          <Nav.Link href="/dashboard/test">Tester</Nav.Link>
        </Nav>
        <Nav>
          <span className="navbar-text me-3">{auth().username}</span>
          <Nav.Link onClick={handleSignout}>Sign out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}



export default Top