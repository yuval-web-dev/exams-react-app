// import React, { useState, useRef } from 'react';
// import { Container, Row, Col, Form, Button, Table, ButtonGroup } from 'react-bootstrap'

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// import RangeSlider from 'react-bootstrap-range-slider';

// import TimePicker from 'react-bootstrap-time-picker';


// import BootstrapSwitchButton from 'bootstrap-switch-button-react'



// import { Exam, Question, User } from '../../classes';

// const ExamForm = ({ user, exam, questions, setQuestions, setActiveTab, questionObj, changeActiveTab }) => {

//   const [earliestHourStr, earliestHourNum] = ['09:00', 9 * 60 * 60]
//   const latestHourStr = '17:00'
//   const [minDuration, maxDuration] = [30, 180] // mins
//   const today = new Date()
//   let tomorrow = new Date()
//   tomorrow.setDate(today.getDate() + 1)

//   const [name, setName] = useState('')
//   const [date, setDate] = useState(tomorrow)
//   const [startTime, setStartTime] = useState(earliestHourNum)
//   const [endTime, setEndTime] = useState(earliestHourNum + minDuration * 60) // internal use
//   const [duration, setDuration] = useState(minDuration)
//   const [randomized, setRandomized] = useState(false)

//   const handleNameChange = (e) => {
//     // TODO string check
//     setName(e.target.value)
//   }

//   const handleDateChange = (selectedDate) => {
//     // TODO date checks
//     console.log(JSON.stringify(selectedDate))
//     setDate(selectedDate)
//   }

//   const handleDateReset = () => {
//     setDate(tomorrow)
//   }

//   const handleStartTimeChange = (value) => {
//     // TODO value validity checks
//     setStartTime(value)
//     setEndTime(value + (duration * 60))
//   }

//   const handleTimeReset = (e) => {
//     setStartTime(earliestHourNum)
//     setEndTime(earliestHourNum + minDuration * 60)
//     setDuration(minDuration)
//   }

//   const handleDurationChange = (e) => {
//     const dur = Math.floor(e.target.value)
//     if (dur >= 1 || dur <= 180) {
//       setDuration(dur)
//       setEndTime(startTime + (dur * 60))
//     }
//   }

//   const handleSliderChange = (e) => {
//     const dur = e.target.value
//     setDuration(dur)
//     setEndTime(startTime + (dur * 60))
//   }

//   const handleRandomizeToggle = () => {
//     // TODO make this work
//     setRandomized(!randomized)
//   }

//   const handleQuestionsClear = (e) => {
//     if (window.confirm('Are you sure you want to clear all questions?')) {
//       setQuestions([]);
//     }
//   }

//   const handleQuestionEdit = (question) => {
//     // changeActiveTab('questionform')
//   }

//   const isQuestionSane = (question) => {
//     if (question.body === '' ||
//       question.answers.length <= 1 ||
//       question.correctAnswers.length === 0 ||
//       question.correctAnswers.length === question.answers.length) {
//       return false
//     }
//     return true
//   }

//   const renderQuestions = () => {
//     return (
//       questions.map((q, idx) => {
//         return (
//           <tr key={idx.toString()} id={idx}>
//             <td>{idx + 1}</td>
//             <td>{q.image === null ? 'No' : 'Yes'}</td>
//             <td>{q.body === '' ? '-' : `"${q.body.toString()}"`}</td>
//             <td>
//               <ol>
//                 {q.answers.length === 0 ? '-' : q.answers.map((answer) => {
//                   return (
//                     <li style={q.correctAnswers.includes(answer) ? { color: 'green', fontWeight: 'bold' } : {}}>{`"${answer}"`}</li>
//                   )
//                 })}
//               </ol>
//             </td>
//             <td>{q.isRandomized === true ? 'Yes' : 'No'}</td>
//             <td>{isQuestionSane(q) ? <img src={greenCheck} width='30px' /> : <img src={redExclamation} width='30px' />}
//             </td>
//             <td>
//               <ButtonGroup>
//                 <Button variant='secondary' onClick={handleQuestionEdit(q)}>Edit</Button>
//                 <Button variant='warning'>Discard</Button>
//               </ButtonGroup>
//             </td>
//           </tr>
//         )
//       })
//     )
//   }

//   return (
//     <Row>
//       <Col className='col-12'>
//         <Table responsive>
//           <tbody>
//             <tr>
//               <td>Subject</td>
//               <td><Form.Control value={name} type='text' onChange={handleNameChange} spellCheck='true' style={{ fontWeight: 'bold' }} /></td>
//               <td>
//                 <Button variant='secondary' onClick={() => { setName('') }}>Clear</Button>
//               </td>
//             </tr>
//             <tr>
//               <td>Date</td>
//               <td>
//                 <div className='form-group'>
//                   <DatePicker className='form-control' selected={date} minDate={tomorrow} dateFormat='dd/MM/yyyy' onChange={handleDateChange} />
//                 </div>
//               </td>
//               <td>
//                 <Button variant='secondary' onClick={handleDateReset}>Reset</Button>
//               </td>
//             </tr>
//             <tr>
//               <td>Timeframe<br />&<br />Duration</td>
//               <td>
//                 <Row>
//                   <Col>
//                     <TimePicker value={startTime} step={30} start={earliestHourStr} end={latestHourStr} onChange={handleStartTimeChange} />
//                   </Col>
//                   <Col>
//                     <TimePicker value={endTime} step={1} className='text-muted' style={{ pointerEvents: 'none' }} />
//                   </Col>
//                 </Row>
//                 <Row className='align-items-center'>
//                   <Col className='col-4 pe-1'>
//                     <Form.Control type='number' value={duration} min={minDuration} max={maxDuration} onChange={handleDurationChange} />
//                   </Col>
//                   <Col className='ps-1'>
//                     <RangeSlider value={duration} min={30} max={180} onChange={handleSliderChange} tooltip='off' />
//                   </Col>
//                 </Row>
//               </td>
//               <td>
//                 <Button variant='secondary' onClick={handleTimeReset}>Reset</Button>
//               </td>
//             </tr>
//             <tr>
//               <td>Randomize?</td>
//               <td>
//                 <BootstrapSwitchButton offlabel='No' onlabel='Yes' checked={false} onChange={handleRandomizeToggle} />
//               </td>
//             </tr>
//             <tr>
//               <td>Questions</td>
//               <td>{questions.length}</td>
//               <td>
//                 <Button variant='danger' onClick={handleQuestionsClear}>Clear</Button>
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//         <div style={{ height: '125px' }} />
//         <Table responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Image</th>
//               <th>Body</th>
//               <th>Answers</th>
//               <th>Randomized</th>
//               <th>Sanity</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {renderQuestions()}
//           </tbody>
//         </Table>
//       </Col>
//       <Col className='col-12 d-flex justify-content-end'>
//         <ButtonGroup>
//           <Button variant='warning'>Discard</Button>
//           <Button variant='primary' onClick={() => { }}>Save</Button>
//         </ButtonGroup>
//       </Col>
//     </Row>
//   )
// }

// export default ExamForm