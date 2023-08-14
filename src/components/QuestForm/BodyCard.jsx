import React, { useState, useRef, useImperativeHandle, forwardRef } from "react"
import {
  Row, Col,
  Form,
  ButtonGroup,
  Card,
  ToggleButton,
  OverlayTrigger, Tooltip
} from "react-bootstrap"
import CodeEditor from "@uiw/react-textarea-code-editor"

import { BsImage, BsCodeSlash } from "react-icons/bs"
import { LuTextCursorInput } from "react-icons/lu"

import consts from "./consts.js"

import { testStringPattern } from "./helpers.js"

const BodyCard = forwardRef(({ }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if ((type === "text" && text === defaultStates.text) ||
        (type === "image" && image === defaultStates.image)) {
        throw "err"
      }
    },
    yield() {
      return {
        type: type,
        body: type === "text" ? text : image,
        code: codeInput === "" ? null : { lang: codeLang, val: codeInput }
      }
    }
  }))

  const defaultStates = {
    type: "text",
    text: "",
    image: null,
    showCodeEditor: false,
    codeLang: "plaintext",
    codeInput: ""
  }

  const [type, setType] = useState(defaultStates.type)
  const [text, setText] = useState(defaultStates.text)
  const [image, setImage] = useState(defaultStates.image)
  const [showCodeEditor, setShowCodeEditor] = useState(defaultStates.showCodeEditor)
  const [codeLang, setCodeLang] = useState(defaultStates.codeLang)
  const [codeInput, setCodeInput] = useState(defaultStates.codeInput)

  const imageInputRef = useRef()
  const codeEditorRef = useRef()

  const handleTextBtnToggle = () => {
    if (type === "image") {
      setType("text")
      setImage(defaultStates.image)
    }
  }

  const handleImageBtnToggle = () => {
    if (type === "text") {
      setType("image")
      setText(defaultStates.text)
    }
  }

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
        if (codeInput !== defaultStates.codeInput) {
          if (!window.confirm("Discard changes?")) {
            return
          }
        }
        setShowCodeEditor(false)
        setCodeInput("")
      } else {
        setShowCodeEditor(true)
      }
    };


    const handleChangeLang = (lang) => {
      setCodeLang(lang)
    }

    const SimpleCodeEditor = () => (
      <CodeEditor
        ref={codeEditorRef}
        style={showCodeEditor ? { fontSize: 12, backgroundColor: "whitesmoke", fontFamily: "Hack" } : { display: "none" }}
        data-color-mode="light"
        language={codeLang}
        placeholder="happy hacking!"
        value={codeInput}
        onChange={e => setCodeInput(e.target.value)} />
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


  return (
    <Card>
      <Card.Header className="d-flex align-items-center">
        <h5 className="me-auto">
          Body
        </h5>
        <ButtonGroup toggle>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Text</Tooltip>}>
            <ToggleButton
              className="border"
              type="checkbox"
              variant="light"
              checked={type === "text"}
              onClick={handleTextBtnToggle}>
              <LuTextCursorInput />
            </ToggleButton>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Image</Tooltip>}>
            <ToggleButton
              className="border"
              type="checkbox"
              variant={type === "image" ? "primary" : "light"}
              checked={type === "image"}
              onClick={handleImageBtnToggle}>
              <BsImage />
            </ToggleButton>
          </OverlayTrigger>

        </ButtonGroup>

      </Card.Header>

      <Card.Body>
        {type === "text" ? TextInput() : ImageInput()}
      </Card.Body>
    </Card>
  )
})

export default BodyCard
