import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { Forms } from "../components"
import * as api from "../api"


const RegistrationPage = () => {
  const ref = React.useRef()
  const signIn = AuthKit.useSignIn()
  const isAuth = AuthKit.useIsAuthenticated()
  const navigate = RouterDom.useNavigate()

  React.useEffect(() => {
    if (isAuth()) {
      navigate("/")
    }
  }, [isAuth, navigate])

  return (
    <Forms.Registration ref={ref} />
  )
}

export default RegistrationPage