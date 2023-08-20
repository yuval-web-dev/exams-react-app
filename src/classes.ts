import { v4 as uuidv4 } from 'uuid'

class Txt {
  constructor(
    public val: string,
    public code?: { lang: string, val: string }
  ) { }
}

class Img {
  constructor(
    public val: File
  ) { }
}

class CloseEnded {
  id: string = uuidv4()
  constructor(
    public body: Text | Img,
    public answers: string[],
    public correct: string,
    public shuffle: boolean
  ) { }
}

class OpenEnded {
  id: string = uuidv4()
  constructor(
    public body: Text | Img,
    public points: number
  ) { }
}

class QuestList {
  constructor(
    public type: "open" | "closed",
    public items: CloseEnded[] | OpenEnded[],
    public shuffle: boolean
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
    public questList: QuestList
  ) { }
}

export {
  Txt, Img,
  CloseEnded, OpenEnded,
  QuestList,
  Metadata,
  Exam
}