import React from "react"
import moment from "moment"
import { Row, Col, Accordion, ListGroup, Spinner } from "react-bootstrap"
import * as AuthKit from "react-auth-kit"

import { PageContainers } from "../components"
import { default as api } from "../api"


const MySubmissionsPage = () => {
  const [submissions, setSubmissions] = React.useState([])
  const [pageLoading, setPageLoading] = React.useState(true)
  const authHeader = AuthKit.useAuthHeader()

  React.useEffect(() => {
    const getSubmissions = async () => {
      // Fetch exams from the API
      const submissions = await api.db.getSubmissions(authHeader())
      if (submissions) {
        setSubmissions(submissions)
        setPageLoading(false)
      }
    }

    getSubmissions()
  }, [])

  const renderMetadata = (submission) => {
    const totalAnswers = submission.answers.length
    const totalUserAnswered = submission.answers.filter(answer => answer.selectedAnswer).length

    return (
      <ListGroup.Item>
        <span>Answered: <span className={totalUserAnswered < totalAnswers ? "text-danger" : "text-success"}>{totalUserAnswered}</span>/{totalAnswers}</span>
        <span className="ms-3">Score: <span className={submission.score < 56 ? "text-danger" : "text-success"}>{submission.score}</span>/100</span>
      </ListGroup.Item>
    )
  }

  const renderListGroupItem = (answer, idx) => {
    var renderAnswer
    var isCorrect = false
    if (answer.repr.selectedAnswer) {
      if (answer.selectedAnswer === answer.correctAnswer) {
        isCorrect = true
        renderAnswer = <span className="text-success">{answer.repr.selectedAnswer}</span>
      }
      else {
        renderAnswer = <span className="text-danger">{answer.repr.selectedAnswer}</span>
      }
    }
    else {
      renderAnswer = <span className="text-danger">*None selected</span>
    }


    return (
      <ListGroup.Item key={idx} className="d-flex" variant={isCorrect ? "success" : "danger"}>
        {idx + 1}.
        <div className="ms-3">
          Q: {answer.repr.question}
          <br />
          A: {renderAnswer}
        </div>
      </ListGroup.Item>
    )
  }

  const calcAvg = (submissions) => {
    var avg = 0
    submissions.forEach(submission => { avg += submission.score })
    return avg / submissions.length
  }


  return (
    <PageContainers.PostLogin>
      <Row>
        <Col xs="12" className="my-3">
          <span className="fs-4">Submissions</span>
        </Col>
        {
          pageLoading ? <Spinner /> :
            <React.Fragment>
              <Col xs="12" className="my-2">
                <span className="fs-5">Grades average: {calcAvg(submissions)}</span>
              </Col>
              <Col xs="12">
                <Accordion>
                  {submissions.map((submission, idx) => (
                    <Accordion.Item key={idx} eventKey={idx}>
                      <Accordion.Header>
                        <div className="w-100 d-flex flex-row justify-items-start">
                          <span className="me-auto" style={{ pointerEvents: "none" }}>{submission.examName}</span>
                          <span style={{ pointerEvents: "none" }}>{moment(submission.date).add(3, "hours").format("H:mm, D/M/YY")}</span>
                        </div>
                      </Accordion.Header>

                      <Accordion.Body className="p-0" style={{ height: "300px", overflowY: "auto" }}>

                        <ListGroup variant="flush">
                          {renderMetadata(submission)}
                          {submission.answers.map((answer, idx) => renderListGroupItem(answer, idx))}
                        </ListGroup>

                      </Accordion.Body>
                    </Accordion.Item>

                  ))}
                </Accordion>
              </Col>
            </React.Fragment>
        }
      </Row>
    </PageContainers.PostLogin >
  )
}



export default MySubmissionsPage