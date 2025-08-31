import { useState } from "react";
import '../css/Board.css'

export default function Board({col, row}){
  const [tiles, setTiles] = useState(new Array(row).fill(
    new Array(col).fill({covered: true, mine: false, value: 0})
  ));

  return (
    <div title="board">
      {tiles.map((row, row_id) => {
        return (
          <div key={row_id} className="row">
            {row.map((tile, tile_id) => <div key={tile_id} title="tile" className="tile">{row_id + "," + tile_id}</div>)}
          </div>
        )
      })}
    </div>
  )
}