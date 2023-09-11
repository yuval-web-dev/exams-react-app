import React from "react"
import { Modal, Button, ModalBody, ModalFooter } from "react-bootstrap"


const ConfirmModal = ({ centered, show, header, body, cancelHandler, confirmHandler, confirmVariant }) => {
  return (
    <Modal centered={centered} show={show}>
      <Modal.Header>
        <span className="fs-3">
          {header}
        </span>
      </Modal.Header>
      <ModalBody>
        {body}
      </ModalBody>
      <ModalFooter>
        <div className="d-flex flex-row justify-content-end align-items-center">
          <Button variant="outline-secondary" onClick={cancelHandler}>Cancel</Button>
          <Button variant={confirmVariant} className="ms-1" onClick={confirmHandler}>Confirm</Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmModal