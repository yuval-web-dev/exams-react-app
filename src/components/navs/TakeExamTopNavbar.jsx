import React from "react"
import { useAuthUser } from "react-auth-kit"
import { Container, Navbar, Nav } from "react-bootstrap"


const TakeExamTopNavbar = () => {
  const auth = useAuthUser()

  return (
    <Navbar sticky="top" bg="light">
      <Container fluid="lg">
        <Navbar.Brand>Brand</Navbar.Brand>
        <Nav className="me-auto">

        </Nav>
        <Nav>
          <Nav.Link disabled>{`${auth().firstName} ${auth().lastName}`}</Nav.Link >
        </Nav>
      </Container>
    </Navbar>
  )
}



export default TakeExamTopNavbar