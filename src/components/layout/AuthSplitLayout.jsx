import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function AuthSplitLayout({ children, bg }) {
  return (
    <Row className="vh-100 g-0">
      <Col lg={6} className="position-relative d-none d-lg-block">
        <div
          className="bg-holder"
          style={{
            backgroundImage: `url(${bg.src})`
          }}
        />
      </Col>
      <Col lg={6}>
        <Row className="flex-center h-100 g-0 px-4 px-sm-0">
          <Col sm={6} lg={7} xl={6}>
            {children}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}