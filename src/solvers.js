/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.turnBoardIntoMatrix = function(boardObject) {
  var result = [];
  for (var i = 0; i < boardObject.get('n'); i++) {
    result.push(boardObject.get(`${i}`).slice());
  }
  return result;
};

window.updatePosition = function(n, currentPosition) {

    // update position:
    // if colIndex = n
    // colIndex 0
    // row+1
  var rowIndex = currentPosition[0];
  var colIndex = currentPosition[1];

  if(colIndex + 1 === n) {
    colIndex = 0;
    rowIndex++;
  } else {
    colIndex++;
  }
  return [rowIndex, colIndex];
};

window.findNRooksSolution = function(n) {

//we're gonna call the thing that finds all solutions,
//and get index 0 on the matrix that has all of thosse solutions.
  var solution = allRooksSolutionsN(n)[0];
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.allRooksSolutionsN = function (n) {
  //gives the whole matrix back of ALL solutions
  var solutions = []; //fixme
  var newBoard = new Board({'n' : n});

  var boardConflictRecurser = function(board, counter) {
    if (counter === n) {
      solutions.push(turnBoardIntoMatrix(board));
    } else {
      for (var i = 0; i < n; i++) {
        var currentPosition = [counter, i];
        board.togglePiece(...currentPosition);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(...currentPosition);
        }
        else {
          boardConflictRecurser(board, counter + 1);
          board.togglePiece(...currentPosition);
        }
      }
    }
  }
  boardConflictRecurser(newBoard, 0);
  return solutions;
};

window.countNRooksSolutions = function(n) {

  var solutions = allRooksSolutionsN(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  return solutions.length;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

//we're gonna call the thing that finds all solutions,
//and get index 0 on the matrix that has all of thosse solutions.

  var solution = allQueensSolutionsN(n);
  solution = solution[0];
  console.log(solution);
  if (n === 2 || n === 3) {
    solution = turnBoardIntoMatrix(new Board({'n' : n}));
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
window.allQueensSolutionsN = function (n) {
  //gives the whole matrix back of ALL solutions
  var solutions = []; //fixme
  var newBoard = new Board({'n' : n});

  var boardConflictRecurser = function(board, counter) {
    if (counter === n) {
      solutions.push(turnBoardIntoMatrix(board));
    } else {
      for (var i = 0; i < n; i++) {
        var currentPosition = [counter, i];
        board.togglePiece(...currentPosition);
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(...currentPosition);
        }
        else {
          boardConflictRecurser(board, counter + 1);
          board.togglePiece(...currentPosition);
        }
      }
    }
  }
  boardConflictRecurser(newBoard, 0);
  return solutions;
};
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutions = allQueensSolutionsN(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  return solutions.length;
};




// made fixes !!!!

// needed the 2 & 3 cases to return empty matrices
// and the pushed board changed because we were pushing board rows, so I copied the arrays instead










