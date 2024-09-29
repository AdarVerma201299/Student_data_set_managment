import React from "react";
import { Card } from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
import "./CardComponent.css";

function CardComponent({ data }) {
  return (
    <Card className="custom-card shadow-lg text-center">
      <div className="fav-icon-container">
        <HeartFill className="fav-icon" />
        <img src={data.icon} alt={data.title} className="icon-img mt-3" />
      </div>
      <Card.Body>
        <Card.Title className="card-title">{data.title}</Card.Title>
        <Card.Text className="card-description">{data.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
