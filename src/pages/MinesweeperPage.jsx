import GridBlock from "../components/GridBlock";
import MinesweeperBoard from "../components/MinesweeperBoard";
import PopUp from "../components/PopUp";

import { useState } from "react";

function reloadPage() {
  window.location.reload(false);
}

function MinesweeperPage() {
  const [flaging, setFlaging] = useState(false);
  const [hidden, setHidden] = useState(true);

  function setGameOver() {
    setHidden(false);
  }

  function Flaging() {
    if (!flaging) {
      setFlaging(true);
    } else if (flaging) {
      setFlaging(false);
    }
  }
  return (
    <div className="w-full h-full bg-blue-200">
      <div className="grid grid-cols-2 w-1/2 p-4 gap-y-4">
        <h1 className="text-center pt-6 text-4xl font-mono">Minesweeper</h1>
        <div></div>
        <button
          className="bg-slate-200 shadow-md rounded-md hover:bg-white"
          onClick={reloadPage}
        >
          Restart
        </button>

        <button
          className={`${flaging === false ? "bg-slate-200" : "bg-red-300"} 
          ${flaging === false ? "outline-none" : "outline"}
          ${flaging === false ? "hover:bg-white" : "hover:bg-red-100"}
         shadow-md rounded-md hover:bg-white`}
          onClick={Flaging}
        >
          {flaging === false ? "Flaging disabled" : "Flaging enabled"}
        </button>
      </div>
      <MinesweeperBoard flaging={flaging} isGameOver={setGameOver} />

      {setGameOver && <PopUp hidden={hidden} restart={reloadPage}></PopUp>}
    </div>
  );
}

export default MinesweeperPage;
