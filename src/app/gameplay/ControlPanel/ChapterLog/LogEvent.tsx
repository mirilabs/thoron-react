import React from "react";
import Chapter, { ChapterEvent } from "thoron";
import UnitChip from "./UnitChip";

export interface LogEventProps {
  chapter: Chapter,
  event: ChapterEvent
}

const LogEventComponents: Partial<{
  [K in ChapterEvent["type"]]: (props: {
    chapter: Chapter,
    event: Extract<ChapterEvent, { type: K }>
  }) => React.ReactNode
}> = {
  "move": ({ chapter, event }) => {
    const unit = chapter.getUnitById(event.unitId);
    return (
      <div className="flex flex-row gap-1 items-center">
        <UnitChip unit={unit} />
        <p className="text-[var(--text-color-2)]">
          moved to ({event.endPos.x}, {event.endPos.y})
        </p>
      </div>
    );
  },
  "equip": ({ chapter, event }) => {
    const unit = chapter.getUnitById(event.unitId);
    const item = unit?.items[event.nextIndex];
    return (
      <div className="flex flex-row gap-1 items-center">
        <UnitChip unit={unit} />
        <p className="text-[var(--text-color-2)]">
          equipped
        </p>
        <p className="font-bold">
          {item?.name || "??"}
        </p>
      </div>
    );
  },
  "noncombat_damage": () => null,
  "combat_start": () => null,
  "combat_end": () => null,
  "combat_start_effect": () => null,
  "combat_attack": () => null,
  "end_action": () => null,
  "phase_change": ({ event }) => {
    const nextPhase = event.next;
    const side = ["Player", "Enemy"][nextPhase.phase];
    return (
      <div className="flex flex-row gap-4 items-center">
        <p className="text-[var(--text-color)] font-bold text-lg">
          Turn {nextPhase.turn}
        </p>
        <p className="text-[var(--text-color)] font-bold text-lg">
          {side} phase
        </p>
      </div>
    );
  },
  "add_unit": ({ event }) => {
    const { x, y } = event?.saveState?.state?.position;
    return (
      <div className="flex flex-row gap-1 items-center">
        <p className="text-[var(--text-color-2)]">Deployed</p>
        <UnitChip unit={event.saveState} />
        <p className="text-[var(--text-color-2)]">at ({x}, {y})</p>
      </div>
    );
  },
  "remove_unit": ({ event }) => {
    return (
      <div className="flex flex-row gap-1 items-center">
        <p className="text-[var(--text-color-2)]">Removed</p>
        <UnitChip unit={event.saveState} />
      </div>
    );
  },
}

function LogEvent({ chapter, event }: LogEventProps) {
  const handleClick = process.env.NODE_ENV === "development" ? () => {
    console.log(event);
  } : undefined;

  let content: React.ReactNode = <>{event.type}</>;
  const Component = LogEventComponents[event.type];
  if (Component) {
    content = React.createElement(Component as any, { chapter, event });
  }

  return (
    <div className={
      "bg-[var(--bg-color-2)] rounded-md p-1 color-[var(--text-color-2)]" +
      (event.type === "phase_change" ? " mt-4" : "")
    }
      onClick={handleClick}
    >
      {content}
    </div>
  );
}

export default LogEvent;