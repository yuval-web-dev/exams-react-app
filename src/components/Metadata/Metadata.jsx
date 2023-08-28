import React from "react"
import {
  Row, Col,
  Form,
  ListGroup,
  Button
} from "react-bootstrap"
import TimePicker from "react-bootstrap-time-picker"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import RangeSlider from "react-bootstrap-range-slider"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import * as dateUtils from "./date.js"
import { Metadata } from "../../classes.ts"



const MetadataComponent = ({ }, ref) => {
  React.useImperativeHandle(ref, () => ({
    validate() {
      if (subject === "") {
        throw "err"
      }
    },
    yield() {
      // const cdate = new Date(date)
      // cdate.setHours(0, 0, 0, 0)
      // cdate.setSeconds(hour)
      // return new Metadata(
      //   subject,
      //   {},
      //   cdate,
      //   Number(duration)
      // )
    }
  }))

  const [startsAt, setStartsAt] = React.useState(dateUtils.genStart())
  const [subject, setSubject] = React.useState("")
  const [date, setDate] = React.useState(dateUtils.genStart()) // Millis
  const [hour, setHour] = React.useState(9 * 60 * 60) // Secs
  const [duration, setDuration] = React.useState(30)

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
    const handleHourChange = (secs) => {
      setHour(secs)
      const newStart = dateUtils.calcStart(date, secs)
      setStartsAt(newStart)
    }

    const handleDateChange = (date) => {
      setDate(date)
    }


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
              minDate={dateUtils.genStart()}
              dateFormat="d/M/yy"
              onChange={handleDateChange} />
          </Form>
        </Col>
        <Col className="px-1">
          <Form>
            <Form.Label className={labelClassname}>
              <small>Start</small>
            </Form.Label>
            <TimePicker
              value={hour}
              format={24}
              step={30}
              start={dateUtils.numberToHHmm(9)}
              end={dateUtils.numberToHHmm(17)}
              onChange={handleHourChange} />
          </Form>
        </Col>
        <Col className="ps-1">
          <Form>
            <Form.Label className={labelClassname}>
              <small>End</small>
            </Form.Label>
            <TimePicker
              value={hour + (duration * 60)}
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
    <React.Fragment>
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
    </React.Fragment>

  )
}

export default React.forwardRef(MetadataComponent)