// Type Definitions
/**
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
 * @param {Board} tiles
 * @param {Number} mines
 * @param {CallableFunction} setter
 * @returns {undefined}
 */
export function setMines (tiles, mines, setter) {
    // Forces a 'Deep' copy of the array
    let temp = JSON.parse(JSON.stringify(tiles));

    if(tiles.length == 1 && tiles[0].length == 1 && mines != 0){
      temp[0][0].mine = true;
    }

    setter(temp)
}

/**
 * @param {Board} board
 * @param {[row: number,column: number]} start
 * @returns {Board}
 */
export function checkNeighbors(board, start) {
  let state = JSON.parse(JSON.stringify(board));
  var checked = state.map(row => row.map(()=> false));

  let [start_row,start_col] = start;
  for( let row = start_row - 1; row <= start_row + 1; row++ ){
    if( row < 0 ){ continue };
    if( row >= state.length ){ continue };

    for( let col = start_col - 1; col <= start_col + 1; col++ ){
      if( col < 0 ){ continue };
      if( col >= state[row].length ){ continue };

      checked[row][col] = true;
      if( row == start_row && col == start_col ){ continue }
      if( state[row][col].mine ){ state[start_row][start_col].value++ }
    }
  }

  return state;
}