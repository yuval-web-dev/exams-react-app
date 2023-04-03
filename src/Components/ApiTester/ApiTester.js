import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { examPost } from '../../serverApis'

const ApiTester = () => {
  const [file, setFile] = useState(null)

  const InputOnChangeHandler = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => { setFile(reader.result) }
  }

  const ButtonOnClickHandler = (e) => {
    if (file !== null) { examPost(file) }
  }

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <Row className='d-flex flex-column'>
        <Col>
          <input type='file' accept='image/*' onChange={InputOnChangeHandler}></input>
        </Col>
        <Col>
          <Button onClick={ButtonOnClickHandler}>Submit Exam</Button>
        </Col>
      </Row>
    </Container >
  )
}

export default ApiTester
