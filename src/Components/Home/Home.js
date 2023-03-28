import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Home = () => {

  return (
    <Container>
      <Row>
        Question
      </Row>
      <Row className=''>
        Answer 1
      </Row>
      <Row className=''>
        Answer 2
      </Row>
      <Row className=''>
        Answer 3
      </Row>
      <Row className=''>
        Answer 4
      </Row>
    </Container>
  )
}

export default Home