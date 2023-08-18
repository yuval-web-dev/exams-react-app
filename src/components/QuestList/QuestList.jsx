import React from "react"
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
import quizApiLogo from "../../assets/quizapi_full.svg"

import { QuestList } from "../../classes.ts"


const QuestListComponent = ({ }, ref) => {
  React.useImperativeHandle(ref, () => ({
    validate() {
      if (quests.length === 0) {
        throw "no questions added"
      }
    },
    createObj() {
      return new QuestList(
        type,
        quests,
        shuffle
      )
    }
  }))

  const [type, setType] = React.useState(state.type)
  const [quests, setQuests] = React.useState(state.quests)
  const [selected, setSelected] = React.useState(state.selected)
  const [shuffle, setShuffle] = React.useState(state.shuffle)

  const [previewShow, setPreviewShow] = React.useState(false)
  const [formShow, setFormShow] = React.useState(false)
  const [checked, setChecked] = React.useState([])

  const editorRef = React.useRef()
  const fileInputRef = React.useRef()
  const checkAllRef = React.useRef()

  const empty = quests.length < 1


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

  const QuestEditorModal = () => {
    const handleClickCancel = () => {
      setFormShow(false)
    }

    const handleClickSave = () => {
      try {
        editorRef.current.validate()
      }
      catch {
        alert("QuestForm validation error.")
        return
      }

      const questObj = editorRef.current.yield()
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
          <QuestEditor type={type} ref={editorRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={handleClickCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleClickSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const QuestListGroup = () => {

    const Control = () => {
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
        checkAllRef.current.checked = false
      }

      const noneChecked = checked.length === 0
      const multipleChecked = checked.length > 1

      return (
        <Row>
          <Col className="d-flex align-items-center">
            <Form.Check
              ref={checkAllRef}
              className="me-auto"
              type="checkbox"
              disabled={empty}
              onClick={handleCheckAll} />

            <ButtonGroup vertical>
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
              className="mx-2"
              style={{ width: "60px", height: "50px" }}
              disabled={noneChecked}
              variant="outline-secondary"
              onClick={handleExport}>
              <TfiExport />
            </Button>

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
        <ListGroup.Item>
          {Control()}
        </ListGroup.Item>

        {quests.map((quest, idx) => (
          <ListGroup.Item key={idx} action>
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
                      variant="outline-secondary"
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

  const Control = () => {
    const divClass = "d-flex flex-column me-2"

    const AddButtons = () => {
      const handleClickPencil = () => {
        setFormShow(true)
      }

      const handleClickJson = () => {
        fileInputRef.current.click()
      }

      const handleClickQuizApi = () => {
        alert("quizapi clicked")
      }

      return (
        <div className={divClass + " me-3"}>
          <small>Add</small>
          <ButtonGroup>
            <Button
              size="sm"
              style={{ width: "70px" }}
              className="border"
              variant="light"
              onClick={handleClickPencil}>
              <GoPencil />
            </Button>
            <Button
              size="sm"
              style={{ width: "70px" }}
              className="border"
              variant="light"
              onClick={handleClickJson}>
              <TfiImport />
            </Button>

            <Button
              size="sm"
              disabled={type === "open"}
              style={{ width: "70px" }}
              className="border"
              variant="light"
              onClick={handleClickQuizApi}>
              <Image width="50" src={quizApiLogo} />
            </Button>
          </ButtonGroup>
        </div>
      )
    }

    const TypeSwitch = () => {
      const handleTypeSwitch = () => {
        if (type === "closed") {
          setType("open")
        }
        else { // type === "open"
          setType("closed")
        }
      }

      return (
        <div className={divClass}>
          <small>Type</small>
          <BootstrapSwitchButton
            size="sm"
            checked={type === "open"}
            width="100"
            offlabel="Closed"
            onlabel="Open"
            onChange={handleTypeSwitch} />
        </div>
      )
    }

    const AppearanceSwitch = () => {
      const handleOrderSwitch = () => {
        setShuffle(!shuffle)
      }

      return (
        <div className={divClass}>
          <small>Appearance</small>
          <BootstrapSwitchButton
            size="sm"
            checked={shuffle === true}
            width="100"
            offlabel="Ordered"
            onlabel="Shuffled"
            onstyle="warning"
            onChange={handleOrderSwitch} />
        </div>
      )
    }

    return (
      <Row>
        <Col className="d-flex justify-content-start">
          {AddButtons()}
          {TypeSwitch()}
          {AppearanceSwitch()}
        </Col>
      </Row>
    )
  }

  return (
    <React.Fragment>
      {QuestEditorModal()}
      {JsonInput()}
      <QuestPreview
        quest={selected.quest}
        idx={selected.idx}
        show={previewShow}
        setShow={setPreviewShow} />

      <ListGroup>
        <ListGroup.Item>
          {Control()}
        </ListGroup.Item>
        <ListGroup.Item className="p-0 border-0">
          {QuestListGroup()}
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  )
}

export default React.forwardRef(QuestListComponent)