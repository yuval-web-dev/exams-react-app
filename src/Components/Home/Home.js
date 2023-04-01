import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import { addExam, authUser, addUser } from '../../connectors/serverConnector'

const Home = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      {/* <div style={{ maxWidth: 400 }}>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
            <Form.Text className='text-muted'>
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>

          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </div> */}
      <Row className='d-flex flex-column'>
        <Col>
          <Button onClick={addExam}>Add Exam</Button>
        </Col>
        <Col>
          <Button onClick={addUser}>Add User</Button>
        </Col>
        <Col>
          <Button onClick={authUser}>Auth User</Button>
        </Col>
        <Col>
          <Form>
            <Form.Group>
              <Form.File id='input' label='add images' accept='.jpg,.jpeg,.png,.gif,.webp' />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
