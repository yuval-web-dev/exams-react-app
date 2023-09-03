import React from "react"
import { ListGroup } from "react-bootstrap"


const ExamsSelectionList = ({ exams, selectedExam, handler }) => {

  return (
    <ListGroup>
      {exams.map((exam, idx) => (
        <ListGroup.Item
          key={idx}
          action
          active={exam === selectedExam}
          onClick={() => handler(exam)}>
          {exam.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}


export default ExamsSelectionList