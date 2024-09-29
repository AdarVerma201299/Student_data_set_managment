import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShiftTime } from "../Index";
import img from "../Image/book.png";
import "./Home.css";

function Home() {
  const navigator = useNavigate();
  const handlelogin = () => {
    navigator("/Login");
  };
  return (
    <>
      <Container className="justify-content-center align-items-center">
        <Row className="mt-5">
          <Col md={4}>
            <img src={img} alt="" />
          </Col>
          <Col md={8}>
            {" "}
            <h1>Thank you for Visit</h1>
            <p
              style={{
                textTheme: "GoogleFonts.poppinsTextTheme()",
              }}
            >
              Welcome to a world where knowledge meets innovation! Our library
              is more than just a place to read—it’s a gateway to limitless
              possibilities. Whether you're diving into the classics, exploring
              cutting-edge research, or igniting your imagination with fiction,
              this is the space where curiosity thrives. With a vast collection
              of resources, we empower learners, dreamers, and doers to achieve
              their full potential. Every corner is designed to inspire, every
              book a new journey waiting to unfold. Here, learning never stops,
              and neither do we. Step in, explore, and let your mind soar!
            </p>
          </Col>
        </Row>
        {localStorage.getItem("logged") ? (
          ""
        ) : (
          <Row
            className="loginButton border p-4 shadow-sm"
            style={{
              background:
                "linear-gradient(212deg, rgba(255, 255, 0, 1) 0%, rgba(0, 188, 212, 1) 22%, rgba(103, 58, 183, 1) 69%, rgba(238, 130, 238, 1) 100%)",
              width: "20rem",
              display: "inline-table",
              borderRadius: "50px",
              cursor: "pointer",
            }}
          >
            <h3 onClick={handlelogin}>Login</h3>
          </Row>
        )}
      </Container>

      <ShiftTime />
    </>
  );
}

export default Home;
