import { useEffect, useState } from "react";
import Tile from "./Tile";
import Menu from "./Menu";
import { resetBoard, getUncoveredMineCount, getUncoveredTileCount, setMines, setValues } from "../game_logic/main";
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
  const [hitMine, setHitMine] = useState(false);
  const [gameOver, setGameOver] = useState(true);

  useEffect(()=>{
    if(gameOver){return}
    let board = setValues(setMines(resetBoard(tiles),mines));
    setTiles([[]]);
    setTiles(board);
  },[gameOver])

  useEffect(()=>{
    setUncoveredSquares(getUncoveredTileCount(tiles));
    setHitMine(getUncoveredMineCount(tiles) >= 1);
  },[tiles])

  useEffect(()=>{
    if(hitMine == true){ setGameOver(true)
    } else if ( uncoveredSquares == col * row - mines ){ setGameOver(true) }
  },[uncoveredSquares,hitMine])

  return (
    <div title="board" className="board">
      {tiles.map((row, row_id) => {
        return (
          <div key={row_id} className="row">
            {row.map((tile, tile_id) => <Tile key={tile_id} covered={tile.covered} mine={tile.mine} value={tile.value} coord={[row_id,tile_id]} setter={setTiles} />)}
          </div>
        )
      })}
      {gameOver == true ?
        (<div title="board mask" className="mask">
          {
            uncoveredSquares == 0 ?
            <Menu state={0} reset={setGameOver} /> :
            !hitMine ? <Menu state={1} reset={setGameOver} /> :
            <Menu state={2} reset={setGameOver} />
          }
        </div>) :
        <></>
      }
    </div>
  )
}