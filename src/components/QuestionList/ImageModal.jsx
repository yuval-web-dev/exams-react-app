import React from 'react'
import { Modal, Image, Row, Col } from 'react-bootstrap'

const ImageModal = ({ image, show, onHide }) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <Modal.Header>
      <Modal.Title>
        {image.name}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row >
        <Col className="d-flex justify-content-center">
          <Image src={URL.createObjectURL(image)} />
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
)

export default ImageModal