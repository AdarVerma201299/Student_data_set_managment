import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { handleRegistationSubmit } from "../../Function";
import { SuccesMsg } from "../../Index";
import { useNavigate } from "react-router-dom";
function FinalPage({
  formData,
  setFormData,
  currentStep,
  prevStep,
  Type,
  adminData,
}) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      Security: { ...formData.Security, [e.target.name]: e.target.value },
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const regex = /^[a-zA-Z0-9]+@[0-9]{4}$/;
    if (name === "userId" && !regex.test(value)) {
      setError("Invalid format. Use format: username@1234");
    } else {
      setError("");
    }
  };

  const validatePasswords = () => {
    if (formData.Security.password !== formData.Security.confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const [msg, setmsg] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError === "") {
      const mssg = await handleRegistationSubmit(e, formData, Type);
      setmsg(mssg);
      if (mssg) navigate("/");
      else {
        alert("Registration failed or was incomplete.");
      }
    } else {
      alert(`${passwordError}`);
    }
  };
  const style = {
    position: "relative",
    top: "100%",
    left: "0",
    textAlign: "start",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    padding: "8px",
    zIndex: 1,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    borderRadius: "4px",
  };

  return (
    <Container>
      <Form className="border p-4 shadow-sm rounded" onSubmit={handleSubmit}>
        <h4 className="mb-4 border p-2 shadow-sm rounded">
          Choose Your Strong Password
        </h4>
        {adminData === null ? (
          <Form.Group
            controlId="formUserId"
            className="d-flex justify-content-between mb-3"
          >
            <Form.Label className="mb-0 me-2 flex-shrink-0">UserId:</Form.Label>
            <Form.Control
              className="ContentSilde"
              type="text"
              name="userId"
              placeholder="Enter your UserId"
              value={formData.Security.userId || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!error}
              required
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
        ) : null}

        <Row>
          <Col>
            <Form.Group
              controlId="formPassword"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label className="mb-0 me-2 flex-shrink-0">
                Password:
              </Form.Label>
              <Form.Control
                className="ContentSilde"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.Security?.password || ""}
                onChange={handleChange}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group
              controlId="formConfirmPassword"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label className="mb-0 me-2 flex-shrink-0">
                Confirm Password:
              </Form.Label>
              <Form.Control
                className="ContentSilde"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.Security?.confirmPassword || ""}
                onChange={handleChange}
                onBlur={validatePasswords}
                isInvalid={!!passwordError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {isHovered && (
          <Row>
            <div className="instruction-box" style={style}>
              Please enter a valid value according to the field requirements.
            </div>
          </Row>
        )}

        <div className="m-2 w-100 border justify-content-center align-items-center p-2 shadow-sm rounded">
          <Row>
            <Col md={2}>
              {currentStep > 1 && <Button onClick={prevStep}>Previous</Button>}
            </Col>
            <Col md={8}></Col>
            <Col md={2}>
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </div>
      </Form>
      {msg ? (
        <SuccesMsg successMsg={"Registration done successfully"} />
      ) : (
        "hell"
      )}
    </Container>
  );
}

export default FinalPage;
