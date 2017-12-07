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
    result.push(boardObject.get(`${i}`));
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

  var solution = "Bananas";
  var initialPosititon = [0, 0];
  var recursiveFunctionThing = function(board, numberOfPieces, startPosition){
    //if start Position is inbounds
    if (board._isInBounds(...startPosition)) {
      board.togglePiece(...startPosition);
      if (board.hasAnyRooksConflicts()) {
        // add a piece to board at start position
            // check updated board for conflicts
            //   if conflict toggle new piece off, update position - recurse
        board.togglePiece(...startPosition);
        startPosition = updatePosition(n, startPosition);
        return recursiveFunctionThing(board, numberOfPieces, startPosition);
      } else {
            //   else update number of pieces update position - recurse
        startPosition = updatePosition(n, startPosition);
        numberOfPieces++;
        return recursiveFunctionThing(board, numberOfPieces, startPosition);
      }
    } else {
      //this is where we have fallen off the board and return the final matrix
      if (numberOfPieces === n) {
        return board;
      }
      else {
        initialPosititon = updatePosition(n, initialPosititon);
        return recursiveFunctionThing(new Board({'n': n}), 0, initialPosititon);
      }
    }
  };

  solution = turnBoardIntoMatrix( recursiveFunctionThing(new Board({'n': n}), 0, initialPosititon) );
  //turn the final board into a matrix and store as solution, and then yeah
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = undefined; //fixme
  for (var i = 0; i < n; i++) {

  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = "Bananas";
  var initialPosititon = [0, 0];
  var recursiveFunctionThing = function(board, numberOfPieces, startPosition){
    if (n === 1) {
      return new Board([[1]]);
    }
    if (n < 4) {
      return new Board({'n': n});
    }
    //if start Position is inbounds
    if (board._isInBounds(...startPosition)) {
      board.togglePiece(...startPosition);
      if (board.hasAnyQueensConflicts()) {
        // add a piece to board at start position
            // check updated board for conflicts
            //   if conflict toggle new piece off, update position - recurse
        board.togglePiece(...startPosition);
        startPosition = updatePosition(n, startPosition);
        return recursiveFunctionThing(board, numberOfPieces, startPosition);
      } else {
            //   else update number of pieces update position - recurse
        startPosition = updatePosition(n, startPosition);
        numberOfPieces++;
        return recursiveFunctionThing(board, numberOfPieces, startPosition);
      }
    } else {
      //this is where we have fallen off the board and return the final matrix
      if (numberOfPieces === n) {
        return board;
      }
      else {
        initialPosititon = updatePosition(n, initialPosititon);
        return recursiveFunctionThing(new Board({'n': n}), 0, initialPosititon);
      }
    }
  };
  solution =  recursiveFunctionThing(new Board({'n': n}), 0, initialPosititon);

  solution = turnBoardIntoMatrix(solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
