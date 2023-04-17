import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Button, ButtonGroup, Form, Tabs, Tab, Modal, Image, Nav } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import TimePicker from 'react-bootstrap-time-picker'
import DatePicker from 'react-datepicker'; import 'react-datepicker/dist/react-datepicker.css'
import RangeSlider from 'react-bootstrap-range-slider'

import consts from './consts.js'

import isQuestionSane from '../helpers.js'

import { Exam, Question } from "../../classes.js"

import QuestionForm from '../QuestionForm/QuestionForm.js'
import EditQuestionForm from '../EditQuestionForm/EditQuestionForm.js'

import greenCheck from '../../assets/svg/green-checkmark-icon.svg'
import redAlert from '../../assets/svg/red-alert-icon.svg'


const ExamForm = () => {
  const [questions, setQuestions] = useState([])
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState(null)
  const [startTime, setStartTime] = useState(consts.earliestHourNum)
  const [endTime, setEndTime] = useState(consts.earliestHourNum + consts.minDuration * 60)
  const [duration, setDuration] = useState(consts.minDuration)
  const [isRandomized, setIsRandomized] = useState(false)

  const [questionToEdit, setQuestionToEdit] = useState(null)

  const [activeTab, setActiveTab] = useState('questions')

  const [imagePreview, setImagePreview] = useState(null)
  const [showImagePreview, setShowImagePreview] = useState(false)

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

  const handleMoveUp = (question, idx) => {
    if (idx > 0) {
      let newQuestions = [...questions]
      const replaced = newQuestions[idx - 1]
      newQuestions[idx - 1] = question
      newQuestions[idx] = replaced
      setQuestions(newQuestions)
    }
  }

  const handleMoveDown = (question, idx) => {
    if (idx < (questions.length - 1)) {
      let newQuestions = [...questions]
      const replaced = newQuestions[idx + 1]
      newQuestions[idx + 1] = question
      newQuestions[idx] = replaced
      setQuestions(newQuestions)
    }
  }

  const handleQuestionEdit = (question) => {
    setQuestionToEdit(question)
    setActiveTab('editQuestion')
  }

  const handleQuestionDiscard = (questionToDiscard) => {
    if (window.confirm('Are you sure?')) {
      setQuestions(
        questions.filter((question) => question !== questionToDiscard)
      )
    }
  }

  const onQuestionFormSave = (newQuestion) => {
    setQuestions([...questions, newQuestion])
    setActiveTab('questions')
  }

  const onQuestionFormDiscard = () => {
    setActiveTab('questions')
  }

  const onEditQuestionFormSave = (modifiedQuestion) => {
    const oldQuestionIdx = questions.indexOf(questionToEdit)
    let newQuestions = [...questions]
    newQuestions[oldQuestionIdx] = modifiedQuestion
    setQuestions(newQuestions)
    setActiveTab('questions')
  }

  const onEditQuestionFormDiscard = () => {
    setActiveTab('questions')
  }

  const handleImagePreview = (e, image) => {
    e.preventDefault()
    setImagePreview(image)
    setShowImagePreview(true)
  }

  const renderQuestions = () => {
    return (
      questions.map((q, idx) => {
        return (
          <tr key={idx.toString()} id={idx}>
            <td>{idx + 1}</td>
            <td>{q.image === null ? '-' : <Nav.Link style={{ color: '#007bff' }} onClick={(e) => handleImagePreview(e, q.image)}>{q.image.name}</Nav.Link>}</td>
            <td>{q.body === '' ? '-' : `"${q.body.toString()}"`}</td>
            <td>
              <ol>
                {q.answers.length === 0 ? '-' : q.answers.map((answer) => {
                  return (
                    <li style={q.correctAnswers.includes(answer) ? { color: 'green', fontWeight: 'bold' } : {}}>{`"${answer}"`}</li>
                  )
                })}
              </ol>
            </td>
            <td>{q.isRandomized === true ? 'Yes' : 'No'}</td>
            <td>{isQuestionSane(q) ? <img src={greenCheck} width='35px' /> : <img src={redAlert} width='35px' />}</td>
            <td>
              <ButtonGroup>
                <Button variant='light' onClick={() => handleMoveUp(q, idx)}>⯅</Button>
                <Button variant='light' onClick={() => handleMoveDown(q, idx)}>⯆</Button>
              </ButtonGroup>
              <Button variant='primary' onClick={() => handleQuestionEdit(q)}>Edit</Button>
              <Button variant='light' onClick={() => handleQuestionDiscard(q)}>Discard</Button>
            </td>
          </tr>
        )
      })
    )
  }

  return (
    <>
      <Row>
        <Col>
          <Table responsive className='align-middle'>
            <tbody>
              <tr>
                <td>Import from JSON</td>
                <td>

                </td>
              </tr>
              <tr>
                <td>Export to JSON</td>
                <td>

                </td>
              </tr>
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
              <Table hover responsive className='align-middle'>
                <thead>
                  <th>#</th>
                  <th>Image</th>
                  <th>Body</th>
                  <th>Answers</th>
                  <th>Randomized</th>
                  <th>Sanity</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {renderQuestions()}
                </tbody>
              </Table>
            </Tab>
            <Tab title='Add a Question' eventKey='addQuestion'>
              <QuestionForm onSave={onQuestionFormSave} onDiscard={onQuestionFormDiscard} />
            </Tab>
            <Tab title='Edit Existing Question' eventKey='editQuestion' disabled >
              <EditQuestionForm onSave={onEditQuestionFormSave} onDiscard={onEditQuestionFormDiscard} question={questionToEdit} />
            </Tab>
          </Tabs>
        </Col>
      </Row>


      <Modal show={showImagePreview}>
        <Modal.Header>
          <Modal.Title>{imagePreview?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            style={{ width: '100%' }}
            src={imagePreview === null ? null : URL.createObjectURL(imagePreview)}></Image>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowImagePreview(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ExamForm