import React from "react"
import { useAuthUser, useSignOut } from "react-auth-kit"
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { BsGear } from "react-icons/bs"
import { MdLogout } from "react-icons/md"


const SiteNavbar = ({ fluid }) => {
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
    <Navbar className="bg-light">
      <Container fluid={fluid}>
        <Navbar.Brand><Nav.Link className="" href="/">Exams App</Nav.Link></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="" href="/my-exams">My Exams</Nav.Link>
          <Nav.Link className="" href="/my-submissions">My Submissions</Nav.Link>
          <Nav.Link className="" href="/create-exam">Create an Exam</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown
            className="me-auto"
            align="end"
            title={`${authUser().firstName} ${authUser().lastName}`}>
            <NavDropdown.Item
              href="#"
              className="d-flex justify-content-between align-items-center"
              onClick={() => { }}>
              Settings
              <BsGear />
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="#"
              className="d-flex justify-content-between align-items-center"
              onClick={handleClickSignOut}>
              Sign out
              <MdLogout />
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}


export default SiteNavbar