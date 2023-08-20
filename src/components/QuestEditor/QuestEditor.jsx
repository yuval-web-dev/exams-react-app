import React, { useState, useRef, useImperativeHandle, forwardRef } from "react"
import {
  Row, Col,
  Form,
  Card,
  InputGroup,
  ButtonGroup, Button,
  Tooltip,
  OverlayTrigger,
  ListGroup
} from "react-bootstrap"
import CodeEditor from "@uiw/react-textarea-code-editor"
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import RangeSlider from "react-bootstrap-range-slider"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import { BsArrowReturnLeft } from "react-icons/bs"
import { GoTrash } from "react-icons/go"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"

import consts from "./consts.js"
import * as state from "./states.ts"
import { Txt, Img, OpenEnded, CloseEnded } from "../../classes.ts"


const QuestEditor = forwardRef(({ type }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if (format === "text") {
        if (text === state.text) {
          throw "no text entered"
        }
        if (attachCode && code === state.code) {
          throw "no code entered"
        }
      }
      else { // format === "image"
        if ((image === state.image)) {
          throw "no image selected"
        }
      }
      if (type === "closed") {
        if (answers === state.answers) {
          throw "no answers entered"
        }
        if (answers.length < 2) {
          throw "less than 2 answers"
        }
        if (correct === state.correct) {
          throw "no correct answer selected"
        }
      }
    },
    yield() {
      var body
      if (format === "text") {
        body = new Txt(
          text,
          code === state.code ? null : { lang: lang, val: code }
        )
      }
      else { // format === "image"
        body = new Img(image)
      }

      if (type === "closed") {
        return new CloseEnded(
          body,
          answers,
          correct,
          shuffle
        )
      }
      else { // type === "open"
        return new OpenEnded(
          body,
          points
        )
      }
    }
  }))

  const [format, setFormat] = useState(state.format)
  const [text, setText] = useState(state.text)
  const [image, setImage] = useState(state.image)
  const [code, setCode] = useState(state.code)
  const [lang, setLang] = useState(state.lang)
  const [points, setPoints] = useState(state.points)

  const [attachCode, setAttachCode] = useState(false)

  const imageInputRef = useRef()
  const codeEditorRef = useRef()


  const [answers, setAnswers] = useState(state.answers)
  const [correct, setCorrect] = useState(state.correct)
  const [shuffle, setShuffle] = useState(state.shuffle)
  const [checked, setChecked] = useState([])

  const answerFormRef = useRef()
  const checkAllRef = useRef()

  const Control = () => {
    const divClass = "d-flex flex-column me-2"

    const FormatSwitch = () => {
      const handleChangeFormat = () => {
        if (format === "image") {
          setFormat("text")
        }
        if (format === "text") {
          setFormat("image")
        }
      }

      return (
        <div className={divClass}>
          <small>Format</small>
          <BootstrapSwitchButton
            size="sm"
            checked={format === "image"}
            width="100"
            offlabel="Text"
            onlabel="Image"
            onChange={handleChangeFormat} />
        </div>
      )
    }

    const AttachCodeSwitch = () => {
      const handleCodeToggle = () => {
        setAttachCode(!attachCode)
      }

      return (
        <div className={divClass}>
          <small>Attach Code</small>
          <BootstrapSwitchButton
            checked={attachCode}
            width="100"
            size="sm"
            offlabel="No"
            onlabel="Yes"
            onChange={handleCodeToggle} />
        </div>
      )
    }

    const AppearanceSwitch = () => {
      const handleSwitchOrder = () => {
        setShuffle(!shuffle)
      }

      return (
        <div className={divClass}>
          <small>Appearance</small>
          <BootstrapSwitchButton
            size="sm"
            checked={shuffle}
            width="100"
            offlabel="Ordered"
            onlabel="Shuffled"
            onstyle="warning"
            onChange={handleSwitchOrder} />
        </div>
      )
    }

    return (
      <Row>
        <Col className="d-flex justify-content-start">
          {FormatSwitch()}
          {type === "closed" ? AppearanceSwitch() : null}
          {format === "text" ? AttachCodeSwitch() : null}
        </Col>
      </Row>
    )
  }

  const Body = () => {
    const handleChangeText = (newText) => {
      setText(newText)
    }

    const handleImageUpload = async (e) => {
      const newImage = e.target.files[0]
      setImage(newImage)
    }

    if (format === "text") {
      return (
        <Form>
          <Form.Label><small>Text</small></Form.Label>
          <Form.Control
            value={text}
            spellCheck
            pattern={consts.answerPattern}
            onChange={e => handleChangeText(e.target.value)} />
        </Form>
      )
    }
    else {
      return (
        <Form>
          <Form.Label><small>Image</small></Form.Label>
          <Form.Control
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple={false}
            onChange={e => handleImageUpload(e)} />
        </Form>

      )
    }
  }

  const CodeForm = () => {
    const handleChangeLang = (lang) => {
      setLang(lang)
    }

    const handleChangeCode = (newCode) => {
      setCode(newCode)
    }

    return (
      <Form>
        <Row>
          <Col className="d-flex justify-content-end">
            <small className="me-auto">Code</small>
            <Form.Select
              size="sm"
              style={{ width: "125px" }}
              onChange={e => handleChangeLang(e.target.value)}>
              <option value="plaintext">Plaintext</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="bash">Bash</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <CodeEditor
              ref={codeEditorRef}
              style={{ fontSize: 13, fontFamily: "Hack" }}
              data-color-mode="light"
              language={lang}
              placeholder="happy hacking!"
              value={code}
              onChange={e => handleChangeCode(e.target.value)} />
          </Col>
        </Row>

      </Form>
    )
  }

  const AnswerForm = () => {
    const handleAnswerAdd = () => {
      const newAnswer = answerFormRef.current.value.trim()
      if (newAnswer === "") {
        return
      }
      if (answers.includes(newAnswer)) {
        // TODO add a modal to inform answer already exists
        return
      }
      else {
        setAnswers([...answers, newAnswer])
        answerFormRef.current.value = ""
      }
    }

    return (
      <Form>
        <Form.Label><small>Answer</small></Form.Label>
        <InputGroup>
          <Form.Control
            ref={answerFormRef}
            spellCheck
            pattern="[A-Za-z0-9]+" />
          <Button
            style={{ width: "50px" }}
            size="sm"
            onClick={handleAnswerAdd}
            variant="outline-primary">
            <BsArrowReturnLeft />
          </Button>
        </InputGroup >
      </Form>
    )
  }

  const PointsSlider = () => {
    const handleChangePoints = (newPoints) => {
      setPoints(newPoints)
    }

    return (
      <Form>
        <Row>
          <Col>
            <small>Points</small>
          </Col>
        </Row>
        <Row>
          <Col>
            <RangeSlider
              value={points}
              step={5}
              min={5}
              max={100}
              tooltipPlacement="bottom"
              tooltip="auto"
              onChange={e => handleChangePoints(e.target.value)}></RangeSlider>
          </Col>
        </Row>
      </Form>
    )
  }

  const AnswerListGroup = () => {
    const Control = () => {
      const handleMoveUp = () => {
        const idx = answers.indexOf(checked[0])
        if (idx > 0) {
          var newAnswers = [...answers]
          const replaced = newAnswers[idx - 1]
          newAnswers[idx - 1] = checked[0]
          newAnswers[idx] = replaced
          setAnswers(newAnswers)
        }
      }

      const handleMoveDown = () => {
        const idx = answers.indexOf(checked[0])
        if (idx < (answers.length - 1)) {
          var newAnswers = [...answers]
          const replaced = newAnswers[idx + 1]
          newAnswers[idx + 1] = checked[0]
          newAnswers[idx] = replaced
          setAnswers(newAnswers)
        }
      }

      const handleRemove = () => {
        setAnswers(answers.filter(i => !checked.includes(i)))
        if (checked.includes(correct)) {
          setCorrect(state.correct)
        }
        setChecked([])
        checkAllRef.current.checked = false
      }

      const handleCheckAll = (e) => {
        if (!e.target.checked) {
          setChecked([])
        }
        else {
          setChecked(answers)
        }
      }

      const noneChecked = checked.length === 0
      const multipleChecked = checked.length > 1

      return (
        <Row>
          <Col className="d-flex align-items-center justify-content-end">
            <Form.Check
              className="me-auto"
              ref={checkAllRef}
              type="checkbox"
              disabled={answers.length < 1}
              onChange={e => handleCheckAll(e)} />

            <ButtonGroup
              vertical
              className="me-1">
              <Button
                style={{ width: "60px", height: "25px" }}
                className="p-0"
                disabled={noneChecked || multipleChecked}
                variant="outline-secondary"
                onClick={handleMoveUp}>
                <AiOutlineArrowUp />
              </Button>
              <Button
                style={{ width: "60px", height: "25px" }}
                className="p-0"
                disabled={noneChecked || multipleChecked}
                variant="outline-secondary"
                onClick={handleMoveDown}>
                <AiOutlineArrowDown />
              </Button>
            </ButtonGroup>

            <Button
              disabled={noneChecked}
              style={{ width: "60px", height: "50px" }}
              variant="outline-danger"
              onClick={handleRemove}>
              <GoTrash />
            </Button>
          </Col>
        </Row>
      )
    }

    const handleChangeCheckbox = (answer) => {
      if (checked.includes(answer)) {
        setChecked(checked.filter(i => i !== answer))
      }
      else {
        setChecked([...checked, answer])
      }
    }

    const handleClickItem = (answer) => {
      if (answer === correct) {
        setCorrect(state.correct)
      }
      else {
        setCorrect(answer)
      }
    }

    return (
      <React.Fragment>
        <Row>
          <Col>
            <small>Answers</small>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                {Control()}
              </ListGroup.Item>
              {answers.map((answer, idx) => (
                <ListGroup.Item
                  key={idx}
                  action
                  variant={answer === correct ? "success" : "danger"}>
                  <Row>
                    <Col xs="1">
                      <Form.Check
                        type="checkbox"
                        checked={checked.includes(answer)}
                        onChange={() => handleChangeCheckbox(answer)} />
                    </Col>
                    <Col onClick={() => handleClickItem(answer)}>
                      {`${idx + 1}. ${answer}`}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </React.Fragment>

    )
  }


  return (
    <ListGroup>
      <ListGroup.Item>
        {Control()}
      </ListGroup.Item>
      <ListGroup.Item>
        {Body()}
      </ListGroup.Item>
      <ListGroup.Item
        className=""
        style={attachCode && format === "text" ? {} : { display: "none" }}>
        {CodeForm()}
      </ListGroup.Item>
      {type === "closed" ?
        <React.Fragment>
          <ListGroup.Item>
            {AnswerForm()}
          </ListGroup.Item>
          <ListGroup.Item>
            {AnswerListGroup()}
          </ListGroup.Item>
        </React.Fragment>
        :
        <ListGroup.Item>
          {PointsSlider()}
        </ListGroup.Item>
      }
    </ListGroup>
  )
})

export default QuestEditor