import React from "react"
import * as AuthKit from "react-auth-kit"
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import * as RouterDom from "react-router-dom"
import * as Icons from "react-bootstrap-icons"

import { default as storage } from "../../storage"


const SiteNavbar = ({ fluid }) => {
  const authUser = AuthKit.useAuthUser()
  const signOut = AuthKit.useSignOut()
  const navigate = RouterDom.useNavigate()

  const handleClickSignOut = async () => {
    // TODO clear local storage! and move to an outer function
    const result = await storage.clearAll()
    if (result) {
      setTimeout(
        () => navigate("/"),
        500
      )
      signOut()
    }
  }

  return (
    <Navbar className="bg-light">
      <Container fluid={fluid}>
        <Navbar.Brand><Nav.Link className="" href="/">Exams App</Nav.Link></Navbar.Brand>
        <Nav>
          <NavDropdown align="end" title={`${authUser().firstName} ${authUser().lastName}`}>
            {authUser().privilege === "lecturer" ?
              <NavDropdown.Item href="/create-exam" onClick={() => { }} style={{ width: "200px" }}>
                <Icons.Pencil />
                <span className="ms-2">Create an Exam</span>
              </NavDropdown.Item>
              :
              null
            }
            <NavDropdown.Item href="/my-exams">
              <Icons.UiChecks />
              <span className="ms-2">Exams</span>
            </NavDropdown.Item>
            <NavDropdown.Item href="/my-submissions">
              <Icons.Send />
              <span className="ms-2">Submissions</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="text-danger" href="#" onClick={handleClickSignOut}>
              <Icons.BoxArrowRight />
              <span className="ms-2">Sign out</span>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}


export default SiteNavbar