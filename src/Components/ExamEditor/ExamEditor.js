import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Table, Button, ButtonGroup, Form } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-datepicker'; import 'react-datepicker/dist/react-datepicker.css';
import RangeSlider from 'react-bootstrap-range-slider';


import handlers from './handlers.js'
import helpers from './helpers.js'
import { Exam, Question } from "../../classes"


const ExamEditor = ({ user }) => {
  // Defaults:
  const [earliestHourStr, earliestHourNum] = ['09:00', 9 * 60 * 60]
  const latestHourStr = '17:00'
  const [minDuration, maxDuration] = [30, 180] // mins
  const today = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  // To pass to handlers:
  const defaults = {
    earliestHourStr,
    earliestHourNum,
    latestHourStr,
    minDuration,
    maxDuration,
    today,
    tomorrow
  }

  // Object States:
  const [exam, setExam] = useState(new Exam())
  const [question, setQuestion] = useState(new Question())
  const [questionsArr, setQuestionsArr] = useState([])


  // In general, it is recommended to use a state to manage the value of a component in React.
  //  This is because when a component's state changes, React automatically re-renders the component and its children to reflect the new state.
  // Using a ref to update a component's value can be useful in certain cases, such as when you need to access the value of an input element
  //  without triggering a re-render, or when you need to store a temporary value that doesn't need to be part of the component state.
  // However, if you are updating the value of a component that affects the visual display of the component,
  //  using a ref can lead to inconsistencies and unpredictable behavior.
  // So in general, if the value of a component needs to be part of the state and needs to trigger a re-render, it's best to manage it with a state.
  // If you only need to store a temporary value or access the value without triggering a re-render, you can use a ref.
  const [examSubject, setExamSubject] = useState('')
  const [examDate, setExamDate] = useState(null)
  const [examStartTime, setExamStartTime] = useState(earliestHourNum)
  const [examEndTime, setExamEndTime] = useState(earliestHourNum + minDuration * 60)
  const [examDuration, setExamDuration] = useState(minDuration)
  const [examIsRandomized, setExamIsRandomized] = useState(false)

  const states = {
    exam,
    question,
    questionsArr,
    examSubject,
    examDate,
    examStartTime,
    examEndTime,
    examDuration,
    examIsRandomized
  }
  const setters = {
    setExamSubject,
    setExamDate,
    setExamStartTime,
    setExamEndTime,
    setExamDuration,
    setExamIsRandomized
  }

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
  const subjectFormRef = useRef(null)
  const datePickerRef = useRef(null)
  const startTimePickerRef = useRef(null)
  const endTimePickerRef = useRef(null)
  const durationInputRef = useRef(null)
  const rangeSliderRef = useRef(null)
  const randomizeToggleRef = useRef(null)
  // To pass to handlers:
  const refs = {
    subjectFormRef,
    startTimePickerRef,
    endTimePickerRef,
    durationInputRef,
    rangeSliderRef,
    randomizeToggleRef
  }

  // UseEffect hook:
  const useEffectFunc = () => { }
  let useEffectDependancyArr = []
  useEffect(useEffectFunc, useEffectDependancyArr)

  const component = {
    defaults,
    states,
    setters,
    refs
  }

  return (
    <Container variant='fluid'>
      <Row>
        <Col variant='12'>
          <Table responsive>
            <tbody>
              <tr>
                <td>Author</td>
                <td>{`${user.surname}, ${user.firstname}`}</td>
              </tr>
              <tr>
                <td>Exam ID</td>
                <td style={{ fontFamily: 'consolas' }}>{`${exam.eid}`}</td>
              </tr>
              <tr>
                <td>Subject</td>
                <td><Form.Control type='text' onChange={e => handlers.subjectChange(component, e.target.value)} spellCheck='true' style={{ fontWeight: 'bold' }} /></td>
              </tr>
              <tr>
                <td>Date</td>
                <td><DatePicker selected={examDate} className='form-control' minDate={tomorrow} dateFormat='dd/MM/yyyy' onChange={newDate => handlers.dateChange(component, newDate)} /></td>
                <td><Button variant='secondary' onClick={e => handlers.dateReset(component)}>Reset</Button></td>
              </tr>
              <tr>
                <td>Time Slot</td>
                <td>
                  <Row>
                    <Col><TimePicker value={examStartTime} step={30} start={earliestHourStr} end={latestHourStr} onChange={newTime => handlers.startTimeChange(component, newTime)} /></Col>
                    <Col><TimePicker value={examEndTime} step={1} style={{ pointerEvents: 'none' }} /></Col>
                  </Row>
                </td>
                <td><Button variant='secondary' onClick={e => handlers.timeReset(component)}>Reset</Button></td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>
                  <Row className='align-items-center'>
                    <Col className='col-4 pe-1'><Form.Control value={examDuration} type='number' min={minDuration} max={maxDuration} onChange={e => handlers.durationChange(component, e.target.value)} /></Col>
                    <Col className='ps-1'><RangeSlider value={examDuration} min={30} max={180} tooltip='off' onChange={e => handlers.sliderChange(component, e.target.value)} /></Col>
                  </Row>
                </td>
                <td><Button variant='secondary' onClick={e => handlers.durationReset(component)}>Reset</Button></td>
              </tr>
              <tr>
                <td>Randomize?</td>
                <td><BootstrapSwitchButton offlabel='No' onlabel='Yes' checked={false} onChange={e => handlers.randomizeToggle(component)} /></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default ExamEditor