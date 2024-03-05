import React from 'react'
import Navbar from './Component2/Navbar'
import Addtask from './Component2/Addtask'
import AddTable from "./Component2/Tasklist"
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  return (
    <Container>
      < Navbar />
      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <Addtask />
          <AddTable />
        </Col>

      </Row>

    </Container>



  )
}

export default App
