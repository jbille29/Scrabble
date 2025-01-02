import React from "react";
import styled from "@emotion/styled";

// Styled container for the letter pool
const PoolContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

// Styled component for each letter tile
const LetterTile = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  background-color: ${({ used }) => (used ? "#e5e7eb" : "#fef3c7")};
  color: ${({ used }) => (used ? "#9ca3af" : "#374151")};
  cursor: ${({ used }) => (used ? "not-allowed" : "grab")};
  margin: 0 5px;
`;

const LetterPool = ({ letters, setLetters }) => {
  // Handle drag start event
  const handleDragStart = (e, letter) => {
    console.log(`Drag started: letter=${letter}`);
    e.dataTransfer.setData("letter", letter); // Store the dragged letter
  };

  return (
    <PoolContainer>
      {letters.map((letterObj, index) => (
        <LetterTile
          key={index}
          used={letterObj.used}
          draggable={!letterObj.used}
          onDragStart={(e) => !letterObj.used && handleDragStart(e, letterObj.letter)}
        >
          {letterObj.letter}
        </LetterTile>
      ))}
    </PoolContainer>
  );
};

export default LetterPool;
