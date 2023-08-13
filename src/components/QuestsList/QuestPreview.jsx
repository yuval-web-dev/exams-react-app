import React from "react"
import { Row, Col, ListGroup, Image, Button, Modal } from "react-bootstrap"

const QuestPreview = ({ quest, idx, show, setShow }) => {
  const AnswersListGroup = () => (
    <ListGroup>
      {quest?.answers?.map((answer, idx) => (
        <ListGroup.Item
          key={idx}
          variant={answer === quest?.correct ? "success" : "danger"}>
          <Row>
            <Col xs="1">
              {idx + 1}
            </Col>
            <Col>
              {answer}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )

  return (
    <Modal
      show={show}
      size="lg">
      <Modal.Header>
        <Modal.Title>{`Question ${idx + 1}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs="12">
            {quest?.type === "text" ? quest?.body : null}
            {quest?.type === "image" ? <Image src={URL.createObjectURL(quest?.body)} /> : null}
          </Col>
          <Col xs="12">
            {AnswersListGroup()}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default QuestPreview