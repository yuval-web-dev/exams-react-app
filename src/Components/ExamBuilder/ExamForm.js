import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import RangeSlider from 'react-bootstrap-range-slider';

import TimePicker from 'react-bootstrap-time-picker';


import BootstrapSwitchButton from 'bootstrap-switch-button-react'


import { Exam, Question, User } from '../../classes';

const ExamForm = () => {

  const [earliestHourStr, earliestHourNum] = ['09:00', 9 * 60 * 60]
  const latestHourStr = '17:00'
  const [minDuration, maxDuration] = [30, 180] // mins
  const today = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const [exam, setExam] = useState(new Exam())
  const [name, setName] = useState('')
  const [date, setDate] = useState(tomorrow)
  const [startTime, setStartTime] = useState(earliestHourNum)
  const [endTime, setEndTime] = useState(earliestHourNum + minDuration * 60) // internal use
  const [duration, setDuration] = useState(minDuration)
  const [random, setRandom] = useState(false)
  const [questions, setQuestions] = useState([])

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
    console.log(JSON.stringify(selectedDate))
    setDate(selectedDate)
  }

  const handleDateReset = () => {
    setDate(tomorrow)
  }

  const handleStartTimeChange = (value) => {
    // TODO value validity checks
    setStartTime(value)
    setEndTime(value + (duration * 60))
  }

  const handleTimeReset = (e) => {
    setStartTime(earliestHourNum)
    setEndTime(earliestHourNum + minDuration * 60)
    setDuration(minDuration)
  }

  const handleDurationChange = (e) => {
    const dur = Math.floor(e.target.value)
    if (dur >= 1 || dur <= 180) {
      setDuration(dur)
      setEndTime(startTime + (dur * 60))
    }
  }

  const handleDurationSliderChange = (e) => {
    const dur = e.target.value
    setDuration(dur)
    setEndTime(startTime + (dur * 60))
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
    <table>
      <tbody>
        <tr>
          <td>Author</td>
          <td>
            <Form.Control readOnly className='text-muted' value={`${user.surname}, ${user.firstname}`} type='text' />
          </td>
        </tr>
        <tr>
          <td>EID</td>
          <td>
            <Form.Control readOnly className='text-muted' value={exam.eid} type='text' style={{ fontFamily: 'consolas' }} />
          </td>
        </tr>
        <tr>
          <td>Subject</td>
          <td><Form.Control value={name} type='text' onChange={handleNameChange} spellCheck='true' style={{ fontWeight: 'bold' }} /></td>
          <td>
            <Button variant='outline-warning' onClick={() => { setName('') }}>Clear</Button>
          </td>
        </tr>
        <tr>
          <td>Date</td>
          <td>
            <div className='form-group'>
              <DatePicker className='form-control' selected={date} minDate={tomorrow} dateFormat='dd/MM/yyyy' onChange={handleDateChange} />
            </div>
          </td>
          <td>
            <Button variant='outline-warning' onClick={handleDateReset}>Reset</Button>
          </td>
        </tr>
        <tr>
          <td>Timeframe</td>
          <td>
            <Row>
              <Col>
                <TimePicker value={startTime} step={30} start={earliestHourStr} end={latestHourStr} onChange={handleStartTimeChange} />
              </Col>
              <Col>
                <TimePicker value={endTime} step={1} className='text-muted' style={{ pointerEvents: 'none' }} />
              </Col>
            </Row>
          </td>
          <td>
            <Button variant='outline-warning' onClick={handleTimeReset}>Reset</Button>
          </td>
        </tr>
        <tr>
          <td>Duration</td>
          <td>
            <Row className='align-items-center'>
              <Col className='col-4 pe-1'>
                <Form.Control type='number' value={duration} min={minDuration} max={maxDuration} onChange={handleDurationChange} />
              </Col>
              <Col className='ps-1'>
                <RangeSlider value={duration} min={30} max={180} onChange={handleDurationSliderChange} tooltip='off' />
              </Col>
            </Row>
          </td>
          <td>

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
    </table>
  )
}

export default ExamForm