import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import './App.css'

function BirdName(props: { id: string, name: string }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `${props.id}`,
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
                <BirdName id={`bird-${rind}-${cind}`} name={col} />
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
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  return (
    <>
      <div ref={setNodeRef} style={style}>
        <div className={'col'} key={props.id} id={props.id}>{props.img}</div>
      </div>
    </>
  );
}

function BirdBoard() {
  const board: string[][] = Array.from({length: 3}).map(() => new Array(3).fill('elem'));
  return (
    <>
      {board.map((row, rind) => (
        <div className={'row'} key={rind}>
          {row.map((col, cind) => (
            <BirdImg id={`${rind}-${cind}`} img={col} />
          ))}
        </div>
      ))} 
    </>
  );
}

function App() {

  return (
    <>
      <DndContext>
        <div className={'container'}>
          <BirdBoard />
          <BirdBank />
        </div>
      </DndContext>
    </>
  )
}

export default App
