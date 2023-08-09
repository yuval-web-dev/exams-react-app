import React, { useState, useRef, useEffect } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import TimePicker from "react-bootstrap-time-picker"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import RangeSlider from "react-bootstrap-range-slider"

import BottomControlBar from "../BottomControlBar/BottomControlBar"

// Javascript
import consts from "./consts.js"


const MetadataForm = () => {
  // States
  const [jsonImport, setJsonImport] = useState(null) // The actual JSON file uploaded via input
  const [jsonExport, setJsonExport] = useState("") // The name of the to-be exported JSON file

  // Form values states
  // const [type, setType] = useState("closed") // TODO implement this
  const [subject, setSubject] = useState("")
  const [date, setDate] = useState(consts.tomorrow)
  const [start, setStart] = useState(consts.minHour)
  const [duration, setDuration] = useState(consts.minDur)
  const [shuffle, setShuffle] = useState(false)





  // Refs
  const jsonInputRef = useRef(null)

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
    const allowedTypes = ["application/json"]
    if (newFile === undefined) {
      return
    }
    else if (!allowedTypes.includes(newFile?.type)) {
      alert(`Allowed file types: ${[...allowedTypes]}`)
      setJsonImport(null)
    }
    else {
      setJsonImport(newFile)
    }
    jsonInputRef.current.value = ""
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
                  value={start}
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
                  value={start + (duration * 60)}
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
        Shuffle Questions
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
      <BottomControlBar
        onDiscard={() => { }}
        onSave={() => { }} />
    </Container >
  )
}

export default MetadataForm


{/* <tr>
                <td>From JSON</td>
                <td>
                  <Form>
                    <Form.Control
                      ref={jsonInputRef}
                      type="file"
                      accept=".json"
                      multiple={false}
                      onChange={e => handleJsonChange(e?.target?.files[0])} />
                  </Form>
                </td>
                <td>
                  <Button
                    disabled={jsonImport === null}
                    onClick={() => handleJsonImport()}>Import</Button>
                </td>
              </tr>
              <tr>
                <td>To JSON</td>
                <td>
                  <Form.Control
                    value={jsonExport}
                    // This pattern should allow only alnum chars, underscores, and hyphens,
                    //  with the condition that the string must start with a letter and end with an alnum chars:
                    pattern="/^[a-zA-Z][\w-]*[a-zA-Z\d]$/"
                    placeholder="Name the JSON export file..."
                    onChange={e => setJsonExport(e?.target?.value)}
                  />
                </td>
                <td>
                  <Button onClick={() => handleJsonExport()}>Export</Button>
                </td>
              </tr> */}
{/* <tr>
                <td>Type</td>
                <td>
                  <BootstrapSwitchButton
                    checked={true}
                    onstyle="light"
                    onlabel="Closed"
                    offlabel="Open"
                    width={100}
                    onChange={handleExamTypeChange} />
                </td>
              </tr> */}
{/* <tr>
                <td>Author</td>
                <td>{`${user.surname}, ${user.firstname}`}</td>
                <td>Surname, Firstname</td>
              </tr>
              <tr>
                <td>Exam ID</td>
                <td>uid</td>
                <td style={{ fontFamily: "consolas" }}>{`${exam.eid}`}</td>
              </tr> */}