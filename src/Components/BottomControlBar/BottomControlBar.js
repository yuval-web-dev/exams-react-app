import React from 'react'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap'

const BottomControlBar = ({ onDiscard, onSave }) => (
  <Row className="mt-3 border-top">
    <Col md={12} className="d-flex justify-content-end">
      <ButtonGroup>
        <Button
          variant="outline-warning"
          onClick={onDiscard}>
          Discard
        </Button>
        <Button
          variant="primary"
          onClick={onSave}>
          Save
        </Button>
      </ButtonGroup>
    </Col>
  </Row>
)

export default BottomControlBar