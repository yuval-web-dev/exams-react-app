// import React, { useState, useRef, useEffect } from 'react'
// import { Row, Col, Table, Button, ButtonGroup, Form, Tabs, Tab, Nav } from 'react-bootstrap'
// import BootstrapSwitchButton from 'bootstrap-switch-button-react'
// import TimePicker from 'react-bootstrap-time-picker'
// import DatePicker from 'react-datepicker'; import 'react-datepicker/dist/react-datepicker.css'
// import RangeSlider from 'react-bootstrap-range-slider'


// // Components
// import QuestionForm from '../ClosedQuestionForm/ClosedQuestionForm'
// import ImagePreview from '../ImagePreview/ImagePreview'

// // Javascript
// import consts from './consts'

// // Assets
// import greenCheck from '../../assets/svg/green-checkmark-icon.svg'
// import redAlert from '../../assets/svg/red-alert-icon.svg'


// const ExamForm = () => {
//   // States
//   const [jsonImport, setJsonImport] = useState(null) // The actual JSON file uploaded via input
//   const [jsonExport, setJsonExport] = useState('') // The name of the to-be exported JSON file

//   // Form values states
//   const [questions, setQuestions] = useState([])
//   const [subject, setSubject] = useState('')
//   const [date, setDate] = useState(null)
//   const [startTime, setStartTime] = useState(consts.earliestHourNum)
//   const [endTime, setEndTime] = useState(consts.earliestHourNum + consts.minDuration * 60)
//   const [duration, setDuration] = useState(consts.minDuration)
//   const [isRandomized, setIsRandomized] = useState(false)

//   // Bootstrap Tabs related states
//   const [questionToEdit, setQuestionToEdit] = useState(null)
//   const [activeTab, setActiveTab] = useState('all')

//   // ImagePreview related states (to be sent as props)
//   const [selectedQuestionImage, setSelectedQuestionImage] = useState(null)
//   const [showImagePreview, setShowImagePreview] = useState(false)

//   // Refs
//   const jsonInputRef = useRef(null)
//   const imageInputRef = useRef(null)
//   const answerFormRef = useRef(null)

//   // UseEffect
//   // const effect = () => null
//   // const dependancy = []
//   // useEffect(effect, dependancy)


//   // Event handlers
//   const handleStartTimeChange = (newStartTime) => {
//     setStartTime(newStartTime)
//     setEndTime(newStartTime + (duration * 60))
//   }

//   const handleTimeReset = () => {
//     setStartTime(consts.earliestHourNum)
//     setEndTime(consts.earliestHourNum + consts.minDuration * 60)
//     setDuration(consts.minDuration)
//   }

//   const handleDurationChange = (newDuration) => {
//     newDuration = Math.floor(newDuration)
//     if (newDuration >= 1 || newDuration <= 180) {
//       setDuration(newDuration)
//       setEndTime(startTime + (newDuration * 60))
//     }
//   }

//   const handleSliderChange = (newDuration) => {
//     setDuration(newDuration)
//     setEndTime(startTime + (newDuration * 60))
//   }

//   const handleMoveUp = (question, idx) => {
//     if (idx > 0) {
//       let newQuestions = [...questions]
//       const replaced = newQuestions[idx - 1]
//       newQuestions[idx - 1] = question
//       newQuestions[idx] = replaced
//       setQuestions(newQuestions)
//     }
//   }

//   const handleMoveDown = (question, idx) => {
//     if (idx < (questions.length - 1)) {
//       let newQuestions = [...questions]
//       const replaced = newQuestions[idx + 1]
//       newQuestions[idx + 1] = question
//       newQuestions[idx] = replaced
//       setQuestions(newQuestions)
//     }
//   }

//   const handleQuestionEdit = (question) => {
//     setQuestionToEdit(question)
//     setActiveTab('form')
//   }

//   const handleQuestionDiscard = (questionToDiscard) => {
//     if (window.confirm('Are you sure?')) {
//       setQuestions(
//         questions.filter((question) => question !== questionToDiscard)
//       )
//     }
//   }

//   const handleQuestionFormSave = (newQuestion, isEditing) => {
//     if (isEditing === true) {
//       const oldQuestionIdx = questions.indexOf(questionToEdit)
//       let newQuestions = [...questions]
//       newQuestions[oldQuestionIdx] = newQuestion
//       setQuestions(newQuestions)
//       setActiveTab('all')
//     }
//     else {
//       setQuestions([...questions, newQuestion])
//       setActiveTab('all')
//     }
//   }

//   const handleQuestionFormDiscard = () => {
//     setActiveTab('all')
//   }

//   const handleImageLinkClick = (image) => {
//     setSelectedQuestionImage(image)
//     setShowImagePreview(true)
//   }

//   const handleImagePreviewClose = () => {
//     setShowImagePreview(false)
//   }

//   const handleJsonChange = (newFile) => {
//     const allowedTypes = ['application/json']
//     if (newFile === undefined) {
//       return
//     }
//     else if (!allowedTypes.includes(newFile?.type)) {
//       alert(`Allowed file types: ${[...allowedTypes]}`)
//       setJsonImport(null)
//     }
//     else {
//       setJsonImport(newFile)
//     }
//     jsonInputRef.current.value = ''
//   }

//   const handleJsonImport = () => {
//     const reader = new FileReader()

//     reader.onload = function (e) {
//       const allowedKeys = ['questions', 'subject', 'date', 'startTime', 'duration', 'isRandomized']

//       const jsonParsed = JSON.parse(e.target.result)
//       const keys = Object.keys(jsonParsed)

//       if (!keys.every(key => (allowedKeys.includes(key)))) {
//         alert(`Allowed JSON keys: ${[...allowedKeys]}`)
//         return
//       }
//       if (jsonParsed.hasOwnProperty('questions')) {
//         setQuestions(jsonParsed.questions)
//       }
//       if (jsonParsed.hasOwnProperty('subject')) {
//         setSubject(jsonParsed.subject)
//       }
//       if (jsonParsed.hasOwnProperty('date')) {
//         setDate(jsonParsed.date)
//       }
//       if (jsonParsed.hasOwnProperty('startTime')) {
//         setStartTime(jsonParsed.startTime)
//       }
//       if (jsonParsed.hasOwnProperty('duration')) {
//         setDuration(jsonParsed.subject)
//       }
//       if (jsonParsed.hasOwnProperty('isRandomized')) {
//         setIsRandomized(jsonParsed.isRandomized)
//       }
//     }
//     reader.readAsText(jsonImport)
//   }

//   const handleJsonExport = () => {
//     const data = {
//       questions,
//       subject,
//       date,
//       startTime,
//       duration,
//       isRandomized
//     }
//     const json = JSON.stringify(data)
//     const element = document.createElement('a')
//     element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(json))
//     element.setAttribute('download', `${jsonExport === '' ? 'untitled_exam' : jsonExport}.json`)
//     element.style.display = 'none'
//     document.body.appendChild(element)
//     element.click()
//     document.body.removeChild(element)
//   }

//   // Renderers
//   const renderQuestions = () => {
//     return (
//       questions.map((q, idx) => {
//         return (
//           <tr key={idx.toString()} id={idx}>
//             <td>{idx + 1}</td>
//             <td>{q.image === null ? '-' : <Nav.Link style={{ color: '#007bff' }} onClick={() => handleImageLinkClick(q.image)}>{q.image.name}</Nav.Link>}</td>
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
//             <td>{isQuestionSane(q) ? <img src={greenCheck} width='35px' /> : <img src={redAlert} width='35px' />}</td>
//             <td>
//               <ButtonGroup>
//                 <Button variant='light' onClick={() => handleMoveUp(q, idx)}>⯅</Button>
//                 <Button variant='light' onClick={() => handleMoveDown(q, idx)}>⯆</Button>
//               </ButtonGroup>
//               <Button variant='primary' onClick={() => handleQuestionEdit(q)}>Edit</Button>
//               <Button variant='light' onClick={() => handleQuestionDiscard(q)}>Discard</Button>
//             </td>
//           </tr>
//         )
//       })
//     )
//   }

//   return (
//     <>
//       <Row>
//         <Col>
//           <Tabs activeKey={activeTab} onSelect={eventKey => setActiveTab(eventKey)}>
//             <Tab title='All Questions' eventKey='all'>
//               <Table hover responsive className='align-middle'>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Image</th>
//                     <th>Body</th>
//                     <th>Answers</th>
//                     <th>Randomized</th>
//                     <th>Sanity</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {renderQuestions()}
//                 </tbody>
//               </Table>
//             </Tab>
//             <Tab title='Question Form' eventKey='form'>
//               <QuestionForm onSave={handleQuestionFormSave} onDiscard={handleQuestionFormDiscard} question={questionToEdit} />
//             </Tab>
//           </Tabs>
//         </Col>
//       </Row>


//       <ImagePreview image={selectedQuestionImage} show={showImagePreview} onClose={handleImagePreviewClose} />
//     </>
//   )
// }

// export default ExamForm