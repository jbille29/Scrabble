import React, { useState } from "react";
import styled from "@emotion/styled";
import Tile from "./Tile";

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 50px);
  gap: 5px;
  margin: 20px auto;
  justify-content: center;
  padding: 10px;
  background-color: #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Board = ({ board, setBoard }) => {
  const [hoveredTile, setHoveredTile] = useState(null); // Track which tile is being hovered

  const handleDrop = (e, index) => {
    e.preventDefault();
    setHoveredTile(null); // Reset hover state
    const letter = e.dataTransfer.getData("letter");

    if (!letter) return;

    setBoard((prev) =>
      prev.map((tile, i) =>
        i === index && !tile.prePlacedLetter && !tile.letter
          ? { ...tile, letter }
          : tile
      )
    );
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setHoveredTile(index); // Highlight the hovered tile
  };

  const handleDragLeave = () => {
    setHoveredTile(null); // Reset hover state when dragging away
  };

  return (
    <BoardContainer>
      {board.map((tile, index) => (
        <Tile
          key={index}
          letter={tile.letter}
          bonus={tile.bonus}
          preplaced={!!tile.prePlacedLetter}
          isOver={hoveredTile === index} // Pass hover state
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
        />
      ))}
    </BoardContainer>
  );
};

export default Board;
