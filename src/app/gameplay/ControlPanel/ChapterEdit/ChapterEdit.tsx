import React, { useContext } from "react";
import ThoronContext from "../../ThoronContext";
import UnitAdd from "./UnitAdd";

function ChapterEdit() {
  const { controller } = useContext(ThoronContext);

  return (
    <div>
      <UnitAdd controller={controller} />
    </div>
  )
}

export default ChapterEdit;