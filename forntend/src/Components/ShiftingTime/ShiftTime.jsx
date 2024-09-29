import React from "react";
import "./ShiftTime.css"; // Custom CSS for additional styles
import { Card, Container, Row, Col } from "react-bootstrap";

import { Clock, CashStack } from "react-bootstrap-icons";

const ShiftTime = () => {
  // Sample data for class shifts
  const shiftData = {
    dayTwoShift: [
      { shift: "1st Shift", timing: "6AM to 1PM", fee: "500 Rs" },
      { shift: "2nd Shift", timing: "1PM to 8PM", fee: "500 Rs" },
      { shift: "Full Day", timing: "8AM to 5PM", fee: "800 Rs" },
    ],

    nightTwoShift: [
      { shift: "1st Shift", timing: "8PM to 1AM", fee: "400 Rs" },
      { shift: "2nd Shift", timing: "1PM to 6AM", fee: "400 Rs" },
      { shift: "Full Night", timing: "8PM to 1AM", fee: "800 Rs" },
    ],
  };

  // Render cards for a specific category
  const renderShifts = (categoryName, shifts) => (
    <div className="shift-category mb-4">
      <h3 className="category-title">{categoryName}</h3>
      <Row>
        {shifts.map((shift, index) => (
          <Col md={4} key={index}>
            <Card className="shift-card mb-4">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <Clock className="me-2" /> {shift.shift}
                </Card.Title>
                <Card.Text>
                  <strong>Timing:</strong> {shift.timing}
                </Card.Text>
                <Card.Text className="d-flex align-items-center">
                  <CashStack className="me-2" /> <strong>Fee:</strong>{" "}
                  {shift.fee}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  return (
    <Container className="shift-schedule-container">
      <h2 className="text-center mb-5">Class Shift Schedule</h2>
      <Row>
        <Col> {renderShifts("Day Shift", shiftData.dayTwoShift)}</Col>

        <Col>{renderShifts("Night Shift", shiftData.nightTwoShift)}</Col>
      </Row>
    </Container>
  );
};

export default ShiftTime;
