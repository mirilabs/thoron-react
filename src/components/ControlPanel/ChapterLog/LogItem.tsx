import React from "react";
import Chapter, { ActionResult } from "thoron";

const logComponents = {
  attack({ unit }) {
    return (
      <>
        {unit.record.name} attacked
      </>
    )
  },
  
  default({ unit }) {
    return (
      <>
        {unit.record.name} moved
      </>
    )
  }
}

function LogItem({ actionResult, chapter }: {
  actionResult: ActionResult,
  chapter: Chapter
}) {
  const { action } = actionResult;
  const unit = chapter.getUnitById(action.unitId);
  const target = action.targetId ? chapter.getUnitById(action.targetId) : null;
  const props = { unit, target, action, actionResult }

  let Content = logComponents[action.command] ?? logComponents.default;

  return (
    <div className="chapter-log__entry">
      <Content {...props} />
    </div>
  );
}

export default LogItem;