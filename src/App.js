import React from 'react'
import Navbar from './Component/Navbar'
import Addtask from './Component/Addtask'
import AddTable from "./Component/Tasklist"
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
