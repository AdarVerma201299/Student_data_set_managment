import React, { useState } from "react";
import { Card, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
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
    <div className="PopUpELement">
      <Card className="SuccessMsg d-flex justify-content-center align-content-center p-2">
        <span
          onClick={() => {
            setShitfFee(false);
          }}
          style={{
            fontSize: "1rem",
            display: "flex",
            justifyContent: "end",
            cursor: "pointer",
          }}
        >
          <i class="bi bi-x-lg"></i>
        </span>
        {PendingMonthFee && PendingMonthFee > 0 ? (
          <p
            className="border p-4 shadow-sm rounded"
            style={{ fontWeight: "bold" }}
          >
            {" "}
            Firstly Say to Clear User to Clear {PendingMonthFee} month Fee{" "}
          </p>
        ) : (
          <>
            <p
              style={{
                fontWeight: "bold",
                color: Status ? "green" : "red",
                cursor: "pointer",
              }}
              onClick={hanldeStatusOfUser}
            >
              {!Status ? "UnActive User" : "User Are Activeted"}
            </p>

            <form
              className="border p-4 shadow-sm rounded"
              action="Post"
              onSubmit={handleSubmit}
            >
              <Row>
                <Col md={6}>
                  <Form.Group
                    controlId="formMonthlyFee"
                    className="d-flex justify-content-between mb-3"
                  >
                    <Form.Label className="mb-0 me-2 flex-shrink-0">
                      Monthly Fee:
                    </Form.Label>
                    <Form.Control
                      className="ContentSilde"
                      type="text"
                      name="MonthlyFee"
                      placeholder="Enter Monthly Fee"
                      value={formData.MonthlyFee}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formShift" className="d-flex  mb-3">
                    <Form.Label className="mb-0 me-2 flex-shrink-0">
                      Shift:
                    </Form.Label>
                    <Dropdown className="ContentSilde">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {formData.shifts ? formData.shifts : "Choose Shift"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {shifts.map((option, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => toggleShift(option)} // Handle single selection
                          >
                            {option}
                            {formData.shifts === option && " ✔"}{" "}
                            {/* Show checkmark if selected */}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  {" "}
                  <Button type="Submit">Submit</Button>
                </Col>
              </Row>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}

export default ShiftAllot;
