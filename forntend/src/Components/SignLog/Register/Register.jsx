import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import {
  PersonalDetails,
  DocumentUpload,
  AddressDetails,
  FinalPage,
} from "../../Index";

import "../SigLog.css";
function Register() {
  const [formData, setFormData] = useState({
    personal: {
      name: "",
      fatherName: "",
      DOB: "",
      Gender: "",
      email: "",
      mobile: "",
      School: "",
      selectedOptions: [],
    },
    options: ["Add", "Remove", "Edit"],
    Document: {
      aadhaar: "",
      FrontAadharCardImage: null,
      BackAadharCardImage: null,
      image: null,
    },
    residential: {
      village: "",
      post: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
    permanent: {
      village: "",
      post: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
    Security: { password: "", confirmPassword: "", userId: "" },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => {
    if (currentStep === 1) setCurrentStep(1);
    else setCurrentStep(currentStep - 1);
  };
  const Type = "Student";

  return (
    <Card className=" border p-2 shadow-sm rounded">
      <Card.Title className="mb-4 border p-2 shadow-sm rounded">
        Register on This Web
      </Card.Title>
      <Container className="justify-content-center">
        {currentStep === 1 && (
          <PersonalDetails
            currentStep={currentStep}
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 2 && (
          <AddressDetails
            currentStep={currentStep}
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 3 && (
          <DocumentUpload
            currentStep={currentStep}
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 4 && (
          <FinalPage
            currentStep={currentStep}
            prevStep={prevStep}
            nextStep={nextStep}
            Type={Type}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {/* <div className="d-flex justify-content-center align-items-center"> */}
        {/* <div className="m-2 w-100 border justify-content-center align-items-center p-2 shadow-sm rounded">
            <Row>
              <Col md={2}>
                {currentStep > 1 && (
                  <Button onClick={prevStep}>Previous</Button>
                )}
              </Col>
              <Col md={2}></Col>
              <Col md={4}></Col>
              <Col md={2}></Col>
              <Col md={2}>
                {currentStep === 4 ? (
                  <Button type="submit">Submit</Button>
                ) : (
                  <Button onClick={nextStep}>Next</Button>
                )}
              </Col>
            </Row>
          </div> */}
        {/* </div> */}
      </Container>
    </Card>
  );
}

export default Register;
