import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { examPost } from '../../serverApis'

const ApiTester = () => {
  const [file, setFile] = useState(null)

  const handleUpload = (e) => {

    const file = e.target.files[0]
    // setFile(file)
    // return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      console.log(reader.result)
      setFile(reader.result)
    }
  }

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <Row className='d-flex flex-column'>
        <Col>
          <Button onClick={() => {
            if (file !== null) {
              addExam(file)
            }
          }}>
            Add Exam
          </Button>
        </Col>
        <Col>
          <input type='file' accept='image/*' onChange={(e) => handleUpload(e)}></input>
        </Col>
      </Row>
    </Container >
  )
}

export default ApiTester
