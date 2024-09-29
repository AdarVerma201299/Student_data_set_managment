import React, { useState, useEffect } from "react";

function DisplayMsg() {
  const userEmail = localStorage.getItem("email");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);
  }, []);
  return (
    <>
      <div className="f-1 w-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`alert ${
              msg.sender === userEmail ? "alert-primary" : "alert-secondary"
            }`}
          >
            <strong>{msg.sender === userEmail ? "You" : "Admin"}:</strong>{" "}
            {msg.text}
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>{" "}
    </>
  );
}

export default DisplayMsg;
