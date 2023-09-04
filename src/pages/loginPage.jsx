import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { PageContainers } from "../components"
import { Forms } from "../components"
import { api } from "../api"


const LoginPage = () => {
  const formRef = React.useRef()
  const signIn = AuthKit.useSignIn()
  const isAuth = AuthKit.useIsAuthenticated()
  const navigate = RouterDom.useNavigate()


  React.useEffect(
    () => { if (isAuth()) { navigate("/") } },
    [isAuth, navigate]
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { username, password } = formRef.current.getInputs()

    // get the sign-in config: 
    const signInConfig = await api.login(username, password)
    if (signInConfig) {
      signIn(signInConfig)
    }
    else {
      // TODO add a Bootstrap Alert or Toast
      alert("error login")
    }
  }

  return (
    <PageContainers.PreLogin>
      <Forms.Login submitHandler={handleSubmit} ref={formRef} />
    </PageContainers.PreLogin>
  )
}

export default LoginPage