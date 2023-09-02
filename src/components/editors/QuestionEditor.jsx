import React from "react"
import { ListGroup, Form, Row, Col, InputGroup, Button } from "react-bootstrap"

import { Lists } from "../editingLists"

// import CodeEditor from "@uiw/react-textarea-code-editor"
import { BootstrapSwitchButton as BsSwitch } from "bootstrap-switch-button-react"
import RangeSlider from "react-bootstrap-range-slider"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import { BsArrowReturnLeft } from "react-icons/bs"


const QuestionEditor = ({ }, ref) => {
  // useImperativeHandle(ref, () => ({
  //   validate() {
  //     if (format === "text") {
  //       if (text === state.text) {
  //         throw "no text entered"
  //       }
  //       if (attachCode && code === state.code) {
  //         throw "no code entered"
  //       }
  //     }
  //     else { // format === "image"
  //       if ((image === state.image)) {
  //         throw "no image selected"
  //       }
  //     }
  //     if (type === "closed") {
  //       if (answers === state.answers) {
  //         throw "no answers entered"
  //       }
  //       if (answers.length < 2) {
  //         throw "less than 2 answers"
  //       }
  //       if (correct === state.correct) {
  //         throw "no correct answer selected"
  //       }
  //     }
  //   },
  //   yield() {
  //     var body
  //     if (format === "text") {
  //       body = new Txt(
  //         text,
  //         code === state.code ? null : { lang: lang, val: code }
  //       )
  //     }
  //     else { // format === "image"
  //       body = new Img(image)
  //     }

  //     if (type === "closed") {
  //       return new CloseEnded(
  //         body,
  //         answers,
  //         correct,
  //         shuffle
  //       )
  //     }
  //     else { // type === "open"
  //       return new OpenEnded(
  //         body,
  //         points
  //       )
  //     }
  //   }
  // }))

  const [inputs, setInputs] = React.useState(
    {
      text: "",
      points: 5,
      answers: [],
      correct: "",
      shuffle: false
    }
  )

  const [checkedAnswers, setCheckedAnswers] = React.useState([])

  const answerSubformRef = React.useRef()
  const checkAllRef = React.useRef()
  const answersEditingRef = React.useRef()

  // const handleImageUpload = async (e) => {
  //   const newImage = e.target.files[0]
  //   setImage(newImage)
  // }
  // <Form>
  //   <Form.Label><small>Image</small></Form.Label>
  //   <Form.Control
  //     ref={imageInputRef}
  //     type="file"
  //     accept="image/*"
  //     multiple={false}
  //     onChange={e => handleImageUpload(e)} />
  // </Form>

  const handleChangeInput = (event) => {
    setInputs(...inputs, { [event.target.name]: event.target.value })
  }

  const ShuffleSwitch = ({ inputs }) => {
    const handleSwitch = (event) => {
      event.preventDefault()
      alert("BsSwitch switched!")
    }
    return (
      <ListGroup.Item className={"d-flex flex-column me-2"}>
        <small>Appearance</small>
        <BsSwitch
          name="shuffle"
          size="sm"
          checked={inputs.shuffle}
          width="100"
          offlabel="Ordered"
          onlabel="Shuffled"
          onstyle="warning"
          onChange={handleSwitch} />
      </ListGroup.Item>
    )
  }

  const TextSubform = ({ inputs, handler }) => {

    return (
      <ListGroup.Item>
        <Form>
          <Form.Label><small>Text</small></Form.Label>
          <Form.Control
            name="text"
            value={inputs.text}
            onChange={handler} />
        </Form>
      </ListGroup.Item>
    )
  }

  // const CodeForm = () => {
  //   const handleChangeLang = (lang) => {
  //     setLang(lang)
  //   }

  //   const handleChangeCode = (newCode) => {
  //     setCode(newCode)
  //   }

  //   return (
  //     <Form>
  //       <Row>
  //         <Col className="d-flex justify-content-end">
  //           <small className="me-auto">Code</small>
  //           <Form.Select
  //             size="sm"
  //             style={{ width: "125px" }}
  //             onChange={e => handleChangeLang(e.target.value)}>
  //             <option value="plaintext">Plaintext</option>
  //             <option value="python">Python</option>
  //             <option value="javascript">JavaScript</option>
  //             <option value="cpp">C++</option>
  //             <option value="java">Java</option>
  //             <option value="bash">Bash</option>
  //           </Form.Select>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col>
  //           <CodeEditor
  //             ref={codeEditorRef}
  //             style={{ fontSize: 13, fontFamily: "Hack" }}
  //             data-color-mode="light"
  //             language={lang}
  //             placeholder="happy hacking!"
  //             value={code}
  //             onChange={e => handleChangeCode(e.target.value)} />
  //         </Col>
  //       </Row>

  //     </Form>
  //   )
  // }

  const AnswerSubform = React.forwardRef(({ }, ref) => {
    const handleAnswerAdd = () => {
      alert("clicked answer add")
      // const newAnswer = answerFormRef.current.value.trim()
      // if (newAnswer === "") {
      //   return
      // }
      // if (answers.includes(newAnswer)) {
      //   // TODO add a modal to inform answer already exists
      //   return
      // }
      // else {
      //   setAnswers([...answers, newAnswer])
      //   answerFormRef.current.value = ""
      // }
    }

    return (
      <Form>
        <Form.Label><small>Answer</small></Form.Label>
        <InputGroup>
          <Form.Control ref={ref} />
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
  })

  const PointsSlider = ({ inputs, handler }) => {
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
              name="points"
              value={inputs.points}
              step={5}
              min={5}
              max={100}
              tooltipPlacement="bottom"
              tooltip="auto"
              onChange={handler} />
          </Col>
        </Row>
      </Form>
    )
  }

  return (
    <ListGroup>
      <ShuffleSwitch inputs={inputs} />

      <TextSubform inputs={inputs} handler={handleChangeInput} />

      <PointsSlider inputs={inputs} handler={handleChangeInput} />

      <AnswerSubform ref={answerSubformRef} />

      <Lists.AnswersEditing answers={inputs.answers} ref={answersEditingRef} />

    </ListGroup>
  )
}

export default React.forwardRef(QuestionEditor)


// <Editors.Question type={type} ref={editorRef} />