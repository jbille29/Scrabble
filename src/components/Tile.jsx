import React from "react";
import styled from "@emotion/styled";

const StyledTile = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  border: 1px solid #d1d5db;
  background-color: ${({ preplaced, bonus, isOver }) =>
    preplaced
      ? "#4ade80" // Green for preplaced tiles
      : isOver
      ? "#bbf7d0" // Light green for valid drop targets
      : bonus === "Mystery"
      ? "#f59e0b"
      : bonus === "Bomb"
      ? "#ef4444"
      : "white"};
  color: ${({ preplaced }) => (preplaced ? "white" : "#374151")};
  border-radius: 5px;
  cursor: ${({ preplaced }) => (preplaced ? "not-allowed" : "pointer")};
`;

const Tile = ({
  letter,
  bonus,
  preplaced,
  onDrop,
  onDragOver,
  onDragLeave,
  isOver, // New prop for highlighting
}) => {
  return (
    <StyledTile
      preplaced={preplaced}
      bonus={bonus}
      isOver={isOver}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {letter || bonus || ""}
    </StyledTile>
  );
};

export default Tile;
