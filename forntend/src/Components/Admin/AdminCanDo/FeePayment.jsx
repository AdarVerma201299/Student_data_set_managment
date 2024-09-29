import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  calculateMonthDifference,
  FeeAndPaymentRecord,
  handleFeePayment,
} from "../../Function";

function FeePayment(props) {
  const { key } = useParams();
  const formatDateToInput = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date)) {
      return date.toISOString().split("T")[0];
    }
    return "";
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
  console.log("key", key);
  return (
    <div className="bg-gray">
      <div className="PopUpELement">
        <Card className="SuccessMsg d-flex justify-content-center align-content-center">
          <span
            onClick={() => {
              props.setfeePay(false);
            }}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "end",
              color: "red",
              cursor: "pointer",
            }}
          >
            <i class="bi bi-x-lg"></i>
          </span>
          <form
            className="border m-3 p-4 shadow-sm rounded"
            onSubmit={handleSubmit}
          >
            <Row>
              <p>Payment Date</p>
              <Col md={6}>
                <Form.Group controlId="formstartDate" className="mb-3 d-flex">
                  <Form.Label>From:</Form.Label>
                  <Form.Control
                    className="ContentSilde"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    readOnly // Disable this field since it's pre-filled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEndDate" className="mb-3 d-flex">
                  <Form.Label>To:</Form.Label>
                  <Form.Control
                    className="ml-3 ContentSilde"
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
            <Row>
              {totalMonths > 0 && (
                <>
                  <Col>
                    <Form.Group
                      controlId="formMonthlyFee"
                      className="d-flex justify-content-between mb-3"
                    >
                      <Form.Label className="mb-0 me-2 flex-shrink-0">
                        Payment:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="Payment"
                        placeholder="Enter Monthly Fee"
                        value={formData.Payment}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <p>{`Total Months: ${totalMonths}`}</p>
                  </Col>
                  <Col>
                    <Button className="ContentSilde" type="submit">
                      Submit
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default FeePayment;
