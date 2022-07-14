import { useState, useEffect } from "react";
import GridBlock from "./GridBlock";

function MinesweeperBoard() {
  let items = Array.from(Array(100).keys()).map((item, index) => {
    const column = index % 10;
    const row = Math.floor(index / 10);
    return {
      column,
      row,
      clicked: false,
      mine: false,
      flag: false,
      neighbourMines: 0,
    };
  });

  const [boardState, setBoardState] = useState({ items });

  function populateMines() {
    const newBoard = boardState.items.map((item, index) => {
      let randNum = Math.random();
      if (randNum < 0.2) {
        return {
          column: item.column,
          row: item.row,
          clicked: false,
          mine: true,
          flag: false,
          neighbourMines: 0,
        };
      } else {
        return item;
      }
    });
    setBoardState({ items: newBoard });
    console.log(newBoard);
  }

  useEffect(() => {
    populateMines();
  }, []);

  const handleClick = (event, index) => {
    const oldBoard = boardState.items;
    oldBoard[index] = { ...oldBoard[index], clicked: true };
    setBoardState({ items: oldBoard });
  };

  return (
    <div className="grid grid-cols-10 gap-0 w-1/2 bg-slate-400 pt-2 pl-2">
      {boardState.items.map((item, index) => (
        <button
          className={`static focus:outline-none 
          ${item.clicked === false ? "bg-slate-300" : "bg-red-300"} 
          ${
            item.clicked === false || item.neighbourMines === 0
              ? "text-transparent"
              : "text-black"
          }
          ${item.mine === false ? "bg-slate-300" : "bg-blue-300"}
          font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
          key={index}
          item={item}
          onClick={(event) => handleClick(event, index)}
        >
          {" "}
          {item.neighbourMines}
        </button>
      ))}
    </div>
  );
}

export default MinesweeperBoard;
