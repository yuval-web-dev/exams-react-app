import React, { useState, useRef, forwardRef, useImperativeHandle } from "react"
import {
  ListGroup,
  Form,
  Modal,
  Row,
  Col,
  Button, ToggleButton, ButtonGroup,
  Badge,
  OverlayTrigger, Tooltip,
} from "react-bootstrap"
import { GoTrash, GoPencil, GoListOrdered } from "react-icons/go"
import { TfiImport, TfiExport } from "react-icons/tfi"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { BsCloudDownload, BsEye, BsCheckSquare, BsSquare } from "react-icons/bs"
import { BiShuffle } from "react-icons/bi"

import { QuestForm } from "../QuestForm"
import QuestPreview from "./QuestPreview.jsx"

const QuestList = forwardRef(({ }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if (quests.length === 0) {
        throw "err"
      }
    },
    yield() {
      return quests
    }
  }))

  const defaultStates = {
    quests: [],
    shuffle: false,
    formShow: false,
    previewShow: false,
    checked: [],
    selected: { quest: null, idx: null },
    shuffle: false
  }

  const [quests, setQuests] = useState(defaultStates.quests)
  const [previewShow, setPreviewShow] = useState(defaultStates.previewShow)
  const [formShow, setFormShow] = useState(defaultStates.formShow)
  const [checked, setChecked] = useState(defaultStates.checked)
  const [selected, setSelected] = useState(defaultStates.selected)
  const [shuffle, setShuffle] = useState(defaultStates.shuffle)

  const questFormRef = useRef()
  const fileInputRef = useRef()

  const empty = quests.length < 1
  const single = checked.length === 1

  const handleSelector = () => {
    if (checked === quests) {
      setChecked(defaultStates.checked)
    }
    else {
      setChecked(quests)
    }
  }

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
    try {
      questFormRef.current.validate()
    }
    catch {
      alert("QuestForm validation error.")
      return
    }

    const questObj = questFormRef.current.yield()
    setQuests([...quests, questObj])
    setFormShow(false)
  }

  const handleListGroupClick = (quest, idx) => {
    setSelected({ quest, idx })
    setPreviewShow(true)
  }

  const handleOrderBtnToggle = () => {
    if (shuffle) {
      setShuffle(false)
    }
  }


  const handleShuffleBtnToggle = () => {
    if (!shuffle) {
      setShuffle(true)
    }
  }

  const QuestFormModal = () => (
    <Modal
      show={formShow}
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
          onClick={() => setFormShow(false)}>
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

  const ActionBar = () => {
    const single = checked.length === 1
    const multiple = checked.length > 0

    const allChecked = (checked.length === quests.length) && (checked.length > 0)
    return (
      <Row>
        <Col className="d-flex align-items-center px-0">
          <ButtonGroup className="d-flex align-items-center me-auto">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{allChecked ? "Deselect all" : "Select all"}</Tooltip>}>
              <Button
                disabled={empty}
                className="border"
                variant="light"
                onClick={handleSelector}>
                {allChecked ? <BsCheckSquare /> : <BsSquare />}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Create your own</Tooltip>}>
              <Button
                className="border"
                variant="light"
                onClick={() => { setFormShow(true) }}>
                <GoPencil />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Import JSON</Tooltip>}>
              <Button
                className="border"
                variant="light"
                onClick={() => fileInputRef.current.click()}>
                <TfiImport />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>From API</Tooltip>}>
              <Button
                className="border"
                variant="light"
                onClick={() => { }}>
                <BsCloudDownload />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Ordered</Tooltip>}>
              <ToggleButton
                disabled={empty}
                className="border"
                type="checkbox"
                variant="light"
                checked={!shuffle}
                onClick={handleOrderBtnToggle}>
                <GoListOrdered />
              </ToggleButton>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Shuffle</Tooltip>}>
              <ToggleButton
                disabled={empty}
                className="border"
                type="checkbox"
                variant={shuffle ? "warning" : "light"}
                checked={shuffle}
                onClick={handleShuffleBtnToggle}>
                <BiShuffle />
              </ToggleButton>
            </OverlayTrigger>
          </ButtonGroup>

          <ButtonGroup>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Export to JSON</Tooltip>}>
              <Button
                className="border"
                disabled={!multiple}
                variant="light"
                onClick={handleExport}>
                <TfiExport />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Move up</Tooltip>}>
              <Button
                className="border"
                disabled={empty || !single}
                variant="light"
                onClick={handleMoveUp}>
                <AiOutlineArrowUp />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              className="border"
              placement="top"
              overlay={<Tooltip>Move down</Tooltip>}>
              <Button
                className="border"
                variant="light"
                disabled={empty || !single}
                onClick={handleMoveDown}>
                <AiOutlineArrowDown />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Remove</Tooltip>}>
              <Button
                disabled={empty}
                className="border"
                variant="danger"
                onClick={handleRemove}>
                <GoTrash />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>

        </Col>
      </Row>
    )
  }

  const ListGroupQuests = () => {


    const Badges = {
      Text: <Badge bg="secondary">Text</Badge>,
      Image: <Badge bg="primary">Image</Badge>,
      Ordered: <Badge bg="secondary">Ordered</Badge>,
      Shuffled: <Badge bg="warning">Shuffled</Badge>,
    }

    const BodyDisplay = (quest) => {
      if (quest?.type === "text") {
        if (quest?.body?.length > 50) {
          return quest?.body?.slice(0, 50) + "..."
        }
        return quest?.body
      }
      else {
        return quest?.body?.name
      }
    }

    return (
      <ListGroup>
        <ListGroup.Item variant="light">
          {ActionBar()}
        </ListGroup.Item>

        {quests.map((quest, idx) => (
          <ListGroup.Item
            key={idx}
            action
            variant="light">
            <Row>
              <Col xs="1">
                <Form.Check
                  type="checkbox"
                  checked={checked.includes(quest)}
                  onChange={() => handleCheckboxChange(quest)} />
              </Col>
              <Col xs="8" className="px-0">
                {`${idx + 1}. `}
                {BodyDisplay(quest)}
              </Col>
              <Col xs="3" className="px-0">
                <Row>
                  <Col xs="6" className="me-auto">
                    <Col>
                      {quest.shuffled === true ? Badges.Shuffled : Badges.Ordered}
                    </Col>
                    <Col>
                      {quest.type === "text" ? Badges.Text : Badges.Image}
                    </Col>
                  </Col>
                  <Col xs="6">
                    <Button
                      className="border-0"
                      variant="light"
                      onClick={() => handleListGroupClick(quest, idx)}>
                      <BsEye />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup >
    )
  }

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
      <QuestPreview
        quest={selected.quest}
        idx={selected.idx}
        show={previewShow}
        setShow={setPreviewShow} />
      {QuestFormModal()}
      <Row>
        <Col>
          {ListGroupQuests()}
        </Col>
      </Row>
      {JsonInput()}
    </React.Fragment>
  )
})

export default QuestList