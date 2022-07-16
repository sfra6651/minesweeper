function PopUp(props) {
  function restartGame() {
    props.restart();
  }
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full ${
        props.hidden === true ? "hidden" : "hidden-false"
      }`}
      //id="my-modal"
    >
      <div className="containerw-1/2 h-1/4"></div>
      <div className="relative container rounded-xl bg-red-100 border-double border-4 border-slate-400 w-1/2 h-44">
        <h1 className="text-center pt-6 text-5xl font-mono">Game Over</h1>
        <button
          onClick={restartGame}
          className="absolute bottom-8 left-1/4 shadow-md border-solid border-2 border-slate-400 bg-slate-200 rounded-md w-1/2 h-10 hover:bg-white"
        >
          Restart
        </button>
      </div>
    </div>
  );
}
export default PopUp;
