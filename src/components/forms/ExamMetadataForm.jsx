import React from "react"
import * as AuthKit from "react-auth-kit"
import { Row, Col, Form, ListGroup, ListGroupItem, Badge } from "react-bootstrap"
import TimePicker from "react-bootstrap-time-picker"
import DatePicker from "react-datepicker"; import "react-datepicker/dist/react-datepicker.css"
import RangeSlider from "react-bootstrap-range-slider"; import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import * as dateUtils from "./date.js"



const ExamMetadataForm = ({ initialValues }, ref) => {
  const authUser = AuthKit.useAuthUser()
  const [inputs, setInputs] = React.useState({
    name: "",
    lecturerFirstName: authUser().firstName,
    lecturerLastName: authUser().lastName,
    start: dateUtils.genStart(),
    duration: 30
  })
  const [date, setDate] = React.useState(dateUtils.genStart()) // Millis
  const [hour, setHour] = React.useState(9 * 60 * 60) // Secs

  React.useImperativeHandle(
    ref,
    () => {
      return {
        get() {
          const inputsModified = inputs
          inputsModified.duration = Number(inputs.duration)
          return inputsModified
        }
      }
    },
    [inputs]
  )

  React.useEffect(() => {
    if (initialValues) {
      setInputs(initialValues)
    }
  }, [])


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
    <ListGroup variant="flush">
      <ListGroupItem className="d-flex">
        <Col className="pe-3">
          <Form.Label>Exam</Form.Label>
          <Form.Control
            name="name"
            value={inputs.name}
            type="text"
            placeholder="Name"
            onChange={handleChangeInput} />
        </Col>
        <Col>
          <Form.Label>Lecturer</Form.Label>
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
      </ListGroupItem>

      <ListGroupItem className="d-flex flex-row">
        <Col>
          <Form.Label>Date</Form.Label>
          <br />
          <DatePicker
            value={date}
            selected={date}
            className="form-control"
            minDate={dateUtils.genStart()}
            dateFormat="d/M/yy"
            onChange={handleDateChange} />
        </Col>
        <Col>
          <Form.Label>Start</Form.Label>
          <TimePicker
            value={hour}
            format={24}
            step={30}
            start={dateUtils.numberToHHmm(9)}
            end={dateUtils.numberToHHmm(17)}
            onChange={handleHourChange} />
        </Col>
        <Col>
          <Form.Label>End</Form.Label>
          <TimePicker
            value={hour + (inputs.duration * 60)}
            format={24}
            style={{ color: "grey", pointerEvents: "none" }} />
        </Col>
      </ListGroupItem>

      <ListGroupItem>
        <Form.Label>Duration</Form.Label>

        <Row>
          <Col xs="3" className="d-flex justify-content-start align-items-center">
            <div className="text-primary fs-4">{inputs.duration}</div>
            &nbsp;&nbsp;Minutes
          </Col>
          <Col>
            <RangeSlider
              name="duration"
              value={inputs.duration}
              step={30}
              min={30}
              max={180}
              tooltip="off"
              onChange={handleChangeInput} />
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  )
}

export default React.forwardRef(ExamMetadataForm)