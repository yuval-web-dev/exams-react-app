import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap'

import { SiteNav } from '../components'

import * as storage from '../utils/storage'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

import axios from "axios"



const Dashboard = () => {
  const [exams, setExams] = useState([])
  const [checked, setChecked] = useState([])

  const authHeader = useAuthHeader()

  const fetchLocalExams = async () => {
    try {
      const localExams = await storage.fetch()
      setExams(...exams, localExams)
    }
    catch (err) {
      console.error(err)
    }
  }

  const fetchDbExams = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/data/exams/fetch-all",
        { headers: { "Authorization": authHeader() } }
      )
      await storage.save_many(res.data.exams, "name")
    }
    catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchDbExams()
    fetchLocalExams()
  }, [])


  const handleCheckbox = (exam) => {
    if (checked.includes(exam)) {
      setChecked(checked.filter(i => i !== exam))
    }
    else {
      setChecked([...checked, exam])
    }
  }


  const handleRemove = () => {
    // const removeLocalExams = async () => {
    //   await storage.remove(checked.map(exam => exam.id))
    // }
    // setExams(exams.filter(exam => !checked.includes(exam)))
    // removeLocalExams()
    // setChecked([])
  }


  const ActionBar = () => (
    <Row>
      <Col className="d-flex justify-content-end">
        <Button
          className="me-auto"
          variant="light">
          from JSON
        </Button>
        <Button
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
        <ListGroup.Item key={idx} action style={{ cursor: "default" }}>
          {exam.eid}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )


  return (
    <Container>
      {/* {ExamList()} */}
      <Button variant="warning" onClick={() => console.log(exams)}>Test</Button>
    </Container>
  )
}



export default Dashboard