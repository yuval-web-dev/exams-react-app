import React, { useState } from "react"
import {
  Row, Col
} from "react-bootstrap"

import { MetadataComponent } from "../Metadata"
import { QuestList } from "../QuestList"

import * as storage from "../../utils/storage"

const ExamEditor = ({ setObj }) => {
  const [metadataObj, setMetadataObj] = useState(null)
  const [questlistObj, setQuestlistObj] = useState(null)


  return (
    <Row>
      <Col lg="4">
        <MetadataComponent setObj={setMetadataObj} />
      </Col>
      <Col>
        <QuestList setObj={setQuestlistObj} />
      </Col>
    </Row>
  )
}

export default ExamEditor



// const examObj = new Exam(
//   metaFormRef.current.yield(),
//   questListRef.current.yield()
// )
// storage.save(examObj.id, examObj)