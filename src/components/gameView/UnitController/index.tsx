import React from "react";
import ActionMenu from "./ActionMenu";
import { useControllerSelector } from "components/utils/reduxHooks";
import { ControllerPhase } from "game/entities/UnitController/ControllerState";

function ActionUI() {
  const phase = useControllerSelector(state => state.phase);

  return (
    <>
      <ActionMenu display={phase === ControllerPhase.ACTION_SELECT} />
    </>
  )
}

export default ActionUI;