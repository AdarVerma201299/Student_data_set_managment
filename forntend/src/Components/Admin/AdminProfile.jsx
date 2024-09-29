import React, { useState } from "react";
import { Container, Card, Col, Row, ListGroup, Badge } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ImageUrlSet } from "../Function";
function AdminProfile({ data }) {
  const [Address, SetAddres] = useState(true);
  const handleAddress = () => {
    SetAddres(!Address);
  };

  return (
    <Row className="d-flex justify-content-between align-items-center bg-lighblue p-2">
      <Col md={4}>
        <div className="border shadow-sm rounded bg-white">
          <img
            className="m-2"
            src={ImageUrlSet(data?.Image)}
            alt="loading............"
            style={{
              margin: "2rem",
              width: "60%",
              borderRadius: "50%",
            }}
          />
          <div style={{ color: "black" }}>
            <h4>{data?.name}</h4>
          </div>
        </div>
      </Col>
      <Col>
        <Container>
          <Card className="border p-4 shadow-sm rounded">
            <Card.Title>Admin Details</Card.Title>
            <Card.Body>
              <Row>
                <Col md={5}>
                  <>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Name:</strong> {data?.name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Authority:</strong>
                        {data?.Role?.length > 0 ? (
                          data.Role.map((role, key) => (
                            <span className="m-1" key={key}>
                              <Badge>{role}</Badge>
                            </span>
                          ))
                        ) : (
                          <span>No roles available</span>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                  <>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Contact Numner:</strong> {data?.Phone_number}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Email:</strong>
                        {data?.Email}
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                </Col>
              </Row>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col
                      md={6}
                      className="d-flex justify-content-center text-center"
                    >
                      <strong
                        onClick={handleAddress}
                        style={{
                          color: !Address ? "green" : "black",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Residental Address
                        {!Address ? (
                          <FaChevronUp style={{ marginLeft: "5px" }} />
                        ) : (
                          <FaChevronDown style={{ marginLeft: "5px" }} />
                        )}
                      </strong>
                    </Col>

                    <Col
                      md={6}
                      className="d-flex justify-content-center text-center"
                    >
                      <strong
                        onClick={handleAddress}
                        style={{
                          color: Address ? "green" : "black",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Permanent Address
                        {Address ? (
                          <FaChevronUp style={{ marginLeft: "5px" }} />
                        ) : (
                          <FaChevronDown style={{ marginLeft: "5px" }} />
                        )}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {Address ? (
                  <ListGroup.Item>
                    <span className="d-flex justify-content-center text-center">
                      <p className="m-1">
                        {data?.ResidentalAddress?.village || "N/A"}
                      </p>
                      <p className="m-1">
                        {data?.ResidentalAddress?.post || "N/A"}
                      </p>
                      <p className="m-1">
                        {data?.ResidentalAddress?.district || "N/A"}
                      </p>
                      <p className="m-1">
                        {data?.ResidentalAddress?.state || "N/A"}
                      </p>
                      <p className="m-1">
                        {data?.ResidentalAddress?.country || "N/A"}
                      </p>
                    </span>
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item>
                    <span className="d-flex justify-content-center text-center">
                      <p className="m-1">
                        {data?.PermanentAddress?.village || "N/A"}
                      </p>
                      <p className="m-1">
                        {data?.PermanentAddress?.post || "N/A"}
                      </p>
                      <p className="m-1">
                        {data?.PermanentAddress?.district || "N/A"}
                      </p>
                      <p className="m-1">
                        {data?.PermanentAddress?.state || "N/A"}
                      </p>
                      <p className="m-1">
                        {data?.PermanentAddress?.country || "N/A"}
                      </p>
                    </span>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  );
}

export default AdminProfile;
