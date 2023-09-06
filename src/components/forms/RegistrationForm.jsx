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

    <Card className="w-100 h-50">
      <Card.Header className="d-flex justify-content-center display-4">
        Register
      </Card.Header>
      <Card.Body>
        <Form onSubmit={submitHandler} className="d-flex flex-column h-100">
          <Form.Control
            name="username"
            value={inputs.username}
            required
            type="text"
            placeholder="Username"
            className="my-1"
            onChange={handleChangeInput} />
          <Form.Control
            name="password"
            required
            value={inputs.password}
            type="password"
            placeholder="Password"
            className="my-1"
            onChange={handleChangeInput} />
          <Form.Control
            name="firstName"
            value={inputs.firstName}
            required
            type="text"
            placeholder="First Name"
            className="my-1"
            onChange={handleChangeInput} />
          <Form.Control
            name="lastName"
            required
            value={inputs.lastName}
            type="text"
            placeholder="Last Name"
            className="my-1"
            onChange={handleChangeInput} />
          <Form.Control
            name="inviteCode"
            value={inputs.inviteCode}
            type="password"
            placeholder="Invite code"
            className="my-1"
            onChange={handleChangeInput} />

          <div className="mt-auto d-flex flex-column align-items-center">
            <div className="d-flex flex-row">
              <p className="me-2">
                Already have an account?
              </p>
              <p
                className="link-primary"
                onClick={handleClickLink}
                style={{ cursor: "pointer" }}>
                Login
              </p>
            </div>
            <Button className="w-100" variant="primary" type="submit">Register</Button>
          </div>
        </Form>
      </Card.Body>
    </Card >
  )
}

export default React.forwardRef(RegistrationForm)