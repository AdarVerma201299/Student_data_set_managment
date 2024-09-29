import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { Container } from "react-bootstrap";
import "./CardComponent.css";
import { arr as initialArr } from "../Data";

function SlideCard() {
  const [displayedCards, setDisplayedCards] = useState([]);

  useEffect(() => {
    setDisplayedCards([...initialArr, ...initialArr]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedCards((prevCards) => {
        const [firstCard, ...restCards] = prevCards;
        return [...restCards, firstCard];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid className="slider-container">
      <div className="slider">
        {displayedCards.map((data, key) => (
          <div className="slide" key={key}>
            <CardComponent data={data} />
            <CardComponent data={data} />
            <CardComponent data={data} />
            <CardComponent data={data} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default SlideCard;
