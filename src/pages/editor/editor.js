import React, { useState } from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap'

import { QuestionList, MetadataForm, AppNav } from '../../components'
import QuestionForm from '../../components/ClosedQuestionForm/ClosedQuestionForm'


const Editor = () => {
  const [activeKey, setActiveKey] = useState('metadata')

  const onTabSelect = (selectedTab) => {
    setActiveKey(selectedTab)
  }

  return (
    <React.Fragment>
      <AppNav />
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
            <QuestionList />
          </Tab>

          <Tab
            title='New Question'
            eventKey='new question'>
            <QuestionForm />
          </Tab>
        </Tabs>
      </Container>
    </React.Fragment>
  )
}

export default Editor