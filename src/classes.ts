import { v4 as uuidv4 } from 'uuid'

class ClosedQuest {
  id: string = uuidv4()
  constructor(
    public type: "text" | "image",
    public body: string | File, // either text question or image question
    public code: { lang: string, val: string },
    public answers: string[],
    public correct: string,
    public shuffled: boolean
  ) { }
}

class OpenQuest {
  id: string = uuidv4()
  constructor(
    public type: "text" | "image",
    public body: string | File, // either text question or image question
    public code: string
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
    public quests: ClosedQuest[] | OpenQuest[]
  ) { }
}

export {
  ClosedQuest,
  OpenQuest,
  Exam,
  Metadata
}