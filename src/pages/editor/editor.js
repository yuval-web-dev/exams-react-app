import React from 'react'
import { Container } from 'react-bootstrap'

import ExamForm from '../../components/ExamForm/ExamForm.js'
import AppNav from '../../components/AppNav/AppNav.js'


const editor = () => {

  return (
    <>
      <AppNav />
      <Container >
        <ExamForm />
      </Container>
    </>
  )
}

export default editor