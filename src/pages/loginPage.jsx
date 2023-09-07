import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { PageContainers, Forms } from "../components"
import { default as api } from "../api"


const LoginPage = () => {
  const signIn = AuthKit.useSignIn()
  const isAuth = AuthKit.useIsAuthenticated()
  const navigate = RouterDom.useNavigate()

  React.useEffect(
    () => { if (isAuth()) { navigate("/") } },
    [isAuth, navigate]
  )

  const handleSubmit = async (inputs) => {
    const { username, password } = inputs
    const signInConfig = await api.login(username, password)
    if (signInConfig) {
      setTimeout(
        () => signIn(signInConfig),
        2000
      )
      return true
    }
    return false
  }

  return (
    <PageContainers.PreLogin>
      <Forms.Login submitHandler={handleSubmit} />
    </PageContainers.PreLogin>
  )
}

export default LoginPage