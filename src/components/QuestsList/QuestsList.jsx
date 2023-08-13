import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react"
import {
  ListGroup,
  Form,
  Dropdown,
  DropdownButton,
  Modal,
  Row,
  Col,
  Image,
  Table,
  Button, ToggleButton, ButtonGroup,
  Nav,
  Badge,
  OverlayTrigger, Tooltip
} from "react-bootstrap"
import { GoTrash, GoPencil } from "react-icons/go"
import { TfiImport, TfiExport } from "react-icons/tfi"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { BsCloudDownload } from "react-icons/bs"

import QuestForm from "./QuestForm"
import QuestPreview from "./QuestPreview"

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
    formShow: false,
    previewShow: false,
    checked: [],
    selected: { quest: null, idx: null }
  }

  const [quests, setQuests] = useState(defaultStates.quests)
  const [previewShow, setPreviewShow] = useState(defaultStates.previewShow)
  const [formShow, setFormShow] = useState(defaultStates.formShow)
  const [checked, setChecked] = useState(defaultStates.checked)
  const [selected, setSelected] = useState(defaultStates.selected)
  const [actionsDdShow, setActionsDdShow] = useState(false)

  const questFormRef = useRef()
  const fileInputRef = useRef()
  const checkAllRef = useRef()
  const actionsDrpRef = useRef()

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
    // checkAllRef.current.checked = false
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
    setFormShow(false)
  }

  const handleListGroupClick = (quest, idx) => {
    setSelected({ quest, idx })
    setPreviewShow(true)
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

  const ActionsDropdown = () => {
    const single = checked.length === 1
    const multiple = checked.length > 0
    return (
      <DropdownButton
        ref={actionsDrpRef}
        variant="outline-primary"
        drop="end"
        title="Actions"
        disabled={quests.length < 1}
        autoClose={"outside"}>
        <Dropdown.Item
          disabled={!multiple}
          size="sm"
          variant="danger"
          onClick={handleRemove}>
          Remove
        </Dropdown.Item>
        <Dropdown.Item
          disabled={!multiple}
          size="sm"
          onClick={handleExport}>
          Export JSON
        </Dropdown.Item>
        <Dropdown.Item
          disabled={!single}
          size="sm"
          onClick={handleMoveUp}>
          Move up
        </Dropdown.Item>
        <Dropdown.Item
          disabled={!single}
          size="sm"
          variant="light"
          onClick={handleMoveDown}>
          Move down
        </Dropdown.Item>

      </DropdownButton >
    )
  }

  const AddDropdown = () => (
    <DropdownButton
      variant="outline-primary"
      drop="down"
      title="Add">
      <Dropdown.Item
        as="button"
        onClick={() => { setFormShow(true) }}>
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

    const variant = "light"

    return (
      <Row>
        <Col className="d-flex">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Create your own</Tooltip>}>
            <Button
              variant={variant}
              onClick={() => { setFormShow(true) }}>
              <GoPencil />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Import JSON</Tooltip>}>
            <Button
              variant={variant}
              onClick={() => fileInputRef.current.click()}>
              <TfiImport />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>From API</Tooltip>}>
            <Button
              className="me-auto"
              variant={variant}
              onClick={() => { }}>
              <BsCloudDownload />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Export to JSON</Tooltip>}>
            <Button
              disabled={!multiple}
              variant={variant}
              onClick={handleExport}>
              <TfiExport />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Move up</Tooltip>}>
            <Button
              disabled={!single}
              variant={variant}
              onClick={handleMoveUp}>
              <AiOutlineArrowUp />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Move down</Tooltip>}>
            <Button
              disabled={!single}
              variant={variant}
              onClick={handleMoveDown}>
              <AiOutlineArrowDown />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Remove</Tooltip>}>
            <Button
              variant="danger"
              onClick={handleRemove}>
              <GoTrash />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    )
  }

  const ListGroupQuests = () => {
    const onCheck = (e) => {
      if (!e.target.checked) {
        setChecked(defaultStates.checked)
      }
      else {
        setChecked(quests)
      }
    }

    return (
      <ListGroup>
        <ListGroup.Item
          variant="light">
          <Row>
            <Col className="me-auto">
              <Form.Check
                style={quests.length === 0 ? { display: "none" } : {}}
                ref={checkAllRef}
                type="checkbox"
                disabled={quests.length < 1}
                onChange={e => onCheck(e)} />
            </Col>
          </Row>
        </ListGroup.Item>

        {
          quests.map((quest, idx) => (
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
                <Col xs="1">
                  {idx + 1}
                </Col>
                <Col
                  className="d-flex justify-content-center align-items-center"
                  xs="1"
                  onClick={() => { handleListGroupClick(quest, idx) }}>
                  {quest.type === "text" ?
                    <Badge bg="secondary">Text</Badge> :
                    <Badge bg="primary">Image</Badge>
                  }
                </Col>
                <Col>
                  {typeof quest.body === "string" ? quest.body : quest.body.name}
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        }
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
        <Col xs="12">
          {ActionBar()}
        </Col>
        <Col xs="12">
          {ListGroupQuests()}
        </Col>
      </Row>
      {JsonInput()}
    </React.Fragment>
  )
})

export default QuestsList