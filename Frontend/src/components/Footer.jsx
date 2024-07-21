import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>About Artvista Gallery</h5>
            <p className="text-muted">Artvista Gallery is committed to showcasing the finest artworks from around the world.</p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Contact Us</h5>
            <address className="text-muted">
              123 Gallery Street, <br />
              Art City, Artland <br />
              Email: info@artvistagallery.com <br />
              Phone: +123 456 7890
            </address>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Facebook</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Twitter</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Instagram</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p className="text-center text-muted">&copy; {new Date().getFullYear()} Artvista Gallery. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
