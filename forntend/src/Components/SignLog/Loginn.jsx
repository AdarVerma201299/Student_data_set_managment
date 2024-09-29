import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import "./SigLog.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    DOB: "",
    email: "",
    mobile: "",
    aadhaar: "",
    image: null,
    FrontAadharCardImage: null,
    BackAadharCardImage: null,
    School: "",
    residential: {
      village: "",
      post: "",
      district: "",
      state: "",
      country: "",
    },
    permanent: {
      village: "",
      post: "",
      district: "",
      state: "",
      country: "",
    },
    password: "",
    confirmPassword: "",
  });

  const [imagePreview, setimagePreview] = useState(
    "https://via.placeholder.com/40"
  );
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
        permanent: {
          village: "",
          post: "",
          district: "",
          state: "",
          country: "",
        },
      }));
    }
  };
  const navigator = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const file = files[0];
      const filePreviewUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      if (name === "image") {
        setimagePreview(filePreviewUrl);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("fatherName", formData.fatherName);
      form.append("dob", formData.DOB);
      form.append("email", formData.email);
      form.append("mobile", formData.mobile);
      form.append("aadhaar", formData.aadhaar);
      form.append("FrontAadharCardImage", formData.FrontAadharCardImage);
      form.append("BackAadharCardImage", formData.BackAadharCardImage);
      form.append("School", formData.School);
      form.append("password", formData.password);
      form.append("image", formData.image);
      form.append("residential", JSON.stringify(formData.residential));
      form.append("permanent", JSON.stringify(formData.permanent));

      const response = await fetch(
        "https://student-data-set-managment.onrender.com/api/register",
        {
          method: "POST",
          body: form,
        }
      );

      const json = await response.json();
      if (response.ok) {
        if (json.success) {
          alert("Registration successful");
          navigator("/");
        } else {
          const errorMessages = json.errors
            ? json.errors.map((err) => err.msg).join(", ")
            : json.error || "An unknown error occurred";
          alert(errorMessages);
        }
      } else {
        alert("An error occurred: " + json.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error occurred while processing your request");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center p-4 align-items-center"
      style={{ with: "200%" }}
    >
      <Form
        className="border p-4 shadow-sm rounded"
        onSubmit={handleSubmit}
        method="POST"
      >
        <h2 className="text-center mb-4">Login</h2>
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
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
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
                value={formData.fatherName}
                onChange={handleChange}
                required
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
                value={formData.mobile}
                onChange={handleChange}
                required
                maxLength="10"
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
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="formEmail"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label className="mb-0 me-2 flex-shrink-0">
                Email:
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="formAadhaar"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label className="mb-0 me-2 flex-shrink-0">
                Aadhaar Number:
              </Form.Label>
              <Form.Control
                type="text"
                name="aadhaar"
                placeholder="Enter your Aadhaar number"
                value={formData.aadhaar}
                onChange={handleChange}
                required
                maxLength="12"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group
              controlId="formImage"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label>Upload Image:</Form.Label>
              <div>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="me-3"
                />
              </div>
            </Form.Group>
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
            value={formData.School}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group
              controlId="formFrontAadharCardImage"
              encType="multipart/form-data"
              className="mb-3"
            >
              <Form.Label>Upload Front Image of Aadhaar Card:</Form.Label>
              <Form.Control
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
              <Form.Label>Upload Back Image of Aadhaar Card:</Form.Label>
              <Form.Control
                type="file"
                name="BackAadharCardImage"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {/* Permanet Address */}
            <Form.Group controlId="formPermanent" className="mb-4">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                type="text"
                name="permanent.village"
                placeholder="Village"
                value={formData.permanent.village}
                onChange={handleLocationChange}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="permanent.post"
                placeholder="Post"
                value={formData.permanent.post}
                onChange={handleLocationChange}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="permanent.district"
                placeholder="District"
                value={formData.permanent.district}
                onChange={handleLocationChange}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="permanent.state"
                placeholder="State"
                value={formData.permanent.state}
                onChange={handleLocationChange}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="permanent.country"
                placeholder="Country"
                value={formData.permanent.country}
                onChange={handleLocationChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
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
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="residential.post"
                placeholder="Post"
                value={formData.residential.post}
                onChange={handleLocationChange}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="residential.district"
                placeholder="District"
                value={formData.residential.district}
                onChange={handleLocationChange}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="residential.state"
                placeholder="State"
                value={formData.residential.state}
                onChange={handleLocationChange}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="residential.country"
                placeholder="Country"
                value={formData.residential.country}
                onChange={handleLocationChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group
              controlId="formPassword"
              className="justify-content-between mb-3"
            >
              <Form.Label className="mb-0 m-2 flex-shrink-0">
                Password:
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              controlId="formConfirmPassword"
              className="justify-content-between mb-3"
            >
              <Form.Label className="mb-0 m-2 flex-shrink-0">
                Confirm Password:
              </Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
