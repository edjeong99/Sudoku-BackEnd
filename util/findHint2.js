// clude generated hint 

// use below in server.js
// router.post('/hint', (req, res) => {
//     const { board } = req.body;
//     const hint = generateHint(board);
//     res.json({ hint });
//   });

function generateHint(board) {
    const solution = solveSudoku(board); // Implement this function to solve the Sudoku
    if (!solution) return "The current board state is unsolvable.";
  
    const hints = [];
  
    // Check for single candidates
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const possibleValues = findPossibleValues(board, row, col);
          if (possibleValues.length === 1) {
            hints.push({
              type: "single candidate",
              message: `There's only one possible value for row ${row + 1}, column ${col + 1}: ${possibleValues[0]}`,
              difficulty: 1
            });
          }
        }
      }
    }
  
    // Check for hidden singles in rows, columns, and boxes
    for (let i = 0; i < 9; i++) {
      hints.push(...findHiddenSingles(board, i, 'row'));
      hints.push(...findHiddenSingles(board, i, 'column'));
      hints.push(...findHiddenSingles(board, i, 'box'));
    }
  
    // If no hints found, give a general suggestion
    if (hints.length === 0) {
      const emptyCell = findFirstEmptyCell(board);
      if (emptyCell) {
        const [row, col] = emptyCell;
        hints.push({
          type: "general",
          message: `Try focusing on row ${row + 1}, column ${col + 1}. What numbers could go there?`,
          difficulty: 2
        });
      }
    }
  
    // Sort hints by difficulty
    hints.sort((a, b) => a.difficulty - b.difficulty);
  
    // Return the easiest hint
    return hints.length > 0 ? hints[0].message : "No specific hint available. Keep analyzing the board!";
  }
  
  function findPossibleValues(board, row, col) {
    const used = new Set();
    
    // Check row
    for (let i = 0; i < 9; i++) {
      used.add(board[row][i]);
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      used.add(board[i][col]);
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        used.add(board[boxRow + i][boxCol + j]);
      }
    }
    
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => !used.has(num));
  }
  
  function findHiddenSingles(board, index, type) {
    const hints = [];
    const candidates = Array(9).fill().map(() => new Set());
  
    for (let i = 0; i < 9; i++) {
      const cell = type === 'row' ? board[index][i] :
                   type === 'column' ? board[i][index] :
                   board[Math.floor(index / 3) * 3 + Math.floor(i / 3)][(index % 3) * 3 + (i % 3)];
  
      if (cell === 0) {
        const possibleValues = findPossibleValues(board, 
          type === 'row' ? index : i,
          type === 'column' ? index : i
        );
        possibleValues.forEach(value => candidates[value - 1].add(i));
      }
    }
  
    candidates.forEach((cells, value) => {
      if (cells.size === 1) {
        const position = [...cells][0];
        hints.push({
          type: "hidden single",
          message: `There's only one place for ${value + 1} in this ${type}: ${type === 'row' ? `column ${position + 1}` : type === 'column' ? `row ${position + 1}` : `cell ${position + 1}`}`,
          difficulty: 2
        });
      }
    });
  
    return hints;
  }
  
  function findFirstEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }