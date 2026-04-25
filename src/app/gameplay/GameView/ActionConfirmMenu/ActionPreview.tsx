import React from "react";
import { useControllerSelector } from "../../utils/reduxHooks";
import type { Command } from "thoron";
import CombatPreview from "./CombatPreview";
import StaffPreview from "./StaffPreview";

const PREVIEW_COMPONENTS: Partial<Record<Command, React.FC<{}>>> = {
  attack: CombatPreview,
  staff: StaffPreview,
}

function ActionPreview() {
  const actionType: Command = useControllerSelector(
    state => state.pendingMove.action
  );
  const PreviewComponent = PREVIEW_COMPONENTS[actionType];

  return (
    <>
      {PreviewComponent ? <PreviewComponent /> : actionType}
    </>
  )
}

export default ActionPreview;