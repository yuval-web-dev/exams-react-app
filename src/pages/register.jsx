import React from "react"
import axios from "axios"
import { Nav, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"



const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({ username: "", password: "" })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post("http://localhost:8080/api/register", formData)
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
        type="username"
        placeholder="Username"
        onChange={e => setFormData({ ...formData, username: e.target.value })} />
      <Form.Control
        type="password"
        placeholder="Password"
        onChange={e => setFormData({ ...formData, password: e.target.value })} />
      <Button type="submit">Register</Button>
      <Nav>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    </Form>
  )
}

export default Register