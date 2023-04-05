import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


import { Exam, Question } from '../../serverApis/classes';

import QuestionForm from './QuestionForm.js'

const ExamBuilder = () => {
  const [exam, setExam] = useState(new examObject())
  const [questions, setQuestions] = useState([])

  const handleAddQuestion = () => {
    setQuestions([...questions, new questionObject()])
  }

  const handleExamNameChange = (e) => {
    exam.name = e.target.value
  }

  return (
    <Container variant='fluid'>
      <h1>Exam Builder</h1>
      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td>
              <Form.Control type='text' value={exam.eid} readOnly />
            </td>
          </tr>
          <tr>
            <td>Exam Name</td>
            <td><Form.Control type='text' placeholder='Exam Name' onChange={handleExamNameChange} spellCheck='true' /></td>
          </tr>
          <tr>
            <td>Total Questions</td>
            <td>{questions.length}</td>
          </tr>
          <tr>
            <td>Randomize</td>
            <td>
              <Form.Check></Form.Check>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ height: '200px' }}></div>
      <QuestionForm />
    </Container>
  )
}

export default ExamBuilder
