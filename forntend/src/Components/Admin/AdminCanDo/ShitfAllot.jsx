import React, { useState } from "react";
import { Card, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import { FaCheck, FaTimes, FaUser } from "react-icons/fa"; // Using Font Awesome icons
import {
  handleShiftFee,
  updateUserData,
  verifyStudentUserBYAdmin,
} from "../../Function";
import { useNavigate, useParams } from "react-router-dom";

function ShiftAllot({ setShitfFee, verifyToken, PendingMonthFee }) {
  const [formData, setFormData] = useState({
    shifts: "",
    MonthlyFee: "",
  });
  const navigate = useNavigate();
  const shifts = [
    "Morning",
    "Evening",
    "Full Day",
    "Night 1st Shift",
    "Night 2nd Shift",
    "Full Night",
  ];

  const { adminId, id, key } = useParams();
  const [Status, setStatus] = useState(verifyToken);

  const hanldeStatusOfUser = async () => {
    const res = await verifyStudentUserBYAdmin(id);
    setStatus(res);
    updateUserData(key, "Verify_tocken", res);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleShift = (shift) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      shifts: shift,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await handleShiftFee(formData, id, adminId);
    if (result && result.shiftdata) {
      localStorage.setItem(
        `FeeShiftData${id}`,
        JSON.stringify(result.shiftdata)
      );
      setShitfFee(false);
    } else {
      console.error("Failed to update shift fee or data is missing");
    }
    navigate(`/Profile/${adminId}/${key}/${id}`);
    window.location.reload();
  };

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
        className="p-4 shadow-lg rounded"
        style={{ width: "90%", maxWidth: "500px" }}
      >
        <span
          onClick={() => setShitfFee(false)}
          style={{
            fontSize: "1.5rem",
            color: "red",
            cursor: "pointer",
            position: "absolute",
            top: "15px",
            right: "15px",
          }}
        >
          <FaTimes />
        </span>

        {PendingMonthFee && PendingMonthFee > 0 ? (
          <p
            className="border p-3 rounded text-danger text-center"
            style={{ fontWeight: "bold" }}
          >
            <FaUser className="me-2" />
            First, tell the user to clear {PendingMonthFee} month(s) fee.
          </p>
        ) : (
          <>
            <p
              className="mb-3 text-center"
              style={{
                fontWeight: "bold",
                color: Status ? "green" : "red",
                cursor: "pointer",
              }}
              onClick={hanldeStatusOfUser}
            >
              {Status ? <FaCheck /> : <FaTimes />}{" "}
              {Status ? "User Activated" : "Inactive User"}
            </p>

            <form
              className="border p-4 shadow-sm rounded"
              onSubmit={handleSubmit}
            >
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formMonthlyFee" className="mb-3">
                    <Form.Label>Monthly Fee:</Form.Label>
                    <Form.Control
                      type="text"
                      name="MonthlyFee"
                      placeholder="Enter Monthly Fee"
                      value={formData.MonthlyFee}
                      onChange={handleChange}
                      required
                      className="border-dark"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formShift" className="mb-3">
                    <Form.Label>Shift:</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="w-100"
                      >
                        {formData.shifts ? formData.shifts : "Choose Shift"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {shifts.map((option, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => toggleShift(option)}
                          >
                            {option}
                            {formData.shifts === option && " ✔"}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" variant="primary" className="w-100">
                Submit
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}

export default ShiftAllot;
