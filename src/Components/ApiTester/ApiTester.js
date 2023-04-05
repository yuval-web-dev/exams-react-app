import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { examPost } from '../../serverApis'

const ApiTester = () => {
  const [uploads, setUploads] = useState([])

  const InputOnChangeHandler = (e) => {
    setUploads(e.target.files)
  }

  const ButtonOnClickHandler = (e) => {
    if (uploads !== []) { examPost(uploads) }
  }

  return (
    <Container variant='fluid'>
      <h1>API Tester</h1>
      <Row className='d-flex flex-column'>
        <Col>
          <input multiple type='file' accept='image/*' onChange={InputOnChangeHandler}></input>
        </Col>
        <Col>
          <Button onClick={ButtonOnClickHandler}>Submit Uploads</Button>
        </Col>
      </Row>
    </Container >
  )
}

export default ApiTester
