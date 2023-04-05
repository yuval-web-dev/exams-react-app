import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'

import { examObject, questionObject } from '../../serverApis/classes';
import placeholder from '../../assets/placeholder.png'

const QuestionForm = () => {
  const [body, setBody] = useState('')
  const [image, setImage] = useState(placeholder)
  const [answers, setAnswers] = useState(['one', 'two', 'three'])

  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef !== null) {
      fileInputRef.current.click()
    }
  }

  const handleClearBtnClick = () => {
    setImage(placeholder)
  }

  const handleImageChange = (e) => {
    // TODO check if upload's valid before setting
    if (e.target.files.length > 0) {
      const uploadedFile = e.target.files[0]
      const imageUrl = URL.createObjectURL(uploadedFile)
      setImage(imageUrl)
    }

  }

  return (
    <div>
      <h2>Question Form</h2>
      <Row>
        <Col className=''>
          <Image src={image} style={{ height: '200px', width: '400px', objectFit: 'cover' }} className='img-fluid border border-2' alt='image depicting the question' onClick={handleClick} />
          <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='outline-primary' onClick={handleClearBtnClick}>Clear</Button>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex'>
          <Form.Group>
            <Form.Control type='text' placeholder='Question Body' spellCheck='true' />
          </Form.Group>
          <Button>Add</Button>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex'>
          <Form.Group>
            <Form.Control type='text' placeholder='Answer Body' spellCheck='true' />
          </Form.Group>
          <Button>Add</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* {renderAnswers} */}
        </Col>
      </Row>
    </div>
  )
}

export default QuestionForm


  // const renderAnswers = () => (
  //   answers.map((ans, idx) => {
  //     return (
  //       <tr key={idx.toString()} id={idx} style={{ 'verticalAlign': 'top' }}>
  //         <td>Radio Button</td>
  //         <td>Text Box</td>
  //         <td>Delete Button</td>
  //       </tr>
  //     )
  //   })
  // )