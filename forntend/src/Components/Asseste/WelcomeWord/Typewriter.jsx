import React, { useEffect, useState } from "react";

function Typewriter({ text, speed, eraseSpeed, pause }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0); // Keep track of the current character index
  const [isErasing, setIsErasing] = useState(false); // Track whether we are erasing or typing

  useEffect(() => {
    const handleTyping = () => {
      if (!isErasing) {
        // Typing mode
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        } else {
          // Pause before starting to erase
          setTimeout(() => setIsErasing(true), pause);
        }
      } else {
        if (index > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setTimeout(() => setIsErasing(false), pause);
        }
      }
    };

    const intervalId = setInterval(
      handleTyping,
      isErasing ? eraseSpeed : speed
    );

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [index, isErasing, speed, eraseSpeed, pause, text]);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Spicy+Rice&display=swap');
          .spicy-rice-regular {
            font-family: "Spicy Rice", serif;
            font-weight: 400;
            font-style: normal;
          }
        `}
      </style>

      <h1
        className="spicy-rice-regular"
        style={{
          margin: "3rem",
          fontSize: "5rem",
          minHeight: "7px",
          textAlign: "start",
          background:
            "linear-gradient(90deg, rgba(255, 255, 0, 1) 0%, rgba(0, 212, 75, 1) 50%, rgba(226, 0, 226, 1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayedText}_
      </h1>
    </>
  );
}

export default Typewriter;
