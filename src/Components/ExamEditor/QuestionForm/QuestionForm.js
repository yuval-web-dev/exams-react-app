import React, { useState, useRef } from 'react';
import { Row, Col, Form, Button, Image, ButtonGroup, Table } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import equal from 'fast-deep-equal'


import placeholder from '../../../assets/placeholder.png'
import greenCheck from '../../../assets/svgs/green-checkmark-icon.svg'
import redCross from '../../../assets/svgs/red-x-icon.svg'
import { Question } from '../../../classes'


const QuestionForm = () => {
  const [questionBody, setQuestionBody] = useState('')
  const [questionImage, setQuestionImage] = useState(null)
  const [questionsAnswers, setQuestionAnswers] = useState([])
  const [questionCorrectAnsrs, setQuestionCorrectAnsrs] = useState([])
  const [questionIsRandomized, setQuestionIsRandomized] = useState(false)

  // The useRef hook in React allows you to create a mutable reference that persists throughout the lifecycle of the component.
  // It can be used to reference DOM nodes, store previous state or props, and more.
  // Here are some scenarios when you might consider using useRef:
  // - To reference a DOM element: If you need to access a DOM node or element, you can use a ref to reference that node directly,
  //    rather than querying the DOM with document.getElementById or similar methods.
  // - To store previous values: If you need to store the previous value of a prop or state, you can use a ref to store that value
  //    and compare it to the current value on each render.
  // - To store temporary values: If you need to store a value that is not part of the component state or props,
  //    and you don't want to trigger a re-render when it changes, you can use a ref to store that value.
  // - To access a child component's methods or properties: If you need to access a child component's methods or properties from the parent component,
  //    you can use a ref to reference the child component and call its methods or access its properties.
  // Here are some scenarios when you might consider not using useRef:
  // - To manage component state: If you need to manage component state, you should use the useState hook instead of a ref.
  // - To pass data between components: If you need to pass data between components, you should use props, context,
  //    or a state management library like Redux or MobX.
  // - To manage asynchronous operations: If you need to manage asynchronous operations, you should use useEffect or useCallback instead of a ref.
  // In general, you should use useRef when you need to store a mutable value that should persist across renders,
  //  but should not be part of the component state or props.
  const imageInputRef = useRef(null);
  const answerFormRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files.length === 1) {
      setQuestionImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleImageClear = () => {
    setQuestionImage(null)
    // Note that the onChange event will not be triggered if the user selects the same file again.
    // To work around this behavior, you can clear the input field value programmatically just
    //  before triggering the click event on the input element:
    imageInputRef.current.value = ''
  }

  const handleAnswerAdd = () => {
    const newAnswer = answerFormRef.current.value.trim()
    if (newAnswer !== '') {
      setQuestionAnswers([...questionsAnswers, newAnswer])
      answerFormRef.current.value = ''
    }
  }

  const handleAnswerDiscard = (answerToDiscard) => {
    const newAnswers = questionsAnswers.filter((answer) => answer !== answerToDiscard)
    setQuestionAnswers(newAnswers)
    if (questionCorrectAnsrs.includes(answerToDiscard)) {
      const newCorrectAnswers = questionCorrectAnsrs.filter((answer) => answer !== answerToDiscard);
      setQuestionCorrectAnsrs(newCorrectAnswers);
    }
  }

  const handleAnswerToggleCorrect = (answerToToggle) => {
    if (questionCorrectAnsrs.includes(answerToToggle)) {
      let newCorrectAnswers = questionCorrectAnsrs.filter((answer) => answer !== answerToToggle);
      setQuestionCorrectAnsrs(newCorrectAnswers);
    }
    else {
      setQuestionCorrectAnsrs([...questionCorrectAnsrs, answerToToggle])
    }
  }


  const handleQuestionDiscard = () => {
    // TODO add a popup window: "are you sure?"
    // setActiveTab('examform')
    // resetcompStates()
  }

  const handleQuestionSave = () => {
    // // TODO perform sanity checks on all fields before adding!
    // //  with popup windows...

    // // Creating a question object, assigning the comp's states to its fields:
    // const newQuestion = new Question()
    // newQuestion.image = questionImage
    // newQuestion.body = questionBody
    // newQuestion.answers = questionsAnswers
    // newQuestion.correctAnswers = questionCorrectAnsrs
    // newQuestion.isRandomized = questionIsRandomized

    // // If the questionObj is an already existing question which is being edited,
    // //  we will replace it with the new object we create:
    // const idx = questions.findIndex((q) => equal(questionObj, q))
    // if (idx !== -1) {
    //   questions.splice(idx, newQuestion)
    // }
    // // Adding the question to the questions array in parent comp ExamBuilder:
    // else {
    //   setQuestions([...questions, newQuestion])
    // }

    // // Clean-up:
    // // Redirecting to the Exam Form, clearing all comp states, resetting the temporary questionObj:
    // resetcompStates()
    // setActiveTab('examform')
  }

  const renderAnswers = () => {
    return (
      questionsAnswers.map((answer, idx) => {
        return (
          <tr key={idx.toString()} id={idx}>
            <td>
            </td>
            <td>
              <Form.Control readOnly type='text' value={answer} className='text-muted'></Form.Control>
            </td>
            <td>
              <Button
                variant={questionCorrectAnsrs.includes(answer) ? 'outline-success' : 'outline-danger'}
                onClick={() => { handleAnswerToggleCorrect(answer) }}>
                {questionCorrectAnsrs.includes(answer) ?
                  <img src={greenCheck} height='30px' />
                  :
                  <img src={redCross} height='30px' />}
              </Button>
            </td>
            <td>
              <Button variant='secondary' onClick={() => { handleAnswerDiscard(answer) }}>Delete</Button>
            </td>
          </tr>
        )
      })
    )
  }

  return (
    <Row>
      <Col>
        <Table>
          <tbody>
            <tr>
              <td>Image</td>
              <td>
                <Image
                  src={questionImage === null ? placeholder : questionImage}
                  style={{ height: '200px', width: '400px', objectFit: 'cover' }}
                  className='img-fluid border border-2'
                  alt='image depicting the question'
                  onClick={e => imageInputRef.current.click()} />
                <input
                  type='file'
                  ref={imageInputRef}
                  style={{ display: 'none' }}
                  onChange={e => handleImageChange(e)} />
              </td>
              <td />
              <td>
                <Button
                  variant='secondary'
                  onClick={e => handleImageClear()}>Clear</Button>
              </td>
            </tr>
            <tr>
              <td>Body</td>
              <td>
                <Form.Control
                  value={questionBody}
                  type='text'
                  spellCheck='true'
                  pattern='[A-Za-z0-9]+'
                  onChange={e => setQuestionBody(e?.target?.value)} />
              </td>
              <td />
              <td>
                <Button
                  variant='secondary'
                  onClick={e => setQuestionBody('')}>Clear</Button>
              </td>
            </tr>
            <tr>
              <td>Answer</td>
              <td>
                <Form.Control
                  ref={answerFormRef}
                  type='text'
                  spellCheck='true'
                  pattern='[A-Za-z0-9]+' />
              </td>
              <td></td>
              <td>
                <ButtonGroup>
                  <Button
                    variant='secondary'
                    onClick={e => answerFormRef.current.value = ''}>Clear</Button>
                  <Button
                    variant='primary'
                    onClick={e => handleAnswerAdd()}>Add</Button>
                </ButtonGroup>
              </td>
            </tr>
            <tr>
              <td>Randomize?</td>
              <td>
                <BootstrapSwitchButton
                  offlabel='No'
                  onlabel='Yes'
                  onChange={e => setQuestionIsRandomized((prevState) => !prevState)} />
              </td>
            </tr>
            {renderAnswers()}
          </tbody>
        </Table>
      </Col>
      <Col className='col-12 d-flex justify-content-end'>
        <ButtonGroup>
          <Button variant='warning' onClick={e => handleQuestionDiscard()}>Discard</Button>
          <Button variant='primary' onClick={e => handleQuestionSave()}>Save</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export default QuestionForm