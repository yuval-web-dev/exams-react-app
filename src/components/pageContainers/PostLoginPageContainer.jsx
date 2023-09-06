import React from "react"
import { Container } from "react-bootstrap";

import { Navs } from "../navs"


const PostLoginPageContainer = ({ children }) => {
  return (
    <React.Fragment>
      <Navs.Navbar fluid={"xxl"} />
      <Container fluid="xxl">
        {children}
      </Container>
      <Navs.Footer />
    </React.Fragment>
  )
};


export default PostLoginPageContainer