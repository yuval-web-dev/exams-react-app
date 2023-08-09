import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const BottomNav = () => (
  <Container>
    <Navbar fixed='bottom' bg='light' variant='light'>
      <Navbar.Text className='mx-auto'>
        Copyright © 2023 ETest. All Rights Reserved.
      </Navbar.Text>
    </Navbar>
  </Container>
)

export default BottomNav