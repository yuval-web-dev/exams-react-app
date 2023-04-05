import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import BootstrapSwitchButton from 'bootstrap-switch-button-react'


import { Exam, Question, User } from '../../classes';

import QuestionForm from './QuestionForm.js'

const ExamBuilder = () => {
  const [exam, setExam] = useState(new Exam())
  const [name, setName] = useState('')
  const [date, setDate] = useState(null)
  const [random, setRandom] = useState(false)

  const [questions, setQuestions] = useState([])
  const today = new Date()


  const user = new User()
  user.firstname = 'Jim'
  user.surname = 'Kurose'

  const handleAddQuestion = () => {
    // TODO handle the questions
    setQuestions([...questions, new Question()])
  }

  const handleNameChange = (e) => {
    // TODO string check
    setName(e.target.value)
  }

  const handleDateChange = (selectedDate) => {
    // TODO date checks
    setDate(selectedDate)
  }

  const handleRandomToggle = () => {
    // TODO make this work
    setRandom((prevRandom) => !prevRandom)
  }

  const handleQuestionsClear = (e) => {
    if (window.confirm('Are you sure you want to clear all questions?')) {
      setQuestions([]);
    }
  }

  return (
    <Container variant='fluid'>
      <h1>Exam Builder</h1>
      <h2>Exam Form</h2>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>Author</td>
            <td>
              <Form.Control readOnly className='text-muted' value={`${user.surname}, ${user.firstname}`} readOnly type='text' />
            </td>
          </tr>
          <tr>
            <td>EID</td>
            <td>
              <Form.Control readOnly className='text-muted' value={exam.eid} type='text' style={{ fontFamily: 'consolas' }} />
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td><Form.Control value={name} type='text' onChange={handleNameChange} spellCheck='true' /></td>
            <td>
              <Button variant='outline-warning' onClick={() => { setName('') }}>Clear</Button>
            </td>
          </tr>
          <tr>
            <td>
              Date
            </td>
            <td>
              <div className='form-group'>
                <DatePicker className='form-control' selected={date} minDate={today} dateFormat='dd/MM/yyyy' onChange={handleDateChange} />
              </div>
            </td>
            <td>
              <Button variant='outline-warning' onClick={() => { setDate(null) }}>Clear</Button>
            </td>
          </tr>
          <tr>
            <td>Questions</td>
            <td>{questions.length}</td>
            <td>
              <Button variant='outline-danger' onClick={handleQuestionsClear}>Clear</Button>
            </td>
          </tr>
          <tr>
            <td>Randomize</td>
            <td></td>
            <td>
              <BootstrapSwitchButton onlabel='Random' offlabel='Ordered' checked={false} onChange={handleRandomToggle} />
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      <div style={{ height: '100px' }}></div>
      <QuestionForm />
    </Container>
  )
}

export default ExamBuilder
