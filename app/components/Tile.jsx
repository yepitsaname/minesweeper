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
      className={`tile ${covered ? 'covered' : ''} ${mine ? 'mine' : ''}`}
      onClick={()=>{
        setter(prevState=>{
          let[row,col] = coord;
          let temp = prevState.map(e=>e);
          temp[row][col].covered = false;
          return temp;
        })
      }}
    >
      {mine ? mine : value}
    </div>
  )
}