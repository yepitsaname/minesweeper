import { useState } from "react";
import '../css/Board.css'

export default function Board(){
  const [tiles, setTiles] = useState(new Array(10).fill(
    new Array(10).fill({covered: true, mine: false, id: 0})
  ));

  return (
    <div>
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