import React from "react"
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap"
import * as RouterDom from "react-router-dom"


const LoginForm = ({ submitHandler }, ref) => {
  const [inputs, setInputs] = React.useState({
    username: "",
    password: ""
  })
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [fail, setFail] = React.useState(false)

  const navigate = RouterDom.useNavigate()

  React.useImperativeHandle(ref, () => ({ getInputs: () => inputs }), [inputs])

  const handleChangeInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const handleClickLink = (event) => {
    navigate("/register")
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault()
    setLoading(true)
    const loginResult = await submitHandler(inputs)
    if (loginResult) {
      setFail(false)
      setSuccess(true)
    }
    else {
      setFail(true)
      setLoading(false)
    }
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
            value={inputs.password}
            type="password"
            placeholder="Password"
            required
            className="my-1"
            onChange={handleChangeInput} />

          <Alert
            dismissible
            onClose={() => setFail(false)}
            show={fail}
            variant="danger">
            Login failed.
          </Alert>

          <Alert
            show={success}
            variant="success">
            Login successful! Redirecting...
          </Alert>

          <div className="mt-auto d-flex flex-column align-items-center">
            <div className="d-flex flex-row">
              <p className="me-2">
                Don't have an account?
              </p>
              <p className="link-primary" onClick={handleClickLink} style={{ cursor: "pointer" }}>
                Register
              </p>
            </div>
            {
              loading ?
                <Button className="w-100" variant="secondary" disabled><Spinner size="sm" /></Button>
                :
                <Button className="w-100" variant="primary" type="submit">Login</Button>
            }
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default React.forwardRef(LoginForm)