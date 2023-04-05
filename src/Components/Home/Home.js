import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'


const Home = () => {
  return (
    <Container variant='fluid'>
      <h1>Home Page</h1>
      <Link to='/'>
        <Button>Home</Button>
      </Link>
      <Link to='/apitester'>
        <Button>API Tester</Button>
      </Link>
      <Link to='/exambuilder'>
        <Button>Exam Builder</Button>
      </Link>
    </Container>
  )
}

export default Home