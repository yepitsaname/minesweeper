/**
 * @param {Array} tiles
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