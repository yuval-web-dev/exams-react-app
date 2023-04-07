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
import ExamOverview from './ExamOverview.js';

const ExamBuilder = () => {
  const [exam, setExam] = useState(new Exam())
  const [questionObj, setQuestionObj] = useState(new Question())
  const [questions, setQuestions] = useState([])

  const [activeTab, setActiveTab] = useState('overview')

  const user = new User() // Author
  user.firstname = 'Jim'
  user.surname = 'Kurose'

  const handleQuestionsClear = (e) => {
    if (window.confirm('Are you sure you want to clear all questions?')) {
      setQuestions([]);
    }
  }

  const handleQuestionFormSave = () => {
    setQuestionObj(new Question())
  }

  const changeActiveTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <Container variant='fluid'>
      <Tabs activeKey={activeTab} onSelect={tab => setActiveTab(tab)}>
        <Tab eventKey='overview' title='Overview' >
          <ExamOverview user={user} exam={exam} questions={questions}></ExamOverview>
        </Tab>
        <Tab eventKey='examform' title='Exam'>
          <ExamForm
            user={user}
            exam={exam}
            questions={questions}
            setQuestions={setQuestions}
            setActiveTab={setActiveTab}
            questionObj={questionObj}
            setQuestionObj={setQuestionObj}
            changeActiveTab={changeActiveTab}
          />
        </Tab>
        <Tab eventKey='questionform' title='Question'>
          <QuestionForm
            questionObj={questionObj}
            setQuestionObj={setQuestionObj}
            questions={questions}
            setQuestions={setQuestions}
            setActiveTab={setActiveTab}
          />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default ExamBuilder
