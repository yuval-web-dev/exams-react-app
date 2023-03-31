import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import { addExam } from '../../connectors/serverConnector'

const Home = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div style={{ maxWidth: 400 }}>
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
      </div>
    </Container>
  )
}

export default Home
