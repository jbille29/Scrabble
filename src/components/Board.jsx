import React from "react";
import styled from "@emotion/styled";

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 50px);
  grid-gap: 5px;
  margin: 20px auto;
  justify-content: center;
  background-color: #e5e7eb;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Tile = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ bonus }) =>
    bonus === "Mystery" || bonus === "Bomb" || bonus === "Lose 5" || bonus === "Add Unused"
      ? "white"
      : "#374151"};
  background-color: ${({ bonus, letter }) =>
    letter
      ? "#fef3c7"
      : bonus === "Mystery"
      ? "#f59e0b"
      : bonus === "Bomb"
      ? "#ef4444"
      : bonus === "Lose 5"
      ? "#9333ea"
      : bonus === "Add Unused"
      ? "#10b981"
      : "white"};
  border: 2px solid #d1d5db;
  border-radius: 5px;
  cursor: ${({ draggable }) => (draggable ? "grab" : "default")};
`;

const Points = styled.span`
  font-size: 0.8rem;
  font-weight: normal;
  color: #9ca3af;
`;

const Board = ({ board, setBoard, letters, setLetters }) => {
  const handleDragStart = (e, letter, index) => {
    console.log(`Drag started: letter=${letter}, source=${index}`);
    e.dataTransfer.setData("letter", letter);
    e.dataTransfer.setData("source", index.toString()); // Properly set source
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    const letter = e.dataTransfer.getData("letter");
    const source = e.dataTransfer.getData("source");
    console.log(`Drop: letter=${letter}, source=${source}, target=${index}`);

    if (source === "pool") {
      console.log(`Moving letter ${letter} from pool to board at position ${index}`);
      setBoard((prev) =>
        prev.map((tile, i) =>
          i === index ? { ...tile, letter, points: letters.find((l) => l.letter === letter)?.points } : tile
        )
      );

      setLetters((prev) =>
        prev.map((l) => (l.letter === letter ? { ...l, used: true } : l))
      );
    } else if (!isNaN(source)) {
      const sourceIndex = parseInt(source, 10);
      console.log(`Moving letter ${letter} from board position ${sourceIndex} to ${index}`);
      setBoard((prev) =>
        prev.map((tile, i) => {
          if (i === sourceIndex) return { ...tile, letter: null, points: null }; // Clear source tile
          if (i === index) return { ...tile, letter, points: letters.find((l) => l.letter === letter)?.points };
          return tile;
        })
      );
    } else {
      console.error("Invalid source detected during drop.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <BoardContainer>
      {board.map((tile, index) => (
        <Tile
          key={index}
          bonus={tile.bonus}
          letter={tile.letter}
          draggable={!!tile.letter && !tile.points} // Ensure dynamic draggable assignment
          onDragStart={(e) => !!tile.letter && !tile.points && handleDragStart(e, tile.letter, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          {tile.letter}
          {tile.letter && <Points>{tile.points}</Points>}
          {!tile.letter && tile.bonus}
        </Tile>
      ))}
    </BoardContainer>
  );
};

export default Board;
