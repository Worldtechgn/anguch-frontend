import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer" style={{ backgroundColor: '#fff', }}>
        <Container fluid={true}>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © ANGUCH.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                Agence Nationale de Gestion des Urgences et Catastrophes Humanitaires
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
