export default function Tile({covered, mine}){
  return (
    <div title="tile" className={`tile ${covered ? 'covered' : ''} ${mine ? 'mine' : ''}`}>
      {mine}
    </div>
  )
}