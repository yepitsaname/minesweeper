import { useEffect, useState } from "react"

export default function Menu({state, reset}){
  const OPTIONS = {MAIN: 0, WIN: 1, LOSE: 2}

  return (
    <div title='menu' className="menu">
      {state == OPTIONS.MAIN ? <div><h2>Main Menu</h2></div> : <></> }
      {state == OPTIONS.WIN ? <div><p>You Won!</p></div> : <></> }
      {state == OPTIONS.LOSE ? <div><p>You Lost!</p></div> : <></> }
      <button onClick={()=>{reset(!true)}}>Start Game</button>
    </div>
  )
}