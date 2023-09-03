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
    <Form onSubmit={submitHandler}>
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-center">
          <h1 className="my-0">Login</h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Form.Control
                name="username"
                value={inputs.username}
                className="mb-2"
                required
                type="text"
                placeholder="Username"
                onChange={handleChangeInput} />
              <Form.Control
                name="password"
                value={inputs.password}
                type="password"
                placeholder="Password"
                required
                onChange={handleChangeInput} />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex flex-row">
                <p className="me-2">
                  Don't have an account?
                </p>
                <p className="link-primary" onClick={handleClickLink} style={{ cursor: "pointer" }}>
                  Register
                </p>
              </div>
              <Button className="w-100" variant="primary" type="submit">Login</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  )
}

export default React.forwardRef(LoginForm)