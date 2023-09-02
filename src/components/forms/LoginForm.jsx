import React from "react"
import { Row, Col, Card, Form, Button } from "react-bootstrap"
import * as RouterDom from "react-router-dom"


const LoginForm = ({ }, ref) => {
  const navigate = RouterDom.useNavigate()

  const [inputs, setInputs] = React.useState(
    {
      username: "",
      password: ""
    }
  )

  const UserPassSubform = ({ inputsState }) => {
    const [inputs, setInputs] = inputsState
    return (
      <Row>
        <Col xs="12">
          <Form.Control
            value={inputs.username || ""}
            className="mb-2"
            required
            type="text"
            placeholder="Username"
            onChange={event => setInputs({ ...inputs, username: event.target.value })} />
        </Col>
        <Col xs="12">
          <Form.Control
            required
            value={inputs.password || ""}
            type="password"
            placeholder="Password"
            onChange={event => setInputs({ ...inputs, password: event.target.value })} />
        </Col>
      </Row>
    )
  }

  const BottomSection = () => {
    const handleClickRegisterLink = (event) => {
      event.preventDefault()
      // redirect to /register
    }

    return (
      <Row>
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-row">
            <p className="me-2">Don't have an account?</p>
            <a href="" onClick={handleClickRegisterLink}>Register</a>
          </div>
          <Button className="w-100" variant="primary" type="submit">Login</Button>
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
        <Form onSubmit={() => { }}>
          <Row>
            <Col>
              <UserPassSubform inputsState={[inputs, setInputs]} />
            </Col>
          </Row>
          <BottomSection navigateHook={navigate} />
        </Form>
      </Card.Body>
    </Card>
  )
}

export default React.forwardRef(LoginForm)