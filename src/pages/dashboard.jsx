import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap'

import { SiteNav } from '../components'

import * as storage from '../utils/storage'
import { useIsAuthenticated } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {
  const defaultStates = {
    exams: [],
    checked: []
  }
  const [exams, setExams] = useState(defaultStates.exams)
  const [checked, setChecked] = useState(defaultStates.checked)


  useEffect(() => {
    const fetchLocalExams = async () => {
      const exams = await storage.fetch()
      setExams(exams)
    }
    fetchLocalExams()
  }, [])


  const handleCheckbox = (exam) => {
    if (checked.includes(exam)) {
      setChecked(checked.filter(i => i !== exam))
    }
    else {
      setChecked([...checked, exam])
    }
  }


  const handleRemove = () => {
    const removeLocalExams = async () => {
      await storage.remove(checked.map(exam => exam.id))
    }
    setExams(exams.filter(exam => !checked.includes(exam)))
    removeLocalExams()
    setChecked(defaultStates.checked)
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


  const ActionBar = () => (
    <Row>
      <Col className="d-flex justify-content-end">
        <Button
          className="me-auto"
          variant="light">
          from JSON
        </Button>
        <Button
          variant="outline-danger"
          disabled={checked.length < 1}
          onClick={() => handleRemove()}>
          Remove
        </Button>
      </Col>
    </Row>
  )


  const ExamList = () => (
    <ListGroup>
      {exams.map((exam, idx) => (
        <ListGroup.Item
          key={idx}
          action
          variant="light"
          style={{ cursor: "default" }}>
          <Row>
            <Col xs="1">
              <Form.Check
                type="checkbox"
                checked={checked.includes(exam)}
                onChange={() => handleCheckbox(exam)} />
            </Col>
            <Col xs="3">
              {exam.metadata.subject}
            </Col>
            <Col xs="2">
              by {exam.metadata.author.surname}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )


  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs="12">
            <h1>My Exams</h1>
          </Col>
        </Row>
        {ActionBar()}
        {ExamList()}
      </Container>
    </React.Fragment>
  )
}



export default Dashboard