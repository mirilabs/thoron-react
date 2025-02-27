import React from "react";
import ActionMenu from "./ActionSelectMenu";
import { useControllerSelector } from "@/app/utils/reduxHooks";
import { ControllerPhase } from "@/game/entities/ControlSystem/ControllerState";
import CombatMenu from "../CombatMenu";

function ActionUI() {
  const phase = useControllerSelector(state => state.phase);
  const action = useControllerSelector(state => state.pendingMove.action);
  
  return (
    <>
      <ActionMenu display={phase === ControllerPhase.ACTION_SELECT} />
      <CombatMenu display={
        phase === ControllerPhase.ACTION_CONFIRM &&
        action === "attack"
        } />
    </>
  )
}

export default ActionUI;