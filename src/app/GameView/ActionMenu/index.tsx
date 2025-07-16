import React from "react";
import ActionSelectMenu from "./ActionSelectMenu";
import { useControllerSelector } from "@/app/utils/reduxHooks";
import { ControllerPhase } from "@/game/entities/ControlSystem/ControllerState";
import CombatMenu from "./CombatMenu";
import ActionConfirmHandler from "./ActionConfirmHandler";
import StaffMenu from "./StaffMenu";
import "./ActionConfirmMenu.scss";

function ActionUI() {
  const phase = useControllerSelector(state => state.phase);
  const action = useControllerSelector(state => state.pendingMove.action);

  const { ACTION_SELECT, ACTION_CONFIRM } = ControllerPhase;
  
  return (
    <>
      <ActionSelectMenu display={phase === ACTION_SELECT} />
      <ActionConfirmHandler enabled={phase === ACTION_CONFIRM} />
      <CombatMenu display={phase === ACTION_CONFIRM && action === "attack"} />
      <StaffMenu display={phase === ACTION_CONFIRM && action === "staff"} />
    </>
  )
}

export default ActionUI;