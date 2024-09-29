import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FetchFeePyamentData, ImageUrlSet } from "../Function";
function DataSheet({ data, adminId, index }) {
  const navigate = useNavigate();
  const Verify_tocken = data?.Verify_tocken;
  const handleProfile = async () => {
    if (Verify_tocken) await FetchFeePyamentData(data._id, index);
    navigate(`/Profile/${adminId}/${index}/${data._id}`);
  };
  return (
    <Container
      fluid
      className="short-details ContentSilde bg-body border"
      key={index}
      style={{
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "0.1rem",
        cursor: "pointer",
        animationDelay: `${index * 0.5}s`,
      }}
      onClick={handleProfile}
    >
      <Row
        className="align-items-center"
        style={{
          color: "black",
          justifyContent: "flex-start",
          alignItems: "start",
        }}
      >
        <Col md={4} className="text-center d-flex">
          <div className="d-flex">
            <img
              src={ImageUrlSet(data?.Image)}
              alt="loading..."
              style={{
                marginLeft: "2rem",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            />
            <p style={{ fontWeight: "bold", marginLeft: "2rem" }}>
              {data?.name || "No Name"}
            </p>
          </div>
        </Col>

        <Col md={4} className="text-center">
          <p>Shift: IInd</p>
        </Col>

        <Col md={4} className="text-end">
          <span
            style={{
              marginRight: "4rem",
              fontWeight: "bold",
              color: Verify_tocken ? "Green" : "Red",
            }}
          >
            {Verify_tocken ? "Active" : "Inactive"}
          </span>
        </Col>
      </Row>
    </Container>
  );
}

export default DataSheet;
