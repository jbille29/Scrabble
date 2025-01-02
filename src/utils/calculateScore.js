const letterScores = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

export const calculateScore = (board) => {
  let score = 0;
  board.forEach((tile) => {
    if (tile.letter) {
      let letterScore = tile.points || 0;
      if (tile.bonus === "DLS") letterScore *= 2;
      if (tile.bonus === "TLS") letterScore *= 3;
      score += letterScore;
    }
  });

  board.forEach((tile) => {
    if (tile.bonus === "DWS" && tile.letter) {
      score *= 2;
    }
  });

  return score;
};

export const findWordsOnBoard = (board) => {
  // Example logic to detect words (horizontal and vertical)
  const words = [];
  let score = 0;

  // Horizontal words
  for (let i = 0; i < 8; i++) {
    const rowStart = i * 8;
    let word = "";
    let wordScore = 0;

    for (let j = 0; j < 8; j++) {
      const tile = board[rowStart + j];
      if (tile.letter) {
        word += tile.letter;
        wordScore += tile.points || 0;
      } else if (word) {
        words.push(word);
        score += wordScore;
        word = "";
        wordScore = 0;
      }
    }

    if (word) {
      words.push(word);
      score += wordScore;
    }
  }

  // Vertical words
  for (let j = 0; j < 8; j++) {
    let word = "";
    let wordScore = 0;

    for (let i = 0; i < 8; i++) {
      const tile = board[i * 8 + j];
      if (tile.letter) {
        word += tile.letter;
        wordScore += tile.points || 0;
      } else if (word) {
        words.push(word);
        score += wordScore;
        word = "";
        wordScore = 0;
      }
    }

    if (word) {
      words.push(word);
      score += wordScore;
    }
  }

  return { words, score };
};
