export default function validateWords(board, validWordsList) {
    const words = extractWordsFromBoard(board); // Extract words from the board
    const valid = [];
    const invalid = [];
  
    words.forEach((word) => {
      if (validWordsList.includes(word)) {
        valid.push(word);
      } else {
        invalid.push(word);
      }
    });
  
    return { valid, invalid }; // Ensure this structure
  }
  
  // Mock function to extract words from the board
  function extractWordsFromBoard(board) {
    // Logic to extract words horizontally and vertically
    // For now, returning a hardcoded example
    return ["STAR", "STARA"];
  }
  