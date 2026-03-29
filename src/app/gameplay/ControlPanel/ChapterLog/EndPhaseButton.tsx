import React, { useContext }  from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";

function EndPhaseButton() {
  const { controller } = useContext(ThoronContext);

  const handleEndPhase = () => {
    controller.pushAction({
      command: "end_phase"
    });
  }

  return (
    <button onClick={handleEndPhase}>End Phase</button>
  )
}

export default EndPhaseButton;