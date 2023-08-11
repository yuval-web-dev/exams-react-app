import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap'

import { SiteNavbar } from '../components'

import * as storage from '../utils/storage'

const Home = () => {
  const defaultStates = {
    exams: [],
    checked: []
  }
  const [exams, setExams] = useState(defaultStates.exams) // Exam[]
  const [checked, setChecked] = useState(defaultStates.checked) // Exam

  useEffect(() => {
    const fetchLocalExams = async () => {
      const exams = await storage.fetch()
      setExams(exams)
    }
    fetchLocalExams()
  }, []); // The empty array ensures this effect runs only once, similar to componentDidMount

  const handleCheckbox = (exam) => {
    if (checked.includes(exam)) {
      setChecked(checked.filter(i => i !== exam))
    }
    else {
      setChecked([...checked, exam])
    }
  }

  const handleRemove = () => {
    const removeLocalExams = async () => {
      await storage.remove(checked.map(exam => exam.id))
    }
    setExams(exams.filter(exam => !checked.includes(exam)))
    removeLocalExams()
    setChecked(defaultStates.checked)
  }

  const ActionBar = () => (
    <Row>
      <Col className="d-flex justify-content-end">
        <Button
          style={{ cursor: "pointer" }}
          variant="outline-danger"
          disabled={checked.length < 1}
          onClick={() => handleRemove()}>
          Remove
        </Button>
      </Col>
    </Row>
  )

  const ExamList = () => (
    <ListGroup>
      {exams.map((exam, idx) => (
        <ListGroup.Item
          key={idx}
          action
          variant="light"
          style={{ cursor: "default" }}>

          <Row>
            <Col xs="1">
              <Form.Check
                type="checkbox"
                checked={checked.includes(exam)}
                onClick={() => handleCheckbox(exam)} />
            </Col>
            <Col xs="3">
              {exam.metadata.subject}
            </Col>
            <Col xs="2">
              by {exam.metadata.author.surname}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )

  return (
    <React.Fragment>
      <SiteNavbar.Top />
      <Container>
        <Row>
          <Col xs="12">
            <h1>My Exams</h1>
          </Col>
        </Row>
        {ActionBar()}
        {ExamList()}
      </Container>

      <SiteNavbar.Bottom />
    </React.Fragment>
  )
}

export default Home