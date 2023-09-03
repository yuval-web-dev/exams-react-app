import React from "react"
import { Container } from "react-bootstrap";

import { Navs } from "../navs"


const PostLogin = ({ children }) => {
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


export default PostLogin