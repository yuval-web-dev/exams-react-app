import React, { useState } from "react"
import { Form } from "react-bootstrap"


const Test = () => {

  const start = 9
  const end = 17

  const genOptions = () => {
    const options = []
    for (var i = start; i <= end; i++) {
      options.push({ val: i, repr: `${i}:00` })
    }
    return options
  }

  return (
    <Form.Select aria-label="Default select example">
      {genOptions().map((opt, idx) => (
        <option key={idx} value={opt.val}>{opt.repr}</option>
      ))}

    </Form.Select>
  )
}

export default Test

