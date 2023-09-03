import React from "react"
import { Card, Row, Col, Form, Button } from "react-bootstrap"
import * as RouterDom from "react-router-dom"


const RegistrationForm = ({ submitHandler }, ref) => {
  const [inputs, setInputs] = React.useState(
    {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      inviteCode: ""
    }
  )

  React.useImperativeHandle(ref, () => ({ getInputs: () => inputs }), [inputs])

  const navigate = RouterDom.useNavigate()

  const handleChangeInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const handleClickLink = () => {
    navigate("/login")
  }

  return (
    <Form onSubmit={submitHandler}>
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-center">
          <h1>Register</h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Form.Control
                name="username"
                value={inputs.username}
                required
                type="text"
                placeholder="Username"
                onChange={handleChangeInput} />
              <Form.Control
                name="password"
                required
                value={inputs.password}
                type="password"
                placeholder="Password"
                onChange={handleChangeInput} />
              <Form.Control
                name="firstName"
                value={inputs.firstName}
                required
                type="text"
                placeholder="First Name"
                onChange={handleChangeInput} />
              <Form.Control
                name="lastName"
                required
                value={inputs.lastName}
                type="text"
                placeholder="Last Name"
                onChange={handleChangeInput} />
              <Form.Control
                name="inviteCode"
                value={inputs.inviteCode}
                type="password"
                placeholder="Invite code"
                onChange={handleChangeInput} />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex flex-row">
                <p className="me-2">
                  Already have an account?
                </p>
                <p className="link-primary" onClick={handleClickLink} style={{ cursor: "pointer" }}>
                  Login
                </p>
              </div>
              <Button className="w-100" variant="primary" type="submit">Register</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  )
}

export default React.forwardRef(RegistrationForm)