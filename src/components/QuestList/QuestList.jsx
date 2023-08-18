import React, { useState, useRef, forwardRef, useImperativeHandle } from "react"
import {
  ListGroup,
  Form,
  Modal,
  Row, Col,
  Image,
  Button, ButtonGroup,
  Badge,
  OverlayTrigger, Tooltip,
} from "react-bootstrap"
import BootstrapSwitchButton from "bootstrap-switch-button-react"

import { GoTrash, GoPencil } from "react-icons/go"
import { TfiImport, TfiExport } from "react-icons/tfi"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { BsEye } from "react-icons/bs"

import { QuestEditor } from "../QuestEditor"
import QuestPreview from "./QuestPreview.jsx"
import * as state from "./states.ts"

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


  const [type, setType] = useState(state.type)
  const [quests, setQuests] = useState(state.quests)
  const [selected, setSelected] = useState(state.selected)
  const [shuffle, setShuffle] = useState(state.shuffle)

  const [previewShow, setPreviewShow] = useState(false)
  const [formShow, setFormShow] = useState(false)
  const [checked, setChecked] = useState([])

  const questFormRef = useRef()
  const fileInputRef = useRef()

  const empty = quests.length < 1
  const single = checked.length === 1

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

  const QuestFormModal = () => {
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
    return (
      <Modal
        show={formShow}
        size="lg">
        <Modal.Header>
          <Modal.Title>{`New ${type} Question`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <QuestEditor type={type} ref={questFormRef} />
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
  }

  const ListGroupQuests = () => {

    const ActionBar = () => {
      const handleCheckAll = () => {
        if (checked === quests) {
          setChecked([])
        }
        else {
          setChecked(quests)
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

      const handleRemove = () => {
        setQuests(quests.filter(i => !checked.includes(i)))
        setChecked([])
      }

      const single = checked.length === 1
      const multiple = checked.length > 0

      const allChecked = (checked.length === quests.length) && (checked.length > 0)
      return (
        <Row>
          <Col className="d-flex align-items-center">
            <Form.Check
              className="me-auto"
              type="checkbox"
              disabled={empty}
              onClick={handleCheckAll} />

            <ButtonGroup vertical className="mx-3">
              <Button
                className="border py-0"
                disabled={empty || !single}
                variant="light"
                onClick={handleMoveUp}>
                <AiOutlineArrowUp />
              </Button>

              <Button
                className="border py-0"
                variant="light"
                disabled={empty || !single}
                onClick={handleMoveDown}>
                <AiOutlineArrowDown />
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Export to JSON</Tooltip>}>
                <Button
                  style={{ width: "100px" }}
                  className="border"
                  disabled={!multiple}
                  variant="light"
                  onClick={handleExport}>
                  <TfiExport />
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Remove</Tooltip>}>
                <Button
                  style={{ width: "100px" }}
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

    const handleListGroupClick = (quest, idx) => {
      setSelected({ quest, idx })
      setPreviewShow(true)
    }

    const handleCheckboxChange = (quest) => {
      if (checked.includes(quest)) {
        setChecked(checked.filter(i => i !== quest))
      }
      else {
        setChecked([...checked, quest])
      }
    }

    const Badges = {
      Text: <Badge bg="secondary">Text</Badge>,
      Image: <Badge bg="primary">Image</Badge>,
      Ordered: <Badge bg="secondary">Ordered</Badge>,
      Shuffled: <Badge bg="warning">Shuffled</Badge>,
    }

    const shortenBody = (quest) => {
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
        <ListGroup.Item variant="secondary">
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
                {shortenBody(quest)}
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

  const TypeAndOrder = () => {
    const handleTypeSwitch = () => {
      if (type === "closed") {
        setType("open")
      }
      else { // type === "open"
        setType("closed")
      }
    }

    const handleOrderSwitch = () => {
      setShuffle(!shuffle)
    }

    return (
      <Row>
        <Col xs="6" className="d-flex justify-content-start align-items-center">
          <div className="me-5">Type</div>
          <BootstrapSwitchButton
            checked={type === "open"}
            width="150"
            offlabel="Closed"
            onlabel="Open"
            onstyle="light"
            onChange={handleTypeSwitch} />
        </Col>
        <Col xs="6" className="d-flex justify-content-start align-items-center">
          <div className="me-5">Order of Appearance</div>
          <BootstrapSwitchButton
            checked={shuffle === true}
            width="150"
            offlabel="Ordered"
            onlabel="Shuffled"
            onstyle="warning"
            onChange={handleOrderSwitch} />
        </Col>
      </Row >
    )
  }

  const AddButtons = () => {
    const handleClickYourOwn = () => {
      setFormShow(true)
    }

    const handleClickJson = () => {
      fileInputRef.current.click()
    }

    const handleClickQuizApi = () => {
      alert("quizapi clicked")
    }

    return (
      <Row>
        <Col className="d-flex justify-content-start align-items-center">
          <div className="me-5">Add</div>
          <ButtonGroup>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>your own</Tooltip>}>
              <Button
                style={{ width: "75px" }}
                className="border"
                variant="light"
                onClick={handleClickYourOwn}>
                <GoPencil />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>from JSON</Tooltip>}>
              <Button
                style={{ width: "75px" }}
                className="border"
                variant="light"
                onClick={handleClickJson}>
                <TfiImport />
              </Button>
            </OverlayTrigger>

            <Button
              disabled={type === "open"}
              style={{ width: "100px" }}
              className="border"
              variant="light"
              onClick={handleClickQuizApi}>
              <Image
                style={{ width: "75px" }}
                src="https://quizapi.io/storage/settings/March2020/H8dOZWtQD0IND4pqOJTT.png" />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }

  return (
    <React.Fragment>
      {QuestFormModal()}
      {JsonInput()}
      <QuestPreview
        quest={selected.quest}
        idx={selected.idx}
        show={previewShow}
        setShow={setPreviewShow} />

      <ListGroup>
        <ListGroup.Item>
          {TypeAndOrder()}
        </ListGroup.Item>
        <ListGroup.Item>
          {AddButtons()}
        </ListGroup.Item>
        <ListGroup.Item className="p-0 border-0">
          {ListGroupQuests()}
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  )
})

export default QuestList