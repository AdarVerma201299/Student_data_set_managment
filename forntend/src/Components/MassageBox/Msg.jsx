// Msg.js
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const Msg = () => {
  const [comment, setComment] = useState("");
  const [messages, setMessages] = useState([]);

  const userEmail = localStorage.getItem("email"); // Assuming email is stored in localStorage

  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      text: comment,
      sender: userEmail,
      timestamp: new Date().toISOString(),
    };
    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    setComment("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="commentBox">
          <Form.Control
            as="textarea"
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment here..."
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Msg;
