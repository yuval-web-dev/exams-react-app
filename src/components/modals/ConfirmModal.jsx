import React from "react"
import { Modal, Button, ModalBody, ModalFooter } from "react-bootstrap"


const ConfirmModal = ({ show, header, body, cancelHandler, okHandler }) => {
  return (
    <Modal show={show}>
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
          <Button variant="danger" className="ms-1" onClick={okHandler}>Delete</Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmModal