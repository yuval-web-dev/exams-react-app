import React, { useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

import { examPost } from "../../serverApis"

const ApiTester = () => {
  const [uploads, setUploads] = useState([])

  const ButtonOnClickHandler = () => {
    if (uploads !== []) { examPost(uploads) }
  }

  return (
    <Container>
      <Row>
        <Col>
          <input
            multiple={true}
            type="file"
            accept="image/*"
            onChange={e => setUploads(e.target.files)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={ButtonOnClickHandler}>
            Submit Uploads
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ApiTester
