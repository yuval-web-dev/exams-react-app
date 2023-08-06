import { v4 as uuidv4 } from 'uuid'

class ClosedQuestion {
  id: string = uuidv4()
  constructor(
    body: string | { image: File, alt: string }, // either text question or image question
    answers: string[],
    correct: string,
    shuffled: boolean
  ) { }
}

class OpenQuestion {
  id: string = uuidv4()
  constructor(
    body: string | { image: File, alt: string }, // either text question or image question
  ) { }
}

class Exam {
  id: string = uuidv4()
  modifiable = true

  constructor(
    public subject: string,
    public author: { firstname: string, surname: string },
    public start: Date,
    public duration: number,
    public questions: ClosedQuestion[] | OpenQuestion[],
    public shuffled: boolean
  ) { }
}

export {
  ClosedQuestion,
  OpenQuestion,
  Exam,
}