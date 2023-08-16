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
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import consts from "./consts.js"

import { Metadata } from "../../classes.ts"

import * as state from "./states.ts"
import * as util from "./utils.ts"

const MetadataForm = forwardRef(({ }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if (subject === state.subject) {
        throw "err"
      }
    },
    yield() {
      const cdate = new Date(date)
      cdate.setHours(0, 0, 0, 0)
      cdate.setSeconds(start)
      return new Metadata(
        subject,
        {},
        cdate,
        Number(duration)
      )
    }
  }))

  const [subject, setSubject] = useState(state.subject)
  const [date, setDate] = useState(state.date) // Millis
  const [start, setStart] = useState(state.start) // Secs
  const [duration, setDuration] = useState(state.duration)

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

  const DateTimeForm = () => {
    return (
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
              minDate={state.date}
              dateFormat="d/M/yy"
              onChange={date => setDate(date)} />
          </Col>
        </Col>
        <Col className="px-0">
          <Col xs="12">Start</Col>
          <Col xs="12">
            <TimePicker
              value={start}
              format={24}
              step={30}
              start={util.hhmm(9)}
              end={util.hhmm(17)}
              onChange={time => setStart(time)} />
          </Col>
        </Col>
        <Col className="ps-0">
          <Row>
            <Col xs="12">End</Col>
            <Col xs="12">
              <TimePicker
                value={start + (duration * 60)}
                format={24}
                style={{ color: "grey", pointerEvents: "none" }} />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

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

  return (
    <React.Fragment>
      {SubjectForm()}
      {DateTimeForm()}
      {DurationForm()}
    </React.Fragment >
  )
})

export default MetadataForm