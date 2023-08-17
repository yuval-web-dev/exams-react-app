import React, { useState, useRef, useImperativeHandle, forwardRef } from "react"
import {
  Row, Col,
  Form,
  ButtonGroup,
  Card,
  ToggleButton,
  OverlayTrigger, Tooltip,
  ListGroup,
  InputGroup
} from "react-bootstrap"
import CodeEditor from "@uiw/react-textarea-code-editor"
import BootstrapSwitchButton from "bootstrap-switch-button-react"

import { BsImage, BsCodeSlash } from "react-icons/bs"
import { LuTextCursorInput } from "react-icons/lu"

import consts from "../consts.js"
import * as state from "./states.ts"
import { Text, Img } from "../../../classes.ts"

const BodyCard = forwardRef(({ type }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if ((type === "text" && text === state.text) ||
        (type === "image" && image === state.image)) {
        throw "err"
      }
    },
    yield() {
      if (type === "text") {
        if (code !== state.code) {
          return new Text(text)
        }
        else {
          return new Text(text, { lang: lang, val: code })
        }
      }
      else { // type === "image"
        return new Img(image)
      }
    }
  }))

  const [format, setFormat] = useState(state.format)
  const [text, setText] = useState(state.text)
  const [image, setImage] = useState(state.image)
  const [code, setCode] = useState(state.code)
  const [lang, setLang] = useState(state.lang)
  const [pts, setPts] = useState(state.pts)

  const [showCodeEditor, setShowCodeEditor] = useState(false)

  const imageInputRef = useRef()
  const codeEditorRef = useRef()

  const handleImageUpload = async (e) => {
    const newImage = e.target.files[0]
    setImage(newImage)
  }

  const ImageInput = () => (
    <Form.Control
      ref={imageInputRef}
      type="file"
      accept="image/*"
      multiple={false}
      onChange={handleImageUpload} />
  )

  const TextInput = () => {
    const handleCodeToggle = () => {
      if (showCodeEditor) {
        if (code !== state.code) {
          if (!window.confirm("Discard changes?")) {
            return
          }
        }
        setShowCodeEditor(false)
        setCode("")
      } else {
        setShowCodeEditor(true)
      }
    };


    const handleChangeLang = (lang) => {
      setLang(lang)
    }

    const SimpleCodeEditor = () => (
      <CodeEditor
        ref={codeEditorRef}
        style={showCodeEditor ? { fontSize: 12, backgroundColor: "whitesmoke", fontFamily: "Hack" } : { display: "none" }}
        data-color-mode="light"
        language={lang}
        placeholder="happy hacking!"
        value={code}
        onChange={e => setCode(e.target.value)} />
    )

    return (
      <Row>
        <Col xs="12" className="d-flex">
          <Form.Control
            spellCheck
            pattern={consts.answerPattern}
            onChange={e => setText(e.target.value)} />
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Add code</Tooltip>}>
            <ToggleButton
              type="checkbox"
              variant="light"
              disabled={type === "image"}
              checked={showCodeEditor}
              onClick={handleCodeToggle}>
              <BsCodeSlash />
            </ToggleButton>
          </OverlayTrigger>
        </Col>
        <Col xs="12">
          {SimpleCodeEditor()}
        </Col>
        <Col style={showCodeEditor ? {} : { display: "none" }}>
          <Form.Select
            size="sm"
            style={{ width: "125px" }}
            onChange={e => handleChangeLang(e.target.value)}>
            <option value="plaintext">Plaintext</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </Form.Select>
        </Col>
      </Row>
    )
  }

  const FormatPtsForm = () => {
    const PtsForm = () => {
      const handleChangePts = (newPts) => {
        setPts(newPts)
      }

      return (
        <Col xs="6" className="d-flex align-items-center justify-content-start">
          <div>Points</div>
          <input
            style={{ width: "75px" }}
            value={pts}
            class="form-control"
            type="number"
            min="1"
            max="100"
            onChange={e => handleChangePts(e.target.value)}></input>
        </Col>
      )
    }

    const handleChangeFormat = () => {
      if (format === "image") {
        setFormat("text")
        setImage(state.image)
      }
      if (format === "text") {
        setFormat("image")
        setText(state.text)
      }
    }

    return (
      <Row>
        <Col xs="6" className="d-flex align-items-center justify-content-start">
          <div className="me-2">Format</div>
          <BootstrapSwitchButton
            checked={format === "image"}
            width="125"
            offlabel="Text"
            onlabel="Image"
            onChange={handleChangeFormat} />
        </Col>
        {type === "open" ? PtsForm() : null}
      </Row>
    )
  }


  return (
    <Card>
      <Card.Header className="d-flex align-items-center justify-content-center">
        <h5>Body</h5>

      </Card.Header>
      <Card.Body className="p-0">
        <ListGroup>
          <ListGroup.Item>
            {FormatPtsForm()}
          </ListGroup.Item>
          <ListGroup.Item>
            {format === "text" ? TextInput() : ImageInput()}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
})

export default BodyCard
