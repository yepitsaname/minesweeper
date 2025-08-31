/**
 * @param {Array} tiles
 * @param {Number} mines
 * @param {CallableFunction} setter
 * @returns {undefined}
 */
export function setMines (tiles, mines, setter) {
    let temp = tiles.map(e=>e);
    temp[0][0].mine = true;
    setter(temp)
}