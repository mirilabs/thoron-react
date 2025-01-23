import React, { useContext }  from "react";
import "./ChapterMenu.scss";
import ThoronContext from "components/ThoronContext";

function ChapterMenu() {
  // eslint-disable-next-line
  const { controller } = useContext(ThoronContext);

  const handleEndTurn = () => {
    controller.pushAction({
      command: "end_phase"
    });
  }

  return (
    <div className="chapter-menu" onClick={handleEndTurn}>
      <button onClick={handleEndTurn}>End Phase</button>
    </div>
  )
}

export default ChapterMenu;