import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, InputGroup, FormControl, Image } from 'react-bootstrap'

import { addExam, authUser, addUser } from '../../connectors/serverConnector'

const Home = () => {

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <Row className='d-flex flex-column'>
        <Col>
          <Button onClick={() => addExam()}>Add Exam</Button>
        </Col>
        <Col>
          <Button onClick={() => addUser()}>Add User</Button>
        </Col>
        <Col>
          <Button onClick={() => authUser()}>Auth User</Button>
        </Col>
        <Col>
          <input type='file' accept='image/*' onChange={(e) => addExam(e?.target?.files[0])}></input>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
