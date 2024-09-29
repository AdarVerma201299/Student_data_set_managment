import React, { useState } from "react";

import { Container, Form, Row, Col, Button } from "react-bootstrap";

function AddressDetails({
  formData,
  setFormData,
  currentStep,
  nextStep,
  prevStep,
}) {
  const [sameAddress, setSameAddress] = useState(false);
  const handleSameAddressToggle = () => {
    setSameAddress((prev) => !prev);
    if (!sameAddress) {
      setFormData((prevData) => ({
        ...prevData,
        residential: { ...prevData.permanent },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        residential: {
          village: "",
          post: "",
          district: "",
          state: "",
          country: "",
          pincode: "",
        },
      }));
    }
  };
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    const [type, field] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [field]: value,
      },
    }));
  };

  const allFieldsFilled = () => {
    const addressFields = [
      "permanent.village",
      "permanent.post",
      "permanent.district",
      "permanent.state",
      "permanent.country",
      "permanent.pincode",
      "residential.village",
      "residential.post",
      "residential.district",
      "residential.state",
      "residential.country",
      "residential.pincode",
    ];

    const addressFilled = addressFields.every((field) => {
      const [type, key] = field.split(".");
      return formData[type][key];
    });

    return addressFilled;
  };
  return (
    <Container>
      <Form className="border p-4 shadow-sm rounded">
        <h4 className="mb-4 border p-2 shadow-sm rounded">Enter the Address</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formPermanent" className="mb-4">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                className="ContentSilde mb-2"
                type="text"
                name="permanent.village"
                placeholder="Village"
                value={formData.permanent.village}
                onChange={handleLocationChange}
              />
              <Form.Control
                type="text"
                name="permanent.post"
                placeholder="Post"
                value={formData.permanent.post}
                onChange={handleLocationChange}
                className="ContentSilde mb-2"
              />
              <Form.Control
                type="text"
                name="permanent.district"
                placeholder="District"
                value={formData.permanent.district}
                onChange={handleLocationChange}
                className="ContentSilde mb-2"
              />
              <Form.Control
                type="text"
                name="permanent.state"
                placeholder="State"
                value={formData.permanent.state}
                onChange={handleLocationChange}
                className="ContentSilde mb-2"
              />
              <Form.Control
                className="ContentSilde mb-2"
                type="text"
                name="permanent.country"
                placeholder="Country"
                value={formData.permanent.country}
                onChange={handleLocationChange}
              />
              <Form.Control
                className="ContentSilde mb-2"
                type="text"
                name="permanent.pincode"
                placeholder="pincode"
                value={formData.permanent.pincode}
                onChange={handleLocationChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {" "}
            {/* residental address */}
            <Form.Group controlId="formResidential" className="mb-4">
              <Form.Label className="me-4">Residential Address</Form.Label>
              <span
                onClick={handleSameAddressToggle}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`bi ${
                    sameAddress ? "bi-check2-square" : "bi-square"
                  }`}
                >
                  Same as Permanet Address
                </i>{" "}
              </span>
              <Form.Control
                type="text"
                name="residential.village"
                placeholder="Village"
                value={formData.residential.village}
                onChange={handleLocationChange}
                className="ContentSilde mb-2"
              />
              <Form.Control
                type="text"
                name="residential.post"
                placeholder="Post"
                value={formData.residential.post}
                onChange={handleLocationChange}
                className="ContentSilde mb-2"
              />
              <Form.Control
                type="text"
                name="residential.district"
                placeholder="District"
                value={formData.residential.district}
                onChange={handleLocationChange}
                className="ContentSilde mb-2"
              />
              <Form.Control
                type="text"
                name="residential.state"
                placeholder="State"
                value={formData.residential.state}
                onChange={handleLocationChange}
                className="ContentSilde mb-2"
              />
              <Form.Control
                className="ContentSilde mb-2"
                type="text"
                name="residential.country"
                placeholder="Country"
                value={formData.residential.country}
                onChange={handleLocationChange}
              />
              <Form.Control
                className="ContentSilde mb-2"
                type="text"
                name="residential.pincode"
                placeholder="pincode"
                value={formData.residential.pincode}
                onChange={handleLocationChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="m-2 w-100 border justify-content-center align-items-center p-2 shadow-sm rounded">
          <Row>
            <Col md={2}>
              {currentStep > 1 && <Button onClick={prevStep}>Previous</Button>}
            </Col>
            <Col md={8}></Col>
            <Col md={2}>
              <Button onClick={nextStep} disabled={!allFieldsFilled()}>
                Next
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Container>
  );
}

export default AddressDetails;
