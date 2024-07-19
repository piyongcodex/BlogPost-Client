import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-2">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are a company dedicated to providing the best service. Our
              mission is to make your life easier with our products.
            </p>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: piyongx@company.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: Bgy. Sta. Monica, USA</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" className="text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
