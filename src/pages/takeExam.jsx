import React from "react"
import { ListGroup, Container, Pagination, Row, Col } from "react-bootstrap"
import * as storage from "../storage"



const TakeExamPage = () => {
  const [selectedAnswers, setSelectedAnswers] = React.useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {}
  )
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  const exam = {
    "_id": "64f06311587aea9faae4b4d9",
    "name": "c++",
    "lecturer_firstname": "Ofer",
    "lecturer_surname": "Shir",
    "start": "2024-03-20T14:00:00.000Z",
    "duration": 120,
    "shuffle": false,
    "questions": [
      {
        "question": "Which of the following is the correct way to declare a variable in C++?",
        "answers": [
          "variableName type;",
          "type variableName;",
          "var variableName;",
          "declare variableName type;"
        ],
        "correct": "type variableName;",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b94"
      },
      {
        "question": "What is the output of the following code?\\n\\nint x = 5;\\ncout << x++ << \\\" \\\" << x;",
        "answers": [
          "5 6",
          "6 6",
          "5 5",
          "6 5"
        ],
        "correct": "5 6",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b95"
      },
      {
        "question": "Which header file should be included to work with input and output operations in C++?",
        "answers": [
          "<input>",
          "<output>",
          "<iostream>",
          "<stdio>"
        ],
        "correct": "<iostream>",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b96"
      },
      {
        "question": "What does the `new` operator do in C++?",
        "answers": [
          "Creates a new object of a class.",
          "Allocates memory for a variable on the heap.",
          "Returns the next available index of an array.",
          "Deallocates memory from the heap."
        ],
        "correct": "Allocates memory for a variable on the heap.",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b97"
      },
      {
        "question": "What is the correct syntax to define a member function outside the class declaration?",
        "answers": [
          "returnType functionName() {...}",
          "void functionName() {...}",
          "functionName() {...}",
          "returnType ClassName::functionName() {...}"
        ],
        "correct": "returnType ClassName::functionName() {...}",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b98"
      },
      {
        "question": "Which C++ construct is used to implement a loop that executes a statement repeatedly as long as a condition is true?",
        "answers": [
          "for loop",
          "while loop",
          "do-while loop",
          "repeat loop"
        ],
        "correct": "while loop",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b99"
      },
      {
        "question": "What is the result of the expression `sizeof('a')`?",
        "answers": [
          "1",
          "4",
          "8",
          "Depends on the compiler"
        ],
        "correct": "1",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b9a"
      },
      {
        "question": "Which of the following is NOT a C++ standard data type?",
        "answers": [
          "int",
          "double",
          "float",
          "decimal"
        ],
        "correct": "decimal",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b9b"
      },
      {
        "question": "What is the purpose of the `const` keyword in C++?",
        "answers": [
          "To declare a constant variable.",
          "To indicate that a function does not return a value.",
          "To define a constructor for a class.",
          "To include a header file."
        ],
        "correct": "To declare a constant variable.",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b9c"
      },
      {
        "question": "What is the output of the following code?\\n\\nint arr[] = {1, 2, 3, 4, 5};\\ncout << arr[3];",
        "answers": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correct": "4",
        "shuffle": false,
        "_id": "64f07b0f051d980e288f6b9d"
      }
    ],
    "__v": 0
  }

  const RenderPagination = () => {
    const handlePagClick = (idx) => {
      setActive(idx)
    }

    return (
      <Pagination>
        {
          exam.questions.map((quest, idx) => (
            <Pagination.Item
              key={idx}
              value={idx}
              active={idx === active}
              onClick={() => handlePagClick(idx)}>
              {idx + 1}
            </Pagination.Item>)
          )
        }
      </Pagination>
    )
  }

  const Question = (quest) => {
    const handleSelectAnswer = (answer) => {
      setSelectedAnswers((prevSelectedAnswers) => {
        // Create a copy of the previous selectedAnswers state
        const newSelectedAnswers = { ...prevSelectedAnswers };

        if (newSelectedAnswers[quest._id] === answer) {
          // If the answer is already selected, remove it
          delete newSelectedAnswers[quest._id];
        } else {
          // Otherwise, add/update the selected answer
          newSelectedAnswers[quest._id] = answer;
        }

        // Log the updated selectedAnswers
        console.log(newSelectedAnswers);

        // Return the updated selectedAnswers object
        return newSelectedAnswers;
      });
    };

    return (
      <ListGroup>
        <ListGroup.Item>{quest.question}</ListGroup.Item>
        {quest.answers.map((answer, idx) => (
          <ListGroup.Item
            key={idx}
            action
            onClick={() => handleSelectAnswer(answer)}
            active={selectedAnswers[quest._id] === answer}>
            {`${idx + 1}.\t${answer}`}
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }


  return (
    <Container>
      <Row>
        <Col>
          {Question(exam.questions[active])}
        </Col>
      </Row>
      <Row>
        <Col>
          {RenderPagination()}
        </Col>
      </Row>
    </Container>
  )
}

export default TakeExamPage