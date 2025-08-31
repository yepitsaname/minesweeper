import '../css/Tile.css';
import { checkNeighbors } from '../game_logic/main';

/**
 * @param {Boolean} covered
 * @param {Boolean} mine
 * @param {Number} value
 * @param {Array} coord
 * @param {Function} setter
 * @returns {import("react").JSXElementConstructor}
 */
export default function Tile({covered, mine, value, coord, setter=()=>{}}){

  return (
    <div
      title="tile"
      className={`tile ${covered ? 'covered' : ''} ${mine && !covered ? 'mine' : ''}`}
      onClick={()=>{
        setter(prevState=>checkNeighbors(prevState,coord))
      }}
    >
      {mine ? mine : value == 0 ? '' : value}
    </div>
  )
}