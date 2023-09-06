import React from "react"
import { Row, Col, Card, Form, Button } from "react-bootstrap"
import * as RouterDom from "react-router-dom"


const LoginForm = ({ submitHandler }, ref) => {
  const navigate = RouterDom.useNavigate()

  const [inputs, setInputs] = React.useState(
    {
      username: "",
      password: ""
    }
  )

  React.useImperativeHandle(ref, () => ({ getInputs: () => inputs }), [inputs])

  const handleChangeInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const handleClickLink = (event) => {
    navigate("/register")
  }

  return (
    <Card className="w-100 h-50">
      <Card.Header className="d-flex justify-content-center display-4">
        Login
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
            value={inputs.password}
            type="password"
            placeholder="Password"
            required
            className="my-1"
            onChange={handleChangeInput} />
          <div className="mt-auto d-flex flex-column align-items-center">
            <div className="d-flex flex-row">
              <p className="me-2">
                Don't have an account?
              </p>
              <p className="link-primary" onClick={handleClickLink} style={{ cursor: "pointer" }}>
                Register
              </p>
            </div>
            <Button className="w-100" variant="primary" type="submit">Login</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default React.forwardRef(LoginForm)