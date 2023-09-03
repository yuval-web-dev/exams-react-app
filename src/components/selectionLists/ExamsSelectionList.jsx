import React from "react"
import { ListGroup } from "react-bootstrap"


const ExamsSelectionList = ({ exams, selectedExam, setSelectedExam }) => {

  const handleSelectExam = (exam) => {
    setSelectedExam(curr => curr === exam ? null : exam);
  }

  return (
    <ListGroup>
      {exams.map((exam, idx) => (
        <ListGroup.Item
          key={idx}
          action
          active={exam === selectedExam}
          onClick={() => handleSelectExam(exam)}>
          {exam.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}


export default ExamsSelectionList