import React from "react"
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom"
import { AuthProvider, RequireAuth } from 'react-auth-kit'
import { Container, Row, Col } from "react-bootstrap"

import { Pages } from "../pages"
import { Navs } from "../components"


const PreLoginContainer = ({ children }) => {

  return (
    <Container>
      <Row>
        <Col style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center">
          {children}
        </Col>
      </Row>
    </Container>
  )
}


const PostLoginContainer = ({ children }) => {

  return (
    <RequireAuth loginPath="/login">
      <Navs.Navbar />
      {children}
      <Navs.Footer />
    </RequireAuth>
  )
};


const AppRoutes = () => {

  return (
    <AuthProvider authName="_auth" authType="cookie" cookieSecure={false}>
      <Routes>
        <Route path="/" element=
          {
            <RequireAuth loginPath="/login">
              <Routes>
                <Route path="/" element={<Pages.Home />} />
              </Routes>
            </RequireAuth>
          } />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/register" element={<Pages.Register />} />
      </Routes>
    </AuthProvider>
  )
}


export default AppRoutes
