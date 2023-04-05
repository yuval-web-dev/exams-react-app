import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import RangeSlider from 'react-bootstrap-range-slider';

import TimePicker from 'react-bootstrap-time-picker';


import BootstrapSwitchButton from 'bootstrap-switch-button-react'


import { Exam, Question, User } from '../../classes';

import QuestionForm from './QuestionForm.js'
import ExamForm from './ExamForm';

const ExamBuilder = () => {


  return (
    <Container variant='fluid'>
      <Row>

        <Col className='col-sm-12 col-md-6'>
          <h2>Exam Form</h2>
          <ExamForm />
          Questions...
        </Col>
        <Col className='col-sm-12 col-md-6'>
          <h2>Question Form</h2>
          <QuestionForm />
        </Col>
      </Row>
      <Row>

      </Row>

    </Container>
  )
}

export default ExamBuilder
