import React, { useRef, useImperativeHandle, forwardRef } from "react"
import {
  Row, Col,
} from "react-bootstrap"

import { ClosedQuest } from "../../classes.ts"
import BodyCard from "./BodyCard.jsx"
import AnswersCard from "./AnswersCard.jsx"

const QuestForm = forwardRef(({ }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      return null
    },
    yield() {
      try {
        bodyCardRef.current.validate()
      }
      catch {
        alert("bodyCard form validation failed")
        return
      }
      try {
        ansCardRef.current.validate()
      }
      catch {
        alert("answerCard form validation failed")
        return
      }

      const { type, body, code } = bodyCardRef.current.yield()
      const { answers, correct, shuffle } = ansCardRef.current.yield()

      return new ClosedQuest(
        type,
        body,
        code,
        answers,
        correct,
        shuffle
      )
    }
  }))

  const bodyCardRef = useRef()
  const ansCardRef = useRef()

  return (
    <Row>
      <Col xs="12">
        <BodyCard ref={bodyCardRef} />
      </Col>
      <Col xs="12">
        <AnswersCard ref={ansCardRef} />
      </Col>
    </Row>
  )
})

export default QuestForm
