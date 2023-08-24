import React, { useState } from "react"
import axios from "axios"
import {
  Form,
  Button,
  ButtonGroup
} from "react-bootstrap"

import { useAuthUser } from 'react-auth-kit'


const Test = () => {
  const auth = useAuthUser()
  console.log(auth())
  return (
    <h1>Hello {auth().email}</h1>
  )
}

export default Test

