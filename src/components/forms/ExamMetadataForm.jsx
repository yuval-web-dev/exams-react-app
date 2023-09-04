import React from "react"
import * as AuthKit from "react-auth-kit"
import { Row, Col, Form, ListGroup } from "react-bootstrap"
import TimePicker from "react-bootstrap-time-picker"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import RangeSlider from "react-bootstrap-range-slider"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import * as dateUtils from "./date.js"



const ExamMetadataForm = ({ }, ref) => {
  const [date, setDate] = React.useState(dateUtils.genStart()) // Millis
  const [hour, setHour] = React.useState(9 * 60 * 60) // Secs
  const [duration, setDuration] = React.useState(30)

  const authUser = AuthKit.useAuthUser()

  const [inputs, setInputs] = React.useState({
    name: "",
    lecturerFirstName: authUser().firstName,
    lecturerLastName: authUser().lastName,
    start: dateUtils.genStart(),
    duration: 30
  })

  const inputsSetter = (key, value) => {
    setInputs(
      { ...inputs, [key]: value }
    )
  }

  const handleChangeInput = (event) => {
    inputsSetter(event.target.name, event.target.value)
  }

  const handleHourChange = (newHour) => {
    setHour(newHour)
    inputsSetter("start", dateUtils.calcStart(date, newHour))
  }

  const handleDateChange = (newDate) => {
    setDate(newDate)
    inputsSetter("start", dateUtils.calcStart(newDate, hour))
  }

  return (
    <Form>
      <ListGroup variant="flush">
        <ListGroup.Item className="d-flex">
          <Col className="pe-2">
            <Form.Label>
              <small>Exam</small>
            </Form.Label>
            <Form.Control
              name="name"
              value={inputs.name}
              type="text"
              placeholder="Name"
              onChange={handleChangeInput} />
          </Col>
          <Col>
            <Form.Label>
              <small>Lecturer</small>
            </Form.Label>
            <div className="d-flex">
              <Form.Control
                name="lecturerFirstName"
                value={inputs.lecturerFirstName}
                type="text"
                placeholder="First name"
                onChange={handleChangeInput} />
              <Form.Control
                name="lecturerLastName"
                value={inputs.lecturerLastName}
                type="text"
                placeholder="Last name"
                onChange={handleChangeInput} />
            </div>
          </Col>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex flex-row">
          <Col className="pe-1">
            <Form className="d-flex flex-column">
              <Form.Label><small>Date</small></Form.Label>
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
              <Form.Label>
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
              <Form.Label>
                <small>End</small>
              </Form.Label>
              <TimePicker
                value={hour + (duration * 60)}
                format={24}
                style={{ color: "grey", pointerEvents: "none" }} />
            </Form>
          </Col>
        </ListGroup.Item>

        <ListGroup.Item>
          <Form.Label>
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
        </ListGroup.Item>
      </ListGroup>
    </Form>
  )
}

export default React.forwardRef(ExamMetadataForm)