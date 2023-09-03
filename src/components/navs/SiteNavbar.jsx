import React from "react"
import { useAuthUser, useSignOut } from "react-auth-kit"
import { Container, Navbar, Nav, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import * as storage from "../../storage"


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

  const RestrictedLinks = ({ auth }) => {
    if (auth().privilege === "lecturer")
      return (
        <React.Fragment>
          <Nav.Link href="/edit-exam">Editor</Nav.Link>
        </React.Fragment>
      )
    else {
      return null
    }
  }

  return (
    <Navbar sticky="top" bg="light">
      <Container fluid="lg">
        <Navbar.Brand>Brand</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <RestrictedLinks auth={auth} />
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