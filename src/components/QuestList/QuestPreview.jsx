import React from "react"
import { Row, Col, ListGroup, Image, Button, Modal } from "react-bootstrap"
import Code from "../Code"

const QuestPreview = ({ quest, idx, show, setShow }) => {

  return (
    <Modal
      show={show}
      size="lg">
      <Modal.Header>
        <Modal.Title>{`Question ${idx + 1}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col xs="12">
                {quest?.type === "text" ? quest?.body : null}
                {quest?.type === "image" ? <Image src={URL.createObjectURL(quest?.body)} /> : null}
              </Col>
              <Col>
                {(quest?.code === undefined || quest?.code === null) ? null : <Code.Snippet lang={quest?.code?.lang} val={quest?.code?.val} />}
              </Col>
            </Row>
          </ListGroup.Item>
          {quest?.answers?.map((answer, idx) => (
            <ListGroup.Item
              key={idx}
              variant={answer === quest?.correct ? "success" : "danger"}>
              {`${idx + 1}.\t${answer}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
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