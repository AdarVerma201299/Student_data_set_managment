import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "./SigLog.css";
import { handleloginSubmit } from "../Function";
import { SuccesMsg } from "../Index";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setuser] = useState("Student");
  const [msg, setmsg] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userId: "",
  });
  const navigator = useNavigate();
  const successMsg = "You are login SuccessFully";
  const handleUser = (userType) => {
    setuser(userType);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { UserData, AdminData, msg } =
      (await handleloginSubmit(e, formData, user)) || {};

    if (msg) {
      setmsg(msg);
      if (AdminData)
        localStorage.setItem("adminData", JSON.stringify(AdminData));
      localStorage.setItem("UserData", JSON.stringify(UserData));
      localStorage.setItem("User", user);
    } else {
      navigator("/");
    }
  };
  return (
    <Container className=" mt-2 mb-4 d-flex justify-content-center align-items-center">
      <Form
        className="border p-4 shadow-sm rounded"
        onSubmit={handleSubmit}
        method="POST"
        style={{ width: "500px" }}
      >
        <div className="mb-3">
          <span
            className="text-center mb-4"
            onClick={() => handleUser("Student")}
            style={{
              fontSize: user === "Student" ? "1.5rem" : "1rem",
              color: user === "Student" ? "green" : "white",
              cursor: "pointer",
            }}
          >
            Student
          </span>
          /
          <span
            className="text-center mb-4"
            onClick={() => handleUser("Admin")}
            style={{
              fontSize: user === "Admin" ? "1.5rem" : "1rem",
              color: user === "Admin" ? "green" : "white",
              cursor: "pointer",
            }}
          >
            Admin
          </span>
        </div>
        {user === "Admin" ? (
          <>
            <Form.Group
              controlId="formName"
              className="d-flex justify-content-between mb-3"
            >
              <Form.Label className="mb-0 me-2 flex-shrink-0">
                UserId:
              </Form.Label>
              <Form.Control
                type="text"
                name="userId"
                placeholder="Enter your user Id"
                value={formData.userId}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        ) : (
          <Form.Group
            controlId="formName"
            className="d-flex justify-content-between mb-3"
          >
            <Form.Label className="mb-0 me-2 flex-shrink-0">Name:</Form.Label>
            <Form.Control
              className="ContentSilde"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
        )}

        <Form.Group
          controlId="formEmail"
          className="d-flex justify-content-between mb-3"
        >
          <Form.Label className="mb-0 me-2 flex-shrink-0">Email:</Form.Label>
          <Form.Control
            className="ContentSilde"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group
          controlId="formPassword"
          className="d-flex justify-content-between mb-3"
        >
          <Form.Label className="mb-0 me-2 flex-shrink-0">Password:</Form.Label>
          <Form.Control
            className="ContentSilde"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 ContentSilde">
          Login
        </Button>
      </Form>
      {msg ? <SuccesMsg successMsg={successMsg} /> : ""}
    </Container>
  );
}

export default Login;
