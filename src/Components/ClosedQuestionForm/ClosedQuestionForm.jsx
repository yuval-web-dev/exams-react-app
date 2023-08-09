import React, { useState, useRef, useEffect } from "react"
import { Row, Col, Form, Button, Image as BootstrapImage, ButtonGroup, Table, Container } from "react-bootstrap"
import BootstrapSwitchButton from "bootstrap-switch-button-react"

// Javascript
import { ClosedQuestion } from "../../classes.ts"
import { saveImageToCache, getImageFromCache } from "../helpers"
import consts from "./consts"
import { BottomControlBar } from "../index"

// Assets
import { green, red } from "../../assets/svg"

const ClosedQuestionForm = ({ onSave, onDiscard, question }) => {
  // States
  const [isEditing, setIsEditing] = useState(false) // "true" if the user was redirected here by clicking "Edit" in the "all" tab.
  const [jsonImport, setJsonImport] = useState(null) // The actual JSON file uploaded via input
  const [jsonExport, setJsonExport] = useState("") // The name of the to-be exported JSON file

  // Form values states
  const [type, setType] = useState("text")
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)

  // const [imageUrl, setImageUrl] = useState(null)
  const [answers, setAnswers] = useState([])
  const [correct, setCorrect] = useState(null)
  const [shuffle, setShuffle] = useState(false)

  // Refs
  const jsonInputRef = useRef(null)
  const imageInputRef = useRef(null)
  const answerFormRef = useRef(null)

  // UseEffect
  // const effect = () => {
  //   if (question !== null) {
  //     setIsEditing(true)
  //     setBody(question.body)
  //     setImg(question.image)
  //     setAnswers(question.answers)
  //     setCorrect(question.correctAnswers)
  //     setShuffle(question.isRandomized)
  //   }
  // }
  // const dependancy = [question]
  // useEffect(effect, dependancy)

  // Handlers
  const handleImageChange = async (e) => {
    // Set the states
    const newImage = e.target.files[0]
    setImage(newImage)
    // setImageUrl(URL.createObjectURL(newImage))

    // // Save image to cache
    // await saveImageToCache(newImage)

    // // Update the input to be empty to allow same file consecutive upload
    // imageInputRef.current.value = ""
  }

  const handleImageClear = () => {
    setImage(null)
    imageInputRef.current.value = ""
  }

  const testStringPattern = (s, pattern) => {
    const patternRegex = new RegExp(pattern)
    return patternRegex.test(s)
  }

  const handleAddAnswer = () => {
    const newAnswer = answerFormRef.current.value.trim()
    if (testStringPattern(newAnswer) === false) {
      return
    }
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

  const handleAnswerDiscard = (idx, answerToDiscard) => {
    const newAnswers = [...answers]
    newAnswers.splice(idx, 1)
    setAnswers(newAnswers)
    if (correct === answerToDiscard) {
      setCorrect(null)
    }
  }

  const handleQuestionDiscard = () => {
    // TODO popup window: "are you sure?"
    // onDiscard()
    // cleanForm()
  }

  const handleQuestionSave = () => {
    // sanity check
    if (answers.length < 2) {
      // popup modal
      return
    }
    if (type === "text" && correct === null) {
      // popup modal
      return
    }
    if (type === "image" && image === null) {
      // popup modal
      return
    }

    const newQuestion = new ClosedQuestion(
      type === "text" ? text : image,
      answers,
      correct,
      shuffle
    )

    onSave(newQuestion)
    // cleanForm()
  }

  const handleMoveUp = (answer, idx) => {
    if (idx > 0) {
      let newAnswers = [...answers]
      const replaced = newAnswers[idx - 1]
      newAnswers[idx - 1] = answer
      newAnswers[idx] = replaced
      setAnswers(newAnswers)
    }
  }

  const handleMoveDown = (answer, idx) => {
    if (idx < (answers.length - 1)) {
      let newAnswers = [...answers]
      const replaced = newAnswers[idx + 1]
      newAnswers[idx + 1] = answer
      newAnswers[idx] = replaced
      setAnswers(newAnswers)
    }
  }

  // const handleJsonChange = (newFile) => {
  //   const allowedTypes = ["application/json"]
  //   if (newFile === undefined) {
  //     return
  //   }
  //   else if (!allowedTypes.includes(newFile?.type)) {
  //     alert(`Allowed file types: ${[...allowedTypes]}`)
  //     setJsonImport(null)
  //   }
  //   else {
  //     setJsonImport(newFile)
  //   }
  //   jsonInputRef.current.value = ""
  // }

  // const handleJsonImport = () => {
  //   // const reader = new FileReader()

  //   // reader.onload = async (e) => {
  //   //   const jsonParsed = JSON.parse(e.target.result)
  //   //   const keys = Object.keys(jsonParsed)
  //   //   const possibleKeys = ["body", "image", "answers", "corrects", "isRandomized"]
  //   //   if (!keys.every(key => (possibleKeys.includes(key)))) {
  //   //     alert("bad JSON!")
  //   //     return
  //   //   }
  //   //   if (jsonParsed.hasOwnProperty("body")) {
  //   //     setBody(jsonParsed.body)
  //   //   }
  //   //   if (jsonParsed.hasOwnProperty("image")) {
  //   //     const imageName = jsonParsed.image
  //   //     const storedImageBlob = await getImageFromCache(imageName) // Returns Blob

  //   //     if (storedImageBlob === null) {
  //   //       alert(`Could not find "${imageName}" in cache`)
  //   //     }
  //   //     else {
  //   //       // const storedImageData = URL.createObjectURL(storedImageBlob)
  //   //       // const storedImage = new Image()
  //   //       // storedImage.onload = () => {
  //   //       //   setImageUrl(storedImage)
  //   //       // }
  //   //       // storedImage.src = storedImageData
  //   //       // setImageUrl(storedImageData)
  //   //       const storedImageData = URL.createObjectURL(storedImageBlob)
  //   //       const storedImage = new Image()
  //   //       storedImage.src = storedImageData
  //   //       setImageUrl(storedImage)
  //   //     }
  //   //   }
  //   //   if (jsonParsed.hasOwnProperty("answers")) {
  //   //     setAnswers(jsonParsed.answers)
  //   //   }

  //   //   if (jsonParsed.hasOwnProperty("corrects")) {
  //   //     setCorrect(jsonParsed.corrects)
  //   //   }

  //   //   if (jsonParsed.hasOwnProperty("isRandomized")) {
  //   //     setShuffle(jsonParsed.isRandomized)
  //   //   }
  //   // }
  //   // reader.readAsText(jsonImport)

  //   // setJsonImport(null)
  // }

  // const handleJsonExport = () => {
  //   // const data = {
  //   //   body,
  //   //   image: img.name,
  //   //   answers,
  //   //   corrects: correct,
  //   //   isRandomized: shuffle
  //   // }
  //   // const json = JSON.stringify(data)
  //   // const element = document.createElement("a")
  //   // element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(json))
  //   // // element.setAttribute("download", `${jsonName === "" ? "question" : jsonName}.json`)
  //   // element.setAttribute("download", `${jsonExport === "" ? "untitled_question" : jsonExport}.json`)
  //   // element.style.display = "none"
  //   // document.body.appendChild(element)
  //   // element.click()
  //   // document.body.removeChild(element)
  // }

  const style = {
    correct: { backgroundColor: `rgba(80, 224, 120, 0.1)` },
    wrong: { backgroundColor: `rgba(224, 80, 80, 0.1)` }
  }

  const buttonVariant = "outline-light"

  const AnswersTable = () => (
    <Table
      hover={true}
      responsive={true}>
      <tbody>
        {answers.map((answer, idx) => {
          return (
            <tr
              key={answer}
              style={answer === correct ? style.correct : style.wrong}>
              <td>
                <Button
                  variant={buttonVariant}
                  onClick={() => setCorrect(answer)}>
                  <img
                    src={correct === answer ? green : red}
                    height="30px" />
                </Button>
              </td>
              <td className="w-100">
                {answer}
              </td>
              <td>
                <ButtonGroup>
                  <Button
                    variant={buttonVariant}
                    onClick={() => handleMoveUp(answer, idx)}>
                    ⯅
                  </Button>
                  <Button
                    variant={buttonVariant}
                    onClick={() => handleMoveDown(answer, idx)}>
                    ⯆
                  </Button>
                  <Button
                    variant={buttonVariant}
                    onClick={() => handleAnswerDiscard(idx, answer)}>
                    Discard
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          )
        })}
      </tbody>

    </Table>
  )

  const cleanForm = () => {
    // setIsEditing(false)

    // setBody("")
    // setImg(null)
    // setAnswers([])
    // setCorrect([])
    // setShuffle(false)

    // setJsonImport(null)
    // setJsonExport("")

    // jsonInputRef.current.value = ""
    // imageInputRef.current.value = ""
    // answerFormRef.current.value = ""
  }

  const ImageInput = () => (
    <Form.Control
      ref={imageInputRef}
      type="file"
      accept="image/*"
      multiple={false}
      onChange={handleImageChange} />
  )

  const ImageClearButton = () => (
    <Button
      variant="light"
      onClick={handleImageClear}>Clear</Button>
  )

  const TextInput = () => (
    <Form.Control
      required={true}
      type="text"
      spellCheck={true}
      pattern={consts.answerPattern}
      onChange={e => setText(e.target.value)} />
  )

  const TextClearButton = () => (
    <Button
      variant="light"
      onClick={() => { setText("") }}>Clear</Button>
  )

  const onTypeChange = () => {
    if (type === "text") { // from text to image
      setType("image")
      setText("")
    }
    else { // from image to text
      setType("text")
      setImage(null)
    }
  }

  const rowClass = "align-items-center"

  const TypeAndBodyRow = () => (
    <Row className={rowClass}>
      <Col md={consts.col1}>
        Body
      </Col>
      <Col xs={consts.col2}>
        <Row className={rowClass}>
          <Col xs={10}>
            {type === "text" ? TextInput() : ImageInput()}
          </Col>
          <Col xs={2}>
            <BootstrapSwitchButton
              onstyle="light"
              width={100}
              offlabel="Text"
              onlabel="Image"
              onChange={onTypeChange} />
          </Col>
        </Row>
      </Col>
    </Row>
  )

  const NewAnswerRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1}>
        New Answer
      </Col>
      <Col xs={consts.col2}>
        <Form onSubmit={e => { e.preventDefault(); handleAddAnswer(answerFormRef.current.value) }}>
          <Row className={rowClass}>
            <Col xs={10}>
              <Form.Control
                required={true}
                ref={answerFormRef}
                type="text"
                spellCheck={true}
                pattern="[A-Za-z0-9]+"
              />
            </Col>
            <Col xs={2}>
              <Button
                type="submit"
                variant="outline-primary"
                style={{ width: 100 }}>
                Insert
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )

  const ShuffleRow = () => (
    <Row className={rowClass}>
      <Col xs={consts.col1}>
        Shuffle
      </Col>
      <Col xs={consts.col2}>
        <BootstrapSwitchButton
          checked={shuffle}
          onChange={() => setShuffle(!shuffle)} />
      </Col>
    </Row>
  )

  const AnswersListRow = () => (
    <Row >
      <Col xs={consts.col1}>
        Answers
      </Col>
      <Col xs={consts.col2}>
        {AnswersTable()}
      </Col>
    </Row>

  )

  return (
    <Container>
      {TypeAndBodyRow()}
      {NewAnswerRow()}
      {AnswersListRow()}
      {ShuffleRow()}
      <BottomControlBar
        onDiscard={handleQuestionDiscard}
        onSave={handleQuestionSave} />
    </Container>
  )
}

export default ClosedQuestionForm










    // <Row>
    //   <Col>
    //     <Table borderless>
    //       <tbody>
    //         {/* <tr>
    //           <td>From JSON</td>
    //           <td>
    //             <Form>
    //               <Form.Control
    //                 ref={jsonInputRef}
    //                 type="file"
    //                 accept=".json"
    //                 multiple={false}
    //                 onChange={e => handleJsonChange(e?.target?.files[0])} />
    //             </Form>
    //           </td>
    //           <td>
    //             <Button
    //               disabled={jsonImport === null}
    //               onClick={() => handleJsonImport()}>Import</Button>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>To JSON</td>
    //           <td>
    //             <Form.Control
    //               value={jsonExport}
    //               // This pattern should allow only alnum chars, underscores, and hyphens,
    //               //  with the condition that the string must start with a letter and end with an alnum chars:
    //               pattern="/^[a-zA-Z][\w-]*[a-zA-Z\d]$/"
    //               placeholder="Name the JSON export file..."
    //               onChange={e => setJsonExport(e?.target?.value)}
    //             />
    //           </td>
    //           <td>
    //             <Button onClick={() => handleJsonExport()}>Export</Button>
    //           </td>
    //         </tr> */}
    //         <tr>
    //           <td>
    //             Question Type
    //           </td>
    //           <td>
    //             <BootstrapSwitchButton
    //               onstyle="light"
    //               width={100}
    //               offlabel={"Text"}
    //               onlabel={"Image"}
    //               onChange={onTypeChange} />
    //           </td>
    //         </tr>
    //         {type === "text" ? TextInput() : ImageInput()}
    //         <tr>
    //           <td>New Answer</td>
    //           <td>
    //             <Form.Control
    //               ref={answerFormRef}
    //               type="text"
    //               spellCheck="true"
    //               pattern="[A-Za-z0-9]+" />
    //           </td>
    //           <td>
    //             <ButtonGroup>
    //               <Button
    //                 variant="light"
    //                 onClick={e => answerFormRef.current.value = ""}>Clear</Button>
    //               <Button
    //                 variant="primary"
    //                 onClick={handleAnswerAdd}>Add</Button>
    //             </ButtonGroup>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Shuffle Answers</td>
    //           <td>
    //             <BootstrapSwitchButton
    //               checked={shuffle}
    //               offlabel="No"
    //               onlabel="Yes"
    //               onChange={() => setShuffle(!shuffle)} />
    //           </td>
    //         </tr>
    //       </tbody>
    //     </Table>
    //   </Col>
    //   <Col xs={12}>