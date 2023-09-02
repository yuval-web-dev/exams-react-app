import React from "react"
import { Card, Row, Col, Form, Button } from "react-bootstrap"
import * as RouterDom from "react-router-dom"

import { api } from "../../api"


const RegistrationForm = ({ }, ref) => {
  const [inputs, setInputs] = React.useState(
    {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      inviteCode: ""
    }
  )
  const navigate = RouterDom.useNavigate()

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append("username", inputs.username)
      formData.append("password", inputs.password)
      formData.append("display_name", { first: inputs.firstName, last: inputs.lastName })
      formData.append("invite_code", inputs.inviteCode)
      await api.register(formData)
      // redirect to /login
    }
    catch (err) {
      console.error("User registration failed:\n" + err)
    }
  }

  const UserPassSubform = ({ inputsState }) => {
    const [inputs, setInputs] = inputsState

    const handleChangeInput = (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    return (
      <div className="mb-3">
        <Form.Control
          name="username"
          value={inputs.username || ""}
          className="mb-2"
          required
          type="text"
          placeholder="Username"
          onChange={handleChangeInput} />
        <Form.Control
          name="password"
          required
          value={inputs.password || ""}
          type="password"
          placeholder="Password"
          onChange={handleChangeInput} />
      </div>
    )
  }

  const DisplayNameSubform = ({ inputsState }) => {
    const [inputs, setInputs] = inputsState

    const handleChangeInput = (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    return (
      <div className="d-flex mb-3">
        <Form.Control
          name="firstName"
          value={inputs.firstName || ""}
          className="mb-2"
          required
          type="text"
          placeholder="First Name"
          onChange={handleChangeInput} />
        <Form.Control
          name="lastName"
          required
          value={inputs.lastName || ""}
          type="text"
          placeholder="Last Name"
          onChange={handleChangeInput} />
      </div>
    )
  }

  const SecretKeySubform = ({ inputsState }) => {
    const [inputs, setInputs] = inputsState

    const handleChangeInput = (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    return (
      <React.Fragment>
        <Form.Label className="text-muted">Lecturer?</Form.Label>
        <Form.Control
          name="inviteCode"
          value={inputs.inviteCode || ""}
          type="password"
          placeholder="Invite code"
          onChange={handleChangeInput} />
      </React.Fragment>
    )
  }

  const BottomSection = ({ navigateHook }) => {
    const handleClickLoginLink = (event) => {
      event.preventDefault()
      navigateHook("/register")
    }

    return (
      <Row>
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-row">
            <p className="me-2">Already have an account?</p>
            <a href="" onClick={handleClickLoginLink}>Login</a>
          </div>
          <Button className="w-100" variant="outline-primary" type="submit">Register</Button>
        </Col>
      </Row>
    )
  }

  return (
    <Card>
      <Card.Header className="d-flex align-items-center justify-content-center">
        <h1 className="my-0">Welcome!</h1>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleRegisterFormSubmit}>
          <Row>
            <Col>
              <UserPassSubform inputsState={[inputs, setInputs]} />
              <DisplayNameSubform inputsState={[inputs, setInputs]} />
              <SecretKeySubform inputsState={[inputs, setInputs]} />
            </Col>
          </Row>
          <BottomSection navigateHook={navigate} />
        </Form>
      </Card.Body>
    </Card>
  )
}

export default React.forwardRef(RegistrationForm)