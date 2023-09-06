import React from "react"
import { Row, Col, Modal, Button, ListGroup, ListGroupItem, Dropdown, Alert, Form, InputGroup, Spinner } from "react-bootstrap"
import VirtualList from "react-virtual-drag-list" // https://www.npmjs.com/package/react-virtual-drag-list
import { PiEye, PiEyeClosed } from "react-icons/pi"

import { api } from "../../api"
import DropdownToggle from "react-bootstrap/esm/DropdownToggle"


const range = n => [...Array(n).keys()].slice(1)

const QuizApiModalForm = ({ show }) => {
  const [inputs, setInputs] = React.useState({
    apiKey: "VOZNHbvQRb0rmx9OYxp0gykxs0wP7bsdB5GabvfC",
    category: "",
    tag: "",
    limit: 1
  })

  const [questions, setQuestions] = React.useState([])
  const [showApiKey, setShowApiKey] = React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false)

  const inputsSetter = (key, value) => {
    setInputs({
      ...inputs,
      [key]: value
    })
  }

  const handleChangeInput = (event) => {
    event.preventDefault()
    inputsSetter(event.target.name, event.target.value)
  }

  const handleSearchQuestions = async () => {
    const apiQuestions = await api.getQuestionsQuizApi(
      inputs.apiKey,
      inputs.category,
      inputs.tag,
      inputs.limit
    )
    if (!apiQuestions) {
      alert("server error")
    }
    else if (apiQuestions === []) {
      setShowAlert(true)
    }
    else {
      setQuestions(apiQuestions)
    }
  }

  const handleClickButton = (event) => {
    event.preventDefault()
    switch (event.target.name) {
      case "Search":
        handleSearchQuestions()
        return

      case "Save":
        // handleModalFormSubmit()
        return

      case "Cancel":
        // cancelHandler()
        return

      default:
        alert(`Clicked "${event.target.name}" button.`)
        return
    }
  }

  const handleRightClickQuestion = (event) => {
    event.preventDefault()
    const newQuestions = questions.filter(answer => answer.id !== event.target.id)
    setQuestions(newQuestions)
  }

  const CustomDropdownToggle = React.forwardRef(({ children, id, onClick }, ref) => {
    const handleClick = (event) => {
      event.preventDefault()
      onClick(event)
    }
    return (
      <ListGroupItem
        id={id}
        action
        ref={ref}
        onClick={handleClick}
        onContextMenu={handleRightClickQuestion}>
        {children}
      </ListGroupItem>
    )
  }
  )

  return (
    <Modal size="lg" show={show}>
      <Modal.Header>
        <Modal.Title>Add Questions from QuizAPI</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <ListGroup variant="flush">

          <ListGroupItem>
            <Form.Label>API Key</Form.Label>
            <InputGroup>
              <Form.Control
                name="apiKey"
                value={inputs.apiKey}
                type={showApiKey ? "text" : "password"}
                style={{ fontFamily: "monospace" }}
                onChange={handleChangeInput} />
              <Button
                variant="light"
                onMouseDown={() => setShowApiKey(!showApiKey)}
                onMouseUp={() => setShowApiKey(!showApiKey)}
                onMouseLeave={() => {
                  if (showApiKey === true) { setShowApiKey(false) }
                }}
                className="border">
                {showApiKey ? <PiEye /> : <PiEyeClosed />}
              </Button>
            </InputGroup>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={inputs.category}
                  onChange={handleChangeInput}>
                  <option value="">None</option>
                  {
                    CATEGORIES.map(
                      (item, idx) => <option key={idx} value={item}>{item}</option>
                    )
                  }
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Tag</Form.Label>
                <Form.Select
                  name="tag"
                  onChange={handleChangeInput}>
                  <option value="">None</option>
                  {
                    TAGS.map(
                      (item, idx) => <option key={idx} value={item}>{item}</option>
                    )
                  }
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Limit</Form.Label>
                <Form.Select
                  name="limit"
                  value={inputs.limit}
                  onChange={handleChangeInput}>
                  {
                    range(11).map(
                      (item, idx) => <option key={idx} value={item}>{item}</option>
                    )
                  }
                </Form.Select>
              </Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Button
              name="Search"
              className="w-100"
              variant="outline-primary"
              onClick={handleClickButton}>Search</Button>
          </ListGroupItem>

          <ListGroupItem className="p-0">
            {
              showAlert ? <Alert dismissible className="d-flex justify-content-center" variant="danger">{`Nothing was found... ¯\\_(ツ)_/¯`}</Alert> :
                questions.map((question, idx) => {
                  return (
                    <Dropdown>
                      <Dropdown.Toggle id={question.id} as={CustomDropdownToggle}>
                        {question.question}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="w-100 p-0">
                        {question.answers.map((answer, idx) => {
                          return (
                            <Dropdown.Item
                              key={`dropdown_${idx}`}
                              style={{ cursor: "default" }}
                              className={answer.id === question.correctAnswer ? "bg-success-subtle" : "bg-danger-subtle"}>
                              {idx + 1}. {answer.answer}
                            </Dropdown.Item>
                          )
                        })}
                      </Dropdown.Menu>
                    </Dropdown>

                  )
                })

            }
          </ListGroupItem>

        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button name="Cancel" variant="outline-secondary" style={{ width: "75px" }} onClick={handleClickButton}>Cancel</Button>
        <Button name="Save" variant="primary" style={{ width: "75px" }} onClick={handleClickButton}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default QuizApiModalForm

const CATEGORIES = [
  "Code",
  "Linux",
  "DevOps",
  "CMS",
  "Docker",
  "SQL"
]

const TAGS = [
  "PHP",
  "HTML",
  "Bash",
  "JavaScript",
  "Laravel",
  "Kubernetes",
  "WordPress",
  "MySQL"
]

// // forwardRef again here!
// // Dropdown needs access to the DOM of the Menu to measure it
// const CustomMenu = React.forwardRef(
//   ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
//     const [value, setValue] = React.useState('');

//     return (
//       <div
//         ref={ref}
//         style={style}
//         className={className}
//         aria-labelledby={labeledBy}
//       >
//         <Form.Control
//           autoFocus
//           className="mx-3 my-2 w-auto"
//           placeholder="Type to filter..."
//           onChange={(e) => setValue(e.target.value)}
//           value={value}
//         />
//         <ul className="list-unstyled">
//           {React.Children.toArray(children).filter(
//             (child) =>
//               !value || child.props.children.toLowerCase().startsWith(value),
//           )}
//         </ul>
//       </div>
//     );
//   },
// );