import { v4 as uuidv4 } from 'uuid'

class ClosedQuestion {
  id: string = uuidv4()
  constructor(
    public body: string | File, // either text question or image question
    public answers: string[],
    public correct: string,
    public shuffled: boolean
  ) { }
}

class OpenQuestion {
  id: string = uuidv4()
  constructor(
    public body: string | File // either text question or image question
  ) { }
}

class Metadata {
  constructor(
    public subject: string,
    public author: { firstname: string, surname: string },
    public start: Date,
    public duration: number,
    public shuffled: boolean
  ) { }
}

class Exam {
  id: string = uuidv4()
  modifiable = true

  constructor(
    public metadata: Metadata,
    public questions: ClosedQuestion[] | OpenQuestion[]
  ) { }
}

export {
  ClosedQuestion,
  OpenQuestion,
  Exam,
  Metadata
}