import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AlertPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="text-center p-4 shadow">
            <Card.Body>
              <Card.Title>Request Sent</Card.Title>
              <Card.Text>
                Someone will be getting back to you shortly.
              </Card.Text>
              <Button variant="primary" onClick={handleClick}>
                Submit Another Request
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AlertPage;