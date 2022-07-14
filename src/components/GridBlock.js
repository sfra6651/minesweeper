function GridBlock(props) {
  return (
    <div>
      <button
        className={`static focus:outline-none 
          ${props.item.clicked === false ? "bg-slate-300" : "bg-red-300"} 
          ${
            props.item.clicked === false || props.neighbourMines === 0
              ? "text-transparent"
              : "text-black"
          }
          ${props.item.mine === false ? "bg-slate-300" : "bg-blue-300"}
          font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
        //key={props.index}
        item={props.item}
        onClick={(event) => props.handleClick(event, props.index)}
      >
        {" "}
        {props.item.neighbourMines}
      </button>
    </div>
  );
}

export default GridBlock;
