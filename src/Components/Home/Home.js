import e from 'cors'
import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { addExam } from '../../connectors/serverConnector'

const Home = () => {

  return (
    <Container>
      <Button onClick={addExam}>
        Add Exam
      </Button>
    </Container>
  )
}

export default Home