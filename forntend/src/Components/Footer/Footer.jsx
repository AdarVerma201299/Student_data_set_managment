import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Some text about the company.</p>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>contact@company.com</p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <p>Links to social media accounts</p>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            <p>&copy; {new Date().getFullYear()} My Company</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
