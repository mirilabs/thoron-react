import React from "react";
import { LogActionResultProps } from "./LogActionResult";
import UnitChip from "./UnitChip";

function StaffLog({ actionResult, chapter }: LogActionResultProps) {
  const action = actionResult.action as any;
  const { unitId, targetId, itemIndex } = action;

  const user = chapter.getUnitById(unitId);
  const target = chapter.getUnitById(targetId);
  const item = user?.items[itemIndex];

  const healEvent = actionResult.events.find(
    (e: any) => e.type === "noncombat_damage"
  ) as any;

  return (
    <div className={
      "bg-[var(--bg-color-2)] rounded-md p-1 color-[var(--text-color-2)]"
    }>
      <div className="flex flex-row gap-1 items-center w-full flex-wrap">
        <UnitChip unit={user} />
        <p className="text-[var(--text-color-2)]">used</p>
        <span className="font-bold">{item?.name || "Staff"}</span>
        <p className="text-[var(--text-color-2)]">on</p>
        <UnitChip unit={target} />
        {healEvent && (
          <p className="ml-auto font-bold text-green-500 pr-2">
            +{Math.abs(healEvent.damage)} HP
          </p>
        )}
      </div>
    </div>
  );
}

export default StaffLog