import React from "react"
import { useAuthUser, useSignOut } from "react-auth-kit"
import { Container, Navbar, Nav, Button } from "react-bootstrap"
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
        <Navbar.Brand>Brand</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="" href="/">Home</Nav.Link>
          <Nav.Link className="" href="/my-exams">Exams</Nav.Link>
          <Nav.Link className="" href="/my-submissions">Submissions</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link disabled>{`${auth().firstName} ${auth().lastName}`}</Nav.Link >
          <Nav.Link className="link-danger" onClick={handleClickSignOut}>Sign out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}



export default SiteNavbar