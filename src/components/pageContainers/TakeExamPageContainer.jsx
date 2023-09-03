import React from "react"
import { Container } from "react-bootstrap";

import { Navs } from "../navs"


const TakeExamPageContainer = ({ children }) => {
  return (
    <React.Fragment>
      <Navs.TakeExam />
      <Container>
        {children}
      </Container>
      <Navs.Footer />
    </React.Fragment>
  )
};


export default TakeExamPageContainer