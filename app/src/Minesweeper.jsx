import { useState } from 'react';
import Board from '../components/Board';
import Scoreboard from '../components/Scoreboard';
import MinesweeperContext from './MinesweeperContext';
import { calcMines } from '../game_logic/main.js';

export default function Minesweeper() {
  const DIFFICULTY = {EASY: 0.10, NORMAL: 0.25, HARD: 0.40, HELL: 0.60, INSANE: 0.90}
  const [settings, setSettings] = useState({row: 10, col: 10, difficulty: DIFFICULTY.EASY})

  return (
    <MinesweeperContext.Provider value={{settings: settings, setSettings: setSettings, difficulties: DIFFICULTY}}>
      <Board row={settings.row} col={settings.col} mines={calcMines(...Object.values(settings))}/>
      <Scoreboard />
    </MinesweeperContext.Provider>
  )
}