import { useState, useEffect, useRef } from "react";
import GridBlock from "./GridBlock";

const GRID_SIZE = 10;

let items = Array.from(Array(GRID_SIZE ** 2).keys())
  .map((item, index) => {
    const column = index % GRID_SIZE;
    const row = Math.floor(index / GRID_SIZE);
    return {
      row,
      column,
      clicked: false,
      mine: Math.random() < 0.2,
      flag: false,
      neighbourMines: 0,
    };
  })
  .map((item, index, items) => {
    let count = 0;
    if (item.mine === false) {
      let neighbours = items.filter((element) => {
        return (
          item.column - 1 <= element.column &&
          item.column + 1 >= element.column &&
          item.row - 1 <= element.row &&
          item.row + 1 >= element.row &&
          !(item.column === element.column && item.row === element.row) &&
          element.mine
        );
      });
      return { ...item, neighbourMines: neighbours.length };
    }
    return item;
  });

function MinesweeperBoard() {
  const [boardState, setBoardState] = useState({ items });

  const prevBoardStateRef = useRef();

  //retunrs array with neighboring free tiles clicked
  function findNeighbours(items, item) {
    if (item.mine === false) {
      let neighbours = items.filter((element) => {
        return (
          item.column - 1 <= element.column &&
          item.column + 1 >= element.column &&
          item.row - 1 <= element.row &&
          item.row + 1 >= element.row &&
          !(item.column === element.column && item.row === element.row) &&
          !element.mine
        );
      });

      const newItems = items.map((thing) => {
        const isFound = neighbours.some((element) => {
          if (element.column === thing.column && element.row === thing.row) {
            return true;
          }
        });
        if (isFound) {
          return { ...thing, clicked: true };
        } else {
          return thing;
        }
      });
      return { newItems };
    }
    //neighbours.filter(function(neighbour){ return neighbour.column === thing.column && neighbour.row === thing.row})
  }

  useEffect(() => {}, [boardState]);

  const handleClick = (event, index) => {
    const oldBoard = boardState.items;
    if (oldBoard[index].clicked === false) {
      oldBoard[index] = { ...oldBoard[index], clicked: true };
      setBoardState({ items: oldBoard });

      const afterClickedBoard = findNeighbours(
        boardState.items,
        oldBoard[index]
      );
      setBoardState({ items: afterClickedBoard.newItems });
    }
  };

  return (
    <div
      className={`grid grid-cols-${GRID_SIZE} gap-0 w-1/2 bg-slate-400 pt-2 pl-2 justify-center`}
    >
      {boardState.items.map((item, index) => (
        <button
          className={`static focus:outline-none 
          ${item.clicked === false ? "bg-slate-300" : "bg-green-200"} 
          ${
            item.clicked === false || item.neighbourMines === 0
              ? "text-transparent"
              : "text-black"
          }
          ${item.mine === false ? "bg-slate-300" : "bg-red-300"}
          font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
          key={index}
          item={item}
          onClick={(event) => handleClick(event, index)}
        >
          {" "}
          {item.neighbourMines}
        </button>
      ))}
      {/* <div>{console.log(boardState)}</div> */}
    </div>
  );
}

export default MinesweeperBoard;
