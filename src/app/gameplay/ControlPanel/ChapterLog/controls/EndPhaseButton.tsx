import React, { useContext } from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";
import { Button } from "@mui/material";

function EndPhaseButton() {
  const { controller } = useContext(ThoronContext);

  const handleEndPhase = () => {
    controller.pushAction({
      command: "end_phase"
    });
  }

  return (
    <Button variant="outlined" onClick={handleEndPhase}>End Phase</Button>
  )
}

export default EndPhaseButton;