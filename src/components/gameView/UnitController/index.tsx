import React from "react";
import ActionMenu from "./ActionSelectMenu";
import { useControllerSelector } from "components/utils/reduxHooks";
import { ControllerPhase } from "game/entities/UnitController/ControllerState";
import AttackMenu from "./AttackMenu";

function ActionUI() {
  const phase = useControllerSelector(state => state.phase);
  const action = useControllerSelector(state => state.action);
  
  return (
    <>
      <ActionMenu display={phase === ControllerPhase.ACTION_SELECT} />
      <AttackMenu display={
        phase === ControllerPhase.ACTION_CONFIRM &&
        action === "attack"
        } />
    </>
  )
}

export default ActionUI;