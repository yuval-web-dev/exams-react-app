import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Table, Button, ButtonGroup, Form, Tabs, Tab } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-datepicker'; import 'react-datepicker/dist/react-datepicker.css';
import RangeSlider from 'react-bootstrap-range-slider';

import consts from './consts.js'
import helpers from './helpers.js'
import { Exam, Question } from "../../classes.js"
import QuestionForm from '../QuestionForm/QuestionForm.js';


const ExamForm = () => {
  const [questions, setQuestions] = useState([])
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState(null)
  const [startTime, setStartTime] = useState(consts.earliestHourNum)
  const [endTime, setEndTime] = useState(consts.earliestHourNum + consts.minDuration * 60)
  const [duration, setDuration] = useState(consts.minDuration)
  const [isRandomized, setIsRandomized] = useState(false)

  const [activeTab, setActiveTab] = useState('questions')

  // UseEffect hook:
  const useEffectFunc = () => { }
  let useEffectDependancyArr = []
  useEffect(useEffectFunc, useEffectDependancyArr)

  const handleStartTimeChange = (newStartTime) => {
    setStartTime(newStartTime)
    setEndTime(newStartTime + (duration * 60))
  }

  const handleTimeReset = () => {
    setStartTime(consts.earliestHourNum)
    setEndTime(consts.earliestHourNum + consts.minDuration * 60)
    setDuration(consts.minDuration)
  }

  const handleDurationChange = (newDuration) => {
    newDuration = Math.floor(newDuration)
    if (newDuration >= 1 || newDuration <= 180) {
      setDuration(newDuration)
      setEndTime(startTime + (newDuration * 60))
    }
  }

  const handleSliderChange = (newDuration) => {
    setDuration(newDuration)
    setEndTime(startTime + (newDuration * 60))
  }

  const handleQuestionsClear = () => {
    if (window.confirm('Are you sure you want to clear all questions?')) {
      setQuestions([])
    }
  }

  const handleQuestionEdit = (question) => {
    // changeActiveTab('questionform')
  }

  const onQuestionFormSave = (newQuestion) => {
    setQuestions([...questions, newQuestion])
    setActiveTab('questions')
  }

  const onQuestionFormDiscard = () => {
    setActiveTab('questions')
  }

  return (
    <>
      <Row>
        <Col>
          <Table responsive>
            <tbody>
              <tr>
                <td>Author</td>
                {/* <td>{`${user.surname}, ${user.firstname}`}</td> */}
                <td>Surname, Firstname</td>
              </tr>
              <tr>
                <td>Exam ID</td>
                <td>uid</td>
                {/* <td style={{ fontFamily: 'consolas' }}>{`${exam.eid}`}</td> */}
              </tr>
              <tr>
                <td>Subject</td>
                <td><Form.Control type='text' onChange={e => setSubject(e?.target?.value)} spellCheck='true' style={{ fontWeight: 'bold' }} /></td>
              </tr>
              <tr>
                <td>Date</td>
                <td><DatePicker selected={date} className='form-control' minDate={consts.tomorrow} dateFormat='dd/MM/yyyy' onChange={newDate => setDate(newDate)} /></td>
                <td><Button variant='light' onClick={e => setDate(consts.tomorrow)}>Reset</Button></td>
              </tr>
              <tr>
                <td>Time Slot</td>
                <td>
                  <Row>
                    <Col><TimePicker value={startTime} step={30} start={consts.earliestHourStr} end={consts.latestHourStr} onChange={newTime => handleStartTimeChange(newTime)} /></Col>
                    <Col><TimePicker value={endTime} step={1} style={{ pointerEvents: 'none' }} /></Col>
                  </Row>
                </td>
                <td><Button variant='light' onClick={e => handleTimeReset()}>Reset</Button></td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>
                  <Row className='align-items-center'>
                    <Col className='col-4 pe-1'><Form.Control value={duration} type='number' min={consts.minDuration} max={consts.maxDuration} onChange={e => handleDurationChange(e?.target?.value)} /></Col>
                    <Col className='ps-1'><RangeSlider value={duration} min={30} max={180} tooltip='off' onChange={e => handleSliderChange(e?.target?.value)} /></Col>
                  </Row>
                </td>
                <td><Button variant='light' onClick={e => setDuration(30)}>Reset</Button></td>
              </tr>
              <tr>
                <td>Randomize?</td>
                <td><BootstrapSwitchButton offlabel='No' onlabel='Yes' checked={false} onChange={e => setIsRandomized(!isRandomized)} /></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs activeKey={activeTab} onSelect={eventKey => setActiveTab(eventKey)}>
            <Tab title='Questions' eventKey='questions'>

            </Tab>
            <Tab title='Add a Question' eventKey='addQuestion'>
              <QuestionForm onSave={onQuestionFormSave} onDiscard={onQuestionFormDiscard} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default ExamForm