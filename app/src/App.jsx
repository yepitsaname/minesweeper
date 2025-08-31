import Board from '../components/Board'
import './App.css'

export default function App() {

  return (
    <>
      <Board col={10} row={10} mines={10}/>
    </>
  )
}