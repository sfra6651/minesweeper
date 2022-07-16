import { useState, useEffect, useRef } from "react";

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

function MinesweeperBoard(props) {
  const [boardState, setBoardState] = useState({ items });

  const prevBoardStateRef = useRef();

  //retunrs array with neighboring free tiles
  function findNeighbours(items, item) {
    if (item.mine === false) {
      let neighbours = items.filter((element) => {
        return (
          item.column - 1 <= element.column &&
          item.column + 1 >= element.column &&
          item.row - 1 <= element.row &&
          item.row + 1 >= element.row &&
          !(item.column === element.column && item.row === element.row) &&
          !element.mine &&
          !element.clicked &&
          !element.flag
        );
      });
      // console.log(item);
      //console.log(neighbours);
      //console.log(updatedState(items, neighbours));
      // const moreNeighbours = neighbours.map((element) => {
      //   if (element.neighbourMines === 0 && element.clicked === false) {
      //     return findNeighbours(updatedState(items, neighbours), element);
      //   } else return null;
      // });
      return neighbours;
    }
  }

  function updatedState(items, neighbours) {
    const newItems = items.map((thing) => {
      //console.log(thing);
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

  function isGameWon() {
    const winBoard = boardState.items.filter((item) => {
      return item.clicked || item.mine;
    });
    if (winBoard.length === boardState.items.length) {
      return true;
    } else {
      return false;
    }
  }

  function gameWon() {
    if (isGameWon() === true) {
      console.log("game won");
      props.isWin();
    } else {
      props.notWonYet();
    }
  }

  useEffect(() => {}, [boardState]);

  const handleClick = (event, index) => {
    if (props.flaging) {
      console.log();
      if (boardState.items[index].flag === true) {
        const oldBoard = boardState.items;
        oldBoard[index] = { ...oldBoard[index], flag: false };
        setBoardState({ items: oldBoard });
      } else {
        const oldBoard = boardState.items;
        oldBoard[index] = { ...oldBoard[index], flag: true };
        setBoardState({ items: oldBoard });
      }
    } else {
      if (boardState.items[index].mine) {
        props.isGameOver();
      } else {
        const oldBoard = boardState.items;
        if (oldBoard[index].clicked === false) {
          oldBoard[index] = { ...oldBoard[index], clicked: true };
          setBoardState({ items: oldBoard });

          const newNeighbours = findNeighbours(
            boardState.items,
            oldBoard[index]
          );

          const afterClickedBoard = updatedState(
            boardState.items,
            newNeighbours
          );
          setBoardState({ items: afterClickedBoard.newItems });
        }
      }
    }
  };

  return (
    <div>
      <button
        className="bg-slate-200 rounded-md w-1/2 h-12 hover:bg-white"
        onClick={gameWon}
      >
        Check Win
      </button>
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
          ${item.flag === false ? "bg-slate-300" : "bg-red-300"}
          ${item.mine ? "bg-red-200" : "bg-slate-300"}
          font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center`}
            key={index}
            item={item}
            onClick={(event) => handleClick(event, index)}
          >
            {" "}
            {item.neighbourMines}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MinesweeperBoard;
