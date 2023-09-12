import React from "react"
import moment from "moment"
import DatePicker from "react-datepicker"; import "react-datepicker/dist/react-datepicker.css"; // https://www.npmjs.com/package/react-datepicker
import RangeSlider from "react-bootstrap-range-slider"; import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'; // https://www.npmjs.com/package/react-bootstrap-range-slider
import * as AuthKit from "react-auth-kit"
import { Col, Form, ListGroup } from "react-bootstrap"


const ExamMetadataForm = ({ initialValues }, ref) => {
  const authUser = AuthKit.useAuthUser()
  const [inputs, setInputs] = React.useState({
    duration: 30,
    lecturerFirstName: authUser().firstName,
    lecturerLastName: authUser().lastName,
    start: moment().add(3, "h").startOf("h").toDate()
  })

  React.useImperativeHandle(ref, () => {
    return {
      get() {
        const inputs1 = inputs
        inputs1.duration = Number(inputs.duration)
        inputs1.end = moment(inputs1.start).add(inputs1.duration, "minutes").toDate()
        return inputs1
      }
    }
  }, [inputs])

  React.useEffect(() => {
    if (initialValues) {
      console.log(initialValues)
      setInputs(initialValues)
    }
  }, [])


  const inputsSetter = (key, value) => {
    setInputs({ ...inputs, [key]: value })
  }

  const handleChangeDate = (newDate) => {
    inputsSetter("start", newDate)
  }

  const handleChangeDuration = (newDuration) => {
    inputsSetter("duration", newDuration)
  }

  const filterPassedTime = (time) => {
    const currentDate = moment().add(3, "h").startOf("h")
    const selectedDate = moment(time).startOf("h")
    return currentDate.isSameOrBefore(selectedDate)
  }

  return (
    <ListGroup variant="flush">

      <ListGroup.Item>
        <Form.Label>Exam</Form.Label>
        <Form.Control
          value={inputs?.name || ""}
          type="text"
          placeholder="Name"
          onChange={event => inputsSetter("name", event.target.value)} />
      </ListGroup.Item>

      <ListGroup.Item>
        <Form.Label>Author</Form.Label>
        <Form.Control
          disabled
          value={authUser().username}
          type="text"
          placeholder="Name"
          onChange={event => inputsSetter("name", event.target.value)} />
      </ListGroup.Item>

      <ListGroup.Item>
        <Form.Label>Lecturer</Form.Label>
        <div className="d-flex">
          <Form.Control
            value={inputs.lecturerFirstName}
            type="text"
            placeholder="First name"
            onChange={event => inputsSetter("lecturerFirstName", event.target.value)} />
          <Form.Control
            value={inputs.lecturerLastName}
            type="text"
            placeholder="Last name"
            onChange={event => inputsSetter("lecturerLastName", event.target.value)} />
        </div>
      </ListGroup.Item>

      <ListGroup.Item>
        <Form.Label>Date, Hour</Form.Label>
        <DatePicker
          withPortal
          showTimeSelect
          className="w-100 form-control"
          minDate={moment().toDate()}
          selected={moment(inputs.start).toDate()}
          filterTime={filterPassedTime}
          dateFormat="d/M/yy, HH:mm"
          timeFormat="HH:mm"
          timeIntervals={60}
          onChange={date => handleChangeDate(date)} />
      </ListGroup.Item>

      <ListGroup.Item>
        <Form.Label>Duration</Form.Label>
        <Col className="d-flex align-items-center">
          <span className="ms-auto"><span className="text-primary">{inputs.duration}</span> Minutes</span>
          <div className="ps-3 flex-grow-1">
            <RangeSlider
              className="w-100"
              value={inputs.duration}
              step={30}
              min={30}
              max={180}
              tooltip="off"
              onChange={event => handleChangeDuration(event.target.value)} />
          </div>
        </Col>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default React.forwardRef(ExamMetadataForm)