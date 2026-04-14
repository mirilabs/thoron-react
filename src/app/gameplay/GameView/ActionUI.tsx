import React from "react";
import { useControllerSelector } from "@/app/gameplay/utils/reduxHooks";
import { ControllerPhase } from "@/game/entities/ControlSystem/ControllerState";
import ActionSelectMenu from "./ActionMenu";
import ActionConfirmMenu from "./ActionConfirmMenu";

function ActionUI() {
  const phase = useControllerSelector(state => state.phase);
  const { ACTION_SELECT, ACTION_CONFIRM } = ControllerPhase;

  return (
    <>
      <ActionSelectMenu show={phase === ACTION_SELECT} />
      <ActionConfirmMenu show={phase === ACTION_CONFIRM} />
    </>
  )
}

export default ActionUI;