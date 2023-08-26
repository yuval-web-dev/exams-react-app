import React from "react"
import axios from "axios"
import { useSignIn } from "react-auth-kit"
import { Card, Container, Row, Col, Nav, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useIsAuthenticated } from "react-auth-kit"
import { ENDPOINT } from "./consts"



const Login = () => {
  const signIn = useSignIn()
  const navigate = useNavigate()
  const isAuth = useIsAuthenticated()

  React.useEffect(() => {
    if (isAuth()) {
      navigate("/dashboard")
    }
  }, [isAuth, navigate])

  const [mode, setMode] = React.useState("login")
  const [inputs, setInputs] = React.useState({ username: "", password: "", inviteCode: "" })


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append("username", inputs.username)
      formData.append("password", inputs.password)


      if (mode === "login") {
        const res = await axios.post(
          `${ENDPOINT}/login`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        const { message, jwt } = res.data
        console.info(message)
        signIn(jwt)
      }

      else { // mode === "register"
        if (inputs.inviteCode !== "") {
          formData.append("code", inputs.inviteCode)
        }
        const res = await axios.post(
          `${ENDPOINT}/register`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        console.info(res.data.message)
        setMode("login")
      }

      navigate("/")
    }
    catch (error) {
      console.error(error)
    }
  }


  const handleClickLink = (event) => { // switches between register / login
    event.preventDefault()
    if (mode === "login") {
      setMode("register")
    }
    else {
      setMode("login")
    }
    setInputs({})
  }


  const UserPassSubform = () => (
    <div className="mb-3">
      <Form.Control
        value={inputs.username || ""}
        className="mb-2"
        required
        type="text"
        placeholder="Username"
        onChange={event => setInputs({ ...inputs, username: event.target.value })} />
      <Form.Control
        required
        value={inputs.password || ""}
        type="password"
        placeholder="Password"
        onChange={event => setInputs({ ...inputs, password: event.target.value })} />
    </div>
  )


  const SecretKeySubform = () => (
    <React.Fragment>
      <Form.Label className="text-muted">Lecturer?</Form.Label>
      <Form.Control
        value={inputs.inviteCode || ""}
        type="password"
        placeholder="Enter invite code"
        onChange={e => setInputs({ ...inputs, inviteCode: e.target.value })} />
    </React.Fragment>
  )


  const RegisterSubform = () => (
    <Row>
      <Col className="d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-row">
          <p className="me-2">Already have an account?</p>
          <a href="" onClick={handleClickLink}>Login</a>
        </div>
        <Button className="w-100" variant="outline-primary" type="submit">Register</Button>
      </Col>
    </Row>
  )


  const LoginSubform = () => (
    <Row>
      <Col className="d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-row">
          <p className="me-2">Don't have an account?</p>
          <a href="" onClick={handleClickLink}>Register</a>
        </div>
        <Button className="w-100" variant="primary" type="submit">Login</Button>
      </Col>
    </Row>
  )


  return (
    <Container>
      <Row>
        <Col
          style={{ height: "100vh" }}
          className="d-flex align-items-center justify-content-center">
          <Card style={{ width: "50%" }} >
            <Card.Header className="d-flex align-items-center justify-content-center">
              <h1 className="my-0">Welcome!</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row style={{ height: "200px" }}>
                  <Col>
                    {UserPassSubform()}
                    {mode === "register" ? SecretKeySubform() : null}
                  </Col>
                </Row>
                {mode === "register" ? RegisterSubform() : LoginSubform()}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login