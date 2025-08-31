import { useState } from "react"

/**
 * @param {Boolean} covered
 * @param {Boolean} mine
 * @returns {import("react").JSXElementConstructor}
 */
export default function Tile({covered, mine}){
  const [isCovered, setIsCovered] = useState(covered);
  return (
    <div
      title="tile"
      className={`tile ${isCovered ? 'covered' : ''} ${mine ? 'mine' : ''}`}
      onClick={()=>{setIsCovered(false)}}
    >
      {mine}
    </div>
  )
}