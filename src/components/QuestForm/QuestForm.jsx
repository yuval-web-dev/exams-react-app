import React, { useRef, useImperativeHandle, forwardRef } from "react"
import {
  Row, Col,
} from "react-bootstrap"

import { CloseEnded, OpenEnded } from "../../classes.ts"
import BodyCard from "./BodyCard/BodyCard.jsx"
import AnswersCard from "./AnswersCard.jsx"

const QuestForm = forwardRef(({ type }, ref) => {
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
      if (type === "closed") {
        try {
          ansCardRef.current.validate()
        }
        catch {
          alert("answerCard form validation failed")
          return
        }
      }

      const { body, score } = bodyCardRef.current.yield()

      if (type === "closed") {
        const { answers, correct, shuffle } = ansCardRef.current.yield()
        return new CloseEnded(
          body,
          answers,
          correct,
          shuffle
        )
      }
      else {
        return new OpenEnded(
          body,
          score
        )
      }
    }
  }))

  const bodyCardRef = useRef()
  const ansCardRef = useRef()

  return (
    <Row>
      <Col xs="12">
        <BodyCard type={type} ref={bodyCardRef} />
      </Col>
      <Col xs="12">
        {type === "closed" ? <AnswersCard ref={ansCardRef} /> : null}
      </Col>
    </Row>
  )
})

export default QuestForm
