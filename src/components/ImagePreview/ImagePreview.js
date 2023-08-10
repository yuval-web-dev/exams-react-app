import React from 'react'

import { Modal, Image, Button } from 'react-bootstrap'

const ImagePreview = ({ image, show, onClose }) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>{image?.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Image
        style={{ width: '100%' }}
        src={image === null ? null : URL.createObjectURL(image)}
      ></Image>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => onClose()}>Close</Button>
    </Modal.Footer>
  </Modal>
)

export default ImagePreview