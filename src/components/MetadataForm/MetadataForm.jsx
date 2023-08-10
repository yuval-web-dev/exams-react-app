import React, { useState, useImperativeHandle, forwardRef } from "react"
import { Container, Row, Col, Form } from "react-bootstrap"
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import TimePicker from "react-bootstrap-time-picker"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import RangeSlider from "react-bootstrap-range-slider"

import consts from "./consts.js"

import { Metadata } from "../../classes.ts"


const MetadataForm = forwardRef(({ }, ref) => {
  useImperativeHandle(ref, () => ({
    error() {
      return subject === defaultStates.subject
    },
    yieldObj() {
      const cdate = new Date(date)
      cdate.setHours(0, 0, 0, 0)
      cdate.setSeconds(startHr)
      return new Metadata(
        subject,
        {},
        cdate,
        Number(duration),
        shuffle
      )
    }
  }))

  const today = new Date()
  const tomorrow = today.setDate(today.getDate() + 1)

  const defaultStates = {
    subject: "",
    date: tomorrow,
    startHr: 9 * 60 * 60,
    duration: 30,
    shuffle: false
  }

  const [subject, setSubject] = useState(defaultStates.subject)
  const [date, setDate] = useState(defaultStates.date) // Millis
  const [startHr, setStart] = useState(defaultStates.startHr) // Secs
  const [duration, setDuration] = useState(defaultStates.duration)
  const [shuffle, setShuffle] = useState(defaultStates.shuffle)

  // Event handlers
  const handleExamTypeChange = (isChecked) => {
    // const newType = isChecked ? "closed" : "open"
    // setType(newType)
    // console.log(newType)
  }

  const handleTimeReset = () => {
    // setStart(consts.earliestHourNum)
    // setDuration(consts.minDuration)
  }

  const handleJsonChange = (newFile) => {
    // const allowedTypes = ["application/json"]
    // if (newFile === undefined) {
    //   return
    // }
    // else if (!allowedTypes.includes(newFile?.type)) {
    //   alert(`Allowed file types: ${[...allowedTypes]}`)
    //   setJsonImport(null)
    // }
    // else {
    //   setJsonImport(newFile)
    // }
    // jsonInputRef.current.value = ""
  }

  const handleJsonImport = () => {
    // const reader = new FileReader()

    // reader.onload = function (e) {
    //   const allowedKeys = ["questions", "subject", "date", "startTime", "duration", "isRandomized"]

    //   const jsonParsed = JSON.parse(e.target.result)
    //   const keys = Object.keys(jsonParsed)

    //   if (!keys.every(key => (allowedKeys.includes(key)))) {
    //     alert(`Allowed JSON keys: ${[...allowedKeys]}`)
    //     return
    //   }
    //   if (jsonParsed.hasOwnProperty("questions")) {
    //     setQuestions(jsonParsed.questions)
    //   }
    //   if (jsonParsed.hasOwnProperty("subject")) {
    //     setSubject(jsonParsed.subject)
    //   }
    //   if (jsonParsed.hasOwnProperty("date")) {
    //     setDate(jsonParsed.date)
    //   }
    //   if (jsonParsed.hasOwnProperty("startTime")) {
    //     setStart(jsonParsed.startTime)
    //   }
    //   if (jsonParsed.hasOwnProperty("duration")) {
    //     setDuration(jsonParsed.subject)
    //   }
    // }
    // reader.readAsText(jsonImport)
  }

  const handleJsonExport = () => {
    // const data = {
    //   questions,
    //   subject,
    //   date,
    //   startTime: start,
    //   duration
    // }
    // const json = JSON.stringify(data)
    // const element = document.createElement("a")
    // element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(json))
    // element.setAttribute("download", `${jsonExport === "" ? "untitled_exam" : jsonExport}.json`)
    // element.style.display = "none"
    // document.body.appendChild(element)
    // element.click()
    // document.body.removeChild(element)
  }

  const rowClass = "align-items-center"

  const SubjectRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1Width}>
        Subject
      </Col>
      <Col xs={consts.col2Width}>
        <Form.Control
          value={subject}
          type="text"
          spellCheck={true}
          onChange={e => setSubject(e.target.value)} />
      </Col>
    </Row>
  )

  const DateRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1Width}>
        Date
      </Col>
      <Col xs={consts.col2Width}>
        <DatePicker
          value={date}
          selected={date}
          className="form-control"
          minDate={consts.tomorrow}
          dateFormat={consts.dateFormat}
          onChange={newDate => setDate(newDate)} />
      </Col>
    </Row>
  )

  const TimeSlotRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1Width}>
        Time Slot
      </Col>
      <Col xs={consts.col2Width}>
        <Row>
          <Col xs={6}>
            <Row className={rowClass}>
              <Col xs={2}>
                Start
              </Col>
              <Col xs={10}>
                <TimePicker
                  value={startHr}
                  format={24}
                  step={30}
                  start={consts.minHourRepr}
                  end={consts.maxHourRepr}
                  onChange={time => setStart(time)} />
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <Row className="align-items-center">
              <Col xs={2}>
                End
              </Col>
              <Col xs={10}>
                <TimePicker
                  value={startHr + (duration * 60)}
                  format={24}
                  style={{ color: "grey", pointerEvents: "none" }} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )

  const DurationRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1Width}>
        Duration
      </Col>
      <Col xs={consts.col2Width}>
        <Row className={rowClass}>
          <Col xs="9">
            <RangeSlider
              size="lg"
              value={duration}
              step={30}
              min={30}
              max={180}
              tooltip="off"
              onChange={e => setDuration(e.target.value)} />
          </Col>
          <Col xs="3">
            {duration} Minutes
          </Col>
        </Row>
      </Col>
    </Row >
  )

  const ShuffleRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1Width}>
        Shuffled
      </Col>
      <Col xs={consts.col2Width}>
        <BootstrapSwitchButton
          checked={shuffle}
          onChange={() => setShuffle(!shuffle)} />
      </Col>
    </Row>
  )

  return (
    <Container>
      {SubjectRow()}
      {DateRow()}
      {TimeSlotRow()}
      {DurationRow()}
      {ShuffleRow()}
    </Container >
  )
})

export default MetadataForm