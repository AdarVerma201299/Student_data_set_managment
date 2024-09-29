import React from "react";
import { Container, Form, Row, Col, Badge, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

function PersonalDetails({
  formData,
  setFormData,
  adminData,
  currentStep,
  nextStep,
  prevStep,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      personal: { ...formData.personal, [e.target.name]: e.target.value },
    });
  };

  const handleSelect = (selectedOption) => {
    const alreadySelected =
      formData.personal.selectedOptions.includes(selectedOption);

    const updatedSelectedOptions = alreadySelected
      ? formData.personal.selectedOptions.filter(
          (option) => option !== selectedOption
        )
      : [...formData.personal.selectedOptions, selectedOption];

    setFormData((prevFormData) => ({
      ...prevFormData,
      personal: {
        ...prevFormData.personal,
        selectedOptions: updatedSelectedOptions,
      },
    }));
  };

  const removeOption = (optionToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      personal: {
        ...prevFormData.personal,
        selectedOptions: prevFormData.personal.selectedOptions.filter(
          (option) => option !== optionToRemove
        ),
      },
    }));
  };

  const allFieldsFilled = () => {
    const requiredFields = [
      "name",
      "mobile",
      "fatherName",
      "DOB",
      "email",
      "Gender",
      "School",
    ];

    return requiredFields.every((field) => formData.personal[field]);
  };

  return (
    <Container>
      <Form className="border p-4 shadow-sm rounded">
        <h4 className="mb-4 border p-2 shadow-sm rounded">
          Enter Your Personal Data
        </h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName" className=" d-flex mb-3">
              {/* <Form.Label>Name:</Form.Label> */}
              <Form.Control
                className="ContentSilde"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.personal.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formMobile" className="d-flex mb-3">
              {/* <Form.Label>Mobile:</Form.Label> */}
              <Form.Control
                className="ContentSilde"
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.personal.mobile}
                onChange={handleChange}
                maxLength="10"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formFatherName" className="d-flex mb-3">
              {/* <Form.Label>Father Name:</Form.Label> */}
              <Form.Control
                className="ContentSilde"
                type="text"
                name="fatherName"
                placeholder="Enter your Father's name"
                value={formData.personal.fatherName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDob" className="d-flex mb-3">
              <Form.Label>DOB:</Form.Label>
              <Form.Control
                className="ContentSilde"
                type="date"
                name="DOB"
                value={formData.personal.DOB}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formEmail" className="d-flex mb-3">
              {/* <Form.Label>Email:</Form.Label> */}
              <Form.Control
                className="ContentSilde"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.personal.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleSelect" className="d-flex mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="Gender"
                className="ContentSilde"
                value={formData.personal.Gender}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formSchool" className="d-flex mb-3">
          {/* <Form.Label>School or College Name:</Form.Label> */}
          <Form.Control
            className="ContentSilde"
            type="text"
            name="School"
            placeholder="Enter your school or College Name"
            value={formData.personal.School}
            onChange={handleChange}
          />
        </Form.Group>

        {adminData === null ? (
          <>
            <h4>Authorization Given</h4>
            <Form.Group
              controlId="formOptions"
              className=" d-flex justify-content-center align-items-center gap-3 mb-3"
            >
              <Form.Label>Select Options:</Form.Label>
              <div className="mb-3">
                {formData.personal.selectedOptions.map((option, index) => (
                  <Badge
                    key={index}
                    pill
                    variant="primary"
                    className="me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeOption(option)}
                  >
                    {option} &times;
                  </Badge>
                ))}
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Choose Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {formData.options.map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleSelect(option)}
                      active={formData.personal.selectedOptions.includes(
                        option
                      )}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </>
        ) : (
          " "
        )}

        {/* Display selected options with remove feature */}
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

export default PersonalDetails;
