// Type Definitions
/**
 * @typedef {Object} Tile
 * @property {Boolean} covered
 * @property {Boolean} mine
 * @property {Number} value
 * @param {Number} [odds=0.5]
 */
/**
 * @typedef {Array<Array<Tile>>} Board
 */

// Functions
/**
 * @param {Board} board
 * @param {Number} totalMines
 * @param {CallableFunction} setter
 * @returns {undefined}
 */
export function setMines (board, totalMines, odds=0.4) {
    // Forces a 'Deep' copy of the array
    let state = JSON.parse(JSON.stringify(board));
    var mineCount = 0;
    if( totalMines > board.length * board[0].length ){ totalMines = board.length * board[0].length - 1 }

    const fn = () => {
      for(let row = 0; row < state.length; row++ ){
        let row_odds = odds;

        for(let col = 0; col < state[row].length; col++ ){
          if( mineCount >= totalMines ){ return }
          let roll = Math.round(Math.random() * 100)/100;
          if( roll < row_odds && !state[row][col].mine ){
            state[row][col].mine = true;
            mineCount++;
            row_odds = Math.round((row_odds - 0.05) * 100)/100;
          }

        }
      }
      if( mineCount < totalMines ){ odds+=0.1; fn() }
    }

    fn(totalMines)
    return state;
}

/**
 * @param {Board} board
 * @param {[row: number,column: number]} start
 * @returns {Board}
 */
export function checkNeighbors(board, start) {
  // Force deep copy of board
  let state = JSON.parse(JSON.stringify(board));

  // Recursive tile checking function
  function fn(start_row,start_col){
    // Uncover the starting tile and return immediately if its a mine
    state[start_row][start_col].covered = false;
    if(state[start_row][start_col].mine){return};

    //Cycle through all rows
    for( let row = start_row - 1; row <= start_row + 1; row++ ){
      //If the row is out of bounds go to the next row
      if( row < 0 ){ continue };
      if( row >= state.length ){ continue };

      //Cycle through all columns
      for( let col = start_col - 1; col <= start_col + 1; col++ ){
        //If the column is out of bounds go to the next column
        if( col < 0 ){ continue };
        if( col >= state[row].length ){ continue };

        //If the row and column are the starting point, mark it as checked
        if( row == start_row && col == start_col ){ continue }

        //If the row and column are a mine, update the mine count for the start tile
        if( state[row][col].mine ){ state[start_row][start_col].value++ }

        //If the row and column are direct neighbors
        if(
          (row == start_row && (col == start_col - 1 || col == start_col + 1)) ||
          (col == start_col && (row == start_row - 1 || row == start_row + 1))
        ){
          //Validate if they have been checked and are not mines, if both are true, recurse
          if( state[row][col].covered && !state[row][col].mine ){
            fn(row,col);
          }
        }
      }
    }
  }

  // Begin tile checking recursion and return the board state
  fn(...start);
  return state;
}

/**
 * @param {Board} board
 * @returns {Board}
 */
export function revealBoard(board){
  // Force deep copy of board
  let state = JSON.parse(JSON.stringify(board));

  state.forEach(row=>row.forEach(col=>col.covered=false));
  return state;
}