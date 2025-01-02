import React, { useState } from "react";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #374151;
`;

const Stats = styled.div`
  margin: 15px 0;
  font-size: 1rem;
  color: #374151;

  & span {
    font-weight: bold;
  }
`;

const ShareableText = styled.pre`
  background: #f3f4f6;
  padding: 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  color: #374151;
  overflow: auto;
  text-align: left;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #2563eb;
  }
`;

const GameEndModal = ({ isOpen, onClose, stats, board }) => {
  const [copySuccess, setCopySuccess] = useState("");

  if (!isOpen) return null;

  const generateShareableText = () => {
    return board
      .map((tile, i) =>
        tile.letter ? `${tile.letter}` : tile.bonus ? `[${tile.bonus}]` : "."
      )
      .reduce(
        (acc, curr, i) =>
          (i + 1) % 8 === 0 ? `${acc}${curr}\n` : `${acc}${curr}`,
        ""
      );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateShareableText());
    setCopySuccess("Copied to clipboard!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Game Over!</Title>
        <Stats>
          <div>
            Words Found: <span>{stats.words}</span>
          </div>
          <div>
            Total Points: <span>{stats.points}</span>
          </div>
          <div>
            Bonus Points: <span>{stats.bonus}</span>
          </div>
        </Stats>
        <ShareableText>{generateShareableText()}</ShareableText>
        <Button onClick={handleCopy}>Copy to Clipboard</Button>
        {copySuccess && <p>{copySuccess}</p>}
        <Button onClick={onClose}>Play Again</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GameEndModal;
