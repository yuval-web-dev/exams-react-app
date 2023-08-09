import React, { useState } from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap'

import { QuestionList, MetadataForm, Navs } from '../components'

import QuestionForm from '../components/ClosedQuestionForm/ClosedQuestionForm'


const Editor = () => {
  const [activeKey, setActiveKey] = useState('metadata')

  const [questions, setQuestions] = useState([])

  const onTabSelect = (selectedTab) => {
    setActiveKey(selectedTab)
  }

  const onQuestionFormSave = (newQuestion) => {
    setQuestions([...questions, newQuestion])
  }

  return (
    <React.Fragment>
      <Navs.TopNavbar />
      <Container>
        <Tabs
          activeKey={activeKey}
          onSelect={onTabSelect}>
          <Tab
            title='Metadata'
            eventKey='metadata'>
            <MetadataForm />
          </Tab>
          <Tab
            title='All Questions'
            eventKey='questions'>
            <QuestionList questions={questions} setQuestions={setQuestions} />
          </Tab>

          <Tab
            title='New Question'
            eventKey='new question'>
            <QuestionForm onSave={onQuestionFormSave} />
          </Tab>
        </Tabs>
      </Container>
      <Navs.BottomNavbar />
    </React.Fragment>
  )
}

export default Editor