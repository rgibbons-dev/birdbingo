import './App.css'

function BirdBank() {
  const birds: string[][] = Array.from({length: 9}).map(() => new Array(3).fill('bird'));
  return (
    <>
      <table>
        <caption>Bird Bank</caption>
        <tbody>
          {birds.map((row, rind) => (
            <tr key={`bird-${rind}`}>
              {row.map((col, cind) => (
                <td key={`bird-${rind}-${cind}`}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Board() {
  const board: string[][] = Array.from({length: 3}).map(() => new Array(3).fill('elem'));
  return (
    <>
      {board.map((row, rind) => (
        <div className={'row'} key={rind}>
          {row.map((col, cind) => (
            <div className={'col'} key={`${rind}-${cind}`}>{col}</div>
          ))}
        </div>
      ))} 
    </>
  );
}

function App() {

  return (
    <>
      <div className={'container'}>
        <Board />
        <BirdBank />
      </div>
    </>
  )
}

export default App
