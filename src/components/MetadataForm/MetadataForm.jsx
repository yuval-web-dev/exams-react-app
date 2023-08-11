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

  const rowClass = "align-items-center"

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
      <Col>
        <Col xs="12">
          Date
        </Col>
        <Col xs="12">
          <DatePicker
            value={date}
            selected={date}
            className="form-control"
            minDate={consts.tomorrow}
            dateFormat={consts.dateFormat}
            onChange={newDate => setDate(newDate)} />
        </Col>
      </Col>
      <Col className="d-flex">
        <Col>
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
        <Col>
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
      </Col>
    </Row>
  )

  const DurationSlider = () => (
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

  return (
    <Container>
      {SubjectForm()}
      {DateTimeForm()}
      {DurationSlider()}
    </Container >
  )
})

export default MetadataForm