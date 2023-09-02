import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { Forms } from "../components"
import * as api from "../api"


const LoginPage = () => {
  const ref = React.useRef()
  const signIn = AuthKit.useSignIn()
  const isAuth = AuthKit.useIsAuthenticated()
  const navigate = RouterDom.useNavigate()

  React.useEffect(() => {
    if (isAuth()) {
      navigate("/")
    }
  }, [isAuth, navigate])

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault()
    // try {
    //   const formData = new FormData()
    //   formData.append("username", inputs.username)
    //   formData.append("password", inputs.password)
    //   const jwt = await api.login(formData)
    //   signIn(jwt)
    //   navigate("/")
    // }
    // catch (err) {
    //   console.error("User login failed:\n" + err)
    // }
  }

  return (
    <Forms.Login ref={ref} />
  )
}

export default LoginPage