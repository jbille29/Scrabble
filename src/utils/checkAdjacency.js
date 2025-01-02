/**
 * Validates whether all placed letters on the board are adjacent to another letter
 * and ensures that at least one letter is connected to a preplaced tile.
 *
 * @param {Array} board - The board array with tile data.
 * @returns {boolean} - Returns true if all placed letters are valid, otherwise false.
 */
const checkAdjacency = (board) => {
    const adjacentOffsets = [-1, 1, -8, 8]; // Left, Right, Up, Down
    const boardSize = 8; // 8x8 grid
  
    // Find indices of preplaced and user-placed letters
    const preplacedIndices = board
      .map((tile, index) => (tile.prePlacedLetter ? index : null))
      .filter((index) => index !== null);
    const placedIndices = board
      .map((tile, index) => (!tile.prePlacedLetter && tile.letter ? index : null))
      .filter((index) => index !== null);
  
    console.log("Preplaced indices:", preplacedIndices);
    console.log("Placed indices:", placedIndices);
  
    if (placedIndices.length === 0) {
      alert("You must place at least one letter.");
      return false;
    }
  
    // Check adjacency for all placed letters
    for (const index of placedIndices) {
      const isAdjacent = adjacentOffsets.some((offset) => {
        const neighborIndex = index + offset;
  
        // Validate neighborIndex is within bounds
        if (neighborIndex < 0 || neighborIndex >= board.length) return false;
  
        // Validate horizontal wrapping (e.g., moving right from column 7 to column 0)
        if (
          (index % boardSize === 0 && offset === -1) || // Left edge
          (index % boardSize === boardSize - 1 && offset === 1) // Right edge
        ) {
          return false;
        }
  
        // Check if the neighbor has a letter or is preplaced
        return board[neighborIndex]?.letter || board[neighborIndex]?.prePlacedLetter;
      });
  
      if (!isAdjacent) {
        console.log(`Invalid placement: Letter at position ${index} is isolated.`);
        alert(`Invalid placement: Letter at position ${index} is isolated.`);
        return false; // Stop further validation
      }
    }
  
    // Ensure at least one placed letter connects to a preplaced letter
    const connectsToPreplaced = placedIndices.some((index) =>
      adjacentOffsets.some((offset) => {
        const neighborIndex = index + offset;
  
        // Validate neighborIndex is within bounds
        if (neighborIndex < 0 || neighborIndex >= board.length) return false;
  
        // Check if the neighbor is a preplaced letter
        return preplacedIndices.includes(neighborIndex);
      })
    );
  
    if (!connectsToPreplaced) {
      alert("You must connect your placement to a preplaced letter.");
      return false;
    }
  
    return true; // All letters are valid
  };
  
  export default checkAdjacency;
  