import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { ClosedExamForm, MetadataForm, AppNav } from '../../components'

const editor = () => {

  return (
    <>
      <AppNav />
      <Container >
        <Row>
          <Col md={4}><MetadataForm /></Col>
          <Col md={8}><ClosedExamForm /></Col>
        </Row>

      </Container>
    </>
  )
}

export default editor