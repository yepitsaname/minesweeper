import { useEffect, useState } from "react";
import Tile from "./Tile";
import { getUncoveredTileCount, setMines, setValues } from "../game_logic/main";
import '../css/Board.css';

/**
 * @param {Number} col
 * @param {Number} row
 * @returns {import("react").JSXElementConstructor}
 */
export default function Board({col, row, mines}){
  const [tiles, setTiles] = useState(new Array(row).fill(
    new Array(col).fill({covered: true, mine: false, value: 0})
  ));
  const [uncoveredSquares, setUncoveredSquares] = useState(0)

  useEffect(()=>{ setTiles(setValues(setMines(tiles,mines))) },[])
  useEffect(()=>{ setUncoveredSquares(getUncoveredTileCount(tiles)) },[tiles])


  return (
    <div title="board">
      {tiles.map((row, row_id) => {
        return (
          <div key={row_id} className="row">
            {row.map((tile, tile_id) => <Tile key={tile_id} covered={tile.covered} mine={tile.mine} value={tile.value} coord={[row_id,tile_id]} setter={setTiles} />)}
          </div>
        )
      })}
    </div>
  )
}