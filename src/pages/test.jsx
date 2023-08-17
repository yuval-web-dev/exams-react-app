import React, { useState } from "react"
import axios from "axios"
import {
  Form,
  Button,
  ButtonGroup
} from "react-bootstrap"

import { Text, CloseEnded } from "../classes.ts"

const quizApi = async (apiKey, category, tags, difficulty) => {
  try {
    const response = await axios.get(
      "https://quizapi.io/api/v1/questions",
      {
        params: {
          apiKey: apiKey,
          category: category,
          tags: tags,
          difficulty: difficulty,
          limit: 1
        }
      })
    return response.data[0]
  }
  catch (error) {
    console.error("Error:", error)
  }
}

const demo = async () => {
  var resdata
  try {
    resdata = await quizApi(
      "VOZNHbvQRb0rmx9OYxp0gykxs0wP7bsdB5GabvfC",
      "linux",
      "bash",
      "medium"
    )
  }
  catch (err) {
    console.error(err)
  }

  console.log(resdata)

  const body = new Text(resdata?.question)
  const answers = []
  var correct

  for (const [key, val] of Object.entries(resdata?.answers)) {
    if (key === resdata?.correct_answer) {
      correct = val
    }
    if (val !== null) {
      answers.push(val)
    }
  }

  const obj = new CloseEnded(
    body,
    answers,
    correct,
    false
  )

  console.log(obj)

}

const Test = () => {

  // demo()

  return (
    <Form>
      <Form.Label>asdf</Form.Label>
      <Form.Control as="Row">
        <ButtonGroup>
          <Button>Open</Button>
          <Button>Closed</Button>
        </ButtonGroup>
      </Form.Control>
    </Form>
  )
}

export default Test
