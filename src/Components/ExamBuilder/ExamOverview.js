import React, { useState, useRef } from 'react';
import { Tabs, Tab, Container, Row, Col, Form, Button, Table } from 'react-bootstrap'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import RangeSlider from 'react-bootstrap-range-slider';

import TimePicker from 'react-bootstrap-time-picker';


const ExamOverview = ({ user, exam, questions }) => {
  const mapQuestions = () => {
  }
  return (
    <Row>
      <Col className='col-12'>
        <Table responsive>
          <tbody>
            <tr>
              <td>Author</td>
              <td>{`${user.surname}, ${user.firstname}`}</td>
            </tr>
            <tr>
              <td>EID</td>
              <td style={{ fontFamily: 'consolas' }}>{exam.eid}</td>
            </tr>
            <tr>
              <td>Subject</td>
              <td>{exam.name === null ? '?' : exam.name}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{exam.date !== null ? '?' : exam.date}</td>
            </tr>
            <tr>
              <td>Timeframe</td>
              <td>{exam.date !== null ? '?' : exam.name}</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>{((exam.duration !== null) && (exam.duration !== null)) ? 'format date here like: 12:00 - 13:00' : '?'}</td>
            </tr>
            <tr>
              <td>Randomized</td>
              <td>{exam.isRandomized === true ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Questions</td>
              <td>{exam.questions === [] ? 'None' : mapQuestions()}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default ExamOverview
