import React from "react"
import {
  Row, Col,
  Form,
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
import * as util from "./utils.js"

const MetadataComponent = ({ }, ref) => {
  React.useImperativeHandle(ref, () => ({
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


  const [subject, setSubject] = React.useState(state.subject)
  const [date, setDate] = React.useState(state.date) // Millis
  const [start, setStart] = React.useState(state.start) // Secs
  const [duration, setDuration] = React.useState(state.duration)

  const labelClassname = "my-0"

  const SubjectForm = () => {
    const handleSubjectChange = (newSubject) => {
      setSubject(newSubject)
    }
    return (
      <Form>
        <Form.Label className={labelClassname}>
          <small>Subject</small>
        </Form.Label>
        <Form.Control
          value={subject}
          type="text"
          spellCheck={true}
          onChange={e => handleSubjectChange(e.target.value)} />
      </Form>
    )
  }

  const DateStartEndForms = () => {

    return (
      <Row>
        <Col className="pe-1">
          <Form className="d-flex flex-column">
            <Form.Label className={labelClassname}>
              <small>Date</small>
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
        <Col className="px-1">
          <Form>
            <Form.Label className={labelClassname}>
              <small>Start</small>
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
        <Col className="ps-1">
          <Form>
            <Form.Label className={labelClassname}>
              <small>End</small>
            </Form.Label>
            <TimePicker
              value={start + (duration * 60)}
              format={24}
              style={{ color: "grey", pointerEvents: "none" }} />
          </Form>
        </Col>
      </Row>
    )
  }

  const DurationSlider = () => (
    <Form>
      <Form.Label className={labelClassname}>
        <small>Duration (Mins)</small>
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
        {DateStartEndForms()}
      </ListGroup.Item>
      <ListGroup.Item>
        {DurationSlider()}
      </ListGroup.Item>
    </ListGroup>
  )
}

export default React.forwardRef(MetadataComponent)