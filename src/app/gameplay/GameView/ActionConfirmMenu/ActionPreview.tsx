import React from "react";
import { useControllerSelector } from "../../utils/reduxHooks";
import type { Command } from "thoron";
import CombatPreview from "./CombatPreview";

const PREVIEW_COMPONENTS: Partial<{ [K in Command]: React.FC<{}> }> = {
  "attack": CombatPreview,
  "staff": () => <div>Staff</div>,
  "wait": () => <div>Wait</div>,
  "item": () => <div>Item</div>,
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