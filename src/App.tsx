import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import './App.css'

function BirdName(props: { id: string, name: string }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `${props.id}`,
    data: {
      name: props.name
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <>
      <td ref={setNodeRef} style={style} {...listeners} {...attributes} key={props.id} id={props.id}>{props.name}</td>
    </>
  );
}

function BirdBank() {
  const birds: string[][] = Array.from({length: 9}).map((_, j) => new Array(3).fill(`bird::${j}`));
  return (
    <>
      <table>
        <caption>Bird Bank</caption>
        <tbody>
          {birds.map((row, rind) => (
            <tr key={`bird-${rind}`}>
              {row.map((col, cind) => (
                <BirdName key={`bird-${rind}-${cind}`} id={`bird-${rind}-${cind}`} name={col} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function BirdImg(props: { id: string, img: string}) {
  const {isOver, setNodeRef} = useDroppable({
    id: `${props.id}`,
    data: {
      name: props.img
    }
  });
  const style = {
    opacity: isOver ? '0.5' : undefined,
  };
  return (
    <>
      <div ref={setNodeRef} style={style}>
        <div className={'col'} key={props.id} id={props.id}>{props.img}</div>
      </div>
    </>
  );
}

function BirdBoard(props: {board: string[][]}) {
  const board = props.board;
  return (
    <>
      {board.map((row, rind) => (
        <div className={'row'} key={rind}>
          {row.map((col, cind) => (
            <BirdImg key={`${rind}-${cind}`} id={`${rind}-${cind}`} img={col} />
          ))}
        </div>
      ))} 
    </>
  );
}

function App() {

  const board: string[][] = Array.from({ length: 3 }).map(() => new Array(3));
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      board[i][j] = `bird::${(i * 3) + j}`;
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    const selected = active.data.current?.name;
    const target = over?.data.current?.name;

    const dropped = document.getElementById(`${over?.id}`);
    if (over && selected === target) {
      dropped?.setAttribute('style', 'color: green;');
    } else {
      dropped?.setAttribute('style', 'color: red;');
      setTimeout(() => dropped?.setAttribute('style', ''), 1000);
    }

    // TODO: evaluate game state

    // n! / ((n-r!) * r!) => 9! / (6! * 3!) => 9 * 56 / 6 => 3 * 56 = 168
    // combinations.some(comb => curState.includes(comb))
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className={'container'}>
          <BirdBoard board={board} />
          <BirdBank />
        </div>
      </DndContext>
    </>
  )
}

export default App
