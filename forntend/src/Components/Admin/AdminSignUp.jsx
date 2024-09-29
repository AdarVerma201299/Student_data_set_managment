import React from "react";

import { Container, Form, Row, Col } from "react-bootstrap";

function AdminSignUp({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      personal: { ...formData.personal, [e.target.name]: e.target.value },
    });
  };
  return (
    <Container>
      <Form className="border p-4 shadow-sm rounded">
        <h4 className="mb-4 border p-2 shadow-sm rounded">
          Enter Your Personal Data
        </h4>
        <Row>
          <Col md={6}>
            <Form.Group
              controlId="formName"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label className="mb-0 me-2 flex-shrink-0">Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.personal.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              controlId="formMobile"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label className="mb-0 me-2 flex-shrink-0">
                Mobile:
              </Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.personal?.mobile || ""}
                onChange={handleChange}
                required
                maxLength="10"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group
              controlId="formFatherName"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label className="mb-0 me-2 flex-shrink-0">
                Father Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="fatherName"
                placeholder="Enter your Father's name"
                value={formData.personal?.fatherName || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group
              controlId="formDob"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label className="mb-0 me-2 flex-shrink-0">DOB:</Form.Label>
              <Form.Control
                type="date"
                name="DOB"
                placeholder="Enter your DOB"
                value={formData.personal?.DOB || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group
          controlId="formEmail"
          className="d-flex justify-content-between mb-3"
        >
          <Form.Label className="mb-0 me-2 flex-shrink-0">Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            accept="email/*"
            placeholder="Enter your email"
            value={formData.personal?.email || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group
          controlId="formSchool"
          className="d-flex justify-content-between mb-3"
        >
          <Form.Label className="mb-0 me-2 flex-shrink-0">
            School or College Name:
          </Form.Label>
          <Form.Control
            type="text"
            name="School"
            placeholder="Enter your school or College Name"
            value={formData.personal?.School || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* <Row>
          <Col md={2}>
            <Button>Back</Button>
          </Col>
          <Col md={8}>{""}</Col>
          <Col md={2}>
            <Button>Next</Button>
          </Col>
        </Row> */}
      </Form>
    </Container>
  );
}

export default AdminSignUp;
