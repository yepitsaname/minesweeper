import { useState } from "react";
import '../css/Board.css'
import Tile from "./Tile";

/**
 * @param {Number} col
 * @param {Number} row
 * @returns {import("react").JSXElementConstructor}
 */
export default function Board({col, row}){
  const [tiles, setTiles] = useState(new Array(row).fill(
    new Array(col).fill({covered: true, mine: false, value: 0})
  ));

  return (
    <div title="board">
      {tiles.map((row, row_id) => {
        return (
          <div key={row_id} className="row">
            {row.map((tile, tile_id) => <Tile key={tile_id} covered={tile.covered} mine={tile.mine} />)}
          </div>
        )
      })}
    </div>
  )
}