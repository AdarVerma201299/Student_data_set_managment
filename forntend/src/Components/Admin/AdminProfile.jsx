import React, { useState } from "react";
import { Card, Col, Row, ListGroup, Badge } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ImageUrlSet } from "../Function";

function AdminProfile({ data }) {
  const [addressVisible, setAddressVisible] = useState(true);

  const toggleAddress = () => {
    setAddressVisible(!addressVisible);
  };

  return (
    <Row className="d-flex justify-content-between align-items-center  shadow-sm p-3 rounded">
      <Col md={4}>
        <div className="text-center">
          <img
            className="rounded-circle border border-light"
            src={ImageUrlSet(data?.Image)}
            alt="Profile"
            style={{ width: "80%", margin: "2rem" }}
          />
          <h4>{data?.name}</h4>
        </div>
      </Col>
      <Col md={8}>
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-light">
            <h5>Admin Details</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {data?.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Authority:</strong>
                    {data?.Role?.length > 0 ? (
                      data.Role.map((role, key) => (
                        <Badge key={key} className="m-1" bg="primary">
                          {role}
                        </Badge>
                      ))
                    ) : (
                      <span>No roles available</span>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Contact Number:</strong> {data?.Phone_number}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {data?.Email}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={6} className="text-center">
                    <strong
                      onClick={toggleAddress}
                      style={{ cursor: "pointer" }}
                    >
                      Residential Address
                      {addressVisible ? (
                        <FaChevronUp className="ms-2" />
                      ) : (
                        <FaChevronDown className="ms-2" />
                      )}
                    </strong>
                  </Col>
                  <Col md={6} className="text-center">
                    <strong
                      onClick={toggleAddress}
                      style={{ cursor: "pointer" }}
                    >
                      Permanent Address
                      {!addressVisible ? (
                        <FaChevronUp className="ms-2" />
                      ) : (
                        <FaChevronDown className="ms-2" />
                      )}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {addressVisible ? (
                <ListGroup.Item>
                  <div>
                    {data?.ResidentalAddress?.village}{" "}
                    {data?.ResidentalAddress?.post}{" "}
                    {data?.ResidentalAddress?.district}{" "}
                    {data?.ResidentalAddress?.state}{" "}
                    {data?.ResidentalAddress?.country}
                    {" -- "}
                    {data?.ResidentalAddress?.pincode}
                  </div>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <div>
                    {data?.PermanentAddress?.village}{" "}
                    {data?.PermanentAddress?.post}{" "}
                    {data?.PermanentAddress?.district}{" "}
                    {data?.PermanentAddress?.state}{" "}
                    {data?.PermanentAddress?.country}
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AdminProfile;
