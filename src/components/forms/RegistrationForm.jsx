import React from "react"
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap"
import * as RouterDom from "react-router-dom"


const RegistrationForm = ({ submitHandler }) => {
  const [inputs, setInputs] = React.useState(
    {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      inviteCode: ""
    }
  )
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [fail, setFail] = React.useState(false)

  const navigate = RouterDom.useNavigate()

  const handleChangeInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault()
    setLoading(true)
    const register = await submitHandler(inputs)
    if (register) {
      setFail(false)
      setSuccess(true)
    }
    else {
      setFail(true)
      setLoading(false)
    }
  }

  const handleClickLink = () => {
    navigate("/login")
  }

  return (

    <Card className="w-100 h-50">
      <Card.Header className="d-flex justify-content-center display-5">
        Exams App
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmitForm} className="d-flex flex-column h-100">
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

          <Alert
            dismissible
            onClose={() => setFail(false)}
            show={fail}
            variant="danger">
            Registration failed.
          </Alert>

          <Alert
            show={success}
            variant="success">
            Registration successful! Redirecting...
          </Alert>

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
            {
              loading ?
                <Button className="w-100" variant="secondary" disabled><Spinner size="sm" /></Button>
                :
                <Button className="w-100" variant="primary" type="submit">Register</Button>
            }

          </div>
        </Form>
      </Card.Body>
    </Card >
  )
}

export default RegistrationForm