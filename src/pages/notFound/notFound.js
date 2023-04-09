import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'

import { AppNav } from '../../components'
import error404 from '../../assets/svg/404-robot.svg'


const notFound = () => {


  return (
    <>
      <AppNav />
      <Container fluid>
        <Row>
          <Col fluid className='text-center'>
            <Link to='/'>
              <Image src={error404} height='500px' />
            </Link>
          </Col>
        </Row>
      </Container>
    </>

  )
}

export default notFound