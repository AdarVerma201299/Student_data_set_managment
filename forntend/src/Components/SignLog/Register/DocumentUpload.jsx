import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";

function DocumentUpload({
  formData,
  setFormData,
  currentStep,
  nextStep,
  prevStep,
}) {
  const [imagePreview, setimagePreview] = useState(
    "https://via.placeholder.com/40"
  );
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const file = files[0];
      const filePreviewUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        Document: {
          ...prevData.Document,
          [name]: file,
        },
      }));

      // Set preview only for the main image
      if (name === "image") {
        setimagePreview(filePreviewUrl);
      }
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      Document: { ...formData.Document, [e.target.name]: e.target.value },
    });
  };

  const allFieldsFilled = () => {
    const requiredFields = [
      "aadhaar",
      "image",
      "FrontAadharCardImage",
      "BackAadharCardImage",
    ];

    return requiredFields.every((field) => formData.Document[field]);
  };

  return (
    <Container>
      <Form className="border p-4 shadow-sm rounded">
        <h4 className="mb-4 border p-2 shadow-sm rounded">
          Enter Your Personal Data
        </h4>
        <Form.Group
          controlId="formAadhaar"
          className="d-flex justify-content-between mb-3"
        >
          <Form.Label className="mb-0 me-2 flex-shrink-0">
            Aadhaar Number:
          </Form.Label>
          <Form.Control
            className="ContentSilde"
            type="text"
            name="aadhaar"
            placeholder="Enter your Aadhaar number"
            value={formData.Document?.aadhaar || ""}
            onChange={handleChange}
            required
            maxLength="12"
          />
        </Form.Group>
        <Row>
          <Col md={6} className="justify-content-between align-content-center">
            <Form.Group
              controlId="formImage"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label>Upload Image:</Form.Label>
              <div>
                <Form.Control
                  className="ContentSilde me-3"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <img
              className="mb-2"
              src={imagePreview}
              alt="Uploaded preview"
              style={{
                width: "200px",
                height: "250px",
                objectFit: "cover",
              }}
            />
          </Col>
        </Row>
        <Row>
          <h4 className="m-2 text-algin-start">
            Upload Front Image of Aadhaar Card
          </h4>
          <Col>
            <Form.Group
              controlId="formFrontAadharCardImage"
              encType="multipart/form-data"
              className="mb-3"
            >
              <Form.Label>Front</Form.Label>
              <Form.Control
                className="ContentSilde"
                type="file"
                name="FrontAadharCardImage"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              controlId="formBackAadharCardImage"
              encType="multipart/form-data"
              className="mb-3"
            >
              <Form.Label>Back</Form.Label>
              <Form.Control
                className="ContentSilde"
                type="file"
                name="BackAadharCardImage"
                accept="image/*"
                onChange={handleFileChange}
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

export default DocumentUpload;
