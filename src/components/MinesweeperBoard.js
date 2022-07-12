import { useState } from "react";
import GridBlock from "./GridBlock";

function MinesweeperBoard() {
  let items = Array.from(Array(100).keys()).map((item, index) => {
    const column = index % 10;
    const row = Math.floor(index / 10);
    return { column, row, clicked: false };
  });

  const [boardState, setBoardState] = useState({ items });

  console.log(boardState);

  const handleClick = (event, index) => {
    const oldBoard = boardState.items;
    oldBoard[index] = { ...oldBoard[index], clicked: true };
    setBoardState({ items: oldBoard });
  };

  return (
    <div className="grid grid-cols-10 gap-0 w-1/2">
      {boardState.items.map((item, index) => (
        <button
          className={`static focus:outline-none ${
            item.clicked === false ? "bg-slate-300" : "bg-red-300"
          } font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
          key={index}
          item={item}
          onClick={(event) => handleClick(event, index)}
        ></button>
      ))}
    </div>
  );
}

export default MinesweeperBoard;
