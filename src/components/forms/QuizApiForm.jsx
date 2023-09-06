import React from "react"
import { Row, Col, Form, InputGroup, Button, ListGroup, Alert, Accordion } from "react-bootstrap"
import { PiEye, PiEyeClosed } from "react-icons/pi"

import { api } from "../../api"



// const resDataToObj = (resData) => {
//   const body = new Txt(resData?.question)
//   const answers = []
//   var correct = null

//   for (const [key, val] of Object.entries(resData?.answers)) {
//     if (key === resData?.correct_answer) {
//       correct = val
//     }
//     if (val !== null) {
//       answers.push(val)
//     }
//   }

//   return new CloseEnded(
//     body,
//     answers,
//     correct,
//     false
//   )
// }


const QuizApiForm = ({ }, ref) => {
  // React.useImperativeHandle(ref, () => ({
  //   validate() {
  //     if (quests.length < 1) {
  //       throw "no questions added"
  //     }
  //   },
  //   yield() {
  //     return checked
  //   }
  // }))

  const [key, setKey] = React.useState("VOZNHbvQRb0rmx9OYxp0gykxs0wP7bsdB5GabvfC")
  const [cat, setCat] = React.useState("")
  const [tag, setTag] = React.useState("")
  const [limit, setLimit] = React.useState(1)
  const [showKey, setShowKey] = React.useState(false)
  const [quests, setQuests] = React.useState([])
  const [showAlert, setShowAlert] = React.useState(false)

  const [checked, setChecked] = React.useState([])

  const categories = [
    "Code",
    "Linux",
    "DevOps",
    "CMS",
    "Docker",
    "SQL"
  ]

  const tags = [
    "PHP",
    "HTML",
    "Bash",
    "JavaScript",
    "Laravel",
    "Kubernetes",
    "WordPress",
    "MySQL"
  ]

  const KeySubform = () => {
    const handleChange = (newKey) => {
      setKey(newKey)
    }

    const handleToggle = () => {
      setShowKey(!showKey)
    }

    const onMouseLeave = () => {
      if (showKey === true) {
        setShowKey(false)
      }
    }

    return (
      <React.Fragment>
        <Form.Label>API Key</Form.Label>
        <InputGroup>
          <Form.Control
            value={key}
            type={showKey ? "text" : "password"}
            style={{ fontFamily: "monospace" }}
            onChange={e => handleChange(e.target.value)} />
          <Button
            variant="light"
            onMouseDown={handleToggle}
            onMouseUp={handleToggle}
            onMouseLeave={onMouseLeave}>
            {showKey ? <PiEye /> : <PiEyeClosed />}
          </Button>
        </InputGroup>
      </React.Fragment>
    )
  }

  const CategorySubform = () => {
    const handleChange = (newCat) => {
      setCat(newCat)
    }

    return (
      <React.Fragment>
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={cat}
          onChange={e => handleChange(e.target.value)}>
          <option value="">None</option>
          {categories.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </Form.Select>
      </React.Fragment>
    )
  }

  const TagSubform = () => {
    const handleChange = (newTag) => {
      setTag(newTag)
    }

    return (
      <React.Fragment>
        <Form.Label>Tag</Form.Label>
        <Form.Select onChange={e => handleChange(e.target.value)}>
          <option value="">None</option>
          {tags.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </Form.Select>
      </React.Fragment>
    )
  }

  const LimitSubform = () => {
    const handleChange = (newLimit) => {
      setLimit(newLimit)
    }

    const createOptions = (n) => {
      const options = []
      for (var i = 1; i <= n; i++) {
        options.push(i)
      }
      return options
    }

    return (
      <React.Fragment>
        <Form.Label>Limit</Form.Label>
        <Form.Select
          value={limit}
          onChange={e => { handleChange(e.target.value) }}>
          {
            createOptions(10).map((item, idx) => (
              <option key={idx} value={item}>{item}</option>
            ))
          }
        </Form.Select>
      </React.Fragment>
    )
  }

  const SearchButton = () => {
    const handleClick = async () => {
      // setChecked([])

      // var resData = null
      // var newQuest = null
      // resData = await getQuizApi(key, cat, tag, limit)
      // if (resData === undefined) {
      //   setShowAlert(true)
      //   return
      // }

      const newQuests = []


      // resData.map((item, idx) => {
      //   if (item.correct_answer !== null) {
      //     newQuests.push(resDataToObj(item))
      //   }
      // })

      // if (newQuests.length === 0) {
      //   setShowAlert(true)
      //   return
      // }

      // setQuests(newQuests)
      // setShowAlert(false)
      alert("search button clicked!")
    }

    return (
      <Button
        variant="outline-primary"
        onClick={handleClick}>Search</Button>
    )
  }

  const ListQuests = () => {
    const handleCheckAll = (isChecked) => {
      setChecked(isChecked ? quests : [])
    }

    const handleCheck = (quest) => {
      if (checked.includes(quest)) {
        setChecked(checked.filter(i => i !== quest))
      }
      else {
        setChecked([...checked, quest])
      }
    }

    if (showAlert) {
      return (
        <Alert variant="warning">
          Nothing was found.. ¯\_(ツ)_/¯
        </Alert>
      )
    }
    else {
      return (
        <ListGroup>
          <ListGroup.Item>
            <Form.Check
              checked={checked === quests}
              type="checkbox"
              onChange={e => handleCheckAll(e.target.checked)} />
          </ListGroup.Item>
          {quests.map((quest, idx) => (
            <ListGroup.Item key={idx}>
              <Row>
                <Col xs="1">
                  <Form.Check
                    checked={checked.includes(quest)}
                    type="checkbox"
                    onChange={() => handleCheck(quest)} />
                </Col>
                <Col>
                  <Accordion>
                    <Accordion.Header>{quest?.body?.val}</Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ListGroup>
                        {quest?.answers?.map((ans, idx) => (
                          <ListGroup.Item
                            key={idx}
                            variant={ans === quest?.correct ? "success" : "danger"}>
                            {`${idx + 1}.\t${ans}`}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )
    }
  }


  return (
    <Form>
      <Row>
        <Col>
          {KeySubform()}
        </Col>
      </Row>
      <Row className="my-3 py-3 border-top border-bottom">
        <Col>
          {CategorySubform()}
        </Col>
        <Col>
          {TagSubform()}
        </Col>
        <Col>
          {LimitSubform()}
        </Col>
        <Col className="d-flex align-items-end justify-content-end">
          {SearchButton()}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {ListQuests()}
        </Col>
      </Row>
    </Form>
  )
}

export default React.forwardRef(QuizApiForm)