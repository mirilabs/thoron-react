import React from "react";
import Chapter, { ActionResult, ChapterEvent, IAction } from "thoron";
import CombatLogDetail from "./CombatLog/CombatLogDetail";
import LogEvent from "./LogEvent";

export interface LogActionResultProps {
  actionResult: ActionResult,
  chapter: Chapter
}

const LogActionResultComponents: Partial<{
  [K in IAction["command"]]: (props: {
    actionResult: ActionResult,
    chapter: Chapter
  }) => React.ReactNode
}> = {
  "attack": ({ actionResult, chapter }) => {
    return <CombatLogDetail actionResult={actionResult} chapter={chapter} />;
  },
  "wait": ({ actionResult, chapter }) => {
    // only show move event
    const moveEvent = actionResult.events.find(
      (event: ChapterEvent) => event.type === "move"
    );
    if (!moveEvent) return null;
    return (
      <LogEvent chapter={chapter} event={moveEvent} />
    );
  }
}

function LogActionResult({ actionResult, chapter }: LogActionResultProps) {
  const action = actionResult.action as IAction;

  const Component = LogActionResultComponents[action.command];
  if (Component) {
    // if component contains a move event, render it
    const moveEvent = actionResult.events.find(
      (event: ChapterEvent) => event.type === "move"
    )
    const moveEventElement = moveEvent ? (
      <LogEvent chapter={chapter} event={moveEvent} />
    ) : null;

    const element = React.createElement(
      Component as any,
      { actionResult, chapter }
    );

    return (
      <>
        {moveEventElement}
        {element}
      </>
    )
  }

  // if no component, show events individually
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