import React from "react"
import axios from "axios"
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap"
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit"
import { useNavigate } from "react-router-dom"

import { SiteNav } from "../components"
import { api } from "../api"
import { storage } from "../storage"


const HomePage = () => {
  const [exams, setExams] = React.useState([])
  const [selectedExam, setSelectedExam] = React.useState(null)

  const authHeader = useAuthHeader()
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchAllExams = async () => {
      const authHeaderString = authHeader()
      const serverExams = await api.fetchExams(authHeaderString)
      const localExams = await storage.fetchExams()
      setExams([...serverExams, ...localExams])
    }
    fetchAllExams()
  }, [])


  const ExamList = () => {
    const handleSelectItem = (exam) => {
      setSelectedExam(curr => curr === exam ? null : exam);
    }

    return (
      <ListGroup>
        {exams?.map((exam, idx) => (
          <ListGroup.Item
            key={idx}
            action
            active={exam === selectedExam}
            onClick={() => handleSelectItem(exam)}>
            {exam.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }

  const handleStartTest = () => {
    // storage.create("wizard", [{ "selectedExam": selectedExam }], "name")
    navigate("/wizard")
  }


  return (
    <Container>
      {ExamList()}
      <Button
        variant="outline-primary"
        disabled={selectedExam === null}
        onClick={handleStartTest}>
        Start Test
      </Button>
    </Container>
  )
}



export default HomePage