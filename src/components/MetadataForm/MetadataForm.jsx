import React, { useState, useImperativeHandle, forwardRef } from "react"
import {
  Container, Row, Col,
  Form,
  Button,
  ListGroup
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

  const SubjectForm = () => {
    const handleSubjectChange = (newSubject) => {
      setSubject(newSubject)
    }
    return (
      <Form>
        <Form.Label>
          Subject
        </Form.Label>
        <Form.Control
          value={subject}
          type="text"
          spellCheck={true}
          onChange={e => handleSubjectChange(e.target.value)} />
      </Form>
    )
  }

  const DateTimeForm = () => {
    return (
      <Row>
        <Col>
          <Form>
            <Form.Label>
              Date
            </Form.Label>
            <DatePicker
              value={date}
              selected={date}
              className="form-control"
              minDate={state.date}
              dateFormat="d/M/yy"
              onChange={date => setDate(date)} />
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Label>
              Start
            </Form.Label>
            <TimePicker
              value={start}
              format={24}
              step={30}
              start={util.hhmm(9)}
              end={util.hhmm(17)}
              onChange={time => setStart(time)} />
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Label>End</Form.Label>
            <TimePicker
              value={start + (duration * 60)}
              format={24}
              style={{ color: "grey", pointerEvents: "none" }} />
          </Form>
        </Col>
      </Row>
    )
  }

  const DurationForm = () => (
    <Form>
      <Form.Label>
        Duration (Mins)
      </Form.Label>
      <RangeSlider
        value={duration}
        step={30}
        min={30}
        max={180}
        tooltipPlacement="bottom"
        tooltip="auto"
        onChange={e => setDuration(e.target.value)} />
    </Form>
  )

  return (
    <ListGroup>
      <ListGroup.Item>
        {SubjectForm()}
      </ListGroup.Item>
      <ListGroup.Item>
        {DateTimeForm()}
      </ListGroup.Item>
      <ListGroup.Item>
        {DurationForm()}
      </ListGroup.Item>
    </ListGroup>
  )
})

export default MetadataForm