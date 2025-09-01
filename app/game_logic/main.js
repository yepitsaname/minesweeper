// Type Definitions
/**
 * A tile that contains all the required game data for minesweeper
 * @typedef {Object} Tile
 * @property {Boolean} covered
 * @property {Boolean} mine
 * @property {Number} value
*/
/**
 * @typedef {Array<Array<Tile>>} Board
*/

// Functions
/**
 * Takes in a given board and places mines randomly. Returns the mined board.
 * @param {Board} board
 * @param {Number} totalMines
 * @param {Number} [odds=0.5]
 * @returns {undefined}
 */
export function setMines (board, totalMines, odds=0.2) {
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
            row_odds = Math.round((row_odds - 0.1) * 100)/100;
          }

        }
      }
      if( mineCount < totalMines ){ odds+=0.1; fn() }
    }

    fn(totalMines)
    return state;
}

/**
 * Takes in a given mined board and updates all tiles with the total neighboring mines. Returns the board with values.
 * @param {Board} board
 * @returns {Board}
 */
export function setValues (board){
  // Force deep copy of board
  let state = JSON.parse(JSON.stringify(board));

  const fn = (start_row,start_col)=>{
    if(state[start_row][start_col].mine){return}
    for(let row = start_row - 1; row <= start_row + 1; row++ ){
      if( row < 0 || row >= state.length ){ continue }
      for(let col = start_col - 1; col <= start_col + 1; col++ ){
        if( col < 0 || col >= state[row].length ){ continue }
        if( state[row][col].mine == true ){ state[start_row][start_col].value++ }
      }
    }
  }

  state.forEach((row,ri)=>{
    row.forEach((col,ci)=>{
      fn(ri,ci)
    })
  });
  return state;
}

/**
 * Takes in a given board and clears all direct adjacents recursively, then returns the board
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

        //Validate if they have been checked, are not mines, and the starting point value was 0; if all are true, recurse
        if( state[row][col].covered && !state[row][col].mine &&  state[start_row][start_col].value == 0){
          fn(row,col);
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

/**
 * Takes in a given game board and returns the amount of uncovered spaces
 * @param {Board} board
 * @returns {Number}
 */
export function getUncoveredTileCount(board){
  return board.map(
    row => row.reduce((acc,item) => item.covered == false ? ++acc : acc, 0)
  ).reduce((acc,item)=> acc += item, 0)
}

/**
 * Takes in a given game board and returns the amount of uncovered mine spaces
 * @param {Board} board
 * @returns {Number}
 */
export function getUncoveredMineCount(board){
  return board.map(
    row => row.reduce((acc,item) => item.covered == false && item.mine ? ++acc : acc, 0)
  ).reduce((acc,item)=> acc += item, 0)
}