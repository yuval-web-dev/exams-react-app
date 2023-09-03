import React from "react"
import { Container } from "react-bootstrap";

import { Navs } from "../navs"


const PostLoginPageContainer = ({ children }) => {
  return (
    <React.Fragment>
      <Navs.Navbar />
      <Container>
        {children}
      </Container>
      <Navs.Footer />
    </React.Fragment>
  )
};


export default PostLoginPageContainer