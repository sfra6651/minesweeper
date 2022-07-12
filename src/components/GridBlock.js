function GridBlock(props) {
  return (
    <div>
      <button
        type="button"
        className="static focus:outline-none bg-slate-300 hover:bg-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        {props.item.column} - {props.item.row}
      </button>
    </div>
  );
}

export default GridBlock;
