import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Table, Button, ButtonGroup, Form, Tabs, Tab } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-datepicker'; import 'react-datepicker/dist/react-datepicker.css';
import RangeSlider from 'react-bootstrap-range-slider';


import helpers from './helpers.js'
import { Exam, Question } from "../../classes"
import QuestionForm from './QuestionForm/QuestionForm.js';

const ExamEditor = ({ user }) => {
  // Defaults:
  const [earliestHourStr, earliestHourNum] = ['09:00', 9 * 60 * 60]
  const latestHourStr = '17:00'
  const [minDuration, maxDuration] = [30, 180] // mins
  const today = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  // In general, it is recommended to use a state to manage the value of a  in React.
  //  This is because when a 's state changes, React automatically re-renders the  and its children to reflect the new state.
  // Using a ref to update a 's value can be useful in certain cases, such as when you need to access the value of an input element
  //  without triggering a re-render, or when you need to store a temporary value that doesn't need to be part of the  state.
  // However, if you are updating the value of a  that affects the visual display of the ,
  //  using a ref can lead to inconsistencies and unpredictable behavior.
  // So in general, if the value of a  needs to be part of the state and needs to trigger a re-render, it's best to manage it with a state.
  // If you only need to store a temporary value or access the value without triggering a re-render, you can use a ref.
  const [exam, setExam] = useState(new Exam())
  const [question, setQuestion] = useState(new Question())
  const [questionsArr, setQuestionsArr] = useState([])
  const [examSubject, setExamSubject] = useState('')
  const [examDate, setExamDate] = useState(null)
  const [examStartTime, setExamStartTime] = useState(earliestHourNum)
  const [examEndTime, setExamEndTime] = useState(earliestHourNum + minDuration * 60)
  const [examDuration, setExamDuration] = useState(minDuration)
  const [examIsRandomized, setExamIsRandomized] = useState(false)

  // UseEffect hook:
  const useEffectFunc = () => { }
  let useEffectDependancyArr = []
  useEffect(useEffectFunc, useEffectDependancyArr)

  const handleStartTimeChange = (newStartTime) => {
    setExamStartTime(newStartTime)
    setExamEndTime(newStartTime + (examDuration * 60))
  }

  const handleTimeReset = () => {
    setExamStartTime(earliestHourNum)
    setExamEndTime(earliestHourNum + minDuration * 60)
    setExamDuration(minDuration)
  }

  const handleDurationChange = (newDuration) => {
    newDuration = Math.floor(newDuration)
    if (newDuration >= 1 || newDuration <= 180) {
      setExamDuration(newDuration)
      setExamEndTime(examStartTime + (newDuration * 60))
    }
  }

  const handleSliderChange = (newDuration) => {
    setExamDuration(newDuration)
    setExamEndTime(examStartTime + (newDuration * 60))
  }

  const handleQuestionsClear = () => {
    if (window.confirm('Are you sure you want to clear all questions?')) {
      setQuestionsArr([])
    }
  }

  const handleQuestionEdit = (question) => {
    // changeActiveTab('questionform')
  }

  return (
    <Container>
      <Row>
        <Col>
          <Table responsive>
            <tbody>
              <tr>
                <td>Author</td>
                <td>{`${user.surname}, ${user.firstname}`}</td>
              </tr>
              <tr>
                <td>Exam ID</td>
                <td style={{ fontFamily: 'consolas' }}>{`${exam.eid}`}</td>
              </tr>
              <tr>
                <td>Subject</td>
                <td><Form.Control type='text' onChange={e => setExamSubject(e?.target?.value)} spellCheck='true' style={{ fontWeight: 'bold' }} /></td>
              </tr>
              <tr>
                <td>Date</td>
                <td><DatePicker selected={examDate} className='form-control' minDate={tomorrow} dateFormat='dd/MM/yyyy' onChange={newDate => setExamDate(newDate)} /></td>
                <td><Button variant='secondary' onClick={e => setExamDate(tomorrow)}>Reset</Button></td>
              </tr>
              <tr>
                <td>Time Slot</td>
                <td>
                  <Row>
                    <Col><TimePicker value={examStartTime} step={30} start={earliestHourStr} end={latestHourStr} onChange={newTime => handleStartTimeChange(newTime)} /></Col>
                    <Col><TimePicker value={examEndTime} step={1} style={{ pointerEvents: 'none' }} /></Col>
                  </Row>
                </td>
                <td><Button variant='secondary' onClick={e => handleTimeReset()}>Reset</Button></td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>
                  <Row className='align-items-center'>
                    <Col className='col-4 pe-1'><Form.Control value={examDuration} type='number' min={minDuration} max={maxDuration} onChange={e => handleDurationChange(e?.target?.value)} /></Col>
                    <Col className='ps-1'><RangeSlider value={examDuration} min={30} max={180} tooltip='off' onChange={e => handleSliderChange(e?.target?.value)} /></Col>
                  </Row>
                </td>
                <td><Button variant='secondary' onClick={e => setExamDuration(30)}>Reset</Button></td>
              </tr>
              <tr>
                <td>Randomize?</td>
                <td><BootstrapSwitchButton offlabel='No' onlabel='Yes' checked={false} onChange={e => setExamIsRandomized(!examIsRandomized)} /></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs>
            <Tab title='Questions' eventKey='questionList'>

            </Tab>
            <Tab title='Add a Question' eventKey='questionCreate'>
              <QuestionForm />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}

export default ExamEditor