import React from "react";
import Chapter, { ActionResult, ChapterEvent, IAction } from "thoron";
import LogString from "./LogString";
import CombatLogDetail from "./CombatLog/CombatLogDetail";
import LogEvent, { LogEventProps } from "./LogEvent";

export interface LogActionResultProps {
  actionResult: ActionResult,
  chapter: Chapter
}

function LogActionResult({ actionResult, chapter }: LogActionResultProps) {
  const action = actionResult.action as IAction;

  if (action.command === "attack") return (
    <CombatLogDetail actionResult={actionResult} chapter={chapter} />
  );

  const events = actionResult.events;
  const logs = events.map((event, i) => (
    <LogEvent
      key={i}
      chapter={chapter}
      event={event}
    />
  ));

  return (
    <>
      {logs}
    </>
  );
}

export default LogActionResult;