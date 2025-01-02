import React, { useState } from "react";
import GameEndModal from "../components/GameEndModal";
import Board from "../components/Board";

const Game = () => {
  const [isGameOver, setIsGameOver] = useState(true);

  const stats = {
    words: 10,
    points: 120,
    bonus: 20,
  };

  const board = [
    { letter: "A" }, { letter: "B" }, { letter: "C" }, { bonus: "Mystery" }, null, null, null, null,
    { letter: "D" }, { letter: "E" }, { letter: "F" }, null, null, null, null, null,
    // Repeat for the full board
  ];

  const handleGameEnd = () => {
    setIsGameOver(true);
  };

  const handlePlayAgain = () => {
    setIsGameOver(false);
    // Reset the game state here
  };

  return (
    <div>
      {/* Game logic and UI */}
      <button onClick={handleGameEnd}>End Game</button>
      <GameEndModal
        isOpen={isGameOver}
        onClose={handlePlayAgain}
        stats={stats}
        board={board}
      />
      <Board />
    </div>
  );
};

export default Game;
