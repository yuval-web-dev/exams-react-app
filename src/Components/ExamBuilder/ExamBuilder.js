import React, { useState, useRef } from 'react';
import { Tabs, Tab, Container, Row, Col, Form, Button } from 'react-bootstrap'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import RangeSlider from 'react-bootstrap-range-slider';

import TimePicker from 'react-bootstrap-time-picker';


import BootstrapSwitchButton from 'bootstrap-switch-button-react'


import { Exam, Question, User } from '../../classes';

import QuestionForm from './QuestionForm.js'
import ExamForm from './ExamForm';

const ExamBuilder = () => {
  const [exam, setExam] = useState(new Exam())
  const [questions, setQuestions] = useState([])

  const [activeTab, setActiveTab] = useState('examform')

  const user = new User() // Author
  user.firstname = 'Jim'
  user.surname = 'Kurose'

  return (
    <Container variant='fluid'>
      <Tabs activeKey={activeTab} onSelect={tab => setActiveTab(tab)}>
        <Tab eventKey='examform' title='Exam Form'>
          <ExamForm user={user} exam={exam} />
        </Tab>
        <Tab eventKey='questionform' title='Question Form'>
          <QuestionForm questions={questions} setQuestions={setQuestions} setActiveTab={setActiveTab} />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default ExamBuilder
