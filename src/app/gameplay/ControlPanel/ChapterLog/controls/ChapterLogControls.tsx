import React from "react";
import EndPhaseButton from "./EndPhaseButton";
import SaveButton from "./SaveButton";

function ChapterLogControls() {
  return (
    <div className="flex flex-row justify-end gap-2">
      <EndPhaseButton />
      <SaveButton />
    </div>
  )
}

export default ChapterLogControls;