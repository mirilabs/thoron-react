import React from "react";
import Chapter, { ActionResult, IAction } from "thoron";
import CombatLog from "./CombatLog";

const logComponents = {
  attack: CombatLog,

  default({ unit }) {
    return (
      <>
        {unit.record.name} moved
      </>
    )
  }
}

function LogItemContainer({ actionResult, chapter }: {
  actionResult: ActionResult,
  chapter: Chapter
}) {
  const action = actionResult.action as IAction;
  const unit = chapter.getUnitById(action.unitId);
  const target = action.targetId ? chapter.getUnitById(action.targetId) : null;
  const props = { unit, target, action, result: actionResult }

  let Content = logComponents[action.command] ?? logComponents.default;

  return (
    <div className="chapter-log__entry">
      <Content {...props} />
    </div>
  );
}

export default LogItemContainer;