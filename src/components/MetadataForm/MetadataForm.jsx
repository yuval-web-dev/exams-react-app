import React, { useState, useImperativeHandle, forwardRef } from "react"
import {
  Container, Row, Col,
  Form,
  Button
} from "react-bootstrap"
import TimePicker from "react-bootstrap-time-picker"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import RangeSlider from "react-bootstrap-range-slider"

import consts from "./consts.js"

import { Metadata } from "../../classes.ts"


const MetadataForm = forwardRef(({ }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if (subject === defaultStates.subject) {
        throw "err"
      }
    },
    yield() {
      const cdate = new Date(date)
      cdate.setHours(0, 0, 0, 0)
      cdate.setSeconds(startHr)
      return new Metadata(
        subject,
        {},
        cdate,
        Number(duration)
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

  const SubjectForm = () => (
    <Row className="mb-3">
      <Col xs="12">
        Subject
      </Col>
      <Col xs="12">
        <Form.Control
          value={subject}
          type="text"
          spellCheck={true}
          onChange={e => setSubject(e.target.value)} />
      </Col>
    </Row>
  )

  const DateTimeForm = () => (
    <Row className="my-3">
      <Col className="pe-0">
        <Col xs="12">
          Date
        </Col>
        <Col xs="12">
          <DatePicker
            value={date}
            selected={date}
            className="form-control"
            minDate={tomorrow}
            dateFormat={consts.dateFormat}
            onChange={newDate => setDate(newDate)} />
        </Col>
      </Col>
      <Col className="px-0">
        <Col xs="12">Start</Col>
        <Col xs="12">
          <TimePicker
            value={startHr}
            format={24}
            step={30}
            start={consts.minHourRepr}
            end={consts.maxHourRepr}
            onChange={time => setStart(time)} />
        </Col>
      </Col>
      <Col className="ps-0">
        <Row>
          <Col xs="12">End</Col>
          <Col xs="12">
            <TimePicker
              value={startHr + (duration * 60)}
              format={24}
              style={{ color: "grey", pointerEvents: "none" }} />
          </Col>
        </Row>
      </Col>
    </Row>
  )

  const DurationForm = () => (
    <Row className="my-3">
      <Col xs="12">Duration (Mins)</Col>
      <Col xs="12">
        <RangeSlider
          value={duration}
          step={30}
          min={30}
          max={180}
          tooltipPlacement="bottom"
          tooltip="auto"
          onChange={e => setDuration(e.target.value)} />
      </Col>
    </Row>
  )

  const ShuffleForm = () => (
    <Row className="my-3">
      <Col xs="12">Question Order</Col>
      <Col xs="12">
        <Button
          className="me-auto"
          variant={shuffle ? "warning" : "light"}
          onClick={() => setShuffle(!shuffle)}>
          {shuffle ? "Shuffled" : "Ordered"}
        </Button>
      </Col>
    </Row>
  )

  return (
    <Container>
      {SubjectForm()}
      {DateTimeForm()}
      {DurationForm()}
      {ShuffleForm()}
    </Container >
  )
})

export default MetadataForm