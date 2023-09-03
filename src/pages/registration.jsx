import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { Forms, PageContainers } from "../components"
import { api } from "../api"


const RegistrationPage = () => {
  const formRef = React.useRef()
  const isAuth = AuthKit.useIsAuthenticated()
  const navigate = RouterDom.useNavigate()

  React.useEffect(
    () => { if (isAuth()) { navigate("/") } },
    [isAuth, navigate]
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { username, password, firstName, lastName, inviteCode } = formRef.current.getInputs()
    const result = await api.register(username, password, firstName, lastName, inviteCode)
    // TODO add a Bootstrap Alert or Toast
  }

  return (
    <PageContainers.PreLogin>
      <Forms.Registration ref={formRef} submitHandler={handleSubmit} />
    </PageContainers.PreLogin>
  )
}

export default RegistrationPage