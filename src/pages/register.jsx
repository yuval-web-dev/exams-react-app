import React from "react"
import axios from "axios"
import { Nav, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { ENDPOINT } from "./consts"



const Register = () => {
  const navigate = useNavigate()

  const [type, setType] = React.useState("lecturer")
  const [inputs, setInputs] = React.useState({ username: "", password: "" })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append("type", type)
      formData.append("username", inputs.username)
      formData.append("password", inputs.password)
      const res = await axios.post(
        `${ENDPOINT}/login`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      navigate("/")
      console.info(res.data.message)
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        disabled
        type="text"
        value={type} />
      <Form.Control
        type="text"
        placeholder="Username"
        onChange={e => setInputs({ ...inputs, username: e.target.value })} />
      <Form.Control
        type="password"
        placeholder="Password"
        onChange={e => setInputs({ ...inputs, password: e.target.value })} />
      <Button type="submit">Register</Button>
      <Nav>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    </Form>
  )
}

export default Register