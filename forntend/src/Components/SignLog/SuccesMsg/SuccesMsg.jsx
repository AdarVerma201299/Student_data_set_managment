import React, { useState } from "react";
import "./SuccessMsg.css";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

function SuccessMsg({ successMsg }) {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  setTimeout(() => {
    setShowModal(false);
    navigate("/");
  }, 2000);

  return (
    <>
      {showModal && (
        <Container
          className="SuccessMsg"
          style={{
            zIndex: 1000,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
          }}
        >
          <Card className="text-center p-4 shadow-lg" bg="success" text="white">
            <Row className="align-items-center">
              <Col xs={3}>
                <CheckCircleFill size={50} className="text-white" />
              </Col>
              <Col xs={9}>
                <h4>{successMsg}</h4>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </>
  );
}

export default SuccessMsg;
