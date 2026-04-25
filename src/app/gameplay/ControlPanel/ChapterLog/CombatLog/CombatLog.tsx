import React from "react";
import Chapter, { ActionResult } from "thoron";
import CombatLogDetail from "./CombatLogDetail";
import CombatLogHeader from "./CombatLogHeader";

export interface CombatLogProps {
  actionResult: ActionResult;
  chapter: Chapter;
}

function CombatLog({ actionResult, chapter }: CombatLogProps) {
  const [open, setOpen] = React.useState(false);
  const toggle = () => {
    setOpen(!open);
  }

  return (
    <div className={
      "bg-[var(--bg-color-2)] rounded-md p-1 color-[var(--text-color-2)]"
    }>
      <CombatLogHeader
        actionResult={actionResult}
        chapter={chapter}
        toggle={toggle}
      />
      {
        open && (
          <CombatLogDetail
            actionResult={actionResult}
            chapter={chapter}
          />
        )
      }
    </div>
  )
}

export default CombatLog;