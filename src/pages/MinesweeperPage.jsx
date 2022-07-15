import GridBlock from "../components/GridBlock";
import MinesweeperBoard from "../components/MinesweeperBoard";
import PopUp from "../components/PopUp";

import { useState } from "react";

function MinesweeperPage() {
  const [flaging, setFlaging] = useState(false);

  function Flaging() {
    if (!flaging) {
      setFlaging(true);
    } else if (flaging) {
      setFlaging(false);
    }
  }
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 w-1/2 p-4 gap-y-4">
        <h1 className="text-xl">Minesweeper</h1>
        <div></div>
        <button className="bg-slate-200 shadow-md rounded-md ">Restart</button>

        <button
          className={`${flaging === false ? "bg-slate-200" : "bg-red-200"} 
          ${flaging === false ? "outline-none" : "outline"}
         shadow-md rounded-md`}
          onClick={Flaging}
        >
          {flaging === false ? "Flaging disabled" : "Flaging enabled"}
        </button>
      </div>
      <MinesweeperBoard />
      <PopUp />
    </div>
  );
}

export default MinesweeperPage;
