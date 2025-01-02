import React from "react";
import styled from "@emotion/styled";

const PoolContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const LetterTile = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ used }) => (used ? "#9ca3af" : "#374151")};
  background-color: ${({ used }) => (used ? "#e5e7eb" : "#fef3c7")};
  border: 2px solid #d1d5db;
  border-radius: 5px;
  margin: 0 5px;
  cursor: ${({ used }) => (used ? "not-allowed" : "grab")};
`;

const Points = styled.span`
  font-size: 0.8rem;
  font-weight: normal;
  color: #9ca3af;
`;

const LetterPool = ({ letters, setLetters, setBoard }) => {
  const handleDragStart = (e, letter) => {
    console.log(`Drag started from pool: letter=${letter}`);
    e.dataTransfer.setData("letter", letter);
    e.dataTransfer.setData("source", "pool");
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const letter = e.dataTransfer.getData("letter");
    const source = e.dataTransfer.getData("source");
    console.log(`Drop on pool: letter=${letter}, source=${source}`);

    if (source !== "pool") {
      const sourceIndex = parseInt(source, 10);

      console.log(`Moving letter ${letter} from board position ${sourceIndex} to pool`);
      setLetters((prev) =>
        prev.map((l) => (l.letter === letter ? { ...l, used: false } : l))
      );

      setBoard((prev) =>
        prev.map((tile, i) =>
          i === sourceIndex ? { ...tile, letter: null, points: null } : tile
        )
      );
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <PoolContainer onDragOver={handleDragOver} onDrop={handleDrop}>
      {letters.map((letterObj, index) => (
        <LetterTile
          key={index}
          used={letterObj.used}
          draggable={!letterObj.used}
          onDragStart={(e) => !letterObj.used && handleDragStart(e, letterObj.letter)}
        >
          {letterObj.letter}
          <Points>{letterObj.points}</Points>
        </LetterTile>
      ))}
    </PoolContainer>
  );
};

export default LetterPool;
