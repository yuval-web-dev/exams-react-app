import React from "react"
import axios from "axios"
import { useSignIn, useAuthUser } from "react-auth-kit"
import { Nav, Form, Button } from "react-bootstrap"
import { useNavigate, useRedirect } from "react-router-dom"
import { useIsAuthenticated } from "react-auth-kit"
import { useEffect } from "react"


const Login = () => {
  const signIn = useSignIn()
  const navigate = useNavigate()
  const isAuth = useIsAuthenticated()

  useEffect(() => {
    if (isAuth()) {
      navigate("/dashboard")
    }
  }, [isAuth, navigate])


  const [formData, setFormData] = React.useState({ username: "", password: "" })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post("http://localhost:8080/api/login", formData)
      const { message, jwt } = res.data
      console.info(message)
      signIn(jwt)
      navigate("/")
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Username"
        onChange={e => setFormData({ ...formData, username: e.target.value })} />
      <Form.Control
        type="password"
        placeholder="Password"
        onChange={e => setFormData({ ...formData, password: e.target.value })} />
      <Button type="submit">Login</Button>
      <Nav>
        <Nav.Link href="/register">Sign up</Nav.Link>
      </Nav>
      <Button onClick={() => alert(isAuth())}>Auth</Button>
    </Form>
  )
}

export default Login