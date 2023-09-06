import React from "react"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { Forms, PageContainers } from "../components"
import { api } from "../api"


const RegistrationPage = () => {
  const isAuth = AuthKit.useIsAuthenticated()
  const navigate = RouterDom.useNavigate()

  React.useEffect(
    () => { if (isAuth()) { navigate("/") } },
    [isAuth, navigate]
  )

  const handleSubmit = async (inputs) => {
    const { username, password, firstName, lastName, inviteCode } = inputs
    const apiResponse = await api.register(username, password, firstName, lastName, inviteCode)
    if (apiResponse) {
      setTimeout(
        () => navigate("/login"),
        2000
      )
      return true
    }
    else {
      return false
    }
  }

  return (
    <PageContainers.PreLogin>
      <Forms.Registration submitHandler={handleSubmit} />
    </PageContainers.PreLogin>
  )
}

export default RegistrationPage