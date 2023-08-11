import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react"
import { ListGroup, Form, Dropdown, DropdownButton, Modal, Row, Col, Image, Table, Button, ButtonGroup, Nav } from "react-bootstrap"

import ImageModal from "./ImageModal"
import QuestForm from "./QuestForm"

const QuestsList = forwardRef(({ }, ref) => {
  useImperativeHandle(ref, () => ({
    error() {
      return quests.length === 0
    },
    yieldArr() {
      return quests
    }
  }))

  const defaultStates = {
    quests: [],
    shuffle: false,
    questModalShow: false,
    checked: []
  }

  const defaultRefs = {
    questFormRef: null,
    fileInputRef: null
  }

  const [quests, setQuests] = useState(defaultStates.quests)
  const [shuffle, setShuffle] = useState(defaultStates.shuffle)
  const [questModalShow, setQuestModalShow] = useState(defaultStates.questModalShow)
  const [checked, setChecked] = useState(defaultStates.checked)

  const questFormRef = useRef(defaultRefs.questFormRef)
  const fileInputRef = useRef(defaultRefs.fileInputRef)

  // const MapAnswers = (question) => (
  //   <ol>{
  //     question.answers.map(answer => {
  //       return (
  //         <li
  //           key={answer}
  //           style={answer === question.correct ? { color: "green", fontWeight: "bold" } : {}}>
  //           {answer}
  //         </li>
  //       )
  //     })
  //   }
  //   </ol>
  // )

  const handleExport = () => {
    checked.forEach((item, index) => {
      const json = JSON.stringify(item)
      const element = document.createElement("a")
      element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(json))
      element.setAttribute("download", `question_${index + 1}.json`) // Adding index to the filename
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    });
  }

  const handleImport = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return
    }
    const importedQuests = []
    const readAndParseFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target.result
          try {
            const parsedObject = JSON.parse(content)
            resolve(parsedObject)
          } catch (error) {
            reject(`Error parsing JSON from ${file.name}: ${error}`)
          }
        }
        reader.onerror = () => {
          reject(`Error reading ${file.name}`)
        }
        reader.readAsText(file)
      })
    }
    try {
      for (const file of files) {
        const parsedObject = await readAndParseFile(file);
        importedQuests.push(parsedObject);
      }
      setQuests([...quests, ...importedQuests]);
      event.target.value = null;
    } catch (error) {
      console.error(error);
    }
  }

  const handleMoveUp = () => {
    const idx = quests.indexOf(checked[0])
    if (idx > 0) {
      var newQuests = [...quests]
      const replaced = newQuests[idx - 1]
      newQuests[idx - 1] = checked[0]
      newQuests[idx] = replaced
      setQuests(newQuests)
    }
  }

  const handleMoveDown = () => {
    const idx = quests.indexOf(checked[0])
    if (idx < (quests.length - 1)) {
      var newQuests = [...quests]
      const replaced = newQuests[idx + 1]
      newQuests[idx + 1] = checked[0]
      newQuests[idx] = replaced
      setQuests(newQuests)
    }
  }

  const handleRemove = () => {
    setQuests(quests.filter(i => !checked.includes(i)))
    setChecked(defaultStates.checked)
  }

  const handleCheckboxChange = (quest) => {
    if (checked.includes(quest)) {
      setChecked(checked.filter(i => i !== quest))
    }
    else {
      setChecked([...checked, quest])
    }
  }

  const handleQuestModalSave = () => {
    if (questFormRef.current.error()) {
      alert("Please fill question form as intended.")
      return
    }
    const questObj = questFormRef.current.yieldObj()
    setQuests([...quests, questObj])
    setQuestModalShow(false)
  }

  const handleImageLinkClick = (question) => {
    // setShowImageModal(true)
  }

  const QuestModal = () => (
    <Modal
      show={questModalShow}
      size="lg">
      <Modal.Header>
        <Modal.Title>
          New Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QuestForm ref={questFormRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setQuestModalShow(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleQuestModalSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const AddDropdown = () => (
    <DropdownButton
      size="sm"
      drop="up"
      title="Add">
      <Dropdown.Item
        as="button"
        onClick={() => { setQuestModalShow(true) }}>
        Create your own
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        onClick={() => fileInputRef.current.click()}>
        From JSON
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        onClick={() => { }}>
        From API
      </Dropdown.Item>
    </DropdownButton>
  )

  const ActionBar = () => {
    const single = checked.length === 1
    const multiple = checked.length > 0
    return (
      <Row>
        <Col className="d-flex justify-content-end">
          {AddDropdown()}
          <Button
            className="me-auto"
            size="sm"
            variant={shuffle ? "warning" : "light"}
            onClick={() => setShuffle(!shuffle)}>
            {shuffle ? "Shuffled" : "Ordered"}
          </Button>
          <Button
            disabled={!multiple}
            size="sm"
            variant="light"
            onClick={handleExport}>
            Export JSON
          </Button>
          <Button
            disabled={!single}
            size="sm"
            variant="light"
            onClick={handleMoveUp}>
            Move up
          </Button>
          <Button
            disabled={!single}
            size="sm"
            variant="light"
            onClick={handleMoveDown}>
            Move down
          </Button>
          <Button
            disabled={!multiple}
            size="sm"
            variant="outline-danger"
            onClick={handleRemove}>
            Remove
          </Button>
        </Col>
      </Row>
    )
  }

  const QuestsListGroup = () => (
    <ListGroup>
      {quests.map((quest, idx) => (
        <ListGroup.Item
          key={idx}
          action
          variant="light"
          style={{ cursor: "default" }}>
          <Row>
            <Col xs="1">
              <Form.Check
                type="checkbox"
                checked={checked.includes(quest)}
                onChange={() => handleCheckboxChange(quest)} />
            </Col>
            <Col xs="1">
              {idx + 1}
            </Col>
            <Col>
              {quest.body}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )

  const JsonInput = () => (
    <input
      type="file"
      multiple
      onChange={handleImport}
      accept=".json"
      style={{ display: 'none' }}
      ref={fileInputRef} />
  )

  return (
    <React.Fragment>
      {QuestModal()}
      <Row>
        <Col xs="12">
          {ActionBar()}
        </Col>
        <Col xs="12">
          {QuestsListGroup()}
        </Col>
      </Row>
      {JsonInput()}
    </React.Fragment>
  )
})

export default QuestsList