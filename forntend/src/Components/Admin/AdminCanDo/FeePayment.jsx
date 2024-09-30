import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  calculateMonthDifference,
  FeeAndPaymentRecord,
  handleFeePayment,
} from "../../Function";
import { BiX } from "react-icons/bi"; // Importing icons for better UI

function FeePayment(props) {
  const formatDateToInput = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date) ? date.toISOString().split("T")[0] : "";
  };

  const [formData, setFormData] = useState({
    startDate: formatDateToInput(props.lastDateofPayment),
    EndDate: "",
    Payment: "",
  });

  const [totalMonths, setTotalMonths] = useState(0);
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "EndDate") {
      const startDate = formData.startDate;
      const endDate = value;
      if (startDate && endDate) {
        const months = calculateMonthDifference(startDate, endDate);
        setTotalMonths(months);
        if (months > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            Payment: props.PerMonthFee * months,
          }));
        }
      }
    }
  };

  const getMinEndDate = () => {
    const startDate = new Date(formData.startDate);
    startDate.setDate(startDate.getDate() + 1);
    return startDate.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    FeeAndPaymentRecord(id, formData);
    handleFeePayment(e, id, formData);
    props.setfeePay(false);
  };

  if (!props.feePay) {
    return null; // Don't render if feePay is false
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1050, // Ensure it's above other content
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      }}
    >
      <Card
        className="shadow-lg rounded"
        style={{ width: "100%", maxWidth: "500px", position: "relative" }}
      >
        <span
          onClick={() => props.setfeePay(false)}
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "red",
            cursor: "pointer",
            position: "absolute",
            top: "15px",
            right: "15px",
          }}
        >
          <BiX />
        </span>
        <Card.Body>
          <h4 className="text-center mb-4">Fee Payment</h4>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formstartDate">
                  <Form.Label>Payment Date From:</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    readOnly // Disable this field since it's pre-filled
                    className="bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEndDate">
                  <Form.Label>Payment Date To:</Form.Label>
                  <Form.Control
                    type="date"
                    name="EndDate"
                    value={formData.EndDate}
                    onChange={handleChange}
                    required
                    min={getMinEndDate()}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              {totalMonths > 0 && (
                <>
                  <Col>
                    <Form.Group controlId="formMonthlyFee">
                      <Form.Label>Payment:</Form.Label>
                      <Form.Control
                        type="text"
                        name="Payment"
                        value={formData.Payment}
                        readOnly
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="d-flex align-items-center">
                    <p className="mb-0">{`Total Months: ${totalMonths}`}</p>
                  </Col>
                  <Col>
                    <Button variant="primary" type="submit" className="w-100">
                      Submit
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FeePayment;
