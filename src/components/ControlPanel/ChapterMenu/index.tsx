import React, { useContext }  from "react";
import "./ChapterMenu.scss";
import ThoronContext from "components/ThoronContext";

function ChapterMenu() {
  // eslint-disable-next-line
  const { controller } = useContext(ThoronContext);

  const handleEndTurn = () => {
    // TODO
  }

  return (
    <div className="chapter-menu" onClick={handleEndTurn}>
      <button>End Turn</button>
    </div>
  )
}

export default ChapterMenu;