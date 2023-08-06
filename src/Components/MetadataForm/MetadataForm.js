import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Table, Button, ButtonGroup, Form, Tabs, Tab, Nav } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import TimePicker from 'react-bootstrap-time-picker'
import DatePicker from 'react-datepicker'; import 'react-datepicker/dist/react-datepicker.css'
import RangeSlider from 'react-bootstrap-range-slider'


// Javascript
import consts from './consts.js'

// Assets
import greenCheck from '../../assets/svg/green-checkmark-icon.svg'
import redAlert from '../../assets/svg/red-alert-icon.svg'


const MetadataForm = () => {
  // States
  const [jsonImport, setJsonImport] = useState(null) // The actual JSON file uploaded via input
  const [jsonExport, setJsonExport] = useState('') // The name of the to-be exported JSON file

  // Form values states
  const [shuffledQuestions, setShuffledQuestions] = useState(false)
  const [examType, setExamType] = useState('closed')
  const [questions, setQuestions] = useState([])
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState(null)
  const [startTime, setStartTime] = useState(consts.earliestHourNum)
  const [endTime, setEndTime] = useState(consts.earliestHourNum + consts.minDuration * 60)
  const [duration, setDuration] = useState(consts.minDuration)

  // Refs
  const jsonInputRef = useRef(null)

  // Event handlers
  const handleExamTypeChange = (isChecked) => {
    const newType = isChecked ? 'closed' : 'open'
    setExamType(newType)
    console.log(newType)
  }

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

  const handleJsonChange = (newFile) => {
    const allowedTypes = ['application/json']
    if (newFile === undefined) {
      return
    }
    else if (!allowedTypes.includes(newFile?.type)) {
      alert(`Allowed file types: ${[...allowedTypes]}`)
      setJsonImport(null)
    }
    else {
      setJsonImport(newFile)
    }
    jsonInputRef.current.value = ''
  }

  const handleJsonImport = () => {
    const reader = new FileReader()

    reader.onload = function (e) {
      const allowedKeys = ['questions', 'subject', 'date', 'startTime', 'duration', 'isRandomized']

      const jsonParsed = JSON.parse(e.target.result)
      const keys = Object.keys(jsonParsed)

      if (!keys.every(key => (allowedKeys.includes(key)))) {
        alert(`Allowed JSON keys: ${[...allowedKeys]}`)
        return
      }
      if (jsonParsed.hasOwnProperty('questions')) {
        setQuestions(jsonParsed.questions)
      }
      if (jsonParsed.hasOwnProperty('subject')) {
        setSubject(jsonParsed.subject)
      }
      if (jsonParsed.hasOwnProperty('date')) {
        setDate(jsonParsed.date)
      }
      if (jsonParsed.hasOwnProperty('startTime')) {
        setStartTime(jsonParsed.startTime)
      }
      if (jsonParsed.hasOwnProperty('duration')) {
        setDuration(jsonParsed.subject)
      }
    }
    reader.readAsText(jsonImport)
  }

  const handleJsonExport = () => {
    const data = {
      questions,
      subject,
      date,
      startTime,
      duration
    }
    const json = JSON.stringify(data)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(json))
    element.setAttribute('download', `${jsonExport === '' ? 'untitled_exam' : jsonExport}.json`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <Row>
        <Col>
          <Table responsive borderless className='align-middle'>
            <tbody>
              <tr>
                <td>From JSON</td>
                <td>
                  <Form>
                    <Form.Control
                      ref={jsonInputRef}
                      type='file'
                      accept='.json'
                      multiple={false}
                      onChange={e => handleJsonChange(e?.target?.files[0])} />
                  </Form>
                </td>
                <td>
                  <Button
                    disabled={jsonImport === null}
                    onClick={() => handleJsonImport()}>Import</Button>
                </td>
              </tr>
              <tr>
                <td>To JSON</td>
                <td>
                  <Form.Control
                    value={jsonExport}
                    // This pattern should allow only alnum chars, underscores, and hyphens,
                    //  with the condition that the string must start with a letter and end with an alnum chars:
                    pattern="/^[a-zA-Z][\w-]*[a-zA-Z\d]$/"
                    placeholder='Name the JSON export file...'
                    onChange={e => setJsonExport(e?.target?.value)}
                  />
                </td>
                <td>
                  <Button onClick={() => handleJsonExport()}>Export</Button>
                </td>
              </tr>
              <tr>
                <td>Type</td>
                <td>
                  <BootstrapSwitchButton
                    checked={true}
                    onstyle='light'
                    onlabel='Closed'
                    offlabel='Open'
                    width={100}
                    onChange={handleExamTypeChange} />
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
                <td>
                  <DatePicker
                    selected={date}
                    className='form-control'
                    minDate={consts.tomorrow}
                    dateFormat='dd/MM/yyyy'
                    onChange={newDate => setDate(newDate)} />
                </td>
                <td>
                  <Button
                    variant='light'
                    onClick={() => setDate(consts.tomorrow)}>
                    Reset
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Time Slot</td>
                <td>
                  <Row>
                    <Col><TimePicker value={startTime} step={30} start={consts.earliestHourStr} end={consts.latestHourStr} onChange={newTime => handleStartTimeChange(newTime)} /></Col>
                    <Col><TimePicker value={endTime} step={1} style={{ pointerEvents: 'none' }} /></Col>
                  </Row>
                </td>
                <td><Button variant='light' onClick={() => handleTimeReset()}>Reset</Button></td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>
                  <Row className='align-items-center'>
                    <Col className='col-4 pe-1'><Form.Control value={duration} type='number' min={consts.minDuration} max={consts.maxDuration} onChange={e => handleDurationChange(e?.target?.value)} /></Col>
                    <Col className='ps-1'><RangeSlider value={duration} min={30} max={180} tooltip='off' onChange={e => handleSliderChange(e?.target?.value)} /></Col>
                  </Row>
                </td>
                <td><Button variant='light' onClick={() => setDuration(30)}>Reset</Button></td>
              </tr>
              <tr>
                <td>Shuffle Questions</td>
                <td><BootstrapSwitchButton offlabel='No' onlabel='Yes' checked={shuffledQuestions} onChange={() => setShuffledQuestions(!shuffledQuestions)} /></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default MetadataForm